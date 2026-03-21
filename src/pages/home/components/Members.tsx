import { useState, useRef, useEffect } from "react";
import ScrollReveal from "../../../components/base/ScrollReveal";

interface Member {
  name: string;
  image: string;
  objectPosition: string;
  role: string;
  bio: string;
  sns?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    threads?: string;
  };
}

interface TooltipPos {
  left: string;
  transform: string;
  arrowLeft: string;
}

export default function Members() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<TooltipPos>({
    left: "50%",
    transform: "translateX(-50%)",
    arrowLeft: "50%",
  });
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const TOOLTIP_WIDTH = 260;
  const MARGIN = 16;

  const calcPos = (index: number): TooltipPos => {
    const el = containerRefs.current[index];
    if (!el)
      return { left: "50%", transform: "translateX(-50%)", arrowLeft: "50%" };

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const vw = window.innerWidth;

    let tooltipLeft = centerX - TOOLTIP_WIDTH / 2;
    if (tooltipLeft < MARGIN) tooltipLeft = MARGIN;
    if (tooltipLeft + TOOLTIP_WIDTH > vw - MARGIN)
      tooltipLeft = vw - MARGIN - TOOLTIP_WIDTH;

    const offsetFromEl = tooltipLeft - rect.left;
    const arrowCenter = rect.width / 2 - offsetFromEl;
    const arrowPct = Math.min(
      Math.max((arrowCenter / TOOLTIP_WIDTH) * 100, 10),
      90,
    );

    return {
      left: `${offsetFromEl}px`,
      transform: "translateX(0)",
      arrowLeft: `${arrowPct}%`,
    };
  };

  useEffect(() => {
    if (hoveredIndex !== null) {
      setTooltipPos(calcPos(hoveredIndex));
    }
  }, [hoveredIndex]);

  const members: Member[] = [
    {
      name: "國嶋賢志朗",
      image: "/images/Photo_KenshiroKunishima.jpg",
      objectPosition: "center 60%",
      role: "Player",
      bio: "夢を追いかけ、人生の可能性を広げるためにニューヨークへ。現在はNYの不動産企業で働いています。「死ぬこと以外はかすり傷」。挑戦することを前提に、人生を設計しています。",
      sns: {
        instagram:
          "https://www.instagram.com/kenshiro_newyorkyolo?igsh=MWtwNnp3ZTR2amFlNw==",
        tiktok: "https://www.tiktok.com/@newyork.yolo?_r=1&_t=ZS-94FU1wLa7Ns",
        youtube: "https://youtube.com/@newyorkyolo?si=ufp0wQGBsGLDbMi4",
        threads: "https://www.threads.com/@kenshiro_newyorkyolo",
      },
    },
    {
      name: "山本竜也",
      image: "/images/Photo_TatsuyaYamamoto.jpg",
      objectPosition: "center 15%",
      role: "Architect",
      bio: "東京を拠点として思想設計、戦略の検討、仕組化、インフラの整備等裏方業務を担当しています。人生はどのタイミングからでも「再構築」できるという自分自身の体験から、皆様の人生に少しでも刺激を与えることができる体験を設計しています。",
      sns: {},
    },
  ];

  return (
    <section className="py-20 bg-[#111111]" id="members">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              メンバー
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto"></div>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-16 md:gap-24">
          {members.map((member, index) => (
            <ScrollReveal key={index} delay={index * 150} direction="up">
              <div
                ref={(el) => {
                  containerRefs.current[index] = el;
                }}
                className="text-center group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 吹き出し */}
                <div
                  className={`absolute bottom-full mb-4 z-30 pointer-events-none transition-all duration-300 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{
                    width: `${TOOLTIP_WIDTH}px`,
                    left: hoveredIndex === index ? tooltipPos.left : "50%",
                    transform:
                      hoveredIndex === index
                        ? tooltipPos.transform
                        : "translateX(-50%)",
                  }}
                >
                  <div
                    className="bg-[#1a1a1a] border border-[#B11226]/40 rounded-xl p-5 shadow-2xl"
                    style={{ boxShadow: "0 0 30px rgba(177,18,38,0.15)" }}
                  >
                    {member.role && (
                      <p className="text-[#B11226] text-xs font-semibold tracking-widest uppercase mb-2">
                        {member.role}
                      </p>
                    )}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    {member.sns && Object.keys(member.sns).length > 0 && (
                      <div className="flex gap-2 pointer-events-auto">
                        {member.sns.instagram && (
                          <a
                            href={member.sns.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#B11226]/20 border border-white/10 hover:border-[#B11226]/50 text-gray-400 hover:text-[#B11226] transition-all duration-300 cursor-pointer"
                          >
                            <i className="ri-instagram-line text-sm"></i>
                          </a>
                        )}
                        {member.sns.tiktok && (
                          <a
                            href={member.sns.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#B11226]/20 border border-white/10 hover:border-[#B11226]/50 text-gray-400 hover:text-[#B11226] transition-all duration-300 cursor-pointer"
                          >
                            <i className="ri-tiktok-line text-sm"></i>
                          </a>
                        )}
                        {member.sns.youtube && (
                          <a
                            href={member.sns.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#B11226]/20 border border-white/10 hover:border-[#B11226]/50 text-gray-400 hover:text-[#B11226] transition-all duration-300 cursor-pointer"
                          >
                            <i className="ri-youtube-line text-sm"></i>
                          </a>
                        )}
                        {member.sns.threads && (
                          <a
                            href={member.sns.threads}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#B11226]/20 border border-white/10 hover:border-[#B11226]/50 text-gray-400 hover:text-[#B11226] transition-all duration-300 cursor-pointer"
                          >
                            <i className="ri-threads-line text-sm"></i>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  {/* 三角 */}
                  <div
                    className="absolute w-0 h-0"
                    style={{
                      left:
                        hoveredIndex === index ? tooltipPos.arrowLeft : "50%",
                      bottom: "-8px",
                      transform: "translateX(-50%)",
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "8px solid rgba(177,18,38,0.4)",
                    }}
                  ></div>
                </div>

                {/* アバター */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B11226] to-[#7a0c1a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#B11226] group-hover:border-[#d41530] transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: member.objectPosition }}
                    />
                  </div>
                </div>
                <h3
                  className="text-2xl font-bold text-white group-hover:text-[#B11226] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {member.name}
                </h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
