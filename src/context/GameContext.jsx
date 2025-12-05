// src/context/GameContext.jsx
import { createContext, useContext, useReducer } from "react";

/**
 * Arcano GameContext (ENGLISH, CLEAN, FREELANCER-READY)
 * ------------------------------------------------------
 * Holds ALL game state:
 * - eggs
 * - incubator slots
 * - creatures (young + adult)
 * - currencies
 * - inventory (boosts)
 * - profile
 *
 * All blockchain operations will replace // TODO: CHAIN
 */

const initialState = {
  eggs: [],

  incubatorSlots: [
    { slotId: 1, egg: null, startedAt: null, hatchDurationMs: null, status: "empty" },
    { slotId: 2, egg: null, startedAt: null, hatchDurationMs: null, status: "empty" },
    { slotId: 3, egg: null, startedAt: null, hatchDurationMs: null, status: "empty" },
    { slotId: 4, egg: null, startedAt: null, hatchDurationMs: null, status: "empty" },
  ],

  creatures: [],

  inventory: {
    boosts: [],    // { id, type: "instant_hatch", quantity }
    items: []      // reserved for future materials
  },

  currencies: {
    arcano: 0,
    hatchTokens: 0,
    breedToken: 0,
  },

  profile: {
    walletAddress: null,
    xp: 0,
    level: 1,
    wins: 0,
    losses: 0,
    lastLoginAt: null,
  },
};

// -----------------------------------------------------
// Action types
// -----------------------------------------------------

const ACTIONS = {
  ADD_EGG: "ADD_EGG",
  REMOVE_EGG: "REMOVE_EGG",

  MOVE_EGG_TO_INCUBATOR: "MOVE_EGG_TO_INCUBATOR",
  COMPLETE_HATCH: "COMPLETE_HATCH",
  INSTANT_HATCH_WITH_BOOST: "INSTANT_HATCH_WITH_BOOST",

  ADD_CREATURE: "ADD_CREATURE",
  REMOVE_CREATURE: "REMOVE_CREATURE",

  UPDATE_CURRENCIES: "UPDATE_CURRENCIES",
  SET_PROFILE_FIELD: "SET_PROFILE_FIELD",

  LOAD_STATE_FROM_CHAIN_PLACEHOLDER: "LOAD_STATE_FROM_CHAIN_PLACEHOLDER",
};

// -----------------------------------------------------
// Utils
// -----------------------------------------------------

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateYoungCreatureFromEgg(egg) {
  const rarity = egg.rarityHint || "common";
  const quality = randInt(40, 100);

  const baseName = {
    FROST: "Frost Hatchling",
    INFERNO: "Inferno Hatchling",
    NATURE: "Nature Hatchling",
    STORM: "Storm Hatchling",
  }[egg.faction] || `${egg.faction} Hatchling`;

  const baseStats = { hp: 80, atk: 12, def: 6, speed: 6 };

  const rarityMult = {
    common: 1,
    rare: 1.2,
    epic: 1.5,
    legendary: 2,
  }[rarity] || 1;

  const q = 0.5 + quality / 200;

  return {
    id: `YOUNG_${egg.faction}_${Date.now()}`,
    name: baseName,
    faction: egg.faction,
    stage: "young",
    rarity,
    quality,
    stats: {
      hp: Math.round(baseStats.hp * rarityMult * q),
      atk: Math.round(baseStats.atk * rarityMult * q),
      def: Math.round(baseStats.def * rarityMult * q),
      speed: Math.round(baseStats.speed * rarityMult * q),
    },
    skills: [],
    passive: null,
  };
}

// -----------------------------------------------------
// Reducer
// -----------------------------------------------------

