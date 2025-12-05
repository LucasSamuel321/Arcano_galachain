export const rarityColors = {
  common: "#9d9d9d",
  rare: "#0070dd",
  epic: "#a335ee",
  legendary: "#ff8000"
};

export const rarityNames = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary"
};

export function getRarityColor(rarity) {
  return rarityColors[rarity] || "#ffffff";
}
