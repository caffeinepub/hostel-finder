import { Hostel, Category } from '../backend';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Phone } from 'lucide-react';

interface HostelCardProps {
  hostel: Hostel;
}

export default function HostelCard({ hostel }: HostelCardProps) {
  const navigate = useNavigate();

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

  const getDefaultImage = (category: Category, id: bigint) => {
    const idNum = Number(id);
    switch (category) {
      case Category.girls:
        return idNum % 2 === 0 
          ? '/assets/generated/girls-hostel-2.dim_800x600.png'
          : '/assets/generated/girls-hostel-1.dim_800x600.png';
      case Category.boys:
        return idNum % 2 === 0 
          ? '/assets/generated/boys-hostel-2.dim_800x600.png'
          : '/assets/generated/boys-hostel-1.dim_800x600.png';
      case Category.coLiving:
        return idNum % 2 === 0 
          ? '/assets/generated/co-living-2.dim_800x600.png'
          : '/assets/generated/co-living-1.dim_800x600.png';
    }
  };

  const imageUrl = hostel.imageBlobs.length > 0 
    ? hostel.imageBlobs[0].getDirectURL() 
    : getDefaultImage(hostel.category, hostel.id);

  const handleClick = () => {
    navigate({ to: '/hostel/$id', params: { id: hostel.id.toString() } });
  };

  // Get the lowest price from all sharing options
  const prices = [
    Number(hostel.roomCapacityDetails.price1),
    Number(hostel.roomCapacityDetails.price2),
    Number(hostel.roomCapacityDetails.price3),
    Number(hostel.roomCapacityDetails.price4),
  ].filter(p => p > 0);
  
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

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
        />
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
        {hostel.ownerContact && hostel.ownerContact.trim() !== '' && hostel.ownerContact !== 'not available' && (
          <div className="flex items-center gap-2 text-warm-primary mb-3">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{hostel.ownerContact}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {hostel.description}
        </p>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">1-4 sharing</span>
        </div>
        <div className="text-right">
          <div className="text-warm-primary font-bold text-lg">
            ₹{minPrice.toLocaleString('en-IN')}
            {minPrice !== maxPrice && <span className="text-sm"> - ₹{maxPrice.toLocaleString('en-IN')}</span>}
          </div>
          <div className="text-xs text-muted-foreground">per bed/month</div>
        </div>
      </CardFooter>
    </Card>
  );
}
