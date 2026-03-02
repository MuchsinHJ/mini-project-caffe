import Skeleton from "react-loading-skeleton";
import styles from "./CardSkeleton.module.css";

const CardSkeleton = ({ cards = 0 }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className={styles.cardSkeleton} key={index}>
        <Skeleton height={150} width="100%" className={styles.skeletonImage} />
        <Skeleton height={20} width="60%" />
        <Skeleton height={12} width="100%" count={2} />
        <div className={styles.bottom}>
          <Skeleton className={styles.skeletonPrice} />
          <Skeleton className={styles.skeletonButton} />
        </div>
      </div>
    ));
};

export default CardSkeleton;
