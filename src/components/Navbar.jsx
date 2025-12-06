import { useState } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import { useWallet } from "../context/WalletContext";
import ConnectWalletModal from "./ConnectWalletModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const {
    account,
    isConnected,
    disconnect,
  } = useWallet();

  // Format wallet address for display (first 6 and last 4 characters)
  const formatAddress = (address) => {
    if (!address) return "";
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect();
    setError(null);
  };

  // Open wallet connection modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(null);
  };

  // Close wallet connection modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  return (
    <>
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
                {formatAddress(account)}
              </span>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-700 text-white text-sm font-semibold transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenModal}
              className="hidden md:inline-flex px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base font-bold shadow-lg shadow-purple-900/40 transition"
            >
              Connect Wallet
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
                {formatAddress(account)}
              </span>
              <button
                onClick={handleDisconnect}
                className="px-5 py-3 rounded-xl bg-red-600/80 hover:bg-red-700 text-white font-bold transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenModal}
              className="mt-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-900/40 transition"
            >
              Connect Wallet
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
    
    {/* Connect Wallet Modal */}
    <ConnectWalletModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
