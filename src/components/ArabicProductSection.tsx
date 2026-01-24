import { motion } from "framer-motion";
import ArabicScentPyramid from "./ArabicScentPyramid";
import PurchaseButton from "./PurchaseButton";

interface Note {
  level: "Top" | "Heart" | "Base";
  arabicLabel: string;
  ingredients: string;
}

interface ArabicProductSectionProps {
  id: string;
  titleArabic: string;
  titleEnglish: string;
  notes: Note[];
  isSticky?: boolean;
}

const ArabicProductSection = ({
  id,
  titleArabic,
  titleEnglish,
  notes,
  isSticky = false,
}: ArabicProductSectionProps) => {
  return (
    <section id={id} className="py-20 px-4 md:px-6" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-arabic text-4xl md:text-5xl font-bold text-foreground mb-3">
            {titleArabic}
          </h2>
          <p className="font-serif text-xl text-gold tracking-[0.2em] uppercase">
            {titleEnglish}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card/60 backdrop-blur-sm p-8 md:p-10 border border-border shadow-sm mb-10"
        >
          <ArabicScentPyramid notes={notes} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <PurchaseButton productName={titleArabic} isSticky={isSticky} />
        </motion.div>
      </div>
    </section>
  );
};

export default ArabicProductSection;
