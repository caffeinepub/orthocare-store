import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    date: "2026-03-15",
    items: 2,
    amount: 1198,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    customer: "Rajesh Kumar",
    date: "2026-03-18",
    items: 1,
    amount: 599,
    status: "Shipped",
  },
  {
    id: "ORD-003",
    customer: "Ananya Patel",
    date: "2026-03-20",
    items: 3,
    amount: 2097,
    status: "Processing",
  },
  {
    id: "ORD-004",
    customer: "Suresh Nair",
    date: "2026-03-21",
    items: 1,
    amount: 799,
    status: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Meena Iyer",
    date: "2026-03-22",
    items: 2,
    amount: 1398,
    status: "Delivered",
  },
  {
    id: "ORD-006",
    customer: "Vikram Singh",
    date: "2026-03-23",
    items: 1,
    amount: 649,
    status: "Cancelled",
  },
  {
    id: "ORD-007",
    customer: "Deepa Menon",
    date: "2026-03-24",
    items: 4,
    amount: 3196,
    status: "Shipped",
  },
  {
    id: "ORD-008",
    customer: "Arjun Reddy",
    date: "2026-03-24",
    items: 1,
    amount: 499,
    status: "Processing",
  },
  {
    id: "ORD-009",
    customer: "Kavitha Bhat",
    date: "2026-03-25",
    items: 2,
    amount: 1598,
    status: "Pending",
  },
  {
    id: "ORD-010",
    customer: "Mohan Das",
    date: "2026-03-25",
    items: 3,
    amount: 2397,
    status: "Delivered",
  },
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Processing: "bg-blue-100 text-blue-800 border-blue-200",
  Shipped: "bg-purple-100 text-purple-800 border-purple-200",
  Delivered: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()),
  );

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-admin-navy font-display">
          Order Management
        </h2>
        <p className="text-muted-foreground mt-1">
          Track and update customer orders.
        </p>
      </div>

      <Card className="border-0 shadow-md rounded-2xl">
        <CardContent className="p-6">
          {/* Search */}
          <div className="relative mb-5 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or order ID…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="orders.search_input"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border">
            <Table data-ocid="orders.table">
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-admin-navy">
                    Order ID
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy hidden sm:table-cell">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy hidden md:table-cell">
                    Items
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy">
                    Amount
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="orders.empty_state"
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((order, i) => (
                    <TableRow
                      key={order.id}
                      data-ocid={`orders.row.item.${i + 1}`}
                    >
                      <TableCell className="font-mono text-sm font-semibold text-blue-700">
                        {order.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.customer}
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden sm:table-cell">
                        {order.date}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.items}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs w-fit ${STATUS_STYLES[order.status]}`}
                          >
                            {order.status}
                          </Badge>
                          <Select
                            value={order.status}
                            onValueChange={(val) =>
                              updateStatus(order.id, val as OrderStatus)
                            }
                          >
                            <SelectTrigger
                              className="h-7 text-xs w-32"
                              data-ocid={`orders.status.select.${i + 1}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {(
                                [
                                  "Pending",
                                  "Processing",
                                  "Shipped",
                                  "Delivered",
                                  "Cancelled",
                                ] as OrderStatus[]
                              ).map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs"
                                >
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Showing {filtered.length} of {orders.length} orders
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
