import { Link } from "react-router-dom";
import { FlowArrow } from "@phosphor-icons/react";

export default function Wordmark() {
  return (
    <Link
      to="/"
      aria-label="ApplyFlow home"
      className="group inline-flex items-center gap-2.5 rounded-[10px]"
    >
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-accent text-accent-ink transition-transform duration-200 group-hover:-rotate-6">
        <FlowArrow size={17} weight="bold" />
      </span>
      <span className="font-display text-[18px] font-semibold tracking-[-0.035em] text-ink">
        ApplyFlow
      </span>
    </Link>
  );
}
