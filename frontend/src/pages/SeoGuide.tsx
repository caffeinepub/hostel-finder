import { Link } from '@tanstack/react-router';
import { Search, Globe, MapPin, Clock, TrendingUp, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';

const SITE_URL = 'https://hosteladdas.icp0.io';

interface SectionProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, number, title, children }: SectionProps) {
  return (
    <section className="bg-white dark:bg-card rounded-2xl shadow-sm border border-warm-border p-6 md:p-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warm-primary/15 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-warm-primary/60 uppercase tracking-widest">Step {number}</span>
          <h2 className="text-xl font-bold text-warm-primary mt-0.5">{title}</h2>
        </div>
      </div>
      <div className="ml-14 space-y-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 bg-warm-accent/10 border border-warm-accent/20 rounded-lg px-3 py-2.5 mt-3">
      <CheckCircle2 className="w-4 h-4 text-warm-accent flex-shrink-0 mt-0.5" />
      <p className="text-sm text-foreground/80">{children}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block bg-warm-primary/10 text-warm-primary font-mono text-sm px-2 py-0.5 rounded border border-warm-primary/20">
      {children}
    </code>
  );
}

export default function SeoGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                "name": "SEO Guide",
                "item": SITE_URL + "/seo-guide"
              }
            ]
          })
        }}
      />

      {/* Breadcrumb nav */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-warm-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-warm-primary font-medium">SEO Guide</span>
      </nav>

      {/* Page header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-warm-primary/10 text-warm-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <TrendingUp className="w-3.5 h-3.5" />
          Google Visibility Guide
        </div>
        <h1 className="text-4xl font-bold text-warm-primary mb-3">
          How to Get Hostel Addas on Google
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          A complete, step-by-step guide to getting your hostel directory indexed, ranked, and found by students searching for PG accommodation in Hyderabad.
        </p>
      </div>

      <div className="space-y-6">

        {/* Step 1: Verify & Submit Sitemap */}
        <Section icon={<Globe className="w-5 h-5 text-warm-primary" />} number={1} title="Verify Ownership & Submit Your Sitemap">
          <p>
            Google needs to verify you own the site before it will prioritize indexing it. Your verification file is already uploaded — here's how to complete the process:
          </p>
          <ol className="list-none space-y-2 mt-2">
            <li className="flex gap-2">
              <span className="text-warm-primary font-bold">1.</span>
              <span>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-warm-primary underline underline-offset-2 hover:text-warm-accent inline-flex items-center gap-0.5">Google Search Console <ExternalLink className="w-3 h-3" /></a> and sign in with your Google account.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-warm-primary font-bold">2.</span>
              <span>Click <strong>"Add property"</strong> and enter: <CodeBlock>{SITE_URL}/</CodeBlock></span>
            </li>
            <li className="flex gap-2">
              <span className="text-warm-primary font-bold">3.</span>
              <span>Choose <strong>"HTML file"</strong> verification method. The file <CodeBlock>googlee7577b039261c25d.html</CodeBlock> is already live at your site root.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-warm-primary font-bold">4.</span>
              <span>Click <strong>"Verify"</strong>. Once verified, go to <strong>Sitemaps</strong> in the left menu.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-warm-primary font-bold">5.</span>
              <span>Enter <CodeBlock>{SITE_URL}/sitemap.xml</CodeBlock> and click <strong>"Submit"</strong>.</span>
            </li>
          </ol>
          <Tip>
            After submitting, Google Search Console will show the number of URLs discovered from your sitemap. Check back in a few days to confirm it was processed successfully.
          </Tip>
        </Section>

        {/* Step 2: Check if indexed */}
        <Section icon={<Search className="w-5 h-5 text-warm-primary" />} number={2} title="Check If Your Site Is Indexed">
          <p>
            The fastest way to check if Google has indexed your site is to use the <strong>site: search operator</strong> directly in Google Search.
          </p>
          <div className="bg-warm-primary/5 border border-warm-primary/20 rounded-xl px-4 py-3 mt-2">
            <p className="text-xs font-semibold text-warm-primary uppercase tracking-wide mb-2">Open Google and search:</p>
            <CodeBlock>site:hosteladdas.icp0.io</CodeBlock>
            <p className="text-sm mt-2">
              ✅ <strong>If results appear</strong> — your site is indexed! You'll see pages listed from your domain.<br />
              ❌ <strong>If no results</strong> — Google hasn't indexed it yet. This is normal for new sites; wait 1–4 weeks after sitemap submission.
            </p>
          </div>
          <p className="mt-2">
            You can also check individual pages:
          </p>
          <ul className="list-none space-y-1 mt-1">
            <li><CodeBlock>site:hosteladdas.icp0.io/privacy</CodeBlock></li>
            <li><CodeBlock>site:hosteladdas.icp0.io/disclaimer</CodeBlock></li>
          </ul>
          <Tip>
            In Google Search Console, go to <strong>URL Inspection</strong> and paste any page URL to see its exact indexing status and request indexing manually for faster results.
          </Tip>
        </Section>

        {/* Step 3: Search by keywords */}
        <Section icon={<Search className="w-5 h-5 text-warm-primary" />} number={3} title="Search for Your Site Using Keywords">
          <p>
            Once indexed, your site will appear for different types of searches. Here are the exact queries to try:
          </p>
          <div className="space-y-3 mt-2">
            <div>
              <p className="text-sm font-semibold text-foreground/90 mb-1">🏷️ Branded searches (appear first, fastest):</p>
              <ul className="space-y-1">
                <li><CodeBlock>Hostel Addas</CodeBlock></li>
                <li><CodeBlock>Hostel Addas Hyderabad</CodeBlock></li>
                <li><CodeBlock>hosteladdas.icp0.io</CodeBlock></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground/90 mb-1">📍 Location-specific searches (medium competition):</p>
              <ul className="space-y-1">
                <li><CodeBlock>girls hostel Hitech City Hyderabad</CodeBlock></li>
                <li><CodeBlock>boys PG Madhapur Hyderabad</CodeBlock></li>
                <li><CodeBlock>co-living Gachibowli</CodeBlock></li>
                <li><CodeBlock>hostel near JNTU Hyderabad</CodeBlock></li>
                <li><CodeBlock>student accommodation Kukatpally</CodeBlock></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground/90 mb-1">🔑 Category searches (higher competition, long-term goal):</p>
              <ul className="space-y-1">
                <li><CodeBlock>affordable hostels Hyderabad</CodeBlock></li>
                <li><CodeBlock>paying guest Hyderabad</CodeBlock></li>
                <li><CodeBlock>PG accommodation Hyderabad</CodeBlock></li>
              </ul>
            </div>
          </div>
          <Tip>
            Branded searches will rank first. Category keywords take 3–6 months of consistent content and backlinks to rank well. Focus on getting listed in local directories first.
          </Tip>
        </Section>

        {/* Step 4: Local directories & backlinks */}
        <Section icon={<MapPin className="w-5 h-5 text-warm-primary" />} number={4} title="Get Listed on Local Directories (Backlinks)">
          <p>
            Backlinks — other websites linking to yours — are one of the strongest signals Google uses to rank sites. Getting listed on local Indian directories is free and highly effective for local SEO.
          </p>
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'JustDial', url: 'https://www.justdial.com', desc: 'India\'s largest local search engine. List your hostel directory under "Hostels in Hyderabad".' },
                { name: 'Sulekha', url: 'https://www.sulekha.com', desc: 'Popular for PG and hostel listings in Hyderabad. Free business listing available.' },
                { name: 'MagicBricks PG', url: 'https://www.magicbricks.com/pg-in-hyderabad', desc: 'Real estate portal with a dedicated PG section for Hyderabad.' },
                { name: 'NoBroker', url: 'https://www.nobroker.in', desc: 'List hostels and PG accommodations with direct links back to your site.' },
                { name: 'Google Business Profile', url: 'https://business.google.com', desc: 'Create a free Google Business listing — this directly boosts local search visibility.' },
                { name: 'Facebook Groups', url: 'https://www.facebook.com', desc: 'Share in Hyderabad student groups, PG seekers groups, and hostel communities.' },
              ].map((dir) => (
                <div key={dir.name} className="bg-warm-primary/5 border border-warm-primary/15 rounded-xl p-3">
                  <a
                    href={dir.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold text-warm-primary hover:text-warm-accent transition-colors text-sm mb-1"
                  >
                    {dir.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-muted-foreground leading-relaxed">{dir.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <Tip>
            When listing on directories, always include your full site URL: <strong>{SITE_URL}</strong>. Each listing creates a backlink that tells Google your site is trustworthy and relevant.
          </Tip>
        </Section>

        {/* Step 5: Timeline */}
        <Section icon={<Clock className="w-5 h-5 text-warm-primary" />} number={5} title="Expected Timeline & What to Expect">
          <p>
            SEO is a gradual process. Here's a realistic timeline for a new site like Hostel Addas:
          </p>
          <div className="space-y-3 mt-2">
            {[
              {
                period: 'Week 1–2',
                color: 'bg-warm-accent/20 border-warm-accent/30',
                textColor: 'text-warm-accent',
                title: 'Verification & Sitemap Submission',
                desc: 'Complete Google Search Console verification and submit your sitemap. Google\'s crawler will discover your site within days.'
              },
              {
                period: 'Week 2–4',
                color: 'bg-warm-primary/10 border-warm-primary/20',
                textColor: 'text-warm-primary',
                title: 'First Indexing',
                desc: 'Your homepage and key pages start appearing in Google\'s index. The site: operator search will return results.'
              },
              {
                period: 'Month 1–2',
                color: 'bg-warm-primary/10 border-warm-primary/20',
                textColor: 'text-warm-primary',
                title: 'Branded Searches Appear',
                desc: 'Searching "Hostel Addas" or "Hostel Addas Hyderabad" will show your site in results. This is the first milestone!'
              },
              {
                period: 'Month 2–4',
                color: 'bg-warm-primary/10 border-warm-primary/20',
                textColor: 'text-warm-primary',
                title: 'Local Keyword Rankings',
                desc: 'With backlinks from JustDial, Sulekha, and Google Business Profile, location-specific searches start ranking.'
              },
              {
                period: 'Month 4–6+',
                color: 'bg-warm-primary/10 border-warm-primary/20',
                textColor: 'text-warm-primary',
                title: 'Competitive Keyword Rankings',
                desc: 'Broader terms like "PG in Hyderabad" or "affordable hostels Hyderabad" begin to rank as domain authority grows.'
              },
            ].map((item) => (
              <div key={item.period} className={`flex gap-3 border rounded-xl p-3 ${item.color}`}>
                <div className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg bg-white/60 dark:bg-card/60 ${item.textColor} whitespace-nowrap`}>
                  {item.period}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${item.textColor}`}>{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Tip>
            Consistency is key. Keep your hostel listings updated, add new hostels regularly, and share the site on social media. Fresh content signals to Google that your site is active and relevant.
          </Tip>
        </Section>

        {/* Quick reference card */}
        <div className="bg-gradient-to-br from-warm-primary/10 to-warm-accent/10 border border-warm-primary/20 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-warm-primary mb-4">⚡ Quick Reference Checklist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Submit sitemap to Google Search Console',
              'Verify ownership with HTML file method',
              'Request indexing for homepage via URL Inspection',
              'Create Google Business Profile listing',
              'List on JustDial with site URL',
              'List on Sulekha with site URL',
              'Share on Facebook hostel/PG groups',
              'Check site:hosteladdas.icp0.io weekly',
              'Monitor Search Console for errors',
              'Add new hostel listings regularly',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="w-4 h-4 rounded border-2 border-warm-primary/40 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-warm-primary hover:text-warm-accent transition-colors font-medium"
          >
            ← Back to Hostel Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
