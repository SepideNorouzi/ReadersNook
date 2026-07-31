interface Props {
  image: string;
}

export default function HeroBackground({ image }: Props) {
  return (
    <>
      {/* desktop */}

      <div
        className="
        hidden
        lg:block
        relative
        overflow-hidden
        "
      >
        <img
          src={image}
          className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          scale-125
          blur-3xl
          brightness-50
          "
        />

        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* mobile */}

      <div
        className="
        lg:hidden
        absolute
        inset-0
        overflow-hidden
        "
      >
        <img
          src={image}
          className="
          h-full
          w-full
          object-cover
          blur-2xl
          scale-150
          brightness-50
          "
        />

        <div className="absolute inset-0 bg-black/45" />
      </div>
    </>
  );
}
