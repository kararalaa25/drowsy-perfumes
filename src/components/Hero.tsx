import { motion } from "framer-motion";

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("elite-section");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 border border-gold/10 rounded-full opacity-40" />
      <div className="absolute bottom-40 right-20 w-56 h-56 border border-gold/5 rounded-full opacity-30" />
      <div className="absolute top-1/3 right-10 w-24 h-24 border border-border rounded-full opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm tracking-[0.4em] uppercase text-muted-foreground mb-8 font-light"
        >
          عطور فاخرة
        </motion.p>
        
        <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight mb-8 text-foreground">
          Dropsy
        </h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-32 h-px bg-gold mx-auto mb-10"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-arabic text-xl md:text-2xl text-charcoal-light mb-14 leading-relaxed"
        >
          حيث يصبح العطر فناً للحياة
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          onClick={scrollToProducts}
          className="group relative px-12 py-5 bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10 text-sm tracking-[0.25em] uppercase font-medium">
            اكتشف العطور
          </span>
        </motion.button>
      </motion.div>
      
      {/* Bottom decorative line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
