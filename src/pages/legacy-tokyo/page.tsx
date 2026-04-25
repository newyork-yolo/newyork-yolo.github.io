import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Attractive from "../home/components/Attractive";
import Overview from "../home/components/Overview";
import Achievements from "../home/components/Achievements";
import OrganizerMessage from "./components/OrganizerMessage";
import LineGroup from "../home/components/LineGroup";
import Footer from "../home/components/Footer";
import SectionDivider from "../../components/feature/SectionDivider";
import ScrollReveal from "../../components/base/ScrollReveal";

// ─────────────────────────────────────────
// スプレッドシート設定（実績）
// ─────────────────────────────────────────
const SHEET_ID = "1WV6lhja1UdHAouGP9Z-QPeTJmaFJDHOudfp7yRamNFA";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// NEXT開催スプレッドシート
const NEXT_EVENT_SHEET_ID = "1HpGF3dS7y6zosBtUFuKbeIzi_67M159om5DEtIefV3w";
const NEXT_EVENT_CSV_URL = `https://docs.google.com/spreadsheets/d/${NEXT_EVENT_SHEET_ID}/export?format=csv`;

function toDriveImageUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)\//);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
  return url;
}

function parseCSV(csv: string): Record<string, string>[] {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "\n" && !inQuotes) {
      lines.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  if (current) lines.push(current);

  const parseRow = (line: string): string[] => {
    const cells: string[] = [];
    let cell = "";
    let inQ = false;
    for (const char of line) {
      if (char === '"') {
        inQ = !inQ;
      } else if (char === "," && !inQ) {
        cells.push(cell.trim());
        cell = "";
      } else {
        cell += char;
      }
    }
    cells.push(cell.trim());
    return cells;
  };

  const headers = parseRow(lines[0]);
  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = parseRow(line);
      return headers.reduce(
        (obj, header, i) => {
          obj[header] = values[i] ?? "";
          return obj;
        },
        {} as Record<string, string>,
      );
    });
}

// ─────────────────────────────────────────
// 固定データ
// ─────────────────────────────────────────
const tokyoAttractivePoints = [
  {
    title: "Premium Venue",
    description:
      "東京都心部にある厳選された会場で、特別な空間体験を提供します。",
    image:
      "https://readdy.ai/api/search-image?query=Luxurious%20event%20venue%20in%20central%20Tokyo%20with%20elegant%20interior%20design%20warm%20ambient%20lighting%20sophisticated%20atmosphere%20premium%20party%20space%20modern%20Japanese%20aesthetic&width=400&height=300&seq=tk-venue-1&orientation=landscape",
  },
  {
    title: "Global Network",
    description:
      "東京で働かれる多業界の方々やインフルエンサーの方々等とここでしか生まれない出会いを提供。",
    image:
      "https://readdy.ai/api/search-image?query=Diverse%20group%20of%20stylish%20young%20professionals%20networking%20at%20upscale%20cocktail%20party%20warm%20ambient%20lighting%20elegant%20venue%20champagne%20glasses%20sophisticated%20conversation%20no%20faces%20visible%20silhouettes&width=400&height=300&seq=tk-network-noface-1&orientation=landscape",
  },
  {
    title: "Exclusive Experience",
    description:
      "細部までこだわり抜いた演出で、忘れられない一夜を創り上げます。",
    image:
      "https://readdy.ai/api/search-image?query=Exclusive%20VIP%20lounge%20area%20Tokyo%20with%20premium%20bottle%20service%20elegant%20decor%20soft%20ambient%20lighting%20velvet%20seating%20crystal%20glasses%20sophisticated%20nightlife%20experience&width=400&height=300&seq=tk-exp-1&orientation=landscape",
  },
];

const tokyoOverviewItems = [
  { label: "団体名", value: "Legacy Tokyo" },
  { label: "設立", value: "2026年" },
  { label: "拠点", value: "Tokyo, Japan" },
  { label: "活動内容", value: "イベントプロデュース・空間デザイン" },
  { label: "参加者規模", value: "80名〜150名" },
];

