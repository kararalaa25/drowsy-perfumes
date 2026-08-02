import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().trim().min(2, "الاسم قصير جداً").max(100, "الاسم طويل جداً"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[ -]/g, ""))
    .refine((v) => /^07\d{8,9}$/.test(v), "رقم الهاتف غير صحيح (مثال: 07xxxxxxxxx)"),
  location: z.string().trim().min(3, "الموقع قصير جداً").max(200, "الموقع طويل جداً"),
});

type View = "form" | "success";

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
}

const PurchaseModal = ({ open, onClose, productName }: PurchaseModalProps) => {
  const [view, setView] = useState<View>("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const handleClose = () => {
    setView("form");
    setError("");
    setFormData({ name: "", phone: "", location: "" });
    onClose();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = orderSchema.safeParse(formData);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("submit-order", {
        body: { ...parsed.data, productName },
      });

      if (fnError || !data?.success) {
        setError("تعذر إرسال الطلب، يرجى المحاولة مرة أخرى");
        return;
      }

      setView("success");
    } catch (err) {
      console.error("Order submission failed:", err);
      setError("تعذر إرسال الطلب، يرجى المحاولة مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
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
            className="fixed inset-4 m-auto z-50 w-[85vw] max-w-xs h-fit max-h-[80vh] bg-background border border-border p-6 shadow-2xl overflow-y-auto rounded-lg"
            dir="rtl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

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
                      maxLength={100}
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
                      maxLength={20}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-arabic text-right block text-sm text-foreground">
                      الموقع
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="font-arabic text-right bg-background border-border text-foreground h-12"
                      placeholder="المحافظة / المدينة / الحي"
                      required
                      maxLength={200}
                    />
                  </div>
                  {error && (
                    <p className="font-arabic text-sm text-destructive text-center">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-arabic text-lg py-6 bg-gold hover:bg-gold-light text-midnight font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
                  >
                    <Send className="w-5 h-5 ml-2" />
                    {submitting ? "جاري الإرسال..." : "إرسال"}
                  </Button>
                </form>
              </>
            )}

            {view === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-arabic text-2xl font-semibold text-foreground mb-3">
                  شكراً لك!
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Thank you! Your order has been sent. Our team will contact you on WhatsApp soon.
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
