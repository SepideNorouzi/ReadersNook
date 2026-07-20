import { Menu } from "lucide-react";

export default function MobileNavbar() {
  return (
    <header
  className="
    absolute
    inset-x-0
    top-0
    z-50
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
        {/* Menu */}
        <button
          aria-label="Open menu"
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

        {/* Logo */}
        <h1 className="text-sm font-medium tracking-wide text-white">
          The Reader's Nook
        </h1>

        {/* Spacer */}
        <div className="h-10 w-10" />
      </nav>
    </header>
  );
}
