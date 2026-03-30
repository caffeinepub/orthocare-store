import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Users } from "lucide-react";
import { useState } from "react";

interface Customer {
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  joinedDate: string;
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    totalOrders: 3,
    joinedDate: "2025-11-10",
  },
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@yahoo.com",
    phone: "+91 87654 32109",
    city: "Delhi",
    totalOrders: 1,
    joinedDate: "2025-12-01",
  },
  {
    name: "Ananya Patel",
    email: "ananya.patel@gmail.com",
    phone: "+91 76543 21098",
    city: "Ahmedabad",
    totalOrders: 4,
    joinedDate: "2025-10-15",
  },
  {
    name: "Suresh Nair",
    email: "suresh.nair@hotmail.com",
    phone: "+91 65432 10987",
    city: "Kochi",
    totalOrders: 1,
    joinedDate: "2026-01-05",
  },
  {
    name: "Meena Iyer",
    email: "meena.iyer@gmail.com",
    phone: "+91 54321 09876",
    city: "Chennai",
    totalOrders: 2,
    joinedDate: "2025-09-20",
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@outlook.com",
    phone: "+91 43210 98765",
    city: "Jaipur",
    totalOrders: 2,
    joinedDate: "2026-02-14",
  },
  {
    name: "Deepa Menon",
    email: "deepa.menon@gmail.com",
    phone: "+91 32109 87654",
    city: "Bangalore",
    totalOrders: 5,
    joinedDate: "2025-08-30",
  },
  {
    name: "Arjun Reddy",
    email: "arjun.reddy@gmail.com",
    phone: "+91 21098 76543",
    city: "Hyderabad",
    totalOrders: 1,
    joinedDate: "2026-03-01",
  },
];

export function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-admin-navy font-display">
            Customer Management
          </h2>
          <p className="text-muted-foreground mt-1">
            View and manage your registered customers.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl">
          <Users className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {MOCK_CUSTOMERS.length} Total Customers
          </span>
        </div>
      </div>

      <Card className="border-0 shadow-md rounded-2xl">
        <CardContent className="p-6">
          {/* Search */}
          <div className="relative mb-5 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="customers.search_input"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border">
            <Table data-ocid="customers.table">
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-admin-navy">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy hidden md:table-cell">
                    Phone
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy hidden lg:table-cell">
                    City
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy">
                    Orders
                  </TableHead>
                  <TableHead className="font-semibold text-admin-navy hidden sm:table-cell">
                    Joined
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="customers.empty_state"
                    >
                      No customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((c, i) => (
                    <TableRow
                      key={c.email}
                      data-ocid={`customers.row.item.${i + 1}`}
                    >
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {c.email}
                      </TableCell>
                      <TableCell className="text-sm hidden md:table-cell">
                        {c.phone}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {c.city}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                          {c.totalOrders}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">
                        {c.joinedDate}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Showing {filtered.length} of {MOCK_CUSTOMERS.length} customers
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
