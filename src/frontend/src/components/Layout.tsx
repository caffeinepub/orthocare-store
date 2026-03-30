import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCart, useWishlist } from "../hooks/useQueries";

const CATEGORIES = [
  "Knee Support",
  "Back Support Belts",
  "Cervical Collars",
  "Arm Slings",
  "Wrist & Ankle Braces",
  "Orthopedic Cushions",
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { identity, login, clear } = useInternetIdentity();
  const { cartCount, setCartCount, wishlistIds, setWishlistIds } =
    useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: cartItems } = useCart();
  const { data: wishlistData } = useWishlist();

  useEffect(() => {
    if (cartItems) setCartCount(cartItems.length);
  }, [cartItems, setCartCount]);

  useEffect(() => {
    if (wishlistData) setWishlistIds(wishlistData);
  }, [wishlistData, setWishlistIds]);

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Utility bar */}
      <div className="bg-navy text-white text-xs py-2 px-4 text-center">
        🚚 Free Delivery on orders above ₹999 &nbsp;|&nbsp; Doctor Recommended
        Products &nbsp;|&nbsp; Easy Returns within 7 Days
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2"
              data-ocid="nav.link"
            >
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <div>
                <span className="font-bold text-navy text-lg leading-none">
                  OrthoCare
                </span>
                <p className="text-xs text-muted-foreground leading-none">
                  Store
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-6"
              data-ocid="nav.panel"
            >
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-ocid="nav.link"
              >
                Home
              </Link>
              <div className="relative group">
                <Link
                  to="/shop"
                  search={{ category: undefined }}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  data-ocid="nav.link"
                >
                  Products
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 bg-white border border-border rounded-lg shadow-lg py-2 w-52 hidden group-hover:block z-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      to="/shop"
                      search={{ category: cat }}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-light-section hover:text-primary transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-ocid="nav.link"
              >
                Contact
              </Link>
              <Link
                to="/policies"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-ocid="nav.link"
              >
                Policies
              </Link>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-foreground hover:text-primary transition-colors"
                data-ocid="nav.search_input"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => (identity ? clear() : login())}
                className="p-2 text-foreground hover:text-primary transition-colors hidden sm:block"
                data-ocid="nav.button"
              >
                <User className="w-5 h-5" />
              </button>
              <Link
                to="/wishlist"
                className="p-2 text-foreground hover:text-primary transition-colors relative"
                data-ocid="nav.link"
              >
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="p-2 text-foreground hover:text-primary transition-colors relative"
                data-ocid="nav.link"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(true)}
                data-ocid="nav.toggle"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Sheet */}
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="top" className="h-auto pt-6">
          <SheetHeader>
            <SheetTitle>Search Products</SheetTitle>
          </SheetHeader>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Search for knee support, back belt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchOpen(false);
                }
              }}
              className="flex-1"
              data-ocid="search.input"
              autoFocus
            />
            <Button
              onClick={() => setSearchOpen(false)}
              data-ocid="search.submit_button"
            >
              Search
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-3 mt-6">
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["Cart", "/cart"],
              ["Wishlist", "/wishlist"],
              ["Account", "/account"],
              ["Contact", "/contact"],
              ["Policies", "/policies"],
            ].map(([label, path]) => (
              <Link
                key={path}
                to={path as any}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary py-2 border-b border-border"
                data-ocid="nav.link"
              >
                {label}
              </Link>
            ))}
            <Button
              onClick={() => {
                identity ? clear() : login();
                setMobileMenuOpen(false);
              }}
              variant="outline"
              className="mt-2"
              data-ocid="nav.button"
            >
              {identity ? "Logout" : "Login"}
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-navy text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OC</span>
                </div>
                <span className="font-bold text-white text-lg">
                  OrthoCare Store
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Your trusted destination for high-quality orthopedic support
                products. Comfort. Support. Recovery.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-white/70">
                <Mail className="w-4 h-4" />
                <span>support@orthocare.com</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {[
                  ["Home", "/"],
                  ["Shop All Products", "/shop"],
                  ["About Us", "/"],
                  ["Contact Us", "/contact"],
                ].map(([label, path]) => (
                  <li key={label}>
                    <Link
                      to={path as any}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Policies</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {[
                  "Privacy Policy",
                  "Shipping & Delivery",
                  "Return & Refund",
                  "Medical Disclaimer",
                ].map((p) => (
                  <li key={p}>
                    <Link
                      to="/policies"
                      className="hover:text-white transition-colors"
                    >
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {["UPI", "Visa", "Mastercard", "COD"].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1 bg-white/10 rounded text-xs text-white/80 font-medium border border-white/20"
                  >
                    {method}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  ✅ Doctor Recommended
                </div>
                <div className="flex items-center gap-2">
                  ✅ Premium Quality
                </div>
                <div className="flex items-center gap-2">✅ Easy Returns</div>
                <div className="flex items-center gap-2">
                  ✅ Secure Checkout
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/60">
            © {year}. Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
