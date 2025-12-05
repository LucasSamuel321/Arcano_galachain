import logoIcon from "../assets/logo-icon.png";

export default function Footer() {
  return (
    <>
      {/* SEPARATOR LINE (AAA glow) */}
      <div className="w-full h-[6px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent shadow-[0_0_25px_rgba(150,0,255,0.5)]"></div>

      <footer className="bg-black/80 backdrop-blur-xl border-t border-white/10 pt-10 pb-10">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-300">

          {/* LOGO + TEXT */}
          <div>
            <div className="flex items-center gap-3">
              <img 
                src={logoIcon}
                alt="Arcano Icon"
                className="w-12 h-12 drop-shadow-[0_0_2px_rgba(150,0,255,0.7)]"
              />
              <h2 className="text-2xl font-extrabold text-purple-300 drop-shadow-[0_0_6px_rgba(150,0,255,0.6)]">
                ARCANO
              </h2>
            </div>

            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Hatch mystical eggs, evolve powerful creatures, conquer realms 
              and battle players worldwide — powered by GalaChain.
            </p>
          </div>

          {/* GAME LINKS */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Game</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-purple-300 transition">Home</a></li>
              <li><a href="/my-eggs" className="hover:text-purple-300 transition">My Eggs</a></li>
              <li><a href="/incubator" className="hover:text-purple-300 transition">Incubator</a></li>
              <li><a href="/creatures" className="hover:text-purple-300 transition">Creatures</a></li>
              <li><a href="/battle" className="hover:text-purple-300 transition">Battle</a></li>
            </ul>
          </div>

          {/* MARKETPLACE */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li><a href="/marketplace" className="hover:text-purple-300 transition">Buy & Sell</a></li>
              <li><a href="/shop" className="hover:text-purple-300 transition">Shop</a></li>
              <li><a href="/evolution" className="hover:text-purple-300 transition">Evolution</a></li>
            </ul>
          </div>

          {/* COMMUNITY */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Community</h3>

            <div className="flex items-center gap-4 text-2xl">
              <a href="#" className="hover:text-purple-300 transition">🐦</a>
              <a href="#" className="hover:text-purple-300 transition">💬</a>
              <a href="#" className="hover:text-purple-300 transition">📺</a>
              <a href="#" className="hover:text-purple-300 transition">🌐</a>
            </div>

            <p className="text-gray-500 text-xs mt-4">
              Join thousands of players building the Arcano universe.
            </p>
          </div>

        </div>

        <div className="mt-10 text-center text-gray-600 text-xs border-t border-white/10 pt-6">
          © {new Date().getFullYear()} Arcano • All Rights Reserved
        </div>

      </footer>
    </>
  );
}


