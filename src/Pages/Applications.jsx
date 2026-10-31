import { useMemo, useState } from "react";
import {
  CaretDown,
  FlowArrow,
  MagnifyingGlass,
  Plus,
  X,
} from "@phosphor-icons/react";
import ApplicationDialog from "../Components/Application_UI/ApplicationDialog";
import ApplicationRow from "../Components/Application_UI/ApplicationRow";
import AppShell from "../Components/Layout/AppShell";
import Button from "../Components/UI/Button";
import EmptyState from "../Components/UI/EmptyState";
import SampleModeNotice from "../Components/UI/SampleModeNotice";
import SampleModeToggle from "../Components/UI/SampleModeToggle";
import { inputClass } from "../lib/inputStyles";
import { useApplications } from "../Context/Application_Context";
import { cn } from "../lib/cn";
import { parseDate, plural } from "../lib/format";
import { countByStatus, getStatus, STATUSES } from "../lib/status";

const FILTERS = ["All", ...STATUSES];

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "company", label: "Company A to Z" },
];

const Applications = () => {
  const { applications, sampleMode, showSampleData } = useApplications();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [dialog, setDialog] = useState(null);

  const total = applications.length;
  const counts = useMemo(() => countByStatus(applications), [applications]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = applications.filter((job) => {
      const matchesStage =
        statusFilter === "All" || getStatus(job.status).key === statusFilter;
      const haystack = `${job.company ?? ""} ${job.title ?? ""}`.toLowerCase();

      return matchesStage && (!needle || haystack.includes(needle));
    });

    return filtered.sort((a, b) => {
      if (sort === "company") {
        return String(a.company ?? "").localeCompare(String(b.company ?? ""));
      }

      const aTime = parseDate(a.appliedDate)?.getTime() ?? 0;
      const bTime = parseDate(b.appliedDate)?.getTime() ?? 0;
      return sort === "oldest" ? aTime - bTime : bTime - aTime;
    });
  }, [applications, query, statusFilter, sort]);

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All");
  };

  const openCreate = () => setDialog({ type: "create" });
  const openView = (id) => setDialog({ type: "view", id });

  return (
    <AppShell>
      <SampleModeNotice />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2rem,4.4vw,2.6rem)] leading-[1.03] font-semibold tracking-[-0.045em] text-ink">
            Applications
          </h1>
          <p className="mt-2.5 max-w-[54ch] text-[14px] leading-relaxed text-muted">
            {total === 0
              ? "Nothing tracked yet."
              : `${total} ${plural(total, "application", "applications")} tracked. ${counts.Interview || 0} in interview.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {total > 0 || sampleMode ? <SampleModeToggle /> : null}
          {sampleMode ? null : (
            <Button variant="primary" onClick={openCreate}>
              <Plus size={16} weight="bold" />
              New application
            </Button>
          )}
        </div>
      </div>

      {total > 0 ? (
        <div className="mt-7 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
              <MagnifyingGlass
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search company or role"
                aria-label="Search applications"
                className={cn(inputClass, "pl-9", query && "pr-9")}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-faint transition-colors hover:bg-panel-2 hover:text-ink"
                >
                  <X size={13} weight="bold" />
                </button>
              ) : null}
            </div>

            <div
              role="group"
              aria-label="Filter by stage"
              className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-1 sm:pb-0"
            >
              {FILTERS.map((filter) => {
                const active = statusFilter === filter;
                const count = filter === "All" ? total : counts[filter] || 0;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-medium transition-colors duration-150",
                      active
                        ? "border-transparent bg-ink text-canvas"
                        : "border-line bg-panel text-muted hover:border-line-strong hover:text-ink",
                    )}
                  >
                    {filter}
                    <span
                      className={cn(
                        "font-mono text-[10.5px] tabular-nums",
                        active ? "text-canvas/70" : "text-faint",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative w-fit">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort applications"
              className={cn(
                inputClass,
                "h-9 w-auto appearance-none pr-8 pl-3 text-[13px]",
              )}
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <CaretDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-faint"
            />
          </div>
        </div>
      ) : null}

      {total === 0 ? (
        <div className="mt-6 rounded-[18px] border border-line bg-panel shadow-(--shadow-panel)">
          <EmptyState
            icon={FlowArrow}
            title="No applications yet"
            description="Add your first application, or preview the sample set to see how the list works."
          >
            <Button variant="primary" onClick={openCreate}>
              Add application
            </Button>
            <Button variant="secondary" onClick={showSampleData}>
              View sample data
            </Button>
          </EmptyState>
        </div>
      ) : (
        <>
          <div className="mt-5 overflow-hidden rounded-[18px] border border-line bg-panel shadow-(--shadow-panel)">
            {visible.length > 0 ? (
              <>
                <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)_150px_130px_40px] items-center gap-4 border-b border-line px-4 pt-3 pb-2.5 font-mono text-[10px] tracking-[0.12em] uppercase text-faint md:grid">
                  <span>Company</span>
                  <span>Position</span>
                  <span>Status</span>
                  <span>Applied</span>
                  <span className="sr-only">Open</span>
                </div>

                <ul>
                  {visible.map((job) => (
                    <ApplicationRow key={job.id} job={job} onOpen={openView} />
                  ))}
                </ul>
              </>
            ) : (
              <EmptyState
                icon={MagnifyingGlass}
                title="Nothing matches that search"
                description="Try another company or role, or reset the stage filter."
              >
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              </EmptyState>
            )}
          </div>

          <p className="mt-3 font-mono text-[11px] tabular-nums text-faint">
            Showing {visible.length} of {total}
          </p>
        </>
      )}

      <ApplicationDialog
        dialog={dialog}
        readOnly={sampleMode}
        onClose={() => {
          if (dialog?.type === "edit") {
            setDialog({ type: "view", id: dialog.id });
          } else {
            setDialog(null);
          }
        }}
        onEdit={(id) => setDialog({ type: "edit", id })}
      />
    </AppShell>
  );
};

export default Applications;
