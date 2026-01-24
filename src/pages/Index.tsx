import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import FemmeSlider from "@/components/FemmeSlider";
import ArabicProductSection from "@/components/ArabicProductSection";
import Footer from "@/components/Footer";

// Arabic product data
const eliteNotes = [
  {
    level: "Top" as const,
    arabicLabel: "المكونات الافتتاحية",
    ingredients: "جوز الطيب، القرفة، الهيل، الجريب فروت",
  },
  {
    level: "Heart" as const,
    arabicLabel: "قلب العطر",
    ingredients: "الخزامى",
  },
  {
    level: "Base" as const,
    arabicLabel: "المكونات الأساسية",
    ingredients: "عرق سوس، خشب الصندل، العنبر، الباتشولي، نجيل الهند من هايتي",
  },
];

const eiveNotes = [
  {
    level: "Top" as const,
    arabicLabel: "المكونات الافتتاحية",
    ingredients: "فراولة، توت الأحمر، توت العليق الأسود، الكرز الحامض، الكشمش الأسود، الماندرين، الليمون",
  },
  {
    level: "Heart" as const,
    arabicLabel: "قلب العطر",
    ingredients: "ورد البنفسج، ورد الياسمين",
  },
  {
    level: "Base" as const,
    arabicLabel: "المكونات الأساسية",
    ingredients: "المسك، الفانيليا، أخشاب الكشمير، الأخشاب، العنبر، الباتشولي، طحلب البلوط",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Hero />
      
      {/* Elite (Pour Homme) Section */}
      <div id="elite-section">
        <HeroSlider />
        <ArabicProductSection
          id="elite"
          titleArabic="إيليت"
          titleEnglish="Elite"
          notes={eliteNotes}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* Eive (Pour Femme) Section */}
      <div id="eive-section">
        <FemmeSlider />
        <ArabicProductSection
          id="eive"
          titleArabic="إيف"
          titleEnglish="Eive"
          notes={eiveNotes}
          isSticky={true}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
