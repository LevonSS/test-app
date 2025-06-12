import styles from "./ReviewCard.module.scss";
interface Props {
  review: { id: number; text: string };
}

const ReviewCard = ({ review }: Props) => {
  const h1Match = review.text.match(/<h1>(.*?)<\/h1>/);
  const pMatch = review.text.match(/<p>(.*?)<\/p>/);

  const h1Text = h1Match ? h1Match[1] : null;
  const pText = pMatch ? pMatch[1] : null;

  return (
    <div className={`${styles.reviewBox} mb-6 sm:mb-0`}>
      <h2 className="mb-7 text-3xl">Отзыв {review.id}</h2>
      <p className="text-2xl mb-2.5">{h1Text}</p>
      <p className="text-2xl">{pText}</p>
    </div>
  );
};

export default ReviewCard;
