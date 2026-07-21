interface CurrentReadingCarouselProps {
  coverUrl: string;
  title: string;
}

export default function CurrentReadCarousel({
  coverUrl,
  title,
}: CurrentReadingCarouselProps) {
  return (
    <div className="flex justify-center">
      <img
        src={coverUrl}
        alt={title}
        className="
          w-full
          max-w-[180px]
          aspect-[3/4]
          rounded-xl
          object-cover
          shadow-md
        "
      />
    </div>
  );
}
