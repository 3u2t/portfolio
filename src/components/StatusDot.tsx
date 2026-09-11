import { statusDot, type ProjectStatus } from "@/lib/projects";

export default function StatusDot({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
      <span
        aria-hidden
        className={`inline-block size-1.5 rounded-full ${statusDot[status]} ${status === "live" ? "animate-pulse-dot" : ""}`}
      />
      {label}
    </span>
  );
}
