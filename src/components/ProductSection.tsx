import { motion } from "framer-motion";
import ScentPyramid from "./ScentPyramid";
import PerformanceCard from "./PerformanceCard";
import { Button } from "@/components/ui/button";

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  notes: { level: "Top" | "Heart" | "Base"; ingredients: string[] }[];
  longevity: string;
  sillage: string;
  reversed?: boolean;
  onBuyNow: () => void;
}

const ProductSection = ({
  id,
  title,
  subtitle,
  description,
  image,
  price,
  notes,
  longevity,
  sillage,
  reversed = false,
  onBuyNow,
}: ProductSectionProps) => {
  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${reversed ? "lg:grid-flow-col-dense" : ""}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`${reversed ? "lg:col-start-2" : ""}`}
          >
            <div className="relative aspect-[3/4] bg-secondary/50 flex items-center justify-center overflow-hidden">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-gold/20" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${reversed ? "lg:col-start-1" : ""}`}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">{subtitle}</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              {description}
            </p>
            
            <div className="space-y-8 mb-10">
              <ScentPyramid notes={notes} />
              <PerformanceCard longevity={longevity} sillage={sillage} />
            </div>

            <div className="flex items-center gap-6">
              <span className="font-serif text-3xl">{price}</span>
              <Button variant="luxury" size="lg" onClick={onBuyNow}>
                Buy Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
