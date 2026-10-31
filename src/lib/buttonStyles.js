import { cn } from "./cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium whitespace-nowrap select-none transition-[background-color,color,border-color,box-shadow,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-45";

const variants = {
  primary:
    "bg-accent text-accent-ink shadow-[0_1px_0_rgba(255,255,255,0.28)_inset] hover:bg-accent-hover",
  secondary:
    "border border-line bg-panel text-ink hover:border-line-strong hover:bg-panel-2",
  ghost: "text-muted hover:bg-panel-2 hover:text-ink",
  danger:
    "text-[var(--stage-rejected-ink)] hover:bg-[var(--stage-rejected-soft)]",
  dangerSolid:
    "bg-[var(--stage-rejected-solid)] text-white hover:brightness-95",
};

const sizes = {
  sm: "h-9 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
};

export function buttonStyles({
  variant = "secondary",
  size = "md",
  className,
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
