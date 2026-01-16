import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.png";
import heroSlide4 from "@/assets/hero-slide-4.png";

const slides = [
  { id: 1, src: heroSlide1, alt: "Elite Drowsy - Desert Scene" },
  { id: 2, src: heroSlide2, alt: "Elite Drowsy - Lifestyle" },
  { id: 3, src: heroSlide3, alt: "Elite Drowsy - Unboxing" },
  { id: 4, src: heroSlide4, alt: "Elite Drowsy - Ingredients" },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play logic - 5 second intervals
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-charcoal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Ken Burns Effect Container */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 5, ease: "linear" }}
            className="w-full h-full"
          >
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Navigation Arrows - Show on hover */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-background/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-background/20 transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-background/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-background/20 transition-colors duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              currentSlide === index
                ? "bg-gold w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Brand Text Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-center"
      >
        <p className="text-sm tracking-[0.4em] uppercase text-white/70 mb-2">
          Introducing
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-white tracking-wide">
          Elite Drowsy
        </h2>
        <p className="text-white/60 mt-3 text-sm tracking-widest uppercase">
          Pour Homme
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSlider;
