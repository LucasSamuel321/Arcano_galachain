// src/pages/ProfilePanels/InventoryPanel.jsx
import { useState } from "react";
import { useGame } from "../../context/GameContext";

/**
 * InventoryPanel — FINAL LOGIC VERSION
 * UI is 100% preserved.
 * Only logic is added for:
 * - Use Item
 * - Sell Item
 * - Real item categories from GameContext
 */

export default function InventoryPanel() {
  const { state, useBoostItem, removeItem, addCurrency } = useGame();

  const [activeTab, setActiveTab] = useState("Currencies");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState("All");

  // ---------------------------------------------------------
  // BUILD REAL INVENTORY DATA FOR UI
  // ---------------------------------------------------------
  const inventoryData = {
    Currencies: [
      {
        id: "arcano",
        name: "ARCANO Token",
        qty: state.currencies.arcano,
        rarity: "Epic",
        description: "Used for evolution and advanced upgrades.",
        icon: "/images/items/currency_arcano.png",
      },
      {
        id: "hatchTokens",
        name: "Hatch Tokens",
        qty: state.currencies.hatchTokens,
        rarity: "Rare",
        description: "Used for incubator instant hatch.",
        icon: "/images/items/hatch_tokens.png",
      },
      {
        id: "breedToken",
        name: "Breed Tokens",
        qty: state.currencies.breedToken,
        rarity: "Rare",
        description: "Required for breeding creatures.",
        icon: "/images/items/breed_tokens.png",
      },
    ],

    Eggs: state.eggs.map((egg) => ({
      id: egg.id,
      name: `${egg.faction} Egg`,
      qty: 1,
      rarity: egg.rarityHint || "Common",
      icon: `/images/eggs/${egg.faction.toLowerCase()}.png`,
      description:
        "An unhatched egg. Place it in the incubator to begin the hatching process.",
    })),

    Creatures: state.creatures.map((c) => ({
      id: c.id,
      name: `${c.name} (${c.stage})`,
      qty: 1,
      rarity: c.rarity,
      icon: `/images/creatures/${c.faction.toLowerCase()}_${c.stage}.png`,
      description: `${c.name}, a creature of the ${c.faction} faction.`,
    })),

    Boosters: state.inventory.boosts.map((b) => ({
      id: b.id,
      name: `${b.type.toUpperCase()}`,
      qty: b.quantity,
      rarity: "Epic",
      icon: "/images/items/boost_generic.png",
      description: "Special boost item.",
    })),

    Materials: state.inventory.items.map((i) => ({
      id: i.id,
      name: i.name,
      qty: i.quantity,
      rarity: i.rarity || "Common",
      description: i.description || "Material used for crafting and upgrades.",
      icon: i.icon || "/images/items/material_default.png",
    })),
  };

  const categories = Object.keys(inventoryData);

  const items = inventoryData[activeTab].filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesRarity =
      rarityFilter === "All" || rarityFilter === item.rarity;
    return matchesSearch && matchesRarity;
  });

  // rarity UI
  const rarityColors = {
    Common: "text-gray-300",
    Rare: "text-sky-300",
    Epic: "text-purple-300",
    Legendary: "text-amber-300",
  };

  const rarityBorders = {
    Common: "border-white/10",
    Rare: "border-sky-400/60 shadow-[0_0_8px_rgba(56,189,248,0.25)]",
    Epic: "border-purple-400/70 shadow-[0_0_10px_rgba(168,85,247,0.4)]",
    Legendary:
      "border-amber-300/80 shadow-[0_0_14px_rgba(252,211,77,0.55)]",
  };

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold tracking-wide mb-2">
        Inventory
      </h2>

      <p className="text-xs md:text-sm text-gray-400 mb-4">
        All in-game items: currencies, eggs, creatures, boosters, materials.
      </p>

      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`
              px-3 py-1.5 rounded-xl text-sm whitespace-nowrap
              ${
                activeTab === cat
                  ? "bg-purple-600/50 border border-purple-400/50 text-white"
                  : "bg-black/50 border border-white/10 text-gray-300 hover:bg-white/5"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl bg-black/70 border border-white/10 p-4 mb-6 backdrop-blur-xl">
        <div className="relative mb-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-xl bg-black/60 border border-white/15
              pl-10 pr-3 py-2 text-sm text-gray-100 placeholder:text-gray-500
              focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex gap-2 text-xs">
          <label className="flex items-center gap-1">
            <span className="text-gray-400">Rarity:</span>
            <select
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
              className="rounded-xl bg-black/60 border border-white/15 px-2 py-1 text-gray-100"
            >
              {["All", "Common", "Rare", "Epic", "Legendary"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* ITEM GRID */}
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">No items match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              borders={rarityBorders}
              colors={rarityColors}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          useBoostItem={useBoostItem}
          removeItem={removeItem}
          addCurrency={addCurrency}
        />
      )}
    </>
  );
}

/* ---------------------------------------------------
   ITEM CARD
----------------------------------------------------- */
function ItemCard({ item, onClick, borders, colors }) {
  return (
    <button
      onClick={onClick}
      className={`
        group rounded-2xl bg-black/70 border p-4 text-left hover:brightness-110 transition
        ${borders[item.rarity]}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12">
          <img src={item.icon} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-white line-clamp-1">
            {item.name}
          </p>
          <p className="text-xs text-gray-400 mt-1">{item.qty}x</p>
        </div>
      </div>

      <p className={`text-xs mt-2 ${colors[item.rarity]}`}>{item.rarity}</p>
    </button>
  );
}

/* ---------------------------------------------------
   ITEM DETAIL MODAL — LOGIC ADDED
----------------------------------------------------- */
function ItemDetailModal({ item, onClose, useBoostItem, removeItem, addCurrency }) {
  const handleUseItem = () => {
    // -------------------------
    // ITEM TYPE LOGIC
    // -------------------------

    if (item.name.includes("BOOST") || item.name.includes("Boost")) {
      useBoostItem(item.id);
      onClose();
      return;
    }

    if (item.name.includes("Egg")) {
      alert("Place eggs into the Incubator in the Incubator tab.");
      return;
    }

    if (item.name.includes("Token")) {
      alert("Tokens cannot be used directly.");
      return;
    }

    alert("This item cannot be used yet.");
  };

  const handleSellItem = () => {
    const amount = Math.floor(item.qty * 5);

    removeItem(item.id, 1);
    addCurrency("arcano", amount);

    alert(`Sold 1 item for ${amount} ARCANO.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-4">
      <div className="relative bg-black/80 border border-white/15 rounded-3xl max-w-md w-full p-6">
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-lg">
          ×
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16">
            <img src={item.icon} className="w-full h-full object-contain" alt="" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.rarity}</p>
            <p className="text-sm text-gray-300 mt-1">{item.qty} available</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4">{item.description}</p>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleUseItem}
            className="py-2 rounded-xl bg-purple-600/60 border border-purple-400 text-white font-semibold"
          >
            Use Item
          </button>

          <button
            onClick={handleSellItem}
            className="py-2 rounded-xl bg-black/50 border border-white/15 text-gray-300"
          >
            Sell Item
          </button>

          <button
            onClick={onClose}
            className="py-2 rounded-xl bg-black/40 border border-white/10 text-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


