import { Card, CardContent } from "@/components/ui/card";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { Package, ShoppingBag, Users } from "lucide-react";

const ORDERS_COUNT = 10;
const CUSTOMERS_COUNT = 8;

const stats = [
  {
    label: "Total Products",
    value: MOCK_PRODUCTS.length,
    icon: Package,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Total Orders",
    value: ORDERS_COUNT,
    icon: ShoppingBag,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    label: "Total Customers",
    value: CUSTOMERS_COUNT,
    icon: Users,
    color: "bg-sky-50 text-sky-600",
  },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-admin-navy font-display">
          Welcome, Admin 👋
        </h2>
        <p className="text-muted-foreground mt-1">
          Here's what's happening in your store today.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        data-ocid="admin.dashboard.panel"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="border-0 shadow-md rounded-2xl hover:shadow-lg transition-shadow"
              data-ocid={`admin.stat.item.${i + 1}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold text-admin-navy mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-admin-navy mb-3">
              Recent Orders
            </h3>
            <div className="divide-y">
              {[
                {
                  id: "ORD-010",
                  customer: "Mohan Das",
                  amount: 2397,
                  status: "Delivered",
                },
                {
                  id: "ORD-009",
                  customer: "Kavitha Bhat",
                  amount: 1598,
                  status: "Pending",
                },
                {
                  id: "ORD-008",
                  customer: "Arjun Reddy",
                  amount: 499,
                  status: "Processing",
                },
              ].map((o) => (
                <div
                  key={o.id}
                  className="py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{o.customer}</p>
                    <p className="text-xs text-muted-foreground">{o.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ₹{o.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">{o.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-admin-navy mb-3">
              Recent Customers
            </h3>
            <div className="divide-y">
              {[
                {
                  name: "Arjun Reddy",
                  city: "Hyderabad",
                  joined: "2026-03-01",
                },
                { name: "Vikram Singh", city: "Jaipur", joined: "2026-02-14" },
                { name: "Suresh Nair", city: "Kochi", joined: "2026-01-05" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.city}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.joined}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
