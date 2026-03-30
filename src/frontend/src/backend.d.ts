import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface Product {
  id: bigint;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: bigint;
  inStock: boolean;
  doctorRecommended: boolean;
  imageUrl: string;
}

export interface CartItem {
  productId: bigint;
  quantity: bigint;
}

export interface Order {
  id: bigint;
  userId: Principal;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: bigint;
}

export interface backendInterface {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: bigint): Promise<Option<Product>>;
  getCart(): Promise<CartItem[]>;
  addToCart(productId: bigint, quantity: bigint): Promise<void>;
  removeFromCart(productId: bigint): Promise<void>;
  clearCart(): Promise<void>;
  getWishlist(): Promise<bigint[]>;
  toggleWishlist(productId: bigint): Promise<void>;
  placeOrder(items: CartItem[], total: number): Promise<bigint>;
  getOrders(): Promise<Order[]>;
}
