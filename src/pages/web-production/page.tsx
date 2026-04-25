import { useEffect } from "react";
import Navbar from "../home/components/Navbar";
import Footer from "../home/components/Footer";
import ScrollReveal from "../../components/base/ScrollReveal";
import SectionDivider from "../../components/feature/SectionDivider";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Modern%20minimalist%20web%20design%20workspace%20with%20sleek%20laptop%20on%20white%20desk%20elegant%20office%20environment%20soft%20natural%20light%20clean%20aesthetic%20professional%20digital%20creative%20studio%20bright%20airy%20atmosphere%20with%20subtle%20shadows%20and%20refined%20details&width=1920&height=1080&seq=web-hero-bg-01&orientation=landscape"
          alt="Web Production Hero"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center w-full">
        <ScrollReveal>
          <p className="text-sm tracking-widest text-white/60 mb-6">
            WEB PRODUCTION SERVICE
          </p>
          <h1
            className="text-5xl md:text-7xl font-light text-white mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            あなたのビジネスを
            <br />
            デジタルで加速させる
          </h1>
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            戦略的なWebサイト制作で、ブランド価値を最大化。
            <br />
            制作から運用まで、成果につながるWebサイトをトータルサポートします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-block bg-[#B11226] hover:bg-[#8f0e1e] text-white px-10 py-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              無料相談を申し込む
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-lg text-sm font-medium whitespace-nowrap border border-white/30 transition-colors cursor-pointer"
            >
              サービスを見る
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Support() {
  const supports = [
    {
      icon: "ri-tools-line",
      title: "定期メンテナンス",
      description:
        "セキュリティアップデートやコンテンツ更新など、サイトを常に最良の状態に保ちます。",
    },
    {
      icon: "ri-customer-service-2-line",
      title: "専任サポート対応",
      description: "困ったときに相談できる専任担当者が、丁寧に対応いたします。",
    },
  ];

  return (
    <section id="support" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-6">
            <p className="text-xs tracking-widest text-gray-400 mb-3">
              ONGOING SUPPORT
            </p>
            <h2
              className="text-4xl font-light text-[#111111] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              制作後も、ずっと一緒に。
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto mb-6"></div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Webサイトは公開がゴールではありません。
              <br />
              私たちは
              <strong className="text-[#111111]">制作から運用・改善まで</strong>
              、長期的なパートナーとしてビジネスの成長を支え続けます。
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-4 mb-12 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-[#B11226]/10 border border-[#B11226]/30 rounded-full px-6 py-3">
              <i className="ri-shield-check-line text-[#B11226] text-xl"></i>
              <span className="text-[#111111] font-medium text-sm">
                公開後の運用サポートも全プランで対応可能
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {supports.map((item, index) => (
            <ScrollReveal key={index} delay={index * 80} direction="up">
              <div className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#B11226]/30 hover:shadow-lg hover:shadow-[#B11226]/5 transition-all duration-300 text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-[#B11226]/10 rounded-full mx-auto mb-4">
                  <i className={`${item.icon} text-2xl text-[#B11226]`}></i>
                </div>
                <h3 className="text-base font-medium text-[#111111] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: "ri-pages-line",
      title: "ランディングページ",
      description:
        "コンバージョンを最大化する、戦略的なLP制作。商品・サービスの魅力を最大限に引き出します。",
      features: ["レスポンシブデザイン", "高速表示対応"],
    },
    {
      icon: "ri-building-line",
      title: "コーポレートサイト",
      description:
        "企業の信頼性とブランド価値を高める、プロフェッショナルなWebサイトを制作します。",
      features: ["多言語対応", "SEO対策"],
    },
    {
      icon: "ri-pencil-ruler-2-line",
      title: "UI/UXデザイン",
      description:
        "ユーザー中心の設計で、使いやすく美しいインターフェースをデザインします。",
      features: ["プロトタイプ", "ユーザビリティテスト"],
    },
    {
      icon: "ri-refresh-line",
      title: "サイトリニューアル",
      description:
        "既存サイトの課題を解決し、最新のトレンドに対応したサイトへ刷新します。",
      features: ["現状分析", "デザイン刷新"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gray-400 mb-3">
              SERVICES
            </p>
            <h2
              className="text-4xl font-light text-[#111111] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              提供サービス
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto"></div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 80} direction="up">
              <div className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-lg hover:shadow-[#B11226]/10 transition-all duration-300 group">
                <div className="w-14 h-14 flex items-center justify-center bg-[#B11226]/10 rounded-lg mb-6 group-hover:bg-[#B11226] transition-colors">
                  <i
                    className={`${service.icon} text-2xl text-[#B11226] group-hover:text-white transition-colors`}
                  ></i>
                </div>
                <h3 className="text-xl font-medium text-[#111111] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <i className="ri-check-line text-[#B11226]"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      number: "01",
      title: "ヒアリング",
      description:
        "お客様のビジネス目標や課題、ターゲット層などを詳しくお伺いします。",
      duration: "1-2週間",
    },
    {
      number: "02",
      title: "企画・設計",
      description:
        "サイト構成やコンテンツ戦略を策定し、ワイヤーフレームを作成します。",
      duration: "2-3週間",
    },
    {
      number: "03",
      title: "デザイン",
      description:
        "ブランドイメージに合わせた、魅力的なビジュアルデザインを制作します。",
      duration: "2-4週間",
    },
    {
      number: "04",
      title: "開発・実装",
      description:
        "最新技術を用いて、高品質なコーディングとシステム実装を行います。",
      duration: "3-6週間",
    },
    {
      number: "05",
      title: "テスト・検証",
      description:
        "各種ブラウザやデバイスでの動作確認、品質チェックを実施します。",
      duration: "1-2週間",
    },
    {
      number: "06",
      title: "納品・公開 → 運用サポート開始",
      description:
        "サイトを公開後、継続的な運用サポートへ移行。長期的なパートナーとして伴走します。",
      duration: "公開後も継続",
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-white/40 mb-3">
              PROCESS
            </p>
            <h2
              className="text-4xl font-light text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              制作の流れ
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto"></div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 80} direction="up">
              <div
                className={`relative border rounded-xl p-8 hover:shadow-md hover:shadow-[#B11226]/10 transition-all duration-300 ${index === 5 ? "bg-[#B11226]/10 border-[#B11226]/30" : "bg-white/5 border-white/10"}`}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center rounded-full text-sm font-medium text-white bg-[#B11226]">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium text-white mb-3 mt-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <i className="ri-time-line"></i>
                  <span>目安: {step.duration}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-12 text-center">
            <p className="text-sm text-white/40">
              ※ プロジェクトの規模や内容により、期間は変動します。
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "ライトプラン",
      description: "小規模サイトやLPに最適なプラン",
      features: [
        "3ページまで",
        "レスポンシブデザイン",
        "運用サポートオプションあり",
      ],
      recommended: false,
    },
    {
      name: "スタンダードプラン",
      description: "コーポレートサイトに最適なプラン",
      features: ["5ページまで", "レスポンシブデザイン", "継続運用サポート対応"],
      recommended: true,
    },
    {
      name: "プレミアムプラン",
      description: "大規模サイト・フルカスタム向けプラン",
      features: [
        "10ページまで（それ以上は要相談）",
        "レスポンシブデザイン",
        "API連携",
        "専任担当による継続運用サポート",
        "優先対応",
      ],
      recommended: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-4">
            <p className="text-xs tracking-widest text-gray-400 mb-3">
              PRICING
            </p>
            <h2
              className="text-4xl font-light text-[#111111] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              料金プラン
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto mb-6"></div>
            <p className="text-sm text-gray-500">
              料金はプロジェクト内容により異なります。まずはお気軽にご相談ください。
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 100} direction="up">
              <div
                className={`relative flex flex-col ${plan.recommended ? "bg-[#B11226]/5 border-2 border-[#B11226]" : "bg-white border border-gray-100"} rounded-xl p-8 hover:shadow-lg hover:shadow-[#B11226]/10 transition-all duration-300`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B11226] text-white px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                    おすすめ
                  </div>
                )}
                <h3 className="text-2xl font-medium text-[#111111] mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span
                    className="text-3xl font-light text-[#111111]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    お問い合わせ
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    ※ 内容に応じてお見積もりいたします
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <i className="ri-check-line text-[#B11226] mt-0.5"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`block w-full text-center ${plan.recommended ? "bg-[#B11226] hover:bg-[#8f0e1e] text-white" : "bg-white hover:bg-gray-50 text-[#111111] border border-gray-200"} px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer`}
                >
                  無料相談・お見積もり
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#111111]">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest text-white/40 mb-3">
              CONTACT
            </p>
            <h2
              className="text-4xl font-light text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              お問い合わせ
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto mb-6"></div>
            <p className="text-base text-white/60 leading-relaxed">
              Webサイト制作に関するご相談は、お気軽にメールにてお問い合わせください。
              <br />
              無料でお見積もりいたします。
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-[#B11226]/20 rounded-full">
              <i className="ri-mail-line text-3xl text-[#B11226]"></i>
            </div>
            <div>
              <p className="text-sm text-white/50 mb-2 tracking-widest">
                EMAIL
              </p>
              <a
                href="mailto:mail2tatsu@gmail.com"
                className="text-xl text-white hover:text-[#B11226] transition-colors cursor-pointer"
              >
                mail2tatsu@gmail.com
              </a>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-md">
              件名に「Web制作のご相談」とご記入の上、
              <br />
              ご要望・ご予算・ご希望の納期などをお知らせください。
              <br />
              通常2営業日以内にご返信いたします。
            </p>
            <a
              href="mailto:mail2tatsu@gmail.com"
              className="inline-block bg-[#B11226] hover:bg-[#8f0e1e] text-white px-10 py-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              メールで相談する
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function WebProduction() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SectionDivider fromColor="#ffffff" toColor="#ffffff" flip />
      <Support />
      <SectionDivider fromColor="#ffffff" toColor="#f9fafb" flip />
      <Services />
      <SectionDivider fromColor="#f9fafb" toColor="#111111" />
      <Process />
      <SectionDivider fromColor="#111111" toColor="#ffffff" flip />
      <Pricing />
      <SectionDivider fromColor="#ffffff" toColor="#111111" />
      <Contact />
      <SectionDivider fromColor="#111111" toColor="#0a0a0a" />
      <Footer />
    </div>
  );
}
