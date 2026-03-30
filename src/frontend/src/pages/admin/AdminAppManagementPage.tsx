import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Activity, AppWindow, Bell, Palette, Save, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function hideOnError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
}

export function AdminAppManagementPage() {
  // Tab 1 — Store Branding
  const [storeName, setStoreName] = useState("OrthoCare Store");
  const [tagline, setTagline] = useState("Your Trusted Orthopedic Store");
  const [logoUrl, setLogoUrl] = useState("");

  // Tab 2 — Appearance
  const [primaryColor, setPrimaryColor] = useState("#1d4ed8");
  const [accentColor, setAccentColor] = useState("#0ea5e9");
  const [fontStyle, setFontStyle] = useState("default");

  // Tab 3 — Store Status
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "We're performing scheduled maintenance. We'll be back shortly.",
  );
  const [estimatedDowntime, setEstimatedDowntime] = useState("2 hours");

  // Tab 4 — Notifications
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState(
    "admin@orthocare.com",
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-admin-sidebar flex items-center justify-center">
          <AppWindow className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-admin-navy font-display">
            App Management
          </h2>
          <p className="text-muted-foreground text-sm">
            Configure branding, appearance, store status, and notifications.
          </p>
        </div>
      </div>

      <Tabs defaultValue="branding" data-ocid="app.tab">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger
            value="branding"
            className="flex items-center gap-2"
            data-ocid="app.branding.tab"
          >
            <Store className="w-3.5 h-3.5" />
            Store Branding
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex items-center gap-2"
            data-ocid="app.appearance.tab"
          >
            <Palette className="w-3.5 h-3.5" />
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="status"
            className="flex items-center gap-2"
            data-ocid="app.status.tab"
          >
            <Activity className="w-3.5 h-3.5" />
            Store Status
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
            data-ocid="app.notifications.tab"
          >
            <Bell className="w-3.5 h-3.5" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Tab 1 — Store Branding */}
        <TabsContent value="branding">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  data-ocid="app.store_name.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  data-ocid="app.tagline.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo-url">Store Logo URL</Label>
                <Input
                  id="logo-url"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  data-ocid="app.logo_url.input"
                />
                {logoUrl && (
                  <div className="mt-3 p-3 rounded-xl border bg-slate-50 inline-flex items-center gap-3">
                    <img
                      src={logoUrl}
                      alt="Logo preview"
                      className="h-12 w-auto max-w-[120px] object-contain rounded"
                      onError={hideOnError}
                    />
                    <span className="text-xs text-muted-foreground">
                      Logo preview
                    </span>
                  </div>
                )}
              </div>
              <Button
                onClick={() => toast.success("Store branding saved!")}
                className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                data-ocid="app.save_branding.button"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Branding
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2 — Appearance */}
        <TabsContent value="appearance">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border cursor-pointer p-0.5"
                      data-ocid="app.primary_color.input"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="font-mono text-sm"
                      placeholder="#1d4ed8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="accent-color"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border cursor-pointer p-0.5"
                      data-ocid="app.accent_color.input"
                    />
                    <Input
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="font-mono text-sm"
                      placeholder="#0ea5e9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-style">Font Style</Label>
                <Select value={fontStyle} onValueChange={setFontStyle}>
                  <SelectTrigger
                    id="font-style"
                    className="max-w-xs"
                    data-ocid="app.font_style.select"
                  >
                    <SelectValue placeholder="Select font…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">
                      Default (Plus Jakarta Sans)
                    </SelectItem>
                    <SelectItem value="serif">
                      Serif (Playfair Display)
                    </SelectItem>
                    <SelectItem value="modern">Modern (Geist Mono)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div
                className="p-4 rounded-xl border bg-slate-50"
                style={{
                  fontFamily:
                    fontStyle === "serif"
                      ? "serif"
                      : fontStyle === "modern"
                        ? "monospace"
                        : "inherit",
                }}
              >
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Preview
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: primaryColor }}
                >
                  {storeName || "OrthoCare Store"}
                </p>
                <p className="text-sm" style={{ color: accentColor }}>
                  Quality orthopedic support for a pain-free life.
                </p>
              </div>

              <Button
                onClick={() => toast.success("Appearance settings saved!")}
                className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                data-ocid="app.save_appearance.button"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Appearance
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3 — Store Status */}
        <TabsContent value="status">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
                <div>
                  <p className="font-semibold text-admin-navy">Store Status</p>
                  <p className="text-sm text-muted-foreground">
                    {maintenanceMode
                      ? "Store is in maintenance mode"
                      : "Store is live and accepting orders"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      maintenanceMode
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {maintenanceMode ? "Maintenance" : "Online"}
                  </span>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                    data-ocid="app.maintenance_mode.switch"
                  />
                </div>
              </div>

              {maintenanceMode && (
                <div className="space-y-4 border-l-4 border-orange-400 pl-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-msg">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-msg"
                      rows={3}
                      value={maintenanceMessage}
                      onChange={(e) => setMaintenanceMessage(e.target.value)}
                      data-ocid="app.maintenance_message.textarea"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="downtime">Estimated Downtime</Label>
                    <Input
                      id="downtime"
                      placeholder="e.g. 2 hours"
                      value={estimatedDowntime}
                      onChange={(e) => setEstimatedDowntime(e.target.value)}
                      className="max-w-xs"
                      data-ocid="app.estimated_downtime.input"
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={() => toast.success("Store status updated!")}
                className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                data-ocid="app.save_status.button"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Status
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4 — Notifications */}
        <TabsContent value="notifications">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border">
                  <div>
                    <p className="font-medium text-admin-navy">
                      Order Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a new order is placed
                    </p>
                  </div>
                  <Switch
                    checked={orderNotifications}
                    onCheckedChange={setOrderNotifications}
                    data-ocid="app.order_notifications.switch"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border">
                  <div>
                    <p className="font-medium text-admin-navy">
                      WhatsApp Alerts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Requires WhatsApp Business API key configured
                    </p>
                  </div>
                  <Switch
                    checked={whatsappAlerts}
                    onCheckedChange={setWhatsappAlerts}
                    data-ocid="app.whatsapp_alerts.switch"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border">
                  <div>
                    <p className="font-medium text-admin-navy">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Send SMS notifications for order updates
                    </p>
                  </div>
                  <Switch
                    checked={smsAlerts}
                    onCheckedChange={setSmsAlerts}
                    data-ocid="app.sms_alerts.switch"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border opacity-60">
                  <div>
                    <p className="font-medium text-admin-navy">
                      Email Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email not enabled on current plan
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    disabled
                    data-ocid="app.email_notifications.switch"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notif-email">Notification Email</Label>
                <Input
                  id="notif-email"
                  type="email"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  className="max-w-sm"
                  data-ocid="app.notification_email.input"
                />
              </div>

              <Button
                onClick={() => toast.success("Notification settings saved!")}
                className="bg-admin-sidebar hover:bg-admin-sidebar/90 text-white"
                data-ocid="app.save_notifications.button"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
