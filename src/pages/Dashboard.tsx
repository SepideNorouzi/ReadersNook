import ResponsiveView from "../components/ResponsiveView";
import DesktopDashboard from "../layouts/DesktopDashboard";
import MobileDashboard from "../layouts/MobileDashboard";

export default function Dashboard() {
  return (
    <ResponsiveView
      mobile={<MobileDashboard />}
      desktop={<DesktopDashboard />}
    />
  );
}
