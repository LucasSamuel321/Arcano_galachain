import React, { useState } from "react";

export default function Marketplace() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // dummy listings (4 eggs + 4 creatures)
  const items = [
    {
      id: 1,
      name: "Frost Egg #1123",
      type: "Egg",
      faction: "Frost",
      rarity: "Common",
      price: "85",
      currency: "GALA",
      image: "/images/eggs/frost.png",
    },
    {
      id: 2,
      name: "Inferno Egg #4410",
      type: "Egg",
      faction: "Inferno",
      rarity: "Common",
      price: "85",
      currency: "GALA",
      image: "/images/eggs/inferno.png",
    },
    {
      id: 3,
      name: "Storm Egg #2321",
      type: "Egg",
      faction: "Storm",
      rarity: "Common",
      price: "85",
      currency: "GALA",
      image: "/images/eggs/storm.png",
    },
    {
      id: 4,
      name: "Nature Egg #9932",
      type: "Egg",
      faction: "Nature",
      rarity: "Common",
      price: "85",
      currency: "GALA",
      image: "/images/eggs/nature.png",
    },
    // creatures
    {
      id: 5,
      name: "Frost Baby #553",
      type: "Creature",
      faction: "Frost",
      rarity: "Rare",
      level: 3,
      price: "140",
      currency: "GALA",
      image: "/images/creatures/frost_baby.png",
    },
    {
      id: 6,
      name: "Inferno Young #77",
      type: "Creature",
      faction: "Inferno",
      rarity: "Epic",
      level: 5,
      price: "330",
      currency: "GALA",
      image: "/images/creatures/inferno_young.png",
    },
    {
      id: 7,
      name: "Storm Baby #18",
      type: "Creature",
      faction: "Storm",
      rarity: "Rare",
      level: 4,
      price: "165",
      currency: "GALA",
      image: "/images/creatures/storm_baby.png",
    },
    {
      id: 8,
      name: "Nature Young #92",
      type: "Creature",
      faction: "Nature",
      rarity: "Legendary",
      level: 7,
      price: "680",
      currency: "GALA",
      image: "/images/creatures/nature_young.png",
    },
  ];

  const rarityColors = {
    Common: "text-gray-300 border-white/10",
    Rare: "text-blue-300 border-blue-500/40",
    Epic: "text-purple-300 border-purple-500/40",
    Legendary: "text-yellow-300 border-yellow-500/40",
    Mythic: "text-pink-300 border-pink-500/40",
  };

  const factionGradients = {
    Frost: "from-cyan-300 to-sky-600",
    Inferno: "from-orange-400 to-red-600",
    Storm: "from-yellow-400 to-indigo-500",
    Nature: "from-emerald-300 to-lime-500",
  };

  return (
    <div
      className="relative min-h-screen bg-black pt-24 pb-20 text-white"
      style={{
        background:
          `
          /* Ambient glow layers */
          radial-gradient(700px at 80% 10%, rgba(168,85,247,0.12), transparent 70%),
          radial-gradient(900px at 20% 90%, rgba(56,189,248,0.10), transparent 70%),
          radial-gradient(850px at 50% 100%, rgba(16,185,129,0.08), transparent 70%),

          /* Particles */
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='2' cy='2' r='1' fill='white' opacity='0.06' /%3E%3C/svg%3E")
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 3px 3px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <header className="mb-10">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-purple-400/80 mb-2">
            Arcano
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-2">
            Marketplace
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl">
            Buy and sell Arcano Eggs and Creatures. Use filters to find exactly
            what you're looking for.
          </p>
        </header>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* SIDEBAR */}
          <aside>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="
                md:hidden w-full mb-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-sm text-gray-200
              "
            >
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <div
              className={`
                space-y-6 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                ${isFilterOpen ? "block" : "hidden md:block"}
              `}
            >
              {/* FILTERS */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Faction
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  {["Frost", "Inferno", "Storm", "Nature"].map((f) => (
                    <label
                      key={f}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input type="checkbox" className="form-checkbox" />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Rarity
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  {["Common", "Rare", "Epic", "Legendary", "Mythic"].map((r) => (
                    <label key={r} className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Type
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  {["Egg", "Creature"].map((t) => (
                    <label key={t} className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Price Range
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    placeholder="Min"
                    className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-center"
                  />
                  <span>-</span>
                  <input
                    placeholder="Max"
                    className="w-20 px-2 py-1 bg-black/50 border border-white/10 rounded-lg text-center"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main>
            {/* TOP BAR */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <input
                placeholder="Search eggs or creatures…"
                className="
                  w-full md:w-80 px-4 py-2
                  rounded-xl bg-black/60 border border-white/10
                  text-sm
                "
              />

              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-400">{items.length} results</p>

                <select
                  className="
                    px-3 py-2 bg-black/60 border border-white/10
                    rounded-xl text-sm
                  "
                >
                  <option>Sort: Recently Listed</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rarity: High to Low</option>
                </select>
              </div>
            </div>

            {/* LISTINGS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="
                    group bg-black/60 border border-white/10 rounded-2xl
                    p-3 backdrop-blur-xl
                    hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
                    transition-all hover:-translate-y-1
                  "
                >
                  {/* IMAGE */}
                  <div className="relative">
                    <div
                      className={`
                        absolute inset-0 opacity-30 blur-xl rounded-2xl
                        bg-gradient-to-br ${factionGradients[item.faction]}
                      `}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative w-full rounded-xl object-contain"
                    />
                  </div>

                  {/* NAME */}
                  <p className="mt-3 text-sm font-semibold text-gray-100 truncate">
                    {item.name}
                  </p>

                  <div className="flex items-center justify-between mt-1 text-[0.7rem]">
                    <span className="text-gray-400">{item.faction}</span>
                    <span
                      className={`
                        px-2 py-0.5 rounded-full border text-[0.65rem]
                        ${rarityColors[item.rarity]}
                      `}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-bold text-purple-300">
                    {item.price} {item.currency}
                  </p>

                  <button
                    className="
                      mt-3 w-full py-1.5 text-xs rounded-xl
                      bg-white/5 border border-white/10
                      hover:bg-white/10 transition
                    "
                  >
                    View Listing
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

