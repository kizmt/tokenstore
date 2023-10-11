"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Product } from "@/components/product/Product";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      ({ WalletMultiButton }) => WalletMultiButton
    ),
  {
    ssr: false,
  }
);

const cheerio = require("cheerio");
export const styles = {
  main: "flex min-h-screen flex-col gap-y-4 p-6 items-center bg-black",
};

export default function Home() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <main className={styles.main}>
        <WalletMultiButton />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className="container text-white  mx-auto max-w-6xl  ">
        <div className="flex flex-row ">
          <h1 className=" w-1/6 bg-black mr-80 ">shop now</h1>
          <div className="ml-80">
            <WalletMultiButton />
          </div>
        </div>
        <div></div>
      </div>
      <h1 className="text-white ">
        Shop items available on the SOLape store{" "}
      </h1>
      <div className="flex space-x-8">
        {/* Same payment link id passed in here, but best to pass in one payment link per product */}
        <Product paymentLinkId="paymentLink_9fa98f6bfb684c429db94eecfd2cd208" />
        <Product paymentLinkId="paymentLink_9fa98f6bfb684c429db94eecfd2cd208" />
      </div>
      {/* <Carousel>
        {lineItems[itemIndex].price.product.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt="" />
          </div>
        ))}
      </Carousel> */}
    </main>
  );
}
