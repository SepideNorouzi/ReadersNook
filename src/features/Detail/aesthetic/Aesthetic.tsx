// features/Detail/aesthetic/Aesthetic.tsx
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { aestheticPhotos } from "../../../data/aesthetic";
import useScrollFade from "../../../hooks/useScrollFade";

interface LocalPhoto {
  id: string;
  url: string;
}

interface Props {
  bookId: string;
}

export default function Aesthetic({ bookId }: Props) {
  const [localPhotos, setLocalPhotos] = useState<LocalPhoto[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useScrollFade();

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
          bg-white
          p-4
          sm:p-6
          lg:p-10
          shadow-[18px_18px_40px_rgba(35,23,17,0.12)]
        "
      >
        <div className="flex items-end justify-between">
          <div>
            <h2
              className="
                font-serif
                text-2xl
sm:text-3xl
                text-brown-900
              "
            >
              Aesthetic
            </h2>
            <p
              className="
              mt-2
                lg:text-[11px]
                text-[9px]
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
    hidden
    sm:block
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
            ref={scrollRef}
            className="
            aesthetic-scrollbar
grid
grid-cols-3
lg:grid-cols-3

content-start
items-start
auto-rows-min

gap-2
sm:gap-4
lg:gap-6

h-[300px]
sm:h-[420px]
lg:h-[560px]

overflow-y-auto
overscroll-contain

px-2
pt-4
pb-20
pr-3
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
              rounded-xl
              lg:rounded-[18px]
              p-2
sm:p-3
lg:p-0

gap-1
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
                h-7
                w-7
                lg:h-11
                lg:w-11
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
                <Plus
                  className="h-5
                            w-5

                            lg:h-11
                            lg:w-11 
                            text-[var(--gold)]"
                />
              </span>

              <span
                className="
                hidden
                sm:block

                lg:text-sm
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
            {localPhotos.map((photo) => (
              <div
                key={photo.id}
                className="
                group
                relative
                aspect-square
                origin-center
                rotate-[var(--tilt)]
                overflow-hidden
                rounded-lg
sm:rounded-xl
lg:rounded-[18px]

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
    right-1
top-1

sm:right-2
sm:top-2

h-5
w-5

sm:h-7
sm:w-7
    flex
    items-center
    justify-center
    rounded-full
    bg-white/90
    backdrop-blur-md
    text-stone-700
    shadow-lg
    opacity-0
    scale-90
    transition-all
    duration-300
    group-hover:opacity-100
    group-hover:scale-100
    hover:bg-red-500
    hover:text-white
  "
                >
                  <Trash2
                    className="
        h-3
        w-3
        lg:h-4
        lg:w-4
    "
                  />
                </button>
              </div>
            ))}

            {/* Photos from mock/server data, filtered by this book */}
            {bookPhotos.map((photo) => (
              <div
                key={photo.id}
                className="
                group
                relative
                aspect-square
                origin-center
                rotate-[var(--tilt)]
                overflow-hidden
                rounded-lg
sm:rounded-xl
lg:rounded-[18px]
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
                <div
                  className="
    absolute
    inset-0

    bg-black/30

    opacity-0
active:opacity-100

sm:opacity-0
sm:group-hover:opacity-100

    transition-opacity
    duration-300
  "
                />
                <button
                  onClick={() => handleRemoveLocalPhoto(photo.id)}
                  className="
absolute
left-1/2
top-1/2

z-10

flex
h-9
w-9
sm:h-10
sm:w-10

items-center
justify-center

rounded-full

bg-white
text-red-500

shadow-xl

-translate-x-1/2
-translate-y-1/2

opacity-0
scale-90

active:opacity-100
active:scale-100

sm:opacity-0
sm:scale-90
sm:group-hover:opacity-100
sm:group-hover:scale-100

transition-all
duration-300

hover:scale-110
hover:bg-red-500
hover:text-white
"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div
            className="
    pointer-events-none
    absolute
    inset-x-2
    bottom-0
    h-24
    transition-opacity
    duration-300
  "
            style={{
              opacity: "var(--fade-opacity)",
              background: `
      linear-gradient(
        to top,
        rgba(248,244,239,1) 0%,
        rgba(248,244,239,.94) 18%,
        rgba(248,244,239,.75) 40%,
        rgba(248,244,239,.35) 72%,
        transparent 100%
      )
    `,
            }}
          />
        </div>
      </div>
    </section>
  );
}
