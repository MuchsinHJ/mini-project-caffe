import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../../../services/order.service";
import styles from "./ListOrder.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import type { IOrder } from "../../../types/listOrder";
import { removeLocalStorage } from "../../../utils/storage";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [refetchOrder, setRefetchOrder] = useState(true);

  useEffect(() => {
    if (refetchOrder) {
      const fetchOrder = async () => {
        const result = await getOrders();
        setOrders(result.data);
        setRefetchOrder(false);
      };
      fetchOrder();
    }
  }, [refetchOrder]);

  const handleCompleateOrder = async (id: string) => {
    await updateOrder(id, {status: 'COMPLETED'}).then(()=>{
      setRefetchOrder(true);
    })
  }

  const navigate = useNavigate();
  const handleLogout = () =>{
    removeLocalStorage('auth')
    return navigate('/login')
  }

  return (
    <main className={styles.order}>
      <header className={styles.header}>
        <h1 className={styles.title}>Order List</h1>
        <div className={styles.wrapper_button}>
          <Link to="/create">
            <Button>Create Order</Button>
          </Link>
          <Button color="secondary" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      <section className={styles.content}>
        <table
          border={1}
          className={styles.table}
          cellSpacing={0}
          cellPadding={10}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>Table</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder, index: number) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer_name}</td>
                <td>{order.table_number}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td className={styles.action}>
                  <Link to={`/orders/${order.id}`}>
                    <Button>Detail</Button>
                  </Link>
                  {order.status === "PROCESSING" && (
                    <Button onClick={() => {handleCompleateOrder(order.id)}}>Completed</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ListOrder;
