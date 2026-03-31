import { Minus, Plus, Trash } from "lucide-react";
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export default function CartItem({ cartinfo }) {
  const { product, price, count } = cartinfo;
  const { imageCover, title, id, category } = product;
  const { deleteItem, updateCount } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <img className="w-40" src={imageCover} alt={title} />

        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <h4 className="text-xl font-semibold text-main">Price:{price}</h4>
          </div>

          <button
            onClick={() => {
              deleteItem(id);
            }}
            className="px-4 flex gap-3 cursor-pointer py-2 bg-red-500 rounded-md text-white"
          >
            REMOVE <Trash />
          </button>
        </div>
      </div>

      <div className="space-x-3">
        <button
          onClick={() => {
            updateCount(id, count + 1);
          }}
          className="bg-main text-white py-2 px-3"
        >
          <Plus />
        </button>
        <span className="text-xl font-semibold">{count}</span>
        <button
          onClick={() => {
            updateCount(id, Math.max(1, count - 1));
          }}
          className="bg-main text-white py-2 px-3"
        >
          <Minus />
        </button>
      </div>
    </div>
  );
}
