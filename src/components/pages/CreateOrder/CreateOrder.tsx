import { useEffect, useState, type FormEvent } from "react";
// import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { ICart, IMenuItem } from "../../../types/listOrder";
import { getMenu } from "../../../services/menu.service";
import styles from "./CreateOrder.module.css";
import { filters, tables } from "./CreateOrderConstants";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select/Select";
import { createOrder } from "../../../services/order.service";
import type { IMeta } from "../../../types/meta";
import { useCart } from "../../../hooks/useCart";
import MenuCard from "../../ui/MenuCard";
import CardSkeleton from "../../ui/CardSkeleton";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<IMeta>();
  const category = searchParams.get("category") as string;
  const [isLoading, setIsLoading] = useState(true);
  const { carts, handleAddToCart } = useCart();
  const pages = Array.from({ length: meta?.totalPages ?? 0 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      const result = await getMenu(category, page);
      setMenus(result.data);
      setMeta(result.metadata);
      setIsLoading(false);
    };
    fetchMenus();
  }, [category, page]);

  const navigate = useNavigate();

  const handleOrder = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      customerName: form.customerName.value,
      tableNumber: form.tableNumber.value,
      cart: carts.map((item: ICart) => ({
        menuItemId: item.menuId,
        quantity: item.quantity,
        notes: item.notes,
      })),
    };
    await createOrder(payload);
    return navigate("/orders");
  };

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
            {isLoading ? (
              <CardSkeleton cards={6} />
            ) : (
              menus.map((item: IMenuItem) => (
                <MenuCard
                  key={item.id}
                  {...item}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>

          {!isLoading && (
            <div className={styles.pagination}>
              {pages.map((pageNumber) => (
                <Button
                  key={pageNumber}
                  color={pageNumber === page ? "primary" : "secondary"}
                  onClick={() => setPage(pageNumber)}
                  disabled={pageNumber === page}
                >
                  {`${pageNumber}`}
                </Button>
              ))}
            </div>
          )}
        </div>
        <aside className={styles.createOrderAside}>
          <form className={styles.cartForm} onSubmit={handleOrder}>
            <div className={styles.containerCustomer}>
              <div className={styles.header}>
                <h2 className={styles.customerTitle}>Customer Information</h2>
                <Link to="/orders">
                  <Button type="button" color="secondary">
                    Cancel
                  </Button>
                </Link>
              </div>
              <div className={styles.inputCustomer}>
                <Input
                  id="name"
                  label="Name"
                  name="customerName"
                  placeholder="Insert Name"
                  required
                />
                <Select
                  id="table"
                  label="Table Number"
                  name="tableNumber"
                  required
                  options={tables}
                />
              </div>
            </div>
            <div className={styles.containerOrder}>
              <h2 className={styles.orderTitle}>Current Order</h2>
              {carts.length > 0 ? (
                <ul className={styles.orderList}>
                  {carts.map((item: ICart) => (
                    <li className={styles.item} key={item.menuId}>
                      <h4 className={styles.name}>{item.name}</h4>
                      <div className={styles.quantity}>
                        <Button
                          color="secondary"
                          onClick={() =>
                            handleAddToCart(
                              "increment",
                              item.menuId as string,
                              item.name as string,
                            )
                          }
                        >
                          +
                        </Button>
                        <span aria-live="polite">{item.quantity}</span>
                        <Button
                          color="secondary"
                          onClick={() =>
                            handleAddToCart(
                              "decrement",
                              item.menuId as string,
                              item.name as string,
                            )
                          }
                        >
                          -
                        </Button>
                      </div>
                    </li>
                  ))}
                  <Button type="submit" color="primary">
                    Order
                  </Button>
                </ul>
              ) : (
                <div className={styles.cartEmpty}>
                  <p className={styles.emptyMessage}>No items in cart</p>
                </div>
              )}
            </div>
          </form>
        </aside>
      </section>
    </main>
  );
};

export default CreateOrder;
