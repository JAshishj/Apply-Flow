import { formatDate } from "../../lib/format";

export default function MomentumPanel({ lastAppliedDate, days }) {
  return (
    <section
      aria-labelledby="momentum-heading"
      className="rounded-[18px] border border-line bg-panel p-5 shadow-[var(--shadow-panel)]"
    >
      <h2
        id="momentum-heading"
        className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink"
      >
        Momentum
      </h2>
      <p className="mt-1 text-[12.5px] text-muted">
        Since your last application
      </p>

      {days === null ? (
        <p className="mt-4 font-mono text-[12.5px] text-faint">
          No applications yet
        </p>
      ) : (
        <>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-[46px] leading-none font-medium tracking-[-0.05em] tabular-nums text-ink">
              {days}
            </span>
            <span className="text-[13px] text-muted">
              {days === 1 ? "day" : "days"}
            </span>
          </div>
          <p className="mt-3 font-mono text-[11px] tabular-nums text-faint">
            {days === 0
              ? "Applied today"
              : `Last applied ${formatDate(lastAppliedDate)}`}
          </p>
        </>
      )}
    </section>
  );
}
