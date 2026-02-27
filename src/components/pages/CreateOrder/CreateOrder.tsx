import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ICart, IMenuItem } from "../../../types/listOrder";
import { getMenu } from "../../../services/menu.service";
import styles from "./CreateOrder.module.css";
import { filters } from "./CreateOrderConstants";
import Button from "../../ui/Button";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const result = await getMenu(searchParams.get("category") as string);
      setMenus(result.data);
    };
    fetchMenus();
  }, [searchParams.get("category")]);

  return (
    <main>
      <section className={styles.createOrder}>
        <div className={styles.menuList}>
          <nav className={styles.filterCategory}>
            {filters.map((filter) => (
              <Button
                type="button"
                color={
                  (!searchParams.get("category") && filter === "All") ||
                  searchParams.get("category") === filter
                    ? "primary"
                    : "secondary"
                }
                key={filter}
                onClick={() =>
                  setSearchParams(filter === "All" ? {} : { category: filter })
                }
              >
                {filter}
              </Button>
            ))}
          </nav>
          <div className={styles.containerMenu}>
            {menus.map((menu: IMenuItem) => (
              <div className={styles.cardMenu} key={menu.id}>
                <img src={menu.image_url} alt={menu.name} className={styles.menuImage}/>
                <h3>{menu.name}</h3>
                <p>{menu.description}</p>
                <div className={styles.bottom}>
                <p className={styles.price}>${menu.price}</p>
                  <Button type="button" color="primary" onClick={() => {}}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className={styles.createOrderAside}>
          <h2>Cart</h2>
          
        </aside>
      </section>
    </main>
  );
};

export default CreateOrder;