function gameReducer(state, action) {
  switch (action.type) {
    // Eggs
    case ACTIONS.ADD_EGG:
      return { ...state, eggs: [...state.eggs, action.payload] };

    case ACTIONS.REMOVE_EGG:
      return { ...state, eggs: state.eggs.filter(e => e.id !== action.payload) };

    // Incubator
    case ACTIONS.MOVE_EGG_TO_INCUBATOR: {
      const { slotId, eggId, hatchDurationMs } = action.payload;
      const egg = state.eggs.find(e => e.id === eggId);
      if (!egg) return state;

      const slots = state.incubatorSlots.map(s =>
        s.slotId !== slotId
          ? s
          : {
              ...s,
              egg,
              startedAt: Date.now(),
              hatchDurationMs: hatchDurationMs ?? 4 * 60 * 60 * 1000,
              status: "hatching",
            }
      );

      return {
        ...state,
        eggs: state.eggs.filter(e => e.id !== eggId),
        incubatorSlots: slots,
      };
    }

    case ACTIONS.COMPLETE_HATCH: {
      const { slotId } = action.payload;
      const slot = state.incubatorSlots.find(s => s.slotId === slotId);
      if (!slot?.egg) return state;

      const newCreature = generateYoungCreatureFromEgg(slot.egg);

      const slots = state.incubatorSlots.map(s =>
        s.slotId !== slotId
          ? s
          : { ...s, egg: null, startedAt: null, hatchDurationMs: null, status: "empty" }
      );

      return {
        ...state,
        incubatorSlots: slots,
        creatures: [...state.creatures, newCreature],
      };
    }

    case ACTIONS.INSTANT_HATCH_WITH_BOOST: {
      const { slotId } = action.payload;
      const slot = state.incubatorSlots.find(s => s.slotId === slotId);
      if (!slot?.egg) return state;

      const boost = state.inventory.boosts.find(
        b => b.type === "instant_hatch" && b.quantity > 0
      );
      if (!boost) return state;

      const updatedBoosts = state.inventory.boosts
        .map(b =>
          b.type === "instant_hatch" ? { ...b, quantity: b.quantity - 1 } : b
        )
        .filter(b => b.quantity > 0);

      const creature = generateYoungCreatureFromEgg(slot.egg);

      const slots = state.incubatorSlots.map(s =>
        s.slotId !== slotId
          ? s
          : { ...s, egg: null, startedAt: null, hatchDurationMs: null, status: "empty" }
      );

      return {
        ...state,
        inventory: { ...state.inventory, boosts: updatedBoosts },
        incubatorSlots: slots,
        creatures: [...state.creatures, creature],
      };
    }

    // Creatures
    case ACTIONS.ADD_CREATURE:
      return { ...state, creatures: [...state.creatures, action.payload] };

    case ACTIONS.REMOVE_CREATURE:
      return { ...state, creatures: state.creatures.filter(c => c.id !== action.payload) };

    // Currencies
    case ACTIONS.UPDATE_CURRENCIES: {
      const d = action.payload;
      return {
        ...state,
        currencies: {
          arcano: state.currencies.arcano + (d.arcano || 0),
          hatchTokens: state.currencies.hatchTokens + (d.hatchTokens || 0),
          breedToken: state.currencies.breedToken + (d.breedToken || 0),
        },
      };
    }

    // Profile
    case ACTIONS.SET_PROFILE_FIELD:
      return {
        ...state,
        profile: { ...state.profile, [action.payload.key]: action.payload.value },
      };

    // Chain load (placeholder)
    case ACTIONS.LOAD_STATE_FROM_CHAIN_PLACEHOLDER:
      return { ...state, ...(action.payload.state || {}) };

    default:
      return state;
  }
}

// -----------------------------------------------------
// Provider + exports
// -----------------------------------------------------

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Eggs
  const addEgg = egg => dispatch({ type: ACTIONS.ADD_EGG, payload: egg });
  const removeEgg = eggId => dispatch({ type: ACTIONS.REMOVE_EGG, payload: eggId });

  // Incubator
  const moveEggToIncubator = (slotId, eggId, hatchDurationMs) =>
    dispatch({
      type: ACTIONS.MOVE_EGG_TO_INCUBATOR,
      payload: { slotId, eggId, hatchDurationMs },
    });

  const completeHatch = slotId =>
    dispatch({ type: ACTIONS.COMPLETE_HATCH, payload: { slotId } });

  const instantHatchWithBoost = slotId =>
    dispatch({ type: ACTIONS.INSTANT_HATCH_WITH_BOOST, payload: { slotId } });

  // Creatures
  const addCreature = c =>
    dispatch({ type: ACTIONS.ADD_CREATURE, payload: c });

  const removeCreature = id =>
    dispatch({ type: ACTIONS.REMOVE_CREATURE, payload: id });

  const getYoungCreatures = () =>
    state.creatures.filter(c => c.stage === "young");

  const getAdultCreatures = () =>
    state.creatures.filter(c => c.stage === "adult");

  const addAdultCreature = adult =>
    dispatch({
      type: ACTIONS.ADD_CREATURE,
      payload: { ...adult, stage: "adult" },
    });

  // Currencies
  const updateCurrencies = delta =>
    dispatch({ type: ACTIONS.UPDATE_CURRENCIES, payload: delta });

  // Profile
  const setProfileField = (key, value) =>
    dispatch({ type: ACTIONS.SET_PROFILE_FIELD, payload: { key, value } });

  const value = {
    state,
    dispatch,
    actions: ACTIONS,

    addEgg,
    removeEgg,
    moveEggToIncubator,
    completeHatch,
    instantHatchWithBoost,

    addCreature,
    removeCreature,
    getYoungCreatures,
    getAdultCreatures,
    addAdultCreature,

    updateCurrencies,
    setProfileField,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}


