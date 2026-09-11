import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Bot / scraper blocking, mirroring the laxerdim/guns.lol setup:
// tooling user-agents get a plain 403 before any route renders.
// Real browsers (including privacy browsers with trimmed UAs) pass.
// Empty UA is allowed on purpose — blocking it would punish privacy setups.

const BLOCKED_UA_SUBSTRINGS = [
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
  "httpclient",
  "sqlmap",
  "nikto",
  "masscan",
  "nmap",
  "zgrab",
];

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent")?.toLowerCase() ?? "";
  if (ua && BLOCKED_UA_SUBSTRINGS.some((s) => ua.includes(s))) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
