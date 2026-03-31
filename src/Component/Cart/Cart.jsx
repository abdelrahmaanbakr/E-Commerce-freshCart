import React, { useContext, useEffect } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import Loader from "../Loader/Loader";
import CartItem from "../cartItem/CartItem";

export default function Cart() {
  const { displayToCart, cartInfo, clearAllCart } = useContext(CartContext);

  useEffect(() => {
    displayToCart();
  }, [displayToCart]);

  if (!cartInfo || cartInfo?.numOfCartItems === 0) {
    return (
      <section className="bg-gray-200 p-5 my-10">
        <h2 className="text-2xl font-semibold flex items-center gap-3 py-2">
          Shop To Cart <FontAwesomeIcon icon={faShoppingCart} />
        </h2>
        <h3 className="text-2xl font-semibold text-main">
          Total: {cartInfo?.data?.totalCartPrice || 0} EGP
        </h3>

        <div className="space-y-4 my-3 flex justify-center">
          <div className="flex-col space-y-4">
            <h2 className="text-2xl font-semibold">your cart is empty</h2>
            <Link to="/home">
              <button className="px-6 py-3 bg-main text-white rounded-md">
                return to products page
              </button>
            </Link>
          </div>
        </div>

        <div className="w-fit ms-auto">
          <button
            onClick={clearAllCart}
            className="bg-red-500 px-6 cursor-pointer py-3 rounded-md text-white"
          >
            CLEAR CART
          </button>
        </div>
      </section>
    );
  }

  if (!cartInfo) {
    return <Loader />;
  }

  return (
    <>
      <section className="bg-gray-200 p-5 my-10">
        <h2 className="text-2xl font-semibold flex items-center gap-3 py-2">
          Shop To Cart <FontAwesomeIcon icon={faShoppingCart} />
        </h2>
        <h3 className="text-2xl font-semibold text-main">
          Total: {cartInfo?.data?.totalCartPrice || 0} EGP
        </h3>

        <div className="space-y-4 my-3">
          {cartInfo?.data?.products?.map((cart) => (
            <CartItem key={cart._id} cartinfo={cart} />
          ))}
        </div>

        <div className="w-fit ms-auto">
          <button
            onClick={clearAllCart}
            className="bg-red-500 px-6 py-3 rounded-md text-white"
          >
            CLEAR CART
          </button>
        </div>
      </section>

      <div className="w-fit ms-auto">
        <Link to="/checkout">
          <button className="bg-main mb-4 text-xl px-6 py-3 rounded-md text-white">
            CheckOut
          </button>
        </Link>
      </div>
    </>
  );
}
