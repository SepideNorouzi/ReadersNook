interface Props {
  image: string;
  gradient: string;
}

export default function HeroBackground({ image, gradient }: Props) {
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

        scale-[1.6]

        blur-[70px]

        opacity-35
        "
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
