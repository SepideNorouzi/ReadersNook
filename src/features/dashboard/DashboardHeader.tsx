export default function DashboardHeader() {
  return (
    <header className="mb-10">
      <h1
        className="
          mt-4
          mb-4

          text-2xl
          font-bold

          text-[#2C1810]

          lg:text-4xl
        "
      >
        The Reader's Nook
      </h1>
      <span
        className="
          inline-flex
          rounded-full

          bg-[#EDE5D8]

          px-3
          py-1

          text-xs
          uppercase
          tracking-[0.2em]

          text-[#8B7355]
        "
      >
        Digital Reading Journal
      </span>

      <div className="mt-8 h-px bg-[#DDD2C3]" />
    </header>
  );
}
