import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CartItem, Order, Product } from "../backend.d";
import { MOCK_PRODUCTS } from "../data/mockData";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return MOCK_PRODUCTS;
      try {
        const products = await (actor as any).getProducts();
        return products && products.length > 0 ? products : MOCK_PRODUCTS;
      } catch {
        return MOCK_PRODUCTS;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useProduct(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["product", id.toString()],
    queryFn: async () => {
      if (!actor) {
        return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
      }
      try {
        const result = await (actor as any).getProduct(id);
        if (result && result.__kind__ === "Some")
          return result.value as Product;
        return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
      } catch {
        return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
      }
    },
    enabled: !isFetching,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor) return MOCK_PRODUCTS.filter((p) => p.category === category);
      try {
        const products = await (actor as any).getProductsByCategory(category);
        return products && products.length > 0
          ? products
          : MOCK_PRODUCTS.filter((p) => p.category === category);
      } catch {
        return MOCK_PRODUCTS.filter((p) => p.category === category);
      }
    },
    enabled: !isFetching,
  });
}

export function useCart() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<CartItem[]>({
    queryKey: ["cart", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      try {
        return await (actor as any).getCart();
      } catch {
        return [];
      }
    },
    enabled: !!identity && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { identity } = useInternetIdentity();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).addToCart(productId, quantity);
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["cart", identity?.getPrincipal().toString()],
      });
    },
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { identity } = useInternetIdentity();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).removeFromCart(productId);
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["cart", identity?.getPrincipal().toString()],
      });
    },
  });
}

export function useWishlist() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<bigint[]>({
    queryKey: ["wishlist", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      try {
        return await (actor as any).getWishlist();
      } catch {
        return [];
      }
    },
    enabled: !!identity && !isFetching,
  });
}

export function useToggleWishlist() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { identity } = useInternetIdentity();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).toggleWishlist(productId);
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["wishlist", identity?.getPrincipal().toString()],
      });
    },
  });
}

export function useOrders() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<Order[]>({
    queryKey: ["orders", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      try {
        return await (actor as any).getOrders();
      } catch {
        return [];
      }
    },
    enabled: !!identity && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const { identity } = useInternetIdentity();
  return useMutation({
    mutationFn: async ({
      items,
      total,
    }: { items: CartItem[]; total: number }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).placeOrder(items, total) as Promise<bigint>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({
        queryKey: ["cart", identity?.getPrincipal().toString()],
      });
    },
  });
}
