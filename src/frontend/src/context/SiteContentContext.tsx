import { type ReactNode, createContext, useContext, useState } from "react";

const STORAGE_KEY = "orthocare_site_content";

export interface SiteContent {
  // Homepage
  heroHeadline: string;
  heroSubheadline: string;
  heroBannerUrl: string;
  // About
  aboutTitle: string;
  aboutBody: string;
  // Contact
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactHours: string;
  // Policies
  shippingPolicy: string;
  returnPolicy: string;
  privacyPolicy: string;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  heroHeadline: "Move Better, Live Pain-Free",
  heroSubheadline:
    "Medically approved orthopedic solutions to improve mobility, reduce pain, and support a healthier lifestyle.",
  heroBannerUrl: "/assets/generated/hero-banner.dim_1200x500.jpg",
  aboutTitle: "About OrthoCare Store",
  aboutBody:
    "OrthoCare Store is your trusted source for high-quality orthopedic support products. We partner with certified medical professionals to bring you doctor-recommended braces, belts, and supports that help you recover faster and live more comfortably.\n\nOur mission is to make quality orthopedic care accessible and affordable for everyone across India. Every product in our store is carefully selected for its effectiveness, durability, and value.",
  contactEmail: "support@orthocare.com",
  contactPhone: "+91 98765 43210",
  contactAddress: "Mumbai, India",
  contactHours: "Mon–Sat: 9 AM – 6 PM IST",
  shippingPolicy:
    "We offer free shipping on orders above ₹999. Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available at additional cost. Orders are dispatched within 24 hours of confirmation.",
  returnPolicy:
    "We accept returns within 7 days of delivery for unused products in original packaging. Damaged or defective products are eligible for free replacement. Refunds are processed within 5–7 business days.",
  privacyPolicy:
    "We respect your privacy and are committed to protecting your personal data. Your information is used solely for order processing and communication. We never share or sell your data to third parties.",
};

function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONTENT;
    return { ...DEFAULT_SITE_CONTENT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

interface SiteContentContextType {
  content: SiteContent;
  publishContent: (next: SiteContent) => void;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent);

  function publishContent(next: SiteContent) {
    setContent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  return (
    <SiteContentContext.Provider value={{ content, publishContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx)
    throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}
