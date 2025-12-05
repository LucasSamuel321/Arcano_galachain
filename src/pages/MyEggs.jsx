import { useMemo, useState } from "react";

const DUMMY_EGGS = [
  {
    id: "frost-1",
    name: "Frost Egg",
    faction: "Frost",
    rarity: "Rare",
    status: "In wallet",
    img: "/images/eggs/frost-egg.png", // prilagodi kasneje
    legendaryChance: 0.07,
    description:
      "A crystalline egg formed in the heart of an ancient glacier. Frost creatures excel at control, slows and defensive utility.",
    incubatorEta: null,
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
      "Living dragonfire sealed in obsidian shell. Inferno creatures focus on burst damage, burn stacks and ruthless aggression.",
    incubatorEta: "Ready",
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
      "A seed-egg grown from the roots of the World Tree. Nature creatures specialize in sustain, regeneration and protection.",
    incubatorEta: "03:12:45",
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
  },
];

const rarityStyles = {
  Common: "text-gray-300",
  Rare: "text-sky-300",
  Epic:
    "text-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.7)]",
  Legendary:
    "text-amber-300 drop-shadow-[0_0_14px_rgba(252,211,77,0.85)]",
};

const factionAccent = {
  Frost: "from-sky-500/20 via-cyan-400/10 to-indigo-800/40 border-cyan-300/60",
  Inferno: "from-orange-500/30 via-red-500/20 to-amber-700/40 border-orange-300/70",
  Nature: "from-emerald-500/25 via-lime-400/10 to-emerald-800/40 border-emerald-300/60",
  Storm: "from-indigo-500/30 via-violet-500/25 to-sky-600/40 border-indigo-300/70",
};

