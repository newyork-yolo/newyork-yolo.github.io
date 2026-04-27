import { useState, useEffect, useCallback, useRef } from "react";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1XO-0PMtJ9g6aLIeFIBEhJvknQM-fcfzAqtZapWQQMcU/export?format=csv&gid=0";

type SlideItem =
  | { type: "youtube"; videoId: string }
  | { type: "image"; url: string; name: string };

function getFileId(driveUrl: string): string {
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : "";
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.trim().split("\n").slice(1);
        const items: SlideItem[] = [];
        lines.forEach((line) => {
          const parts = line.split(",");
          if (parts.length < 3) return;
          const name = parts[0].trim();
          const contentType = parts[1].trim().toLowerCase();
          const value = parts.slice(2).join(",").trim(); // URLにカンマが含まれる場合の対策

          if (contentType === "video") {
            items.push({ type: "youtube", videoId: value });
          } else if (contentType === "image") {
            const fileId = getFileId(value);
            const imageUrl = fileId
              ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`
              : value;
            items.push({ type: "image", url: imageUrl, name });
          }
        });
        setSlides(items);
      })
      .catch((e) => {
        console.error("スプレッドシートの取得に失敗しました", e);
      });
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    if (slides.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
  }, [stopAutoPlay, slides.length]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning],
  );

  if (slides.length === 0) {
    return (
      <section id="hero" className="relative h-screen w-full bg-[#111111]" />
    );
  }

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-transform duration-[800ms] ease-in-out"
          style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
        >
          {slide.type === "youtube" ? (
            <div className="relative w-full h-full overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=1&loop=1&playlist=${slide.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                title={`YouTube video ${slide.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "177.78vh",
                  height: "100vh",
                  minWidth: "100%",
                  minHeight: "56.25vw",
                  transform: "translate(-50%, -50%)",
                  border: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
          ) : (
            <img
              src={slide.url}
              alt={slide.name}
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-[#111111]/30 to-[#111111]/70 z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
        <div className="text-center w-full">
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wider mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            NewYork YOLO
          </h1>
          <div className="w-24 h-px bg-[#B11226] mx-auto my-6" />
          <p className="text-lg md:text-2xl font-light tracking-wider text-white/80 mt-2">
            人生一度きり。挑戦の連鎖を。
          </p>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center">
          <p className="text-xs tracking-widest mb-3 text-white/70">Scroll</p>
          <div className="w-px h-16 bg-white/40" />
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex ? "bg-[#B11226] w-8" : "bg-white/40 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
