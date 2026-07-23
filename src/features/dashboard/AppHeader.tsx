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

      <div
        className="
absolute
inset-0

bg-gradient-to-r

from-black/35
via-black/10
to-black/40
"
      />
      <div
        className="
        hidden 
        lg:block
absolute

top-8
right-6

max-w-[320px]

text-right
text-white

lg:top-12
lg:right-12
lg:max-w-md
"
      >
        <h2
          className="
text-2xl
font-heading

sm:text-2xl
lg:text-4xl
"
        >
          Escape Into Stories
        </h2>

        <p
          className="
mt-2
text-sm

sm:text-base
lg:text-lg

text-white/90
"
        >
          Build your own cozy digital library.
        </p>
      </div>
    </section>
  );
}
