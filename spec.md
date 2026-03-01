# Specification

## Summary
**Goal:** Add an amenities field to hostels with display on cards and detail pages, and editing support.

**Planned changes:**
- Add `amenities : [Text]` field to the Hostel type in `backend/main.mo`
- Update `addHostel` and `updateHostel` backend functions to accept and store the amenities array
- Populate all existing seed hostel records with realistic amenities subsets
- Update `HostelCard` component to show up to 5 amenity pills below price/sharing info, with a "+N more" indicator if needed
- Update `HostelDetail` page to show a dedicated "Amenities" section with icon+label pills, placed between the pricing and map sections
- Update `EditHostel` page to include a checklist of 12 common amenities (WiFi, AC, Laundry, Parking, Meals, Gym, Hot Water, Power Backup, Security, CCTV, Study Room, Common Kitchen), pre-populated from stored data
- Update `useUpdateHostel` mutation hook to include the amenities array in the update payload

**User-visible outcome:** Hostel cards and detail pages display amenities visually, and hostel owners can edit amenities via a checklist on the EditHostel form.
