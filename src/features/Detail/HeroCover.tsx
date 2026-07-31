interface Props {
  cover: string;
  title: string;
}

export default function HeroCover({ cover, title }: Props) {
  return (
    <div
      className="
      relative
      z-20

      mx-auto

      lg:mx-0

      -mt-10

      lg:mt-0
      "
    >
      <img
        src={cover}
        alt={title}
        className="
        w-52

        lg:w-72

        rounded-2xl

        shadow-[0_25px_60px_rgba(0,0,0,.45)]

        transition
        duration-500

        hover:-translate-y-2
        "
      />
    </div>
  );
}
