import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2 } from 'lucide-react';

interface MapLocationPickerProps {
  onLocationSelect: (address: string, lat: number, lng: number) => void;
}

// Extend Window interface to include google
declare global {
  interface Window {
    google: any;
  }
}

export default function MapLocationPicker({ onLocationSelect }: MapLocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      setIsScriptLoaded(true);
      setIsLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsScriptLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps script');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || map) return;

    const defaultCenter = { lat: 17.385, lng: 78.4867 }; // Hyderabad coordinates

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    setMap(newMap);

    // Add click listener to map
    newMap.addListener('click', (e: any) => {
      if (e.latLng) {
        handleMapClick(e.latLng, newMap);
      }
    });
  }, [isScriptLoaded, map]);

  // Initialize autocomplete
  useEffect(() => {
    if (!isScriptLoaded || !searchInputRef.current || !map) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
      fields: ['formatted_address', 'geometry', 'name'],
      componentRestrictions: { country: 'in' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        console.error('No geometry found for this place');
        return;
      }

      const location = place.geometry.location;
      const address = place.formatted_address || place.name || '';

      // Update map and marker
      map.setCenter(location);
      map.setZoom(15);

      if (marker) {
        marker.setPosition(location);
      } else {
        const newMarker = new window.google.maps.Marker({
          position: location,
          map: map,
          draggable: true,
        });

        newMarker.addListener('dragend', (e: any) => {
          if (e.latLng) {
            handleMarkerDrag(e.latLng);
          }
        });

        setMarker(newMarker);
      }

      // Notify parent component
      onLocationSelect(address, location.lat(), location.lng());
    });
  }, [isScriptLoaded, map, marker, onLocationSelect]);

  const handleMapClick = (latLng: any, mapInstance: any) => {
    // Get address from coordinates using Geocoder
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const address = results[0].formatted_address;

        // Update or create marker
        if (marker) {
          marker.setPosition(latLng);
        } else {
          const newMarker = new window.google.maps.Marker({
            position: latLng,
            map: mapInstance,
            draggable: true,
          });

          newMarker.addListener('dragend', (e: any) => {
            if (e.latLng) {
              handleMarkerDrag(e.latLng);
            }
          });

          setMarker(newMarker);
        }

        // Notify parent component
        onLocationSelect(address, latLng.lat(), latLng.lng());
      }
    });
  };

  const handleMarkerDrag = (latLng: any) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const address = results[0].formatted_address;
        onLocationSelect(address, latLng.lat(), latLng.lng());
      }
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-warm-primary" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a location..."
          className="pl-10 border-warm-border focus:ring-warm-primary"
        />
      </div>

      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border border-warm-border shadow-sm"
        style={{ minHeight: '384px' }}
      />

      <p className="text-xs text-muted-foreground">
        Search for a location, click on the map, or drag the marker to select the hostel's location
      </p>
    </div>
  );
}
