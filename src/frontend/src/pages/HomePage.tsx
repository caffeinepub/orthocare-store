import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";
import { useSiteContent } from "../context/SiteContentContext";
import { CATEGORIES } from "../data/mockData";
import { useProducts, useWishlist } from "../hooks/useQueries";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    review:
      "The lumbar belt from OrthoCare has been a lifesaver! My chronic back pain has reduced significantly after using it daily. Highly recommended!",
    rating: 5,
    location: "Mumbai",
  },
  {
    name: "Rajesh Kumar",
    review:
      "Excellent knee support. The doctor-recommended badge gave me confidence. Fast delivery, great packaging, and the product quality exceeded expectations.",
    rating: 5,
    location: "Delhi",
  },
  {
    name: "Anita Patel",
    review:
      "I bought the wrist brace for my carpal tunnel issue. It fits perfectly and provides the right amount of support. Very affordable too!",
    rating: 4,
    location: "Ahmedabad",
  },
];

const CONDITION_TILES = [
  {
    label: "Arthritis",
    image: "/assets/generated/knee-support.dim_400x400.jpg",
  },
  {
    label: "Post-Surgery",
    image: "/assets/generated/back-support.dim_400x400.jpg",
  },
  {
    label: "Sports Injury",
    image: "/assets/generated/wrist-ankle-brace.dim_400x400.jpg",
  },
];

const TRUST_BADGES = [
  {
    icon: "🩺",
    title: "Doctor Recommended",
    desc: "Medically approved products",
  },
  { icon: "💎", title: "Premium Quality", desc: "High-grade materials" },
  { icon: "💰", title: "Affordable Prices", desc: "Best value guaranteed" },
  { icon: "🚀", title: "Easy to Use", desc: "Designed for all ages" },
];

export function HomePage() {
  const { data: products = [] } = useProducts();
  const { data: wishlistIds = [] } = useWishlist();
  const { content: siteContent } = useSiteContent();
  const [email, setEmail] = useState("");
  const bestsellers = products.slice(0, 4);

  const handleNewsletter = () => {
    if (!email) return;
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <img
          src={siteContent.heroBannerUrl}
          alt="OrthoCare Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(8,25,35,0.75) 0%, rgba(8,25,35,0.4) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-3">
              Trusted Orthopedic Care
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {siteContent.heroHeadline}
            </h1>
            <p className="text-white/85 text-base md:text-lg mb-8 leading-relaxed">
              {siteContent.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
                data-ocid="hero.primary_button"
              >
                <Link to="/shop" search={{ category: undefined }}>
                  Shop All Products
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-6"
                data-ocid="hero.secondary_button"
              >
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3"
              >
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Find the right support for every part of your body
            </p>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/shop"
                  search={{ category: cat.name }}
                  className="flex flex-col items-center gap-2 group"
                  data-ocid="category.link"
                >
                  <div className="w-16 h-16 rounded-full bg-light-section flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors border-2 border-transparent group-hover:border-primary">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-light-section py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Bestselling Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Most loved by our customers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product, i) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={product}
                  wishlisted={wishlistIds.some((id) => id === product.id)}
                  index={i + 1}
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground"
              data-ocid="bestsellers.primary_button"
            >
              <Link to="/shop" search={{ category: undefined }}>
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Shop by Condition */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Shop by Condition
            </h2>
            <p className="text-muted-foreground mt-2">
              Products tailored to your specific needs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONDITION_TILES.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/shop"
                  search={{ category: undefined }}
                  className="relative block rounded-xl overflow-hidden h-48 group"
                  data-ocid="condition.link"
                >
                  <img
                    src={tile.image}
                    alt={tile.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {tile.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light-section py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              What Our Customers Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-card border border-border"
                data-ocid={`testimonial.item.${i + 1}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].slice(0, t.rating).map((n) => (
                    <span key={n} className="text-star-yellow text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  "{t.review}"
                </p>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Stay Updated
            </h2>
            <p className="text-white/80 mb-6">
              Get exclusive offers, health tips, and product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-foreground"
                data-ocid="newsletter.input"
              />
              <Button
                onClick={handleNewsletter}
                className="bg-navy hover:bg-navy-mid text-white font-semibold"
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
