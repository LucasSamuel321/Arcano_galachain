export const skillList = [
  // ---------------------------------------------------------------------
  // 🧊 FROST FACTION (12 skills)
  // ---------------------------------------------------------------------

  {
    id: "FROST_BITE",
    faction: "FROST",
    tier: 1,
    cooldown: 0,
    damage: { min: 40, max: 55 },
    status: { freeze: 0.2, freezeDuration: 1 },
    description: "Basic icy bite with 20% chance to Freeze for 1 turn."
  },

  {
    id: "COLD_SLASH",
    faction: "FROST",
    tier: 1,
    cooldown: 0,
    damage: { min: 45, max: 60 },
    status: { chill: 0.1, speedDown: 10, duration: 2 },
    description: "Cold slash that applies Chill (-10% SPD for 2 turns)."
  },

  {
    id: "GLACIAL_TOUCH",
    faction: "FROST",
    tier: 1,
    cooldown: 1,
    damage: { min: 30, max: 40 },
    heal: { percent: 5 },
    description: "Weak hit that restores 5% HP."
  },

  {
    id: "ICE_ARMOR",
    faction: "FROST",
    tier: 2,
    cooldown: 3,
    shield: { min: 120, max: 160 },
    status: { freezeResist: 10, duration: 2 },
    description: "Gain 120–160 shield and +10% Freeze resist for 2 turns."
  },

  {
    id: "FROST_NOVA",
    faction: "FROST",
    tier: 2,
    cooldown: 3,
    damage: { min: 50, max: 70 },
    status: { freeze: 0.4, freezeDuration: 1 },
    description: "Chilling burst with 40% chance to Freeze."
  },

  {
    id: "CRYSTAL_HEAL",
    faction: "FROST",
    tier: 2,
    cooldown: 3,
    heal: { percent: 18 },
    cleanse: 1,
    description: "Heal 18% HP and cleanse 1 debuff."
  },

  {
    id: "SHATTER_STRIKE",
    faction: "FROST",
    tier: 3,
    cooldown: 4,
    damage: { min: 110, max: 140 },
    bonusVsFrozen: 70,
    description: "Deals +70% bonus damage if target is Frozen."
  },

  {
    id: "ABSOLUTE_ZERO",
    faction: "FROST",
    tier: 3,
    cooldown: 4,
    damage: { min: 90, max: 110 },
    status: { freeze: 1.0, freezeDuration: 1 },
    description: "Guaranteed Freeze for 1 turn."
  },

  {
    id: "GLACIAL_WALL",
    faction: "FROST",
    tier: 3,
    cooldown: 4,
    shield: { min: 200, max: 260 },
    enemyAtkDown: { percent: 20, duration: 1 },
    description: "Massive shield and reduces enemy ATK by 20%."
  },

  {
    id: "ETERNAL_BLIZZARD",
    faction: "FROST",
    tier: 4,
    cooldown: 6,
    damage: { min: 130, max: 160 },
    status: { freeze: 0.6, chill: 0.5 },
    description: "Ultimate snowstorm with 60% Freeze and 50% Chill."
  },

  {
    id: "FROZEN_HEART",
    faction: "FROST",
    tier: 4,
    cooldown: 5,
    heal: { percent: 30 },
    shield: { min: 200, max: 200 },
    counterFreeze: { percent: 30, duration: 2 },
    description: "Heal, gain shield, and gain Freeze retaliation."
  },

  {
    id: "ICE_JUDGEMENT",
    faction: "FROST",
    tier: 4,
    cooldown: 6,
    damage: { min: 160, max: 200 },
    bonusVsFrozen: 100,
    description: "Massive strike with +100% dmg vs Frozen."
  },

  // ---------------------------------------------------------------------
  // 🔥 INFERNO FACTION (12 skills)
  // ---------------------------------------------------------------------

  {
    id: "EMBER_STRIKE",
    faction: "INFERNO",
    tier: 1,
    cooldown: 0,
    damage: { min: 40, max: 55 },
    status: { burn: 0.25, burnDuration: 2 },
    description: "Basic flaming hit with 25% Burn."
  },

  {
    id: "FIRE_CLAW",
    faction: "INFERNO",
    tier: 1,
    cooldown: 0,
    damage: { min: 50, max: 65 },
    buffSelf: { critRate: 10, duration: 1 },
    description: "Fiery claw that grants +10% crit this turn."
  },

  {
    id: "RED_HEAT",
    faction: "INFERNO",
    tier: 1,
    cooldown: 1,
    damage: { min: 30, max: 40 },
    buffSelf: { dmgUp: 20, duration: 1 },
    description: "Weak hit that boosts next skill by +20% dmg."
  },

  {
    id: "FLAME_ARMOR",
    faction: "INFERNO",
    tier: 2,
    cooldown: 3,
    shield: { min: 120, max: 160 },
    reflect: { percent: 30, duration: 2 },
    description: "Shield + 30% damage reflection."
  },

  {
    id: "BURNING_ROAR",
    faction: "INFERNO",
    tier: 2,
    cooldown: 3,
    damage: { min: 60, max: 80 },
    status: { burn: 1.0, burnDuration: 2 },
    description: "Guaranteed Burn."
  },

  {
    id: "INFERNO_HEAL",
    faction: "INFERNO",
    tier: 2,
    cooldown: 3,
    heal: { percent: 14 },
    cleanse: ["burn", "bleed"],
    description: "Heal 14% HP and cleanse burn/bleed."
  },

  {
    id: "LAVA_SLAM",
    faction: "INFERNO",
    tier: 3,
    cooldown: 4,
    damage: { min: 120, max: 150 },
    condition: { ifBurned: { stun: 1 } },
    description: "Huge hit that stuns if target is burned."
  },

  {
    id: "MOLTEN_BLAST",
    faction: "INFERNO",
    tier: 3,
    cooldown: 4,
    multihit: 2,
    damage: { min: 90, max: 110 },
    status: { burn: 0.4 },
    description: "Two burning blasts with 40% Burn each."
  },

  {
    id: "RAGE_OVERFLOW",
    faction: "INFERNO",
    tier: 3,
    cooldown: 4,
    buffSelf: { atkUp: 35, defDown: 10, duration: 2 },
    description: "High-risk buff: +35% ATK, -10% DEF."
  },

  {
    id: "APOCALYPSE",
    faction: "INFERNO",
    tier: 4,
    cooldown: 6,
    damage: { min: 170, max: 210 },
    status: { infernoBurn: true, burnDuration: 2 },
    description: "Apocalyptic strike applying double-DoT Inferno Burn."
  },

  {
    id: "HELLFIRE_CHAIN",
    faction: "INFERNO",
    tier: 4,
    cooldown: 6,
    multihit: 3,
    damage: { min: 60, max: 80 },
    status: { burn: 1.0 },
    description: "Three guaranteed burning hits."
  },

  {
    id: "PHOENIX_REBIRTH",
    faction: "INFERNO",
    tier: 4,
    cooldown: 5,
    heal: { percent: 35 },
    buffSelf: { critRate: 25, duration: 2 },
    description: "Self-resurgence: heal and gain crit."
  },

  // ---------------------------------------------------------------------
  // 🌿 NATURE FACTION (12 skills)
  // ---------------------------------------------------------------------

  {
    id: "NATURE_STRIKE",
    faction: "NATURE",
    tier: 1,
    cooldown: 0,
    damage: { min: 40, max: 55 },
    status: { poison: 0.2, duration: 2 },
    description: "Basic poisonous attack."
  },

  {
    id: "VINE_WHIP",
    faction: "NATURE",
    tier: 1,
    cooldown: 0,
    damage: { min: 45, max: 60 },
    debuffEnemy: { atkDown: 10, duration: 2 },
    description: "Whip attack that lowers enemy ATK."
  },

  {
    id: "SAP_HEAL",
    faction: "NATURE",
    tier: 1,
    cooldown: 1,
    heal: { percent: 8 },
    description: "Minor self-heal."
  },

  {
    id: "REGEN_BLOOM",
    faction: "NATURE",
    tier: 2,
    cooldown: 3,
    regen: { percent: 10, duration: 2 },
    description: "Regenerate 10% HP for 2 turns."
  },

  {
    id: "THORN_ARMOR",
    faction: "NATURE",
    tier: 2,
    cooldown: 3,
    shield: { min: 120, max: 150 },
    reflect: { percent: 50, duration: 2 },
    description: "Shield with high reflect."
  },

  {
    id: "NATURAL_CLEANSING",
    faction: "NATURE",
    tier: 2,
    cooldown: 3,
    cleanse: 2,
    heal: { percent: 10 },
    description: "Cleanse 2 debuffs and heal 10%."
  },

  {
    id: "POISON_BURST",
    faction: "NATURE",
    tier: 3,
    cooldown: 4,
    damage: { min: 80, max: 100 },
    status: { poison: 1.0, duration: 3 },
    description: "Guaranteed strong Poison."
  },

  {
    id: "OVERGROWTH",
    faction: "NATURE",
    tier: 3,
    cooldown: 4,
    buffSelf: { defUp: 20, healBoost: 10, duration: 2 },
    description: "DEF up and boosted healing."
  },

  {
    id: "ANCIENT_VINES",
    faction: "NATURE",
    tier: 3,
    cooldown: 4,
    damage: { min: 70, max: 90 },
    status: { root: 1 },
    description: "Root enemy for 1 turn."
  },

  {
    id: "FOREST_WRATH",
    faction: "NATURE",
    tier: 4,
    cooldown: 6,
    damage: { min: 120, max: 150 },
    status: { poison: 1.0, duration: 3 },
    healPerPoisonTick: 10,
    description: "Poison strike that heals you per tick."
  },

  {
    id: "NATURES_GRACE",
    faction: "NATURE",
    tier: 4,
    cooldown: 5,
    heal: { percent: 35 },
    buffSelf: { defUp: 20, duration: 2 },
    description: "Strong heal and DEF buff."
  },

  {
    id: "LIFE_OVERFLOW",
    faction: "NATURE",
    tier: 4,
    cooldown: 6,
    cleanse: 999,
    buffSelf: { atkUp: 20, duration: 3 },
    regen: { percent: 10, duration: 3 },
    description: "Cleanse all, ATK up, and regen."
  },

  // ---------------------------------------------------------------------
  // ⚡ STORM FACTION (12 skills)
  // ---------------------------------------------------------------------

  {
    id: "LIGHTNING_FANG",
    faction: "STORM",
    tier: 1,
    cooldown: 0,
    damage: { min: 45, max: 60 },
    status: { shock: 0.2, duration: 1 },
    description: "Basic hit with 20% Shock."
  },

  {
    id: "STATIC_CLAW",
    faction: "STORM",
    tier: 1,
    cooldown: 0,
    damage: { min: 40, max: 55 },
    buffSelf: { speedUp: 10, duration: 1 },
    description: "Static charge that boosts SPD."
  },

  {
    id: "WIND_FLURRY",
    faction: "STORM",
    tier: 1,
    cooldown: 1,
    damage: { min: 35, max: 50 },
    buffSelf: { dodgeUp: 10, duration: 1 },
    description: "Fast slice that increases dodge."
  },

  {
    id: "THUNDER_ARMOR",
    faction: "STORM",
    tier: 2,
    cooldown: 3,
    shield: { min: 100, max: 130 },
    counterShock: { percent: 20, duration: 2 },
    description: "Shield with Shock counter."
  },

  {
    id: "SPEED_SURGE",
    faction: "STORM",
    tier: 2,
    cooldown: 3,
    buffSelf: { speedUp: 30, duration: 2 },
    description: "Big SPD buff."
  },

  {
    id: "ELECTRO_CLEANSE",
    faction: "STORM",
    tier: 2,
    cooldown: 3,
    cleanse: 1,
    buffSelf: { critRate: 10, duration: 2 },
    description: "Cleanse + crit boost."
  },

  {
    id: "CHAIN_LIGHTNING",
    faction: "STORM",
    tier: 3,
    cooldown: 4,
    multihit: 3,
    damage: { min: 50, max: 70 },
    status: { shock: 0.2, duration: 1 },
    description: "3 fast lightning hits with shock chance."
  },

  {
    id: "OVERLOAD_BLAST",
    faction: "STORM",
    tier: 3,
    cooldown: 4,
    damage: { min: 130, max: 160 },
    selfStun: 1,
    description: "High dmg but stuns yourself."
  },

  {
    id: "CRITICAL_STORM",
    faction: "STORM",
    tier: 3,
    cooldown: 4,
    buffSelf: { critRate: 40, duration: 1, nextAttackBonus: 50 },
    description: "Massive crit boost and next attack deals +50% dmg."
  },

  {
    id: "TEMPEST_RAGE",
    faction: "STORM",
    tier: 4,
    cooldown: 6,
    multihit: 4,
    damage: { min: 90, max: 120 },
    buffSelf: { critRatePerHit: 10 },
    description: "4 hits, each increasing crit rate."
  },

  {
    id: "EYE_OF_THE_STORM",
    faction: "STORM",
    tier: 4,
    cooldown: 5,
    buffSelf: { dodgeUp: 40, duration: 2 },
    counterShock: { percent: 20, duration: 2 },
    description: "Become almost untouchable with shock retaliation."
  },

  {
    id: "HEAVENS_WRATH",
    faction: "STORM",
    tier: 4,
    cooldown: 6,
    damage: { min: 160, max: 200 },
    buffSelf: { critDmgUp: 20, duration: 2 },
    description: "Heavenly strike empowering crit damage."
  }
];
