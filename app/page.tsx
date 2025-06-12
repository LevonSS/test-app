import ReviewCard from "@/components/ReviewCard/ReviewCard";
import { getProducts } from "./products/data";
import { getReviews } from "./reviews/data";
import ProductCard from "@/components/ProductCard/ProductCard";
import Cart from "@/components/Cart/Cart";

type Reviews = {
  id: number;
  text: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
};
export default async function Home() {
  const reviews = await getReviews();
  const products = await getProducts();

  return (
    <div>
      <main className="w-full m-auto p-4 lg:w-[90vw] lg:p-16">
        <h1 className="flex items-center justify-center w-full text-[40px] px-4 py-2 text-center text-base/tight bg-[#777777] rounded-[15px] mb-20 md:py-4 md:text-[4vw]">
          тестовое задание
        </h1>
        <section className="flex flex-wrap justify-center w-full sm:justify-start  xl:w-[1000px] sm:gap-4 xl:gap-8 m-auto">
          {reviews.map((review: Reviews) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>
        <section className="flex flex-wrap justify-center w-full sm:justify-start  xl:w-[1000px] sm:gap-4 xl:gap-8 m-auto pt-40">
          <Cart />
        </section>
        <section className="flex flex-wrap justify-center w-full mt-10 sm:justify-start sm:w-[100%] xl:w-[1000px] sm:gap-4 xl:gap-8 m-auto">
          {products.items.map((item: Product) => (
            <ProductCard
              key={item.id}
              id={item.id}
              imageSrc={item.image_url}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
