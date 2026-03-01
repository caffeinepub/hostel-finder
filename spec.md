# Specification

## Summary
**Goal:** Fix the category filtering functionality (All Hostels, Girls Only, Boys Only, Co-Living) on the Home page so that selecting each tab correctly filters the hostel listings.

**Planned changes:**
- Fix the frontend `Home.tsx` category filter logic so that selecting each category tab (All Hostels, Girls Only, Boys Only, Co-Living) correctly filters and displays matching hostel listings
- Ensure the active category tab is visually highlighted and the listings grid updates immediately on tab switch
- Show the empty-state UI when no hostels match the selected category
- Fix the backend `getHostelsByCategory` function to correctly match and return hostels by category string
- Ensure category values in seed data exactly match what the frontend CategoryFilter passes (case and spelling)

**User-visible outcome:** Users can click any category tab on the Home page and see only the hostels that belong to that category, with immediate updates and correct empty state when no results exist.
