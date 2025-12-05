import { useState } from "react";

/* -------------------------------------------------------
   ACHIEVEMENT DATA — ORIGINAL IZ TVOJE DATOTEKE
------------------------------------------------------- */
const achievementList = [
  {
    id: 1,
    category: "Progress",
    name: "First Steps",
    desc: "Log in to Arcano for the first time.",
    icon: "🚀",
    progress: 1,
    goal: 1,
    reward: 50,
    rewardType: "XP",
    claimed: false,
  },
  {
    id: 2,
    category: "Progress",
    name: "Collector",
    desc: "Collect 10 total items.",
    icon: "🎒",
    progress: 4,
    goal: 10,
    reward: 100,
    rewardType: "XP",
    claimed: false,
  },
  {
    id: 3,
    category: "Evolution",
    name: "Hatchling",
    desc: "Hatch your first egg.",
    icon: "🥚",
    progress: 1,
    goal: 1,
    reward: 75,
    rewardType: "XP",
    claimed: false,
  },
  {
    id: 4,
    category: "Evolution",
    name: "Grower",
    desc: "Evolve a creature twice.",
    icon: "🌱",
    progress: 0,
    goal: 2,
    reward: 150,
    rewardType: "XP",
    claimed: false,
  },
  {
    id: 5,
    category: "Economy",
    name: "Trader",
    desc: "Sell an item on the marketplace.",
    icon: "💰",
    progress: 0,
    goal: 1,
    reward: 120,
    rewardType: "XP",
    claimed: false,
  },
  {
    id: 6,
    category: "Incubator",
    name: "Incubator Rookie",
    desc: "Use the incubator 5 times.",
    icon: "🔥",
    progress: 2,
    goal: 5,
    reward: 140,
    rewardType: "XP",
    claimed: false,
  },
];

const categories = ["All", "Progress", "Evolution", "Economy", "Incubator"];

/* -------------------------------------------------------
   COMPONENT
------------------------------------------------------- */
export default function AchievementsPanel() {
  const [filter, setFilter] = useState("All");
  const [achievements, setAchievements] = useState(achievementList);

  const filtered = achievements.filter((a) =>
    filter === "All" ? true : a.category === filter
  );

  const totalUnlocked = achievements.filter((a) => a.claimed).length;
  const totalCount = achievements.length;

  const claim = (id) =>
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, claimed: true } : a
      )
    );

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold tracking-wide mb-2">
        Achievements
      </h2>

      <p className="text-xs md:text-sm text-gray-400 mb-4">
        Progress: {totalUnlocked} / {totalCount} Unlocked
      </p>

      {/* ★★★★★ FILTER GRID (4-per-row, NO SCROLL) ★★★★★ */}
      <div
        className="
          grid grid-cols-4 gap-2
          sm:grid-cols-6
          md:flex md:flex-wrap md:gap-2
          mb-4
        "
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`
              px-2 py-1.5 
              text-[0.65rem] md:text-xs 
              rounded-lg 
              text-center truncate 
              border transition-all
              ${
                filter === c
                  ? "bg-purple-600/50 border-purple-400/50 text-white"
                  : "bg-black/50 border-white/10 text-gray-300 hover:bg-white/5"
              }
            `}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 overflow-hidden">
        {filtered.map((a) => {
          const percent = Math.min(100, (a.progress / a.goal) * 100);
          const completed = percent >= 100;
          const locked = a.progress === 0 && !a.claimed && !completed;

          return (
            <div
              key={a.id}
              className={`
                relative rounded-2xl p-5 bg-black/80 border backdrop-blur-xl transition hover:brightness-110
                ${
                  completed && !a.claimed
                    ? "border-purple-400/50 shadow-[0_0_22px_rgba(168,85,247,0.45)]"
                    : a.claimed
                    ? "border-yellow-400/50 shadow-[0_0_18px_rgba(250,204,21,0.45)]"
                    : "border-white/10"
                }
              `}
            >
              {/* LOCKED OVERLAY */}
              {locked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-400 text-sm pointer-events-none">
                  Locked
                </div>
              )}

              <div className="flex gap-4">
                <div className="text-4xl">{a.icon}</div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {a.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {a.desc}
                  </p>

                  <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full ${
                        completed
                          ? "bg-purple-400"
                          : "bg-purple-600/80"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <p className="text-[0.7rem] text-gray-500 mt-1">
                    {a.progress}/{a.goal}
                  </p>

                  <p className="text-xs text-purple-300 mt-1">
                    Reward: {a.reward} {a.rewardType}
                  </p>
                </div>

                <div className="flex flex-col justify-center items-end gap-1">
                  {completed && !a.claimed && (
                    <button
                      onClick={() => claim(a.id)}
                      className="px-3 py-1.5 bg-purple-600/80 text-white text-xs rounded-xl border border-purple-300 hover:bg-purple-700"
                    >
                      Claim
                    </button>
                  )}

                  {a.claimed && (
                    <span className="text-xs text-yellow-300 font-semibold">
                      CLAIMED
                    </span>
                  )}

                  {!a.claimed && !completed && !locked && (
                    <span className="text-xs text-gray-500">
                      In progress
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}






