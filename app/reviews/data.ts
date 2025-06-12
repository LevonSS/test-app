export async function getReviews() {
  const res = await fetch(`${process.env.API_URL}/reviews`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Fail to load reviews");

  return res.json();
}
