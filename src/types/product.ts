export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'смартфоны' | 'телевизоры' | 'приставки';
  image_url: string;
  stock: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderData {
  customer_name: string;
  customer_email: string;
  customer_address: string;
  products: { product_id: string; quantity: number }[];
  total_price: number;
}