import {
  House,
  Library,
  Search,
  Settings,
  Folder,
  Quote,
} from "lucide-react";

export const navItems = [
  {
    icon: House,
    label: "Home",
    path: "/dashboard",
    subtitle: "Dashboard",
  },

  {
    icon: Library,
    label: "My Library",
    path: "/library",
    subtitle: "My Personal Library",
  },

  {
    icon: Folder,
    label: "Collections",
    path: "/collections",
    subtitle: "Book Collections",
  },

  {
    icon: Search,
    label: "Search",
    path: "/search",
    subtitle: "Find Your Next Read",
  },

  {
    icon: Quote,
    label: "Quotes",
    path: "/quotes",
    subtitle: "Saved Quotes",
  },

  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
    subtitle: "Preferences & Account",
  },
];