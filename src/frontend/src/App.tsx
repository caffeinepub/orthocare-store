import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AdminLayout } from "./components/AdminLayout";
import { Layout } from "./components/Layout";
import { ProtectedAdmin } from "./components/ProtectedAdmin";
import { AppProvider } from "./context/AppContext";
import { SiteContentProvider } from "./context/SiteContentContext";
import { AccountPage } from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { OrderTrackingPage } from "./pages/OrderTrackingPage";
import { PoliciesPage } from "./pages/PoliciesPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ShopPage } from "./pages/ShopPage";
import { WishlistPage } from "./pages/WishlistPage";
import { AdminAppManagementPage } from "./pages/admin/AdminAppManagementPage";
import { AdminCustomersPage } from "./pages/admin/AdminCustomersPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminEditWebsitePage } from "./pages/admin/AdminEditWebsitePage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";

// ---- Bare root (no layout) ----
const rootRoute = createRootRoute({
  component: () => (
    <SiteContentProvider>
      <AppProvider>
        <Outlet />
        <Toaster />
      </AppProvider>
    </SiteContentProvider>
  ),
});

// ---- Customer layout route ----
const customerLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "customer-layout",
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/shop",
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: function ShopRouteComponent() {
    const search = shopRoute.useSearch();
    return <ShopPage category={search.category} />;
  },
});

const productRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/product/$id",
  component: function ProductRouteComponent() {
    const { id } = productRoute.useParams();
    return <ProductDetailPage id={BigInt(id)} />;
  },
});

const cartRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/cart",
  component: CartPage,
});

const wishlistRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/wishlist",
  component: WishlistPage,
});

const accountRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/account",
  component: AccountPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/orders/$id",
  component: function OrdersRouteComponent() {
    const { id } = ordersRoute.useParams();
    return <OrderTrackingPage id={BigInt(id)} />;
  },
});

const contactRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/contact",
  component: ContactPage,
});

const policiesRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: "/policies",
  component: PoliciesPage,
});

// ---- Admin login (no admin layout) ----
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
});

// ---- Admin layout route ----
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  component: function AdminRouteComponent() {
    return (
      <ProtectedAdmin>
        <AdminDashboardPage />
      </ProtectedAdmin>
    );
  },
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/products",
  component: function AdminProductsRouteComponent() {
    return (
      <ProtectedAdmin>
        <AdminProductsPage />
      </ProtectedAdmin>
    );
  },
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/orders",
  component: function AdminOrdersRouteComponent() {
    return (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    );
  },
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/customers",
  component: function AdminCustomersRouteComponent() {
    return (
      <ProtectedAdmin>
        <AdminCustomersPage />
      </ProtectedAdmin>
    );
  },
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/settings",
  component: function AdminSettingsRouteComponent() {
    return (
      <ProtectedAdmin>
        <AdminSettingsPage />
      </ProtectedAdmin>
    );
  },
});

const adminAppRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/app",
  component: function AdminAppRouteComponent() {
    return (
      <ProtectedAdmin>
        <AdminAppManagementPage />
      </ProtectedAdmin>
    );
  },
});

const adminEditWebsiteRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/edit-website",
  component: function AdminEditWebsiteRouteComponent() {
    return (
      <ProtectedAdmin>
        <AdminEditWebsitePage />
      </ProtectedAdmin>
    );
  },
});

const routeTree = rootRoute.addChildren([
  customerLayoutRoute.addChildren([
    indexRoute,
    shopRoute,
    productRoute,
    cartRoute,
    wishlistRoute,
    accountRoute,
    ordersRoute,
    contactRoute,
    policiesRoute,
  ]),
  adminLoginRoute,
  adminLayoutRoute.addChildren([
    adminRoute,
    adminProductsRoute,
    adminOrdersRoute,
    adminCustomersRoute,
    adminSettingsRoute,
    adminAppRoute,
    adminEditWebsiteRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
