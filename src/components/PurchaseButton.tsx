import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Globe, X, Send } from "lucide-react";
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

interface PurchaseButtonProps {
  productName: string;
  isSticky?: boolean;
}

// Using full API URL format for better compatibility
const WHATSAPP_PHONE = "9647706713486";

// Iraqi governorates list
const IRAQI_GOVERNORATES = [
  "بغداد",
  "البصرة",
  "نينوى",
  "أربيل",
  "النجف",
  "كربلاء",
  "ذي قار",
  "كركوك",
  "الأنبار",
  "بابل",
  "ديالى",
  "المثنى",
  "القادسية",
  "ميسان",
  "واسط",
  "صلاح الدين",
  "دهوك",
  "السليمانية",
  "حلبجة",
];

const PurchaseButton = ({ productName, isSticky = false }: PurchaseButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    governorate: "",
    city: "",
  });

  const getWhatsAppUrl = (message?: string) => {
    const defaultMessage = `Hello Dropsy, I would like to order ${productName}.`;
    const finalMessage = encodeURIComponent(message || defaultMessage);
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${finalMessage}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderMessage = `طلب جديد من الموقع:

اسم العطر: ${productName}
الاسم: ${formData.name}
الهاتف: ${formData.phone}
المحافظة: ${formData.governorate}
المدينة: ${formData.city}`;

    const whatsappUrl = getWhatsAppUrl(orderMessage);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    // Reset form and close modals
    setFormData({ name: "", phone: "", governorate: "", city: "" });
    setShowForm(false);
    setShowOptions(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`relative ${isSticky ? "fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:relative md:p-0 md:bg-transparent" : ""}`}>
      <Button
        onClick={() => setShowOptions(true)}
        className="w-full md:w-auto font-arabic text-lg py-6 px-12 bg-gold hover:bg-gold-light text-midnight font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        اطلب الآن
      </Button>

      {/* Purchase Options Modal */}
      <AnimatePresence>
        {showOptions && !showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="fixed inset-0 bg-midnight/70 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm bg-background border border-border p-8 shadow-2xl"
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
              <p className="font-arabic text-sm text-muted-foreground text-center mb-8">
                اختر طريقة التواصل المفضلة لديك
              </p>

              <div className="space-y-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowOptions(false)}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-arabic font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>اطلب عبر واتساب</span>
                </a>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-foreground hover:bg-foreground/90 text-background font-arabic font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <Globe className="w-6 h-6" />
                  <span>اطلب عبر الموقع</span>
                </button>
              </div>

              <p className="font-arabic text-xs text-muted-foreground text-center mt-8">
                سنتواصل معك لتأكيد الطلب والتوصيل
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowForm(false);
                setShowOptions(false);
              }}
              className="fixed inset-0 bg-midnight/70 backdrop-blur-sm z-50"
            />
            
            {/* Form Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm bg-background border border-border p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              dir="rtl"
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setShowOptions(false);
                }}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-arabic text-xl font-semibold text-center mb-2">
                نموذج الطلب
              </h3>
              <p className="font-arabic text-sm text-muted-foreground text-center mb-8">
                {productName}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-arabic text-right block text-sm">
                    الاسم الكامل
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="font-arabic text-right bg-background border-border"
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>

                {/* Phone Number - accepts both Western & Eastern Arabic numerals */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-arabic text-right block text-sm">
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="font-arabic text-right bg-background border-border"
                    placeholder="07xxxxxxxxx أو ٠٧xxxxxxxxx"
                    required
                  />
                </div>

                {/* Governorate Dropdown */}
                <div className="space-y-2">
                  <Label className="font-arabic text-right block text-sm">
                    المحافظة
                  </Label>
                  <Select
                    value={formData.governorate}
                    onValueChange={(value) => handleInputChange("governorate", value)}
                    required
                  >
                    <SelectTrigger className="w-full font-arabic text-right bg-background border-border">
                      <SelectValue placeholder="اختر المحافظة" />
                    </SelectTrigger>
                    <SelectContent 
                      className="font-arabic bg-background border-border z-[100] max-h-60"
                      dir="rtl"
                    >
                      {IRAQI_GOVERNORATES.map((gov) => (
                        <SelectItem 
                          key={gov} 
                          value={gov}
                          className="font-arabic text-right hover:bg-muted cursor-pointer"
                        >
                          {gov}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City/Neighborhood */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-arabic text-right block text-sm">
                    المدينة / الحي
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="font-arabic text-right bg-background border-border"
                    placeholder="مثال: المنصور، الكرادة"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-arabic text-lg py-6 bg-gold hover:bg-gold-light text-midnight font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
                >
                  <Send className="w-5 h-5 ml-2" />
                  إتمام الطلب
                </Button>
              </form>

              <p className="font-arabic text-xs text-muted-foreground text-center mt-6">
                سيتم إرسال طلبك عبر واتساب للتأكيد
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseButton;
