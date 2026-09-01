export default function StatBadge({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: number;
  label: string;
}) {
  return (
    <div
      className="
        group

        flex
        h-[78px]
        w-[118px]

        sm:h-[82px]
        sm:w-[132px]

        flex-col

        justify-center

        rounded-2xl

        border
        border-white/40

        bg-white/35

        px-3

        backdrop-blur-md

        shadow-[0_8px_30px_rgba(60,40,30,0.08)]

        transition-transform

        hover:-translate-y-1
      "
    >

      {/* Top row */}

      <div
        className="
          flex

          items-center

          justify-center

          gap-2
        "
      >

        <div
          className="
            flex

            h-7
            w-7

            items-center

            justify-center

            rounded-lg

            bg-white/50

            text-[var(--brown-700)]
          "
        >
          <Icon size={15}/>
        </div>


        <span
          className="
            text-lg

            font-bold

            leading-none

            text-[var(--text)]
          "
        >
          {value}
        </span>

      </div>


      {/* Label */}

      <span
        className="
          mt-2

          text-center

          whitespace-nowrap

          text-[9px]

          uppercase

          tracking-[0.16em]

          text-[var(--text-secondary)]
        "
      >
        {label}
      </span>


    </div>
  );
}