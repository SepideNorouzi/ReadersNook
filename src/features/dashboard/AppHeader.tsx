import hero from "../../assets/hero.jpg";

export default function AppHeader() {
  return (
    <section
      className="
        relative
        h-[220px]
        overflow-hidden
        lg:h-[320px]
        xl:h-[360px]
      "
    >
      <img
        src={hero}
        alt="Books on a shelf"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div
        className="
          absolute
          bottom-6
          left-6

          lg:bottom-8
          lg:left-8

          text-white
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            leading-tight

            sm:text-3xl
            lg:text-4xl
          "
        >
          Escape Into Stories
        </h2>

        <p
          className="
            mt-1
            max-w-xs
            text-sm

            sm:text-base
            lg:mt-2
            lg:max-w-md
            lg:text-lg
          "
        >
          Build your own cozy digital library.
        </p>
      </div>
    </section>
  );
}
