import { useState } from "react";

/* ------------------------------------------------------
   DASHBOARD PANEL — ARCANO AAA VERSION
------------------------------------------------------- */

export default function DashboardPanel() {
  // TEMP USER DATA (later will come from backend/context)
  const user = {
    username: "ArcanoMaster",
    level: 12,
    xp: 4200,
    xpToNext: 6000,
    streak: 4,
    arcano: 1340,
    eggs: 4,
    creatures: 3,
    legendaryCreatures: 1,
    hatchCount: 12,
    incubators: { used: 2, total: 4 },
    evolutions: 7,
    marketProfit: 280,
    totalXP: 18250,
  };

  const xpPercent = Math.min(
    100,
    Math.floor((user.xp / user.xpToNext) * 100)
  );

  // Daily missions temporary
  const [missions, setMissions] = useState([
    { id: 1, text: "Hatch 1 egg", progress: 0, goal: 1, reward: 50, done: false },
    { id: 2, text: "Visit Creatures page", progress: 1, goal: 1, reward: 10, done: true },
    { id: 3, text: "Check Incubator", progress: 0, goal: 1, reward: 5, done: false },
  ]);

  const completeMission = (id) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, done: true, progress: m.goal } : m
      )
    );
  };

  // Fake notifications feed
  const notifications = [
    { id: 1, text: "Your Frost Egg finished hatching!" },
    { id: 2, text: "You earned an achievement: Daily Ritualist." },
    { id: 3, text: "Your item sold on marketplace for 42 ARCANO." },
  ];

  return (
    <div className="space-y-10">

      {/* =====================================================
          USER HEADER — AVATAR, LEVEL, XP, STREAK
      ===================================================== */}
      <div className="relative rounded-3xl p-6 bg-black/70 border border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-purple-500/5 pointer-events-none"></div>

        <div className="relative flex items-center gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-purple-700/40 border border-purple-300/20 flex items-center justify-center text-4xl">
            🐉
          </div>

          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {user.username}
            </h1>

            {/* LEVEL */}
            <p className="text-xs text-gray-400">Level {user.level}</p>

            {/* XP BAR */}
            <div className="mt-2 w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
            <p className="text-[0.7rem] text-gray-500 mt-1">
              {user.xp} / {user.xpToNext} XP
            </p>
          </div>

          {/* STREAK + ARCANO */}
          <div className="text-right">
            <p className="text-sm text-purple-300 font-semibold">
              🔥 Streak: {user.streak}
            </p>
            <p className="text-sm text-yellow-300 font-semibold">
              💰 {user.arcano} ARCANO
            </p>

            <button className="mt-2 px-3 py-1.5 text-xs bg-purple-600/70 hover:bg-purple-700 border border-purple-300 rounded-xl">
              Claim Daily Gift
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          STATS GRID  (8 CORE STATS)
      ===================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Eggs"   value={user.eggs} icon="🥚" />
        <StatCard label="Creatures"    value={user.creatures} icon="🐾" />
        <StatCard label="Legendaries"  value={user.legendaryCreatures} icon="💎" />
        <StatCard label="Hatched"      value={user.hatchCount} icon="🐣" />

        <StatCard
          label="Incubators"
          value={`${user.incubators.used} / ${user.incubators.total}`}
          icon="🧪"
        />

        <StatCard label="Evolutions"   value={user.evolutions} icon="🧬" />
        <StatCard label="Profit"       value={`${user.marketProfit} ARC`} icon="💰" />
        <StatCard label="Total XP"     value={user.totalXP} icon="📈" />
      </div>

      {/* =====================================================
          FEATURED CREATURE (placeholder for now)
      ===================================================== */}
      <div className="rounded-3xl bg-black/60 border border-white/10 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-semibold mb-3 text-white/90">
          Featured Creature
        </h2>

        <div className="flex items-center gap-6">
          {/* Creature Image */}
          <div className="w-28 h-28 rounded-2xl bg-purple-700/20 border border-purple-300/20 flex items-center justify-center text-5xl">
            🐲
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Inferno Drake</p>
            <p className="text-xs text-gray-400">Level 8 · Inferno Faction</p>

            <div className="mt-2">
              <button className="px-3 py-1.5 text-xs bg-purple-600/70 border border-purple-300 rounded-xl hover:bg-purple-700 mr-2">
                View
              </button>
              <button className="px-3 py-1.5 text-xs bg-white/10 border border-white/10 rounded-xl hover:bg-white/20">
                Evolve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DAILY MISSIONS
      ===================================================== */}
      <div className="rounded-3xl bg-black/60 border border-white/10 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-semibold mb-3 text-white/90">
          Daily Missions
        </h2>

        <div className="space-y-4">
          {missions.map((m) => {
            const percent = Math.min(
              100,
              Math.floor((m.progress / m.goal) * 100)
            );

            return (
              <div
                key={m.id}
                className="p-4 border border-white/10 rounded-xl bg-black/40"
              >
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-white">{m.text}</p>
                  <p className="text-xs text-purple-300">{m.reward} XP</p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    {m.progress}/{m.goal}
                  </p>

                  {!m.done && (
                    <button
                      onClick={() => completeMission(m.id)}
                      className="px-3 py-1.5 text-xs bg-purple-600/70 border border-purple-300 rounded-xl hover:bg-purple-700"
                    >
                      Claim
                    </button>
                  )}

                  {m.done && (
                    <span className="text-xs text-yellow-300 font-semibold">
                      COMPLETED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}
      <div className="rounded-3xl bg-black/60 border border-white/10 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-semibold mb-4 text-white/90">
          Quick Actions
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <QuickAction icon="🥚" label="My Eggs" />
          <QuickAction icon="🧪" label="Incubator" />
          <QuickAction icon="🐾" label="Creatures" />
          <QuickAction icon="🧬" label="Evolution" />
          <QuickAction icon="🛒" label="Shop" />
          <QuickAction icon="🏆" label="Achievements" />
        </div>
      </div>

      {/* =====================================================
          NOTIFICATIONS PREVIEW
      ===================================================== */}
      <div className="rounded-3xl bg-black/60 border border-white/10 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-semibold mb-3 text-white/90">
          Recent Notifications
        </h2>

        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-gray-300"
            >
              {n.text}
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          EVENT BANNER
      ===================================================== */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-700/40 to-fuchsia-600/30 border border-purple-300/20 p-5 text-center backdrop-blur-xl hover:brightness-110 transition-all cursor-pointer">
        <p className="text-sm text-white font-semibold">
          ❄️ Frostborn Event — 2× Hatch Chance This Week!  
        </p>
        <p className="text-xs text-purple-200 mt-1">
          Tap to view event details
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------
   SUB-COMPONENTS
------------------------------------------------------- */

// SMALL STAT CARD
function StatCard({ label, value, icon }) {
  return (
    <div className="p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl flex flex-col items-start">
      <p className="text-2xl mb-1">{icon}</p>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

// QUICK ACTION BUTTON
function QuickAction({ icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 bg-black/40 border border-white/10 rounded-2xl hover:bg-white/5 transition">
      <span className="text-2xl">{icon}</span>
      <span className="text-[0.7rem] mt-1 text-gray-300">{label}</span>
    </button>
  );
}
