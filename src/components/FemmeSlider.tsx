import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Lazy load images for performance
import femmeSlide1 from "@/assets/femme-slide-1.png";
import femmeSlide2 from "@/assets/femme-slide-2.jpg";
import femmeSlide3 from "@/assets/femme-slide-3.jpg";
import femmeSlide4 from "@/assets/femme-slide-4.jpg";
import femmeSlide5 from "@/assets/femme-slide-5.jpg";
import femmeSlide6 from "@/assets/femme-slide-6.jpg";
import femmeSlide7 from "@/assets/femme-slide-7.png";
import femmeSlide8 from "@/assets/femme-slide-8.png";
import femmeSlide9 from "@/assets/femme-slide-9.png";

const slides = [
  { id: 1, src: femmeSlide1, alt: "Dropsy Femme - Silk & Pearls" },
  { id: 2, src: femmeSlide2, alt: "Dropsy Femme - Luxury" },
  { id: 3, src: femmeSlide3, alt: "Dropsy Femme - Rose Petals" },
  { id: 4, src: femmeSlide4, alt: "Dropsy Femme - Fruity Notes" },
  { id: 5, src: femmeSlide5, alt: "Dropsy Femme - Ethereal" },
  { id: 6, src: femmeSlide6, alt: "Dropsy Femme - Opulence" },
  { id: 7, src: femmeSlide7, alt: "Dropsy Femme - Satin" },
  { id: 8, src: femmeSlide8, alt: "Dropsy Femme - Gift Box" },
  { id: 9, src: femmeSlide9, alt: "Dropsy Femme - Elegance" },
];

// Memoized slide image for lazy loading optimization
const SlideImage = memo(({ src, alt, isActive }: { src: string; alt: string; isActive: boolean }) => (
  <motion.div
    initial={{ scale: 1 }}
    animate={{ scale: isActive ? 1.05 : 1 }}
    transition={{ duration: 5, ease: "linear" }}
    className="w-full h-full flex items-center justify-center"
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-contain"
      style={{ imageRendering: 'crisp-edges' }}
    />
  </motion.div>
));

SlideImage.displayName = "SlideImage";

const FemmeSlider = () => {
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

  // Auto-play logic - 3 second intervals with loop
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-midnight"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides with smooth ease-in-out transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1] // Smooth ease-in-out
          }}
          className="absolute inset-0"
        >
          <SlideImage 
            src={slides[currentSlide].src} 
            alt={slides[currentSlide].alt}
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/10 to-transparent pointer-events-none" />

      {/* Navigation Arrows - Show on hover */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full text-cream hover:bg-cream/20 transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full text-cream hover:bg-cream/20 transition-colors duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Pagination Dots - Organized for 9 dots with shrinking inactive */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-500 ${
              currentSlide === index
                ? "bg-gold w-6 h-2"
                : "bg-cream/30 hover:bg-cream/60 w-2 h-2"
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
        dir="rtl"
      >
        <p className="font-arabic text-sm tracking-widest uppercase text-cream/60 mb-3">
          للنساء
        </p>
        <h2 className="font-arabic text-4xl md:text-6xl text-cream font-bold mb-2">
          إيف
        </h2>
        <p className="font-serif text-cream/50 text-lg tracking-[0.3em] uppercase">
          Femme
        </p>
      </motion.div>
    </section>
  );
};

export default FemmeSlider;
