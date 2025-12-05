export default function Home() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center">

        {/* GAME LOGO */}
        <img
          src="/images/arcano_logo.png"
          alt="Arcano Logo"
          className="w-[540px] md:w-[900px] mt-2 mb-6 drop-shadow-[0_0_35px_rgba(160,0,255,0.55)] animate-fadeInSlow"
        />

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_25px_rgba(180,0,255,0.5)] mb-6 leading-tight animate-fadeIn">
          Hatch. Evolve. Battle. Collect.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-gray-200 mb-12 animate-fadeIn delay-150">
          Discover mystical Eggs, hatch powerful creatures, evolve them into Titans,
          and battle players worldwide — powered by
          <span className="text-purple-400 font-semibold"> GalaChain</span>.
        </p>

        {/* AAA BUTTONS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 animate-fadeIn delay-300">

          {/* Mint Eggs */}
          <button className="
            relative px-10 py-3 rounded-xl text-white text-lg font-bold
            bg-gradient-to-b from-purple-500 to-purple-700
            shadow-[0_8px_20px_rgba(0,0,0,0.55)]
            hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]
            hover:from-purple-400 hover:to-purple-600
            transition-all duration-300
            active:scale-95
            border border-purple-300/20
            after:absolute after:inset-0 after:rounded-xl
            after:bg-white/10 after:opacity-0 hover:after:opacity-10 after:transition
          ">
            Mint Eggs
          </button>

          {/* Marketplace */}
          <button className="
            relative px-10 py-3 rounded-xl text-white text-lg font-semibold
            bg-gradient-to-b from-gray-800 to-gray-900
            shadow-[0_8px_20px_rgba(0,0,0,0.55)]
            hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]
            hover:from-gray-700 hover:to-gray-850
            transition-all duration-300
            active:scale-95
            border border-gray-500/20
            after:absolute after:inset-0 after:rounded-xl
            after:bg-white/10 after:opacity-0 hover:after:opacity-10 after:transition
          ">
            Marketplace
          </button>

          {/* Enter Battle */}
          <button className="
            relative px-10 py-3 rounded-xl text-white text-lg font-bold
            bg-gradient-to-b from-indigo-500 to-indigo-700
            shadow-[0_8px_20px_rgba(0,0,0,0.55)]
            hover:shadow-[0_12px_28px_rgba(0,0,0,0.7)]
            hover:from-indigo-400 hover:to-indigo-600
            transition-all duration-300
            active:scale-95
            border border-indigo-300/20
            after:absolute after:inset-0 after:rounded-xl
            after:bg-white/10 after:opacity-0 hover:after:opacity-10 after:transition
          ">
            Enter Battle
          </button>

        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.9s ease-out forwards;
        }
        .animate-fadeInSlow {
          animation: fadeIn 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}






