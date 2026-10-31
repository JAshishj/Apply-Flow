const DAY = 1000 * 60 * 60 * 24;

const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
});

const weekday = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
});

/**
 * Date-only strings ("2025-12-18") are parsed as local dates so a timezone
 * offset never shifts the day the user typed in.
 */
export function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDate(value, fallback = "Not set") {
  const date = parseDate(value);
  return date ? longDate.format(date) : fallback;
}

export function formatShortDate(value, fallback = "Not set") {
  const date = parseDate(value);
  return date ? shortDate.format(date) : fallback;
}

export function formatToday(date = new Date()) {
  return weekday.format(date);
}

export function toISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function daysSince(value) {
  const date = parseDate(value);
  if (!date) return null;

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  return Math.max(0, Math.round((startOfToday - startOfDate) / DAY));
}

export function plural(count, one, many) {
  return count === 1 ? one : many;
}

export function initials(name) {
  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function isHttpUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(String(value));
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
