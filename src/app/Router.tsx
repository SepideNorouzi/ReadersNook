import { createBrowserRouter, RouterProvider } from "react-router";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import Collections from "../pages/Collections";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    element: <DashboardLayout />,

    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/library",
        element: <Library />,
      },

      {
        path: "/collections",
        element: <Collections />,
      },

      {
        path: "/search",
        element: <Search />,
      },

      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "/book/:id",
    element: <BookDetail />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
