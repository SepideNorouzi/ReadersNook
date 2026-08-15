import { createBrowserRouter, RouterProvider } from "react-router";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import Collections from "../pages/Collections";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import Settings from "../pages/Settings";
import Auth from "../pages/Auth";

import ProtectedRoutes from "../auth/components/ProtectedRoutes";
import RedirectIfAuthenticated from "../auth/components/RedirectAuthenticated";
import Intro from "../pages/Intro";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/library", element: <Library /> },
          { path: "/collections", element: <Collections /> },
          { path: "/search", element: <Search /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
      {
        path: "/book/:id",
        element: <BookDetail />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <RedirectIfAuthenticated>
        <Auth />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/",
    element: <Intro />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
