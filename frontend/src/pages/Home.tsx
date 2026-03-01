import { useState, useMemo, useEffect } from 'react';
import { useGetAllHostels, useGetHostelsByCategory } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import CategoryFilter, { CategoryValue } from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import AdvancedFilters from '../components/AdvancedFilters';
import SortControls, { SortOption } from '../components/SortControls';
import HostelGrid from '../components/HostelGrid';
import HostelMap from '../components/HostelMap';
import SeoInfoBanner from '../components/SeoInfoBanner';
import AdBanner from '../components/AdBanner';
import HostelCard from '../components/HostelCard';
import { Hostel } from '../backend';
import { Loader2 } from 'lucide-react';

const AD_INTERVAL = 6; // Insert an ad after every N hostel cards

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });
  const [selectedSharingTypes, setSelectedSharingTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');

  const { actor } = useActor();

  const { data: allHostels, isLoading: isLoadingAll } = useGetAllHostels();
  const { data: girlsHostels, isLoading: isLoadingGirls } = useGetHostelsByCategory('Girls');
  const { data: boysHostels, isLoading: isLoadingBoys } = useGetHostelsByCategory('Boys');
  const { data: coLivingHostels, isLoading: isLoadingCoLiving } = useGetHostelsByCategory('Co-Living');

  // Record visit once per browser session
  useEffect(() => {
    if (!actor) return;
    const visited = sessionStorage.getItem('hostel_addas_visited');
    if (!visited) {
      actor.recordVisit()
        .then(() => {
          sessionStorage.setItem('hostel_addas_visited', '1');
        })
        .catch(() => {
          // Silently ignore errors — visitor tracking is non-critical
        });
    }
  }, [actor]);

  const getCategoryFilteredHostels = () => {
    switch (selectedCategory) {
      case 'Girls':
        return girlsHostels || [];
      case 'Boys':
        return boysHostels || [];
      case 'Co-Living':
        return coLivingHostels || [];
      default:
        return allHostels || [];
    }
  };

  const filteredAndSortedHostels = useMemo(() => {
    let hostels = getCategoryFilteredHostels();

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      hostels = hostels.filter(
        (hostel) =>
          hostel.name.toLowerCase().includes(query) ||
          hostel.address.toLowerCase().includes(query) ||
          hostel.description.toLowerCase().includes(query)
      );
    }

    // Apply price range filter (use all 5 sharing prices)
    hostels = hostels.filter((hostel) => {
      const prices = [
        Number(hostel.roomCapacityDetails.price1),
        Number(hostel.roomCapacityDetails.price2),
        Number(hostel.roomCapacityDetails.price3),
        Number(hostel.roomCapacityDetails.price4),
        Number(hostel.roomCapacityDetails.price5),
      ].filter((p) => p > 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      return minPrice >= priceRange.min && minPrice <= priceRange.max;
    });

    // Apply sharing type filter
    if (selectedSharingTypes.length > 0) {
      hostels = hostels.filter((hostel) => {
        return selectedSharingTypes.some((type) => {
          switch (type) {
            case 'single':
              return Number(hostel.roomCapacityDetails.price1) > 0;
            case 'double':
              return Number(hostel.roomCapacityDetails.price2) > 0;
            case 'triple':
              return Number(hostel.roomCapacityDetails.price3) > 0;
            case 'four':
              return Number(hostel.roomCapacityDetails.price4) > 0;
            case 'five':
              return Number(hostel.roomCapacityDetails.price5) > 0;
            default:
              return false;
          }
        });
      });
    }

    // Two-tier sort: sponsored first, then by user-selected sort option
    const getMinPrice = (h: Hostel) => {
      const prices = [
        Number(h.roomCapacityDetails.price1),
        Number(h.roomCapacityDetails.price2),
        Number(h.roomCapacityDetails.price3),
        Number(h.roomCapacityDetails.price4),
        Number(h.roomCapacityDetails.price5),
      ].filter((p) => p > 0);
      return prices.length > 0 ? Math.min(...prices) : 0;
    };

    const sortedHostels = [...hostels].sort((a, b) => {
      // Primary: sponsored hostels first
      if (a.isSponsored && !b.isSponsored) return -1;
      if (!a.isSponsored && b.isSponsored) return 1;

      // Secondary: user-selected sort
      switch (sortOption) {
        case 'price-asc':
          return getMinPrice(a) - getMinPrice(b);
        case 'price-desc':
          return getMinPrice(b) - getMinPrice(a);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'location-asc':
          return a.address.localeCompare(b.address);
        default:
          return 0;
      }
    });

    return sortedHostels;
  }, [
    allHostels,
    girlsHostels,
    boysHostels,
    coLivingHostels,
    selectedCategory,
    searchQuery,
    priceRange,
    selectedSharingTypes,
    sortOption,
  ]);

  const isLoading = isLoadingAll || isLoadingGirls || isLoadingBoys || isLoadingCoLiving;

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearAllFilters = () => {
    setPriceRange({ min: 0, max: 20000 });
    setSelectedSharingTypes([]);
  };

  const headingLabel =
    selectedCategory === 'All'
      ? 'All Hostels'
      : selectedCategory === 'Girls'
      ? 'Girls Hostels'
      : selectedCategory === 'Boys'
      ? 'Boys Hostels'
      : 'Co-Living Hostels';

  // Build hostel grid items with inline ads after every AD_INTERVAL cards
  const gridItems = useMemo(() => {
    const items: Array<{ type: 'hostel'; hostel: Hostel } | { type: 'ad'; key: string }> = [];
    filteredAndSortedHostels.forEach((hostel, index) => {
      items.push({ type: 'hostel', hostel });
      if ((index + 1) % AD_INTERVAL === 0 && index < filteredAndSortedHostels.length - 1) {
        items.push({ type: 'ad', key: `ad-${index}` });
      }
    });
    return items;
  }, [filteredAndSortedHostels]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/hero-banner.dim_1200x400.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-warm-primary/90 to-warm-accent/80" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Your Perfect Hostel
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mb-8">
            Discover comfortable, affordable hostels for girls, boys, and co-living spaces in Hyderabad
          </p>
        </div>
      </section>

      {/* SEO Info Banner */}
      <section className="container mx-auto px-4 mt-6">
        <SeoInfoBanner />
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 -mt-2 relative z-10">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-4 mt-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClearSearch}
        />
      </section>

      {/* Advanced Filters */}
      <section className="container mx-auto px-4 mt-6">
        <AdvancedFilters
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          selectedSharingTypes={selectedSharingTypes}
          onSharingTypesChange={setSelectedSharingTypes}
          onClearAll={handleClearAllFilters}
        />
      </section>

      {/* Ad Banner — between filters and hostel grid (desktop: leaderboard, mobile: rectangle) */}
      <section className="container mx-auto px-4 mt-8 flex justify-center">
        {/* Desktop/tablet leaderboard */}
        <div className="hidden sm:flex justify-center w-full">
          <AdBanner size="leaderboard" adSlotId="home-leaderboard-top" />
        </div>
        {/* Mobile rectangle */}
        <div className="flex sm:hidden justify-center w-full">
          <AdBanner size="rectangle" adSlotId="home-rectangle-mobile-top" />
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 mt-12">
        <div className="bg-white dark:bg-card rounded-2xl shadow-lg overflow-hidden border border-warm-border">
          <div className="p-6 border-b border-warm-border">
            <h2 className="text-2xl font-bold text-foreground">Explore Locations</h2>
            <p className="text-muted-foreground mt-1">
              View all hostels on the map — hover over a marker to see details
            </p>
          </div>
          <div className="h-[500px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-warm-primary" />
              </div>
            ) : (
              <HostelMap hostels={filteredAndSortedHostels} />
            )}
          </div>
        </div>
      </section>

      {/* Hostel Grid with inline ads */}
      <section className="container mx-auto px-4 mt-12 mb-16">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{headingLabel}</h2>
            <p className="text-muted-foreground">
              {filteredAndSortedHostels.length}{' '}
              {filteredAndSortedHostels.length === 1 ? 'hostel' : 'hostels'} available
            </p>
          </div>
          <SortControls currentSort={sortOption} onSortChange={setSortOption} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-warm-primary" />
          </div>
        ) : filteredAndSortedHostels.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No hostels found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridItems.map((item) => {
              if (item.type === 'hostel') {
                return (
                  <HostelCard key={item.hostel.id.toString()} hostel={item.hostel} />
                );
              }
              // Ad item — spans full width on all breakpoints
              return (
                <div key={item.key} className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-2">
                  <AdBanner size="rectangle" adSlotId={`home-inline-${item.key}`} />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
