import { cn } from "../../lib/cn";
import { initials } from "../../lib/format";

const sizes = {
  sm: "h-9 w-9 rounded-[10px] text-[12.5px]",
  lg: "h-14 w-14 rounded-[14px] text-[18px]",
};

export default function Monogram({ name, size = "sm", className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center border border-line bg-panel-2 font-display font-semibold text-muted",
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
