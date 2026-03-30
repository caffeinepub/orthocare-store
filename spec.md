# OrthoCare Store

## Current State
Admin panel has: Dashboard, Products, Orders, Customers, Settings (site content, contact, policies, categories). All routes protected under `/admin/*`.

## Requested Changes (Diff)

### Add
- New `AdminAppManagementPage` at `/admin/app` with tabs for:
  - **Store Branding**: store name, tagline, logo URL
  - **Appearance**: primary color, accent color, font choice
  - **Store Status**: online/offline toggle, maintenance message
  - **Notifications**: WhatsApp/SMS/email notification toggles, order notification settings
- New sidebar nav link "App" with an AppWindow icon pointing to `/admin/app`
- New route in App.tsx for `/admin/app`

### Modify
- `AdminLayout.tsx`: add App Management nav link in sidebar
- `App.tsx`: register `/admin/app` route with `ProtectedAdmin` wrapper

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/admin/AdminAppManagementPage.tsx` with 4 tabs
2. Add nav link to `AdminLayout.tsx`
3. Add route to `App.tsx`
