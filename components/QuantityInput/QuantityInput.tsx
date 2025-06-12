"use client";

import { updateQuantity, removeFromCart } from "@/features/cart/cartSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

const QuantityInput = ({ id }: { id: number }) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state: RootState) => {
    const item = state.cart.cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  });

  const increment = () => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const decrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      dispatch(updateQuantity({ id, quantity: val }));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="flex items-center space-x-2 pt-3 text-4xl">
      <button
        onClick={decrement}
        className="w-[128px] h-[68px] bg-[#222222] text-white rounded-xl hover:bg-gray-800 transition"
      >
        –
      </button>

      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={handleChange}
        className="w-[128px] h-[68px] text-center bg-[#222222] text-white  rounded-xl outline-none appearance-none"
        min={1}
      />

      <button
        onClick={increment}
        className="w-[128px] h-[68px] bg-[#222222] text-white  rounded-xl hover:bg-gray-800 transition"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
