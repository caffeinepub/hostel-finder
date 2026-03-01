import { useParams, Link } from '@tanstack/react-router';
import { useGetHostel } from '../hooks/useQueries';
import ImageGallery from '../components/ImageGallery';
import HostelMap from '../components/HostelMap';
import { Category, ExternalBlob } from '../backend';
import { ArrowLeft, MapPin, Users, DollarSign, Home as HomeIcon, Loader2, Phone, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HostelDetail() {
  const { id } = useParams({ from: '/hostel/$id' });
  const hostelId = BigInt(id);
  const { data: hostel, isLoading, error } = useGetHostel(hostelId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-warm-primary" />
      </div>
    );
  }

  if (error || !hostel) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground mb-4">Hostel not found</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case Category.girls:
        return 'bg-category-girls text-category-girls-foreground';
      case Category.boys:
        return 'bg-category-boys text-category-boys-foreground';
      case Category.coLiving:
        return 'bg-category-coliving text-category-coliving-foreground';
    }
  };

  const getCategoryLabel = (category: Category) => {
    switch (category) {
      case Category.girls:
        return 'Girls Only';
      case Category.boys:
        return 'Boys Only';
      case Category.coLiving:
        return 'Co-Living';
    }
  };

  const getGalleryImages = () => {
    if (hostel.imageBlobs.length > 0) {
      return hostel.imageBlobs;
    }
    
    // Create fallback images based on category
    const idNum = Number(hostel.id);
    const images: string[] = [];
    
    switch (hostel.category) {
      case Category.girls:
        images.push('/assets/generated/girls-hostel-1.dim_800x600.png');
        images.push('/assets/generated/girls-hostel-2.dim_800x600.png');
        images.push('/assets/generated/hostel-girls-dorm.dim_800x600.png');
        break;
      case Category.boys:
        images.push('/assets/generated/boys-hostel-1.dim_800x600.png');
        images.push('/assets/generated/boys-hostel-2.dim_800x600.png');
        images.push('/assets/generated/hostel-boys-dorm.dim_800x600.png');
        break;
      case Category.coLiving:
        images.push('/assets/generated/co-living-1.dim_800x600.png');
        images.push('/assets/generated/co-living-2.dim_800x600.png');
        images.push('/assets/generated/hostel-coliving.dim_800x600.png');
        break;
    }
    
    images.push('/assets/generated/hostel-common-area.dim_800x600.png');
    images.push('/assets/generated/hostel-kitchen.dim_800x600.png');
    
    return images.map(url => ExternalBlob.fromURL(url));
  };

  const sharingOptions = [
    { sharing: Number(hostel.roomCapacityDetails.sharing1), price: Number(hostel.roomCapacityDetails.price1) },
    { sharing: Number(hostel.roomCapacityDetails.sharing2), price: Number(hostel.roomCapacityDetails.price2) },
    { sharing: Number(hostel.roomCapacityDetails.sharing3), price: Number(hostel.roomCapacityDetails.price3) },
    { sharing: Number(hostel.roomCapacityDetails.sharing4), price: Number(hostel.roomCapacityDetails.price4) },
  ].filter(option => option.price > 0);

  const getSharingLabel = (sharing: number) => {
    if (sharing === 1) return 'Single Room';
    if (sharing === 2) return 'Double Sharing';
    if (sharing === 3) return 'Triple Sharing';
    if (sharing === 4) return 'Four Sharing';
    return `${sharing}-Person Sharing`;
  };

  const hasValidContact = hostel.ownerContact && hostel.ownerContact.trim() !== '' && hostel.ownerContact !== 'not available';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/" className="inline-block mb-6">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Hostels
        </Button>
      </Link>

      {/* Image Gallery */}
      <div className="mb-8">
        <ImageGallery images={getGalleryImages()} />
      </div>

      {/* Hostel Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {hostel.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{hostel.address}</span>
                </div>
                {hasValidContact && (
                  <a 
                    href={`tel:${hostel.ownerContact}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-warm-primary text-white rounded-lg hover:bg-warm-primary/90 transition-colors font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-5 h-5" />
                    <span>{hostel.ownerContact}</span>
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Badge className={getCategoryColor(hostel.category)}>
                  {getCategoryLabel(hostel.category)}
                </Badge>
                <Link to="/edit-hostel/$id" params={{ id }}>
                  <Button className="gap-2 bg-gradient-to-r from-warm-primary to-warm-accent hover:from-warm-primary/90 hover:to-warm-accent/90">
                    <Edit className="w-4 h-4" />
                    Edit Hostel
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">About This Hostel</h2>
            <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
          </div>

          <Separator />

          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Location</h2>
            <div className="rounded-xl overflow-hidden border border-warm-border h-[400px]">
              <HostelMap hostels={[hostel]} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          {hasValidContact && (
            <Card className="border-warm-border shadow-lg bg-gradient-to-br from-warm-primary to-warm-accent text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Owner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={`tel:${hostel.ownerContact}`}
                  className="flex items-center justify-center gap-3 p-4 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-bold text-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-6 h-6" />
                  <span>{hostel.ownerContact}</span>
                </a>
                <p className="text-sm text-white/80 text-center mt-3">
                  Tap to call the hostel owner
                </p>
              </CardContent>
            </Card>
          )}

          {/* Pricing Card */}
          <Card className="border-warm-border shadow-lg">
            <CardHeader className="bg-gradient-to-br from-warm-primary to-warm-accent text-white">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing Options
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {sharingOptions.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-warm-primary" />
                      <span className="font-medium text-sm">{getSharingLabel(option.sharing)}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-warm-primary">
                        ₹{option.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-muted-foreground">per bed/month</div>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground text-center">
                All prices are per bed per month
              </div>
            </CardContent>
          </Card>

          {/* Room Details Card */}
          <Card className="border-warm-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HomeIcon className="w-5 h-5" />
                Room Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-warm-primary/10 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-warm-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Flexible Sharing</div>
                  <div className="text-sm text-muted-foreground">
                    Choose from single to four-person sharing
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <div className="bg-warm-accent/10 p-2 rounded-lg">
                  <HomeIcon className="w-5 h-5 text-warm-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Category</div>
                  <div className="text-sm text-muted-foreground">
                    {getCategoryLabel(hostel.category)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
