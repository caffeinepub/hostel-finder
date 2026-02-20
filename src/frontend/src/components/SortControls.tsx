import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'location-asc';

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortControls({ currentSort, onSortChange }: SortControlsProps) {
  const sortOptions = [
    { value: 'price-asc' as const, label: 'Price: Low to High' },
    { value: 'price-desc' as const, label: 'Price: High to Low' },
    { value: 'name-asc' as const, label: 'Name: A to Z' },
    { value: 'name-desc' as const, label: 'Name: Z to A' },
    { value: 'location-asc' as const, label: 'Location: A to Z' },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <ArrowUpDown className="w-4 h-4" />
        <span>Sort by:</span>
      </div>
      <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[200px] border-warm-border focus:border-warm-primary focus:ring-warm-primary">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
