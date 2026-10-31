import { useState } from "react";
import {
  ArrowSquareOut,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import { useApplications } from "../../Context/Application_Context";
import { cn } from "../../lib/cn";
import { formatDate, isHttpUrl } from "../../lib/format";
import { buttonStyles } from "../../lib/buttonStyles";
import Button from "../UI/Button";
import Dialog from "../UI/Dialog";
import Monogram from "../UI/Monogram";
import StatusBadge from "../UI/StatusBadge";

export default function ApplicationDetail({
  application,
  onClose,
  onEdit,
  readOnly = false,
}) {
  const { deleteApplication } = useApplications();
  const [confirming, setConfirming] = useState(false);

  if (!application) return null;

  return (
    <Dialog
      onClose={onClose}
      title={`${application.company}, ${application.title}`}
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-5 pr-14 sm:px-6 sm:pt-6">
        <div className="flex items-start gap-4">
          <Monogram name={application.company} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-[22px] font-semibold tracking-[-0.03em] text-ink">
              {application.company}
            </h2>
            <p className="mt-0.5 truncate text-[13.5px] text-muted">
              {application.title}
            </p>
            <div className="mt-2.5">
              <StatusBadge status={application.status} />
            </div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-4">
          <div>
            <dt className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-faint">
              Applied
            </dt>
            <dd className="mt-1.5 font-mono text-[12.5px] tabular-nums text-ink">
              {formatDate(application.appliedDate)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-faint">
              Last updated
            </dt>
            <dd className="mt-1.5 font-mono text-[12.5px] tabular-nums text-ink">
              {formatDate(application.updatedAt, "Not updated")}
            </dd>
          </div>
        </dl>

        <section className="mt-5">
          <h3 className="text-[12px] font-semibold text-ink">Role summary</h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            {application.description?.trim() || "No summary added."}
          </p>
        </section>

        <section className="mt-5">
          <h3 className="text-[12px] font-semibold text-ink">Notes</h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            {application.notes?.trim() || "No notes yet."}
          </p>
        </section>

        {isHttpUrl(application.link) ? (
          <a
            href={application.link}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonStyles({ variant: "secondary", size: "sm" }), "mt-6")}
          >
            <ArrowSquareOut size={15} />
            Open job posting
          </a>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-5 py-4 sm:px-6">
        <div className="flex items-center gap-1">
          {readOnly ? (
            <p className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-faint">
              Sample record
            </p>
          ) : confirming ? (
            <>
              <Button
                variant="dangerSolid"
                size="sm"
                onClick={() => {
                  deleteApplication(application.id);
                  onClose();
                }}
              >
                Delete application
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirming(false)}
              >
                Keep it
              </Button>
            </>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setConfirming(true)}
            >
              <Trash size={15} />
              Delete
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          {readOnly ? null : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onEdit(application.id)}
            >
              <PencilSimple size={15} />
              Edit
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
}
