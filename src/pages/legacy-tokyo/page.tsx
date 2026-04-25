import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Attractive from "../home/components/Attractive";
import Overview from "../home/components/Overview";
import Achievements from "../home/components/Achievements";
import OrganizerMessage from "./components/OrganizerMessage";
import NextEvent from "../home/components/NextEvent";
import LineGroup from "../home/components/LineGroup";
import Footer from "../home/components/Footer";
import SectionDivider from "../../components/feature/SectionDivider";
import ScrollReveal from "../../components/base/ScrollReveal";

// ─────────────────────────────────────────
// スプレッドシート設定
// ─────────────────────────────────────────
const SHEET_ID = "1WV6lhja1UdHAouGP9Z-QPeTJmaFJDHOudfp7yRamNFA";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

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

// データがない場合のフォールバック表示
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
// TokyoSponsor（既存のまま）
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
type Achievement = {
  title: string;
  date: string;
  visitors: string;
  description: string;
  image: string;
};

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

        // データがあればスプレッドシートのデータを使用、なければフォールバックのまま
        if (data.length > 0) {
          setAchievements(data);
        }
      })
      .catch(() => {
        // エラー時もフォールバック表示のまま（エラー表示はしない）
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
        <NextEvent
          sectionNumber="05"
          femaleTicketUrl="https://buy.stripe.com/8x228r8UBe7C6yx9cZao805"
          maleTicketUrl="https://buy.stripe.com/bJecN58UBe7C1edbl7ao806"
          eventName="Legacy Tokyo"
          eventDate="2024.04.18"
          eventDay="Saturday"
          eventTime="18:00 - 21:00"
          eventVenue="グレイドパーク恵比寿"
          eventTicket="お一人様：男性5000円　女性3000円"
          eventNote="事前支払いは以下まで。※当日はメールアドレス宛に送信されるPDFを受付スタッフにお見せください。"
          eventImage="https://static.readdy.ai/image/0c61843cac5595a4ea86012b4ca98e8d/7f98b9a5975bd1be0d1fe09e4fac953a.jpeg"
        />
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
