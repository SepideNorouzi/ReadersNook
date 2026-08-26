import { Menu } from "lucide-react";

interface MobileNavbarProps {
  onMenuClick: () => void;
}

export default function MobileNavbar({ onMenuClick }: MobileNavbarProps) {
  return (
    <header
      className="
        absolute
        inset-x-0
        top-0
        z-20
        lg:hidden
      "
    >
      <nav
        className="
          mx-4
          mt-4
          flex
          h-14
          items-center
          justify-between
          rounded-full
          border
          border-white/20
          bg-white/15
          px-5
          backdrop-blur-md
        "
      >
        <button
          aria-label="Open menu"
          onClick={onMenuClick}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition-colors
            hover:bg-white/10
          "
        >
          <Menu size={22} className="text-white" />
        </button>

        <h1 className="text-sm font-medium tracking-wide text-white">
          The Reader's Nook
        </h1>

        <div className="h-10 w-10" />
      </nav>
    </header>
  );
}