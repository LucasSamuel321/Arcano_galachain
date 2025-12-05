// src/pages/Battle.jsx

import { useEffect, useMemo, useState } from "react";

// ----------------- SIMPLE CONSTANTS -----------------
const MAX_ENERGY = 3;

const MAPS = [
  {
    id: 1,
    name: "Frost Cavern",
    thumb: "/images/maps/frost.png",
    arena: "/videos/arena/arcano-winter.mp4",
  },
  {
    id: 2,
    name: "Inferno Depths",
    thumb: "/images/maps/fire.png",
    arena: "/videos/arena/arcano-winter.mp4",
  },
  {
    id: 3,
    name: "Nature Grove",
    thumb: "/images/maps/nature.png",
    arena: "/videos/arena/arcano-winter.mp4",
  },
  {
    id: 4,
    name: "Storm Nexus",
    thumb: "/images/maps/storm.png",
    arena: "/videos/arena/arcano-winter.mp4",
  },
];

// ------- SAMPLE CREATURE DATA (TEMP, FOR GAMEPLAY DUMMY) -------
// In final version, these will come from GameContext / backend.

const PLAYER_MAIN_TEAM_PRESET = [
  {
    id: "P1",
    name: "Frostfang Wolf",
    faction: "Frost",
    role: "Bruiser",
    stage: "Adult",
    maxHp: 280,
    baseShield: 40,
    attack: 32,
    defense: 10,
    speed: 12,
    skills: [
      {
        id: "p1_claw",
        name: "Crystal Claw",
        type: "damage",
        power: 32,
        energyCost: 1,
        cooldown: 1,
        description: "Slash a single enemy with crystal claws.",
      },
      {
        id: "p1_howl",
        name: "Frost Howl",
        type: "buffAttack",
        power: 0,
        energyCost: 1,
        cooldown: 3,
        description: "Increase own attack for 2 turns.",
      },
      {
        id: "p1_barrier",
        name: "Ice Barrier",
        type: "shield",
        power: 40,
        energyCost: 1,
        cooldown: 3,
        description: "Create a frost shield around yourself.",
      },
      {
        id: "p1_ult",
        name: "Absolute Zero",
        type: "bigDamage",
        power: 70,
        energyCost: 3,
        cooldown: 4,
        description: "Massive blast of frozen air.",
      },
    ],
  },
  {
    id: "P2",
    name: "Snowdrift Stag",
    faction: "Frost",
    role: "Support",
    stage: "Adult",
    maxHp: 320,
    baseShield: 30,
    attack: 22,
    defense: 14,
    speed: 10,
    skills: [
      {
        id: "p2_horn",
        name: "Crystal Horn",
        type: "damage",
        power: 26,
        energyCost: 1,
        cooldown: 1,
        description: "Ram the enemy with icy antlers.",
      },
      {
        id: "p2_heal",
        name: "Winter Blessing",
        type: "regen",
        power: 24,
        energyCost: 1,
        cooldown: 3,
        description: "Apply regeneration to your team for 2 turns.",
      },
      {
        id: "p2_aegis",
        name: "Glacial Aegis",
        type: "teamShield",
        power: 30,
        energyCost: 2,
        cooldown: 4,
        description: "Add shield to all allies.",
      },
      {
        id: "p2_ult",
        name: "Aurora Veil",
        type: "buffDefense",
        power: 0,
        energyCost: 3,
        cooldown: 4,
        description: "Big defense buff for your team.",
      },
    ],
  },
  {
    id: "P3",
    name: "Cryo Owl",
    faction: "Frost",
    role: "Control",
    stage: "Adult",
    maxHp: 240,
    baseShield: 20,
    attack: 30,
    defense: 8,
    speed: 16,
    skills: [
      {
        id: "p3_bolt",
        name: "Ice Bolt",
        type: "damage",
        power: 30,
        energyCost: 1,
        cooldown: 1,
        description: "Precise icy projectile.",
      },
      {
        id: "p3_chill",
        name: "Deep Chill",
        type: "softControl",
        power: 18,
        energyCost: 1,
        cooldown: 3,
        description: "Apply minor slow & damage.",
      },
      {
        id: "p3_focus",
        name: "Glacial Focus",
        type: "buffSpeed",
        power: 0,
        energyCost: 1,
        cooldown: 3,
        description: "Increase speed for 2 turns.",
      },
      {
        id: "p3_ult",
        name: "Polar Storm",
        type: "aoe",
        power: 40,
        energyCost: 3,
        cooldown: 4,
        description: "Hit all enemies with frost storm.",
      },
    ],
  },
];

