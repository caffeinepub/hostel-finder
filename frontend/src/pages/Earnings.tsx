import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  DollarSign,
  TrendingUp,
  Users,
  Star,
  MonitorPlay,
  Mail,
  MessageCircle,
  Calculator,
  Info,
  ChevronRight,
  Megaphone,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useVisitorCount } from '../hooks/useQueries';

export default function Earnings() {
  const { data: visitorCount, isLoading: isLoadingVisitors } = useVisitorCount();

  const [monthlyVisitors, setMonthlyVisitors] = useState<string>('5000');
  const [cpm, setCpm] = useState<string>('1.5');

  const displayVisitorCount = isLoadingVisitors
    ? '--'
    : visitorCount !== undefined
    ? Number(visitorCount).toLocaleString('en-IN')
    : '--';

  const estimatedRevenue = (() => {
    const v = parseFloat(monthlyVisitors);
    const c = parseFloat(cpm);
    if (isNaN(v) || isNaN(c) || v <= 0 || c <= 0) return null;
    return ((v / 1000) * c).toFixed(2);
  })();

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Hero */}
      <section className="bg-gradient-to-br from-warm-primary via-warm-accent to-amber-600 text-white py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4 text-sm font-medium">
            <DollarSign className="w-4 h-4" />
            Monetization Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Earn from Your Site Visitors</h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Turn your growing audience into revenue through display ads, sponsored listings, and
            more. Here's everything you need to get started.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-12">

        {/* ── 1. Visitor Stats ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-warm-primary" />
            <h2 className="text-xl font-bold text-foreground">Live Visitor Stats</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-warm-border shadow-sm col-span-1 sm:col-span-1">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center gap-2">
                <div className="bg-warm-primary/10 rounded-full p-3 mb-1">
                  <Users className="w-6 h-6 text-warm-primary" />
                </div>
                <p className="text-3xl font-bold text-warm-primary">{displayVisitorCount}</p>
                <p className="text-sm text-muted-foreground">Total Site Visitors</p>
                {isLoadingVisitors && (
                  <p className="text-xs text-muted-foreground animate-pulse">Loading…</p>
                )}
              </CardContent>
            </Card>
            <Card className="border-warm-border shadow-sm sm:col-span-2">
              <CardContent className="pt-6 pb-6">
                <p className="text-sm text-muted-foreground mb-3">
                  Every visitor is a potential ad impression. As your audience grows, so does your
                  earning potential. The counter above is fetched live from the backend and updates
                  every 60 seconds.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    <TrendingUp className="w-3 h-3 mr-1" /> Growing audience
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    <Star className="w-3 h-3 mr-1" /> Niche hostel traffic
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="border-warm-border" />

        {/* ── 2. Display Ads (Google AdSense) ── */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <MonitorPlay className="w-5 h-5 text-warm-primary" />
            <h2 className="text-xl font-bold text-foreground">Display Ads — Google AdSense</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Display ads are the easiest way to monetize. Once your AdSense account is approved,
            replace the placeholder banners already on the site with real ad units.
          </p>

          <Card className="border-warm-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="bg-warm-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                Sign up for Google AdSense
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1 pt-0">
              <p>
                Go to{' '}
                <a
                  href="https://adsense.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-primary underline underline-offset-2 hover:text-warm-accent"
                >
                  adsense.google.com
                </a>{' '}
                and create an account using your Google account. Submit your site URL for review.
              </p>
            </CardContent>
          </Card>

          <Card className="border-warm-border shadow-sm mt-3">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="bg-warm-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                Get your site approved
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground pt-0">
              <p>
                Google reviews your site for content quality and policy compliance. Approval
                typically takes 1–14 days. Once approved, you'll receive a publisher ID in the
                format <code className="bg-muted px-1 rounded text-xs">ca-pub-XXXXXXXXXXXXXXXX</code>.
              </p>
            </CardContent>
          </Card>

          <Card className="border-warm-border shadow-sm mt-3">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="bg-warm-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                Activate ads in the AdBanner component
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground pt-0 space-y-3">
              <p>
                Open <code className="bg-muted px-1 rounded text-xs">frontend/src/components/AdBanner.tsx</code>.
                Inside the component you'll find a clearly commented block labelled{' '}
                <strong>ADSENSE INJECTION POINT</strong>. Follow the three steps in the comments:
              </p>
              <ol className="list-decimal list-inside space-y-1 pl-2">
                <li>Delete the existing placeholder <code className="bg-muted px-1 rounded text-xs">&lt;div&gt;</code> (the amber gradient box).</li>
                <li>
                  Uncomment the <code className="bg-muted px-1 rounded text-xs">&lt;ins&gt;</code> AdSense block and replace{' '}
                  <code className="bg-muted px-1 rounded text-xs">ca-pub-XXXXXXXXXXXXXXXX</code> with your real publisher ID.
                </li>
                <li>
                  Replace <code className="bg-muted px-1 rounded text-xs">YYYYYYYYYY</code> with the specific ad unit slot ID
                  from your AdSense dashboard.
                </li>
              </ol>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  Ad banners are already placed on the Home page (leaderboard + inline rectangle
                  ads) and on each Hostel Detail page (sidebar rectangle). Once you activate
                  AdSense, real ads will appear in all those spots automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="border-warm-border" />

        {/* ── 3. Sponsored Listings ── */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-foreground">Sponsored Listings</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Hostel owners can pay to have their listing appear at the top of search results with a
            prominent gold <strong>Sponsored</strong> badge. This is a direct revenue stream you
            control entirely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-warm-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">How it works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2 pt-0">
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-warm-primary shrink-0 mt-0.5" />
                  <p>Hostel owner contacts you via WhatsApp or email to request a sponsored slot.</p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-warm-primary shrink-0 mt-0.5" />
                  <p>You agree on a monthly fee (e.g., ₹500–₹2,000/month).</p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-warm-primary shrink-0 mt-0.5" />
                  <p>
                    Toggle <code className="bg-muted px-1 rounded text-xs">isSponsored = true</code> on
                    their hostel via the Edit Hostel page.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-warm-primary shrink-0 mt-0.5" />
                  <p>Their listing automatically rises to the top with a gold Sponsored badge.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-600" />
                  Contact CTA for Hostel Owners
                </CardTitle>
                <CardDescription className="text-xs text-amber-700 dark:text-amber-400">
                  ⚠️ Update the WhatsApp number and email below with your real contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20sponsor%20my%20hostel%20listing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-950/30 gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp: +91-XXXXXXXXXX
                  </Button>
                </a>
                <a href="mailto:your@email.com?subject=Sponsored%20Listing%20Enquiry" className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    className="w-full border-warm-primary text-warm-primary hover:bg-warm-hover dark:hover:bg-warm-primary/10 gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    your@email.com
                  </Button>
                </a>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                  Replace the placeholder number and email above with your actual contact details.
                  You can also link to the{' '}
                  <Link to="/advertise" className="underline underline-offset-2 hover:text-amber-600">
                    Advertise page
                  </Link>{' '}
                  for a full pitch.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="border-warm-border" />

        {/* ── 4. Earnings Estimator ── */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-warm-primary" />
            <h2 className="text-xl font-bold text-foreground">Potential Earnings Estimator</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Use this calculator to estimate your monthly ad revenue based on your expected traffic
            and average CPM (cost per 1,000 impressions).
          </p>

          <Card className="border-warm-border shadow-sm max-w-xl">
            <CardContent className="pt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="monthly-visitors" className="text-sm font-medium">
                    Estimated Monthly Visitors
                  </Label>
                  <Input
                    id="monthly-visitors"
                    type="number"
                    min="0"
                    placeholder="e.g. 5000"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(e.target.value)}
                    className="border-warm-border focus-visible:ring-warm-primary"
                  />
                  <p className="text-xs text-muted-foreground">Number of unique visitors per month</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cpm" className="text-sm font-medium">
                    Average CPM (₹ or $)
                  </Label>
                  <Input
                    id="cpm"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 1.5"
                    value={cpm}
                    onChange={(e) => setCpm(e.target.value)}
                    className="border-warm-border focus-visible:ring-warm-primary"
                  />
                  <p className="text-xs text-muted-foreground">Typical Indian traffic CPM: ₹0.5–₹3</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-warm-primary/10 to-amber-100 dark:from-warm-primary/20 dark:to-amber-900/20 rounded-xl p-5 text-center border border-warm-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Estimated Monthly Ad Revenue
                </p>
                {estimatedRevenue !== null ? (
                  <p className="text-4xl font-bold text-warm-primary">
                    ₹{Number(estimatedRevenue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-muted-foreground">—</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Formula: (Monthly Visitors ÷ 1,000) × CPM
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  This is an estimate only. Actual earnings depend on ad fill rate, user geography,
                  ad format, and seasonal demand. Indian traffic typically earns lower CPM than US/EU
                  traffic.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-warm-primary/10 to-amber-50 dark:from-warm-primary/20 dark:to-amber-950/20 rounded-2xl p-8 text-center border border-warm-border">
          <h3 className="text-xl font-bold text-foreground mb-2">Ready to start earning?</h3>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            Sign up for Google AdSense and reach out to hostel owners about sponsored listings to
            start generating revenue from your growing audience.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://adsense.google.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-warm-primary hover:bg-warm-accent gap-2">
                <MonitorPlay className="w-4 h-4" />
                Apply for AdSense
              </Button>
            </a>
            <Link to="/advertise">
              <Button variant="outline" className="border-warm-primary text-warm-primary hover:bg-warm-hover gap-2">
                <Megaphone className="w-4 h-4" />
                View Advertise Page
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
