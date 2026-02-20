import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface AdvancedFiltersProps {
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  selectedSharingTypes: string[];
  onSharingTypesChange: (types: string[]) => void;
  onClearAll: () => void;
}

export default function AdvancedFilters({
  priceRange,
  onPriceRangeChange,
  selectedSharingTypes,
  onSharingTypesChange,
  onClearAll,
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sharingOptions = [
    { value: 'single', label: 'Single Room' },
    { value: 'double', label: 'Double Sharing' },
    { value: 'triple', label: 'Triple Sharing' },
    { value: 'four', label: 'Four Sharing' },
  ];

  const handleSharingToggle = (value: string) => {
    if (selectedSharingTypes.includes(value)) {
      onSharingTypesChange(selectedSharingTypes.filter((t) => t !== value));
    } else {
      onSharingTypesChange([...selectedSharingTypes, value]);
    }
  };

  const activeFilterCount = 
    (priceRange.min > 0 || priceRange.max < 20000 ? 1 : 0) +
    selectedSharingTypes.length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-white dark:bg-card rounded-xl shadow-md border border-warm-border overflow-hidden">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-4 hover:bg-warm-muted/50"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-warm-primary" />
              <span className="font-semibold text-foreground">Advanced Filters</span>
              {activeFilterCount > 0 && (
                <Badge variant="default" className="bg-warm-accent">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-6 pt-2 space-y-6 border-t border-warm-border">
            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-foreground">Price Range (₹/month)</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-price" className="text-sm text-muted-foreground">
                    Minimum
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    min="0"
                    max={priceRange.max}
                    value={priceRange.min}
                    onChange={(e) =>
                      onPriceRangeChange({
                        ...priceRange,
                        min: Math.max(0, parseInt(e.target.value) || 0),
                      })
                    }
                    className="border-warm-border focus:border-warm-primary focus:ring-warm-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-price" className="text-sm text-muted-foreground">
                    Maximum
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    min={priceRange.min}
                    value={priceRange.max}
                    onChange={(e) =>
                      onPriceRangeChange({
                        ...priceRange,
                        max: Math.max(priceRange.min, parseInt(e.target.value) || 20000),
                      })
                    }
                    className="border-warm-border focus:border-warm-primary focus:ring-warm-primary"
                  />
                </div>
              </div>
            </div>

            {/* Room Sharing Filter */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-foreground">Room Sharing Type</Label>
              <div className="grid grid-cols-2 gap-3">
                {sharingOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={selectedSharingTypes.includes(option.value)}
                      onCheckedChange={() => handleSharingToggle(option.value)}
                      className="border-warm-border data-[state=checked]:bg-warm-primary data-[state=checked]:border-warm-primary"
                    />
                    <Label
                      htmlFor={option.value}
                      className="text-sm font-normal cursor-pointer text-foreground"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear All Button */}
            {activeFilterCount > 0 && (
              <Button
                variant="outline"
                onClick={onClearAll}
                className="w-full gap-2 border-warm-border hover:border-warm-primary hover:text-warm-primary"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </Button>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
