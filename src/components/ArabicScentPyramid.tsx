import { motion } from "framer-motion";
import { Droplets, Heart, Mountain } from "lucide-react";

interface Note {
  level: "Top" | "Heart" | "Base";
  arabicLabel: string;
  ingredients: string;
}

interface ArabicScentPyramidProps {
  notes: Note[];
}

const levelIcons = {
  Top: Droplets,
  Heart: Heart,
  Base: Mountain,
};

const levelStyles = {
  Top: "border-gold/40 bg-gradient-to-r from-gold/5 to-gold/10",
  Heart: "border-gold/50 bg-gradient-to-r from-gold/10 to-gold/15",
  Base: "border-gold/60 bg-gradient-to-r from-gold/15 to-gold/20",
};

const ArabicScentPyramid = ({ notes }: ArabicScentPyramidProps) => {
  return (
    <div className="space-y-4" dir="rtl">
      <h4 className="font-arabic text-xl font-semibold mb-6 text-foreground">
        هرم العطر
      </h4>
      <div className="flex flex-col gap-4">
        {notes.map((note, index) => {
          const Icon = levelIcons[note.level];
          return (
            <motion.div
              key={note.level}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className={`
                ${levelStyles[note.level]}
                p-5 rounded-lg border backdrop-blur-sm
              `}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gold/20">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-arabic font-semibold text-gold mb-2">
                    {note.arabicLabel}
                  </p>
                  <p className="font-arabic text-sm leading-relaxed text-muted-foreground">
                    {note.ingredients}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ArabicScentPyramid;
