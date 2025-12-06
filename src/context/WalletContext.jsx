import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);

  const detectProvider = useCallback(() => {
    if (typeof window === "undefined") return null;
    // Common injections
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
      let accounts;
      if (p.request) {
        accounts = await p.request({ method: "eth_requestAccounts" });
      } else if (p.enable) {
        accounts = await p.enable();
      }
      setProvider(p);
      handleAccounts(accounts);
      // try to read chain id
      try {
        const id = await (p.request ? p.request({ method: "eth_chainId" }) : null);
        handleChain(id);
      } catch (e) {
        // ignore
      }
      // wire up listeners if available
      if (p.on) {
        p.on("accountsChanged", handleAccounts);
        p.on("chainChanged", handleChain);
      }
      return { success: true };
    } catch (err) {
      console.error("wallet connect failed", err);
      return { error: err };
    }
  }, [detectProvider, handleAccounts, handleChain]);

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
    setAccount(null);
    setChainId(null);
    setProvider(null);
  }, [provider, detectProvider, handleAccounts, handleChain]);

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
