import { useState } from "react";
import { useWallet } from "../context/WalletContext";

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
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#E2761B"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#E4761B"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#E4761B"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#E4761B"
                  />
                  <path
                    d="M12 22.75c-2.97 0-5.48-1-7.3-2.7l3.58-2.77c.97.67 2.24 1.07 3.72 1.07 1.48 0 2.75-.4 3.72-1.07l3.58 2.77c-1.82 1.7-4.33 2.7-7.3 2.7z"
                    fill="#D7C1B3"
                  />
                  <path
                    d="M15.88 15.5l-1.94-1.45L12 11.5l-1.94 2.55-1.94 1.45 2.32-1.74L12 15.5l1.56-1.74 2.32 1.74z"
                    fill="#233447"
                  />
                </svg>
              </div>
              <span className="text-white font-medium">MetaMask</span>
            </div>
            {!checkWalletInstalled("metamask") && (
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
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* 3D Cube Icon */}
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="#3B82F6"
                    opacity="0.9"
                  />
                  <path
                    d="M2 7L12 12V22L2 17V7Z"
                    fill="#2563EB"
                    opacity="0.8"
                  />
                  <path
                    d="M12 12L22 7V17L12 22V12Z"
                    fill="#1D4ED8"
                    opacity="0.7"
                  />
                  <path
                    d="M2 7L12 12L22 7"
                    stroke="#60A5FA"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12L12 22"
                    stroke="#60A5FA"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 7L22 17"
                    stroke="#60A5FA"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white font-medium">Gala Wallet</span>
            </div>
            {!checkWalletInstalled("gala") && (
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

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 text-center">UX by / reown</p>
        </div>
      </div>
    </div>
  );
}

