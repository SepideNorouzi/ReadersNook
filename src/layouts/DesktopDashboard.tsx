import type { ReactNode } from "react";
import DesktopNavbar from "../features/navigation/DesktopNavbar";

interface DesktopLayoutProps {
  children: ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
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
        <div className="relative min-h-full">
          <DesktopNavbar />

          {children}
        </div>
      </section>
    </main>
  );
}
