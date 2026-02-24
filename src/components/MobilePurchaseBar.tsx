import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import PurchaseModal from "./PurchaseModal";

const MobilePurchaseBar = () => {
  const [showModal, setShowModal] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-sm"
      >
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-3 py-4 bg-gold hover:bg-gold-light text-midnight font-arabic font-semibold text-lg shadow-xl transition-all duration-300 active:scale-[0.98]"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>اطلب الآن</span>
        </button>
      </motion.div>

      <PurchaseModal
        open={showModal}
        onClose={() => setShowModal(false)}
        productName="Drowsy"
      />
    </>
  );
};

export default MobilePurchaseBar;
