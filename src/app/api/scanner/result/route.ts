import { NextResponse } from "next/server";
export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store" };
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length")) > 4096) return NextResponse.json({ error: "Invalid request." }, { status: 400, headers });
    const key = process.env.VIRUSTOTAL_API_KEY;
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin." }, { status: 403, headers });
    const { id } = await request.json();
    if (!key || typeof id !== "string" || !/^[a-zA-Z0-9_+/=-]{1,512}$/.test(id)) return NextResponse.json({ error: "Invalid request." }, { status: 400, headers });
    const response = await fetch(`https://www.virustotal.com/api/v3/analyses/${encodeURIComponent(id)}`, { headers: { "x-apikey": key }, cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (!response.ok) return NextResponse.json({ error: response.status === 429 ? "VirusTotal quota exceeded. Try again later." : "Could not retrieve the result." }, { status: response.status === 429 ? 429 : 502, headers });
    const result = await response.json();
    const attributes = result?.data?.attributes;
    if (!attributes || !["queued", "in-progress", "completed"].includes(attributes.status)) throw new Error("Invalid response");
    return NextResponse.json({ status: attributes.status, stats: attributes.status === "completed" ? attributes.stats : null }, { headers });
  } catch {
    return NextResponse.json({ error: "Could not retrieve the result." }, { status: 502, headers });
  }
}
