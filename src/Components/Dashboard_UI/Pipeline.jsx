import { FlowArrow } from "@phosphor-icons/react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { getStatus, STATUSES } from "../../lib/status";
import Button from "../UI/Button";
import EmptyState from "../UI/EmptyState";

export default function Pipeline({ counts, total, onAdd, onViewSample }) {
  const reduce = useReducedMotion();
  const hasData = total > 0;
  const splitLabel = STATUSES.map(
    (status) => `${status} ${counts[status] || 0}`,
  ).join(", ");

  return (
    <section
      aria-labelledby="pipeline-heading"
      className="rounded-[18px] border border-line bg-panel shadow-[var(--shadow-panel)]"
    >
      <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <h2
          id="pipeline-heading"
          className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink"
        >
          Pipeline
        </h2>
        <p className="font-mono text-[11.5px] tabular-nums text-faint">
          {total} {total === 1 ? "application" : "applications"}
        </p>
      </div>

      {hasData ? (
        <>
          <div className="mt-5 px-5 sm:px-6">
            <div
              role="img"
              aria-label={`Pipeline split. ${splitLabel}.`}
              className="flex h-2.5 gap-1"
            >
              {STATUSES.map((status) => {
                const count = counts[status] || 0;
                if (!count) return null;

                return (
                  <Motion.span
                    key={status}
                    className="h-full rounded-full"
                    style={{
                      background: getStatus(status).solid,
                      flexBasis: 0,
                      minWidth: 0,
                    }}
                    initial={reduce ? false : { flexGrow: 0 }}
                    animate={{ flexGrow: count }}
                    transition={{
                      duration: 0.7,
                      delay: 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                );
              })}
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-y-6 border-t border-line px-5 py-5 sm:flex sm:divide-x sm:divide-line sm:px-6">
            {STATUSES.map((status) => {
              const count = counts[status] || 0;
              const share = total ? Math.round((count / total) * 100) : 0;

              return (
                <div
                  key={status}
                  className="sm:flex-1 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                >
                  <dt className="flex items-center gap-2 text-[12.5px] font-medium text-muted">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-[3px]"
                      style={{ background: getStatus(status).solid }}
                    />
                    {status}
                  </dt>
                  <dd className="mt-2.5 font-mono text-[28px] leading-none font-medium tracking-[-0.04em] tabular-nums text-ink">
                    {count}
                  </dd>
                  <dd className="mt-2 font-mono text-[11px] tabular-nums text-faint">
                    {share}%
                  </dd>
                </div>
              );
            })}
          </dl>
        </>
      ) : (
        <EmptyState
          icon={FlowArrow}
          title="Nothing in the pipeline yet"
          description="Add your first application, or preview the sample set to see how the stages read."
        >
          <Button variant="primary" onClick={onAdd}>
            Add application
          </Button>
          <Button variant="secondary" onClick={onViewSample}>
            View sample data
          </Button>
        </EmptyState>
      )}
    </section>
  );
}
