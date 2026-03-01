import { useState, useEffect } from 'react';
import { X, Search, ExternalLink, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const BANNER_DISMISSED_KEY = 'seo-banner-dismissed';

export default function SeoInfoBanner() {
  const [visible, setVisible] = useState(false);
  const [guideExpanded, setGuideExpanded] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-warm-primary/10 border border-warm-primary/30 rounded-xl px-4 py-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-warm-primary/20 flex items-center justify-center">
            <Search className="w-4 h-4 text-warm-primary" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-warm-primary mb-0.5">
            🔍 Boost Your Google Visibility
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mb-2">
            Your site is live! To appear in Google search results faster, submit your URL to{' '}
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-warm-primary underline underline-offset-2 hover:text-warm-accent transition-colors"
            >
              Google Search Console
              <ExternalLink className="w-3 h-3" />
            </a>
            {' '}and request indexing. It's free and speeds up discovery by weeks.
          </p>

          <div className="flex items-start gap-1.5 bg-warm-primary/10 rounded-lg px-3 py-2 mb-2">
            <CheckCircle className="w-4 h-4 text-warm-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/80 leading-relaxed">
              <span className="font-semibold text-warm-primary">Verification file uploaded!</span>{' '}
              Your Google verification file{' '}
              <code className="bg-warm-primary/15 px-1 py-0.5 rounded text-xs font-mono">
                googlee7577b039261c25d.html
              </code>{' '}
              is live at your site root. In Search Console, choose <strong>"HTML file"</strong> verification and confirm ownership.
            </p>
          </div>

          {/* How to find your site on Google - collapsible guide */}
          <button
            onClick={() => setGuideExpanded(!guideExpanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-warm-primary hover:text-warm-accent transition-colors mb-1"
          >
            {guideExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            How to find your site on Google — step-by-step guide
          </button>

          {guideExpanded && (
            <div className="bg-white/60 dark:bg-card/60 border border-warm-primary/20 rounded-lg px-4 py-3 mt-1">
              <p className="text-xs font-semibold text-warm-primary mb-2 uppercase tracking-wide">
                📋 Step-by-Step: Get Visible on Google
              </p>
              <ol className="space-y-3 text-xs text-foreground/80">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-warm-primary text-white flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <p className="font-semibold text-foreground/90">Submit your sitemap in Google Search Console</p>
                    <p className="mt-0.5 leading-relaxed">
                      Go to{' '}
                      <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-warm-primary underline underline-offset-1 hover:text-warm-accent">
                        search.google.com/search-console
                      </a>
                      , verify ownership using the HTML file method, then go to <strong>Sitemaps</strong> and submit:{' '}
                      <code className="bg-warm-primary/10 px-1 rounded font-mono">https://hosteladdas.icp0.io/sitemap.xml</code>
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-warm-primary text-white flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <p className="font-semibold text-foreground/90">Wait 1–4 weeks for indexing</p>
                    <p className="mt-0.5 leading-relaxed">
                      After submitting the sitemap, Google typically indexes new sites within <strong>1 to 4 weeks</strong>. Be patient — this is normal for new websites.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-warm-primary text-white flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <p className="font-semibold text-foreground/90">Check if your site is indexed</p>
                    <p className="mt-0.5 leading-relaxed">
                      Open Google and search:{' '}
                      <code className="bg-warm-primary/10 px-1 rounded font-mono">site:hosteladdas.icp0.io</code>
                      {' '}— if results appear, your site is indexed! If nothing shows, it's not indexed yet.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-warm-primary text-white flex items-center justify-center font-bold text-xs">4</span>
                  <div>
                    <p className="font-semibold text-foreground/90">Search for your site by name or keywords</p>
                    <p className="mt-0.5 leading-relaxed">
                      Try searching Google for:{' '}
                      <strong>"Hostel Addas Hyderabad"</strong>, <strong>"hostels in Hyderabad PG"</strong>, or{' '}
                      <strong>"girls hostel Hitech City"</strong>. Branded searches appear first, then category keywords as your ranking grows.
                    </p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-warm-primary text-white flex items-center justify-center font-bold text-xs">5</span>
                  <div>
                    <p className="font-semibold text-foreground/90">Build backlinks to speed up ranking</p>
                    <p className="mt-0.5 leading-relaxed">
                      Share your site URL on <strong>JustDial</strong>, <strong>Sulekha</strong>, <strong>MagicBricks PG</strong>, and social media (Facebook groups, WhatsApp). Each link pointing to your site helps Google trust and rank it faster.
                    </p>
                  </div>
                </li>
              </ol>
              <div className="mt-3 pt-2 border-t border-warm-primary/15">
                <p className="text-xs text-foreground/60 italic">
                  💡 Tip: For a full SEO guide, visit the{' '}
                  <a href="/seo-guide" className="text-warm-primary underline underline-offset-1 hover:text-warm-accent font-medium">
                    SEO Guide page
                  </a>.
                </p>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss SEO banner"
          className="flex-shrink-0 mt-0.5 p-1 rounded-md text-foreground/50 hover:text-foreground hover:bg-warm-primary/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
