import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface LocalCartItem {
  productId: bigint;
  quantity: number;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
}

interface AppContextType {
  cartCount: number;
  setCartCount: (n: number) => void;
  wishlistIds: bigint[];
  setWishlistIds: (ids: bigint[]) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  localCart: LocalCartItem[];
  addToLocalCart: (item: Omit<LocalCartItem, "quantity">) => void;
  removeFromLocalCart: (productId: bigint) => void;
  clearLocalCart: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const CART_KEY = "orthocare_cart";

function loadCart(): LocalCartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((item: any) => ({
      ...item,
      productId: BigInt(item.productId),
    }));
  } catch {
    return [];
  }
}

function saveCart(cart: LocalCartItem[]) {
  try {
    const serializable = cart.map((item) => ({
      ...item,
      productId: item.productId.toString(),
    }));
    localStorage.setItem(CART_KEY, JSON.stringify(serializable));
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<bigint[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [localCart, setLocalCart] = useState<LocalCartItem[]>(loadCart);

  useEffect(() => {
    saveCart(localCart);
    setCartCount(localCart.reduce((s, i) => s + i.quantity, 0));
  }, [localCart]);

  const addToLocalCart = (item: Omit<LocalCartItem, "quantity">) => {
    setLocalCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromLocalCart = (productId: bigint) => {
    setLocalCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearLocalCart = () => {
    setLocalCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        cartCount,
        setCartCount,
        wishlistIds,
        setWishlistIds,
        cartOpen,
        setCartOpen,
        localCart,
        addToLocalCart,
        removeFromLocalCart,
        clearLocalCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
