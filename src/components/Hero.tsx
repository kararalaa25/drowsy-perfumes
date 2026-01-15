import { motion } from "framer-motion";

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full opacity-50" />
      <div className="absolute bottom-40 right-20 w-48 h-48 border border-gold/10 rounded-full opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          Maison de Parfum • Paris
        </motion.p>
        
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight mb-6">
          L'Essence
        </h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-24 h-px bg-gold mx-auto mb-8"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-serif text-xl md:text-2xl italic text-charcoal-light mb-12"
        >
          Where fragrance becomes an art of living
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={scrollToProducts}
          className="group relative px-10 py-4 border border-primary bg-transparent hover:bg-primary transition-all duration-500"
        >
          <span className="relative z-10 text-sm tracking-[0.2em] uppercase group-hover:text-primary-foreground transition-colors duration-500">
            Discover the Duo
          </span>
        </motion.button>
      </motion.div>
      
      {/* Bottom decorative line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
