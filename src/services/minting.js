// src/services/minting.js

const FACTIONS = ["Frost", "Inferno", "Storm", "Nature"];

/**
 * Simulated mint call.
 * Replace this with real smart contract interaction later.
 */
export async function mintRandomEgg() {
  // Simulate network / chain delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const faction = FACTIONS[Math.floor(Math.random() * FACTIONS.length)];
  const eggId = Date.now().toString().slice(-8);
  const txHash = "0x" + Math.random().toString(16).slice(2, 10);

  return {
    eggId,
    faction,
    rarity: "Common",
    txHash,
  };
}
