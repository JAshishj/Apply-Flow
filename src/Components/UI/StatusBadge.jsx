import { cn } from "../../lib/cn";
import { getStatus } from "../../lib/status";

export default function StatusBadge({ status, className }) {
  const meta = getStatus(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10.5px] font-medium tracking-[0.09em] uppercase",
        meta.chip,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}
