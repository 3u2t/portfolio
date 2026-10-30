import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
export const runtime = "nodejs";
const MAX_SIZE = 3 * 1024 * 1024;
const headers = { "Cache-Control": "no-store" };
export async function POST(request: Request) {
  const key = process.env.VIRUSTOTAL_API_KEY;
  if (!key) return NextResponse.json({ error: "Scanner is not configured." }, { status: 503, headers });
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin." }, { status: 403, headers });
  const length = Number(request.headers.get("content-length"));
  if (!length || length > MAX_SIZE + 65536) return NextResponse.json({ error: "File exceeds the 3 MiB limit." }, { status: 413, headers });
  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!(file instanceof File) || file.size < 1 || file.size > MAX_SIZE) return NextResponse.json({ error: "Choose a non-empty file up to 3 MiB." }, { status: 400, headers });
    const hash = createHash("sha256").update(Buffer.from(await file.arrayBuffer())).digest("hex");
    const auth = { "x-apikey": key };
    const report = await fetch(`https://www.virustotal.com/api/v3/files/${hash}`, { headers: auth, cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (report.ok) {
      const data = await report.json();
      const stats = data?.data?.attributes?.last_analysis_stats;
      if (!stats || typeof stats.malicious !== "number" || typeof stats.suspicious !== "number") throw new Error("Invalid report");
      return NextResponse.json({ status: "completed", stats }, { headers });
    }
    if (report.status !== 404) return NextResponse.json({ error: report.status === 429 ? "VirusTotal quota exceeded. Try again later." : "VirusTotal could not check this file." }, { status: report.status === 429 ? 429 : 502, headers });
    const body = new FormData(); body.append("file", file);
    const upload = await fetch("https://www.virustotal.com/api/v3/files", { method: "POST", headers: auth, body, cache: "no-store", signal: AbortSignal.timeout(30000) });
    if (!upload.ok) return NextResponse.json({ error: upload.status === 429 ? "VirusTotal quota exceeded. Try again later." : "VirusTotal rejected the upload." }, { status: upload.status === 429 ? 429 : 502, headers });
    const result = await upload.json();
    if (typeof result?.data?.id !== "string") throw new Error("Invalid response");
    return NextResponse.json({ status: "queued", id: result.data.id }, { headers });
  } catch { return NextResponse.json({ error: "Scan failed. Please try again." }, { status: 502, headers }); }
}
