export default function HeroVideo() {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* VIDEO */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY (optional, za bolj čitljiv tekst) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-xl">
          Arcane Creatures
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-2xl drop-shadow-lg">
          Choose your faction. Hatch your creature. Enter the elemental war.
        </p>
      </div>
    </div>
  );
}
