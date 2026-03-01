# Specification

## Summary
**Goal:** Add advertisement placements, sponsored listing badges, an "Advertise With Us" page, and a visitor counter to turn Hostel Addas into an ad and visitor-based earning site.

**Planned changes:**
- Create a reusable `AdBanner` component supporting three sizes (leaderboard 728x90, rectangle 300x250, banner 468x60) styled with the existing amber/cream palette, labelled "Advertisement", with a placeholder for future ad network integration
- Place AdBanner components on the Home page: a leaderboard banner above the hostel grid and a rectangle banner after every 6 hostel cards
- Place a rectangle AdBanner on the HostelDetail page in the sidebar on desktop and below the contact section on mobile
- Add an optional `isSponsored` boolean field to the backend Hostel type and update `addHostel`/`updateHostel` to accept it; display a gold/amber "Sponsored" badge on HostelCard when true; sort sponsored hostels to the top of the Home page listing
- Create an "Advertise With Us" page (`/advertise`) with sections for sponsored listings, ad placements, visitor stats placeholder, and a WhatsApp/email contact CTA
- Register the `/advertise` route in `App.tsx` nested under the Layout
- Add "Advertise" links to both the header navigation and footer in the Layout component
- Add `recordVisit()` and `getVisitorCount()` functions to the backend; call `recordVisit()` once per session (sessionStorage guard) on Home page mount; display live visitor count in the footer as "Visitors: X"

**User-visible outcome:** The site displays advertisement banners across key pages, shows a "Sponsored" badge on promoted hostel listings, includes an "Advertise With Us" page for business inquiries, and shows a live visitor counter in the footer — enabling ad and sponsorship-based revenue opportunities.
