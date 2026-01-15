import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
  ownerPhone: string;
}

const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  address: z.string().trim().min(10, "Please enter a complete address").max(500),
});

const CheckoutDrawer = ({ isOpen, onClose, productName, productPrice, ownerPhone }: CheckoutDrawerProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Generate WhatsApp message
    const message = `🌹 *New Order for ${productName}!*

*Customer Details:*
📛 Name: ${formData.fullName}
📱 Phone: ${formData.phone}
📍 Address: ${formData.address}

*Order:*
${productName} - ${productPrice}
💳 Payment: Cash on Delivery (COD)`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ fullName: "", phone: "", address: "" });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Checkout</p>
                  <h3 className="font-serif text-2xl">{productName}</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isSubmitted ? (
                <>
                  {/* Price */}
                  <div className="border-t border-b border-border py-6 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-serif text-2xl">{productPrice}</span>
                    </div>
                    <p className="text-sm text-gold mt-2">Cash on Delivery (COD)</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                        Full Name
                      </label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="bg-transparent border-border focus:border-gold"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive mt-2">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        className="bg-transparent border-border focus:border-gold"
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-2">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete delivery address"
                        rows={4}
                        className="w-full bg-transparent border border-border px-4 py-3 focus:border-gold focus:outline-none resize-none"
                      />
                      {errors.address && (
                        <p className="text-sm text-destructive mt-2">{errors.address}</p>
                      )}
                    </div>

                    <Button type="submit" variant="luxury" size="lg" className="w-full">
                      Confirm Order
                    </Button>
                  </form>
                </>
              ) : (
                /* Thank You Screen */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 border border-gold flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="font-serif text-3xl mb-4">Merci</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Your order has been received. Our team will contact you shortly to confirm your shipment details.
                  </p>
                  <div className="border border-border p-6 text-left">
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Order Summary</p>
                    <p className="font-serif text-lg">{productName}</p>
                    <p className="text-gold">{productPrice}</p>
                  </div>
                  <Button variant="outline" onClick={handleClose} className="mt-8">
                    Continue Shopping
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutDrawer;
