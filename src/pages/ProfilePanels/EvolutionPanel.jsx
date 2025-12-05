// src/pages/ProfilePanels/EvolutionPanel.jsx
import { useState } from "react";
import { useGame } from "../../context/GameContext";

/**
 * EvolutionPanel
 * --------------------------------------------------------
 * Allows:
 * - Selecting a YOUNG creature
 * - Spending resources (arcano + hatchTokens) to evolve
 * - Converting it to an ADULT version (stage: "adult")
 *
 * Evolution logic:
 * - Improves stats
 * - Keeps rarity
 * - Slightly increases quality
 * - Converts stage → adult
 */

export default function EvolutionPanel() {
  const {
    state,
    getYoungCreatures,
    removeCreature,
    addAdultCreature,
    updateCurrencies,
  } = useGame();

  const young = getYoungCreatures();

  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  // Evolution cost (can be balanced later)
  const EVO_COST = {
    arcano: 30,
    hatchTokens: 10,
  };

  function canAfford() {
    return (
      state.currencies.arcano >= EVO_COST.arcano &&
      state.currencies.hatchTokens >= EVO_COST.hatchTokens
    );
  }

  function handleEvolution() {
    setError("");

    if (!selected) {
      setError("Select a creature to evolve.");
      return;
    }

    if (!canAfford()) {
      setError("Not enough resources.");
      return;
    }

    // Spend currency
    updateCurrencies({
      arcano: -EVO_COST.arcano,
      hatchTokens: -EVO_COST.hatchTokens,
    });

    // Remove the young one
    removeCreature(selected.id);

    // Create evolved adult
    const evolved = evolveCreature(selected);

    // Add adult to creature list
    addAdultCreature(evolved);

    // Reset UI
    setSelected(null);
  }

  // -------------------------------------------------------
  // EVOLUTION LOGIC
  // -------------------------------------------------------
  function evolveCreature(c) {
    const boost = 1.25; // base stat increase multiplier

    return {
      id: `EVOLVED_${Date.now()}`,
      name: `${c.faction} Adult`,
      faction: c.faction,
      stage: "adult",
      rarity: c.rarity,
      quality: Math.min(100, Math.round(c.quality + 10)),
      stats: {
        hp: Math.round(c.stats.hp * boost),
        atk: Math.round(c.stats.atk * boost),
        def: Math.round(c.stats.def * boost),
        speed: Math.round(c.stats.speed * 1.1),
      },
      skills: [],
      passive: null,
    };
  }

  // -------------------------------------------------------
  // RENDER CREATURE CARD
  // -------------------------------------------------------
  function CreatureCard({ c, selected }) {
    return (
      <div
        onClick={() => setSelected(c)}
        className={`cursor-pointer rounded-xl p-3 border transition
          ${selected ? "border-yellow-400" : "border-white/10"} bg-black/40
          hover:bg-black/60`}
      >
        <p className="text-white font-semibold">{c.name}</p>
        <p className="text-xs text-gray-400">Rarity: {c.rarity}</p>
        <p className="text-xs text-gray-400">Quality: {c.quality}</p>
        <div className="mt-2 grid grid-cols-2 text-xs text-gray-300">
          <span>HP: {c.stats.hp}</span>
          <span>ATK: {c.stats.atk}</span>
          <span>DEF: {c.stats.def}</span>
          <span>SPD: {c.stats.speed}</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Evolution</h2>

      {error && (
        <div className="mb-4 text-red-400 font-semibold bg-red-900/20 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Resources */}
      <div className="mb-4 text-sm text-gray-300">
        <p>Arcano: {state.currencies.arcano}</p>
        <p>Hatch Tokens: {state.currencies.hatchTokens}</p>
      </div>

      {/* Creature selection */}
      <h3 className="text-white mb-2">Select a Young Creature</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {young.map((c) => (
          <CreatureCard key={c.id} c={c} selected={selected?.id === c.id} />
        ))}
      </div>

      {/* Evolve button */}
      <button
        onClick={handleEvolution}
        disabled={!selected || !canAfford()}
        className={`w-full py-3 rounded-xl text-lg font-bold 
          ${selected && canAfford() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 cursor-not-allowed"}`}
      >
        Evolve to Adult
      </button>
    </div>
  );
}
