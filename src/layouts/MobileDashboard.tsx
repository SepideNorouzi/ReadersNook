import { useState } from "react";
import { useLocation } from "react-router";
import MobileNavbar from "../components/navigation/MobileNavbar";
import MobileSidebar from "../components/navigation/MobileSidebar";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const pinNavbar = pathname === "/dashboard";

  return (
    <main className="h-dvh overflow-hidden bg-[#F5F0E8]">
      <div
        className={`
          relative isolate h-full w-full max-w-full overflow-x-hidden overscroll-y-contain
          ${isSidebarOpen ? "overflow-y-hidden" : "overflow-y-auto"}
        `}
      >
        {!pinNavbar && (
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-10
              h-24
              bg-[linear-gradient(180deg,#1c130eb3_0%,#1c130e96_25%,#3b281f78_50%,#3b281f32_75%,transparent_100%)]
            "
          />
        )}
        <MobileNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
          pinned={pinNavbar}
        />
        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {children}
      </div>
    </main>
  );
}