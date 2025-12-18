import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { WalletMetamask, TokenGALA } from "@web3icons/react";

export default function ConnectWalletModal({ isOpen, onClose }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const { connectToWallet } = useWallet();

  if (!isOpen) return null;

  const handleWalletConnect = async (walletType) => {
    setIsConnecting(true);
    setError(null);
    try {
      const result = await connectToWallet(walletType);
      if (result?.error) {
        setError(
          result.error === "no_provider"
            ? `${walletType === "metamask" ? "MetaMask" : "Gala Wallet"} not found. Please install it first.`
            : "Failed to connect wallet"
        );
      } else {
        onClose();
      }
    } catch (err) {
      setError("Failed to connect wallet");
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const checkWalletInstalled = (walletType) => {
    if (walletType === "metamask") {
      return typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask;
    }
    if (walletType === "gala") {
      return typeof window !== "undefined" && window.gala;
    }
    return false;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <button
              className="w-6 h-6 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition"
              aria-label="Help"
            >
              <span className="text-sm">?</span>
            </button>
            <h2 className="text-xl font-semibold text-white">Connect Wallet</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {/* Wallet Options */}
        <div className="p-6 space-y-3">
          {/* MetaMask */}
          <button
            onClick={() => handleWalletConnect("metamask")}
            disabled={isConnecting || !checkWalletInstalled("metamask")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-orange-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#232323] flex items-center justify-center">
                <WalletMetamask className="w-8 h-8" />
              </div>
              <span className="text-white font-medium text-base">MetaMask</span>
            </div>
            {checkWalletInstalled("metamask") ? (
              <span className="text-xs px-2 py-0.5 rounded bg-green-900/50 text-green-400 font-semibold tracking-wider" style={{letterSpacing: 1}}>INSTALLED</span>
            ) : (
              <span className="text-xs text-gray-400">Not installed</span>
            )}
          </button>

          {/* Gala Wallet */}
          <button
            onClick={() => handleWalletConnect("gala")}
            disabled={isConnecting || !checkWalletInstalled("gala")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#238BFB] flex items-center justify-center">
                <TokenGALA className="w-6 h-6 text-white"style={{color: "white"}} />
              </div>
              <span className="text-white font-medium text-base">Gala Wallet</span>
            </div>
            {checkWalletInstalled("gala") ? (
              <span className="text-xs px-2 py-0.5 rounded bg-green-900/50 text-green-400 font-semibold tracking-wider" style={{letterSpacing: 1}}>INSTALLED</span>
            ) : (
              <span className="text-xs text-gray-400">Not installed</span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 pb-4">
            <p className="text-sm text-red-400 text-center">{error}</p>
          </div>
        )}

  
      </div>
    </div>
  );
}

