import { motion } from "framer-motion";
import { Clock, Wind } from "lucide-react";

interface PerformanceCardProps {
  longevity: string;
  sillage: string;
}

const PerformanceCard = ({ longevity, sillage }: PerformanceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border border-border p-6 bg-secondary/30"
    >
      <h4 className="font-serif text-lg mb-6">Performance</h4>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-gold/50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Longevity</p>
            <p className="font-serif text-lg">{longevity}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-gold/50 flex items-center justify-center">
            <Wind className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Sillage</p>
            <p className="font-serif text-lg">{sillage}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceCard;
