import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import MyEggs from "../pages/MyEggs";
import Incubator from "../pages/Incubator";
import Creatures from "../pages/Creatures";
import Evolution from "../pages/Evolution";
import Marketplace from "../pages/Marketplace";
import Battle from "../pages/Battle";
import Shop from "../pages/Shop";
import Profile from "../pages/Profile";

export default function MainLayout() {
  const location = useLocation();

  // Home page ima fullscreen hero → no padding
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className={isHome ? "" : "pt-24"}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* MAIN PROFILE */}
          <Route path="/profile" element={<Profile />} />

          {/* OLD ROUTES (hidden in navbar but still active) */}
          <Route path="/my-eggs" element={<MyEggs />} />
          <Route path="/incubator" element={<Incubator />} />
          <Route path="/creatures" element={<Creatures />} />
          <Route path="/evolution" element={<Evolution />} />

          {/* PUBLIC PAGES */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
