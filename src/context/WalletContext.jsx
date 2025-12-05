// src/context/WalletContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { BrowserConnectClient,  } from "@gala-chain/connect";

const WalletContext = createContext();

// ETH-GALA token contract address on Ethereum mainnet
const ETH_GALA_CONTRACT = "0xd1d2Eb1B1e90B638588728b4130137D262C87cae";
// ERC20 ABI for balanceOf function
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// Gala Bridge URL
const GALA_BRIDGE_URL = "https://connect.gala.com/";

export function WalletProvider({ children }) {
  // ============================================================
  // GALACHAIN WALLET STATE (PRIMARY - ALL TRANSACTIONS)
  // ============================================================
  // This is the ONLY wallet used for game transactions
  // All on-chain interactions happen through GalaChain wallet
  const [walletAddress, setWalletAddress] = useState(null); // GalaChain wallet address ONLY
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [galaClient, setGalaClient] = useState(null);

  // ============================================================
  // METAMASK STATE (DETECTION ONLY - NO TRANSACTIONS)
  // ============================================================
  // MetaMask is ONLY used for:
  // 1. Detecting ETH-GALA token balance
  // 2. Redirecting users to Gala bridge
  // MetaMask is NEVER used for signing Arcano transactions
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [ethGalaBalance, setEthGalaBalance] = useState(null);
  const [showBridgePrompt, setShowBridgePrompt] = useState(false);
  const [metamaskAddress, setMetamaskAddress] = useState(null); // MetaMask address (read-only, for display only)

  // ============================================================
  // METAMASK DETECTION (READ-ONLY, NO TRANSACTION SIGNING)
  // ============================================================
  // This effect ONLY detects MetaMask for ETH-GALA balance checking
  // It does NOT connect MetaMask or use it for any transactions
  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window !== "undefined" && window.ethereum) {
        // Only treat as MetaMask if it's actually MetaMask, not GalaWallet
        // GalaWallet might also inject window.ethereum, so we check for isMetaMask
        const isActuallyMetaMask = window.ethereum.isMetaMask && !window.ethereum.isGala && !window.gala;
        
        if (isActuallyMetaMask) {
          setHasMetaMask(true);
          // Check for already connected accounts (non-intrusive, read-only)
          checkForEthGala();
        }
      }
    };
    checkMetaMask();

    // Listen for MetaMask account changes (only if it's actually MetaMask)
    const handleAccountsChanged = (accounts) => {
      // Only process if it's actually MetaMask, not GalaWallet
      const isActuallyMetaMask = window.ethereum?.isMetaMask && !window.ethereum?.isGala && !window.gala;
      if (!isActuallyMetaMask) return;

      if (accounts && accounts.length > 0) {
        checkForEthGala(); // Re-check ETH-GALA balance
      } else {
        // MetaMask disconnected
        setMetamaskAddress(null);
        setEthGalaBalance(null);
        setShowBridgePrompt(false);
      }
    };

    // Only listen to MetaMask account changes, not GalaWallet
    if (window.ethereum && window.ethereum.isMetaMask && !window.ethereum.isGala && !window.gala) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener && window.ethereum.isMetaMask) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  // ============================================================
  // ETH-GALA DETECTION (READ-ONLY, NO TRANSACTIONS)
  // ============================================================
  // This function ONLY checks ETH-GALA balance in MetaMask
  // It does NOT sign any transactions or interact with game contracts
  // Purpose: Detect ETH-GALA → Show bridge prompt → Redirect to bridge
  const checkForEthGala = async () => {
    if (!window.ethereum) return;

    // Ensure we're only checking MetaMask, not GalaWallet
    const isActuallyMetaMask = window.ethereum.isMetaMask && !window.ethereum.isGala && !window.gala;
    if (!isActuallyMetaMask) return;

    try {
      // Check if accounts are already connected (non-intrusive, read-only)
      // This does NOT request connection, only checks existing connections
      const accounts = await window.ethereum.request({
        method: "eth_accounts", // Read-only, doesn't prompt user
      });

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        setMetamaskAddress(address); // Store for display only, NOT for transactions

        // Check ETH-GALA balance (read-only query, no transaction)
        const balance = await getTokenBalance(window.ethereum, address, ETH_GALA_CONTRACT);

        if (balance && BigInt(balance) > 0n) {
          setEthGalaBalance(balance);
          setShowBridgePrompt(true); // Show bridge redirect prompt
        } else {
          setEthGalaBalance(null);
        }
      }
    } catch (err) {
      // Silent fail - MetaMask not connected or error
      // This is expected and not an error condition
      console.log("MetaMask ETH-GALA check:", err);
    }
  };

  // ============================================================
  // TOKEN BALANCE QUERY (READ-ONLY, NO TRANSACTIONS)
  // ============================================================
  // This function ONLY queries token balance using eth_call
  // It does NOT sign any transactions
  // Used exclusively for ETH-GALA detection in MetaMask
  const getTokenBalance = async (provider, address, tokenAddress) => {
    try {
      // Format address for function call (remove 0x prefix, pad to 64 chars)
      const formattedAddress = address.slice(2).padStart(64, "0");
      // balanceOf(address) function selector: 0x70a08231
      const functionData = `0x70a08231${formattedAddress}`;

      // Use eth_call directly to query token balance
      const balanceHex = await provider.request({
        method: "eth_call",
        params: [
          {
            to: tokenAddress,
            data: functionData,
          },
          "latest",
        ],
      });

      return balanceHex;
    } catch (err) {
      console.error("Error checking token balance:", err);
      return null;
    }
  };

  // ============================================================
  // BRIDGE REDIRECT (UX ONLY, NO TRANSACTIONS)
  // ============================================================
  // Simply opens Gala bridge in new tab
  // All bridging happens on Gala's website, not in our app
  const redirectToBridge = () => {
    window.open(GALA_BRIDGE_URL, "_blank");
    setShowBridgePrompt(false);
  };

  // ============================================================
  // GALACHAIN WALLET CONNECTION (PRIMARY - ALL TRANSACTIONS)
  // ============================================================
  // This is the ONLY wallet connection used for game transactions
  // All gameplay transactions and on-chain interactions use GalaChain wallet
  // MetaMask is NEVER used for transactions - only for ETH-GALA detection

  // Connect to GalaChain Wallet (PRIMARY - used for ALL game transactions)
  const connectWallet = async () => {
    try {
        console.log("gala", window.gala);
        console.log("galachain", window.galachain);
        console.log("ethereum", window.ethereum);
      setIsConnecting(true);
      setError(null);

      // Wait a bit for extension to inject if it's still loading
      await new Promise((resolve) => setTimeout(resolve, 300));

      // BrowserConnectClient requires window.ethereum to be available
      // GalaWallet extension should inject window.ethereum
    //   if (!window.ethereum) {
    //     // Check if window.gala exists but window.ethereum doesn't
    //     if (window.gala) {
    //       throw new Error(
    //         "GalaWallet extension detected (window.gala), but window.ethereum is not available. " +
    //         "The GalaWallet extension needs to inject window.ethereum for BrowserConnectClient to work. " +
    //         "Please:\n" +
    //         "1. Open GalaWallet extension popup\n" +
    //         "2. Check extension settings to enable 'Inject Ethereum provider'\n" +
    //         "3. Refresh this page\n" +
    //         "4. Try connecting again"
    //       );
    //     }
    //     throw new Error(
    //       "Ethereum provider (window.ethereum) not found. " +
    //       "GalaWallet extension should inject window.ethereum. " +
    //       "Please ensure:\n" +
    //       "1. GalaWallet extension is installed and enabled\n" +
    //       "2. Extension popup is unlocked\n" +
    //       "3. Page has been refreshed after installing the extension\n" +
    //       "4. No other extensions are blocking wallet injection"
    //     );
    //   }

      // Log detected provider for debugging
      console.log("🔍 Detected provider:", {
        hasEthereum: !!window.ethereum,
        hasGala: !!window.gala,
        isMetaMask: window.ethereum?.isMetaMask,
        isGala: window.ethereum?.isGala,
        providerInfo: window.ethereum?.isMetaMask ? "MetaMask" : 
                      window.ethereum?.isGala ? "GalaWallet" : 
                      window.gala ? "GalaWallet (window.gala)" :
                      "Unknown provider"
      });

      // If only MetaMask is available (and not GalaWallet), we can't use it for GalaChain
      // But if both are available, BrowserConnectClient will use the first one
      // We need to ensure GalaWallet is being used, not MetaMask
    //   if (window.ethereum.isMetaMask && !window.ethereum.isGala && !window.gala) {
    //     throw new Error(
    //       "Only MetaMask detected. GalaWallet extension is required for GalaChain connections. " +
    //       "Please install the Gala Web3 Wallet extension from the Chrome Web Store."
    //     );
    //   }

      // Initialize BrowserConnectClient
      // BrowserConnectClient will use window.ethereum automatically
      // If GalaWallet is installed, it should inject window.ethereum
      const web3Wallet = new BrowserConnectClient();
      
      // Store client instance for later use (for signing transactions)
      setGalaClient(web3Wallet);

      // Set up account change listener
      web3Wallet.on("accountChanged", (account) => {
        if (account) {
          const address = Array.isArray(account) ? account[0] : account;
          setWalletAddress(address);
          localStorage.setItem("gala_wallet_address", address);
          console.log("✅ GalaChain wallet account changed:", address);
        } else {
          setWalletAddress(null);
          setGalaClient(null);
          localStorage.removeItem("gala_wallet_address");
          console.log("ℹ️ GalaChain wallet disconnected");
        }
      });

      // Attempt connection
      // This will call eth_requestAccounts and return GalaChain address
      console.log("🔄 Attempting to connect to GalaChain wallet...");
      const connectionResult = await web3Wallet.connect();
      
      if (!connectionResult) {
        throw new Error("Connection returned no address. Please try again.");
      }

      // Store GalaChain wallet address (this is the ONLY wallet used for transactions)
      setWalletAddress(connectionResult);
      localStorage.setItem("gala_wallet_address", connectionResult);
      console.log("✅ Connected to GalaChain Wallet (PRIMARY):", connectionResult);
      console.log("📝 Note: All game transactions will use this GalaChain wallet address");
    } catch (err) {
      console.error("❌ Failed to connect wallet:", err);
      
      // Provide more helpful error messages
      let errorMessage = err.message || "Failed to connect wallet.";
      
      if (err.message && err.message.includes("Ethereum provider not found")) {
        errorMessage = 
          "GalaWallet extension not detected. " +
          "Please ensure:\n" +
          "1. Gala Web3 Wallet extension is installed\n" +
          "2. Extension is enabled in your browser\n" +
          "3. Extension popup is unlocked\n" +
          "4. Browser has been restarted after installation\n" +
          "5. Page has been refreshed";
      } else if (err.message && (err.message.includes("User rejected") || err.message.includes("rejected"))) {
        errorMessage = "Connection cancelled. Please approve the connection request in GalaWallet.";
      }
      
      setError(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect GalaChain wallet (PRIMARY wallet)
  const disconnectWallet = async () => {
    try {
      setIsConnecting(true);
      
      // Use stored client instance if available, otherwise create new one
      if (galaClient) {
        galaClient.disconnect();
      } else {
        // Only create new client if window.ethereum is available
        if (window.ethereum) {
          const web3Wallet = new BrowserConnectClient();
          web3Wallet.disconnect();
        }
      }
      
      setWalletAddress(null);
      setGalaClient(null);
      localStorage.removeItem("gala_wallet_address");
      console.log("✅ GalaChain wallet disconnected");
    } catch (err) {
      console.error("❌ Failed to disconnect wallet:", err);
      setError(err.message || "Failed to disconnect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const dismissBridgePrompt = () => {
    setShowBridgePrompt(false);
  };

  const value = {
    // ============================================================
    // GALACHAIN WALLET (PRIMARY - ALL TRANSACTIONS)
    // ============================================================
    walletAddress, // GalaChain wallet address - used for ALL game transactions
    galaClient, // BrowserConnectClient instance - use for signing transactions
    isConnecting,
    error,
    connectWallet, // Connect to GalaChain wallet (PRIMARY)
    disconnectWallet, // Disconnect GalaChain wallet
    formatAddress,
    isConnected: !!walletAddress, // GalaChain wallet connection status

    // ============================================================
    // METAMASK (DETECTION ONLY - NO TRANSACTIONS)
    // ============================================================
    // MetaMask is ONLY used for ETH-GALA detection and bridge redirect
    // MetaMask is NEVER used for signing Arcano transactions
    hasMetaMask, // Whether MetaMask is installed (read-only detection)
    ethGalaBalance, // ETH-GALA balance in MetaMask (read-only)
    showBridgePrompt, // Show bridge redirect prompt if ETH-GALA detected
    redirectToBridge, // Redirect to Gala bridge (UX only)
    dismissBridgePrompt, // Dismiss bridge prompt
    checkForEthGala, // Check for ETH-GALA in MetaMask (read-only query)
    metamaskAddress, // MetaMask address (read-only, display only, NOT for transactions)
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

