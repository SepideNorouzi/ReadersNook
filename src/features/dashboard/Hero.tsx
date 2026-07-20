import hero from "../../assets/hero.jpg";

export default function Hero() {
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
      <img src={hero} className="absolute inset-0 h-full w-full object-cover" />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-4xl font-bold">Escape Into Stories</h2>

        <p className="mt-2">Build your own cozy digital library.</p>
      </div>
    </section>
  );
}
