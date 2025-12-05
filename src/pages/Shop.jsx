// src/pages/Shop.jsx
import { useState } from "react";
import MintModal from "../components/MintModal";
import { useGame } from "../context/GameContext";

/**
 * Arcano Shop
 * FINAL FIXED VERSION
 * - Restored layout exactly (no stretching)
 * - Centered grid with max-width
 * - Egg cards same width as before
 * - Auto-send to incubator logic preserved
 * - addEgg() integrated
 * - updateCurrencies() ready (commented)
 */

export default function Shop() {
  const { addEgg, updateCurrencies, moveEggToIncubator, state } = useGame();

  const [activeTab, setActiveTab] = useState("Eggs");
  const [isMintOpen, setIsMintOpen] = useState(false);
  const [lastMintResult, setLastMintResult] = useState(null);
  const [mintHistory, setMintHistory] = useState([]);
  const [autoSendToIncubator, setAutoSendToIncubator] = useState(false);

  const TABS = ["Eggs", "Cosmetics", "Boosts"];

  const EGG_CARDS = [
    { faction: "Frost", colors: "from-cyan-400 to-blue-600", img: "/images/eggs/frost.png" },
    { faction: "Inferno", colors: "from-red-500 to-orange-500", img: "/images/eggs/inferno.png" },
    { faction: "Nature", colors: "from-lime-400 to-emerald-600", img: "/images/eggs/nature.png" },
    { faction: "Storm", colors: "from-yellow-300 to-indigo-500", img: "/images/eggs/storm.png" },
  ];

  // rarity generator
  function generateRarityHint() {
    const roll = Math.random();
    if (roll < 0.02) return "legendary";
    if (roll < 0.12) return "epic";
    if (roll < 0.32) return "rare";
    return "common";
  }

  // Mint success handler
  const handleMintSuccess = (result) => {
    if (!result) return;

    const newEgg = {
      id: result.eggId,
      faction: result.faction,
      rarityHint: generateRarityHint(),
      createdAt: Date.now(),
    };

    addEgg(newEgg);
    // updateCurrencies({ arcano: -50 }); // example cost

    setLastMintResult(result);
    setMintHistory((prev) => [
      { ...result, time: Date.now() },
      ...prev.slice(0, 19),
    ]);

    setIsMintOpen(false);

    if (autoSendToIncubator) {
      const emptySlot = state.incubatorSlots.find((s) => s.status === "empty");
      if (emptySlot) {
        moveEggToIncubator(emptySlot.slotId, newEgg.id, 4 * 60 * 60 * 1000);
      }
      window.location.href = "/profile";
    }
  };

  return (
    <div className="p-4 md:p-6 w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-2">Arcano Shop</h1>
        <p className="text-gray-300 mb-4">Mint eggs, unlock cosmetics, and buy boosts.</p>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-lg text-sm ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-black/40 text-gray-300 border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* AUTO-SEND TO INCUBATOR */}
        {activeTab === "Eggs" && (
          <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/10 p-3 rounded-xl">
            <input
              type="checkbox"
              checked={autoSendToIncubator}
              onChange={(e) => setAutoSendToIncubator(e.target.checked)}
            />
            <span className="text-gray-300 text-sm">
              Auto-send minted eggs directly to incubator
            </span>
          </div>
        )}

        {/* EGG SHOP GRID */}
        {activeTab === "Eggs" && (
          <>
            <div className="
              grid grid-cols-1 
              sm:grid-cols-2 
              gap-6 
              mb-8 
              w-full 
              justify-items-center
            ">
              {EGG_CARDS.map((egg) => (
                <div
                  key={egg.faction}
                  className="rounded-2xl p-5 bg-black/50 border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-all duration-200 w-full max-w-[420px]"
                >
                  <div
                    className={`w-full h-32 rounded-xl bg-gradient-to-br ${egg.colors} 
                                flex items-center justify-center mb-4`}
                  >
                    <img src={egg.img} alt="" className="w-20 h-20 object-contain" />
                  </div>

                  <h3 className="text-lg text-white font-semibold mb-4">
                    {egg.faction} Egg
                  </h3>

                  <button
                    onClick={() => setIsMintOpen(true)}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 
                              text-sm font-semibold transition"
                  >
                    Mint Random Egg
                  </button>
                </div>
              ))}
            </div>

            <MintModal
              isOpen={isMintOpen}
              onClose={() => setIsMintOpen(false)}
              onSuccess={handleMintSuccess}
            />

            {/* Mint History */}
            {lastMintResult && (
              <>
                <h3 className="text-lg text-white font-semibold mb-2">Mint History</h3>
                <div className="space-y-2">
                  {mintHistory.map((entry, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-black/50 border border-white/10 p-3 text-sm text-gray-300"
                    >
                      <span className="font-semibold text-purple-300">
                        {entry.faction} Egg
                      </span>{" "}
                      — id #{entry.eggId} —{" "}
                      <span className="text-[0.7rem]">{new Date(entry.time).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* OTHER TABS */}
        {activeTab === "Cosmetics" && (
          <p className="text-gray-400 text-sm">Cosmetics store coming soon.</p>
        )}

        {activeTab === "Boosts" && (
          <p className="text-gray-400 text-sm">Boost items will appear here.</p>
        )}
      </div>
    </div>
  );
}


