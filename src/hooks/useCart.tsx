import { useState } from "react";
import type { ICart } from "../types/listOrder";

export const useCart = () => {
  const [carts, setCarts] = useState<ICart[]>([]);

  const handleAddToCart = (type: string, menuId: string, name: string) => {
    const itemIsInCart = carts.find((cart: ICart) => cart.menuId === menuId);
    if (type === "increment") {
      if (itemIsInCart) {
        setCarts(
          carts.map((item: ICart) =>
            item.menuId === menuId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      } else {
        setCarts([...carts, { menuId, quantity: 1, notes: "", name }]);
      }
    } else {
      if (itemIsInCart && itemIsInCart.quantity <= 1) {
        setCarts(carts.filter((item: ICart) => item.menuId !== menuId));
      } else {
        setCarts(
          carts.map((item: ICart) =>
            item.menuId === menuId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        );
      }
    }
  };

  return {carts, handleAddToCart}
};
