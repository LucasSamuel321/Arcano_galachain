import { useMemo, useState } from "react";

/* --------- DUMMY CREATURES --------- */
const DUMMY_CREATURES = [
  {
    id: "frost-baby-1",
    name: "Frost Hatchling",
    faction: "Frost",
    tier: "Baby",
    rarity: "Rare",
    level: 4,
    power: 165,
    attack: 42,
    defense: 28,
    speed: 31,
    crit: 6,
    img: "/images/creatures/baby_frost.png",
    skills: ["Ice Shard", "Chill Aura"],
  },
  {
    id: "frost-young-1",
    name: "Glacier Drake",
    faction: "Frost",
    tier: "Young",
    rarity: "Epic",
    level: 12,
    power: 420,
    attack: 96,
    defense: 72,
    speed: 58,
    crit: 10,
    img: "/images/creatures/young_frost.png",
    skills: ["Frozen Spikes", "Permafrost Cage", "Blizzard Pulse"],
  },
  {
    id: "inferno-baby-1",
    name: "Inferno Whelp",
    faction: "Inferno",
    tier: "Baby",
    rarity: "Epic",
    level: 6,
    power: 210,
    attack: 55,
    defense: 24,
    speed: 37,
    crit: 12,
    img: "/images/creatures/baby_inferno.png",
    skills: ["Ember Burst", "Burning Scales"],
  },
  {
    id: "inferno-legendary-1",
    name: "Hellfire Sovereign",
    faction: "Inferno",
    tier: "Legendary",
    rarity: "Legendary",
    level: 28,
    power: 1350,
    attack: 210,
    defense: 150,
    speed: 90,
    crit: 22,
    img: "/images/creatures/legendary_inferno.png",
    skills: ["Meteorfall", "Lava Surge", "Infernal Dominion"],
  },
  {
    id: "nature-young-1",
    name: "Verdant Seraph",
    faction: "Nature",
    tier: "Young",
    rarity: "Rare",
    level: 10,
    power: 360,
    attack: 80,
    defense: 65,
    speed: 55,
    crit: 9,
    img: "/images/creatures/young_nature.png",
    skills: ["Thorn Lash", "Regrowth Aura"],
  },
  {
    id: "storm-baby-1",
    name: "Storm Sprite",
    faction: "Storm",
    tier: "Baby",
    rarity: "Common",
    level: 3,
    power: 120,
    attack: 30,
    defense: 18,
    speed: 34,
    crit: 7,
    img: "/images/creatures/baby_storm.png",
    skills: ["Static Bolt"],
  },
];

/* --------- STYLE CONSTANTS --------- */
const RARITY_COLORS = {
  Common: "text-gray-300",
  Rare: "text-sky-300",
  Epic: "text-purple-300",
  Legendary: "text-amber-300",
};

const RARITY_BG = {
  Common: "border-white/15",
  Rare: "border-sky-400/60 shadow-[0_0_14px_rgba(56,189,248,0.35)]",
  Epic: "border-purple-400/70 shadow-[0_0_16px_rgba(168,85,247,0.45)]",
  Legendary:
    "border-amber-300/80 shadow-[0_0_20px_rgba(252,211,77,0.55)]",
};

const FACTION_CHIP = {
  Frost: "from-sky-500/40 to-indigo-700/50",
  Inferno: "from-orange-500/40 to-red-700/60",
  Nature: "from-emerald-500/40 to-green-700/60",
  Storm: "from-indigo-500/40 to-violet-700/60",
};

const TIER_ORDER = ["Baby", "Young", "Legendary"];

/* ============================================================= */
/* -------------------- MAIN COMPONENT ------------------------- */
/* ============================================================= */

