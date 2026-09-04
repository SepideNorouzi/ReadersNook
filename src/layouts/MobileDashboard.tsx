import { useState } from "react";
import { useLocation } from "react-router";

import MobileNavbar from "../features/navigation/MobileNavbar";
import MobileSidebar from "../features/navigation/MobileSidebar";

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
          relative
          isolate
          h-full
          w-full
          max-w-full
          overflow-x-hidden
          overscroll-y-contain

          ${isSidebarOpen ? "overflow-y-hidden" : "overflow-y-auto"}
        `}
      >
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
