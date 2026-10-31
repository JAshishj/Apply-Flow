export default function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {Icon ? (
        <span className="grid h-12 w-12 place-items-center rounded-[14px] border border-line bg-panel-2 text-accent-text">
          <Icon size={22} weight="duotone" />
        </span>
      ) : null}
      <h3 className="mt-4 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[46ch] text-[13.5px] leading-relaxed text-muted">
        {description}
      </p>
      {children ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}
