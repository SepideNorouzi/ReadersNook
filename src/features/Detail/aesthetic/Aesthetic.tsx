// features/Detail/aesthetic/Aesthetic.tsx
import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { aestheticPhotos } from "../../../data/aesthetic";

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

  // Photos that belong to this specific book, sourced from mock/server data
  const bookPhotos = aestheticPhotos.filter((photo) => photo.bookId === bookId);

  // Clean up object URLs on unmount to avoid memory leaks
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

    // reset the input so selecting the same file again still fires onChange
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
        py-10
        lg:px-10
      "
    >
      <h2
        className="
          font-serif
          text-2xl
          text-brown-900
        "
      >
        Aesthetic
      </h2>

      <div
        className="
          mt-6
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
        "
      >
        {/* Add Photo card — always first */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="
            group
            flex
            aspect-square
            flex-col
            items-center
            justify-center
            gap-2
            rounded-2xl
            border-2
            border-dashed
            border-stone-300
            bg-stone-50
            transition
            hover:border-brown-400
            hover:bg-stone-100
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-sm
              transition
              group-hover:scale-105
            "
          >
            <Plus className="h-5 w-5 text-brown-700" />
          </span>

          <span className="text-sm font-medium text-stone-600">Add Photo</span>
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
              overflow-hidden
              rounded-2xl
              border
              border-stone-200
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
                top-2
                right-2
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-black/50
                opacity-0
                transition
                group-hover:opacity-100
                hover:bg-black/70
              "
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        ))}

        {/* Photos from mock/server data, filtered by this book */}
        {bookPhotos.map((photo) => (
          <div
            key={photo.id}
            className="
              aspect-square
              overflow-hidden
              rounded-2xl
              border
              border-stone-200
            "
          >
            <img
              src={photo.imageUrl}
              alt={photo.caption ?? ""}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
