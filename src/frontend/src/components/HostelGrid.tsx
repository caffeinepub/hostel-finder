import { Hostel } from '../backend';
import HostelCard from './HostelCard';
import { Loader2, Home } from 'lucide-react';

interface HostelGridProps {
  hostels: Hostel[];
  isLoading: boolean;
}

export default function HostelGrid({ hostels, isLoading }: HostelGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-12 h-12 animate-spin text-warm-primary" />
      </div>
    );
  }

  if (hostels.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warm-primary/10 mb-4">
          <Home className="w-10 h-10 text-warm-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No hostels found</h3>
        <p className="text-muted-foreground">
          Try selecting a different category or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hostels.map((hostel) => (
        <HostelCard key={hostel.id.toString()} hostel={hostel} />
      ))}
    </div>
  );
}
