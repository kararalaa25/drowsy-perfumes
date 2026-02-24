import { useState } from "react";
import { Button } from "@/components/ui/button";
import PurchaseModal from "./PurchaseModal";

interface PurchaseButtonProps {
  productName: string;
  isSticky?: boolean;
}

const PurchaseButton = ({ productName }: PurchaseButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="w-full md:w-auto font-arabic text-lg py-6 px-12 bg-gold hover:bg-gold-light text-midnight font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        اطلب الآن
      </Button>

      <PurchaseModal
        open={showModal}
        onClose={() => setShowModal(false)}
        productName={productName}
      />
    </>
  );
};

export default PurchaseButton;
