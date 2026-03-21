export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Tokyo%20city%20skyline%20at%20dusk%20with%20Tokyo%20Tower%20illuminated%20modern%20urban%20landscape%20Shibuya%20crossing%20area%20vibrant%20nightlife%20atmosphere%20neon%20lights%20reflecting%20on%20streets%20cinematic%20photography%20high%20quality%20detailed%20view&width=1920&height=1080&seq=tokyo-hero-1&orientation=landscape"
          alt="Legacy Tokyo"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-6">
        <h1
          className="text-6xl md:text-7xl font-light tracking-wider mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          LEGACY TOKYO
        </h1>
        <div className="w-24 h-px bg-[#B11226] mx-auto mb-6"></div>
        <p
          className="text-lg md:text-xl font-light tracking-wide mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          東京から新しい財産となる出会いを
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              document
                .getElementById("next-event")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center gap-2 bg-[#B11226] text-white px-8 py-4 rounded-lg hover:bg-[#8b0e1e] transition-colors cursor-pointer whitespace-nowrap"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span>次回イベント</span>
            <i className="ri-arrow-right-line"></i>
          </button>
          <button
            onClick={() =>
              document
                .getElementById("line-group")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <i className="ri-line-fill"></i>
            <span>LINEグループ参加</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-white text-2xl"></i>
      </div>
    </section>
  );
}
