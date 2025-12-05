import { useState } from "react";

const notificationFilters = ["All", "System", "Trades", "Evolution", "Incubator"];

const demoNotifications = [
  {
    id: 1,
    type: "System",
    msg: "Welcome to Arcano!",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    type: "Trades",
    msg: "Your listing received a new offer.",
    time: "5h ago",
    unread: true,
  },
  {
    id: 3,
    type: "Incubator",
    msg: "Your Frost Egg is halfway hatched.",
    time: "1 day ago",
    unread: false,
  },
];

export default function NotificationsPanel() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState(demoNotifications);

  const filtered = items.filter((n) =>
    filter === "All" ? true : n.type === filter
  );

  const markAllAsRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  const clearAll = () => setItems([]);

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold tracking-wide mb-2">
        Notifications
      </h2>

      {/* FIXED FILTER GRID — 4 PER ROW, NO SCROLL */}
      <div
        className="
          grid grid-cols-4 gap-2 
          sm:grid-cols-6
          md:flex md:flex-wrap md:gap-2
          mb-4
        "
      >
        {notificationFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-2 py-1.5 text-[0.65rem] md:text-xs 
              rounded-lg text-center truncate 
              border transition-all
              ${
                filter === f
                  ? "bg-purple-600/50 border-purple-400/50 text-white"
                  : "bg-black/50 border-white/10 text-gray-300 hover:bg-white/5"
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={markAllAsRead}
          className="px-3 py-1 text-xs bg-white/10 rounded-lg border border-white/10 hover:bg-white/20"
        >
          Mark all read
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1 text-xs bg-red-500/20 rounded-lg border border-red-500/40 hover:bg-red-500/30"
        >
          Clear all
        </button>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="flex flex-col gap-3 overflow-hidden">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-10">
            No notifications.
          </p>
        )}

        {filtered.map((n) => (
          <div
            key={n.id}
            className={`
              rounded-xl p-4 bg-black/70 border backdrop-blur-md transition
              ${
                n.unread
                  ? "border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                  : "border-white/10"
              }
            `}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-purple-300">
                {n.type}
              </span>
              <span className="text-[0.65rem] text-gray-400">{n.time}</span>
            </div>

            <p className="text-sm text-white">{n.msg}</p>

            {n.unread && (
              <div className="mt-2 text-xs bg-purple-600/30 inline-block px-2 py-0.5 rounded-md text-purple-200 border border-purple-400/30">
                Unread
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}




