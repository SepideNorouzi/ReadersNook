import { Outlet } from "react-router";

import ResponsiveView from "../components/ResponsiveView";
import MobileLayout from "./MobileDashboard";
import DesktopLayout from "./DesktopDashboard";

export default function DashboardLayout() {
  return (
    <ResponsiveView
      mobile={
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      }
      desktop={
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      }
    />
  );
}
