import HeroSection from "../../components/sections/HeroSection";
import FeatureSection from "../../components/sections/FeatureSection";
import NewsSection from "../../components/sections/NewsSection";
import SupportSection from "../../components/sections/SupportSection";
import ContactSection from "../../components/sections/ContactSection";
import Seo from "../../seo/Seo";

export default function LandingPage() {
  return (
    <main>
      <Seo
        title="Trang chu | ZWCAD Vietnam"
        description="Phan phoi phan mem ZWCAD tai Viet Nam, giai phap CAD cho doanh nghiep."
        keywords="zwcad vietnam, phan mem cad, focustech"
      />
      <HeroSection />
      <FeatureSection />
      <NewsSection />
      <SupportSection />
      <ContactSection />
    </main>
  );
}
