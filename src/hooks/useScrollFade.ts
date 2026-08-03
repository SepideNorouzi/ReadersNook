// hooks/useScrollFade.ts

import { useEffect, useRef } from "react";

export default function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleScroll = () => {
      const maxScroll = node.scrollHeight - node.clientHeight;

      if (maxScroll <= 0) {
        node.style.setProperty("--fade-opacity", "0");
        return;
      }

      const distanceFromBottom = maxScroll - node.scrollTop;

      const opacity = Math.min(1, distanceFromBottom / 80);

      node.style.setProperty("--fade-opacity", opacity.toString());
    };

    handleScroll();

    node.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  return ref;
}
