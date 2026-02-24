import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Globe, X, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_PHONE = "9647706713486";

const IRAQI_GOVERNORATES = [
  "بغداد", "البصرة", "نينوى", "أربيل", "النجف", "كربلاء",
  "ذي قار", "كركوك", "الأنبار", "بابل", "ديالى", "المثنى",
  "القادسية", "ميسان", "واسط", "صلاح الدين", "دهوك", "السليمانية", "حلبجة",
];

type View = "options" | "form" | "success";

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
}

const PurchaseModal = ({ open, onClose, productName }: PurchaseModalProps) => {
  const [view, setView] = useState<View>("options");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    governorate: "",
    city: "",
  });

  const handleClose = () => {
    setView("options");
    setFormData({ name: "", phone: "", governorate: "", city: "" });
    onClose();
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hello Drowsy, I would like to order ${productName}.`);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank", "noopener,noreferrer");
    handleClose();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("orders").insert({
        product_name: productName,
        customer_name: formData.name,
        phone: formData.phone,
        governorate: formData.governorate,
        city: formData.city,
      });

      if (error) throw error;
      setView("success");
    } catch (err) {
      console.error("Order submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm bg-background border border-border p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Options View */}
            {view === "options" && (
              <>
                <h3 className="font-arabic text-xl font-semibold text-center mb-2 text-foreground">
                  طريقة الطلب
                </h3>
                <p className="font-arabic text-sm text-muted-foreground text-center mb-8">
                  اختر طريقة التواصل المفضلة لديك
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-arabic font-medium transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>اطلب عبر واتساب</span>
                  </button>
                  <button
                    onClick={() => setView("form")}
                    className="w-full flex items-center justify-center gap-3 p-4 bg-foreground hover:bg-foreground/90 text-background font-arabic font-medium transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                  >
                    <Globe className="w-6 h-6" />
                    <span>اطلب عبر الموقع</span>
                  </button>
                </div>
                <p className="font-arabic text-xs text-muted-foreground text-center mt-8">
                  سنتواصل معك لتأكيد الطلب والتوصيل
                </p>
              </>
            )}

            {/* Form View */}
            {view === "form" && (
              <>
                <h3 className="font-arabic text-xl font-semibold text-center mb-2 text-foreground">
                  نموذج الطلب
                </h3>
                <p className="font-arabic text-sm text-muted-foreground text-center mb-8">
                  {productName}
                </p>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-arabic text-right block text-sm text-foreground">
                      الاسم الكامل
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="font-arabic text-right bg-background border-border text-foreground h-12"
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-arabic text-right block text-sm text-foreground">
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="font-arabic text-right bg-background border-border text-foreground h-12"
                      placeholder="07xxxxxxxxx"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-arabic text-right block text-sm text-foreground">
                      المحافظة
                    </Label>
                    <Select
                      value={formData.governorate}
                      onValueChange={(value) => handleInputChange("governorate", value)}
                      required
                    >
                      <SelectTrigger className="w-full font-arabic text-right bg-background border-border text-foreground h-12">
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent className="font-arabic bg-background border-border z-[100] max-h-60" dir="rtl">
                        {IRAQI_GOVERNORATES.map((gov) => (
                          <SelectItem key={gov} value={gov} className="font-arabic text-right hover:bg-muted cursor-pointer py-3">
                            {gov}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-arabic text-right block text-sm text-foreground">
                      المدينة / الحي
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="font-arabic text-right bg-background border-border text-foreground h-12"
                      placeholder="مثال: المنصور، الكرادة"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-arabic text-lg py-6 bg-gold hover:bg-gold-light text-midnight font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
                  >
                    <Send className="w-5 h-5 ml-2" />
                    {submitting ? "جاري الإرسال..." : "إتمام الطلب"}
                  </Button>
                </form>
              </>
            )}

            {/* Success View */}
            {view === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-gold" />
                </div>
                <h3 className="font-arabic text-2xl font-semibold text-foreground mb-3">
                  تم إرسال طلبك بنجاح
                </h3>
                <p className="font-arabic text-muted-foreground mb-8 leading-relaxed">
                  سيتم التواصل معك قريباً لتأكيد الطلب وترتيب التوصيل
                </p>
                <Button
                  onClick={handleClose}
                  className="font-arabic py-4 px-10 bg-foreground text-background hover:bg-foreground/90"
                >
                  إغلاق
                </Button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;
