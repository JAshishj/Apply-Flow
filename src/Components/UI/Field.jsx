import { cn } from "../../lib/cn";

export default function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-[13px] font-medium text-ink"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent-text">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-[12.5px] leading-snug text-[var(--stage-rejected-ink)]"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[12.5px] leading-snug text-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
