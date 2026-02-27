import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IOrder, ICart } from "../../../types/listOrder";
import { getOrderByID } from "../../../services/order.service";
import styles from "./DetailOrder.module.css";

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrderByID(id as string);
      setOrder(result);
    };
    fetchOrder();
  }, []);

  console.log(order);
  return (
    <main>
      <section className={styles.detail}>
        <h1 className={styles.title}>Detail Order</h1>
        <div className={styles.containerDetail}>
          <div className={styles.wrapperCustomer}>
            <h2>Data Customer</h2>
            <div className={styles.cardCustomer}>
              <p>Name: {order?.customer_name}</p>
              <p>Table Number: {order?.table_number}</p>
              <p>Status: {order?.status}</p>
              <p>Total Price: ${order?.total}</p>
            </div>
          </div>
          <div className={styles.wrapperMenu}>
            <h2>Orders Item</h2>
            <div className={styles.containerCardMenu}>
              {order?.cart?.map((menu: ICart) => (
                <div className={styles.cardMenu}>
                  <img
                    src={menu?.menuItem?.image_url}
                    alt={menu?.menuItem?.name}
                    className={styles.imageMenu}
                    width={100}
                    height={100}
                  />
                  <p>Product: {menu?.menuItem?.name}</p>
                  <p>Notes: {menu?.notes || "-"}</p>
                  <p>
                    Price: ${menu?.menuItem?.price} x {menu?.quantity} = ${Number(menu?.menuItem?.price) * (menu?.quantity || 0)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailOrder;
