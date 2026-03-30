import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { LogOut, Package, User } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useOrders } from "../hooks/useQueries";

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  packed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

export function AccountPage() {
  const { identity, login, clear } = useInternetIdentity();
  const { data: orders = [], isLoading } = useOrders();

  if (!identity) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-bold mb-2">
          Please Login to View Your Account
        </h2>
        <p className="text-muted-foreground mb-6">
          Access your orders and account details.
        </p>
        <Button onClick={login} data-ocid="account.primary_button">
          Login
        </Button>
      </div>
    );
  }

  const principal = identity.getPrincipal().toString();
  const shortPrincipal = `${principal.slice(0, 12)}...${principal.slice(-4)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile */}
      <div className="bg-light-section rounded-xl p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">My Account</h2>
            <p className="text-xs text-muted-foreground font-mono">
              {shortPrincipal}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={clear}
          className="gap-2"
          data-ocid="account.delete_button"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      {/* Orders */}
      <div>
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" /> My Orders
        </h3>

        {isLoading ? (
          <div className="space-y-4" data-ocid="account.loading_state">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-24 rounded-lg" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div
            className="text-center py-16 border-2 border-dashed border-border rounded-xl"
            data-ocid="account.empty_state"
          >
            <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="font-semibold mb-1">No orders yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Your order history will appear here.
            </p>
            <Button asChild data-ocid="account.primary_button">
              <Link to="/shop" search={{ category: undefined }}>
                Shop Now
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="account.table">
            {orders.map((order, i) => {
              const statusKey = order.status.toLowerCase();
              return (
                <div
                  key={order.id.toString()}
                  className="bg-white border border-border rounded-lg p-5 shadow-xs"
                  data-ocid={`account.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-semibold">
                        Order #{order.id.toString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {order.items.length} item(s) · ₹
                        {order.total.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          STATUS_COLORS[statusKey] ??
                          "bg-gray-100 text-gray-700"
                        }
                      >
                        {order.status}
                      </Badge>
                      <Link
                        to="/orders/$id"
                        params={{ id: order.id.toString() }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          data-ocid={`account.secondary_button.${i + 1}`}
                        >
                          Track Order
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
