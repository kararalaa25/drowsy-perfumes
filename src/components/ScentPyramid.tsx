import { motion } from "framer-motion";

interface Note {
  level: "Top" | "Heart" | "Base";
  ingredients: string[];
}

interface ScentPyramidProps {
  notes: Note[];
}

const ScentPyramid = ({ notes }: ScentPyramidProps) => {
  const levelStyles = {
    Top: "bg-gold/10",
    Heart: "bg-gold/20",
    Base: "bg-gold/30",
  };

  return (
    <div className="space-y-4">
      <h4 className="font-serif text-lg mb-6">Scent Pyramid</h4>
      <div className="flex flex-col items-center gap-3">
        {notes.map((note, index) => (
          <motion.div
            key={note.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className={`
              ${levelStyles[note.level]}
              ${note.level === "Top" ? "w-32" : note.level === "Heart" ? "w-48" : "w-64"}
              py-4 px-6 text-center border border-gold/30
            `}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              {note.level} Notes
            </p>
            <p className="font-serif text-sm">
              {note.ingredients.join(" · ")}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScentPyramid;
