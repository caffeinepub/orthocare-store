import { Button } from "@/components/ui/button";
import { useNavigate, useRouter } from "@tanstack/react-router";
import {
  AppWindow,
  Edit,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Products", icon: Package, to: "/admin/products" },
  { label: "Orders", icon: ShoppingBag, to: "/admin/orders" },
  { label: "Customers", icon: Users, to: "/admin/customers" },
  { label: "Edit Website", icon: Edit, to: "/admin/edit-website" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
  { label: "App", icon: AppWindow, to: "/admin/app" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPath = router.state.location.pathname;

  function handleLogout() {
    localStorage.removeItem("orthocare_admin_session");
    navigate({ to: "/admin/login" });
  }

  function isActive(to: string) {
    if (to === "/admin") return currentPath === "/admin";
    return currentPath.startsWith(to);
  }

  return (
    <div className="min-h-screen flex bg-admin-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-admin-sidebar flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-admin-sidebar-border">
          <div>
            <p className="text-xs font-medium text-blue-200 uppercase tracking-widest">
              OrthoCare
            </p>
            <h1 className="text-white font-bold text-lg font-display leading-tight">
              Admin Panel
            </h1>
          </div>
          <button
            type="button"
            className="lg:hidden text-blue-200 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1" data-ocid="admin.nav.panel">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <button
                type="button"
                key={link.label}
                onClick={() => {
                  navigate({ to: link.to as "/admin" });
                  setSidebarOpen(false);
                }}
                data-ocid={`admin.nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/20 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-admin-sidebar-border">
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="admin.logout.button"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              data-ocid="admin.sidebar.toggle"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="font-semibold text-admin-navy">OrthoCare Admin</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            data-ocid="admin.topbar.logout.button"
            className="hidden sm:flex items-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
