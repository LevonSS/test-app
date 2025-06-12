export async function getProducts() {
  const res = await fetch(
    `${process.env.API_URL}/products?page=1&page_size=20`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}
