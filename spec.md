# Specification

## Summary
**Goal:** Add a Google site verification placeholder file to support Google Search Console verification for the Hostel Addas site.

**Planned changes:**
- Create `frontend/public/google-site-verification.html` as a static asset with instructional content explaining how to replace it with the actual Google-provided verification file
- Instructions in the file reference Google Search Console (https://search.google.com/search-console) and explain the typical file naming pattern (`googleXXXXXXXXXXXXXXXX.html`)
- Update the SeoInfoBanner on the Home page to mention uploading the Google verification file as a step in the Search Console submission process

**User-visible outcome:** The site owner can access `/google-site-verification.html` on their deployed site and follow the instructions to replace it with the actual file downloaded from Google Search Console to complete domain verification.
