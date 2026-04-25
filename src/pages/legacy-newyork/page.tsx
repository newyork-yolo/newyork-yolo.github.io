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
const SHEET_ID = "1oJPixIQRn56692zyPXhmEBOPmITLqJ99C-EM15dRtC8";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// NEXT開催スプレッドシート
const NEXT_EVENT_SHEET_ID = "18BJT5j5KO7aljGzxGz8aU_9ER42PW_-O5T2990kFNQA";
const NEXT_EVENT_CSV_URL = `https://docs.google.com/spreadsheets/d/${NEXT_EVENT_SHEET_ID}/export?format=csv`;

// GoogleドライブのURLを画像直接表示用URLに変換
function toDriveImageUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)\//);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
  return url;
}

// CSVパーサー（カンマ・改行を含むセルのダブルクォート囲みに対応）
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
const nyAttractivePoints = [
  {
    title: "Premium Venue",
    description:
      "ニューヨークの一等地にある厳選された会場で、特別な空間体験を提供します。",
    image:
      "https://readdy.ai/api/search-image?query=Luxurious%20rooftop%20venue%20in%20Manhattan%20with%20stunning%20city%20skyline%20view%20elegant%20outdoor%20seating%20warm%20string%20lights%20sophisticated%20atmosphere%20premium%20event%20space%20sunset%20golden%20hour&width=400&height=300&seq=5&orientation=landscape",
  },
  {
    title: "Global Network",
    description:
      "NY駐在員や起業家、インフルエンサー等NYで挑戦されている方々と出会い人生の刺激となる空間をご提供します。",
    image:
      "https://static.readdy.ai/image/0c61843cac5595a4ea86012b4ca98e8d/1bd25d14384aa85850802e0ebdd64662.jpeg",
  },
  {
    title: "Exclusive Experience",
    description:
      "細部までこだわり抜いた演出で、忘れられない一夜を創り上げます。",
    image:
      "https://readdy.ai/api/search-image?query=Exclusive%20VIP%20lounge%20area%20with%20premium%20bottle%20service%20elegant%20decor%20soft%20ambient%20lighting%20velvet%20seating%20crystal%20glasses%20sophisticated%20nightlife%20experience&width=400&height=300&seq=7&orientation=landscape",
  },
];

const nyOverviewItems = [
  { label: "団体名", value: "Legacy New York" },
  { label: "設立", value: "2024年" },
  { label: "拠点", value: "New York, USA" },
  { label: "活動内容", value: "イベントプロデュース・空間デザイン" },
  { label: "参加者", value: "150人〜300人" },
];

// ─────────────────────────────────────────
// 実績の型定義
// ─────────────────────────────────────────
type Achievement = {
  title: string;
  date: string;
  visitors: string;
  description: string;
  image: string;
};

// ─────────────────────────────────────────
// NEXT開催の型定義
// ─────────────────────────────────────────
type NextEvent = {
  eventName: string;
  date: string;
  time: string;
  venue: string;
  ticket: string;
  ticketComment: string;
  paymentWomens: string;
  paymentMens: string;
  image: string;
};

// ─────────────────────────────────────────
// NYNextEvent（スプレッドシートから動的取得）
// ─────────────────────────────────────────
function NYNextEvent({ sectionNumber = "05" }: { sectionNumber?: string }) {
  const [event, setEvent] = useState<NextEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(NEXT_EVENT_CSV_URL)
      .then((res) => res.text())
      .then((csv) => {
        const rows = parseCSV(csv);
        if (rows.length === 0) return;
        const row = rows[0]; // 最新の1行目を使用
        setEvent({
          eventName: row["EVENT NAME"] ?? "",
          date: row["DATE"] ?? "",
          time: row["TIME"] ?? "",
          venue: row["VANUE"] ?? "",
          ticket: row["TICKET"] ?? "",
          ticketComment: row["TICKET COMMENT"] ?? "",
          paymentWomens: row["payment_womens"] ?? "",
          paymentMens: row["payment_mens"] ?? "",
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
                <p className="text-sm text-gray-500">{event.ticketComment}</p>
              </div>
              <button
                disabled
                className="w-full text-center bg-gray-300 text-gray-500 px-8 py-4 text-sm whitespace-nowrap rounded-lg cursor-not-allowed opacity-60"
              >
                {event.paymentWomens}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// NYSponsor（既存のまま）
// ─────────────────────────────────────────
function NYSponsor() {
  const sponsors = [
    { name: "株式会社BentOn" },
    { name: "株式会社HIS USA" },
    { name: "株式会社LINC ORIGINAL MAKERS" },
    { name: "株式会社Sapporo Beer USA" },
    { name: "株式会社SOWAKA" },
    { name: "株式会社Yogibo" },
    { name: "株式会社Iichiko" },
    { name: "株式会社Naxly" },
    { name: "株式会社Sato Shiki Whisky" },
  ];

  return (
    <section id="sponsor" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-white/40 mb-3">
              SUPPORTED BY
            </p>
            <h2
              className="text-3xl font-light text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              交流会スポンサー様
            </h2>
            <div className="w-16 h-px bg-[#B11226] mx-auto mt-4"></div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {sponsors.map((sponsor, index) => (
            <ScrollReveal key={index} delay={index * 60} direction="up">
              <div className="bg-white/5 border border-white/10 hover:border-[#B11226]/40 rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center">
                <p className="text-sm font-medium text-white/80 tracking-wide text-center">
                  {sponsor.name}様
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={200}>
          <div className="text-center">
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
export default function LegacyNewYork() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            visitors: `来場者数: ${row["number of visitors"] ?? ""}人`,
            description: row["comment"] ?? "",
            image: toDriveImageUrl(row["image_url"] ?? ""),
          }));
        setAchievements(data);
      })
      .catch(() => {
        setError("実績データの読み込みに失敗しました。");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const AchievementsPlaceholder = ({ message }: { message: string }) => (
    <div className="bg-[#111111] py-24 text-center">
      <p className="text-white/40 text-sm">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SectionDivider fromColor="#111111" toColor="#ffffff" />
      <Attractive sectionNumber="01" points={nyAttractivePoints} />
      <SectionDivider fromColor="#ffffff" toColor="#f9fafb" flip />
      <Overview sectionNumber="02" items={nyOverviewItems} />
      <SectionDivider fromColor="#f9fafb" toColor="#111111" />

      {loading ? (
        <AchievementsPlaceholder message="読み込み中..." />
      ) : error ? (
        <AchievementsPlaceholder message={error} />
      ) : (
        <Achievements sectionNumber="03" achievements={achievements} />
      )}

      <SectionDivider fromColor="#111111" toColor="#ffffff" flip />
      <OrganizerMessage sectionNumber="04" />
      <SectionDivider fromColor="#ffffff" toColor="#ffffff" flip />
      <NYNextEvent sectionNumber="05" />
      <SectionDivider fromColor="#ffffff" toColor="#06C755" />
      <LineGroup lineUrl="https://line.me/ti/g/VrhAFUvADx" />
      <SectionDivider fromColor="#06C755" toColor="#111111" flip />
      <NYSponsor />
      <SectionDivider fromColor="#111111" toColor="#0a0a0a" />
      <Footer />
    </div>
  );
}
