// this is nested routing instead of the regular ones i always use.

import { createBrowserRouter, RouterProvider } from "react-router";

import Dashboard from "../pages/Dashboard";
import BookDetail from "../pages/BookDetail";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "book/:id",
        element: <BookDetail />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
