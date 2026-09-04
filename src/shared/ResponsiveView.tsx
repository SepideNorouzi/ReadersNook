import type { ReactNode } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface ResponsiveViewProps {
  mobile: ReactNode;
  desktop: ReactNode;
}

/**
 * Mounts exactly one layout tree.
 * Previously both mobile and desktop were always mounted (CSS-hidden),
 * which doubled Embla carousels, scroll listeners, and React Query subscribers.
 */
export default function ResponsiveView({
  mobile,
  desktop,
}: ResponsiveViewProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return isDesktop ? desktop : mobile;
}
