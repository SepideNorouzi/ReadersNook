import MobileNavbar from "../components/navigation/MobileNavbar";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <div className="relative">
        <MobileNavbar />

        {children}
      </div>
    </main>
  );
}
