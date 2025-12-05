import { useState } from "react";
import {
  LayoutDashboard,
  Egg,
  FlaskConical,
  PawPrint,
  Sparkles,
  HeartHandshake,
  Package,
  Store,
  Bell,
  Trophy,
  Settings2,
} from "lucide-react";

// PANELS
import DashboardPanel from "./ProfilePanels/DashboardPanel";
import MyEggsPanel from "./ProfilePanels/MyEggsPanel.jsx";
import IncubatorPanel from "./ProfilePanels/IncubatorPanel.jsx";
import CreaturesPanel from "./ProfilePanels/CreaturesPanel.jsx";
import EvolutionPanel from "./ProfilePanels/EvolutionPanel.jsx";
import InventoryPanel from "./ProfilePanels/InventoryPanel.jsx";
import ListingsPanel from "./ProfilePanels/ListingsPanel.jsx";
import NotificationsPanel from "./ProfilePanels/NotificationsPanel.jsx";
import AchievementsPanel from "./ProfilePanels/AchievementsPanel.jsx";
import SettingsPanel from "./ProfilePanels/SettingsPanel.jsx";
import BreedingPanel from "./ProfilePanels/BreedingPanel.jsx";

const PROFILE_TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "eggs", label: "My Eggs", icon: Egg },
  { id: "incubator", label: "Incubator", icon: FlaskConical },
  { id: "creatures", label: "Creatures", icon: PawPrint },
  { id: "evolution", label: "Evolution", icon: Sparkles },
  { id: "breeding", label: "Breeding", icon: HeartHandshake },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "listings", label: "Market Listings", icon: Store },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings2 },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div
      className="relative min-h-screen pt-24 pb-16 text-white"
      style={{
        background: `
          radial-gradient(1200px at 80% 10%, rgba(168,85,247,0.18), transparent 70%),
          radial-gradient(1200px at 20% 90%, rgba(56,189,248,0.16), transparent 70%),
          radial-gradient(1200px at 50% 100%, rgba(16,185,129,0.12), transparent 70%), 
          #000
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-3 md:px-6 flex flex-col md:flex-row gap-6">
        {/* ---------- LEFT SIDEBAR (DESKTOP) ----------- */}
        <aside
          className="
            hidden md:flex flex-col w-64 shrink-0
            rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl
            p-4 space-y-1.5
            shadow-[0_0_40px_rgba(0,0,0,0.7)]
            md:sticky md:top-24 self-start h-fit
          "
        >
          <div className="mb-2 px-1">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-gray-400">
              Profile
            </p>
          </div>

          {PROFILE_TABS.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative overflow-hidden
                  flex items-center gap-2 px-3.5 py-2.5 
                  rounded-xl text-[0.85rem] font-medium tracking-wide
                  transition-all duration-200 select-none
                  border border-white/5
                  ${
                    active
                      ? "bg-gradient-to-r from-purple-600 via-fuchsia-500 to-sky-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.9)]"
                      : "bg-black/30 text-gray-300 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {/* subtle shine effect */}
                <span
                  className={`
                    pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-r from-white/10 via-white/0 to-white/10
                    translate-x-[-120%] group-hover:translate-x-[120%]
                    transition-all duration-500
                  `}
                />
                <span className="relative flex items-center gap-2">
                  <Icon
                    size={16}
                    className={
                      active ? "text-white" : "text-gray-300 group-hover:text-white"
                    }
                  />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </aside>

        {/* ---------- MOBILE TAB GRID (NO SCROLL) ----------- */}
        <nav
          className="
            md:hidden
            w-full rounded-2xl bg-black/40 border border-white/10
            backdrop-blur-xl shadow-inner p-2
          "
        >
          <div className="grid grid-cols-3 gap-2">
            {PROFILE_TABS.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex flex-col items-center justify-center
                    px-2 py-2.5 rounded-xl text-[0.7rem] font-semibold tracking-wide
                    transition-all duration-150 select-none
                    ${
                      active
                        ? "bg-gradient-to-r from-purple-600 via-fuchsia-500 to-sky-500 text-white shadow"
                        : "bg-black/40 text-gray-300 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <Icon
                    size={16}
                    className={active ? "mb-0.5" : "mb-0.5 text-gray-300"}
                  />
                  <span className="text-center leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ---------- MAIN CONTENT AREA ---------- */}
        <main
          className="
            flex-1 rounded-2xl bg-black/40 border border-white/10 
            backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,1)]
            p-4 md:p-6 min-h-[520px]
          "
        >
          {activeTab === "dashboard" && <DashboardPanel />}
          {activeTab === "eggs" && <MyEggsPanel />}
          {activeTab === "incubator" && <IncubatorPanel />}
          {activeTab === "creatures" && <CreaturesPanel />}
          {activeTab === "evolution" && <EvolutionPanel />}
          {activeTab === "breeding" && <BreedingPanel />}
          {activeTab === "inventory" && <InventoryPanel />}
          {activeTab === "listings" && <ListingsPanel />}
          {activeTab === "notifications" && <NotificationsPanel />}
          {activeTab === "achievements" && <AchievementsPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
}
