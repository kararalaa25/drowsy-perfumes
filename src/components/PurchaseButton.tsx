import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PurchaseButtonProps {
  productName: string;
  isSticky?: boolean;
}

// Using full API URL format for better compatibility
const WHATSAPP_PHONE = "9647706713486";
const INSTAGRAM_URL = "https://www.instagram.com/drowsy10";

const PurchaseButton = ({ productName, isSticky = false }: PurchaseButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const getWhatsAppUrl = () => {
    const message = encodeURIComponent(`مرحباً، أود طلب عطر ${productName}`);
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${message}`;
  };

  return (
    <div className={`relative ${isSticky ? "fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-transparent" : ""}`}>
      <Button
        onClick={() => setShowOptions(true)}
        className="w-full md:w-auto font-arabic text-lg py-6 px-10 bg-gold hover:bg-gold/90 text-charcoal font-semibold rounded-lg shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-xl hover:shadow-gold/30"
      >
        اطلب الآن
      </Button>

      {/* Purchase Options Modal */}
      <AnimatePresence>
        {showOptions && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm bg-background border border-border rounded-2xl p-6 shadow-2xl"
              dir="rtl"
            >
              <button
                onClick={() => setShowOptions(false)}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-arabic text-xl font-semibold text-center mb-2">
                طريقة الطلب
              </h3>
              <p className="font-arabic text-sm text-muted-foreground text-center mb-6">
                اختر طريقة التواصل المفضلة لديك
              </p>

              <div className="space-y-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowOptions(false)}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-arabic font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>واتساب</span>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowOptions(false)}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white font-arabic font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <Instagram className="w-6 h-6" />
                  <span>انستغرام</span>
                </a>
              </div>

              <p className="font-arabic text-xs text-muted-foreground text-center mt-6">
                سنتواصل معك لتأكيد الطلب والتوصيل
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseButton;
