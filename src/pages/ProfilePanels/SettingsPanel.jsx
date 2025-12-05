import { useState } from "react";

export default function SettingsPanel() {
  // Toggles
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [wideLayout, setWideLayout] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);
  const [autoHatchConfirm, setAutoHatchConfirm] = useState(true);
  const [battleSpeed, setBattleSpeed] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const Toggle = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-all flex items-center ${
          value ? "bg-purple-600" : "bg-white/10"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transform transition-all ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold tracking-wide mb-2">
        Settings
      </h2>
      <p className="text-xs md:text-sm text-gray-400 mb-4">
        Customize your Arcano experience.
      </p>

      <div className="space-y-6">

        {/* ========================
            ACCOUNT SECTION
        ======================== */}
        <div className="rounded-2xl bg-black/60 p-5 border border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-white/90">
            Account
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Username</span>
              <span className="text-sm text-purple-300">Player123</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Wallet</span>
              <span className="text-sm text-gray-400 truncate max-w-[50%] text-right">
                0x8b2f...9C1A
              </span>
            </div>

            <button className="text-xs mt-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10">
              Manage Wallet
            </button>
          </div>
        </div>

        {/* ========================
            PREFERENCES
        ======================== */}
        <div className="rounded-2xl bg-black/60 p-5 border border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-white/90">
            Preferences
          </h3>

          <Toggle label="Sound Effects" value={sound} onChange={setSound} />
          <Toggle label="Notifications" value={notifications} onChange={setNotifications} />
          <Toggle label="Visual Animations" value={animations} onChange={setAnimations} />
          <Toggle label="Wide Layout Mode" value={wideLayout} onChange={setWideLayout} />

          {/* BATTLE SPEED */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-300">Battle Speed</span>
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              value={battleSpeed}
              onChange={(e) => setBattleSpeed(Number(e.target.value))}
              className="w-32 accent-purple-500"
            />
          </div>
          <p className="text-xs text-gray-500 text-right -mt-2">
            {battleSpeed}x speed
          </p>

        </div>

        {/* ========================
            GAMEPLAY SETTINGS
        ======================== */}
        <div className="rounded-2xl bg-black/60 p-5 border border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-white/90">
            Gameplay
          </h3>

          <Toggle
            label="Confirm before starting incubation"
            value={autoHatchConfirm}
            onChange={setAutoHatchConfirm}
          />

          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span className="text-sm text-gray-300">Auto-sell Common Loot</span>
            <button className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300">
              Coming Soon
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-300">Auto-enhance Low-Level Creatures</span>
            <button className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300">
              Coming Soon
            </button>
          </div>
        </div>

        {/* ========================
            PRIVACY & SOCIAL
        ======================== */}
        <div className="rounded-2xl bg-black/60 p-5 border border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-white/90">
            Privacy & Social
          </h3>

          <Toggle
            label="Show Online Status"
            value={onlineStatus}
            onChange={setOnlineStatus}
          />

          <Toggle
            label="Public Profile"
            value={profilePublic}
            onChange={setProfilePublic}
          />

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-300">Allow Friend Requests</span>
            <button className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-300">
              Coming Soon
            </button>
          </div>
        </div>

        {/* ========================
            SYSTEM
        ======================== */}
        <div className="rounded-2xl bg-black/60 p-5 border border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-white/90">
            System
          </h3>

          <button className="w-full text-left text-sm text-gray-300 py-2 hover:text-white">
            Clear Local Cache
          </button>
          <button className="w-full text-left text-sm text-gray-300 py-2 hover:text-white">
            Reset Tutorials
          </button>

          <button
            className="w-full mt-4 text-left text-sm text-red-400 py-2 hover:text-red-300"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* ========================
          DELETE MODAL
      ======================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-4">
          <div className="bg-black/80 border border-white/10 rounded-3xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Account?
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              This action is permanent. All Arcano progress will be lost.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-1.5 text-sm rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="px-3 py-1.5 text-sm rounded-xl bg-red-600 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

