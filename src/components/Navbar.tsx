import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="font-serif text-2xl md:text-3xl tracking-wide text-foreground hover:text-gold transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          Drowsy
        </motion.a>

        {/* Right Side - Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
