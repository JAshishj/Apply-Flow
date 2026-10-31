import { Link } from "react-router-dom";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { formatShortDate } from "../../lib/format";
import Monogram from "../UI/Monogram";
import StatusBadge from "../UI/StatusBadge";

export default function RecentApplications({ applications, onOpen }) {
  return (
    <section
      aria-labelledby="recent-heading"
      className="overflow-hidden rounded-[18px] border border-line bg-panel shadow-[var(--shadow-panel)]"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <h2
          id="recent-heading"
          className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink"
        >
          Recent
        </h2>
        <Link
          to="/Applications"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-muted transition-colors hover:text-ink"
        >
          All applications
          <ArrowRight size={13} />
        </Link>
      </div>

      <ul className="border-t border-line">
        {applications.map((job) => (
          <li key={job.id}>
            <button
              type="button"
              onClick={() => onOpen(job.id)}
              className="group flex w-full items-center gap-3 border-b border-line px-5 py-3 text-left transition-colors last:border-b-0 hover:bg-panel-2/60 sm:px-6"
            >
              <Monogram name={job.company} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium text-ink">
                  {job.company}
                </span>
                <span className="block truncate text-[12.5px] text-muted">
                  {job.title}
                </span>
              </span>
              <span className="hidden font-mono text-[11px] tabular-nums text-faint sm:block">
                {formatShortDate(job.appliedDate)}
              </span>
              <StatusBadge status={job.status} />
              <CaretRight
                size={13}
                className="text-faint transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