const tokyoAchievementsFallback = [
  {
    title: "Coming Soon",
    date: "",
    visitors: "",
    description: "初回イベントに向けて準備中です。お楽しみに。",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20Tokyo%20event%20venue%20preparation%20stylish%20interior%20design%20warm%20lighting%20sophisticated%20atmosphere%20modern%20Japanese%20aesthetic%20coming%20soon&width=800&height=500&seq=tk-cs-1&orientation=landscape",
  },
];

// ─────────────────────────────────────────
// 型定義
// ─────────────────────────────────────────
type Achievement = {
  title: string;
  date: string;
  visitors: string;
  description: string;
  image: string;
};

type NextEvent = {
  eventName: string;
  date: string;
  time: string;
  venue: string;
  ticket: string;
  ticketComment: string;
  paymentWomensUrl: string;
  paymentWomensComment: string;
  paymentMensUrl: string;
  paymentMensComment: string;
  image: string;
};

// ─────────────────────────────────────────
// TokyoNextEvent（スプレッドシートから動的取得）
// ─────────────────────────────────────────
function TokyoNextEvent({ sectionNumber = "05" }: { sectionNumber?: string }) {
  const [event, setEvent] = useState<NextEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(NEXT_EVENT_CSV_URL)
      .then((res) => res.text())
      .then((csv) => {
        const rows = parseCSV(csv);
        if (rows.length === 0) return;
        const row = rows[0];
        setEvent({
          eventName: row["EVENT NAME"] ?? "",
          date: row["DATE"] ?? "",
          time: row["TIME"] ?? "",
          venue: row["VANUE"] ?? "",
          ticket: row["TICKET"] ?? "",
          ticketComment: row["TICKET COMMENT"] ?? "",
          paymentWomensUrl: row["payment_womens_url"] ?? "",
          paymentWomensComment: row["payment_womens_comment"] ?? "",
          paymentMensUrl: row["payment_mens_url"] ?? "",
          paymentMensComment: row["payment_mens_comment"] ?? "",
          image: toDriveImageUrl(row["image"] ?? ""),
        });
      })
      .catch((e) => {
        console.error("NEXT開催データの取得に失敗しました", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="next-event" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">読み込み中...</p>
        </div>
      </section>
    );
  }
  // TokyoNextEvent の return の直前（if (!event) の下あたり）に追加

  const isValidUrl = (url: string) => {
    return url && url.trim() !== "" && url.trim() !== "-";
  };

  const isWomenPaymentActive = isValidUrl(event.paymentWomensUrl);
  const isMenPaymentActive = isValidUrl(event.paymentMensUrl);

  if (!event) {
    return (
      <section id="next-event" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            イベント情報を取得できませんでした。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="next-event" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-start gap-8 mb-8">
              <p
                className="text-6xl font-light text-gray-100"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {sectionNumber}
              </p>
              <div>
                <h3 className="text-xs tracking-widest text-gray-400 mb-3">
                  NEXT EVENT
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-[#B11226]"></div>
                  <h2
                    className="text-2xl font-light text-[#111111]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    NEXT開催
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right" delay={100}>
            <div className="relative">
              <img
                src={event.image}
                alt={event.eventName}
                className="w-full h-[500px] object-contain rounded-lg"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={200}>
            <div className="space-y-8">
              <div>
                <p className="text-xs text-gray-400 mb-2">EVENT NAME</p>
                <h3
                  className="text-2xl font-light text-[#111111]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {event.eventName}
                </h3>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">DATE</p>
                <p
                  className="text-4xl font-light text-[#111111]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {event.date}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">TIME</p>
                <p className="text-lg text-[#111111]">{event.time}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">VENUE</p>
                <p className="text-lg text-[#111111]">{event.venue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">TICKET</p>
                <p className="text-lg text-[#111111]">{event.ticket}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {event.ticketComment}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {/* 女性用 */}
                <a
                  href={
                    isWomenPaymentActive ? event.paymentWomensUrl : undefined
                  }
                  target={isWomenPaymentActive ? "_blank" : undefined}
                  rel={isWomenPaymentActive ? "noopener noreferrer" : undefined}
                  className={`w-full text-center px-8 py-4 text-sm rounded-lg transition-colors ${
                    isWomenPaymentActive
                      ? "bg-[#B11226] text-white hover:bg-[#8b0e1e] cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  {event.paymentWomensComment || "チケット購入（女性）"}
                </a>

                {/* 男性用 */}
                <a
                  href={isMenPaymentActive ? event.paymentMensUrl : undefined}
                  target={isMenPaymentActive ? "_blank" : undefined}
                  rel={isMenPaymentActive ? "noopener noreferrer" : undefined}
                  className={`w-full text-center px-8 py-4 text-sm rounded-lg transition-colors ${
                    isMenPaymentActive
                      ? "bg-[#111111] text-white hover:bg-[#2a2a2a] cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  {event.paymentMensComment || "チケット購入（男性）"}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// TokyoSponsor
// ─────────────────────────────────────────
function TokyoSponsor() {
  return (
    <section id="sponsors" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest text-white/40 mb-3">
              SUPPORTED BY
            </p>
            <h2
              className="text-3xl font-light text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              スポンサー募集中
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto mt-4 mb-8"></div>
            <p className="text-sm text-white/50 mb-4">
              スポンサーシップに関するお問い合わせ
            </p>
            <a
              href="mailto:mail2tatsu@gmail.com"
              className="inline-flex items-center gap-2 text-white/70 hover:text-[#B11226] transition-colors cursor-pointer"
            >
              <i className="ri-mail-line"></i>
              <span>mail2tatsu@gmail.com</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// メインページ
// ─────────────────────────────────────────
export default function LegacyTokyoPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(
    tokyoAchievementsFallback,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then((csv) => {
        const rows = parseCSV(csv);
        const data: Achievement[] = rows
          .filter((row) => row["No"] && row["No"].trim() !== "")
          .map((row) => ({
            title: `#${row["No"]}`,
            date: row["Date"] ?? "",
            visitors: row["number of visitors"]
              ? `来場者数: ${row["number of visitors"]}人`
              : "",
            description: row["comment"] ?? "",
            image: toDriveImageUrl(row["image_url"] ?? ""),
          }));

        if (data.length > 0) {
          setAchievements(data);
        }
      })
      .catch(() => {
        // エラー時もフォールバック表示のまま
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SectionDivider fromColor="#111111" toColor="#ffffff" />
      <div id="attractive">
        <Attractive sectionNumber="01" points={tokyoAttractivePoints} />
      </div>
      <SectionDivider fromColor="#ffffff" toColor="#f9fafb" flip />
      <div id="overview">
        <Overview sectionNumber="02" items={tokyoOverviewItems} />
      </div>
      <SectionDivider fromColor="#f9fafb" toColor="#111111" />
      <div id="achievements">
        {loading ? (
          <div className="bg-[#111111] py-24 text-center">
            <p className="text-white/40 text-sm">読み込み中...</p>
          </div>
        ) : (
          <Achievements sectionNumber="03" achievements={achievements} />
        )}
      </div>
      <SectionDivider fromColor="#111111" toColor="#ffffff" flip />
      <OrganizerMessage sectionNumber="04" />
      <SectionDivider fromColor="#ffffff" toColor="#ffffff" flip />
      <div id="next-event">
        <TokyoNextEvent sectionNumber="05" />
      </div>
      <SectionDivider fromColor="#ffffff" toColor="#06C755" />
      <div id="line-group">
        <LineGroup lineUrl="https://line.me/ti/g/YWD-TPuS-R" />
      </div>
      <SectionDivider fromColor="#06C755" toColor="#111111" flip />
      <TokyoSponsor />
      <SectionDivider fromColor="#111111" toColor="#0a0a0a" />
      <Footer />
    </div>
  );
}
