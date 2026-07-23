// hooks/useScrollFade.ts
import { useEffect, useRef } from "react";

export default function useScrollFade() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const getScrollParent = (el: HTMLElement): HTMLElement | Window => {
      let parent = el.parentElement;
      while (parent) {
        const style = getComputedStyle(parent);
        const scrollableY =
          style.overflowY === "auto" || style.overflowY === "scroll";
        if (scrollableY && parent.scrollHeight > parent.clientHeight) {
          return parent;
        }
        parent = parent.parentElement;
      }
      return window;
    };

    const scrollTarget = getScrollParent(node);

    const handleScroll = () => {
      const scrolled =
        scrollTarget === window
          ? window.scrollY
          : (scrollTarget as HTMLElement).scrollTop;

      const fadeDistance = node.offsetHeight; // measured live, matches H at whatever breakpoint is active
      const opacity = Math.max(0, 1 - scrolled / fadeDistance);
      node.style.opacity = String(opacity);
    };

    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, []);

  return ref;
}
