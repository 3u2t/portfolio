import { NextResponse } from "next/server";

// Site beacon: answers page-view pings with a 1x1 GIF, rate-limited
// per IP (60s, best-effort in-memory). Optionally enriches visits with
// rough geo + UA parsing and forwards a notification when delivery is
// configured via DISCORD_WEBHOOK_URL (hosting env only — never committed).
// Without it, this endpoint just returns the GIF.
// See footer disclosure + README (ops section) before changing behavior.

const GIF_1PX = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

const gifHeaders = {
  "Content-Type": "image/gif",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Content-Length": String(GIF_1PX.length),
};

function gif() {
  return new NextResponse(GIF_1PX, { status: 200, headers: gifHeaders });
}

// Same bot list as src/proxy.ts — the proxy already 403s these,
// this is defense-in-depth for direct hits (e.g. Pi without proxy).
const BLOCKED_UA = [
  "headlesschrome",
  "phantomjs",
  "selenium",
  "curl",
  "wget",
  "python-requests",
  "python-urllib",
  "go-http-client",
  "libwww-perl",
  "scrapy",
  "sqlmap",
  "nikto",
  "masscan",
  "zgrab",
];

// Best-effort dedup. NOTE: on serverless (Vercel) each instance has its
// own Map, so heavy traffic may double-log. Same tradeoff as the original.
const recentIps = new Map<string, number>();

function prune(now: number) {
  if (recentIps.size <= 1000) return;
  const cutoff = now - 60_000;
  for (const [k, v] of recentIps) {
    if (v < cutoff) recentIps.delete(k);
  }
}

function detectOS(ua: string): string {
  if (/Windows NT 10[._]0/.test(ua)) return "Windows 10/11";
  if (/Windows NT 6[._]3/.test(ua)) return "Windows 8.1";
  if (/Windows NT 6[._]2/.test(ua)) return "Windows 8";
  if (/Windows NT 6[._]1/.test(ua)) return "Windows 7";
  if (/CrOS/.test(ua)) return "ChromeOS";
  if (/iPhone|iPad|iPod/.test(ua)) {
    const m = ua.match(/CPU(?: iPhone)? OS (\d+[._]\d+)/);
    return m ? `iOS ${m[1].replace("_", ".")}` : "iOS";
  }
  if (/Android/.test(ua)) {
    const m = ua.match(/Android (\d+[._]\d+)/);
    return m ? `Android ${m[1].replace("_", ".")}` : "Android";
  }
  if (/Mac OS X/.test(ua)) {
    const m = ua.match(/Mac OS X (\d+[._]\d+)/);
    return m ? `macOS ${m[1].replace("_", ".")}` : "macOS";
  }
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown";
}

function detectBrowser(ua: string): string {
  const edg = ua.match(/Edg\/(\d+)/);
  if (edg) return `Edge ${edg[1]}`;
  const opr = ua.match(/OPR\/(\d+)/);
  if (opr) return `Opera ${opr[1]}`;
  const chrome = ua.match(/Chrome\/(\d+)/);
  if (chrome) return `Chrome ${chrome[1]}`;
  const ff = ua.match(/Firefox\/(\d+)/);
  if (ff) return `Firefox ${ff[1]}`;
  const safari = ua.match(/Version\/(\d+)/);
  if (/Safari\//.test(ua) && safari) return `Safari ${safari[1]}`;
  return "Unknown";
}

type Geo = {
  status?: string;
  country?: string;
  regionName?: string;
  city?: string;
  isp?: string;
  org?: string;
};

async function lookupGeo(ip: string): Promise<Geo | null> {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org,query`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) return null;
    return (await res.json()) as Geo;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  const lower = ua.toLowerCase();
  if (lower && BLOCKED_UA.some((s) => lower.includes(s))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const last = recentIps.get(ip);
  if (last && now - last < 60_000) return gif();
  recentIps.set(ip, now);
  prune(now);

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (webhook && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
    const geo = await lookupGeo(ip);
    const ok = geo?.status === "success";
    const loc = ok
      ? [geo?.city, geo?.regionName, geo?.country].filter(Boolean).join(", ")
      : "Unknown";
    const isp = ok ? geo?.isp || geo?.org || "Unknown" : "Unknown";
    let path = "/";
    try {
      path = new URL(req.url).pathname;
    } catch {
      /* keep default */
    }

    const embed = {
      embeds: [
        {
          title: "Site Visit",
          color: 0x34d399,
          fields: [
            { name: "IP", value: ip, inline: true },
            { name: "ISP", value: isp, inline: true },
            { name: "Location", value: loc || "Unknown", inline: true },
            { name: "OS", value: detectOS(ua), inline: true },
            { name: "Browser", value: detectBrowser(ua), inline: true },
            {
              name: "Referer",
              value:
                req.headers.get("referer") || req.headers.get("referrer") || "Direct",
              inline: true,
            },
            { name: "Path", value: path, inline: true },
            { name: "Timestamp", value: new Date().toISOString(), inline: false },
          ],
          footer: { text: "four04.de" },
        },
      ],
    };

    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      /* beacon delivery must never break the response */
    }
  }

  return gif();
}
