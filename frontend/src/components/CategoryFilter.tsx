import { Button } from '@/components/ui/button';
import { Users, UserCircle, Home } from 'lucide-react';

export type CategoryValue = 'All' | 'Girls' | 'Boys' | 'Co-Living';

interface CategoryFilterProps {
  selectedCategory: CategoryValue;
  onCategoryChange: (category: CategoryValue) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: { value: CategoryValue; label: string; icon: React.ElementType }[] = [
    { value: 'All', label: 'All Hostels', icon: Home },
    { value: 'Girls', label: 'Girls Only', icon: UserCircle },
    { value: 'Boys', label: 'Boys Only', icon: UserCircle },
    { value: 'Co-Living', label: 'Co-Living', icon: Users },
  ];

  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-6 border border-warm-border">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.value;

          return (
            <Button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              variant={isSelected ? 'default' : 'outline'}
              size="lg"
              className={`gap-2 transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-warm-primary to-warm-accent text-white shadow-lg scale-105'
                  : 'hover:border-warm-primary hover:text-warm-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              {category.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
