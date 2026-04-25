import { useState, useEffect } from "react";
import ScrollReveal from "../../../components/base/ScrollReveal";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1oyZyLDeJEQID1r9ocz-fVv3_t72zbkUxtZwWStiB0w8/export?format=csv&gid=0";

const snsConfig = [
  {
    name: "Instagram",
    icon: "ri-instagram-line",
    url: "https://www.instagram.com/kenshiro_newyorkyolo?igsh=MWtwNnp3ZTR2amFlNw==",
    color: "from-[#B11226] to-[#7a0c1a]",
    instagramHover: true,
  },
  {
    name: "TikTok",
    icon: "ri-tiktok-line",
    url: "https://www.tiktok.com/@newyork.yolo?_r=1&_t=ZS-94FU1wLa7Ns",
    color: "from-[#111111] to-[#2a2a2a]",
    instagramHover: false,
  },
  {
    name: "YouTube",
    icon: "ri-youtube-line",
    url: "https://youtube.com/@newyorkyolo?si=ufp0wQGBsGLDbMi4",
    color: "from-[#B11226] to-[#8b0e1e]",
    instagramHover: false,
  },
  {
    name: "Threads",
    icon: "ri-threads-line",
    url: "https://www.threads.com/@kenshiro_newyorkyolo?xmt=AQF0S_ulb3Yl3qfO3BFKab5W3Zt32uyZ7j7SiQ63RWKF0nU",
    color: "from-[#111111] to-[#2a2a2a]",
    instagramHover: false,
  },
];

export default function SNSSection() {
  const [followers, setFollowers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.trim().split("\n").slice(1);
        const data: Record<string, string> = {};
        lines.forEach((line) => {
          const [sns, count] = line.split(",");
          if (sns && count) {
            data[sns.trim()] = count.trim();
          }
        });
        setFollowers(data);
      })
      .catch((e) => {
        console.error("スプレッドシートの取得に失敗しました", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="sns" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-start gap-8 mb-8">
              <p
                className="text-6xl font-light text-gray-100"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                03
              </p>
              <div>
                <h3 className="text-xs tracking-widest text-gray-400 mb-3">
                  SOCIAL MEDIA
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-[#B11226]"></div>
                  <h2
                    className="text-2xl font-light text-[#111111]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    SNS
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-8">
          {snsConfig.map((sns, index) => (
            <ScrollReveal key={index} delay={index * 120} direction="up">
              <a
                href={sns.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer block"
              >
                {sns.instagramHover ? (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
                    }}
                  ></div>
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${sns.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                )}
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-white/20 transition-colors">
                    <i
                      className={`${sns.icon} text-3xl text-[#111111] group-hover:text-white transition-colors`}
                    ></i>
                  </div>
                  <h3
                    className="text-xl font-medium mb-2 text-[#111111] group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {sns.name}
                  </h3>
                  <p className="text-lg font-semibold text-[#B11226] group-hover:text-white transition-colors mb-1">
                    {loading ? "..." : (followers[sns.name] ?? "-")}
                  </p>
                  <p className="text-xs text-gray-400 group-hover:text-white/70 transition-colors">
                    followers
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
