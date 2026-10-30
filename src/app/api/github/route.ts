import { NextResponse } from "next/server";
import { getGithubRepos } from "@/lib/github";

export async function GET() {
  const repos = await getGithubRepos();
  if (!repos) {
    return NextResponse.json({ ok: false, repos: [] }, { status: 502 });
  }
  return NextResponse.json({ ok: true, repos });
}
