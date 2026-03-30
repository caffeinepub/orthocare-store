import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Globe, ImageIcon, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DEFAULT_SITE_CONTENT,
  type SiteContent,
  useSiteContent,
} from "../../context/SiteContentContext";

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div id={id}>{children}</div>
    </div>
  );
}

export function AdminEditWebsitePage() {
  const { content, publishContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }

  function handlePublish() {
    publishContent(draft);
    setHasChanges(false);
    toast.success("Changes published to the website!");
  }

  function handleReset() {
    setDraft(DEFAULT_SITE_CONTENT);
    setHasChanges(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-admin-navy font-display">
            Edit Website
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Make changes and press Publish to update the live site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-xs text-amber-600 font-medium bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              Unsaved changes
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground"
          >
            Reset to Default
          </Button>
          <Button
            onClick={handlePublish}
            size="sm"
            className="bg-primary text-primary-foreground gap-2"
            data-ocid="admin.edit_website.publish_button"
          >
            <Globe className="w-4 h-4" />
            Save & Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="homepage">
        <TabsList className="bg-admin-bg border border-border">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        {/* HOMEPAGE TAB */}
        <TabsContent value="homepage" className="mt-5 space-y-5">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-admin-navy">
                Hero Banner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Headline" id="heroHeadline">
                <Input
                  id="heroHeadline"
                  value={draft.heroHeadline}
                  onChange={(e) => set("heroHeadline", e.target.value)}
                  placeholder="Main heading text"
                />
              </Field>
              <Field label="Sub-headline" id="heroSubheadline">
                <Textarea
                  id="heroSubheadline"
                  value={draft.heroSubheadline}
                  onChange={(e) => set("heroSubheadline", e.target.value)}
                  placeholder="Supporting text below the headline"
                  rows={3}
                />
              </Field>
              <Field label="Banner Image URL" id="heroBannerUrl">
                <div className="flex gap-2 items-start">
                  <Input
                    id="heroBannerUrl"
                    value={draft.heroBannerUrl}
                    onChange={(e) => set("heroBannerUrl", e.target.value)}
                    placeholder="/assets/generated/hero-banner.dim_1200x500.jpg"
                  />
                </div>
              </Field>
              {draft.heroBannerUrl && (
                <div className="rounded-lg overflow-hidden border border-border mt-2">
                  <img
                    src={draft.heroBannerUrl}
                    alt="Banner preview"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <p className="text-xs text-muted-foreground px-3 py-1.5 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Banner preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handlePublish}
              className="bg-primary text-primary-foreground gap-2"
              data-ocid="admin.edit_website.homepage.save_button"
            >
              <Save className="w-4 h-4" />
              Save & Publish
            </Button>
          </div>
        </TabsContent>

        {/* ABOUT TAB */}
        <TabsContent value="about" className="mt-5 space-y-5">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-admin-navy">
                About Page
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Page Title" id="aboutTitle">
                <Input
                  id="aboutTitle"
                  value={draft.aboutTitle}
                  onChange={(e) => set("aboutTitle", e.target.value)}
                  placeholder="About OrthoCare Store"
                />
              </Field>
              <Field label="About Content" id="aboutBody">
                <Textarea
                  id="aboutBody"
                  value={draft.aboutBody}
                  onChange={(e) => set("aboutBody", e.target.value)}
                  placeholder="Describe your business..."
                  rows={8}
                />
              </Field>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button
              onClick={handlePublish}
              className="bg-primary text-primary-foreground gap-2"
            >
              <Save className="w-4 h-4" />
              Save & Publish
            </Button>
          </div>
        </TabsContent>

        {/* CONTACT TAB */}
        <TabsContent value="contact" className="mt-5 space-y-5">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-admin-navy">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Email" id="contactEmail">
                <Input
                  id="contactEmail"
                  type="email"
                  value={draft.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                  placeholder="support@orthocare.com"
                />
              </Field>
              <Field label="Phone" id="contactPhone">
                <Input
                  id="contactPhone"
                  value={draft.contactPhone}
                  onChange={(e) => set("contactPhone", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </Field>
              <Field label="Address / Location" id="contactAddress">
                <Input
                  id="contactAddress"
                  value={draft.contactAddress}
                  onChange={(e) => set("contactAddress", e.target.value)}
                  placeholder="City, State, Country"
                />
              </Field>
              <Field label="Business Hours" id="contactHours">
                <Input
                  id="contactHours"
                  value={draft.contactHours}
                  onChange={(e) => set("contactHours", e.target.value)}
                  placeholder="Mon–Sat: 9 AM – 6 PM IST"
                />
              </Field>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button
              onClick={handlePublish}
              className="bg-primary text-primary-foreground gap-2"
            >
              <Save className="w-4 h-4" />
              Save & Publish
            </Button>
          </div>
        </TabsContent>

        {/* POLICIES TAB */}
        <TabsContent value="policies" className="mt-5 space-y-5">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-admin-navy">
                Shipping & Delivery Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={draft.shippingPolicy}
                onChange={(e) => set("shippingPolicy", e.target.value)}
                rows={5}
              />
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-admin-navy">
                Return & Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={draft.returnPolicy}
                onChange={(e) => set("returnPolicy", e.target.value)}
                rows={5}
              />
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-admin-navy">
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={draft.privacyPolicy}
                onChange={(e) => set("privacyPolicy", e.target.value)}
                rows={5}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handlePublish}
              className="bg-primary text-primary-foreground gap-2"
            >
              <Save className="w-4 h-4" />
              Save & Publish
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
