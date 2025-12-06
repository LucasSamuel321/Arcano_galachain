import { BrowserConnectClient } from "@gala-chain/connect";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [galaClient, setGalaClient] = useState(null);

  const detectProvider = useCallback(() => {
    if (typeof window === "undefined") return null;
    // Common injections
    console.log("gala", window.gala);
    console.log("ethereum", window.ethereum);
    console.log("web3", window.web3);
    console.log("injectedWeb3", window.injectedWeb3);
    if (window.gala) return window.gala;
    if (window.ethereum) return window.ethereum;
    if (window.web3 && window.web3.currentProvider) return window.web3.currentProvider;
    // Some wallets expose injectedWeb3 with keys per provider
    if (window.injectedWeb3 && typeof window.injectedWeb3 === "object") {
      const key = Object.keys(window.injectedWeb3)[0];
      if (key) {
        const candidate = window.injectedWeb3[key];
        if (candidate && (candidate.provider || candidate.request || candidate.enable)) {
          return candidate.provider || candidate;
        }
      }
    }

    // Scan window for any object that looks like a provider (has request/enable/on)
    try {
      for (const k of Object.keys(window)) {
        if (k.length > 40) continue; // skip long keys
        const v = window[k];
        if (!v || typeof v !== "object") continue;
        // common provider API
        if ((typeof v.request === "function" || typeof v.enable === "function") && typeof v.on === "function") {
          // found something that looks like a provider
          // log non-verbosely for debugging
          try {
            console.info(`Detected web3 provider on window.${k}`);
          } catch (e) {}
          return v;
        }
        // heuristic: named gala or wallet objects
        const name = k.toLowerCase();
        if ((name.includes("gala") || name.includes("wallet")) && (typeof v.request === "function" || v.enable)) {
          try {
            console.info(`Detected possible Gala/wallet provider on window.${k}`);
          } catch (e) {}
          return v;
        }
      }
    } catch (e) {
      // ignore scanning errors
    }

    return null;
  }, []);

  const handleAccounts = useCallback((accounts) => {
    if (Array.isArray(accounts) && accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
    }
  }, []);

  const handleChain = useCallback((chain) => {
    setChainId(chain?.toString?.() ?? chain);
  }, []);

  const connect = useCallback(async () => {
    const p = detectProvider();
    if (!p) {
      console.warn("No web3 provider detected (no Gala or ethereum provider found)");
      return { error: "no_provider" };
    }
    try {
      // Standard request accounts for ethereum-compatible providers
      const web3Wallet = new BrowserConnectClient();
      
      // Store client instance for later use (for signing transactions)
      setGalaClient(web3Wallet);

      // Set up account change listener
      web3Wallet.on("accountChanged", (account) => {
        if (account) {
          const address = Array.isArray(account) ? account[0] : account;
          setAccount(address); 
          localStorage.setItem("gala_wallet_address", address);
          console.log("✅ GalaChain wallet account changed:", address);
        } else {
          setAccount(null);
          setGalaClient(null);
          localStorage.removeItem("gala_wallet_address");
          console.log("ℹ️ GalaChain wallet disconnected");
        }
      });
    } catch (err) {
      console.error("wallet connect failed", err);
      return { error: err };
    }
  }, [detectProvider, handleAccounts, handleChain]);

  const connectToWallet = useCallback(async (walletType) => {
    if (typeof window === "undefined") {
      return { error: "no_provider" };
    }

    try {
      let p = null;

      if (walletType === "metamask") {
        // Check for MetaMask
        if (window.ethereum && window.ethereum.isMetaMask) {
          p = window.ethereum;
        } else {
          return { error: "no_provider" };
        }
      } else if (walletType === "gala") {
        // Check for Gala Wallet
        if (window.gala) {
          p = window.gala;
        } else {
          // Try using BrowserConnectClient for Gala
          try {
            const web3Wallet = new BrowserConnectClient();
            setGalaClient(web3Wallet);
            
            // Set up account change listener
            web3Wallet.on("accountChanged", (account) => {
              if (account) {
                const address = Array.isArray(account) ? account[0] : account;
                setAccount(address);
                localStorage.setItem("gala_wallet_address", address);
                console.log("✅ GalaChain wallet account changed:", address);
              } else {
                setAccount(null);
                setGalaClient(null);
                localStorage.removeItem("gala_wallet_address");
                console.log("ℹ️ GalaChain wallet disconnected");
              }
            });
            
            return { success: true };
          } catch (err) {
            console.error("Gala wallet connect failed", err);
            return { error: err };
          }
        }
      } else {
        return { error: "invalid_wallet_type" };
      }

      if (!p) {
        return { error: "no_provider" };
      }

      setProvider(p);

      // Request accounts
      let accounts;
      if (p.request) {
        accounts = await p.request({ method: "eth_requestAccounts" });
      } else if (p.enable) {
        accounts = await p.enable();
      } else {
        return { error: "no_provider" };
      }

      handleAccounts(accounts);

      // Try to read chain id
      try {
        if (p.request) {
          const id = await p.request({ method: "eth_chainId" });
          handleChain(id);
        }
      } catch (e) {
        // ignore
      }

      // Wire up listeners if available
      if (p.on) {
        p.on("accountsChanged", handleAccounts);
        p.on("chainChanged", handleChain);
      }

      return { success: true };
    } catch (err) {
      console.error("wallet connect failed", err);
      return { error: err };
    }
  }, [handleAccounts, handleChain]);

  const disconnect = useCallback(() => {
    const p = provider || detectProvider();
    if (p && p.removeListener) {
      try {
        p.removeListener("accountsChanged", handleAccounts);
        p.removeListener("chainChanged", handleChain);
      } catch (e) {
        // ignore
      }
    }
    // Clean up Gala client if exists
    if (galaClient) {
      try {
        // Remove listeners if available
        if (galaClient.removeListener) {
          galaClient.removeListener("accountChanged", handleAccounts);
        }
      } catch (e) {
        // ignore
      }
      setGalaClient(null);
    }
    setAccount(null);
    setChainId(null);
    setProvider(null);
    localStorage.removeItem("gala_wallet_address");
  }, [provider, detectProvider, handleAccounts, handleChain, galaClient]);

  useEffect(() => {
    const p = detectProvider();
    if (!p) return;
    setProvider(p);
    // if the provider exposes current accounts, fetch them
    (async () => {
      try {
        if (p.request) {
          const accounts = await p.request({ method: "eth_accounts" });
          handleAccounts(accounts);
          try {
            const id = await p.request({ method: "eth_chainId" });
            handleChain(id);
          } catch (_) {}
        }
      } catch (e) {
        // ignore
      }
    })();

    if (p.on) {
      p.on("accountsChanged", handleAccounts);
      p.on("chainChanged", handleChain);
    }

    return () => {
      if (p.removeListener) {
        try {
          p.removeListener("accountsChanged", handleAccounts);
          p.removeListener("chainChanged", handleChain);
        } catch (e) {}
      }
    };
  }, [detectProvider, handleAccounts, handleChain]);

  const value = {
    account,
    chainId,
    provider,
    isConnected: Boolean(account),
    connect,
    disconnect,
    connectToWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
}

export default WalletContext;
