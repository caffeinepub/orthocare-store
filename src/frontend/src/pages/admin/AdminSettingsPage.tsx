import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DEFAULT_BADGES = [
  {
    title: "Doctor Recommended",
    description: "Approved by certified orthopedic specialists",
  },
  {
    title: "Premium Quality",
    description: "Medical-grade materials for long-lasting support",
  },
  {
    title: "Affordable Prices",
    description: "High-quality care at prices that don't hurt",
  },
  {
    title: "Easy to Use",
    description: "Designed for comfort — no special skills needed",
  },
];

const DEFAULT_CATEGORIES = [
  "Knee Support",
  "Back Support Belts",
  "Cervical Collars",
  "Arm Slings",
  "Wrist & Ankle Braces",
  "Orthopedic Cushions",
];

export function AdminSettingsPage() {
  // Tab 1 — Site Content
  const [businessName, setBusinessName] = useState("OrthoCare Store");
  const [headline, setHeadline] = useState("Move Better, Live Pain-Free");
  const [subheadline, setSubheadline] = useState(
    "Medically approved orthopedic solutions designed for every stage of recovery and daily support.",
  );
  const [badges, setBadges] = useState(DEFAULT_BADGES);

  // Tab 2 — Contact Info
  const [contactEmail, setContactEmail] = useState("support@orthocare.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState(
    "123 Medical Complex, MG Road, Bangalore, Karnataka 560001",
  );
  const [hours, setHours] = useState("Mon–Sat: 9 AM – 7 PM IST");

  // Tab 3 — Policies
  const [shippingPolicy, setShippingPolicy] = useState(
    "We offer free shipping on orders above ₹999. Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available at additional cost. Orders are dispatched within 24 hours of confirmation.",
  );
  const [returnPolicy, setReturnPolicy] = useState(
    "We accept returns within 7 days of delivery for unused products in original packaging. Damaged or defective products are eligible for free replacement. Refunds are processed within 5–7 business days.",
  );
  const [privacyPolicy, setPrivacyPolicy] = useState(
    "We respect your privacy and are committed to protecting your personal data. Your information is used solely for order processing and communication. We never share or sell your data to third parties.",
  );

  // Tab 4 — Categories
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState("");

  function addCategory() {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
      setNewCategory("");
    }
  }

  function removeCategory(cat: string) {
    setCategories((prev) => prev.filter((c) => c !== cat));
  }

  function saveSiteContent() {
    toast.success("Site content saved!");
  }

  function saveContact() {
    toast.success("Contact info saved!");
  }

  function savePolicy(name: string) {
    toast.success(`${name} saved!`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-admin-navy font-display">
          Settings
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage site content, contact details, policies, and categories.
        </p>
      </div>

      <Tabs defaultValue="content" data-ocid="settings.tab">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="content" data-ocid="settings.content.tab">
            Site Content
          </TabsTrigger>
          <TabsTrigger value="contact" data-ocid="settings.contact.tab">
            Contact Info
          </TabsTrigger>
          <TabsTrigger value="policies" data-ocid="settings.policies.tab">
            Policies
          </TabsTrigger>
          <TabsTrigger value="categories" data-ocid="settings.categories.tab">
            Categories
          </TabsTrigger>
        </TabsList>

        {/* Tab 1 — Site Content */}
        <TabsContent value="content">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  data-ocid="settings.business_name.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline">Homepage Headline</Label>
                <Input
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  data-ocid="settings.headline.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subheadline">Homepage Subheadline</Label>
                <Textarea
                  id="subheadline"
                  rows={3}
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  data-ocid="settings.subheadline.textarea"
                />
              </div>

              <div className="space-y-3">
                <Label>Trust Badge Details</Label>
                {badges.map((badge, i) => (
                  <div
                    key={badge.title}
                    className="p-4 rounded-xl border bg-slate-50 space-y-2"
                  >
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Badge {i + 1}
                    </p>
                    <Input
                      placeholder="Badge title"
                      value={badge.title}
                      onChange={(e) =>
                        setBadges((prev) =>
                          prev.map((b, idx) =>
                            idx === i ? { ...b, title: e.target.value } : b,
                          ),
                        )
                      }
                      data-ocid={`settings.badge_title.input.${i + 1}`}
                    />
                    <Input
                      placeholder="Badge description"
                      value={badge.description}
                      onChange={(e) =>
                        setBadges((prev) =>
                          prev.map((b, idx) =>
                            idx === i
                              ? { ...b, description: e.target.value }
                              : b,
                          ),
                        )
                      }
                      data-ocid={`settings.badge_desc.input.${i + 1}`}
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={saveSiteContent}
                className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                data-ocid="settings.save_content.button"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Site Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2 — Contact Info */}
        <TabsContent value="contact">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  data-ocid="settings.contact_email.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-ocid="settings.phone.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  data-ocid="settings.address.textarea"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Business Hours</Label>
                <Input
                  id="hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  data-ocid="settings.hours.input"
                />
              </div>
              <Button
                onClick={saveContact}
                className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                data-ocid="settings.save_contact.button"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Contact Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3 — Policies */}
        <TabsContent value="policies">
          <div className="space-y-5">
            {(
              [
                {
                  label: "Shipping & Delivery Policy",
                  value: shippingPolicy,
                  setter: setShippingPolicy,
                  name: "Shipping policy",
                  ocid: "settings.shipping_policy",
                },
                {
                  label: "Return & Refund Policy",
                  value: returnPolicy,
                  setter: setReturnPolicy,
                  name: "Return policy",
                  ocid: "settings.return_policy",
                },
                {
                  label: "Privacy Policy",
                  value: privacyPolicy,
                  setter: setPrivacyPolicy,
                  name: "Privacy policy",
                  ocid: "settings.privacy_policy",
                },
              ] as const
            ).map((policy) => (
              <Card
                key={policy.label}
                className="border-0 shadow-md rounded-2xl"
              >
                <CardContent className="p-6 space-y-3">
                  <Label className="text-base font-semibold text-admin-navy">
                    {policy.label}
                  </Label>
                  <Textarea
                    rows={5}
                    value={policy.value}
                    onChange={(e) => policy.setter(e.target.value)}
                    data-ocid={`${policy.ocid}.textarea`}
                  />
                  <Button
                    onClick={() => savePolicy(policy.name)}
                    className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                    data-ocid={`${policy.ocid}.save_button`}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save {policy.name.split(" ")[0]} Policy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 4 — Categories */}
        <TabsContent value="categories">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div>
                <Label className="text-base font-semibold text-admin-navy">
                  Product Categories
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage the categories shown in the Shop and Product Management
                  pages.
                </p>
              </div>

              {/* Category chips */}
              <div
                className="flex flex-wrap gap-2"
                data-ocid="settings.categories.list"
              >
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm gap-1.5 pr-2"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat)}
                      className="ml-1 hover:text-destructive transition-colors"
                      aria-label={`Remove ${cat}`}
                      data-ocid="settings.category.delete_button"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {categories.length === 0 && (
                  <p
                    className="text-sm text-muted-foreground"
                    data-ocid="settings.categories.empty_state"
                  >
                    No categories yet. Add one below.
                  </p>
                )}
              </div>

              {/* Add category */}
              <div className="flex gap-3 max-w-sm">
                <Input
                  placeholder="New category name…"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                  data-ocid="settings.new_category.input"
                />
                <Button
                  onClick={addCategory}
                  className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                  data-ocid="settings.add_category.button"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>

              <p className="text-xs text-muted-foreground border-t pt-4">
                💡 Changes here update the category list in Product Management.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
