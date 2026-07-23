export default function DashboardHeader() {
  return (
    <header className="mb-10">
      <h1
        className="
           mb-4
          text-2xl font-heading font-semibold
          text-[var(--text)]
          lg:text-4xl
        "
      >
        The Reader's Nook
      </h1>
      <span
        className="
          inline-flex rounded-full
          bg-[var(--stone-200)]
          px-3 py-1
          text-xs uppercase tracking-[0.2em]
          text-[var(--text-secondary)]
        "
      >
        Reading Journal
      </span>

      <div className="mt-8 h-px bg-[var(--border)]" />
    </header>
  );
}