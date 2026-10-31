const ROWS = [
  { key: "last30Days", label: "Last 30 days" },
  { key: "last6Months", label: "Last 6 months" },
  { key: "last1Year", label: "Last 12 months" },
];

export default function CadencePanel({ counts }) {
  return (
    <section
      aria-labelledby="cadence-heading"
      className="rounded-[18px] border border-line bg-panel p-5 shadow-[var(--shadow-panel)]"
    >
      <h2
        id="cadence-heading"
        className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink"
      >
        Cadence
      </h2>

      <dl className="mt-3 divide-y divide-line">
        {ROWS.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-[12.5px] text-muted">{label}</dt>
            <dd className="font-mono text-[14px] font-medium tabular-nums text-ink">
              {counts[key] || 0}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
