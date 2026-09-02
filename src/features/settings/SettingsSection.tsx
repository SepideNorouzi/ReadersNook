type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function SettingsSection({
  title,
  description,
  children,
}: Props) {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-[24px]
        border border-[var(--brown-200)]
        bg-gradient-to-br
        from-[var(--surface)]
        via-[var(--surface)]
        to-[var(--brown-50)]
        p-4
        shadow-[0_8px_24px_rgba(35,23,17,0.06)]
        sm:p-5
      "
    >
      <div
        className="
          pointer-events-none
          absolute -right-16 -top-20
          h-44 w-44
          rounded-full
          bg-[var(--gold)]/8
          blur-3xl
        "
      />

      <div className="relative mb-5 px-1 sm:px-2">
        <h2
          className="
            font-heading
            text-lg font-semibold
            text-[var(--text)]
          "
        >
          {title}
        </h2>

        <p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">
          {description}
        </p>
      </div>

      <div className="relative flex flex-col gap-4">{children}</div>
    </section>
  );
}
