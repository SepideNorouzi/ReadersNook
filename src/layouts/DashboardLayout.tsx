import ResponsiveView from "../components/ResponsiveView";
import DesktopDashboard from "./DesktopDashboard";
import MobileDashboard from "./MobileDashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ResponsiveView
      mobile={<MobileDashboard>{children}</MobileDashboard>}
      desktop={<DesktopDashboard>{children}</DesktopDashboard>}
    />
  );
}
