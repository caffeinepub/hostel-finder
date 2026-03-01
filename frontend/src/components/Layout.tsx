import { Outlet, Link } from '@tanstack/react-router';
import { Home, MapPin, Plus } from 'lucide-react';
import { Button } from './ui/button';

export default function Layout() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'hostel-finder'
  );

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg">
      <header className="bg-white dark:bg-card border-b border-warm-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-warm-primary to-warm-accent p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-warm-primary">Hostel Finder</h1>
                <p className="text-xs text-muted-foreground">Find Your Perfect Stay</p>
              </div>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-warm-hover transition-colors text-foreground"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Browse Hostels</span>
              </Link>
              <Link to="/add-hostel">
                <Button className="flex items-center gap-2 bg-warm-primary hover:bg-warm-accent">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Hostel</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-card border-t border-warm-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Hostel Finder. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2 flex-wrap">
                <Link
                  to="/privacy"
                  className="text-sm text-warm-primary hover:text-warm-accent transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/disclaimer"
                  className="text-sm text-warm-primary hover:text-warm-accent transition-colors font-medium"
                >
                  Disclaimer
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/seo-guide"
                  className="text-sm text-warm-primary hover:text-warm-accent transition-colors font-medium"
                >
                  SEO Guide
                </Link>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Built with{' '}
                <span className="text-warm-accent">❤️</span> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-primary hover:text-warm-accent transition-colors font-medium"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
