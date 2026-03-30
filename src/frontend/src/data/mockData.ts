import type { Product } from "../backend.d";

export const CATEGORY_IMAGES: Record<string, string> = {
  "Knee Support": "/assets/generated/knee-support.dim_400x400.jpg",
  "Back Support Belts": "/assets/generated/back-support.dim_400x400.jpg",
  "Cervical Collars": "/assets/generated/cervical-collar.dim_400x400.jpg",
  "Arm Slings": "/assets/generated/arm-sling.dim_400x400.jpg",
  "Wrist & Ankle Braces": "/assets/generated/wrist-ankle-brace.dim_400x400.jpg",
  "Orthopedic Cushions": "/assets/generated/ortho-cushion.dim_400x400.jpg",
};

export function getProductImage(product: Product): string {
  return (
    CATEGORY_IMAGES[product.category] ??
    "/assets/generated/knee-support.dim_400x400.jpg"
  );
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "ProFlex Knee Support Cap",
    category: "Knee Support",
    description:
      "Compression knee cap with gel padding for superior joint support. Ideal for arthritis, sports injuries, and post-surgery recovery. Adjustable straps ensure a secure, comfortable fit.",
    price: 599,
    rating: 4.5,
    reviewCount: 128n,
    inStock: true,
    doctorRecommended: true,
    imageUrl: "",
  },
  {
    id: 2n,
    name: "OrthoFlex Lumbar Back Belt",
    category: "Back Support Belts",
    description:
      "Ergonomic lumbar belt with dual-pull straps for targeted lower back compression. Breathable mesh fabric keeps you cool during extended wear.",
    price: 849,
    rating: 4.7,
    reviewCount: 256n,
    inStock: true,
    doctorRecommended: true,
    imageUrl: "",
  },
  {
    id: 3n,
    name: "SoftNeck Cervical Collar",
    category: "Cervical Collars",
    description:
      "Foam cervical collar providing gentle neck support for whiplash, muscle strain, and post-operative recovery. Comfortable polyester lining.",
    price: 399,
    rating: 4.3,
    reviewCount: 89n,
    inStock: true,
    doctorRecommended: true,
    imageUrl: "",
  },
  {
    id: 4n,
    name: "ComfortArm Shoulder Sling",
    category: "Arm Slings",
    description:
      "Adjustable arm sling with padded shoulder strap and breathable fabric. Suitable for fractures, shoulder injuries, and post-surgery immobilization.",
    price: 349,
    rating: 4.4,
    reviewCount: 67n,
    inStock: true,
    doctorRecommended: false,
    imageUrl: "",
  },
  {
    id: 5n,
    name: "FlexiGuard Wrist Brace",
    category: "Wrist & Ankle Braces",
    description:
      "Rigid splint wrist brace for carpal tunnel syndrome, sprains, and tendinitis. Removable aluminium stay provides firm support.",
    price: 449,
    rating: 4.6,
    reviewCount: 143n,
    inStock: true,
    doctorRecommended: true,
    imageUrl: "",
  },
  {
    id: 6n,
    name: "ErgoSit Orthopedic Coccyx Cushion",
    category: "Orthopedic Cushions",
    description:
      "Memory foam seat cushion with coccyx cutout, perfect for office chairs, car seats, and wheelchairs. Relieves tailbone, sciatica, and lower back pain.",
    price: 699,
    rating: 4.8,
    reviewCount: 312n,
    inStock: true,
    doctorRecommended: true,
    imageUrl: "",
  },
  {
    id: 7n,
    name: "ActiveKnee Hinged Brace",
    category: "Knee Support",
    description:
      "Hinged knee brace with metal stays for ACL/MCL injuries, ligament support, and knee instability. Open patella design reduces pressure.",
    price: 1299,
    rating: 4.5,
    reviewCount: 98n,
    inStock: true,
    doctorRecommended: true,
    imageUrl: "",
  },
  {
    id: 8n,
    name: "AnkleGuard Sport Brace",
    category: "Wrist & Ankle Braces",
    description:
      "Lace-up ankle stabilizer for sprains, chronic ankle instability, and sports activities. Figure-8 straps for customizable compression.",
    price: 529,
    rating: 4.4,
    reviewCount: 175n,
    inStock: true,
    doctorRecommended: false,
    imageUrl: "",
  },
];

export const CATEGORIES = [
  { name: "Knee Support", icon: "🦵" },
  { name: "Back Support Belts", icon: "🏋️" },
  { name: "Cervical Collars", icon: "🦴" },
  { name: "Arm Slings", icon: "💪" },
  { name: "Wrist & Ankle Braces", icon: "🤝" },
  { name: "Orthopedic Cushions", icon: "🛋️" },
];
