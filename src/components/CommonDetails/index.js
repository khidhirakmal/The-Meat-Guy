"use client";

import { GlobalContext } from "@/GlobalContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../ComponentLevelLoader";
import { addToCart } from "@/services/cart";
import Notification from "../Notification";

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-black">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-8 lg:gap-20">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:row-span-2 lg:row-end-2">
            <h1 className="flex text-4xl font-extrabold text-gray-900">
              {item && item.name}
            </h1>
            <div className="mt-4 flex flex-col items-center justify-between space-y-4 border-t-2 border-b-2 py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1
                  className={`text-3xl font-bold mr-2 ${
                    item.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  ${item && item.price}
                </h1>
                {item.onSale === "yes" ? (
                  <h1 className="text-3xl font-bold text-red-700">{`$${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white
                hover:bg-neutral-800 hover:font-extrabold rounded"
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Adding to Cart"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <p className="font-bold mr-1">Product Weight:</p>
                {item && item.weight}
              </li>
            </ul>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="border-b-1 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  ></a>
                </nav>
              </div>
              <div className="mt-8 flow-root sm:mt-12">
                {item && item.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
