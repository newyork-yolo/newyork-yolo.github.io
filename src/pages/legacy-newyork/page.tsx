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
import Sponsor from "../home/components/Sponsor";

// ─────────────────────────────────────────
// スプレッドシート設定（実績）
// ─────────────────────────────────────────
const SHEET_ID = "1oJPixIQRn56692zyPXhmEBOPmITLqJ99C-EM15dRtC8";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// NEXT開催スプレッドシート
const NEXT_EVENT_SHEET_ID = "18BJT5j5KO7aljGzxGz8aU_9ER42PW_-O5T2990kFNQA";
const NEXT_EVENT_CSV_URL = `https://docs.google.com/spreadsheets/d/${NEXT_EVENT_SHEET_ID}/export?format=csv`;

// 概要スプレッドシート
const OVERVIEW_SHEET_ID = "1w3SOZabo05W23k_reJiV_hvGnEk5vNluCIuff6YVscQ";
const OVERVIEW_CSV_URL = `https://docs.google.com/spreadsheets/d/${OVERVIEW_SHEET_ID}/export?format=csv`;

// ─────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────
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

  const headers = parseRow(lines[0] || "");

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

type OverviewItem = {
  label: string;
  value: string;
};

function NYNextEvent({ sectionNumber = "05" }: { sectionNumber?: string }) {
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
          venue: row["VENUE"] ?? row["VANUE"] ?? "",
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

  const isValidUrl = (url: string) => {
    return url && url.trim() !== "" && url.trim() !== "-";
  };

  const isWomenPaymentActive = isValidUrl(event.paymentWomensUrl);
  const isMenPaymentActive = isValidUrl(event.paymentMensUrl);

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
                  <div className="w-12 h-px bg-[#B11226]" />
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
                src={event.image || "/fallback.jpg"}
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

              <div className="flex flex-col gap-3">
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

export default function LegacyNewYork() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [overviewItems, setOverviewItems] = useState<OverviewItem[]>([]);
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

    fetch(OVERVIEW_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then((csv) => {
        const rows = parseCSV(csv);
        if (rows.length === 0) return;

        const row = rows[0];

        setOverviewItems([
          { label: "団体名", value: row["団体名"] ?? "" },
          { label: "設立", value: row["設立"] ?? "" },
          { label: "拠点", value: row["拠点"] ?? "" },
          { label: "活動内容", value: row["活動内容"] ?? "" },
          { label: "参加者規模", value: row["参加者規模"] ?? "" },
        ]);
      })
      .catch(() => {
        // noop
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
      <Overview sectionNumber="02" items={overviewItems} />
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
      <Sponsor />
      <SectionDivider fromColor="#111111" toColor="#0a0a0a" />
      <Footer />
    </div>
  );
}
