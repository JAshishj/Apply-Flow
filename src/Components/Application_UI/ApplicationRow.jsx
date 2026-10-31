import { CaretRight } from "@phosphor-icons/react";
import { formatShortDate } from "../../lib/format";
import Monogram from "../UI/Monogram";
import StatusBadge from "../UI/StatusBadge";

export default function ApplicationRow({ job, onOpen }) {
  return (
    <li className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={() => onOpen(job.id)}
        className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3.5 text-left transition-colors hover:bg-panel-2/50 md:grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)_150px_130px_40px] md:gap-4 md:px-4"
      >
        <span className="md:hidden">
          <Monogram name={job.company} />
        </span>

        <span className="min-w-0 md:hidden">
          <span className="block truncate text-[13.5px] font-medium text-ink">
            {job.company}
          </span>
          <span className="mt-0.5 block truncate text-[12px] text-muted">
            {job.title}
          </span>
          <span className="mt-1 block font-mono text-[10.5px] tabular-nums text-faint">
            {formatShortDate(job.appliedDate)}
          </span>
        </span>

        <span className="flex items-center gap-1.5 md:hidden">
          <StatusBadge status={job.status} />
          <CaretRight size={14} className="text-faint" />
        </span>

        <span className="hidden min-w-0 items-center gap-3 md:flex">
          <Monogram name={job.company} />
          <span className="truncate text-[13.5px] font-medium text-ink">
            {job.company}
          </span>
        </span>

        <span className="hidden truncate text-[13px] text-muted md:block">
          {job.title}
        </span>

        <span className="hidden md:block">
          <StatusBadge status={job.status} />
        </span>

        <span className="hidden font-mono text-[11.5px] tabular-nums text-muted md:block">
          {formatShortDate(job.appliedDate)}
        </span>

        <span className="hidden justify-end md:flex">
          <CaretRight
            size={15}
            className="text-faint transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </button>
    </li>
  );
}
