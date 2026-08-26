import { useState } from "react";
import MobileNavbar from "../components/navigation/MobileNavbar";
import MobileSidebar from "../components/navigation/MobileSidebar";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F0E8]">
      <div className="relative isolate w-full max-w-full">
        <MobileNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {children}
      </div>
    </main>
  );
}