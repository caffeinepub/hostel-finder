import { useState, useMemo } from 'react';
import { useGetAllHostels, useGetHostelsByCategory } from '../hooks/useQueries';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import AdvancedFilters from '../components/AdvancedFilters';
import SortControls, { SortOption } from '../components/SortControls';
import HostelGrid from '../components/HostelGrid';
import HostelMap from '../components/HostelMap';
import SeoInfoBanner from '../components/SeoInfoBanner';
import { Category, Hostel } from '../backend';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });
  const [selectedSharingTypes, setSelectedSharingTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  
  const { data: allHostels, isLoading: isLoadingAll } = useGetAllHostels();
  const { data: girlsHostels, isLoading: isLoadingGirls } = useGetHostelsByCategory(Category.girls);
  const { data: boysHostels, isLoading: isLoadingBoys } = useGetHostelsByCategory(Category.boys);
  const { data: coLivingHostels, isLoading: isLoadingCoLiving } = useGetHostelsByCategory(Category.coLiving);

  const getCategoryFilteredHostels = () => {
    switch (selectedCategory) {
      case Category.girls:
        return girlsHostels || [];
      case Category.boys:
        return boysHostels || [];
      case Category.coLiving:
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
          hostel.address.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    hostels = hostels.filter((hostel) => {
      const minPrice = Math.min(
        Number(hostel.roomCapacityDetails.price1),
        Number(hostel.roomCapacityDetails.price2),
        Number(hostel.roomCapacityDetails.price3),
        Number(hostel.roomCapacityDetails.price4)
      );
      return minPrice >= priceRange.min && minPrice <= priceRange.max;
    });

    // Apply sharing type filter
    if (selectedSharingTypes.length > 0) {
      hostels = hostels.filter((hostel) => {
        const hasSelectedSharing = selectedSharingTypes.some((type) => {
          switch (type) {
            case 'single':
              return Number(hostel.roomCapacityDetails.sharing1) > 0;
            case 'double':
              return Number(hostel.roomCapacityDetails.sharing2) > 0;
            case 'triple':
              return Number(hostel.roomCapacityDetails.sharing3) > 0;
            case 'four':
              return Number(hostel.roomCapacityDetails.sharing4) > 0;
            default:
              return false;
          }
        });
        return hasSelectedSharing;
      });
    }

    // Apply sorting
    const sortedHostels = [...hostels].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': {
          const minPriceA = Math.min(
            Number(a.roomCapacityDetails.price1),
            Number(a.roomCapacityDetails.price2),
            Number(a.roomCapacityDetails.price3),
            Number(a.roomCapacityDetails.price4)
          );
          const minPriceB = Math.min(
            Number(b.roomCapacityDetails.price1),
            Number(b.roomCapacityDetails.price2),
            Number(b.roomCapacityDetails.price3),
            Number(b.roomCapacityDetails.price4)
          );
          return minPriceA - minPriceB;
        }
        case 'price-desc': {
          const minPriceA = Math.min(
            Number(a.roomCapacityDetails.price1),
            Number(a.roomCapacityDetails.price2),
            Number(a.roomCapacityDetails.price3),
            Number(a.roomCapacityDetails.price4)
          );
          const minPriceB = Math.min(
            Number(b.roomCapacityDetails.price1),
            Number(b.roomCapacityDetails.price2),
            Number(b.roomCapacityDetails.price3),
            Number(b.roomCapacityDetails.price4)
          );
          return minPriceB - minPriceA;
        }
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
            Discover comfortable, affordable hostels for girls, boys, and co-living spaces
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

      {/* Map Section */}
      <section className="container mx-auto px-4 mt-12">
        <div className="bg-white dark:bg-card rounded-2xl shadow-lg overflow-hidden border border-warm-border">
          <div className="p-6 border-b border-warm-border">
            <h2 className="text-2xl font-bold text-foreground">Explore Locations</h2>
            <p className="text-muted-foreground mt-1">
              View all hostels on the map and find the perfect location for you
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

      {/* Hostel Grid */}
      <section className="container mx-auto px-4 mt-12 mb-16">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {selectedCategory === 'all' ? 'All Hostels' : `${selectedCategory === Category.girls ? 'Girls' : selectedCategory === Category.boys ? 'Boys' : 'Co-Living'} Hostels`}
            </h2>
            <p className="text-muted-foreground">
              {filteredAndSortedHostels.length} {filteredAndSortedHostels.length === 1 ? 'hostel' : 'hostels'} available
            </p>
          </div>
          <SortControls currentSort={sortOption} onSortChange={setSortOption} />
        </div>
        <HostelGrid hostels={filteredAndSortedHostels} isLoading={isLoading} />
      </section>
    </div>
  );
}
