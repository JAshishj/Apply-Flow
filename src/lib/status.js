export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

const META = {
  Applied: {
    label: "Applied",
    chip: "bg-[var(--stage-applied-soft)] text-[var(--stage-applied-ink)]",
    solid: "var(--stage-applied-solid)",
  },
  Interview: {
    label: "Interview",
    chip: "bg-[var(--stage-interview-soft)] text-[var(--stage-interview-ink)]",
    solid: "var(--stage-interview-solid)",
  },
  Offer: {
    label: "Offer",
    chip: "bg-[var(--stage-offer-soft)] text-[var(--stage-offer-ink)]",
    solid: "var(--stage-offer-solid)",
  },
  Rejected: {
    label: "Rejected",
    chip: "bg-[var(--stage-rejected-soft)] text-[var(--stage-rejected-ink)]",
    solid: "var(--stage-rejected-solid)",
  },
};

/**
 * Tolerates lower-case values saved by older versions of the app, and folds
 * anything unrecognised back into the first real stage so it stays countable.
 */
export function normalizeStatus(status) {
  const value = String(status ?? "")
    .trim()
    .toLowerCase();
  const match = STATUSES.find((item) => item.toLowerCase() === value);
  return match || "Applied";
}

export function getStatus(status) {
  const key = normalizeStatus(status);
  return { key, ...META[key] };
}

export function countByStatus(applications) {
  return applications.reduce((counts, job) => {
    const key = getStatus(job.status).key;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}
