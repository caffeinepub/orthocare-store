import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Heart,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { StarRating } from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import { getProductImage } from "../data/mockData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useProduct,
  useToggleWishlist,
  useWishlist,
} from "../hooks/useQueries";

export function ProductDetailPage({ id }: { id: bigint }) {
  const { data: product, isLoading } = useProduct(id);
  const { data: wishlistIds = [] } = useWishlist();
  const { identity, login } = useInternetIdentity();
  const { addToLocalCart } = useAppContext();
  const toggleWishlist = useToggleWishlist();

  if (isLoading) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10"
        data-ocid="product.loading_state"
      >
        <Skeleton className="h-96 rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-20 text-center"
        data-ocid="product.error_state"
      >
        <p className="text-muted-foreground text-lg">Product not found.</p>
        <Button asChild className="mt-4">
          <Link to="/shop" search={{ category: undefined }}>
            Back to Shop
          </Link>
        </Button>
      </div>
    );
  }

  const wishlisted = wishlistIds.some((wid) => wid === product.id);
  const img = getProductImage(product);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToLocalCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: img,
    });
    toast.success("Added to cart!");
  };

  const handleWishlist = async () => {
    if (!identity) {
      login();
      return;
    }
    try {
      await toggleWishlist.mutateAsync(product.id);
      toast.success(
        wishlisted ? "Removed from wishlist" : "Added to wishlist!",
      );
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/shop"
        search={{ category: undefined }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        data-ocid="product.link"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-light-section rounded-xl overflow-hidden">
            <img
              src={img}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <p className="text-sm text-primary font-medium mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <StarRating
              rating={product.rating}
              count={Number(product.reviewCount)}
            />
            {product.doctorRecommended && (
              <Badge className="bg-green-600 text-white gap-1 text-xs">
                <CheckCircle className="w-3 h-3" /> Doctor Recommended
              </Badge>
            )}
          </div>
          <p className="text-3xl font-bold text-foreground mb-4">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>
          <div className="flex gap-3 mb-6">
            <Button
              size="lg"
              className="flex-1 bg-primary text-primary-foreground gap-2"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              data-ocid="product.primary_button"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWishlist}
              data-ocid="product.toggle"
              className="px-4"
            >
              <Heart
                className={`w-5 h-5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          </div>
          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 border-t border-border pt-6">
            <div className="text-center">
              <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Secure Payment</p>
            </div>
            <div className="text-center">
              <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Fast Delivery</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">7-Day Returns</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
