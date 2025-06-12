"use client";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setPhone } from "@/features/cart/cartSlice";
import Button from "../Button/Button";
import { isPhoneValid } from "@/lib/formatPhone";

const formatPhone = (digits: string) => {
  const d = digits.slice(0, 10);
  let result = "+7 ";
  if (d.length > 0) result += "(";
  if (d.length >= 1) result += d.substring(0, 3);
  if (d.length >= 4) result += ") ";
  if (d.length >= 4) result += d.substring(3, 6);
  if (d.length >= 7) result += "-";
  if (d.length >= 7) result += d.substring(6, 8);
  if (d.length >= 9) result += "-";
  if (d.length >= 9) result += d.substring(8, 10);
  return result;
};

const PhoneInput = () => {
  const dispatch = useDispatch();
  const phone = useSelector((state: RootState) => state.cart.phone);
  const cart = useSelector((state: RootState) => state.cart.cart);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDigits = e.target.value.replace(/\D/g, "").slice(1);

    const formattedPhone = formatPhone(inputDigits);
    dispatch(setPhone(formattedPhone));

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          inputRef.current.value.length;
      }
    });
  };
  const cleanedCart = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const payload = {
    phone: phone.replace(/\D/g, ""),
    cart: cleanedCart,
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError("Phone number is required.");
    } else if (!isPhoneValid(phone)) {
      setError("Phone number format is invalid.");
    } else {
      setError(null);
      setLoading(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("Order response:", data);
      } catch (error) {
        console.error("Order error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sm:flex sm:items-end sm:gap-4">
      <div className="w-full mb-4 sm:mb-0">
        <input
          ref={inputRef}
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          name="phone"
          onChange={handleChange}
          maxLength={18}
          className="bg-[#222222] text-2xl w-full h-[68px] text-white rounded-2xl px-4 py-2 outline-none"
          autoComplete="tel"
        />
        {error && <p className="text-red-500 mt-1 text-sm absolute">{error}</p>}
      </div>
      <Button type="submit" loading={loading}>
        {loading ? "отправка..." : "заказать"}
      </Button>
    </form>
  );
};

export default PhoneInput;
