import { useEffect, useRef } from 'react';
import { Hostel, Category } from '../backend';
import { MapPin } from 'lucide-react';

interface HostelMapProps {
  hostels: Hostel[];
}

export default function HostelMap({ hostels }: HostelMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case Category.girls:
        return '#ec4899'; // pink
      case Category.boys:
        return '#06b6d4'; // cyan
      case Category.coLiving:
        return '#f59e0b'; // amber
    }
  };

  const getMinPrice = (hostel: Hostel) => {
    const prices = [
      Number(hostel.roomCapacityDetails.price1),
      Number(hostel.roomCapacityDetails.price2),
      Number(hostel.roomCapacityDetails.price3),
      Number(hostel.roomCapacityDetails.price4),
    ].filter(p => p > 0);
    
    return Math.min(...prices);
  };

  useEffect(() => {
    // Since we don't have a real mapping library installed, we'll create a visual placeholder
    // that shows hostel locations in a grid layout
    if (!mapContainerRef.current) return;

    // Clear previous content
    mapContainerRef.current.innerHTML = '';

    if (hostels.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'flex items-center justify-center h-full text-muted-foreground';
      emptyState.textContent = 'No hostels to display on map';
      mapContainerRef.current.appendChild(emptyState);
      return;
    }

    // Create a simple visual map representation
    const mapContent = document.createElement('div');
    mapContent.className = 'relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950';
    
    // Add grid pattern
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'absolute inset-0 opacity-10';
    gridOverlay.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)';
    gridOverlay.style.backgroundSize = '50px 50px';
    mapContent.appendChild(gridOverlay);

    // Add hostel markers
    hostels.forEach((hostel, index) => {
      const marker = document.createElement('div');
      marker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group';
      
      // Position markers in a distributed pattern
      const x = 20 + (index * 60) % 80;
      const y = 20 + Math.floor(index / 3) * 30 % 70;
      marker.style.left = `${x}%`;
      marker.style.top = `${y}%`;

      const color = getCategoryColor(hostel.category);
      const minPrice = getMinPrice(hostel);
      
      marker.innerHTML = `
        <div class="relative">
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125" style="background-color: ${color}">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-gray-200 dark:border-gray-700">
            <div class="font-semibold text-sm mb-1">${hostel.name}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">${hostel.address}</div>
            <div class="text-sm font-bold" style="color: ${color}">From ₹${minPrice.toLocaleString('en-IN')}/month</div>
          </div>
        </div>
      `;

      mapContent.appendChild(marker);
    });

    mapContainerRef.current.appendChild(mapContent);
  }, [hostels]);

  return (
    <div ref={mapContainerRef} className="w-full h-full">
      {/* Map will be rendered here */}
    </div>
  );
}
