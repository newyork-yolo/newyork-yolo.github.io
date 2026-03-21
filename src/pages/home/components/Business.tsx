import { useNavigate, useLocation } from "react-router-dom";
import ScrollReveal from "../../../components/base/ScrollReveal";

export default function Business() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const businesses = [
    {
      icon: "ri-group-line",
      title: "交流会",
      description:
        "もともとはニューヨークに来た時、情報も信頼できる友達もおらず心細かった体験を基に開催しています。志を持つ仲間と出会い、刺激を受け、新たな可能性が生まれる時間。NYと東京でその熱量を体感してください。",
      features: ["Legacy NewYork", "Legacy Tokyo", "3ヶ月に1回開催"],
      targetId: "events",
    },
    {
      icon: "ri-megaphone-line",
      title: "SNS",
      description:
        "「人生再構築」をテーマとしたコンテンツでニューヨークでの刺激ある日々を投稿しています。「日々が楽しくない」「物足りなさを感じる」そう感じている方がもしいらっしゃるのであれば私たちのコンテンツを見ていただきたいです。自分と身近な普通の人間が人生を再構築することを求めて必死に食らいついた結果どのようになるのか見届けて頂ければと思います。",
      features: ["Instagram 22K", "TikTok 10K", "YouTube 5K", "Threads 6K"],
      targetId: "sns",
    },
    {
      icon: "ri-code-s-slash-line",
      title: "Web制作",
      description:
        "戦略的なWebサイト制作でブランド価値を最大化。ビジネスの目的に合わせた設計から、デザイン、開発、運用まで、成果につながるWebサイトをトータルサポートします。お客様のビジョンを形にし、オンラインでの成功を実現します。",
      features: ["ランディングページ", "コーポレートサイト", "UI/UXデザイン"],
      targetId: "web-production",
      isLink: true,
    },
  ];

  const handleClick = (business: (typeof businesses)[0]) => {
    if (business.isLink) {
      navigate("/web-production");
    } else {
      scrollToSection(business.targetId);
    }
  };

  return (
    <section className="py-24 bg-white" id="business">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2
              className="text-4xl font-bold text-[#111111] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              事業内容
            </h2>
            <div className="w-16 h-0.5 bg-[#B11226] mb-6 mx-auto"></div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {businesses.map((business, index) => (
            <ScrollReveal key={index} delay={index * 150} direction="up">
              <button
                onClick={() => handleClick(business)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-8 hover:bg-[#111111] hover:border-[#B11226]/40 hover:shadow-lg transition-all duration-300 group text-left cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#B11226]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#B11226] transition-colors">
                  <i
                    className={`${business.icon} text-3xl text-[#B11226] group-hover:text-white transition-colors`}
                  ></i>
                </div>
                <h3
                  className="text-xl font-bold text-[#111111] group-hover:text-white mb-4 flex items-center gap-2 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {business.title}
                  <i className="ri-arrow-right-line text-[#B11226] opacity-0 group-hover:opacity-100 transition-opacity text-base"></i>
                </h3>
                <p className="text-gray-600 group-hover:text-white/70 mb-6 leading-relaxed transition-colors">
                  {business.description}
                </p>
                <div className="space-y-2">
                  {business.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#B11226] rounded-full"></div>
                      <span className="text-sm text-gray-600 group-hover:text-white/60 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