const ENEMY_MAIN_TEAM_PRESET = [
  {
    id: "E1",
    name: "Emberdrake",
    faction: "Inferno",
    role: "Bruiser",
    stage: "Adult",
    maxHp: 270,
    baseShield: 35,
    attack: 34,
    defense: 9,
    speed: 11,
    skills: [
      {
        id: "e1_bite",
        name: "Flame Bite",
        type: "damage",
        power: 32,
        energyCost: 1,
        cooldown: 1,
        description: "Fiery bite attack.",
      },
      {
        id: "e1_flame",
        name: "Flame Burst",
        type: "burn",
        power: 20,
        energyCost: 1,
        cooldown: 3,
        description: "Apply burn over time.",
      },
      {
        id: "e1_harden",
        name: "Lava Scales",
        type: "buffDefense",
        power: 0,
        energyCost: 1,
        cooldown: 3,
        description: "Raise defense for a few turns.",
      },
      {
        id: "e1_eruption",
        name: "Eruption",
        type: "aoe",
        power: 42,
        energyCost: 3,
        cooldown: 4,
        description: "Lava eruption hitting all enemies.",
      },
    ],
  },
  {
    id: "E2",
    name: "Cinder Lynx",
    faction: "Inferno",
    role: "DPS",
    stage: "Adult",
    maxHp: 230,
    baseShield: 20,
    attack: 36,
    defense: 7,
    speed: 15,
    skills: [
      {
        id: "e2_slash",
        name: "Ember Slash",
        type: "damage",
        power: 34,
        energyCost: 1,
        cooldown: 1,
        description: "Fast cutting slash.",
      },
      {
        id: "e2_fury",
        name: "Inferno Fury",
        type: "buffAttack",
        power: 0,
        energyCost: 1,
        cooldown: 3,
        description: "Increase attack for 2 turns.",
      },
      {
        id: "e2_dash",
        name: "Blazing Dash",
        type: "softControl",
        power: 18,
        energyCost: 1,
        cooldown: 2,
        description: "Damage + small slow.",
      },
      {
        id: "e2_ult",
        name: "Hellfire Strike",
        type: "bigDamage",
        power: 72,
        energyCost: 3,
        cooldown: 4,
        description: "Massive strike of hellfire.",
      },
    ],
  },
  {
    id: "E3",
    name: "Ash Serpent",
    faction: "Inferno",
    role: "Hybrid",
    stage: "Adult",
    maxHp: 260,
    baseShield: 25,
    attack: 28,
    defense: 11,
    speed: 13,
    skills: [
      {
        id: "e3_whip",
        name: "Ash Whip",
        type: "damage",
        power: 28,
        energyCost: 1,
        cooldown: 1,
        description: "Whipping attack of charred tail.",
      },
      {
        id: "e3_smoke",
        name: "Smoke Veil",
        type: "buffSpeed",
        power: 0,
        energyCost: 1,
        cooldown: 3,
        description: "Increase speed for 2 turns.",
      },
      {
        id: "e3_scorch",
        name: "Scorching Coils",
        type: "burn",
        power: 22,
        energyCost: 1,
        cooldown: 3,
        description: "Applies burn over time.",
      },
      {
        id: "e3_ult",
        name: "Ashfall",
        type: "aoe",
        power: 36,
        energyCost: 3,
        cooldown: 4,
        description: "Ash storm damaging all enemies.",
      },
    ],
  },
];

const PLAYER_SUPPORT_PRESET = [
  {
    id: "SP1",
    name: "Frost Pup",
    stage: "Baby",
    faction: "Frost",
    rarity: "Rare",
    passiveType: "freezeChance",
    passiveValue: 2, // +2% freeze chance
  },
  {
    id: "SP2",
    name: "Storm Hatchling",
    stage: "Young",
    faction: "Storm",
    rarity: "Epic",
    passiveType: "speedPercent",
    passiveValue: 3, // +3% speed
  },
];

const ENEMY_SUPPORT_PRESET = [
  {
    id: "SE1",
    name: "Ember Cub",
    stage: "Baby",
    faction: "Inferno",
    rarity: "Rare",
    passiveType: "burnDamage",
    passiveValue: 2,
  },
  {
    id: "SE2",
    name: "Lava Sprout",
    stage: "Young",
    faction: "Inferno",
    rarity: "Epic",
    passiveType: "attackPercent",
    passiveValue: 3,
  },
];

// Utility to apply rarity multipliers etc. if needed later
const getRarityMultiplier = (rarity) => {
  switch (rarity) {
    case "Legendary":
      return 2.0;
    case "Epic":
      return 1.5;
    case "Rare":
      return 1.2;
    default:
      return 1.0;
  }
};

function createBattleCreature(base) {
  return {
    ...base,
    hp: base.maxHp,
    shield: base.baseShield || 0,
    buffs: [], // {id, type, duration}
    debuffs: [], // future use
    cooldowns: {}, // {skillId: remainingTurns}
  };
}

// ------------- SUPPORT BOOST CALCULATION -------------
function calculateSupportBoosts(supportSlots) {
  const boosts = {
    hpPercent: 0,
    attackPercent: 0,
    defensePercent: 0,
    speedPercent: 0,
    regenFlat: 0,
    shieldPerTurn: 0,
    freezeChance: 0,
    burnDamage: 0,
  };

  supportSlots.forEach((s) => {
    if (!s) return;
    const rarityMult = getRarityMultiplier(s.rarity);
    const stageMult = s.stage === "Baby" ? 1 : 2;

    const value = s.passiveValue * rarityMult * stageMult;

    switch (s.passiveType) {
      case "hpPercent":
        boosts.hpPercent += value;
        break;
      case "attackPercent":
        boosts.attackPercent += value;
        break;
      case "defensePercent":
        boosts.defensePercent += value;
        break;
      case "speedPercent":
        boosts.speedPercent += value;
        break;
      case "regen":
        boosts.regenFlat += value;
        break;
      case "shieldPerTurn":
        boosts.shieldPerTurn += value;
        break;
      case "freezeChance":
        boosts.freezeChance += value;
        break;
      case "burnDamage":
        boosts.burnDamage += value;
        break;
      default:
        break;
    }
  });

  return boosts;
}

// ----------------- MAIN COMPONENT -----------------

