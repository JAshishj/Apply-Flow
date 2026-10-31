import { useMemo, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import ApplicationDialog from "../Components/Application_UI/ApplicationDialog";
import CadencePanel from "../Components/Dashboard_UI/CadencePanel";
import MomentumPanel from "../Components/Dashboard_UI/MomentumPanel";
import Pipeline from "../Components/Dashboard_UI/Pipeline";
import RecentApplications from "../Components/Dashboard_UI/RecentApplications";
import AppShell from "../Components/Layout/AppShell";
import Button from "../Components/UI/Button";
import Reveal from "../Components/UI/Reveal";
import SampleModeNotice from "../Components/UI/SampleModeNotice";
import SampleModeToggle from "../Components/UI/SampleModeToggle";
import { useApplications } from "../Context/Application_Context";
import { daysSince, formatToday, parseDate, plural } from "../lib/format";
import { countByStatus } from "../lib/status";

function buildSummary(total, counts) {
  if (total === 0) {
    return "Nothing tracked yet. Add an application to start the pipeline.";
  }

  const parts = [
    `${total} ${plural(total, "application", "applications")} tracked.`,
  ];

  if (counts.Interview) parts.push(`${counts.Interview} in interview.`);
  if (counts.Offer) {
    parts.push(
      `${counts.Offer} ${plural(counts.Offer, "offer", "offers")} received.`,
    );
  }
  if (!counts.Interview && !counts.Offer && counts.Rejected) {
    parts.push(`${counts.Rejected} rejected.`);
  }

  return parts.slice(0, 3).join(" ");
}

function buildCadence(applications) {
  const now = new Date();
  const cutoffs = {
    last30Days: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30),
    last6Months: new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()),
    last1Year: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
  };

  const dates = applications
    .map((job) => parseDate(job.appliedDate))
    .filter(Boolean);

  return {
    last30Days: dates.filter((date) => date >= cutoffs.last30Days).length,
    last6Months: dates.filter((date) => date >= cutoffs.last6Months).length,
    last1Year: dates.filter((date) => date >= cutoffs.last1Year).length,
  };
}

const Dashboard = () => {
  const { applications, sampleMode, showSampleData } = useApplications();
  const [dialog, setDialog] = useState(null);

  const total = applications.length;
  const counts = useMemo(() => countByStatus(applications), [applications]);
  const cadence = useMemo(() => buildCadence(applications), [applications]);

  const recent = useMemo(
    () =>
      [...applications]
        .sort(
          (a, b) =>
            (parseDate(b.appliedDate)?.getTime() ?? 0) -
            (parseDate(a.appliedDate)?.getTime() ?? 0),
        )
        .slice(0, 5),
    [applications],
  );

  const latest = useMemo(
    () =>
      applications.reduce(
        (acc, job) => {
          const time = parseDate(job.appliedDate)?.getTime() ?? 0;
          return time > acc.time ? { time, date: job.appliedDate } : acc;
        },
        { time: -Infinity, date: null },
      ),
    [applications],
  );

  const since = latest.date ? daysSince(latest.date) : null;
  const summary = buildSummary(total, counts);

  const openCreate = () => setDialog({ type: "create" });

  return (
    <AppShell>
      <SampleModeNotice />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2rem,4.4vw,2.6rem)] leading-[1.03] font-semibold tracking-[-0.045em] text-ink">
            Overview
          </h1>
          <p className="mt-2.5 max-w-[54ch] text-[14px] leading-relaxed text-muted">
            {summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="hidden font-mono text-[11px] tracking-[0.12em] uppercase text-faint sm:block">
            {formatToday()}
          </span>
          {total > 0 || sampleMode ? <SampleModeToggle /> : null}
          {sampleMode ? null : (
            <Button variant="primary" onClick={openCreate}>
              <Plus size={16} weight="bold" />
              New application
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <Reveal>
          <Pipeline
            counts={counts}
            total={total}
            onAdd={openCreate}
            onViewSample={showSampleData}
          />
        </Reveal>

        {total > 0 ? (
          <div className="grid gap-5 lg:grid-cols-12">
            <Reveal delay={0.06} className="lg:col-span-7">
              <RecentApplications
                applications={recent}
                onOpen={(id) => setDialog({ type: "view", id })}
              />
            </Reveal>

            <div className="flex flex-col gap-5 lg:col-span-5">
              <Reveal delay={0.12}>
                <MomentumPanel lastAppliedDate={latest.date} days={since} />
              </Reveal>
              <Reveal delay={0.18}>
                <CadencePanel counts={cadence} />
              </Reveal>
            </div>
          </div>
        ) : null}
      </div>

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

export default Dashboard;
