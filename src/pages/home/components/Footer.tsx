import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        });
      }, 0);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* ロゴ */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span
                className="text-2xl font-bold tracking-wider"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                NewYork YOLO
              </span>
            </Link>

            <p className="text-sm text-white/50 mb-6">
              Creating unforgettable experiences
              <br />
              from New York to the world.
            </p>

            {/* SNS */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/kenshiro_newyorkyolo?igsh=MWtwNnp3ZTR2amFlNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B11226] flex items-center justify-center transition-colors"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>

              <a
                href="https://www.tiktok.com/@newyork.yolo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B11226] flex items-center justify-center transition-colors"
              >
                <i className="ri-tiktok-line text-xl"></i>
              </a>

              <a
                href="https://youtube.com/@newyorkyolo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B11226] flex items-center justify-center transition-colors"
              >
                <i className="ri-youtube-line text-xl"></i>
              </a>

              <a
                href="https://www.threads.com/@kenshiro_newyorkyolo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B11226] flex items-center justify-center transition-colors"
              >
                <i className="ri-threads-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* メニュー */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/80">
              NewYork YOLO
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              {[
                { id: "announcement", label: "お知らせ" },
                { id: "what-is-legacy", label: "What is NewYork YOLO" },
                { id: "philosophy", label: "理念" },
                { id: "business", label: "事業内容" },
                { id: "members", label: "メンバー" },
              ].map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="hover:text-[#B11226]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ページリンク */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/80">交流会</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link to="/legacy-newyork">Legacy NewYork</Link>
              </li>
              <li>
                <Link to="/legacy-tokyo">Legacy Tokyo</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-white/80">Web制作</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link to="/web-production">Web制作サービス</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* フッター下 */}
        <div className="border-t border-white/10 pt-8 flex justify-between text-sm text-white/30">
          <p>©︎ NewYork YOLO 2024</p>

          <div className="flex gap-6">
            <Link to="/tokushoho">特定商取引法に基づく表記</Link>

            <a
              href="https://readdy.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built by NewYorkYOLO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
