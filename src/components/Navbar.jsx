import { useState } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import { useWallet } from "../context/WalletContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    walletAddress,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    formatAddress,
    isConnected,
    showBridgePrompt,
    redirectToBridge,
    dismissBridgePrompt,
    ethGalaBalance,
  } = useWallet();

  // Format ETH-GALA balance for display
  const formatBalance = (balance) => {
    if (!balance) return "0";
    const balanceBigInt = BigInt(balance);
    const decimals = 18;
    const divisor = BigInt(10 ** decimals);
    const whole = balanceBigInt / divisor;
    const remainder = balanceBigInt % divisor;
    const decimalsStr = remainder.toString().padStart(decimals, "0").slice(0, 4).replace(/0+$/, "");
    return decimalsStr ? `${whole}.${decimalsStr}` : whole.toString();
  };

  return (
    <>
      {/* ETH-GALA Bridge Prompt Banner */}
      {showBridgePrompt && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-amber-600/90 to-orange-600/90 backdrop-blur-md border-b border-amber-400/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">🌉</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-white font-semibold text-sm sm:text-base">
                  ETH-GALA Detected!
                </span>
                <span className="text-amber-100 text-xs sm:text-sm">
                  You have {formatBalance(ethGalaBalance)} ETH-GALA. Bridge to GalaChain to play.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={redirectToBridge}
                className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition backdrop-blur-sm border border-white/30"
              >
                Go to Bridge
              </button>
              <button
                onClick={dismissBridgePrompt}
                className="px-3 py-2 rounded-lg hover:bg-white/10 text-white text-xl transition"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">

        {/* LEFT: LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <img
            src={logoIcon}
            alt="Arcano Icon"
            className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(150,0,255,0.4)] select-none"
          />
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold text-purple-300 tracking-wide drop-shadow-[0_0_8px_rgba(150,0,255,0.6)]"
          >
            ARCANO
          </Link>
        </div>

        {/* CENTER: NAV LINKS (desktop only) */}
        <div className="flex-1 hidden md:flex items-center justify-center gap-8 text-sm md:text-base font-semibold">
          <Link to="/" className="hover:text-purple-300 tracking-[0.18em] uppercase transition">
            Home
          </Link>

          <Link to="/shop" className="hover:text-purple-300 tracking-[0.18em] uppercase transition">
            Shop
          </Link>

          <Link to="/marketplace" className="hover:text-purple-300 tracking-[0.18em] uppercase transition">
            Marketplace
          </Link>

          {/* NEW — BATTLE */}
          <Link to="/battle" className="hover:text-purple-300 tracking-[0.18em] uppercase transition">
            Battle
          </Link>

          <Link to="/profile" className="hover:text-purple-300 tracking-[0.18em] uppercase transition">
            Profile
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 ml-4">

          {/* WALLET BUTTON DESKTOP */}
          {isConnected ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-purple-600/80 text-white text-sm font-semibold">
                {formatAddress(walletAddress)}
              </span>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-700 text-white text-sm font-semibold transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="hidden md:inline-flex px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base font-bold shadow-lg shadow-purple-900/40 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-base">

          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">
            Home
          </Link>

          <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">
            Shop
          </Link>

          <Link to="/marketplace" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">
            Marketplace
          </Link>

          {/* NEW — BATTLE (mobile) */}
          <Link to="/battle" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">
            Battle
          </Link>

          <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-purple-300">
            Profile
          </Link>

          {isConnected ? (
            <div className="mt-2 flex flex-col gap-2">
              <span className="px-4 py-3 rounded-xl bg-purple-600/80 text-white text-sm font-semibold text-center">
                {formatAddress(walletAddress)}
              </span>
              <button
                onClick={disconnectWallet}
                className="px-5 py-3 rounded-xl bg-red-600/80 hover:bg-red-700 text-white font-bold transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="mt-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-900/40 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
          {error && (
            <p className="mt-2 text-xs text-red-400 text-center">
              {error}
            </p>
          )}
        </div>
      )}
    </nav>
    </>
  );
}
