// src/App.jsx
import MainLayout from "./layout/MainLayout";
import { GameProvider } from "./context/GameContext.jsx";
import { WalletProvider } from "./context/WalletContext.jsx";

export default function App() {
  return (
    <WalletProvider>
      <GameProvider>
        <MainLayout />
      </GameProvider>
    </WalletProvider>
  );
}
