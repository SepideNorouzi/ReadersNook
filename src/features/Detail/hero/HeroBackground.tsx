interface Props {
  image: string;
  gradient: string;
  progress: number;
}

export default function HeroBackground({
  image,
  gradient,
  progress,
}: Props) {
  return (
    <div
      className="
        relative

        h-full
        w-full

        lg:w-[340px]

        overflow-hidden

        rounded-b-[36px]
        lg:rounded-b-none
        lg:rounded-r-[36px]
      "
      style={{
        background: gradient,
      }}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover

          blur-[70px]
        "
        style={{
          transform: `scale(${1.6 - progress * 0.12})`,
          opacity: 0.35 - progress * 0.05,
        }}
      />

      <div
        className="
          absolute
          inset-0

          bg-white/10
          backdrop-blur-md
        "
      />
    </div>
  );
}