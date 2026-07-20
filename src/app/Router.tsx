import { createBrowserRouter, RouterProvider } from "react-router";

import Dashboard from "../pages/Dashboard";
import BookDetail from "../pages/BookDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "book/:id",
    element: <BookDetail />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
