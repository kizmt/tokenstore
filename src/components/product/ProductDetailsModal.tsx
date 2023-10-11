import { useSphere } from "@spherelabs/react";
import { Carousel } from "react-responsive-carousel";

export const styles = {
  button:
    "items-center w-1/6 h-8  bg-indigo-600 ml-2 text-center h-1/3 text-sm  inline-block text-white cursor-pointer  transition duration-200 ease-in-out rounded-lg hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95",
  input: "border-[2px] border-[#E4EBFF] rounded-md",
  subtotal: "text-gray-500 m-2",
};

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

export const ProductDetailsModal = ({
  open,
  onClose,
}: ProductDetailsModalProps) => {
  const { lineItems, setLineItemQuantity, subtotal, pay } = useSphere();

  const lineItem = lineItems?.[0];
  const quantity = lineItem?.quantity ?? 1;
  const price = lineItem?.price;
  const product = price?.product;

  if (!open) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none  focus:outline-none">
      <div className="relative w-auto  max-w-3xl bg-black">
        <div className="border-0 rounded-lg shadow-lg relative w-100 flex flex-col w-full bg-black border-2 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold text-white">
              {product?.name}
            </h3>
            <button
              type="button"
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => {
                onClose();
              }}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Carousel>
                {product?.images.map((image, index) => (
                  <div key={index} className="w-full h-64">
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <p className="my-4 text-gray-600 text-lg leading-relaxed">
              no description for you brother
              {/* Could use jup's API to fetch actual token name */}
              <h1> Token address: {price?.currency ?? ""}</h1>
              {/* {tokenName && <h1>Token Name: {tokenName}</h1>} */}
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
                    if (!lineItem) {
                      return;
                    }
                    setLineItemQuantity(parseInt(e.target.value), lineItem.id);
                  }}
                />
                {/* Doesn't seem to be working yet, hidden for now */}
                {/* <button
                  type="button"
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button> */}
              </div>
            </div>
            <div className="text-gray-500 pt-2">
              Total: {subtotal?.rawAmountWithTaxAndFeesFormatted}{" "}
              {price?.currency}
            </div>
          </div>

          <div className="flex items-center justify-end p-6 rounded-b">
            <button
              className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm border border-red-500 rounded outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:bg-red-500 hover:text-white"
              type="button"
              onClick={() => {
                onClose();
              }}
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
