import type { ReactNode } from "react";
import DesktopNavbar from "../components/navigation/DesktopNavbar";

interface DesktopLayoutProps {
  children: ReactNode;
}

export default function DesktopLayout({
  children,
}: DesktopLayoutProps) {
  return (
    <main
      className="
        relative

        h-screen
        w-screen
        overflow-hidden

        bg-gradient-to-br
        from-[var(--bg)]
        via-[var(--stone-100)]
        to-[var(--bg)]
      "
    >
      {/* Floating desktop navbar */}
      <DesktopNavbar />

      {/* Pages */}
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