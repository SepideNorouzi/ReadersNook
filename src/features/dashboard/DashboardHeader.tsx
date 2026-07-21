export default function DashboardHeader() {
  return (
    <header className="mb-6 lg:mb-8">
      <h1
        className="
          text-2xl
          font-bold
          text-[#2C1810]

          sm:text-3xl
          lg:text-4xl
        "
      >
        The Reader's Nook
      </h1>

      <p
        className="
          mt-1
          text-sm
          text-[#8B7355]

          sm:text-base
        "
      >
        Your personal reading dashboard
      </p>
    </header>
  );
}