export default function Battle() {
  // PHASES: choosing → reveal → arena → fight → result
  const [phase, setPhase] = useState("choosing");
  const [spinIndex, setSpinIndex] = useState(0);
  const [selectedMap, setSelectedMap] = useState(null);
  const [arenaVideo, setArenaVideo] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [videoReady, setVideoReady] = useState(false);

  const [playerTeam, setPlayerTeam] = useState(() =>
    PLAYER_MAIN_TEAM_PRESET.map(createBattleCreature)
  );
  const [enemyTeam, setEnemyTeam] = useState(() =>
    ENEMY_MAIN_TEAM_PRESET.map(createBattleCreature)
  );
  const [playerSupport, setPlayerSupport] = useState(PLAYER_SUPPORT_PRESET);
  const [enemySupport, setEnemySupport] = useState(ENEMY_SUPPORT_PRESET);

  const [activePlayerIndex, setActivePlayerIndex] = useState(0); // 0–2
  const [activeEnemyIndex, setActiveEnemyIndex] = useState(0);

  const [turn, setTurn] = useState("player"); // "player" | "enemy"
  const [playerEnergy, setPlayerEnergy] = useState(1);
  const [enemyEnergy, setEnemyEnergy] = useState(1);

  const [floatTexts, setFloatTexts] = useState([]); // {id, side, value, type}
  const [result, setResult] = useState(null); // { winner: "player" | "enemy" | "draw" }

  // Support boosts
  const playerBoosts = useMemo(
    () => calculateSupportBoosts(playerSupport),
    [playerSupport]
  );
  const enemyBoosts = useMemo(
    () => calculateSupportBoosts(enemySupport),
    [enemySupport]
  );

  const getSlot = (offset) =>
    MAPS[(spinIndex + offset + MAPS.length) % MAPS.length];

  // ---------------- SPIN MACHINE (fixed stop) ----------------
  useEffect(() => {
    if (phase !== "choosing") return;

    const spinDuration = 2600; // total ms
    const stepInterval = 70; // speed of scrolling
    let localIndex = spinIndex;

    const interval = setInterval(() => {
      localIndex = (localIndex + 1) % MAPS.length;
      setSpinIndex(localIndex);
    }, stepInterval);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      const centerIndex = (localIndex + 2) % MAPS.length;
      const chosen = MAPS[centerIndex];
      setSelectedMap(chosen);
      setPhase("reveal");
    }, spinDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase]);

  // ----------- REVEAL → ARENA → COUNTDOWN → FIGHT -----------
  useEffect(() => {
    if (phase === "reveal" && selectedMap) {
      const t = setTimeout(() => {
        setArenaVideo(selectedMap.arena);
        setPhase("arena");
        setCountdown(6);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [phase, selectedMap]);

  useEffect(() => {
    if (phase !== "arena") return;
    if (!arenaVideo) return;

    const t = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          setPhase("fight");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [phase, arenaVideo]);

  // ------------- FLOATING DAMAGE UTILITY -------------
  const addFloatText = (side, value, kind = "damage") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const entry = { id, side, value, kind };
    setFloatTexts((prev) => [...prev, entry]);

    setTimeout(() => {
      setFloatTexts((prev) => prev.filter((t) => t.id !== id));
    }, 900);
  };

  // ------------- HELPERS FOR CREATURES -------------
  const getAliveMainCreatures = (team) =>
    team.filter((c) => c.hp > 0 && c.stage === "Adult");

  const getActiveCreature = (team, index) => {
    if (!team[index] || team[index].hp <= 0) {
      // fallback to first alive
      const aliveIndex = team.findIndex((c) => c.hp > 0);
      if (aliveIndex === -1) return null;
      return team[aliveIndex];
    }
    return team[index];
  };

  const updateTeamCreature = (teamSetter) => (creatureId, updater) => {
    teamSetter((prev) =>
      prev.map((c) => (c.id === creatureId ? updater(c) : c))
    );
  };

  const updatePlayerCreature = updateTeamCreature(setPlayerTeam);
  const updateEnemyCreature = updateTeamCreature(setEnemyTeam);

  const checkBattleEnd = (newPlayerTeam, newEnemyTeam) => {
    const playerAlive = getAliveMainCreatures(newPlayerTeam).length;
    const enemyAlive = getAliveMainCreatures(newEnemyTeam).length;

    if (playerAlive <= 0 && enemyAlive <= 0) {
      setResult({ winner: "draw" });
      setPhase("result");
      return true;
    }
    if (playerAlive <= 0) {
      setResult({ winner: "enemy" });
      setPhase("result");
      return true;
    }
    if (enemyAlive <= 0) {
      setResult({ winner: "player" });
      setPhase("result");
      return true;
    }
    return false;
  };

  // -------- TURN START: ENERGY, COOLDOWNS, PASSIVE EFFECTS --------
  const handleTurnStart = (side) => {
    if (side === "player") {
      setPlayerEnergy((prev) => Math.min(MAX_ENERGY, prev + 1));
      // decrement cooldowns
      setPlayerTeam((prev) =>
        prev.map((c) => {
          const newCooldowns = {};
          Object.entries(c.cooldowns || {}).forEach(([skillId, cd]) => {
            const nxt = cd > 0 ? cd - 1 : 0;
            if (nxt > 0) newCooldowns[skillId] = nxt;
          });
          // simple regen from support boosts
          let hp = c.hp;
          if (playerBoosts.regenFlat && c.hp > 0) {
            hp = Math.min(c.maxHp, hp + playerBoosts.regenFlat);
          }
          // shield per turn
          let shield = c.shield;
          if (playerBoosts.shieldPerTurn && c.hp > 0) {
            shield = shield + playerBoosts.shieldPerTurn;
          }
          return {
            ...c,
            hp,
            shield,
            cooldowns: newCooldowns,
          };
        })
      );
    } else {
      setEnemyEnergy((prev) => Math.min(MAX_ENERGY, prev + 1));
      setEnemyTeam((prev) =>
        prev.map((c) => {
          const newCooldowns = {};
          Object.entries(c.cooldowns || {}).forEach(([skillId, cd]) => {
            const nxt = cd > 0 ? cd - 1 : 0;
            if (nxt > 0) newCooldowns[skillId] = nxt;
          });
          let hp = c.hp;
          if (enemyBoosts.regenFlat && c.hp > 0) {
            hp = Math.min(c.maxHp, hp + enemyBoosts.regenFlat);
          }
          let shield = c.shield;
          if (enemyBoosts.shieldPerTurn && c.hp > 0) {
            shield = shield + enemyBoosts.shieldPerTurn;
          }
          return {
            ...c,
            hp,
            shield,
            cooldowns: newCooldowns,
          };
        })
      );
    }
  };

  useEffect(() => {
    if (phase !== "fight") return;
    handleTurnStart(turn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, turn]);

  // ------------- DAMAGE & SKILL RESOLUTION -------------
  const applyDamage = (targetSide, targetId, amount, extra = {}) => {
    if (targetSide === "enemy") {
      setEnemyTeam((prev) => {
        const updated = prev.map((c) => {
          if (c.id !== targetId || c.hp <= 0) return c;
          let shield = c.shield;
          let hp = c.hp;
          let remaining = amount;

          if (shield > 0 && remaining > 0) {
            const used = Math.min(shield, remaining);
            shield -= used;
            remaining -= used;
          }
          if (remaining > 0) {
            hp = Math.max(0, hp - remaining);
          }
          return { ...c, shield, hp };
        });
        checkBattleEnd(playerTeam, updated);
        return updated;
      });
    } else {
      setPlayerTeam((prev) => {
        const updated = prev.map((c) => {
          if (c.id !== targetId || c.hp <= 0) return c;
          let shield = c.shield;
          let hp = c.hp;
          let remaining = amount;

          if (shield > 0 && remaining > 0) {
            const used = Math.min(shield, remaining);
            shield -= used;
            remaining -= used;
          }
          if (remaining > 0) {
            hp = Math.max(0, hp - remaining);
          }
          return { ...c, shield, hp };
        });
        checkBattleEnd(updated, enemyTeam);
        return updated;
      });
    }
  };

  const endTurn = () => {
    setTurn((prev) => (prev === "player" ? "enemy" : "player"));
  };

  const handlePlayerSkillClick = (skill) => {
    if (phase !== "fight") return;
    if (turn !== "player") return;

    const active = getActiveCreature(playerTeam, activePlayerIndex);
    const enemyActive = getActiveCreature(enemyTeam, activeEnemyIndex);
    if (!active || !enemyActive) return;

    const cooldowns = active.cooldowns || {};
    if (cooldowns[skill.id] && cooldowns[skill.id] > 0) return;

    if (playerEnergy < skill.energyCost) return;

    // Basic attack & buff logic
    if (skill.type === "damage" || skill.type === "bigDamage") {
      // compute actual damage
      const base = skill.power;
      const atkMult = 1 + (playerBoosts.attackPercent || 0) / 100;
      const dmg = Math.round(base * atkMult);
      applyDamage("enemy", enemyActive.id, dmg);
      addFloatText("right", `-${dmg}`, "damage");
    } else if (skill.type === "aoe") {
      const base = skill.power;
      const atkMult = 1 + (playerBoosts.attackPercent || 0) / 100;
      const dmg = Math.round(base * atkMult);
      setEnemyTeam((prev) => {
        const updated = prev.map((c) => {
          if (c.hp <= 0) return c;
          let shield = c.shield;
          let hp = c.hp;
          let remaining = dmg;
          if (shield > 0) {
            const used = Math.min(shield, remaining);
            shield -= used;
            remaining -= used;
          }
          if (remaining > 0) {
            hp = Math.max(0, hp - remaining);
          }
          return { ...c, shield, hp };
        });
        checkBattleEnd(playerTeam, updated);
        return updated;
      });
      addFloatText("right", `-${dmg} AoE`, "damage");
    } else if (skill.type === "buffAttack") {
      updatePlayerCreature(active.id, (c) => ({
        ...c,
        buffs: [...c.buffs, { id: `atk-${Date.now()}`, type: "attackUp", duration: 2 }],
      }));
      addFloatText("left", "ATK↑", "buff");
    } else if (skill.type === "buffDefense") {
      setPlayerTeam((prev) =>
        prev.map((c) => {
          if (c.hp <= 0) return c;
          return {
            ...c,
            buffs: [...(c.buffs || []), { id: `def-${Date.now()}`, type: "defenseUp", duration: 3 }],
          };
        })
      );
      addFloatText("left", "DEF↑", "buff");
    } else if (skill.type === "buffSpeed") {
      updatePlayerCreature(active.id, (c) => ({
        ...c,
        buffs: [...(c.buffs || []), { id: `spd-${Date.now()}`, type: "speedUp", duration: 2 }],
      }));
      addFloatText("left", "SPD↑", "buff");
    } else if (skill.type === "shield") {
      updatePlayerCreature(active.id, (c) => ({
        ...c,
        shield: c.shield + skill.power,
      }));
      addFloatText("left", `+${skill.power} SH`, "shield");
    } else if (skill.type === "teamShield") {
      setPlayerTeam((prev) =>
        prev.map((c) => {
          if (c.hp <= 0) return c;
          return { ...c, shield: c.shield + skill.power };
        })
      );
      addFloatText("left", "Team SHIELD", "shield");
    } else if (skill.type === "regen") {
      setPlayerTeam((prev) =>
        prev.map((c) => {
          if (c.hp <= 0) return c;
          return {
            ...c,
            buffs: [...(c.buffs || []), { id: `regen-${Date.now()}`, type: "regen", duration: 2 }],
          };
        })
      );
      addFloatText("left", "Regen", "heal");
    }

    // Set cooldown on the used skill
    setPlayerTeam((prev) =>
      prev.map((c) => {
        if (c.id !== active.id) return c;
        const newCooldowns = { ...(c.cooldowns || {}) };
        if (skill.cooldown > 0) newCooldowns[skill.id] = skill.cooldown + 1; // +1 so after next turn it counts down
        return { ...c, cooldowns: newCooldowns };
      })
    );

    setPlayerEnergy((prev) => prev - skill.energyCost);

    // End turn after skill
    setTimeout(() => {
      endTurn();
    }, 350);
  };

  // ------------- ENEMY AI TURN -------------
  const enemyTurn = () => {
    const active = getActiveCreature(enemyTeam, activeEnemyIndex);
    const target = getActiveCreature(playerTeam, activePlayerIndex);
    if (!active || !target) {
      endTurn();
      return;
    }

    const availableSkills = active.skills.filter((s) => {
      const cd = active.cooldowns?.[s.id] || 0;
      const enoughEnergy = enemyEnergy >= s.energyCost;
      return cd <= 0 && enoughEnergy;
    });

    if (!availableSkills.length) {
      // basic auto-attack fallback
      const dmg = 24;
      applyDamage("player", target.id, dmg);
      addFloatText("left", `-${dmg}`, "damage");
    } else {
      const skill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
      // extremely simplified AI resolution, similar to player:
      if (skill.type === "damage" || skill.type === "bigDamage") {
        const base = skill.power;
        const atkMult = 1 + (enemyBoosts.attackPercent || 0) / 100;
        const dmg = Math.round(base * atkMult);
        applyDamage("player", target.id, dmg);
        addFloatText("left", `-${dmg}`, "damage");
      } else if (skill.type === "aoe") {
        const base = skill.power;
        const atkMult = 1 + (enemyBoosts.attackPercent || 0) / 100;
        const dmg = Math.round(base * atkMult);
        setPlayerTeam((prev) => {
          const updated = prev.map((c) => {
            if (c.hp <= 0) return c;
            let shield = c.shield;
            let hp = c.hp;
            let remaining = dmg;
            if (shield > 0) {
              const used = Math.min(shield, remaining);
              shield -= used;
              remaining -= used;
            }
            if (remaining > 0) {
              hp = Math.max(0, hp - remaining);
            }
            return { ...c, shield, hp };
          });
          checkBattleEnd(updated, enemyTeam);
          return updated;
        });
        addFloatText("left", `-${dmg} AoE`, "damage");
      } else if (skill.type === "buffAttack") {
        updateEnemyCreature(active.id, (c) => ({
          ...c,
          buffs: [...(c.buffs || []), { id: `e-atk-${Date.now()}`, type: "attackUp", duration: 2 }],
        }));
        addFloatText("right", "ATK↑", "buff");
      } else if (skill.type === "buffDefense") {
        setEnemyTeam((prev) =>
          prev.map((c) => {
            if (c.hp <= 0) return c;
            return {
              ...c,
              buffs: [...(c.buffs || []), { id: `e-def-${Date.now()}`, type: "defenseUp", duration: 2 }],
            };
          })
        );
        addFloatText("right", "DEF↑", "buff");
      } else if (skill.type === "buffSpeed") {
        updateEnemyCreature(active.id, (c) => ({
          ...c,
          buffs: [...(c.buffs || []), { id: `e-spd-${Date.now()}`, type: "speedUp", duration: 2 }],
        }));
        addFloatText("right", "SPD↑", "buff");
      } else if (skill.type === "shield") {
        updateEnemyCreature(active.id, (c) => ({
          ...c,
          shield: c.shield + skill.power,
        }));
        addFloatText("right", `+${skill.power} SH`, "shield");
      } else if (skill.type === "teamShield") {
        setEnemyTeam((prev) =>
          prev.map((c) => {
            if (c.hp <= 0) return c;
            return { ...c, shield: c.shield + skill.power };
          })
        );
        addFloatText("right", "Team SHIELD", "shield");
      } else if (skill.type === "regen") {
        setEnemyTeam((prev) =>
          prev.map((c) => {
            if (c.hp <= 0) return c;
            return {
              ...c,
              buffs: [...(c.buffs || []), { id: `e-reg-${Date.now()}`, type: "regen", duration: 2 }],
            };
          })
        );
        addFloatText("right", "Regen", "heal");
      }

      // set cooldown
      setEnemyTeam((prev) =>
        prev.map((c) => {
          if (c.id !== active.id) return c;
          const newCooldowns = { ...(c.cooldowns || {}) };
          if (skill.cooldown > 0) newCooldowns[skill.id] = skill.cooldown + 1;
          return { ...c, cooldowns: newCooldowns };
        })
      );
      setEnemyEnergy((prev) => prev - skill.energyCost);
    }

    setTimeout(() => {
      endTurn();
    }, 400);
  };

  useEffect(() => {
    if (phase !== "fight") return;
    if (result) return;
    if (turn === "enemy") {
      const t = setTimeout(() => {
        enemyTurn();
      }, 600);
      return () => clearTimeout(t);
    }
  }, [phase, turn, result, enemyTeam, playerTeam]);

  // ------------ SWITCH ACTIVE CREATURE (PLAYER) ------------
  const handleSwitchActive = (index) => {
    if (turn !== "player" || phase !== "fight") return;
    const creature = playerTeam[index];
    if (!creature || creature.hp <= 0) return;
    if (index === activePlayerIndex) return;
    // switching costs 1 energy
    if (playerEnergy < 1) return;

    setActivePlayerIndex(index);
    setPlayerEnergy((prev) => prev - 1);
    addFloatText("left", "SWAP", "buff");
    setTimeout(() => {
      endTurn();
    }, 300);
  };

  // ------------ VISUAL HELPERS ------------
  const getCreatureBuffClasses = (creature) => {
    const buffs = creature?.buffs || [];
    const hasShield = (creature?.shield || 0) > 0;
    const classes = [];

    if (hasShield) classes.push("buff-shield-glow");
    if (buffs.some((b) => b.type === "attackUp")) classes.push("buff-attack-glow");
    if (buffs.some((b) => b.type === "speedUp")) classes.push("buff-speed-glow");
    if (buffs.some((b) => b.type === "regen")) classes.push("buff-heal-glow");

    return classes.join(" ");
  };

  const getSkillState = (creature, skill, energy, isPlayer) => {
    if (!creature) return { disabled: true, reason: "No creature" };
    const cd = creature.cooldowns?.[skill.id] || 0;
    if (cd > 0) return { disabled: true, reason: `CD ${cd}` };
    if (energy < skill.energyCost) return { disabled: true, reason: "No energy" };
    if (creature.hp <= 0) return { disabled: true, reason: "Dead" };
    if (!isPlayer) return { disabled: true, reason: "Not your turn" };
    if (turn !== "player" || phase !== "fight") return { disabled: true, reason: "Not your turn" };
    return { disabled: false, reason: "" };
  };

  // ------------ RENDER  ------------

  const activePlayer = getActiveCreature(playerTeam, activePlayerIndex);
  const activeEnemy = getActiveCreature(enemyTeam, activeEnemyIndex);

  const renderHpBar = (creature) => {
    if (!creature) return null;
    const hpPercent = Math.max(0, (creature.hp / creature.maxHp) * 100);
    const shield = creature.shield || 0;

    return (
      <div className="w-full space-y-1">
        <div className="flex justify-between text-[10px] text-gray-200">
          <span className="font-semibold uppercase tracking-wide">
            {creature.name}
          </span>
          <span>
            {creature.hp}/{creature.maxHp} HP
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-cyan-300"
            style={{ width: `${hpPercent}%` }}
          />
        </div>
        {shield > 0 && (
          <div className="h-1.5 w-full rounded-full bg-sky-900/60 overflow-hidden">
            <div
              className="h-full bg-cyan-300/90"
              style={{ width: `${Math.min(100, (shield / 100) * 100)}%` }}
            />
          </div>
        )}
      </div>
    );
  };

  const renderSupportSlot = (support, sideLabel) => {
    if (!support) {
      return (
        <div className="h-16 w-16 rounded-xl border border-dashed border-slate-500/40 bg-black/40 flex items-center justify-center text-[10px] text-slate-400">
          Empty
        </div>
      );
    }

    return (
      <div className="h-16 w-16 rounded-xl border border-slate-500/80 bg-gradient-to-br from-slate-900/90 to-sky-900/60 flex flex-col items-center justify-center text-[10px] text-slate-100 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
        <div className="font-semibold">{support.name}</div>
        <div className="text-[9px] text-cyan-200">
          {support.stage} • {support.faction}
        </div>
        <div className="text-[8px] text-sky-300 mt-1">
          +{support.passiveValue}% {support.passiveType}
        </div>
      </div>
    );
  };

  const renderCreaturePortrait = (creature, isActive, isEnemy, index, canSwitch) => {
    if (!creature) {
      return (
        <div className="h-24 w-24 rounded-2xl border border-dashed border-slate-600/60 bg-black/40 flex items-center justify-center text-[10px] text-slate-400">
          Empty
        </div>
      );
    }

    const dead = creature.hp <= 0;
    const buffClasses = getCreatureBuffClasses(creature);

    return (
      <button
        type="button"
        disabled={dead || !canSwitch}
        onClick={() => {
          if (!isEnemy) handleSwitchActive(index);
        }}
        className={`relative h-24 w-24 rounded-2xl border ${
          dead
            ? "border-red-800/80 bg-red-950/70 opacity-60"
            : isActive
            ? "border-cyan-400 bg-slate-900/90"
            : "border-slate-600/70 bg-slate-900/70"
        } flex flex-col items-center justify-center overflow-hidden transition-transform duration-200 ${
          isActive && !dead ? "scale-105 shadow-[0_0_35px_rgba(34,211,238,0.5)]" : ""
        } ${buffClasses}`}
      >
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
            dead ? "opacity-60 grayscale" : ""
          }`}
        />
        <div className="relative z-10 flex flex-col items-center px-2">
          <div className="text-[10px] uppercase tracking-wide text-slate-200">
            {creature.role}
          </div>
          <div className="text-[11px] font-semibold text-sky-100 text-center">
            {creature.name}
          </div>
          <div className="mt-1 text-[9px] text-slate-300">
            {creature.faction}
          </div>
          <div className="mt-1 text-[9px] text-emerald-300">
            {creature.hp}/{creature.maxHp}
          </div>
        </div>
        {dead && (
          <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center text-[10px] text-red-100 font-bold">
            K.O.
          </div>
        )}
        {isActive && !dead && (
          <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-cyan-400/80 animate-pulse" />
        )}
      </button>
    );
  };

  const renderSkillBar = () => {
    if (!activePlayer || phase !== "fight") return null;
    const skills = activePlayer.skills || [];

    return (
      <div className="mt-4 w-full max-w-3xl mx-auto rounded-2xl bg-black/70 border border-cyan-500/30 px-4 py-3 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.35)] animate-fadeInUI">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-300">
            Active: <span className="text-cyan-300">{activePlayer.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <span>Energy:</span>
            <div className="flex gap-1">
              {Array.from({ length: MAX_ENERGY }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < playerEnergy ? "bg-cyan-400" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {skills.map((skill) => {
            const { disabled } = getSkillState(
              activePlayer,
              skill,
              playerEnergy,
              true
            );
            const cd = activePlayer.cooldowns?.[skill.id] || 0;

            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => handlePlayerSkillClick(skill)}
                disabled={disabled}
                className={`relative rounded-xl border px-2 py-2 text-left text-[11px] md:text-xs transition-all ${
                  disabled
                    ? "border-slate-700 bg-slate-900/70 text-slate-500 cursor-not-allowed"
                    : "border-cyan-400/60 bg-gradient-to-br from-slate-900 to-sky-900/70 text-sky-50 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold truncate">{skill.name}</span>
                    <span className="text-[9px] text-cyan-200">
                      E:{skill.energyCost}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 line-clamp-2">
                    {skill.description}
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1">
                    <span>{skill.type}</span>
                    <span>
                      CD:{" "}
                      {cd > 0 ? (
                        <span className="text-amber-300">{cd}</span>
                      ) : (
                        "Ready"
                      )}
                    </span>
                  </div>
                </div>
                {skill.type === "bigDamage" || skill.type === "aoe" ? (
                  <div className="absolute inset-0 pointer-events-none rounded-xl border border-cyan-300/40 animate-pulse-slow" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFloatTexts = () => {
    return floatTexts.map((t) => (
      <div
        key={t.id}
        className={`pointer-events-none absolute ${
          t.side === "left"
            ? "left-[16%] md:left-[20%]"
            : "right-[16%] md:right-[20%]"
        } top-[40%] md:top-[38%] text-xs md:text-sm font-bold ${
          t.kind === "damage"
            ? "text-red-300"
            : t.kind === "shield"
            ? "text-cyan-200"
            : t.kind === "heal"
            ? "text-emerald-300"
            : "text-amber-200"
        } float-damage`}
      >
        {t.value}
      </div>
    ));
  };

  const resetBattle = () => {
    setPlayerTeam(PLAYER_MAIN_TEAM_PRESET.map(createBattleCreature));
    setEnemyTeam(ENEMY_MAIN_TEAM_PRESET.map(createBattleCreature));
    setActivePlayerIndex(0);
    setActiveEnemyIndex(0);
    setPlayerEnergy(1);
    setEnemyEnergy(1);
    setResult(null);
    setPhase("choosing");
    setSpinIndex(0);
    setSelectedMap(null);
    setArenaVideo(null);
    setCountdown(10);
    setVideoReady(false);
    setFloatTexts([]);
  };

  // ----------------- MAIN RENDER -----------------

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-50 overflow-hidden">
      {/* Slot machine / choosing phase */}
      {phase === "choosing" && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 tracking-wide">
            Choose Arena
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mb-6">
            Slot-style arena selector. Stopping on a random arena…
          </p>
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-black/70">
            <div className="grid grid-cols-5 gap-2 p-4 items-center justify-center">
              {[-2, -1, 0, 1, 2].map((offset, idx) => {
                const slot = getSlot(offset);
                const isCenter = offset === 0;
                return (
                  <div
                    key={`${slot.id}-${offset}-${idx}`}
                    className={`relative rounded-2xl overflow-hidden border ${
                      isCenter
                        ? "border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)] scale-105"
                        : "border-slate-700/70 opacity-70"
                    } transition-transform duration-200 bg-slate-900`}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={slot.thumb}
                        alt={slot.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 text-[11px] md:text-xs font-semibold text-slate-50 drop-shadow-md">
                      {slot.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reveal phase */}
      {phase === "reveal" && selectedMap && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 animate-fadein">
          <p className="text-xs md:text-sm text-slate-300 mb-2 uppercase tracking-[0.3em]">
            Arena Selected
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-3">
            {selectedMap.name}
          </h2>
          <div className="w-full max-w-xl rounded-3xl border border-cyan-400/60 bg-black/80 p-1 shadow-[0_0_45px_rgba(34,211,238,0.9)] animate-zoomHero">
            <div className="aspect-video rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200 text-sm overflow-hidden">
              <img
                src={selectedMap.thumb}
                alt={selectedMap.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Arena & countdown */}
      {phase === "arena" && (
        <div className="relative min-h-screen w-full flex items-center justify-center">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            src={arenaVideo}
            autoPlay
            muted
            loop
            onCanPlay={() => setVideoReady(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <p className="text-xs md:text-sm text-slate-300 mb-2 uppercase tracking-[0.3em]">
              Entering Arena
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-3">
              {selectedMap?.name}
            </h2>
            <div className="mt-4 text-5xl md:text-6xl font-bold text-sky-200 tracking-widest">
              {countdown}
            </div>
            <p className="mt-2 text-xs text-slate-300">
              Prepare your team… battle starts when countdown hits zero.
            </p>
          </div>
        </div>
      )}

      {/* Fight phase */}
      {phase === "fight" && (
        <div className="relative min-h-screen w-full flex items-center justify-center">
          {/* Background video */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            src={arenaVideo}
            autoPlay
            muted
            loop
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-slate-950/70 to-black/90" />

          {/* Battle UI */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-3 md:px-6 py-6 md:py-8 space-y-4 md:space-y-6">
            {/* Turn indicator */}
            <div className="flex items-center justify-between text-xs md:text-sm">
              <div className="uppercase tracking-[0.3em] text-slate-300">
                {turn === "player" ? (
                  <span className="text-cyan-300">Your Turn</span>
                ) : (
                  <span className="text-pink-300">Enemy Turn</span>
                )}
              </div>
              <div className="text-[10px] md:text-xs text-slate-400 flex flex-col items-end">
                <span>
                  Team Boosts:{" "}
                  <span className="text-cyan-300">
                    +{playerBoosts.speedPercent || 0}% SPD, +
                    {playerBoosts.attackPercent || 0}% ATK
                  </span>
                </span>
                <span className="mt-0.5 text-[9px] text-slate-500">
                  Babies & Youngs in support give global passives.
                </span>
              </div>
            </div>

            {/* Main battlefield */}
            <div className="relative mt-2 md:mt-4 rounded-3xl border border-slate-700/80 bg-black/60 px-2 md:px-4 py-3 md:py-4 overflow-hidden animate-fadein">
              {/* Float damage */}
              {renderFloatTexts()}

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-2 md:gap-4 items-center">
                {/* Player side */}
                <div className="space-y-2 md:space-y-3">
                  {/* Support row */}
                  <div className="flex gap-2 justify-start mb-1">
                    {renderSupportSlot(playerSupport[0], "left")}
                    {renderSupportSlot(playerSupport[1], "left")}
                  </div>

                  {/* Main vertical row */}
                  <div className="flex flex-col gap-2">
                    {playerTeam.map((c, idx) =>
                      renderCreaturePortrait(
                        c,
                        idx === activePlayerIndex,
                        false,
                        idx,
                        turn === "player"
                      )
                    )}
                  </div>
                </div>

                {/* Center: active creatures + HP bars */}
                <div className="flex flex-col gap-3 md:gap-4 items-stretch justify-center">
                  {/* Enemy HP bar */}
                  {activeEnemy && (
                    <div className="flex flex-col items-end md:items-center">
                      {renderHpBar(activeEnemy)}
                    </div>
                  )}

                  <div className="relative flex items-center justify-between mt-1 md:mt-2">
                    {/* Player active big */}
                    <div className="w-[40%] flex justify-center">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-cyan-400/70 bg-gradient-to-br from-slate-950 to-sky-900/80 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.7)]">
                        <div className="text-xs md:text-sm text-sky-100 text-center px-2">
                          {activePlayer?.name || "No creature"}
                        </div>
                        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-cyan-300/40 animate-pulse-slow" />
                      </div>
                    </div>

                    {/* VS */}
                    <div className="text-xs md:text-sm font-semibold tracking-[0.3em] text-slate-300">
                      VS
                    </div>

                    {/* Enemy active big */}
                    <div className="w-[40%] flex justify-center">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-pink-400/70 bg-gradient-to-br from-slate-950 to-rose-900/80 flex items-center justify-center shadow-[0_0_40px_rgba(244,114,182,0.7)]">
                        <div className="text-xs md:text-sm text-pink-100 text-center px-2">
                          {activeEnemy?.name || "No creature"}
                        </div>
                        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-pink-300/40 animate-pulse-slow" />
                      </div>
                    </div>
                  </div>

                  {/* Player HP bar */}
                  {activePlayer && (
                    <div className="flex flex-col items-start md:items-center mt-2">
                      {renderHpBar(activePlayer)}
                    </div>
                  )}
                </div>

                {/* Enemy side */}
                <div className="space-y-2 md:space-y-3">
                  {/* Support row */}
                  <div className="flex gap-2 justify-end mb-1">
                    {renderSupportSlot(enemySupport[0], "right")}
                    {renderSupportSlot(enemySupport[1], "right")}
                  </div>

                  {/* Main vertical row */}
                  <div className="flex flex-col gap-2 items-end">
                    {enemyTeam.map((c, idx) =>
                      renderCreaturePortrait(
                        c,
                        idx === activeEnemyIndex,
                        true,
                        idx,
                        false
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Skill bar */}
              {renderSkillBar()}
            </div>
          </div>
        </div>
      )}

      {/* Result overlay */}
      {phase === "result" && result && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-cyan-400/60 bg-slate-950/95 px-5 py-6 text-center shadow-[0_0_45px_rgba(34,211,238,0.7)] animate-fadein">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-2">
              Battle Result
            </p>
            <h2 className="text-2xl font-bold mb-2">
              {result.winner === "player"
                ? "VICTORY"
                : result.winner === "enemy"
                ? "DEFEAT"
                : "DRAW"}
            </h2>
            <p className="text-xs text-slate-300 mb-4">
              (Placeholder) Rewards: +50 XP, +10 SOUL, +5 GALA
            </p>
            <button
              type="button"
              onClick={resetBattle}
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-400 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------- INLINE CSS FOR ANIMATIONS & BUFF EFFECTS -------------
const styleId = "arcano-battle-inline-styles-v2";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
@keyframes fadein {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadein { animation: fadein 0.7s ease-out forwards; }

@keyframes zoomHero {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-zoomHero { animation: zoomHero 0.7s ease-out forwards; }

@keyframes fadeInUI {
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUI { animation: fadeInUI 0.8s ease-out forwards; }

@keyframes pulseSlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
.animate-pulse-slow { animation: pulseSlow 1.8s ease-in-out infinite; }

@keyframes floatDamage {
  0% { opacity: 0; transform: translateY(6px) scale(0.9); }
  25% { opacity: 1; transform: translateY(-4px) scale(1); }
  100% { opacity: 0; transform: translateY(-20px) scale(1.05); }
}
.float-damage {
  animation: floatDamage 0.9s ease-out forwards;
}

/* Buff & shield visual glows */
.buff-shield-glow {
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.6);
  position: relative;
}
.buff-shield-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 10%, rgba(125, 211, 252, 0.52), transparent);
  opacity: 0.35;
  pointer-events: none;
}

.buff-attack-glow {
  box-shadow: 0 0 28px rgba(248, 113, 113, 0.7);
}
.buff-speed-glow {
  box-shadow: 0 0 28px rgba(251, 191, 36, 0.7);
}
.buff-heal-glow {
  box-shadow: 0 0 28px rgba(52, 211, 153, 0.7);
}
`;
  document.head.appendChild(style);
}












