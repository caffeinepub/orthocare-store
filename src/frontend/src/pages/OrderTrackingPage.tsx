import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useOrders } from "../hooks/useQueries";

const STEPS = [
  { key: "confirmed", label: "Order Confirmed", icon: CheckCircle },
  { key: "packed", label: "Packed", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: MapPin },
];

const STEP_INDEX: Record<string, number> = {
  confirmed: 0,
  packed: 1,
  shipped: 2,
  delivered: 3,
};

export function OrderTrackingPage({ id }: { id: bigint }) {
  const { identity, login } = useInternetIdentity();
  const { data: orders = [] } = useOrders();

  if (!identity) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">
          Please login to track your order.
        </p>
        <Button onClick={login} data-ocid="tracking.primary_button">
          Login
        </Button>
      </div>
    );
  }

  const order = orders.find((o) => o.id === id);

  // Demo order for display when no backend data
  const demoOrder = {
    id,
    status: "shipped",
    items: [] as any[],
    total: 0,
    createdAt: BigInt(Date.now()),
  };

  const displayOrder = order ?? demoOrder;
  const currentStep = STEP_INDEX[displayOrder.status.toLowerCase()] ?? 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/account"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        data-ocid="tracking.link"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Account
      </Link>

      <div className="bg-white border border-border rounded-xl p-8 shadow-card">
        <h1 className="text-2xl font-bold mb-1">Order #{id.toString()}</h1>
        <p className="text-muted-foreground text-sm mb-10">
          Status:{" "}
          <span className="font-semibold text-primary capitalize">
            {displayOrder.status}
          </span>
        </p>

        {/* Stepper */}
        <div className="relative" data-ocid="tracking.panel">
          {/* Progress bar */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-border -z-0">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-between relative z-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const completed = i <= currentStep;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      completed
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-border text-muted-foreground"
                    }`}
                  >
                    {completed ? (
                      <Icon className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      completed ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {currentStep === STEPS.length - 1 && (
          <div className="mt-10 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-700">
              Your order has been delivered!
            </p>
            <p className="text-sm text-green-600">
              Thank you for shopping with OrthoCare.
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-light-section rounded-lg">
          <p className="text-sm text-muted-foreground">
            📦 Items: {displayOrder.items.length || "—"}
            <br />💰 Total:{" "}
            {displayOrder.total
              ? `₹${displayOrder.total.toLocaleString("en-IN")}`
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
