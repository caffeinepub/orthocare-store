import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useAppContext } from "../context/AppContext";
import { getProductImage } from "../data/mockData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useToggleWishlist } from "../hooks/useQueries";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  wishlisted?: boolean;
  index?: number;
}

export function ProductCard({
  product,
  wishlisted = false,
  index = 1,
}: ProductCardProps) {
  const { identity, login } = useInternetIdentity();
  const { addToLocalCart } = useAppContext();
  const toggleWishlist = useToggleWishlist();
  const img = getProductImage(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToLocalCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: img,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to use wishlist");
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
    <div
      data-ocid={`product.item.${index}`}
      className="bg-white rounded-lg shadow-card border border-border overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id.toString() }}
        className="block"
      >
        <div className="relative overflow-hidden bg-light-section">
          <img
            src={img}
            alt={product.name}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            type="button"
            data-ocid={`product.toggle.${index}`}
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
          {product.doctorRecommended && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-600 text-white text-xs gap-1">
                <CheckCircle className="w-3 h-3" /> Doctor Recommended
              </Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-500">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-primary font-medium mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>
          <StarRating
            rating={product.rating}
            count={Number(product.reviewCount)}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <Button
              data-ocid={`product.primary_button.${index}`}
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="gap-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
