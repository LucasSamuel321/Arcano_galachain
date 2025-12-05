// src/components/MintModal.jsx
import { useEffect, useState } from "react";

/**
 * MintModal — AAA Gacha Reveal System
 * ------------------------------------------------------
 * - 3-phase animation:
 *   1. Summoning (energy charge)
 *   2. Egg Reveal (glow + faction element)
 *   3. Rarity Reveal (color aura)
 *
 * - Returns:
 *   { eggId, faction, rarityHint, txHash }
 *
 * - UI safe for Shop layout.
 */

export default function MintModal({ isOpen, onClose, onSuccess }) {
  const [phase, setPhase] = useState("idle"); // idle → charging → reveal → result
  const [result, setResult] = useState(null);

  // Used for visual reveal
  const [glowColor, setGlowColor] = useState("purple");
  const [faction, setFaction] = useState(null);
  const [rarity, setRarity] = useState("common");

  // Factions list
  const factions = ["Frost", "Inferno", "Nature", "Storm"];

  // Rarity table
  const rarityRoll = () => {
    const r = Math.random();
    if (r < 0.02) return "legendary";
    if (r < 0.12) return "epic";
    if (r < 0.32) return "rare";
    return "common";
  };

  // Aura colors by rarity
  const rarityGlow = {
    common: "shadow-[0_0_30px_rgba(200,200,200,0.3)]",
    rare: "shadow-[0_0_40px_rgba(56,189,248,0.6)]",
    epic: "shadow-[0_0_45px_rgba(168,85,247,0.7)]",
    legendary: "shadow-[0_0_50px_rgba(252,211,77,1)]",
  };

  const rarityText = {
    common: "text-gray-200",
    rare: "text-sky-300",
    epic: "text-purple-300",
    legendary: "text-amber-300",
  };

  useEffect(() => {
    if (!isOpen) {
      setPhase("idle");
      return;
    }

    // Start animation after small delay
    setTimeout(() => setPhase("charging"), 100);

    // Generate mint result
    const selectedFaction = factions[Math.floor(Math.random() * factions.length)];
    const selectedRarity = rarityRoll();

    setFaction(selectedFaction);
    setRarity(selectedRarity);

    // Glow color per faction (soft)
    const glow = {
      Frost: "cyan",
      Inferno: "red",
      Nature: "green",
      Storm: "yellow",
    };
    setGlowColor(glow[selectedFaction]);

    // Move to reveal phase
    setTimeout(() => {
      setPhase("reveal");
    }, 1500);

    // Final result phase
    setTimeout(() => {
      const mintResult = {
        eggId: "egg_" + Date.now(),
        faction: selectedFaction,
        rarityHint: selectedRarity,
        txHash: "0x" + Math.floor(Math.random() * 1e16).toString(16),
      };

      setResult(mintResult);
      setPhase("result");
    }, 2600);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (result) onSuccess(result);
  };

  // PHASE 1 — Charging animation
  const ChargingFX = () => (
    <div className="flex flex-col items-center">
      <div className="
        w-40 h-40 rounded-full bg-gradient-to-br from-purple-700 to-purple-900
        animate-pulse shadow-[0_0_40px_rgba(168,85,247,0.7)]
      " />
      <p className="text-purple-300 text-sm mt-4 animate-pulse">Summoning energy...</p>
    </div>
  );

  // PHASE 2 — Egg materializing
  const RevealFX = () => (
    <div className="flex flex-col items-center transition-all duration-500">
      <div
        className={`w-44 h-44 rounded-full bg-black/80 border-2 border-white/10 flex items-center justify-center
        shadow-lg ${rarityGlow[rarity]} animate-[pulse_0.8s_infinite]`}
      >
        <img
          src={`/images/eggs/${faction.toLowerCase()}.png`}
          alt=""
          className="w-24 h-24 object-contain animate-[bounce_1.2s_infinite]"
        />
      </div>

      <p className={`${rarityText[rarity]} text-lg font-semibold mt-3`}>
        {faction} Egg Appears!
      </p>
      <p className="text-gray-400 text-sm">{rarity.toUpperCase()} rarity</p>
    </div>
  );

  // PHASE 3 — Final result screen
  const ResultFX = () => (
    <div className="flex flex-col items-center">
      <div
        className={`w-48 h-48 rounded-full bg-black border border-white/20 flex items-center justify-center ${rarityGlow[rarity]}`}
      >
        <img
          src={`/images/eggs/${faction.toLowerCase()}.png`}
          alt=""
          className="w-28 h-28 object-contain"
        />
      </div>

      <p className={`${rarityText[rarity]} text-xl font-bold mt-4`}>
        {faction} Egg
      </p>
      <p className="text-gray-300 text-sm tracking-wide mb-4">
        Rarity: {rarity.toUpperCase()}
      </p>

      <button
        onClick={handleConfirm}
        className="mt-3 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700
                  font-semibold text-white transition shadow-lg"
      >
        Claim Egg
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-4">
      <div className="relative bg-black/80 border border-white/15 rounded-3xl max-w-sm w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl"
        >
          ×
        </button>

        {/* Modal body */}
        {phase === "charging" && <ChargingFX />}
        {phase === "reveal" && <RevealFX />}
        {phase === "result" && <ResultFX />}

        {phase === "idle" && (
          <p className="text-white text-center">Preparing...</p>
        )}
      </div>
    </div>
  );
}



