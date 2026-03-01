import { useEffect, useRef } from 'react';
import { Hostel } from '../backend';

interface HostelMapProps {
  hostels: Hostel[];
}

// Hyderabad bounding box for coordinate normalization
const HYD_LAT_MIN = 17.30;
const HYD_LAT_MAX = 17.55;
const HYD_LNG_MIN = 78.35;
const HYD_LNG_MAX = 78.60;

function normalizeCoord(value: number, min: number, max: number): number {
  if (max === min) return 50;
  const clamped = Math.max(min, Math.min(max, value));
  return ((clamped - min) / (max - min)) * 80 + 10; // 10%–90% range
}

export default function HostelMap({ hostels }: HostelMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Girls':
        return '#ec4899'; // rose/pink
      case 'Boys':
        return '#06b6d4'; // cyan/blue
      case 'Co-Living':
        return '#f59e0b'; // amber
      default:
        return '#6b7280';
    }
  };

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'Girls':
        return 'Girls';
      case 'Boys':
        return 'Boys';
      case 'Co-Living':
        return 'Co-Living';
      default:
        return category;
    }
  };

  const getMinPrice = (hostel: Hostel): number => {
    const prices = [
      Number(hostel.roomCapacityDetails.price1),
      Number(hostel.roomCapacityDetails.price2),
      Number(hostel.roomCapacityDetails.price3),
      Number(hostel.roomCapacityDetails.price4),
      Number(hostel.roomCapacityDetails.price5),
    ].filter((p) => p > 0);

    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  useEffect(() => {
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

    // Outer wrapper
    const mapContent = document.createElement('div');
    mapContent.className = 'relative w-full h-full overflow-hidden';
    mapContent.style.background = 'linear-gradient(135deg, #e0f2fe 0%, #d1fae5 50%, #fef9c3 100%)';

    // Grid overlay
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'absolute inset-0';
    gridOverlay.style.backgroundImage =
      'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)';
    gridOverlay.style.backgroundSize = '40px 40px';
    mapContent.appendChild(gridOverlay);

    // City label
    const cityLabel = document.createElement('div');
    cityLabel.className = 'absolute top-3 left-3 text-xs font-semibold text-gray-500 bg-white/70 px-2 py-1 rounded';
    cityLabel.textContent = 'Hyderabad, Telangana';
    mapContent.appendChild(cityLabel);

    // Legend
    const legend = document.createElement('div');
    legend.className = 'absolute bottom-3 left-3 flex flex-col gap-1 bg-white/80 rounded-lg p-2 text-xs';
    legend.innerHTML = `
      <div class="font-semibold text-gray-700 mb-1">Legend</div>
      <div class="flex items-center gap-1"><span style="background:#ec4899;width:10px;height:10px;border-radius:50%;display:inline-block"></span> Girls</div>
      <div class="flex items-center gap-1"><span style="background:#06b6d4;width:10px;height:10px;border-radius:50%;display:inline-block"></span> Boys</div>
      <div class="flex items-center gap-1"><span style="background:#f59e0b;width:10px;height:10px;border-radius:50%;display:inline-block"></span> Co-Living</div>
    `;
    mapContent.appendChild(legend);

    // Add hostel markers using actual lat/lng coordinates
    hostels.forEach((hostel) => {
      const marker = document.createElement('div');
      marker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group';
      marker.style.zIndex = '10';

      // Use actual coordinates if available, otherwise fall back to distributed layout
      let xPct: number;
      let yPct: number;

      if (hostel.latitude !== 0 && hostel.longitude !== 0) {
        xPct = normalizeCoord(hostel.longitude, HYD_LNG_MIN, HYD_LNG_MAX);
        // Invert Y: higher latitude = higher on map
        yPct = 100 - normalizeCoord(hostel.latitude, HYD_LAT_MIN, HYD_LAT_MAX);
      } else {
        // Fallback: distribute evenly
        const idx = hostels.indexOf(hostel);
        xPct = 15 + (idx * 55) % 75;
        yPct = 15 + Math.floor(idx / 4) * 25 % 70;
      }

      marker.style.left = `${xPct}%`;
      marker.style.top = `${yPct}%`;

      const color = getCategoryColor(hostel.category);
      const categoryLabel = getCategoryLabel(hostel.category);
      const minPrice = getMinPrice(hostel);

      marker.innerHTML = `
        <div class="relative">
          <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-125 border-2 border-white" style="background-color: ${color}">
            <svg class="w-5 h-5" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-xl shadow-2xl p-3 min-w-[200px] max-w-[240px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 border border-gray-100">
            <div class="font-bold text-sm text-gray-800 mb-1 leading-tight">${hostel.name}</div>
            <div class="text-xs text-gray-500 mb-2 leading-snug line-clamp-2">${hostel.address}</div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style="background-color: ${color}">${categoryLabel}</span>
              <span class="text-sm font-bold" style="color: ${color}">₹${minPrice.toLocaleString('en-IN')}/mo</span>
            </div>
          </div>
        </div>
      `;

      mapContent.appendChild(marker);
    });

    mapContainerRef.current.appendChild(mapContent);
  }, [hostels]);

  return (
    <div ref={mapContainerRef} className="w-full h-full">
      {/* Map rendered imperatively */}
    </div>
  );
}
