// src/pages/ProfilePanels/BreedingPanel.jsx
import { useState } from "react";
import { useGame } from "../../context/GameContext";

/**
 * BreedingPanel
 * --------------------------------------------------------
 * - Select 2 young creatures
 * - Burn them (removeCreature)
 * - Generate an adult creature (addAdultCreature)
 * - Spend breedToken + arcano
 *
 * All data is sourced from GameContext.
 */

export default function BreedingPanel() {
  const {
    state,
    getYoungCreatures,
    removeCreature,
    addAdultCreature,
    updateCurrencies,
  } = useGame();

  const youngCreatures = getYoungCreatures();

  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [error, setError] = useState("");

  const BREED_COST = {
    arcano: 50,
    breedToken: 20,
  };

  const bothSelected = selected1 && selected2;

  function canAfford() {
    return (
      state.currencies.arcano >= BREED_COST.arcano &&
      state.currencies.breedToken >= BREED_COST.breedToken
    );
  }

  function handleBreed() {
    setError("");

    if (!bothSelected) {
      setError("You must select 2 young creatures.");
      return;
    }

    if (selected1.id === selected2.id) {
      setError("You cannot breed the same creature twice.");
      return;
    }

    if (!canAfford()) {
      setError("Not enough resources.");
      return;
    }

    // --------------------------------------------
    // REMOVE both young creatures (burn parents)
    // --------------------------------------------
    removeCreature(selected1.id);
    removeCreature(selected2.id);

    // --------------------------------------------
    // SPEND currencies
    // --------------------------------------------
    updateCurrencies({
      arcano: -BREED_COST.arcano,
      breedToken: -BREED_COST.breedToken,
    });

    // --------------------------------------------
    // GENERATE adult creature
    // Some traits mixing simplified for now
    // --------------------------------------------
    const newAdult = generateAdult(selected1, selected2);

    addAdultCreature(newAdult);

    // RESET UI
    setSelected1(null);
    setSelected2(null);
  }

  // ---------------------------------------------------------
  // ADULT CREATION LOGIC
  // ---------------------------------------------------------
  function generateAdult(parentA, parentB) {
    const rarityTable = ["common", "rare", "epic", "legendary"];

    // pick higher rarity
    const rarityIndex = Math.max(
      rarityTable.indexOf(parentA.rarity),
      rarityTable.indexOf(parentB.rarity)
    );

    const finalRarity = rarityTable[rarityIndex];

    const mix = (a, b) => Math.round((a + b) / 2);

    return {
      id: `ADULT_${Date.now()}`,
      faction: parentA.faction === parentB.faction ? parentA.faction : parentA.faction,
      name: `${parentA.faction} Adult`,
      stage: "adult",
      rarity: finalRarity,
      quality: Math.round((parentA.quality + parentB.quality) / 2),
      stats: {
        hp: mix(parentA.stats.hp, parentB.stats.hp) + 20,
        atk: mix(parentA.stats.atk, parentB.stats.atk) + 5,
        def: mix(parentA.stats.def, parentB.stats.def) + 3,
        speed: mix(parentA.stats.speed, parentB.stats.speed),
      },
      skills: [],     // later we auto-assign from skillList.js
      passive: null,
    };
  }

  // ---------------------------------------------------------
  // RENDER CREATURE CARD
  // ---------------------------------------------------------
  function CreatureCard({ c, onSelect, selected }) {
    return (
      <div
        onClick={() => onSelect(c)}
        className={`cursor-pointer rounded-xl p-3 border 
          ${selected ? "border-yellow-400" : "border-white/10"} 
          bg-black/40 hover:bg-black/60 transition`}
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

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Breeding</h2>

      {error && (
        <div className="mb-4 text-red-400 font-semibold bg-red-900/20 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Current resources */}
      <div className="mb-4 text-sm text-gray-300">
        <p>Arcano: {state.currencies.arcano}</p>
        <p>Breed Token: {state.currencies.breedToken}</p>
      </div>

      {/* Selection section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-white mb-2">Select First Parent</h3>
          <div className="grid grid-cols-1 gap-2">
            {youngCreatures.map((c) => (
              <CreatureCard
                key={c.id}
                c={c}
                selected={selected1?.id === c.id}
                onSelect={setSelected1}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white mb-2">Select Second Parent</h3>
          <div className="grid grid-cols-1 gap-2">
            {youngCreatures.map((c) => (
              <CreatureCard
                key={c.id}
                c={c}
                selected={selected2?.id === c.id}
                onSelect={setSelected2}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Breed button */}
      <button
        onClick={handleBreed}
        disabled={!bothSelected || !canAfford()}
        className={`w-full py-3 rounded-xl text-lg font-bold 
          ${bothSelected && canAfford() ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-600 cursor-not-allowed"}`}
      >
        Breed Creatures
      </button>
    </div>
  );
}

