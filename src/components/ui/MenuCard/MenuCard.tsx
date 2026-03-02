import type { IMenuItem } from "../../../types/listOrder";
import Button from "../Button/Button";
import styles from "./MenuCard.module.css";


const MenuCard = (item: IMenuItem) => {
  const {id, name, description, image_url, price, onAddToCart} = item;
  return (
    <div className={styles.menuCard} key={id}>
      <img src={image_url} alt={name} className={styles.menuImage} />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className={styles.bottom}>
        <p className={styles.price}>${price}</p>
        <Button
          type="button"
          color="primary"
          onClick={() =>
            onAddToCart?.("increment", id as string, name as string)
          }
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MenuCard;