"use client";
import { useRef, useState } from "react";
import Link from "next/link";
type Stats = { malicious: number; suspicious: number };
export default function Scanner() {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("i'm ahmed");
  const [detail, setDetail] = useState("i scan the files\nyou upload");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  async function scan() {
    if (!file || !consent) { setDetail("select a file and\nconfirm sharing"); return; }
    if (!file.size || file.size > 3 * 1024 * 1024) { setDetail("file must be under\n3 MiB and not empty"); return; }
    setBusy(true); setDone(false); setMessage("let me think\nbro"); setDetail("");
    try {
      const body = new FormData(); body.append("file", file);
      const response = await fetch("/api/scanner", { method: "POST", body });
      let result = await response.json();
      if (!response.ok) throw new Error(result.error);
      if (result.status !== "completed") {
        const id = result.id;
        for (let n = 0; n < 12; n++) {
          await sleep(10000);
          const res = await fetch("/api/scanner/result", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
          result = await res.json();
          if (!res.ok) throw new Error(result.error);
          if (result.status === "completed") break;
        }
      }
      if (result.status !== "completed") throw new Error("Analysis is still pending. Try again later.");
      const stats: Stats = result.stats;
      if (typeof stats?.malicious !== "number" || typeof stats?.suspicious !== "number") throw new Error("Invalid analysis report.");
      setMessage(stats.malicious + stats.suspicious > 0 ? "haram" : "halal");
      setDetail(`${stats.malicious} malicious, ${stats.suspicious} suspicious.\nA clean result is not a guarantee.`);
    } catch (error) { setMessage("error bro"); setDetail(error instanceof Error ? error.message : "Scan failed."); }
    finally { setBusy(false); setDone(true); }
  }
  return <div className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:px-8">
    <Link href="/#projects" className="text-sm text-zinc-500 hover:text-zinc-200">← all projects</Link>
    <div className="mt-8 w-full max-w-[420px] rounded-md border border-zinc-600 bg-[#111] p-3 font-[Arial,sans-serif] text-[12px] text-zinc-100 shadow-xl">
      <div className="mb-3 flex justify-between border-b border-zinc-700 pb-2"><span>Ahmed - Allah will help you!</span><span aria-hidden>×</span></div>
      <div className="grid grid-cols-[1.25fr_1fr] gap-2">
        <div className="relative aspect-[160/137] overflow-hidden"><img src="/ahmed/bubble.png" alt="" className="h-full w-full" /><div className="absolute left-[10%] top-[12%] w-[75%] whitespace-pre-line text-black"><strong className="text-base">{message}</strong><p className="mt-1 text-xs font-bold">{detail}</p></div></div>
        <img src="/ahmed/ahmed.png" alt="Ahmed" className="aspect-[128/138] h-full w-full border border-zinc-600 object-fill" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div><label htmlFor="sample" className="block">Sample</label><div className="mt-1 flex gap-1"><input id="sample" readOnly value={file?.name ?? ""} className="min-w-0 flex-1 border border-zinc-600 bg-black px-1 py-1" /><input ref={input} type="file" className="sr-only" onChange={e => setFile(e.target.files?.[0] ?? null)} /><button type="button" onClick={() => input.current?.click()} className="border border-zinc-500 bg-zinc-800 px-2">Browse</button></div><button type="button" onClick={done ? () => { setDone(false); setMessage("scan more if\nyou want"); setDetail(""); } : scan} disabled={busy} className="mt-2 border border-zinc-500 bg-zinc-800 px-3 py-1 disabled:opacity-50">{done ? "Thanks" : "Scan"}</button></div>
        <div><p className="mt-8 text-right text-zinc-500">made by u/myuserisdrowned<br />in Visual Basic</p></div>
      </div>
    </div>
    <div className="mt-5 max-w-[420px] text-sm text-zinc-400"><label className="flex items-start gap-2"><input type="checkbox" className="mt-1" checked={consent} onChange={e => setConsent(e.target.checked)} /> <span>Unknown files are uploaded to VirusTotal and may be shared with its community. Do not submit confidential or personal files.</span></label><p className="mt-3">Maximum file size: 3 MiB. <a className="underline" href="https://docs.virustotal.com/reference/files-scan" target="_blank" rel="noopener noreferrer">Learn more</a>.</p><p className="mt-3">Based on <a className="underline" href="https://github.com/Johny-adri2/AhmedScanner" target="_blank" rel="noopener noreferrer">AhmedScanner by John</a> · <a className="underline" href="/ahmed/LICENSE.txt">License</a></p></div>
    <p role="status" aria-live="polite" className="sr-only">{message} {detail}</p>
  </div>;
}
