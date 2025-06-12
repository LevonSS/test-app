"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import PhoneInput from "../PhoneInput/PhoneInput";
import styles from "./Cart.module.scss";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <div className={`${styles.cart}`}>
      <h2 className="text-4xl text-center mb-4">Добавленные товары</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.title}</span>
            <span>X{item.quantity}</span>
            <span>{item.quantity * item.price}</span>
          </li>
        ))}
      </ul>
      <PhoneInput />
    </div>
  );
};

export default Cart;
