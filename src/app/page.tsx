"use client";

import Image from "next/image";
import { useSphere } from "@spherelabs/react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import { useEffect } from "react";
const cheerio = require('cheerio');
export const styles = {
  main: "flex min-h-screen flex-col gap-y-4 p-6 items-center bg-black",
  button: "items-center w-1/6 h-8  bg-indigo-600 ml-2 text-center h-1/3 text-sm  inline-block text-white cursor-pointer  transition duration-200 ease-in-out rounded-lg hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95",
  input: "border-[2px] border-[#E4EBFF] rounded-md",
  subtotal: "text-gray-500 m-2"
}

export default function Home() {
  const [tokenName, setTokenName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [detailText, setDetailText] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleButtonClick = () => {
    setDetailText('Your text here');
    setItemIndex(0);
    setDetailModalVisible(true);
  };

  const { connected } = useWallet()
  const { setLineItemQuantity, lineItems, pay, subtotal, discount } =
    useSphere();

  if (!connected || !lineItems) {
    return (
      <main className={styles.main}>
        <WalletMultiButton />
      </main>
    );
  }
  type DetailModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    text: string;
    itemIndex: number;
  };
  console.log(lineItems[0])
  const DetailModal = ({ showModal, setShowModal, text, itemIndex }: DetailModalProps) => {
    if (!showModal) {
      return null;
    }
    

    return (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  focus:outline-none">
  <div className="relative w-auto  max-w-3xl bg-black">
    <div className="border-0 rounded-lg shadow-lg relative w-100 flex flex-col w-full bg-black border-2 outline-none focus:outline-none">
      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
        <h3 className="text-3xl font-semibold text-white">
          {lineItems[itemIndex].price.product.name}
        </h3>
        <button
          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
          onClick={() => setShowModal(false)}
        >
          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
            ×
          </span>
        </button>
      </div>
      <div className="relative p-6 flex-auto">
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Carousel>
            {lineItems[itemIndex].price.product.images.map((image, index) => (
              <div key={index} className="w-full h-64">
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </Carousel>
        </div>
        <p className="my-4 text-gray-600 text-lg leading-relaxed">
          no description for you brother
          {tokenName && <h1>Token Name: {tokenName}</h1>}
        </p>
        
        <div className="flex items-center justify-between mt-4">
  <label htmlFor="quantity" className="text-gray-600">
    Quantity:
  </label>
  <div className="flex items-center">
    <input
      type="number"
      id="quantity"
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      defaultValue={quantity}
      min={1}
      onChange={(e) => {
        setLineItemQuantity(parseInt(e.target.value), lineItems[0].id);
        setQuantity(parseInt(e.target.value));
      }}
    />
    <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
      Add to Cart
    </button>
    
  </div>
  
</div>
<div className="text-gray-500 pt-2">
        Total: {Number(subtotal?.rawAmountWithTaxAndFeesFormatted) * quantity} {lineItems[itemIndex].price.currency}
        </div>
      </div>
     
      <div className="flex items-center justify-end p-6 rounded-b">
        <button
          className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm border border-red-500 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:bg-red-500 hover:text-white"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button
          className="text-green-500 bg-transparent font-bold uppercase px-6 py-2 text-sm border border-green-500 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:bg-green-500 hover:text-white"
          type="button"
          onClick={async () => {
            const txId = await pay();
            console.log(txId);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>
    );
  };
  console.log(lineItems[0])
  console.log(useSphere)

  return (

    <main className={styles.main}>
      <div className="container text-white  mx-auto max-w-6xl  ">
        <div className="flex flex-row ">
          <h1 className=" w-1/6 bg-black mr-80 ">shop now</h1>
          <div className="ml-80" >
            <WalletMultiButton />
          </div>
        </div>
        <div>
        </div>
      </div>
      <h1 className="text-white ">  Shop items available on the SOLape store </h1>
      <div className="flex space-x-8">
        <div
          className="block w-1/4 border-2 rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
          <a href="#!">
            <Image
              width="270"
              height="300"
              src={lineItems[0].price.product.images[0]}
              alt="" />
          </a>
          <div className="p-6 ">
            <DetailModal showModal={detailModalVisible} setShowModal={setDetailModalVisible} text={detailText} itemIndex={itemIndex} />
            <h5
              onClick={handleButtonClick}
              className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {lineItems[0].price.product.name}   </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Some quick example text to make you think you're intellectual while you're just normal
            </p>
            <button
              className="bg-pink-500 pl-1 pr-1 pt-1 pb-1 text-white active:bg-pink-600 font-bold  text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Buy Now
            </button>
            {showModal ? (
              <>
                <div
                  className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto max-w-3xl bg-black">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black border-2 outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between   rounded-t">
                        <button

                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className={styles.subtotal}>
                          Tax: {subtotal?.totalTaxFormatted}
                        </div>
                        <div className={styles.subtotal}>
                          Fees : {subtotal?.totalFeeFormatted}
                        </div>
                        <div className={styles.subtotal}>
                          Total: {subtotal?.rawAmountWithTaxAndFeesFormatted} {lineItems[0].price.currency}
                        </div>
                        <input className={styles.input} onChange={(e) => {
                          setLineItemQuantity(parseInt(e.target.value), lineItems[0].id);
                        }}>
                        </input>
                        <button
                          onClick={async () => {
                            const txId = await pay();
                            console.log(txId);
                          }}
                          className={styles.button}
                        >
                          Pay
                        </button>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}

          </div>
        </div>   <div className="w-full">
          <div
            className="block w-1/4  border-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
            <a href="#!">
              <Image
                width="270"
                height="300"
                className="rounded-t-lg"
                src={lineItems[0].price.product.images[0]}
                alt="" />
            </a>
            <div className="p-6 w-100 ">
              <h5
                className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                gift card for(1 USD)    </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Some quick example text to make you think you're intellectual while you're just normal
              </p>
              <button
                onClick={async () => {
                  const txId = await pay();
                  console.log(txId);
                }}
                type="button"
                className="p-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                data-te-ripple-init
                data-te-ripple-color="light">
                Buy Now
              </button>
            </div>
          </div>
        </div>
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
