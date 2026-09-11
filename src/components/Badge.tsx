export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-zinc-300">
      {label}
    </span>
  );
}
