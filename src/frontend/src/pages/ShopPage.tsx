import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES } from "../data/mockData";
import { useProducts, useWishlist } from "../hooks/useQueries";

export function ShopPage({ category: initialCategory }: { category?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory ?? "All",
  );
  const { data: products = [], isLoading } = useProducts();
  const { data: wishlistIds = [] } = useWishlist();

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Our Products
        </h1>
        <p className="text-muted-foreground mt-1">
          Quality orthopedic support for every need
        </p>
      </div>

      {/* Category Filters */}
      <div
        className="flex items-center gap-2 mb-8 flex-wrap"
        data-ocid="shop.panel"
      >
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        {["All", ...CATEGORIES.map((c) => c.name)].map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className={
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : ""
            }
            data-ocid="shop.tab"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{filtered.length}</strong> products
          {selectedCategory !== "All" && (
            <>
              {" "}
              in <strong>{selectedCategory}</strong>
            </>
          )}
        </p>
        {selectedCategory !== "All" && (
          <Badge variant="secondary" className="gap-1">
            {selectedCategory}
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="ml-1 text-xs"
            >
              ×
            </button>
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="shop.loading_state"
        >
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <div key={k} className="bg-muted rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20" data-ocid="shop.empty_state">
          <p className="text-muted-foreground text-lg">
            No products found in this category.
          </p>
          <Button
            onClick={() => setSelectedCategory("All")}
            className="mt-4"
            data-ocid="shop.primary_button"
          >
            Show All Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard
                product={product}
                wishlisted={wishlistIds.some((id) => id === product.id)}
                index={i + 1}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
