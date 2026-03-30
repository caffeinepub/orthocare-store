import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useProducts, useWishlist } from "../hooks/useQueries";

export function WishlistPage() {
  const { identity, login } = useInternetIdentity();
  const { data: wishlistIds = [] } = useWishlist();
  const { data: products = [] } = useProducts();

  if (!identity) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-bold mb-2">
          Please Login to View Wishlist
        </h2>
        <p className="text-muted-foreground mb-6">
          Save your favourite products.
        </p>
        <Button onClick={login} data-ocid="wishlist.primary_button">
          Login to Continue
        </Button>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) =>
    wishlistIds.some((id) => id === p.id),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        My Wishlist
      </h1>
      <p className="text-muted-foreground mb-8">
        {wishlistedProducts.length} saved items
      </p>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20" data-ocid="wishlist.empty_state">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Heart products you love to save them here.
          </p>
          <Button asChild data-ocid="wishlist.primary_button">
            <Link to="/shop" search={{ category: undefined }}>
              Browse Products
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product, i) => (
            <motion.div
              key={product.id.toString()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <ProductCard product={product} wishlisted={true} index={i + 1} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
