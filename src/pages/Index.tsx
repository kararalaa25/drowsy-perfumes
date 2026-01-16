import { useState } from "react";
import Hero from "@/components/Hero";
import HeroSlider from "@/components/HeroSlider";
import ProductSection from "@/components/ProductSection";
import CheckoutDrawer from "@/components/CheckoutDrawer";
import Footer from "@/components/Footer";
import perfumeFemme from "@/assets/perfume-femme.png";
import perfumeHomme from "@/assets/perfume-homme.png";

// IMPORTANT: Replace this with the owner's WhatsApp number (with country code, no + or spaces)
const OWNER_PHONE = "1234567890";

const products = {
  femme: {
    id: "femme",
    title: "Fleur de Nuit",
    subtitle: "Pour Femme — The Feminine",
    description: "An enchanting floral symphony that captures the essence of midnight blooms. Delicate yet commanding, this fragrance weaves together rare petals with an intoxicating warmth that lingers like a whispered promise.",
    image: perfumeFemme,
    price: "$185",
    notes: [
      { level: "Top" as const, ingredients: ["Bergamot", "Pink Pepper", "Pear"] },
      { level: "Heart" as const, ingredients: ["Rose Absolute", "Jasmine", "Iris"] },
      { level: "Base" as const, ingredients: ["White Musk", "Sandalwood", "Vanilla"] },
    ],
    longevity: "12+ Hours",
    sillage: "Strong",
  },
  homme: {
    id: "homme",
    title: "Bois Sauvage",
    subtitle: "Pour Homme — The Masculine",
    description: "A bold exploration of untamed forests and ancient woods. This commanding scent balances raw power with refined elegance, evoking the spirit of a modern gentleman who walks his own path.",
    image: perfumeHomme,
    price: "$185",
    notes: [
      { level: "Top" as const, ingredients: ["Black Pepper", "Cardamom", "Grapefruit"] },
      { level: "Heart" as const, ingredients: ["Oud", "Leather", "Geranium"] },
      { level: "Base" as const, ingredients: ["Amber", "Vetiver", "Cedarwood"] },
    ],
    longevity: "12+ Hours",
    sillage: "Strong",
  },
};

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products.femme | null>(null);

  const handleBuyNow = (product: typeof products.femme) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <HeroSlider />
      <div id="products">
        <ProductSection
          {...products.femme}
          onBuyNow={() => handleBuyNow(products.femme)}
        />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-border" />
        </div>
        
        <ProductSection
          {...products.homme}
          reversed
          onBuyNow={() => handleBuyNow(products.homme)}
        />
      </div>
      
      <Footer />

      <CheckoutDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        productName={selectedProduct?.title || ""}
        productPrice={selectedProduct?.price || ""}
        ownerPhone={OWNER_PHONE}
      />
    </div>
  );
};

export default Index;
