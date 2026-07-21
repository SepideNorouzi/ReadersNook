import { BookOpen, House, Library, Search, Settings } from "lucide-react";

export const navItems = [
  {
    icon: House,
    label: "Dashboard",
    path: "/",
    subtitle: "Reading Dashboard",
  },
  {
    icon: Library,
    label: "Library",
    path: "/library",
    subtitle: "My Personal Library",
  },
  {
    icon: BookOpen,
    label: "Collections",
    path: "/collections",
    subtitle: "Reading Collections",
  },
  {
    icon: Search,
    label: "Search",
    path: "/search",
    subtitle: "Find Your Next Read",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
    subtitle: "Preferences & Account",
  },
];
