import { useEffect, useState } from "react";
import ScrollReveal from "../../../components/base/ScrollReveal";

// ─────────────────────────────────────────
// スプレッドシート設定
// ─────────────────────────────────────────
const SPONSOR_SHEET_ID = "1Si-fRHU_StWLPNKmqb9D-PU8RpR54aEOXG56jZHF3UA";
const SPONSOR_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPONSOR_SHEET_ID}/export?format=csv`;

// ─────────────────────────────────────────
// CSVパーサー
// ─────────────────────────────────────────
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
// 型定義
// ─────────────────────────────────────────
type Sponsor = {
  name: string;
};

export default function Sponsor() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SPONSOR_CSV_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("スポンサー情報の取得に失敗しました");
        }
        return res.text();
      })
      .then((csv) => {
        const rows = parseCSV(csv);

        const data: Sponsor[] = rows
          .filter(
            (row) => row["スポンサー名"] && row["スポンサー名"].trim() !== "",
          )
          .map((row) => ({
            // 「様」がシートに含まれている場合は重複防止のため除去
            name: row["スポンサー名"].replace(/様$/, "").trim(),
          }));

        setSponsors(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

        {loading ? (
          <div className="text-center mb-12">
            <p className="text-white/40 text-sm">読み込み中...</p>
          </div>
        ) : (
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
        )}

        <ScrollReveal delay={200}>
          <div className="text-center">
            <p className="text-sm text-white/50 mb-4">
              スポンサーシップに関するお問い合わせ
            </p>

            <a
              href="mailto:mail2tatsu8@gmail.com"
              className="inline-flex items-center gap-2 text-white/70 hover:text-[#B11226] transition-colors cursor-pointer"
            >
              <i className="ri-mail-line"></i>
              <span>mail2tatsu8@gmail.com</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