export default function MyEggs() {
  const [selectedEgg, setSelectedEgg] = useState(null);

  const stats = useMemo(() => {
    const total = DUMMY_EGGS.length;
    const readyToHatch = DUMMY_EGGS.filter(
      (e) => e.status === "Ready to hatch"
    ).length;
    const inIncubator = DUMMY_EGGS.filter(
      (e) => e.status === "In incubator"
    ).length;
    const avgLegendaryChance =
      DUMMY_EGGS.reduce((acc, e) => acc + (e.legendaryChance || 0), 0) /
      (DUMMY_EGGS.length || 1);

    return {
      total,
      readyToHatch,
      inIncubator,
      avgLegendary: `${(avgLegendaryChance * 100).toFixed(1)}%`,
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-black via-slate-950 to-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 text-white">
        {/* HEADER + STATS HUD */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-purple-400/80 mb-2">
              Inventory
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-[0_0_26px_rgba(168,85,247,0.75)]">
              My Eggs
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-300/90 max-w-xl">
              All Arcano Eggs currently bound to your wallet. Manage factions,
              track incubators and prepare for hatching into Frost, Inferno,
              Nature or Storm creatures.
            </p>
          </div>

          {/* STATS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-[0_0_38px_rgba(0,0,0,0.85)]">
            <StatPill label="Total Eggs" value={stats.total} />
            <StatPill
              label="Ready to Hatch"
              value={stats.readyToHatch}
              highlight
            />
            <StatPill label="In Incubator" value={stats.inIncubator} />
            <StatPill
              label="Avg. Legendary Chance"
              value={stats.avgLegendary}
            />
          </div>
        </div>

        {/* MAIN LAYOUT: LEFT MINT, RIGHT INVENTORY */}
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] gap-6">
          {/* MINT SECTION */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-7 backdrop-blur-2xl shadow-[0_0_55px_rgba(0,0,0,0.95)] relative overflow-hidden">
            {/* Glow overlay */}
            <div className="pointer-events-none absolute -inset-20 opacity-50 mix-blend-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.35),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.22),_transparent_55%)]" />

            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                Mint New Egg
                <span className="text-[0.65rem] px-2 py-1 rounded-full border border-emerald-300/60 bg-emerald-500/15 text-emerald-200 uppercase tracking-[0.18em]">
                  Coming Soon
                </span>
              </h2>
              <p className="text-sm text-gray-300 mb-4 max-w-md">
                Spend <span className="text-purple-300 font-semibold">GALA</span> or{" "}
                <span className="text-sky-300 font-semibold">$ARCANO</span> to mint
                a randomized elemental egg. Faction, rarity and traits are
                determined fully on-chain.
              </p>

              {/* RARITY GRID */}
              <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                <RarityRow label="Common" value="60%" accent="text-gray-200" />
                <RarityRow label="Rare" value="25%" accent="text-sky-300" />
                <RarityRow
                  label="Epic"
                  value="12%"
                  accent="text-purple-300"
                  glow="shadow-[0_0_16px_rgba(192,132,252,0.8)]"
                />
                <RarityRow
                  label="Legendary"
                  value="3%"
                  accent="text-amber-300"
                  glow="shadow-[0_0_16px_rgba(252,211,77,0.85)]"
                />
              </div>

              {/* COST + CHAIN INFO */}
              <div className="flex flex-col gap-3 mb-6 text-xs md:text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-300/90">Base mint cost</span>
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-purple-400/50 text-purple-200 font-semibold text-xs tracking-wide">
                    5 GALA · 1 Egg
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-300/90">Network</span>
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-sky-400/50 text-sky-200 font-semibold text-xs tracking-wide">
                    GalaChain · On-chain RNG
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS (UI ONLY) */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-sky-500 px-5 py-3 text-sm md:text-base font-semibold shadow-[0_0_30px_rgba(168,85,247,0.9)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled
                >
                  <span>Mint Egg</span>
                  <span className="text-xs uppercase tracking-[0.26em] text-white/80">
                    Soon
                  </span>
                </button>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs md:text-sm font-semibold border border-white/20 bg-black/50 hover:bg-black/70 transition"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  <span className="uppercase tracking-[0.2em] text-gray-200">
                    View $ARCANO token
                  </span>
                </button>
              </div>

              <p className="mt-3 text-[0.7rem] text-gray-400">
                UI preview only. Minting will connect directly to GalaChain smart
                contracts once live.
              </p>
            </div>
          </section>

          {/* INVENTORY SECTION */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-7 backdrop-blur-2xl shadow-[0_0_55px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-lg md:text-xl font-semibold tracking-wide">
                  Your Eggs
                </h2>
                <p className="text-xs md:text-sm text-gray-400">
                  4/4 faction slots unlocked ·{" "}
                  <span className="text-purple-300">Frost</span>,{" "}
                  <span className="text-orange-300">Inferno</span>,{" "}
                  <span className="text-emerald-300">Nature</span>,{" "}
                  <span className="text-sky-300">Storm</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-[0.7rem] text-gray-400">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span>UI · no live chain data (yet)</span>
              </div>
            </div>

            {DUMMY_EGGS.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                You don&apos;t have any eggs yet. Mint your first elemental egg to
                begin your Arcano journey.
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5">
                {DUMMY_EGGS.map((egg) => (
                  <EggCard
                    key={egg.id}
                    egg={egg}
                    onClick={() => setSelectedEgg(egg)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL */}
      {selectedEgg && (
        <EggDetailModal egg={selectedEgg} onClose={() => setSelectedEgg(null)} />
      )}
    </div>
  );
}

/* —————————————————
   SMALL SUBCOMPONENTS
————————————————— */

function StatPill({ label, value, highlight = false }) {
  return (
    <div
      className={`flex flex-col justify-center rounded-xl px-3 py-2 ${
        highlight
          ? "bg-emerald-500/15 border border-emerald-300/60 shadow-[0_0_20px_rgba(52,211,153,0.7)]"
          : "bg-black/70 border border-white/12"
      }`}
    >
      <span className="text-[0.65rem] uppercase tracking-[0.22em] text-gray-400">
        {label}
      </span>
      <span className="mt-1 text-sm md:text-base font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function RarityRow({ label, value, accent, glow = "" }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-black/60 border border-white/10 px-3 py-2">
      <span
        className={`text-xs font-semibold flex items-center gap-2 ${accent} ${glow}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {label}
      </span>
      <span className="text-xs text-gray-200">{value}</span>
    </div>
  );
}

function EggCard({ egg, onClick }) {
  const factionClass =
    factionAccent[egg.faction] ||
    "from-slate-600/25 via-slate-800/40 to-black border-white/15";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl border bg-gradient-to-b
        ${factionClass}
        px-3 py-4 md:px-4 md:py-5
        backdrop-blur-xl
        shadow-[0_0_32px_rgba(0,0,0,0.9)]
        transition-transform duration-200 ease-out
        hover:-translate-y-1 hover:scale-[1.02]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-purple-400/80 focus-visible:ring-offset-2
        focus-visible:ring-offset-black
      `}
    >
      {/* Faction + rarity row */}
      <div className="flex items-center justify-between mb-3 text-[0.65rem] uppercase tracking-[0.22em]">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/45 border border-white/25 text-[0.6rem] text-gray-100">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          {egg.faction}
        </span>
        <span
          className={`px-2 py-1 rounded-full bg-black/45 border border-white/25 text-[0.6rem] ${
            rarityStyles[egg.rarity] || "text-gray-100"
          }`}
        >
          {egg.rarity}
        </span>
      </div>

      {/* Image + aura */}
      <div className="relative flex items-center justify-center mb-3">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-white/5 blur-xl group-hover:blur-2xl" />
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/60 border border-white/25 flex items-center justify-center overflow-hidden">
            {egg.img ? (
              <img
                src={egg.img}
                alt={egg.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_32px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="text-xs text-gray-300/80">Egg</span>
            )}
          </div>
        </div>
      </div>

      {/* Name + status */}
      <div className="space-y-1 text-left mb-2">
        <p className="text-sm font-semibold text-white leading-tight">
          {egg.name}
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gray-200/80">
          {egg.status}
          {egg.incubatorEta && egg.status === "In incubator"
            ? ` · ${egg.incubatorEta}`
            : null}
        </p>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between text-[0.7rem] mt-1">
        <span className="inline-flex items-center gap-1 text-gray-100/90">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-300/90 shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
          View details
        </span>
        <span className="inline-flex items-center gap-1 text-gray-100/90 bg-black/45 border border-white/20 px-2 py-1 rounded-full">
          <span className="text-[0.6rem] opacity-70">Incubator</span>
          <span className="uppercase tracking-[0.22em]">
            {egg.status === "Ready to hatch" ? "Ready" : "Queue"}
          </span>
        </span>
      </div>
    </button>
  );
}

function EggDetailModal({ egg, onClose }) {
  const legendaryPercent = egg.legendaryChance
    ? `${(egg.legendaryChance * 100).toFixed(1)}%`
    : "—";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="relative max-w-lg w-full mx-4 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-white/15 shadow-[0_0_60px_rgba(0,0,0,1)] p-6 md:p-7">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/70 border border-white/20 text-gray-300 flex items-center justify-center text-lg hover:bg-white/10 transition"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
          {/* Image / aura side */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative mb-3">
              <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.5),_transparent_65%)] opacity-80" />
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-black/70 border border-white/25 flex items-center justify-center overflow-hidden">
                {egg.img ? (
                  <img
                    src={egg.img}
                    alt={egg.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.45)]"
                  />
                ) : (
                  <span className="text-xs text-gray-300/80">Egg</span>
                )}
              </div>
            </div>
            <div className="text-[0.7rem] uppercase tracking-[0.22em] text-gray-300 flex flex-col items-center gap-1">
              <span>{egg.faction} · {egg.rarity}</span>
              {egg.incubatorEta && (
                <span className="text-gray-400">
                  Incubator ETA: {egg.incubatorEta}
                </span>
              )}
            </div>
          </div>

          {/* Info side */}
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

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-3 text-xs mt-1">
              <div className="rounded-xl bg-black/65 border border-white/15 px-3 py-2">
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gray-400 mb-1">
                  Status
                </p>
                <p className="text-gray-100">
                  {egg.status}
                  {egg.incubatorEta && egg.status === "In incubator"
                    ? ` · ${egg.incubatorEta}`
                    : ""}
                </p>
              </div>
              <div className="rounded-xl bg-black/65 border border-white/15 px-3 py-2">
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gray-400 mb-1">
                  Legendary Roll
                </p>
                <p className="text-amber-300">{legendaryPercent}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex flex-col sm:flex-row gap-3 text-xs md:text-sm">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-sky-500 px-4 py-2.5 font-semibold shadow-[0_0_26px_rgba(168,85,247,0.9)] hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled
              >
                <span>Send to Incubator</span>
                <span className="text-[0.6rem] uppercase tracking-[0.24em] text-white/85">
                  Soon
                </span>
              </button>

              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 border border-white/18 bg-black/60 hover:bg-black/75 transition"
                disabled
              >
                <span>List on Marketplace</span>
                <span className="text-[0.6rem] uppercase tracking-[0.24em] text-gray-300/90">
                  WIP
                </span>
              </button>
            </div>

            <p className="text-[0.7rem] text-gray-500 mt-1">
              All numbers above are placeholder UI values. Once live, this screen
              will pull live data from GalaChain and Arcano contracts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
