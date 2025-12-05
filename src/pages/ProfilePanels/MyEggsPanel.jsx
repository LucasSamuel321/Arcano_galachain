import { useState } from "react";

const EGG_DATA = [
  {
    id: "frost-1",
    name: "Frost Egg",
    faction: "Frost",
    rarity: "Rare",
    status: "In wallet",
    img: "/images/eggs/frost-egg.png",
    legendaryChance: 0.07,
    description:
      "A crystalline egg formed in the heart of an ancient glacier. Frost creatures excel at control, slows and defensive utility.",
    incubatorEta: null,
    auraClass:
      "from-sky-500/20 via-cyan-400/10 to-indigo-800/40 border-cyan-300/60 shadow-[0_0_26px_rgba(56,189,248,0.5)]",
  },
  {
    id: "inferno-1",
    name: "Inferno Egg",
    faction: "Inferno",
    rarity: "Legendary",
    status: "Ready to hatch",
    img: "/images/eggs/inferno-egg.png",
    legendaryChance: 0.18,
    description:
      "Living dragonfire sealed in obsidian shell. Inferno creatures focus on burst damage, burn stacks, and ruthless aggression.",
    incubatorEta: "Ready",
    auraClass:
      "from-orange-500/30 via-red-500/20 to-amber-700/40 border-orange-300/70 shadow-[0_0_28px_rgba(248,113,113,0.6)]",
  },
  {
    id: "nature-1",
    name: "Nature Egg",
    faction: "Nature",
    rarity: "Epic",
    status: "In incubator",
    img: "/images/eggs/nature-egg.png",
    legendaryChance: 0.12,
    description:
      "A seed-egg grown from the roots of the World Tree. Nature creatures specialize in regeneration, sustain and long-term scaling.",
    incubatorEta: "03:12:45",
    auraClass:
      "from-emerald-500/25 via-lime-400/10 to-emerald-800/40 border-emerald-300/60 shadow-[0_0_26px_rgba(52,211,153,0.55)]",
  },
  {
    id: "storm-1",
    name: "Storm Egg",
    faction: "Storm",
    rarity: "Epic",
    status: "In incubator",
    img: "/images/eggs/storm-egg.png",
    legendaryChance: 0.13,
    description:
      "A volatile arcane storm trapped in a shell. Storm creatures are fast, unpredictable and crit-focused.",
    incubatorEta: "09:47:03",
    auraClass:
      "from-indigo-500/30 via-violet-500/25 to-sky-600/40 border-indigo-300/70 shadow-[0_0_26px_rgba(129,140,248,0.55)]",
  },
];

const rarityStyles = {
  Common: "text-gray-300",
  Rare: "text-sky-300",
  Epic:
    "text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]",
  Legendary:
    "text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.7)]",
};

