import { useState, useEffect } from 'react';
import { X, Search, ExternalLink, CheckCircle } from 'lucide-react';

const BANNER_DISMISSED_KEY = 'seo-banner-dismissed';

export default function SeoInfoBanner() {
  const [visible, setVisible] = useState(false);

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
          <div className="flex items-start gap-1.5 bg-warm-primary/10 rounded-lg px-3 py-2">
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
