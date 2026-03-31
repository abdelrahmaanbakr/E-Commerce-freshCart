import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { TokenContext } from "./TokenContext";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";
import { API_BASE_URL } from "../../config/env";

export default function CartProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [cartInfo, setCartInfo] = useState(null);

  const displayToCart = useCallback(async () => {
    if (!token) {
      setCartInfo(null);
      return null;
    }

    const option = {
      url: `${API_BASE_URL}/cart`,
      method: "get",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(option);
    setCartInfo(data);
    return data;
  }, [token]);

  const addToCart = useCallback(async (productId) => {
    const loading = toast.loading("loading..");
    try {
      const option = {
        url: `${API_BASE_URL}/cart`,
        method: "post",
        data: { productId },
        headers: { token },
      };

      const { data } = await axios.request(option);
      if (data.status === "success") {
        toast.success(data.message);
      }
      await displayToCart();
    } catch {
      toast.error("Error adding to cart");
    } finally {
      toast.dismiss(loading);
    }
  }, [displayToCart, token]);

  const deleteItem = useCallback(async (itemId) => {
    const loading = toast.loading("loading..");

    try {
      const option = {
        url: `${API_BASE_URL}/cart/${itemId}`,
        method: "delete",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);

      setCartInfo(data);
      toast.success("item removed successfully");
    } catch {
      toast.error("error..");
    } finally {
      toast.dismiss(loading);
    }
  }, [token]);

  const clearAllCart = useCallback(async () => {
    if (!token) {
      setCartInfo({
        numOfCartItems: 0,
      });
      return;
    }

    const option = {
      url: `${API_BASE_URL}/cart`,
      method: "delete",
      headers: {
        token,
      },
    };
    await axios.request(option);
    setCartInfo({
      numOfCartItems: 0,
    });
  }, [token]);

 const updateCount = useCallback(async (productID,count) => {
  const loading= toast.loading('loading..')
  try {
     const option={
      url:`${API_BASE_URL}/cart/${productID}`,
      method:'put',
      data:{
        count,
      },
      headers:{
        token,
      }
    }
    const{data}= await axios.request(option)
    setCartInfo(data)
    toast.success('Count Updated')
  } catch {
    toast.error('Error Updata')
  }finally{
    toast.dismiss(loading)
  }
   
  }, [token]);

  return (
    <CartContext.Provider
      value={{ addToCart, displayToCart, cartInfo, deleteItem, clearAllCart , updateCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
