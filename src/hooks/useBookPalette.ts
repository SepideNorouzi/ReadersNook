import { useEffect, useState } from "react";
import { extractColors } from "extract-colors";

interface Palette {
  color: string;
  shadow: string;
  gradient: string;
}

const defaultPalette: Palette = {
  color: "#8B7355",
  shadow: "rgba(139,115,85,.35)",
  gradient:
    "linear-gradient(145deg,#8B7355 0%,rgba(139,115,85,.45) 70%,transparent 100%)",
};

export function useBookPalette(image: string) {
  const [palette, setPalette] = useState(defaultPalette);

  useEffect(() => {
    if (!image) return;

    let cancelled = false;

    async function getPalette() {
      try {
        const colors = await extractColors(image);

        // bail if a newer run has already superseded this one
        if (cancelled) return;
        if (!colors.length) return;

        const dominant = colors[0];

        setPalette({
          color: dominant.hex,
          shadow: `${dominant.hex}55`,
          gradient: `
            linear-gradient(
              145deg,
              ${dominant.hex},
              ${dominant.hex}99,
              transparent
            )
          `,
        });
      } catch (err) {
        if (!cancelled) console.error(err);
      }
    }

    getPalette();

    // mark this run stale on cleanup (image change or unmount)
    return () => {
      cancelled = true;
    };
  }, [image]);

  return palette;
}
