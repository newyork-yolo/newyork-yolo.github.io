import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import Announcement from "./components/Announcement";
import WhatIsLegacy from "./components/WhatIsLegacy";
import Philosophy from "./components/Philosophy";
import Business from "./components/Business";
import Members from "./components/Members";
import SNSSection from "./components/SNSSection";
import Events from "./components/Events";
import Footer from "./components/Footer";
import SectionDivider from "../../components/feature/SectionDivider";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      {/* hero(dark) → white */}
      <SectionDivider fromColor="#111111" toColor="#ffffff" />
      <Announcement />
      {/* white → gray-50 */}
      <SectionDivider fromColor="#ffffff" toColor="#f9fafb" flip />
      <WhatIsLegacy />
      {/* gray-50 → dark */}
      <SectionDivider fromColor="#f9fafb" toColor="#111111" />
      <Philosophy />
      {/* dark → white */}
      <SectionDivider fromColor="#111111" toColor="#ffffff" flip />
      <Business />
      {/* white → dark */}
      <SectionDivider fromColor="#ffffff" toColor="#111111" />
      <Members />
      {/* dark → white */}
      <SectionDivider fromColor="#111111" toColor="#ffffff" flip />
      <SNSSection />
      {/* white → gray-50 */}
      <SectionDivider fromColor="#ffffff" toColor="#f9fafb" />
      <Events />
      {/* gray-50 → dark footer */}
      <SectionDivider fromColor="#f9fafb" toColor="#0a0a0a" flip />
      <Footer />
    </div>
  );
}
