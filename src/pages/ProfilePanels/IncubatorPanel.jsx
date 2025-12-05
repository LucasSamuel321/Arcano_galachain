// src/pages/ProfilePanels/IncubatorPanel.jsx
import { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";

/**
 * IncubatorPanel
 * ---------------------------------------------------------
 * Real egg inventory → real incubator slots → real hatching.
 *
 * GameContext connection:
 * - state.eggs
 * - state.incubatorSlots
 * - moveEggToIncubator()
 * - completeHatch()
 * - instantHatchWithBoost()
 */

export default function IncubatorPanel() {
  const {
    state,
    moveEggToIncubator,
    completeHatch,
    instantHatchWithBoost
  } = useGame();

  const [selectedEggId, setSelectedEggId] = useState(null);
  const eggs = state.eggs;
  const slots = state.incubatorSlots;

  // ---------------------------------------------------------
  // Time left calculator for each slot
  // ---------------------------------------------------------
  function getRemainingMs(slot) {
    if (!slot.startedAt || !slot.hatchDurationMs) return 0;
    const end = slot.startedAt + slot.hatchDurationMs;
    return Math.max(0, end - Date.now());
  }

  // This re-renders every second to update countdowns
  const [, forceTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => forceTick(x => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // ---------------------------------------------------------
  // Handle placing egg into incubator
  // ---------------------------------------------------------
  function handlePlaceEgg(slotId) {
    if (!selectedEggId) return;
    moveEggToIncubator(slotId, selectedEggId, 4 * 60 * 60 * 1000); // 4h default
    setSelectedEggId(null);
  }

  // ---------------------------------------------------------
  // Hatch button
  // ---------------------------------------------------------
  function handleHatch(slotId) {
    completeHatch(slotId);
  }

  // ---------------------------------------------------------
  // Instant hatch boost
  // ---------------------------------------------------------
  function handleInstant(slotId) {
    instantHatchWithBoost(slotId);
  }

  // ---------------------------------------------------------
  // Format time
  // ---------------------------------------------------------
  function formatTime(ms) {
    if (ms <= 0) return "Ready!";
    const sec = Math.floor(ms / 1000);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
  }

  // ---------------------------------------------------------
  // Egg card component
  // ---------------------------------------------------------
  function EggCard({ egg }) {
    return (
      <div
        className={`p-3 rounded-xl cursor-pointer border ${
          selectedEggId === egg.id
            ? "border-yellow-400 bg-black/60"
            : "border-white/10 bg-black/30"
        }`}
        onClick={() => setSelectedEggId(egg.id)}
      >
        <p className="text-white font-semibold">{egg.faction} Egg</p>
        <p className="text-xs text-gray-400">Rarity Hint: {egg.rarityHint || "common"}</p>
        <p className="text-xs text-gray-500">ID: {egg.id}</p>
      </div>
    );
  }

  // ---------------------------------------------------------
  // Slot component
  // ---------------------------------------------------------
  function IncubatorSlot({ slot }) {
    const remaining = getRemainingMs(slot);

    return (
      <div className="p-4 rounded-xl border border-white/10 bg-black/30">
        <p className="text-white font-semibold mb-2">Slot {slot.slotId}</p>

        {/* EMPTY SLOT */}
        {slot.status === "empty" && (
          <>
            <p className="text-gray-400 text-sm mb-3">Select an egg to place here.</p>
            <button
              disabled={!selectedEggId}
              onClick={() => handlePlaceEgg(slot.slotId)}
              className={`w-full py-2 rounded-lg text-sm font-semibold 
                ${
                  selectedEggId
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
            >
              Place Egg
            </button>
          </>
        )}

        {/* HATCHING SLOT */}
        {slot.status === "hatching" && (
          <>
            <p className="text-yellow-400 text-sm mb-2">
              Hatching: {slot.egg.faction} Egg
            </p>
            <p className="text-xs text-gray-300 mb-3">Time left: {formatTime(remaining)}</p>

            {/* Instant hatch */}
            <button
              onClick={() => handleInstant(slot.slotId)}
              className="w-full mb-2 py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-700"
            >
              Instant Hatch (Use Boost)
            </button>

            {/* Hatch now (only when time is over) */}
            <button
              disabled={remaining > 0}
              onClick={() => handleHatch(slot.slotId)}
              className={`w-full py-2 rounded-lg text-sm font-semibold 
                ${
                  remaining <= 0
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
            >
              Hatch Egg
            </button>
          </>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Incubator</h2>

      {/* EGG INVENTORY */}
      <h3 className="text-white mb-2">Your Eggs</h3>
      {eggs.length === 0 ? (
        <p className="text-gray-400 text-sm mb-6">You have no eggs.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {eggs.map((egg) => (
            <EggCard key={egg.id} egg={egg} />
          ))}
        </div>
      )}

      {/* INCUBATOR SLOTS */}
      <h3 className="text-white mb-2">Incubator Slots</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot) => (
          <IncubatorSlot key={slot.slotId} slot={slot} />
        ))}
      </div>
    </div>
  );
}




