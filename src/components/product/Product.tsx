import { SphereProvider, useSphere } from "@spherelabs/react";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { useState } from "react";
import Image from "next/image";

interface ProductProps {
  paymentLinkId: string;
}

export const Product = ({ paymentLinkId }: ProductProps) => (
  <SphereProvider paymentLinkId={paymentLinkId}>
    <ProductInner />
  </SphereProvider>
);

const ProductInner = () => {
  const { lineItems } = useSphere();
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] =
    useState(false);

  if (!lineItems) {
    // maybe could add a loading spinner/skeleton here
    return null;
  }

  return (
    <>
      <ProductDetailsModal
        open={isProductDetailsModalOpen}
        onClose={() => {
          setIsProductDetailsModalOpen(false);
        }}
      />
      <div className="block w-1/4  border-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
        <a href="#!">
          <Image
            width="270"
            height="300"
            className="rounded-t-lg"
            src={lineItems[0].price.product.images[0]}
            alt=""
          />
        </a>
        <div className="p-6 w-100 ">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            gift card for(1 USD){" "}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Some quick example text to make you think you're intellectual while
            you're just normal
          </p>
          <button
            onClick={async () => {
              setIsProductDetailsModalOpen(true);
            }}
            type="button"
            className="p-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};
