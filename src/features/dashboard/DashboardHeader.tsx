export default function DashboardHeader() {
  return (
    <header className="mb-6 sm:mb-8 lg:mb-10">
      <h1
        className="
          mb-3
          sm:mb-4

          text-xl
          sm:text-2xl
          lg:text-4xl

          font-heading
          font-semibold
          text-[var(--text)]
        "
      >
        The Reader's Nook
      </h1>

      <span
        className="
          inline-flex
          rounded-full
          bg-[var(--stone-200)]
          px-2.5
          py-1
          sm:px-3

          text-[10px]
          sm:text-xs
          uppercase
          tracking-[0.2em]
          text-[var(--text-secondary)]
        "
      >
        Reading Journal
      </span>

      <div className="mt-5 h-px bg-[var(--border)] sm:mt-8" />
    </header>
  );
}
