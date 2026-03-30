import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddToCart, usePlaceOrder } from "../hooks/useQueries";

export function CartPage() {
  const { identity, login } = useInternetIdentity();
  const { localCart, removeFromLocalCart, clearLocalCart, addToLocalCart } =
    useAppContext();
  const addToCartBackend = useAddToCart();
  const placeOrder = usePlaceOrder();

  const total = localCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleRemove = (productId: bigint) => {
    removeFromLocalCart(productId);
    toast.success("Removed from cart");
  };

  const handlePlaceOrder = async () => {
    if (localCart.length === 0) return;
    if (!identity) {
      toast.info("Please login to place your order.");
      login();
      return;
    }
    try {
      for (const item of localCart) {
        await addToCartBackend.mutateAsync({
          productId: item.productId,
          quantity: BigInt(item.quantity),
        });
      }
      const items = localCart.map((i) => ({
        productId: i.productId,
        quantity: BigInt(i.quantity),
      }));
      const orderId = await placeOrder.mutateAsync({ items, total });
      clearLocalCart();
      toast.success(`Order #${orderId} placed successfully!`);
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Shopping Cart
      </h1>

      {localCart.length === 0 ? (
        <div className="text-center py-20" data-ocid="cart.empty_state">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to get started.
          </p>
          <Button asChild data-ocid="cart.primary_button">
            <Link to="/shop" search={{ category: undefined }}>
              Browse Products
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {localCart.map((item, i) => (
              <div
                key={item.productId.toString()}
                className="flex gap-4 bg-white border border-border rounded-lg p-4 shadow-xs"
                data-ocid={`cart.item.${i + 1}`}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md bg-light-section flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{item.name}</p>
                  {item.category && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.category}
                    </p>
                  )}
                  <p className="text-sm font-bold mt-1">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.quantity <= 1) {
                          removeFromLocalCart(item.productId);
                        } else {
                          removeFromLocalCart(item.productId);
                          for (let q = 0; q < item.quantity - 1; q++) {
                            addToLocalCart({
                              productId: item.productId,
                              name: item.name,
                              price: item.price,
                              category: item.category,
                              imageUrl: item.imageUrl,
                            });
                          }
                        }
                      }}
                      className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        addToLocalCart({
                          productId: item.productId,
                          name: item.name,
                          price: item.price,
                          category: item.category,
                          imageUrl: item.imageUrl,
                        })
                      }
                      className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold text-primary ml-2">
                      = ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.productId)}
                  className="text-muted-foreground hover:text-destructive transition-colors self-start"
                  data-ocid={`cart.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-light-section rounded-xl p-6 border border-border sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({localCart.length} items)
                  </span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-600">
                    {total >= 999 ? "Free" : "₹99"}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-base mb-6">
                <span>Total</span>
                <span>
                  ₹{(total + (total >= 999 ? 0 : 99)).toLocaleString("en-IN")}
                </span>
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground gap-2"
                onClick={handlePlaceOrder}
                disabled={placeOrder.isPending || addToCartBackend.isPending}
                data-ocid="cart.submit_button"
              >
                Place Order <ArrowRight className="w-4 h-4" />
              </Button>
              {!identity && (
                <p className="text-xs text-amber-600 text-center mt-2">
                  Login required to place order
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center mt-2">
                Secure checkout · UPI · Card · COD
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
