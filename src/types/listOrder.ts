interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available?: boolean;
  created_at?: string;
  onAddToCart?: (type: string, id: string, name: string) => void;
}

interface ICart {
  menuId?: string;
  quantity: number;
  notes?: string;
  menuItem?: IMenuItem;
  name?: string;
}

interface IOrder {
  id: string;
  customer_name: string;
  table_number: number;
  cart: ICart[];
  status: "PENDING" | "COMPLETED" | "PROCESSING";
  total: number;
}

export type { IOrder, ICart, IMenuItem };
