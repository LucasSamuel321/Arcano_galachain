import { youngCreatures } from "../data/youngCreatures";
import { creatureStats } from "../data/creatureStats";
import { skillList } from "../data/skillList";

// ---------------------------------------------------------------
// Utility Helpers
// ---------------------------------------------------------------

// Random integer in range
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Weighted % roll
const chance = (percent) => Math.random() * 100 < percent;

// Pick random item from array
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Filter skills by tier for rarity rules
function getSkillsByTier(skills, tier) {
  return skills.filter((skill) => {
    const s = skillList.find((x) => x.id === skill);
    return s && s.tier === tier;
  });
}

// Find Adult template by faction
function getAdultTemplate(faction) {
  return creatureStats.find((creature) => creature.faction === faction);
}

// ---------------------------------------------------------------
// STEP 1 – QUALITY MERGE
// ---------------------------------------------------------------
function mergeQuality(parentA, parentB) {
  const avg = Math.floor((parentA.quality + parentB.quality) / 2);
  const bonus = rand(-10, 10);
  const final = Math.max(1, Math.min(100, avg + bonus));
  return final;
}

// ---------------------------------------------------------------
// STEP 2 – RARITY ROLL
// ---------------------------------------------------------------
function rarityValueToNumber(r) {
  return { common: 1, rare: 2, epic: 3, legendary: 4 }[r];
}

function rarityNumberToName(n) {
  return ["common", "rare", "epic", "legendary"][n - 1];
}

function rollRarity(parentA, parentB) {
  const a = rarityValueToNumber(parentA.rarity);
  const b = rarityValueToNumber(parentB.rarity);

  // SAME rarity
  if (a === b) {
    if (chance(20) && a < 4) return rarityNumberToName(a + 1);
    return rarityNumberToName(a);
  }

  // DIFFERENT rarity
  const lower = Math.min(a, b);
  const higher = Math.max(a, b);

  const roll = rand(1, 100);

  if (roll <= 50) return rarityNumberToName(lower);
  if (roll <= 90) return rarityNumberToName(Math.floor((a + b) / 2));
  if (roll <= 100 && higher < 4) return rarityNumberToName(higher + 1);

  return rarityNumberToName(higher);
}

// ---------------------------------------------------------------
// STEP 3 – STAT ROLL FOR ADULT
// ---------------------------------------------------------------
function rollStat(range, quality, multiplier) {
  const [min, max] = range;
  let value = min + ((max - min) * (quality / 100));
  value = Math.floor(value * multiplier);
  return value;
}

// ---------------------------------------------------------------
// STEP 4 – SKILL ROLL (based on rarity rules)
// ---------------------------------------------------------------
function rollSkills(adultTemplate, rarity) {
  const rules = adultTemplate.skillRollRules[rarity];

  let selected = [];

  for (let tier in rules) {
    const count = rules[tier];
    const tierNum = parseInt(tier.replace("tier", ""));

    const skillsOfTier = adultTemplate.skillPool.filter((id) => {
      const s = skillList.find((sk) => sk.id === id);
      return s.tier === tierNum;
    });

    for (let i = 0; i < count; i++) {
      selected.push(pick(skillsOfTier));
    }
  }

  return selected;
}

// ---------------------------------------------------------------
// STEP 5 – PASSIVE ROLL
// ---------------------------------------------------------------
function rollPassive(adultTemplate, rarity) {
  return adultTemplate.passives[rarity];
}

// ---------------------------------------------------------------
// MAIN BREED FUNCTION
// ---------------------------------------------------------------
export function breedCreatures(parentA, parentB) {

  // -----------------------------------------------------------
  // VALIDATION
  // -----------------------------------------------------------
  if (parentA.faction !== parentB.faction) {
    throw new Error("Cannot breed creatures of different factions.");
  }

  const faction = parentA.faction;

  const adultTemplate = getAdultTemplate(faction);
  if (!adultTemplate) throw new Error("Adult creature template not found.");

  // -----------------------------------------------------------
  // QUALITY INHERITANCE
  // -----------------------------------------------------------
  const quality = mergeQuality(parentA, parentB);

  // -----------------------------------------------------------
  // RARITY ROLL
  // -----------------------------------------------------------
  const rarity = rollRarity(parentA, parentB);

  // -----------------------------------------------------------
  // STAT ROLLS
  // -----------------------------------------------------------
  const mult = adultTemplate.rarityMultipliers[rarity];

  const hp = rollStat(adultTemplate.baseStats.hp, quality, mult);
  const atk = rollStat(adultTemplate.baseStats.atk, quality, mult);
  const def = rollStat(adultTemplate.baseStats.def, quality, mult);
  const speed = rollStat(adultTemplate.baseStats.speed, quality, mult);

  // -----------------------------------------------------------
  // SKILL ROLL
  // -----------------------------------------------------------
  const skills = rollSkills(adultTemplate, rarity);

  // -----------------------------------------------------------
  // PASSIVE ROLL
  // -----------------------------------------------------------
  const passive = rollPassive(adultTemplate, rarity);

  // -----------------------------------------------------------
  // RETURN ADULT OBJECT
  // -----------------------------------------------------------
  return {
    id: `${faction}_ADULT_${Date.now()}`,
    name: adultTemplate.name,
    faction,
    rarity,
    quality,
    stats: { hp, atk, def, speed },
    skills,
    passive
  };
}
