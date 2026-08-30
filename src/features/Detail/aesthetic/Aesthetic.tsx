import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import useScrollFade from "../../../hooks/useScrollFade";

interface LocalPhoto {
  id: string;
  url: string;
}

interface Props {
  images: string[];
  onRemoveImage?: (url: string) => void;
}

export default function Aesthetic({
  images,
  onRemoveImage,
}: Props) {
  const [localPhotos, setLocalPhotos] = useState<LocalPhoto[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useScrollFade();

  const totalCount = localPhotos.length + images.length;

  useEffect(() => {
    return () => {
      localPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [localPhotos]);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setLocalPhotos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        url,
      },
    ]);

    event.target.value = "";
  }

  function handleRemoveLocalPhoto(id: string) {
    setLocalPhotos((prev) => {
      const target = prev.find((photo) => photo.id === id);

      if (target) {
        URL.revokeObjectURL(target.url);
      }

      return prev.filter((photo) => photo.id !== id);
    });
  }

  return (
    <section
      className="
        px-5
        pb-20
        sm:px-6
        sm:pb-24
        lg:pt-7
      "
    >
      <div
        className="
          max-w-3xl

          rounded-[24px]
          sm:rounded-[30px]

          bg-white

          p-4
          sm:p-6
          lg:p-10

          shadow-[0_8px_28px_rgba(35,23,17,0.07)]
          sm:shadow-[0_10px_32px_rgba(35,23,17,0.08)]
          lg:shadow-[0_14px_38px_rgba(35,23,17,0.09)]

          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2
              className="
                font-serif
                text-2xl
                text-brown-900
                sm:text-3xl
              "
            >
              Aesthetic
            </h2>

            <p
              className="
                mt-2
                max-w-[260px]

                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]

                text-[var(--gold)]

                lg:text-[11px]
              "
            >
              The colors, places and moments this book reminds you of.
            </p>
          </div>

          <p
            className="
              hidden
              text-sm
              font-medium
              text-[var(--text-secondary)]
              sm:block
            "
          >
            {totalCount} {totalCount === 1 ? "photo" : "photos"}
          </p>
        </div>

        {/* Photo grid */}
        <div className="relative mt-5">
          <div
            ref={scrollRef}
            className="
              aesthetic-scrollbar

              grid
              grid-cols-3
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
            {/* Add Photo */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="
                group

                flex
                aspect-square
                flex-col
                items-center
                justify-center

                gap-1

                rounded-xl
                p-2

                border-2
                border-dashed
                border-[var(--brown-300)]

                bg-white/50
                backdrop-blur-sm

                transition-all
                duration-300

                hover:border-[var(--gold)]
                hover:bg-white/80

                lg:rounded-[18px]
                lg:p-0
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center

                  rounded-full
                  bg-white

                  shadow-[0_4px_12px_rgba(35,23,17,0.08)]

                  transition-transform
                  duration-300

                  group-hover:scale-110

                  lg:h-11
                  lg:w-11
                "
              >
                <Plus
                  className="
                    h-5
                    w-5
                    text-[var(--gold)]

                    lg:h-11
                    lg:w-11
                  "
                />
              </span>

              <span
                className="
                  hidden
                  font-medium
                  text-[var(--text-secondary)]
                  sm:block
                  lg:text-sm
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

            {/* Local photos */}
            {localPhotos.map((photo) => (
              <div
                key={photo.id}
                className="
                  group
                  relative
                  aspect-square
                  origin-center

                  overflow-hidden

                  rounded-lg
                  bg-white

                  shadow-[0_6px_18px_rgba(35,23,17,0.11)]

                  transition-all
                  duration-500
                  ease-out

                  hover:z-10
                  hover:rotate-0
                  hover:scale-[1.04]
                  hover:shadow-[0_14px_30px_rgba(35,23,17,0.16)]

                  sm:rounded-xl
                  lg:rounded-[18px]
                "
              >
                <img
                  src={photo.url}
                  alt=""
                  className="h-full w-full object-cover"
                />

                <button
                  onClick={() =>
                    handleRemoveLocalPhoto(photo.id)
                  }
                  className="
                    absolute
                    right-2
                    top-2
                    z-20

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

            {/* Existing photos */}
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="
                  group
                  relative
                  aspect-square
                  origin-center

                  overflow-hidden

                  rounded-lg
                  bg-white

                  shadow-[0_6px_18px_rgba(35,23,17,0.11)]

                  transition-all
                  duration-500
                  ease-out

                  hover:z-10
                  hover:rotate-0
                  hover:scale-[1.04]
                  hover:shadow-[0_14px_30px_rgba(35,23,17,0.16)]

                  sm:rounded-xl
                  lg:rounded-[18px]
                "
              >
                <img
                  src={url}
                  alt=""
                  className="h-full w-full object-cover"
                />

                <button
                  onClick={() => onRemoveImage?.(url)}
                  className="
                    absolute
                    right-2
                    top-2
                    z-20

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

          {/* Soft scroll fade */}
          <div
            className="
              pointer-events-none

              absolute
              inset-x-2
              bottom-0

              h-20

              rounded-b-[5px]

              transition-opacity
              duration-300
            "
            style={{
              opacity: "var(--fade-opacity)",
              background: `
                linear-gradient(
                  to top,
                  rgba(255,255,255,0.98) 0%,
                  rgba(255,255,255,0.82) 28%,
                  rgba(255,255,255,0.42) 58%,
                  rgba(255,255,255,0) 100%
                )
              `,
            }}
          />
        </div>
      </div>
    </section>
  );
}