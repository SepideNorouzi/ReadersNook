// features/Detail/aesthetic/Aesthetic.tsx
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Plus, Trash2 } from "lucide-react";
import { aestheticPhotos } from "../../../data/aesthetic";

interface LocalPhoto {
  id: string;
  url: string;
}

interface Props {
  bookId: string;
}

// Deterministic alternating tilt values — not random, so the layout
// doesn't jitter between renders/re-mounts.
const TILTS = [-3, 2, -2, 3, -1.5, 2.5];

export default function Aesthetic({ bookId }: Props) {
  const [localPhotos, setLocalPhotos] = useState<LocalPhoto[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const bookPhotos = aestheticPhotos.filter((photo) => photo.bookId === bookId);

  const totalCount = localPhotos.length + bookPhotos.length;

  useEffect(() => {
    return () => {
      localPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [localPhotos]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setLocalPhotos((prev) => [...prev, { id: crypto.randomUUID(), url }]);

    event.target.value = "";
  }

  function handleRemoveLocalPhoto(id: string) {
    setLocalPhotos((prev) => {
      const target = prev.find((photo) => photo.id === id);

      if (target) URL.revokeObjectURL(target.url);

      return prev.filter((photo) => photo.id !== id);
    });
  }

  return (
    <section
      className="
        px-6
        lg:pt-7
      "
    >
      <div
        className="
          max-w-3xl
          rounded-[30px]
          border
          border-[var(--brown-300)]/40
          bg-gradient-to-br
          from-[var(--brown-200)]
          via-[var(--brown-100)]
          to-[var(--brown-300)]
          p-8
          lg:p-10
          shadow-[0_18px_40px_rgba(35,23,17,0.12)]
        "
      >
        <div className="flex items-end justify-between">
          <div>
            <h2
              className="
                font-serif
                text-3xl
                text-brown-900
              "
            >
              Aesthetic
            </h2>
            <p
              className="
              mt-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[var(--gold)]
              "
            >
              The colors, places and moments this book reminds you of.
            </p>
          </div>

          <p
            className="
              text-sm
              font-medium
              text-[var(--text-secondary)]
            "
          >
            {totalCount} {totalCount === 1 ? "photo" : "photos"}
          </p>
        </div>

        <div className="relative mt-5">
          <div
            className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-x-4

      h-[420px]
      sm:h-[500px]
      lg:h-[560px]

      overflow-y-auto
      p-5
    "
          >
            {/* Add Photo card */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="
              group
              flex
              aspect-square
              flex-col
              items-center
              justify-center
              gap-3
              rounded-[18px]
              border-2
              border-dashed
              border-[var(--brown-300)]
              bg-white/50
              backdrop-blur-sm
              transition-all
              duration-300
              hover:border-[var(--gold)]
              hover:bg-white/80
            "
            >
              <span
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-md
                transition-transform
                duration-300
                group-hover:scale-110
              "
              >
                <Plus className="h-5 w-5 text-[var(--gold)]" />
              </span>

              <span
                className="
                text-sm
                font-medium
                text-[var(--text-secondary)]
              "
              >
                Add Photo
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* User's locally-added photos */}
            {localPhotos.map((photo, index) => (
              <div
                key={photo.id}
                style={
                  {
                    "--tilt": `${TILTS[index % TILTS.length]}deg`,
                  } as CSSProperties
                }
                className="
                group
                relative
                aspect-square
                origin-center
                rotate-[var(--tilt)]
                overflow-hidden
                rounded-[18px]
                border-[6px]
                border-white
                bg-white
                shadow-[0_10px_24px_rgba(35,23,17,0.16)]
                transition-all
                duration-500
                ease-out
                hover:z-10
                hover:rotate-0
                hover:scale-[1.06]
                hover:shadow-[0_20px_45px_rgba(35,23,17,0.24)]
              "
              >
                <img
                  src={photo.url}
                  alt=""
                  className="h-full w-full object-cover"
                />

                <button
                  onClick={() => handleRemoveLocalPhoto(photo.id)}
                  className="
    absolute
    left-46
    top-47
    flex
    h-7
    w-7
    items-center
    justify-center
    rounded-full
    bg-white/90
    backdrop-blur-md
    text-stone-700
    shadow-lg
    opacity-0
    scale-90
    -translate-x-1/2
    -translate-y-1/2
    transition-all
    duration-300
    group-hover:opacity-100
    group-hover:scale-100
    hover:bg-red-500
    hover:text-white
  "
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Photos from mock/server data, filtered by this book */}
            {bookPhotos.map((photo, index) => (
              <div
                key={photo.id}
                style={
                  {
                    "--tilt": `${TILTS[(index + localPhotos.length) % TILTS.length]}deg`,
                  } as CSSProperties
                }
                className="
                group
                relative
                aspect-square
                origin-center
                rotate-[var(--tilt)]
                overflow-hidden
                rounded-[18px]
                bg-white
                shadow-[0_10px_24px_rgba(35,23,17,0.16)]
                transition-all
                duration-500
                ease-out
                hover:z-10
                hover:rotate-0
                hover:scale-[1.06]
                hover:shadow-[0_20px_45px_rgba(35,23,17,0.24)]
              "
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.caption ?? ""}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => handleRemoveLocalPhoto(photo.id)}
                  className="
    absolute
    left-46
    top-47
    flex
    h-7
    w-7
    items-center
    justify-center
    rounded-full
    bg-white/90
    backdrop-blur-md
    text-stone-700
    shadow-lg
    opacity-0
    scale-90
    -translate-x-1/2
    -translate-y-1/2
    transition-all
    duration-300
    group-hover:opacity-100
    group-hover:scale-100
    hover:bg-red-500
    hover:text-white
  "
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
