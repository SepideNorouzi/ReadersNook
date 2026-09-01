interface DesktopLayoutProps {
  children: React.ReactNode;
}

export default function DesktopLayout({
  children,
}: DesktopLayoutProps) {
  return (
    <main
      className="
        h-screen
        w-screen
        overflow-hidden

        bg-gradient-to-br
        from-[var(--bg)]
        via-[var(--stone-100)]
        to-[var(--bg)]
      "
    >
      <section
        className="
          h-full
          w-full

          overflow-y-auto
        "
      >
        {children}
      </section>
    </main>
  );
}