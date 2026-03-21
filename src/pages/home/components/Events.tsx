import { Link } from "react-router-dom";
import ScrollReveal from "../../../components/base/ScrollReveal";

export default function Events() {
  const events = [
    {
      title: "Legacy NewYork",
      location: "New York, USA",
      description:
        "マンハッタンで開催されクリエイターから日本人駐在員まで幅広い方々の方々のための交流会、年4回の定期開催をしております。",
      image:
        "https://static.readdy.ai/image/0c61843cac5595a4ea86012b4ca98e8d/6e76b24a11f3789b5b07e10e8310f287.png",
      link: "/legacy-newyork",
      stats: ["参加者150名以上", "年4回以上の定期開催"],
    },
    {
      title: "Legacy Tokyo",
      location: "Tokyo, Japan",
      description:
        "東京で新たに始動した交流会。ニューヨークで培ったノウハウを活かし、クリエイターから東京で働かれる方々に新しい風を吹き込みます。",
      image:
        "https://static.readdy.ai/image/0c61843cac5595a4ea86012b4ca98e8d/834dbb67fe203089a997f26e602bbe32.jpeg",
      link: "/legacy-tokyo",
      stats: ["2026年始動", "東京都心開催", "新規参加者歓迎"],
    },
  ];

  return (
    <section className="py-24 bg-gray-50" id="events">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-start gap-8 mb-8">
              <p
                className="text-6xl font-light text-gray-200"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                04
              </p>
              <div>
                <h3 className="text-xs tracking-widest text-gray-400 mb-3">
                  NETWORKING EVENT
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-[#B11226]"></div>
                  <h2
                    className="text-2xl font-light text-[#111111]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    交流会
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <ScrollReveal key={index} delay={index * 150} direction="up">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#111111] text-sm font-medium rounded-full">
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3
                    className="text-2xl font-bold text-[#111111] mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {event.stats.map((stat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#B11226]/10 text-[#B11226] text-sm rounded-full"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={event.link}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#B11226] hover:bg-[#8b0e1e] text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap group/btn"
                  >
                    <span>詳細を見る</span>
                    <i className="ri-arrow-right-line text-xl group-hover/btn:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
