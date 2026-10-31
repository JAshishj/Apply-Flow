import { Link } from "react-router-dom";
import AppShell from "../Components/Layout/AppShell";
import { buttonStyles } from "../lib/buttonStyles";
import { cn } from "../lib/cn";

export default function NotFound() {
  return (
    <AppShell>
      <div className="flex min-h-[60dvh] flex-col items-center justify-center text-center">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-faint">
          404
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-ink">
          There is no page here.
        </h1>
        <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-muted">
          Check the address, or head back to your overview.
        </p>
        <Link
          to="/"
          className={cn(buttonStyles({ variant: "primary" }), "mt-6")}
        >
          Back to overview
        </Link>
      </div>
    </AppShell>
  );
}