export default function CreaturesPanel() {
  const [search, setSearch] = useState("");
  const [factionFilter, setFactionFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");
  const [rarityFilter, setRarityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("power");
  const [selectedCreature, setSelectedCreature] = useState(null);

  const totalCreatures = DUMMY_CREATURES.length;
  const legendaryCount = DUMMY_CREATURES.filter(
    (c) => c.rarity === "Legendary"
  ).length;

  const averageLevel =
    Math.round(
      (DUMMY_CREATURES.reduce((s, c) => s + (c.level || 1), 0) /
        totalCreatures) *
        10
    ) / 10;

  const filteredCreatures = useMemo(() => {
    let list = [...DUMMY_CREATURES];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (factionFilter !== "All")
      list = list.filter((c) => c.faction === factionFilter);
    if (tierFilter !== "All")
      list = list.filter((c) => c.tier === tierFilter);
    if (rarityFilter !== "All")
      list = list.filter((c) => c.rarity === rarityFilter);

    list.sort((a, b) => {
      if (sortBy === "power") return b.power - a.power;
      if (sortBy === "level") return b.level - a.level;
      if (sortBy === "tier")
        return TIER_ORDER.indexOf(b.tier) - TIER_ORDER.indexOf(a.tier);
      return 0;
    });

    return list;
  }, [search, factionFilter, tierFilter, rarityFilter, sortBy]);

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
          Creatures
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-2xl">
          Your Arcano roster inside the profile.
        </p>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-3 gap-3 max-w-md mb-5 md:mb-6">
        <SummaryStat label="Total Creatures" value={totalCreatures} />
        <SummaryStat
          label="Legendary"
          value={legendaryCount}
          accent="text-amber-300"
        />
        <SummaryStat
          label="Avg Level"
          value={averageLevel}
          accent="text-sky-300"
        />
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl bg-black/70 border border-white/10 p-4 mb-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {/* SEARCH BAR */}
        <div className="flex mb-3">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full rounded-xl bg-black/60 border border-white/15 
                pl-10 pr-3 py-2 text-sm text-gray-100
                placeholder:text-gray-500
                focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500
              "
            />
          </div>
        </div>

        {/* DROPDOWN FILTERS */}
        <div className="flex flex-wrap gap-2 text-xs">
          <FilterSelect
            label="Faction"
            value={factionFilter}
            onChange={setFactionFilter}
            options={["All", "Frost", "Inferno", "Nature", "Storm"]}
          />
          <FilterSelect
            label="Tier"
            value={tierFilter}
            onChange={setTierFilter}
            options={["All", "Baby", "Young", "Legendary"]}
          />
          <FilterSelect
            label="Rarity"
            value={rarityFilter}
            onChange={setRarityFilter}
            options={["All", "Common", "Rare", "Epic", "Legendary"]}
          />
          <FilterSelect
            label="Sort"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "power", label: "Power" },
              { value: "level", label: "Level" },
              { value: "tier", label: "Tier" },
            ]}
            simpleValues={false}
          />
        </div>
      </div>

      {/* GRID (always 2 columns) */}
      {filteredCreatures.length === 0 ? (
        <div className="rounded-2xl bg-black/60 border border-white/10 p-6 text-center text-sm text-gray-400">
          No creatures match your filters yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredCreatures.map((creature) => (
            <CreatureCard
              key={creature.id}
              creature={creature}
              onClick={() => setSelectedCreature(creature)}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedCreature && (
        <CreatureDetailModal
          creature={selectedCreature}
          onClose={() => setSelectedCreature(null)}
        />
      )}
    </div>
  );
}

/* ============================================================= */
/* ----------------------- SUBCOMPONENTS ----------------------- */
/* ============================================================= */

/* -------- Summary Stat -------- */
function SummaryStat({ label, value, accent }) {
  return (
    <div className="rounded-xl bg-black/70 border border-white/12 px-3 py-3 text-center min-h-[72px] flex flex-col justify-center">
      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gray-400 mb-1">
        {label}
      </p>
      <p
        className={`text-base font-semibold ${
          accent || "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* -------- Dropdown -------- */
function FilterSelect({
  label,
  value,
  onChange,
  options,
  simpleValues = true,
}) {
  const normalized = options.map((opt) =>
    simpleValues
      ? { value: opt, label: opt }
      : typeof opt === "string"
      ? { value: opt, label: opt }
      : opt
  );

  return (
    <label className="flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.18em] text-gray-500">
      <span className="hidden md:inline">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          rounded-xl bg-black/70 border border-white/15 px-2.5 py-1.5 
          text-[0.75rem] text-gray-100 focus:border-purple-400
        "
      >
        {normalized.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* -------- Creature Card -------- */
function CreatureCard({ creature, onClick }) {
  const rarityColor = RARITY_COLORS[creature.rarity];
  const rarityBg = RARITY_BG[creature.rarity];
  const factionBg = FACTION_CHIP[creature.faction];

  const powerScore = creature.power || 0;
  const powerPercent = Math.min(100, Math.round((powerScore / 1500) * 100));

  return (
    <button
      onClick={onClick}
      className={`
        group relative rounded-2xl border px-3 py-4
        bg-gradient-to-b from-slate-900 via-slate-900/80 to-black 
        ${rarityBg}
        backdrop-blur-xl overflow-hidden
        hover:-translate-y-1 hover:brightness-110 transition
      `}
    >
      {/* glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),transparent_70%)]" />
      </div>

      {/* top row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-gray-500">
            {creature.tier}
          </span>
          <p className="text-sm font-semibold text-white line-clamp-1 mt-1">
            {creature.name}
          </p>
        </div>
        <span
          className={`
            text-[0.65rem] px-2 py-1 rounded-full border 
            bg-black/70 ${rarityColor}
          `}
        >
          {creature.rarity}
        </span>
      </div>

      {/* image + faction */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="absolute -inset-1 rounded-xl bg-[radial-gradient(circle,_rgba(148,163,184,0.5),transparent_60%)]" />
          <div className="relative w-full h-full bg-black/70 border border-white/15 rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={creature.img}
              alt={creature.name}
              className="w-12 h-12 object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
            />
          </div>
        </div>

        <div className="flex-1">
          <div
            className={`
              inline-flex items-center gap-2 px-2 py-1 rounded-xl 
              bg-gradient-to-r ${factionBg} border border-white/15 text-white text-[0.65rem]
            `}
          >
            <span>{creature.faction}</span>
            <span>Lv {creature.level}</span>
          </div>

          {/* power */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-black/70 border border-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-sky-400"
                style={{ width: `${powerPercent}%` }}
              />
            </div>
            <span className="text-[0.65rem] text-gray-300">
              {creature.power}
            </span>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="flex justify-between text-[0.65rem] text-gray-300 mb-1">
        <StatMini label="ATK" value={creature.attack} />
        <StatMini label="DEF" value={creature.defense} />
        <StatMini label="SPD" value={creature.speed} />
        <StatMini label="CRIT" value={`${creature.crit}%`} />
      </div>

      <div className="text-[0.65rem] text-purple-300 mt-1 text-right">
        View details →
      </div>
    </button>
  );
}

function StatMini({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[0.55rem] uppercase text-gray-500 tracking-widest">
        {label}
      </span>
      <span className="text-[0.7rem] text-gray-100">{value}</span>
    </div>
  );
}

/* -------- Modal -------- */
function CreatureDetailModal({ creature, onClose }) {
  const rarityColor = RARITY_COLORS[creature.rarity];
  const factionBg = FACTION_CHIP[creature.faction];

  const powerScore = creature.power;
  const powerPercent = Math.min(100, Math.round((powerScore / 1500) * 100));

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-xl px-4">
      <div className="relative max-w-3xl w-full rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-white/20 shadow-[0_0_70px_rgba(0,0,0,1)] p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 bg-black/70 border border-white/20 rounded-full flex items-center justify-center text-gray-300 text-lg hover:bg-white/10"
        >
          ×
        </button>

        {/* top info */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">
          <div>
            <p className="text-[0.7rem] uppercase tracking-widest text-gray-400">
              {creature.tier} · {creature.faction}
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              {creature.name}
            </h2>
            <p className={`mt-1 text-sm font-semibold ${rarityColor}`}>
              {creature.rarity} Creature
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`
                px-3 py-1.5 rounded-xl border border-white/20 
                bg-gradient-to-r ${factionBg} text-xs text-gray-100
              `}
            >
              Faction: {creature.faction}
            </div>
            <div className="px-3 py-1.5 rounded-xl border border-purple-400/60 bg-black/60 text-xs text-purple-200">
              Level {creature.level}
            </div>
          </div>
        </div>

        {/* layout */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* LEFT */}
          <div className="rounded-2xl bg-black/70 border border-white/12 p-5 flex flex-col gap-4">
            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute -inset-2 rounded-3xl bg-[radial-gradient(circle,_rgba(168,85,247,0.6),transparent_60%)]" />
              <div className="relative w-full h-full bg-black/80 border border-white/15 rounded-3xl flex items-center justify-center overflow-hidden">
                <img
                  src={creature.img}
                  alt={creature.name}
                  className="w-24 h-24 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.9)]"
                />
              </div>
            </div>

            {/* Power */}
            <div>
              <div className="flex justify-between text-xs text-gray-300 mb-2">
                <span>Power</span>
                <span className="text-white font-semibold">
                  {powerScore}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-black/70 border border-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-sky-400"
                  style={{ width: `${powerPercent}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <StatBlock label="Attack" value={creature.attack} />
              <StatBlock label="Defense" value={creature.defense} />
              <StatBlock label="Speed" value={creature.speed} />
              <StatBlock label="Crit Chance" value={`${creature.crit}%`} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-black/70 border border-white/12 p-4">
              <p className="text-[0.7rem] uppercase tracking-widest text-gray-400 mb-2">
                Skills
              </p>
              <ul className="space-y-2 text-sm text-gray-200">
                {creature.skills.map((s, i) => (
                  <li
                    key={i}
                    className="rounded-xl bg-black/60 border border-white/10 px-3 py-2 flex justify-between"
                  >
                    {s}
                    <span className="text-[0.65rem] text-gray-500">
                      Rank {i + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-black/70 border border-white/12 p-4 flex flex-col gap-2 text-sm">
              <button
                className="py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-sky-500 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.9)] hover:brightness-110"
              >
                Open in Evolution
              </button>
              <button className="py-2.5 rounded-xl bg-black/60 border border-white/20 hover:bg-black/75">
                List on Marketplace
              </button>
              <button
                onClick={onClose}
                className="py-2.5 rounded-xl bg-black/40 border border-white/10 text-gray-300 hover:bg-black/60 mt-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value }) {
  return (
    <div className="rounded-xl bg-black/60 border border-white/10 p-3">
      <p className="text-[0.65rem] uppercase tracking-widest text-gray-500">
        {label}
      </p>
      <p className="text-sm text-gray-100">{value}</p>
    </div>
  );
}
