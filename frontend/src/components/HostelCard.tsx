import { Hostel } from '../backend';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Phone, Star, Wifi } from 'lucide-react';

interface HostelCardProps {
  hostel: Hostel;
}

export default function HostelCard({ hostel }: HostelCardProps) {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Girls':
        return 'bg-category-girls text-category-girls-foreground';
      case 'Boys':
        return 'bg-category-boys text-category-boys-foreground';
      case 'Co-Living':
        return 'bg-category-coliving text-category-coliving-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Girls':
        return 'Girls Only';
      case 'Boys':
        return 'Boys Only';
      case 'Co-Living':
        return 'Co-Living';
      default:
        return category;
    }
  };

  const getDefaultImage = (category: string, id: bigint) => {
    const idNum = Number(id);
    switch (category) {
      case 'Girls':
        return idNum % 2 === 0
          ? '/assets/generated/girls-hostel-2.dim_800x600.png'
          : '/assets/generated/girls-hostel-1.dim_800x600.png';
      case 'Boys':
        return idNum % 2 === 0
          ? '/assets/generated/boys-hostel-2.dim_800x600.png'
          : '/assets/generated/boys-hostel-1.dim_800x600.png';
      case 'Co-Living':
        return idNum % 2 === 0
          ? '/assets/generated/co-living-2.dim_800x600.png'
          : '/assets/generated/co-living-1.dim_800x600.png';
      default:
        return '/assets/generated/hostel-common-area.dim_800x600.png';
    }
  };

  const imageUrl =
    hostel.imageUrls && hostel.imageUrls.length > 0
      ? hostel.imageUrls[0]
      : getDefaultImage(hostel.category, hostel.id);

  const handleClick = () => {
    navigate({ to: '/hostel/$id', params: { id: hostel.id.toString() } });
  };

  // Get the lowest and highest price from all sharing options
  const prices = [
    Number(hostel.roomCapacityDetails.price1),
    Number(hostel.roomCapacityDetails.price2),
    Number(hostel.roomCapacityDetails.price3),
    Number(hostel.roomCapacityDetails.price4),
    Number(hostel.roomCapacityDetails.price5),
  ].filter((p) => p > 0);

  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const hasValidContact =
    hostel.ownerContact &&
    hostel.ownerContact.trim() !== '' &&
    hostel.ownerContact !== 'not available';

  const amenities = hostel.amenities ?? [];
  const visibleAmenities = amenities.slice(0, 5);
  const extraCount = amenities.length - visibleAmenities.length;

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden border-warm-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={hostel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = getDefaultImage(hostel.category, hostel.id);
          }}
        />
        {/* Sponsored badge — top-left */}
        {hostel.isSponsored && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
              <Star className="w-3 h-3 fill-white" />
              Sponsored
            </span>
          </div>
        )}
        {/* Category badge — top-right */}
        <div className="absolute top-3 right-3">
          <Badge className={getCategoryColor(hostel.category)}>
            {getCategoryLabel(hostel.category)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-warm-primary transition-colors">
          {hostel.name}
        </h3>
        <div className="flex items-start gap-2 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm line-clamp-2">{hostel.address}</span>
        </div>
        {hasValidContact && (
          <div className="flex items-center gap-2 text-warm-primary mb-3">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{hostel.ownerContact}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {hostel.description}
        </p>

        {/* Amenities pills */}
        {visibleAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleAmenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-warm-primary/10 text-warm-primary font-medium border border-warm-primary/20"
              >
                <Wifi className="w-2.5 h-2.5" />
                {amenity}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium border border-warm-border">
                +{extraCount} more
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">1–5 sharing</span>
        </div>
        <div className="text-right">
          <div className="text-warm-primary font-bold text-lg">
            ₹{minPrice.toLocaleString('en-IN')}
            {minPrice !== maxPrice && (
              <span className="text-sm"> – ₹{maxPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">per bed/month</div>
        </div>
      </CardFooter>
    </Card>
  );
}
