const SITE_URL = 'https://hosteladdas.icp0.io';

export default function Privacy() {
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
        "name": "Privacy Policy",
        "item": SITE_URL + "/privacy"
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
        <h1 className="text-4xl font-bold text-warm-primary mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Data Collection</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hostel Finder collects information that you provide when adding or editing hostel listings. This includes hostel names, descriptions, addresses, contact information, pricing details, and images. We may also collect technical information such as your browser type, device information, and IP address to improve our services and ensure platform security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The information we collect is used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Display hostel listings to users searching for accommodation</li>
              <li>Enable communication between hostel owners and potential guests</li>
              <li>Improve and optimize our platform's functionality and user experience</li>
              <li>Maintain the security and integrity of our services</li>
              <li>Comply with legal obligations and enforce our terms of service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored securely on the Internet Computer blockchain network, which provides decentralized and tamper-resistant storage. We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your hostel listings and associated data</li>
              <li>Object to the processing of your personal information</li>
              <li>Withdraw consent for data processing where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform may use third-party services such as Google Maps for location features. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-warm-accent mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions, concerns, or requests regarding this privacy policy or your personal data, please contact us through the hostel owner contact information provided on individual listings. For general privacy inquiries, you may reach out to the platform administrators.
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
