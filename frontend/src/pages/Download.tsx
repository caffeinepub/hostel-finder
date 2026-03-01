import { Smartphone, Apple, Chrome, Share2, Plus, Search, Filter, MapPin, Phone, Star, Download, QrCode } from 'lucide-react';

export default function DownloadPage() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hosteladdas.icp0.io';

  const androidSteps = [
    { icon: Chrome, title: 'Open in Chrome', desc: 'Visit Hostel Addas in the Chrome browser on your Android device.' },
    { icon: Smartphone, title: 'Tap the Menu', desc: 'Tap the three-dot menu (⋮) in the top-right corner of Chrome.' },
    { icon: Plus, title: 'Add to Home Screen', desc: 'Select "Add to Home Screen" from the menu and confirm by tapping "Add".' },
    { icon: Star, title: 'Done!', desc: 'The Hostel Addas icon will appear on your home screen like a native app.' },
  ];

  const iosSteps = [
    { icon: Smartphone, title: 'Open in Safari', desc: 'Visit Hostel Addas using the Safari browser on your iPhone or iPad.' },
    { icon: Share2, title: 'Tap Share', desc: 'Tap the Share button (the box with an arrow pointing up) at the bottom of Safari.' },
    { icon: Plus, title: 'Add to Home Screen', desc: 'Scroll down in the share sheet and tap "Add to Home Screen".' },
    { icon: Star, title: 'Done!', desc: 'Tap "Add" in the top-right corner. The app icon will appear on your home screen.' },
  ];

  const features = [
    { icon: Search, title: 'Smart Search', desc: 'Instantly search hostels by name, location, or area across Hyderabad.' },
    { icon: Filter, title: 'Category Filters', desc: 'Filter by Girls, Boys, or Co-Living to find exactly what you need.' },
    { icon: MapPin, title: 'Interactive Map', desc: 'View hostel locations on a map and find options near your workplace or college.' },
    { icon: Phone, title: 'Direct Contact', desc: 'Get owner contact details instantly and reach out without any middlemen.' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Download App', item: `${siteUrl}/download` },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-warm-bg">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-warm-primary via-warm-accent to-amber-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                  <Download className="w-4 h-4" />
                  Free · No App Store Required
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Get Hostel Addas<br />on Your Phone
                </h1>
                <p className="text-lg text-white/85 mb-6 max-w-md">
                  Install our Progressive Web App directly to your home screen — no app store needed. Works on Android and iOS.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="#android"
                    className="inline-flex items-center justify-center gap-2 bg-white text-warm-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors shadow-md"
                  >
                    <Smartphone className="w-5 h-5" />
                    Android Guide
                  </a>
                  <a
                    href="#ios"
                    className="inline-flex items-center justify-center gap-2 bg-white/20 border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <Apple className="w-5 h-5" />
                    iPhone / iPad Guide
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl scale-110" />
                  <img
                    src="/assets/generated/app-mockup.dim_600x400.png"
                    alt="Hostel Addas mobile app preview"
                    className="relative w-full max-w-xs md:max-w-sm rounded-2xl shadow-2xl border border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-14 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-warm-primary mb-2">Everything You Need</h2>
              <p className="text-muted-foreground">Find your perfect hostel in Hyderabad with these powerful features.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-warm-border hover:shadow-md transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-warm-primary to-warm-accent rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Android Installation */}
        <section id="android" className="py-14 px-4 bg-white dark:bg-card">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Android Installation</h2>
                <p className="text-sm text-muted-foreground">Using Google Chrome browser</p>
              </div>
            </div>
            <div className="space-y-4">
              {androidSteps.map(({ icon: Icon, title, desc }, index) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-warm-border bg-warm-bg hover:border-warm-primary/40 transition-colors"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-warm-primary to-warm-accent rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-warm-primary" />
                      <h3 className="font-semibold text-foreground">{title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl">
              <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                💡 Tip: If you don't see "Add to Home Screen", look for "Install App" or "Add to Home Screen" in the Chrome menu.
              </p>
            </div>
          </div>
        </section>

        {/* iOS Installation */}
        <section id="ios" className="py-14 px-4 bg-warm-bg">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Apple className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">iPhone / iPad Installation</h2>
                <p className="text-sm text-muted-foreground">Using Apple Safari browser</p>
              </div>
            </div>
            <div className="space-y-4">
              {iosSteps.map(({ icon: Icon, title, desc }, index) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-warm-border bg-white dark:bg-card hover:border-warm-primary/40 transition-colors"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-blue-500" />
                      <h3 className="font-semibold text-foreground">{title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                💡 Tip: This feature requires Safari on iOS 11.3 or later. Chrome on iOS does not support "Add to Home Screen" for PWAs.
              </p>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="py-14 px-4 bg-white dark:bg-card">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-warm-primary mb-2">Scan to Open on Mobile</h2>
              <p className="text-muted-foreground">Scan this QR code with your phone camera to open Hostel Addas instantly.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-48 bg-warm-bg border-2 border-warm-border rounded-2xl flex flex-col items-center justify-center gap-3 shadow-sm">
                  <QrCode className="w-20 h-20 text-warm-primary" />
                  <p className="text-xs text-muted-foreground text-center px-4">QR Code for<br />hosteladdas.icp0.io</p>
                </div>
                <p className="text-sm text-muted-foreground">Point your camera at the QR code</p>
              </div>
              <div className="flex-1 max-w-sm">
                <div className="bg-warm-bg rounded-2xl p-6 border border-warm-border">
                  <h3 className="font-semibold text-foreground mb-3">Or share the link directly</h3>
                  <div className="flex items-center gap-2 bg-white dark:bg-card border border-warm-border rounded-xl px-4 py-3">
                    <span className="text-sm text-muted-foreground flex-1 truncate">{siteUrl}</span>
                    <button
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(siteUrl);
                        }
                      }}
                      className="text-warm-primary hover:text-warm-accent transition-colors text-sm font-medium flex-shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Share this link with friends looking for hostels in Hyderabad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why PWA Section */}
        <section className="py-14 px-4 bg-gradient-to-br from-warm-primary/5 to-warm-accent/5">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-warm-primary mb-4">Why a PWA?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              A Progressive Web App gives you the best of both worlds — the convenience of a native app without the hassle of app store downloads.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { emoji: '⚡', title: 'Instant Install', desc: 'No app store. No waiting. Install in seconds directly from your browser.' },
                { emoji: '📦', title: 'Lightweight', desc: 'Takes up minimal storage on your device compared to native apps.' },
                { emoji: '🔄', title: 'Always Updated', desc: 'Always get the latest version automatically — no manual updates needed.' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="bg-white dark:bg-card rounded-2xl p-6 border border-warm-border shadow-sm">
                  <div className="text-3xl mb-3">{emoji}</div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