export default function MyEggsPanel() {
  const [selectedEgg, setSelectedEgg] = useState(null);

  const stats = {
    total: EGG_DATA.length,
    ready: EGG_DATA.filter((e) => e.status === "Ready to hatch").length,
    incubating: EGG_DATA.filter((e) => e.status === "In incubator").length,
    avgLegendary:
      (EGG_DATA.reduce((acc, e) => acc + e.legendaryChance, 0) /
        EGG_DATA.length) *
      100,
  };

  return (
    <>
      {/* PANEL HEADER */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide mb-1">
          My Eggs
        </h2>
        <p className="text-xs md:text-sm text-gray-400">
          All elemental eggs owned by your account.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatPill label="Total Eggs" value={stats.total} />
        <StatPill label="Ready to Hatch" value={stats.ready} highlight />
        <StatPill label="In Incubator" value={stats.incubating} />
        <StatPill
          label="Avg. Legendary"
          value={`${stats.avgLegendary.toFixed(1)}%`}
        />
      </div>

      {/* EGG GRID */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5">
        {EGG_DATA.map((egg) => (
          <EggCard key={egg.id} egg={egg} onOpen={() => setSelectedEgg(egg)} />
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selectedEgg && (
        <EggModal egg={selectedEgg} onClose={() => setSelectedEgg(null)} />
      )}
    </>
  );
}

/* ——————————————— COMPONENTS ——————————————— */

function StatPill({ label, value, highlight }) {
  return (
    <div
      className={`
        rounded-xl px-3 py-2
        ${highlight
          ? "bg-emerald-500/15 border border-emerald-300/40 shadow-[0_0_15px_rgba(52,211,153,0.45)]"
          : "bg-black/60 border border-white/10"}
      `}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400">
        {label}
      </p>
      <p className="text-sm md:text-base font-semibold text-white mt-1">
        {value}
      </p>
    </div>
  );
}

function EggCard({ egg, onOpen }) {
  return (
    <button
      onClick={onOpen}
      type="button"
      className={`
        relative group rounded-2xl 
        bg-gradient-to-b ${egg.auraClass} 
        border px-3 py-4 md:px-4 md:py-5 
        backdrop-blur-xl shadow-[0_0_28px_rgba(0,0,0,0.7)] 
        transition-transform hover:-translate-y-1 hover:scale-[1.02]
      `}
    >
      {/* TOP INFO */}
      <div className="flex items-center justify-between mb-3 text-[0.65rem] uppercase tracking-[0.18em]">
        <span className="px-2 py-1 rounded-full bg-black/40 border border-white/20 text-gray-200">
          {egg.faction}
        </span>
        <span
          className={`
            px-2 py-1 rounded-full bg-black/40 border border-white/20 
            ${rarityStyles[egg.rarity]}
          `}
        >
          {egg.rarity}
        </span>
      </div>

      {/* EGG IMAGE */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute inset-0 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
          <img
            src={egg.img}
            alt={egg.name}
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.35)] group-hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* TEXT */}
      <div className="text-left">
        <p className="text-sm font-semibold text-white">{egg.name}</p>
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-gray-200/75">
          {egg.status}
          {egg.incubatorEta && egg.status === "In incubator" && (
            <> · {egg.incubatorEta}</>
          )}
        </p>
      </div>
    </button>
  );
}

function EggModal({ egg, onClose }) {
  const legendaryPercent = (egg.legendaryChance * 100).toFixed(1) + "%";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
      <div className="relative max-w-lg w-full mx-4 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-white/15 shadow-[0_0_55px_rgba(0,0,0,1)] p-6 md:p-7">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 border border-white/20 text-gray-300 flex items-center justify-center text-lg hover:bg-white/10 transition"
        >
          ×
        </button>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
          
          {/* IMAGE + BASIC */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-3">
              <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.5),_transparent_65%)] opacity-70" />
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-black/70 border border-white/25 flex items-center justify-center">
                <img
                  src={egg.img}
                  className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]"
                />
              </div>
            </div>

            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gray-300">
              {egg.faction} · {egg.rarity}
            </p>
            {egg.incubatorEta && (
              <p className="text-gray-400 text-xs mt-1">
                Incubator ETA: {egg.incubatorEta}
              </p>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex-[1.4] flex flex-col gap-3">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-purple-400/90 mb-1">
                Egg Details
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                {egg.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-300">
                {egg.description}
              </p>
            </div>

            {/* MINI STATS */}
            <div className="grid grid-cols-2 gap-3 text-xs mt-1">
              <div className="rounded-xl bg-black/65 border border-white/15 px-3 py-2">
                <p className="text-[0.6rem] uppercase text-gray-400 mb-1">
                  Status
                </p>
                <p className="text-gray-100">
                  {egg.status}
                </p>
              </div>
              <div className="rounded-xl bg-black/65 border border-white/15 px-3 py-2">
                <p className="text-[0.6rem] uppercase text-gray-400 mb-1">
                  Legendary Roll
                </p>
                <p className="text-amber-300">{legendaryPercent}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-3 flex flex-col sm:flex-row gap-3 text-xs">
              <button
                disabled
                className="
                  flex-1 inline-flex items-center justify-center gap-2 
                  rounded-2xl bg-gradient-to-r 
                  from-purple-600 via-fuchsia-500 to-sky-500 
                  px-4 py-2.5 font-semibold
                  shadow-[0_0_22px_rgba(168,85,247,0.9)]
                  hover:brightness-110 active:scale-[0.98] transition
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                Send to Incubator
              </button>

              <button
                disabled
                className="
                  flex-1 inline-flex items-center justify-center
                  rounded-2xl px-4 py-2.5 
                  border border-white/18 bg-black/60 
                  hover:bg-black/75 transition
                "
              >
                List on Marketplace
              </button>
            </div>

            <p className="text-[0.7rem] text-gray-500 mt-1">
              Live chain data will be connected here later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
