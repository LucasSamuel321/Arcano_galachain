export const creatureStats = [

  // ------------------------------------------------------------
  // 🧊 FROST ADULT — GLACIORN
  // ------------------------------------------------------------
  {
    id: "FROST_ADULT_GLACIORN",
    name: "Glaciorn",
    faction: "FROST",

    baseStats: {
      hp: [1150, 1300],
      atk: [60, 75],
      def: [40, 55],
      speed: [12, 16]
    },

    rarityMultipliers: {
      common: 1.00,
      rare: 1.08,
      epic: 1.16,
      legendary: 1.28
    },

    passives: {
      common: "5% freeze chance on basic attacks",
      rare: "10% freeze chance on all attacks",
      epic: "+8% freeze chance and +5% DEF",
      legendary: "+12% freeze chance, Freeze lasts +1 turn, +10% DEF"
    },

    skillPool: [
      "FROST_BITE", "COLD_SLASH", "GLACIAL_TOUCH",
      "ICE_ARMOR", "FROST_NOVA", "CRYSTAL_HEAL",
      "SHATTER_STRIKE", "ABSOLUTE_ZERO", "GLACIAL_WALL",
      "ETERNAL_BLIZZARD", "FROZEN_HEART", "ICE_JUDGEMENT"
    ],

    skillRollRules: {
      common:    { tier1: 2, tier2: 1, tier3: 1 },
      rare:      { tier1: 1, tier2: 2, tier3: 1 },
      epic:      { tier1: 1, tier2: 1, tier3: 1, tier4: 1 },
      legendary: { tier2: 1, tier3: 1, tier4: 2 }
    }
  },

  // ------------------------------------------------------------
  // 🔥 INFERNO ADULT — IGNIVOREX
  // ------------------------------------------------------------
  {
    id: "INFERNO_ADULT_IGNIVOREX",
    name: "Ignivorex",
    faction: "INFERNO",

    baseStats: {
      hp: [1000, 1150],
      atk: [75, 95],
      def: [30, 45],
      speed: [14, 18]
    },

    rarityMultipliers: {
      common: 1.00,
      rare: 1.07,
      epic: 1.15,
      legendary: 1.30
    },

    passives: {
      common: "10% Burn chance on hit",
      rare: "+8% crit rate",
      epic: "+15% crit rate and +10% burn damage",
      legendary: "Every 3rd attack = guaranteed crit, Burn deals double damage"
    },

    skillPool: [
      "EMBER_STRIKE","FIRE_CLAW","RED_HEAT",
      "FLAME_ARMOR","BURNING_ROAR","INFERNO_HEAL",
      "LAVA_SLAM","MOLTEN_BLAST","RAGE_OVERFLOW",
      "APOCALYPSE","HELLFIRE_CHAIN","PHOENIX_REBIRTH"
    ],

    skillRollRules: {
      common:    { tier1: 2, tier2: 2 },
      rare:      { tier1: 1, tier2: 1, tier3: 2 },
      epic:      { tier1: 1, tier2: 1, tier3: 1, tier4: 1 },
      legendary: { tier2: 1, tier3: 1, tier4: 2 }
    }
  },

  // ------------------------------------------------------------
  // 🌿 NATURE ADULT — SYLVARON
  // ------------------------------------------------------------
  {
    id: "NATURE_ADULT_SYLVARON",
    name: "Sylvaron",
    faction: "NATURE",

    baseStats: {
      hp: [1200, 1450],
      atk: [55, 70],
      def: [45, 60],
      speed: [10, 14]
    },

    rarityMultipliers: {
      common: 1.00,
      rare: 1.06,
      epic: 1.12,
      legendary: 1.25
    },

    passives: {
      common: "Heal 3% HP each turn",
      rare: "Heal 3% HP, +5% DEF",
      epic: "Heal 5% HP, +10% poison resist",
      legendary: "Heal 7% HP, Thorns 15%, +10% DEF"
    },

    skillPool: [
      "NATURE_STRIKE","VINE_WHIP","SAP_HEAL",
      "REGEN_BLOOM","THORN_ARMOR","NATURAL_CLEANSING",
      "POISON_BURST","OVERGROWTH","ANCIENT_VINES",
      "FOREST_WRATH","NATURES_GRACE","LIFE_OVERFLOW"
    ],

    skillRollRules: {
      common:    { tier1: 2, tier2: 2 },
      rare:      { tier1: 1, tier2: 2, tier3: 1 },
      epic:      { tier1: 1, tier2: 1, tier3: 1, tier4: 1 },
      legendary: { tier2: 1, tier3: 1, tier4: 2 }
    }
  },

  // ------------------------------------------------------------
  // ⚡ STORM ADULT — ZEPHYRION
  // ------------------------------------------------------------
  {
    id: "STORM_ADULT_ZEPHYRION",
    name: "Zephyrion",
    faction: "STORM",

    baseStats: {
      hp: [950, 1100],
      atk: [65, 85],
      def: [30, 45],
      speed: [15, 20]
    },

    rarityMultipliers: {
      common: 1.00,
      rare: 1.07,
      epic: 1.14,
      legendary: 1.30
    },

    passives: {
      common: "+5% SPD",
      rare: "+10% SPD",
      epic: "+10% SPD, +5% crit rate",
      legendary: "+15% SPD, every 4th attack is guaranteed crit"
    },

    skillPool: [
      "LIGHTNING_FANG", "STATIC_CLAW", "WIND_FLURRY",
      "THUNDER_ARMOR", "SPEED_SURGE", "ELECTRO_CLEANSE",
      "CHAIN_LIGHTNING", "OVERLOAD_BLAST", "CRITICAL_STORM",
      "TEMPEST_RAGE","EYE_OF_THE_STORM","HEAVENS_WRATH"
    ],

    skillRollRules: {
      common:    { tier1: 2, tier2: 2 },
      rare:      { tier1: 1, tier2: 1, tier3: 2 },
      epic:      { tier1: 1, tier2: 1, tier3: 1, tier4: 1 },
      legendary: { tier2: 1, tier3: 1, tier4: 2 }
    }
  }

];
