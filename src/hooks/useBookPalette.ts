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

    async function getPalette() {
      try {
        const colors = await extractColors(image);

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
        console.error(err);
      }
    }

    getPalette();
  }, [image]);

  return palette;
}
