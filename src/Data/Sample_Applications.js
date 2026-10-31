import { toISODate } from "../lib/format";

/**
 * Sample applications are dated relative to today, so the Momentum and Cadence
 * panels show a realistic spread whenever someone previews them. Ids are stable,
 * so the preview looks the same on every visit.
 *
 * These records are never written to storage. They only exist while the app is
 * in sample mode, and switching back leaves real data untouched.
 */

function daysAgo(count) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - count);
  return date;
}

function timestamp(count, hour) {
  const date = daysAgo(count);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

function sample({
  id,
  company,
  title,
  status,
  applied,
  updated,
  description,
  link,
  notes,
}) {
  return {
    id: `sample-${id}`,
    company,
    title,
    status,
    appliedDate: toISODate(daysAgo(applied)),
    createdAt: timestamp(applied, 9),
    updatedAt: timestamp(updated ?? applied, 15),
    description,
    link,
    notes,
  };
}

export const Sample_Applications = [
  sample({
    id: "monzo",
    company: "Monzo",
    title: "Frontend Engineer",
    status: "Interview",
    applied: 3,
    updated: 1,
    description:
      "Building the customer-facing account experience in React and TypeScript, with a strong focus on accessibility.",
    link: "https://monzo.com/careers",
    notes: "Recruiter screen done. Second round with the payments team on Thursday.",
  }),
  sample({
    id: "linear",
    company: "Linear",
    title: "Product Engineer",
    status: "Applied",
    applied: 6,
    description:
      "Shipping end to end product features across the web app, working directly with design and the founders.",
    link: "https://linear.app/careers",
    notes: "Referred by Priya. No reply yet.",
  }),
  sample({
    id: "duolingo",
    company: "Duolingo",
    title: "Senior Frontend Engineer",
    status: "Interview",
    applied: 11,
    updated: 2,
    description:
      "Owning the lesson experience on web, from interaction design through to performance budgets.",
    link: "https://careers.duolingo.com",
    notes: "Take home is a small React app. Due next Monday.",
  }),
  sample({
    id: "stripe",
    company: "Stripe",
    title: "Product Engineer",
    status: "Offer",
    applied: 18,
    updated: 4,
    description:
      "Working across the payments dashboard, turning complex money flows into interfaces people trust.",
    link: "https://stripe.com/jobs",
    notes: "Offer at the top of the band. Asked about the start date.",
  }),
  sample({
    id: "figma",
    company: "Figma",
    title: "Design Engineer",
    status: "Applied",
    applied: 26,
    description:
      "Prototyping and shipping editor surface features where design tooling meets production code.",
    link: "https://www.figma.com/careers",
    notes: "Applied through the design engineering board.",
  }),
  sample({
    id: "notion",
    company: "Notion",
    title: "Frontend Engineer",
    status: "Rejected",
    applied: 34,
    updated: 28,
    description:
      "Improving the block editor and the collaborative editing experience across the web app.",
    link: "https://www.notion.so/careers",
    notes: "Rejected after the system design round.",
  }),
  sample({
    id: "monarch",
    company: "Monarch Money",
    title: "Software Engineer, Web",
    status: "Applied",
    applied: 48,
    updated: 45,
    description:
      "Building budgeting and net worth views for a personal finance product used by thousands of households.",
    link: "https://www.monarchmoney.com/careers",
    notes: "Recruiter asked for salary expectations.",
  }),
  sample({
    id: "vercel",
    company: "Vercel",
    title: "Frontend Engineer",
    status: "Rejected",
    applied: 63,
    updated: 49,
    description:
      "Working on the dashboard and deployment experience that frontend teams use every day.",
    link: "https://vercel.com/careers",
    notes: "No response after four weeks.",
  }),
  sample({
    id: "raycast",
    company: "Raycast",
    title: "Product Engineer",
    status: "Interview",
    applied: 96,
    updated: 12,
    description:
      "Shipping extensions and core app features for a keyboard first launcher on macOS.",
    link: "https://www.raycast.com/careers",
    notes: "Third round scheduled with the founders.",
  }),
  sample({
    id: "superhuman",
    company: "Superhuman",
    title: "Frontend Engineer",
    status: "Applied",
    applied: 140,
    updated: 138,
    description:
      "Building the web client for a fast, keyboard driven email product.",
    link: "https://superhuman.com/careers",
    notes: "Waiting on the hiring manager.",
  }),
  sample({
    id: "atlassian",
    company: "Atlassian",
    title: "Frontend Engineer",
    status: "Rejected",
    applied: 240,
    updated: 210,
    description:
      "Contributing to the shared UI components used across Jira and Confluence.",
    link: "https://www.atlassian.com/company/careers",
    notes: "Role closed before the final round.",
  }),
];
