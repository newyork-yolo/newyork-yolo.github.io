export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Stunning%20aerial%20view%20of%20Manhattan%20skyline%20at%20golden%20hour%20sunset%20with%20Empire%20State%20Building%20Brooklyn%20Bridge%20Hudson%20River%20dramatic%20clouds%20warm%20orange%20and%20purple%20sky%20cinematic%20urban%20landscape%20photography&width=1920&height=1080&seq=legacy-ny-hero-1&orientation=landscape"
          alt="New York City"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
      </div>

      <div className="relative z-10 text-center text-white px-6">
        <div className="mb-6">
          <h1
            className="text-6xl md:text-7xl font-light tracking-wider mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            LEGACY NEW YORK
          </h1>
          <div className="w-24 h-px bg-[#B11226] mx-auto mb-6"></div>
          <p
            className="text-xl md:text-2xl font-light tracking-wide text-white/90"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ニューヨークで繋がる、新たな出会いと体験
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
          <button
            onClick={() =>
              document
                .getElementById("next-event")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#B11226] text-white px-8 py-4 text-sm font-medium hover:bg-[#8b0e1e] transition-colors cursor-pointer whitespace-nowrap rounded-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            次回イベント情報
          </button>
          <button
            onClick={() =>
              document
                .getElementById("line-group")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap border border-white/30 rounded-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            LINEグループに参加
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-white text-3xl"></i>
      </div>
    </section>
  );
}
