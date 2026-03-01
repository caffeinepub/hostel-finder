const SITE_URL = 'https://hosteladdas.icp0.io';

export default function Disclaimer() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL + "/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Disclaimer",
        "item": SITE_URL + "/disclaimer"
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-white dark:bg-card rounded-2xl shadow-lg border border-warm-border p-8 md:p-12">
        <h1 className="text-4xl font-bold text-warm-primary mb-8">Disclaimer</h1>
        
        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">General Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided on Hostel Finder is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the hostels listed on this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hostel Finder and its operators shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Any loss or damage arising from the use of information on this platform</li>
              <li>The quality, safety, or condition of any hostel listed on our platform</li>
              <li>Any disputes between hostel owners and guests</li>
              <li>Any financial transactions conducted outside of this platform</li>
              <li>Any personal injury, property damage, or other harm resulting from hostel stays</li>
              <li>Technical issues, service interruptions, or data loss</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">User-Generated Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              All hostel listings, descriptions, images, and contact information are provided by hostel owners or users. Hostel Finder does not verify the accuracy of this information and is not responsible for any errors, omissions, or misrepresentations in user-generated content. Users are encouraged to independently verify all information before making any accommodation decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Third-Party Links and Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform may contain links to third-party websites or services that are not owned or controlled by Hostel Finder. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any third-party content or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">No Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information on this platform does not constitute professional advice. Users should conduct their own research and due diligence before making any accommodation decisions. We recommend visiting hostels in person, reading reviews from multiple sources, and verifying all details directly with hostel owners before committing to any stay.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Terms of Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using Hostel Finder, you agree to use the platform responsibly and in accordance with all applicable laws and regulations. You agree not to post false, misleading, or fraudulent information. We reserve the right to remove any content or restrict access to users who violate these terms. Your continued use of this platform constitutes acceptance of this disclaimer and any updates to it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Changes to This Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to this page. Your continued use of the platform after any changes constitutes acceptance of the updated disclaimer.
            </p>
          </section>

          <section className="pt-4 border-t border-warm-border">
            <p className="text-sm text-muted-foreground italic">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
