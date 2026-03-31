import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { TokenContext } from "../Context/TokenContext";
import { API_BASE_URL } from "../../config/env";

export default function Order() {
  const { token } = useContext(TokenContext);
  const [orders, setOrder] = useState(null);

  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    async function getUserOrders() {
      if (!userId) {
        setOrder([]);
        return;
      }

      const option = {
        url: `${API_BASE_URL}/orders/user/${userId}`,
        method: "get",
      };

      const { data } = await axios.request(option);
      setOrder(data);
    }

    getUserOrders();
  }, [userId]);

  if (orders === null) {
    return <Loader />;
  }

  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className="border-3 border-gray-500/40 my-10">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-light">order ID:</h3>
              <h3 className="text-xl font-light">{order.id}</h3>
            </div>
            <div>
              <button className="px-4 mx-3 py-2 bg-red-500 text-lg text-white font-semibold rounded-md">
                {order.isDelivered ? "Delivered" : "Under Delivery"}
              </button>
              <button
                className={`px-4 py-2 ${order.isPaid ? "bg-green-500" : "bg-red-500"} text-lg text-white font-semibold rounded-md`}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </button>
            </div>
          </div>

          {order.cartItems.map((product) => (
            <div key={product.product.id} className="grid grid-cols-6 p-6 gap-5">
              <div className="border-3 space-y-4 border-gray-500/50 rounded-md">
                <img className="w-full" src={product.product.imageCover} alt="" />
                <div className="space-y-2 p-2">
                  <Link to={`/productDetails/${product.product.id}`}>
                    <h3 className="text-xl font-semibold line-clamp-1">
                      product title: {product.product.title}
                    </h3>
                  </Link>

                  <h3 className="text-xl font-semibold">
                    product category: {product.product.category.name}
                  </h3>
                  <h3 className="text-xl font-semibold">
                    product price:{product.price} EGP
                  </h3>
                  <h3 className="text-xl font-semibold">
                    product Count:{product.count}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          <h3 className="text-xl p-4 font-semibold">
            total price:{order.totalOrderPrice} EGP
          </h3>
        </div>
      ))}
    </>
  );
}
