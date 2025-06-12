"use client";

import { addToCart } from "@/features/cart/cartSlice";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import QuantityInput from "../QuantityInput/QuantityInput";
import styles from "./ProductCard.module.scss";
import Button from "../Button/Button";

interface ProductCardProps {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

const ProductCard = ({
  id,
  imageSrc,
  title,
  description,
  price,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state: RootState) => {
    const item = state.cart.cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  });

  const isActive = quantity > 0;

  const addItem = () => {
    console.log(quantity);
    dispatch(addToCart({ id, quantity: 1, price, title }));
  };
  return (
    <div
      className={`${styles.productCard} w-[330px] rounded-xl overflow-hidden my-2.5 border border-gray-300 bg-white shadow-md`}
    >
      <div className="p-2.5">
        <div className="w-full h-[366px] relative">
          <Image
            src={imageSrc}
            alt={title}
            sizes="200px"
            fill
            className="object-cover rounded-xl overflow-hidden"
            unoptimized
            priority
          />
        </div>
      </div>

      <div className="p-2.5 text-sm text-black">
        <h2 className=" text-center text-4xl  mb-5">{title}</h2>
        <p className="text-gray-700 text-2xl whitespace-pre-wrap h-32">
          {description}
        </p>
        <p className="my-3 text-4xl text-center text-md">цена: {price}₽</p>

        {!isActive ? (
          <Button action={addItem}>купить</Button>
        ) : (
          <QuantityInput id={id} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
