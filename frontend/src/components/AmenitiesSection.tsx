import {
  Wifi,
  Wind,
  WashingMachine,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Droplets,
  Zap,
  Shield,
  Camera,
  BookOpen,
  ChefHat,
  Gamepad2,
  Leaf,
  Film,
  Library,
  Users,
  Star,
} from 'lucide-react';

interface AmenitiesSectionProps {
  amenities: string[];
}

const amenityIconMap: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-4 h-4" />,
  AC: <Wind className="w-4 h-4" />,
  Laundry: <WashingMachine className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
  Meals: <UtensilsCrossed className="w-4 h-4" />,
  Gym: <Dumbbell className="w-4 h-4" />,
  'Hot Water': <Droplets className="w-4 h-4" />,
  'Power Backup': <Zap className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
  CCTV: <Camera className="w-4 h-4" />,
  'Study Room': <BookOpen className="w-4 h-4" />,
  'Common Kitchen': <ChefHat className="w-4 h-4" />,
  'Gaming Zone': <Gamepad2 className="w-4 h-4" />,
  'Organic Food': <Leaf className="w-4 h-4" />,
  'Movie Room': <Film className="w-4 h-4" />,
  Library: <Library className="w-4 h-4" />,
  'Inclusive Environment': <Users className="w-4 h-4" />,
  'Fitness Studio': <Dumbbell className="w-4 h-4" />,
  'Fitness Center': <Dumbbell className="w-4 h-4" />,
  'Fitness Area': <Dumbbell className="w-4 h-4" />,
  'Premium Fitness Center': <Dumbbell className="w-4 h-4" />,
  'Pool Hall': <Star className="w-4 h-4" />,
  'Cultural Activities': <Star className="w-4 h-4" />,
};

function getAmenityIcon(amenity: string): React.ReactNode {
  return amenityIconMap[amenity] ?? <Star className="w-4 h-4" />;
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  if (!amenities || amenities.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
        <p className="text-muted-foreground text-sm">No amenities listed for this hostel.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-warm-primary/8 border border-warm-primary/15 text-foreground hover:bg-warm-primary/15 transition-colors"
          >
            <span className="text-warm-primary flex-shrink-0">
              {getAmenityIcon(amenity)}
            </span>
            <span className="text-sm font-medium leading-tight">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
