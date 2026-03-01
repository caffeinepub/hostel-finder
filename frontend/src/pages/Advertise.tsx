import { Link } from '@tanstack/react-router';
import { TrendingUp, Star, Users, Mail, Phone, BarChart2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdBanner from '../components/AdBanner';

export default function Advertise() {
  // TODO: Replace with your actual WhatsApp number and email
  const whatsappNumber = '919999999999'; // Update with real number
  const contactEmail = 'advertise@hosteladdas.com'; // Update with real email

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-warm-primary to-warm-accent py-20 px-4 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-white/20 text-white border-white/30 mb-4 text-sm px-4 py-1">
            Advertise With Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Grow Your Business with<br />
            <span className="text-amber-200">Hostel Addas</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Reach thousands of students and working professionals actively searching for hostels in Hyderabad. 
            Get your hostel or business in front of the right audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20am%20interested%20in%20advertising%20on%20Hostel%20Addas`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-warm-primary hover:bg-amber-50 font-bold px-8">
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </a>
            <a href={`mailto:${contactEmail}?subject=Advertising%20Inquiry%20-%20Hostel%20Addas`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold px-8"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '1,000+', label: 'Monthly Visitors', icon: Users },
              { value: '12+', label: 'Listed Hostels', icon: Star },
              { value: 'Hyderabad', label: 'Primary Market', icon: TrendingUp },
              { value: '100%', label: 'Targeted Audience', icon: BarChart2 },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-warm-primary" />
                <div className="text-2xl font-bold text-warm-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            * Visitor stats are approximate and growing. Contact us for real-time analytics.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-12">

        {/* Sponsored Listings */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Sponsored Listings</h2>
              <p className="text-muted-foreground text-sm">Feature your hostel at the top of search results</p>
            </div>
          </div>
          <Card className="border-warm-border shadow-md">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Get your hostel featured at the <strong className="text-foreground">top of every listing</strong> with a prominent 
                    gold "Sponsored" badge. Sponsored hostels appear before all organic results, 
                    giving you maximum visibility to prospective tenants.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Priority placement above all other listings',
                      'Gold "Sponsored" badge for instant recognition',
                      'Visible on home page and category filters',
                      'Increased click-through to your hostel page',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-full max-w-[280px]">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                      <div className="relative h-32 bg-gradient-to-br from-warm-primary/20 to-warm-accent/20 rounded-lg mb-3 overflow-hidden">
                        <div className="absolute top-2 left-2">
                          <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                            ⭐ Sponsored
                          </span>
                        </div>
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">Hostel Image</div>
                      </div>
                      <div className="text-sm font-bold text-foreground">Your Hostel Name</div>
                      <div className="text-xs text-muted-foreground mt-1">Hyderabad, Telangana</div>
                      <div className="text-sm font-bold text-warm-primary mt-2">₹5,000 – ₹12,000/mo</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Preview of sponsored listing card</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ad Placements */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Banner Ad Placements</h2>
              <p className="text-muted-foreground text-sm">Strategic ad slots across the site</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-warm-border shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Home Page — Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  A wide banner displayed prominently between the search filters and hostel listings. 
                  Seen by every visitor who browses hostels.
                </p>
                <div className="overflow-x-auto">
                  <AdBanner size="leaderboard" className="opacity-70" />
                </div>
                <div className="text-xs text-muted-foreground">Size: 728×90 px (responsive)</div>
              </CardContent>
            </Card>
            <Card className="border-warm-border shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Home Page — Inline Rectangle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Rectangle ads inserted after every 6 hostel cards in the grid. 
                  High engagement as users scroll through listings.
                </p>
                <div className="flex justify-center">
                  <AdBanner size="rectangle" className="opacity-70" />
                </div>
                <div className="text-xs text-muted-foreground">Size: 300×250 px</div>
              </CardContent>
            </Card>
            <Card className="border-warm-border shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Hostel Detail Page — Sidebar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Rectangle ad in the sidebar of individual hostel pages. 
                  Reaches users who are actively evaluating a specific hostel.
                </p>
                <div className="flex justify-center">
                  <AdBanner size="rectangle" className="opacity-70" />
                </div>
                <div className="text-xs text-muted-foreground">Size: 300×250 px</div>
              </CardContent>
            </Card>
            <Card className="border-warm-border shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Mobile Banner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Compact banner optimized for mobile users. 
                  Displayed below filters on small screens for maximum reach.
                </p>
                <div className="flex justify-center">
                  <AdBanner size="banner" className="opacity-70" />
                </div>
                <div className="text-xs text-muted-foreground">Size: 468×60 px</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Visitor Stats */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Our Audience</h2>
              <p className="text-muted-foreground text-sm">Who visits Hostel Addas</p>
            </div>
          </div>
          <Card className="border-warm-border shadow-md">
            <CardContent className="pt-6">
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Users,
                    title: 'Students & Professionals',
                    desc: 'Our audience is primarily students from colleges and IT professionals relocating to Hyderabad — exactly the people looking for hostels.',
                    color: 'text-blue-600',
                    bg: 'bg-blue-50 dark:bg-blue-950/30',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Growing Traffic',
                    desc: 'Site traffic is growing month-over-month as more people discover Hostel Addas through search engines and word of mouth.',
                    color: 'text-green-600',
                    bg: 'bg-green-50 dark:bg-green-950/30',
                  },
                  {
                    icon: Star,
                    title: 'High Intent Visitors',
                    desc: 'Visitors are actively searching for accommodation — they have high purchase intent, making your ads more effective.',
                    color: 'text-amber-600',
                    bg: 'bg-amber-50 dark:bg-amber-950/30',
                  },
                ].map(({ icon: Icon, title, desc, color, bg }) => (
                  <div key={title} className={`${bg} rounded-xl p-5`}>
                    <Icon className={`w-6 h-6 ${color} mb-3`} />
                    <h3 className="font-bold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6 text-center">
                Real-time visitor analytics available on request. Contact us to get detailed stats.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact / CTA */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-warm-primary/10 p-3 rounded-xl">
              <Mail className="w-6 h-6 text-warm-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Get In Touch</h2>
              <p className="text-muted-foreground text-sm">Start advertising today</p>
            </div>
          </div>
          <Card className="border-warm-border shadow-md bg-gradient-to-br from-warm-primary/5 to-warm-accent/5">
            <CardContent className="pt-8 pb-8">
              <div className="text-center max-w-xl mx-auto space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Ready to reach thousands of hostel seekers in Hyderabad? 
                  Contact us to discuss pricing, availability, and custom advertising packages 
                  tailored to your budget and goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* TODO: Replace 919999999999 with your actual WhatsApp number */}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20am%20interested%20in%20advertising%20on%20Hostel%20Addas`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 w-full sm:w-auto">
                      <Phone className="w-5 h-5 mr-2" />
                      WhatsApp Us
                    </Button>
                  </a>
                  {/* TODO: Replace advertise@hosteladdas.com with your actual email */}
                  <a href={`mailto:${contactEmail}?subject=Advertising%20Inquiry%20-%20Hostel%20Addas`}>
                    <Button size="lg" variant="outline" className="border-warm-primary text-warm-primary hover:bg-warm-primary/10 font-bold px-8 w-full sm:w-auto">
                      <Mail className="w-5 h-5 mr-2" />
                      Email Us
                    </Button>
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Back to Home */}
        <div className="text-center pt-4">
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              ← Back to Hostel Listings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
