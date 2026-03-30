import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, RotateCcw, Shield, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useSiteContent } from "../context/SiteContentContext";

const POLICIES = [
  {
    key: "privacy",
    label: "Privacy Policy",
    icon: Shield,
    content: [
      {
        title: "Information We Collect",
        body: "We collect personal information including your name, email address, phone number, and delivery address when you create an account or place an order. We also collect browsing data to improve your shopping experience.",
      },
      {
        title: "How We Use Your Information",
        body: "Your information is used to process orders, send delivery updates, provide customer support, and improve our services. We never sell your personal data to third parties.",
      },
      {
        title: "Data Security",
        body: "We employ industry-standard encryption and security protocols to protect your personal and medical information. All payment transactions are processed through secure, certified payment gateways.",
      },
      {
        title: "Your Rights",
        body: "You have the right to access, update, or delete your personal information at any time. Contact us at privacy@orthocare.com to exercise your data rights.",
      },
    ],
  },
  {
    key: "shipping",
    label: "Shipping & Delivery",
    icon: Truck,
    content: [
      {
        title: "Delivery Coverage",
        body: "We deliver across India to all major cities and towns. Remote areas may have extended delivery times. Check availability at checkout.",
      },
      {
        title: "Delivery Timelines",
        body: "Standard delivery: 3–7 business days. Express delivery: 1–2 business days (available for select pin codes at additional charge). Delivery times may vary during peak seasons and holidays.",
      },
      {
        title: "Free Shipping",
        body: "Enjoy free standard delivery on all orders above ₹999. For orders below ₹999, a flat delivery charge of ₹99 applies.",
      },
      {
        title: "Safe Packaging",
        body: "All orthopedic products are carefully packed to prevent damage during transit. Fragile items are double-packed with protective materials.",
      },
    ],
  },
  {
    key: "returns",
    label: "Return & Refund",
    icon: RotateCcw,
    content: [
      {
        title: "Return Window",
        body: "You can return most items within 7 days of delivery. Items must be in original, unused condition with all tags and packaging intact.",
      },
      {
        title: "Non-Returnable Items",
        body: "For hygiene and safety reasons, certain items like cervical collars and back belts that have been opened and used cannot be returned. Damaged or used products will not be accepted.",
      },
      {
        title: "Refund Process",
        body: "Once we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method. UPI and card refunds are typically faster.",
      },
      {
        title: "Damaged or Wrong Items",
        body: "If you receive a damaged or incorrect item, contact us within 48 hours with photos. We'll arrange a free replacement or full refund at no additional cost to you.",
      },
    ],
  },
  {
    key: "medical",
    label: "Medical Disclaimer",
    icon: AlertTriangle,
    content: [
      {
        title: "Not a Medical Device",
        body: "The orthopedic support products sold on OrthoCare Store are designed for general support, comfort, and relief. They are not classified as medical devices and should not replace professional medical treatment.",
      },
      {
        title: "Consult Your Doctor",
        body: "Always consult a qualified healthcare professional before using any orthopedic support product, especially if you have a pre-existing condition, recent surgery, or serious injury. Product descriptions are informational only.",
      },
      {
        title: "Doctor Recommended Badge",
        body: "Products marked 'Doctor Recommended' have been reviewed and endorsed by orthopedic specialists as suitable for general use. However, individual medical advice from your personal doctor should always take precedence.",
      },
      {
        title: "Liability",
        body: "OrthoCare Store shall not be held liable for any injury, discomfort, or adverse effects resulting from the use of products without proper medical guidance. Use products as directed and discontinue use if pain or discomfort increases.",
      },
    ],
  },
];

export function PoliciesPage() {
  const { content: siteContent } = useSiteContent();
  const adminPolicySummary: Record<string, string> = {
    shipping: siteContent.shippingPolicy,
    returns: siteContent.returnPolicy,
    privacy: siteContent.privacyPolicy,
  };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Our Policies
        </h1>
        <p className="text-muted-foreground">
          Transparent and customer-first policies for your peace of mind
        </p>
      </motion.div>

      <Tabs defaultValue="privacy" data-ocid="policies.panel">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
          {POLICIES.map((policy) => {
            const Icon = policy.icon;
            return (
              <TabsTrigger
                key={policy.key}
                value={policy.key}
                className="flex items-center gap-1.5 py-2.5"
                data-ocid="policies.tab"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-xs hidden sm:inline">{policy.label}</span>
                <span className="text-xs sm:hidden">
                  {policy.label.split(" ")[0]}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {POLICIES.map((policy) => (
          <TabsContent key={policy.key} value={policy.key}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground">
                {policy.label}
              </h2>
              {adminPolicySummary[policy.key] && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {adminPolicySummary[policy.key]}
                  </p>
                </div>
              )}
              {policy.content.map((section) => (
                <div
                  key={section.title}
                  className="bg-white border border-border rounded-xl p-6 shadow-xs"
                >
                  <h3 className="font-semibold text-base mb-2 text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
