import { X } from "lucide-react";
import { useEffect } from "react";
import SidebarContent from "./SidebarContent";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  // Lock page scroll while the drawer is open, so the user isn't
  // scrolling the dashboard underneath a modal-like panel.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Let Escape close it too — cheap accessibility win.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      {/* Drawer panel — always mounted, slid off-screen when closed
         so the transition animates both directions. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed inset-y-0 left-0 z-50 w-72 max-w-[80%]
          bg-[var(--surface)]
          shadow-[18px_0_40px_rgba(54,35,27,0.18)]
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="
            absolute right-4 top-4 z-10
            flex h-9 w-9 items-center justify-center
            rounded-full text-[var(--text-secondary)]
            hover:bg-[var(--stone-100)]
          "
        >
          <X size={18} />
        </button>

        {/* onNavigate closes the drawer the instant a link is clicked —
           no need to watch the route with useEffect. */}
        <SidebarContent variant="mobile" onNavigate={onClose} />
      </div>
    </>
  );
}