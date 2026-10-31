import { Eye } from "@phosphor-icons/react";
import { useApplications } from "../../Context/Application_Context";

export default function SampleModeNotice() {
  const { sampleMode } = useApplications();

  if (!sampleMode) return null;

  return (
    <section
      aria-label="Sample data"
      className="mb-6 flex items-start gap-3 rounded-[12px] border border-accent/35 bg-accent-soft px-4 py-3"
    >
      <span className="mt-px grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
        <Eye size={13} weight="bold" />
      </span>
      <p className="text-[13px] leading-relaxed text-accent-text">
        Previewing sample data. These are example records, and nothing here is
        saved to this device.
      </p>
    </section>
  );
}
