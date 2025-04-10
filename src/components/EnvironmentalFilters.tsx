
import { Button } from '@/components/ui/button';

interface EnvironmentalFilter {
  type: string;
  value: 'low' | 'high';
}

interface EnvironmentalFiltersProps {
  filters: EnvironmentalFilter[];
  onClearFilters: () => void;
}

const EnvironmentalFilters = ({ 
  filters, 
  onClearFilters 
}: EnvironmentalFiltersProps) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <p className="text-sm font-medium">Active Filters:</p>
      {filters.map((filter) => (
        <div key={filter.type} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
          {filter.type}: {filter.value === 'low' ? 'Low' : 'High'}
        </div>
      ))}
      <button 
        className="text-xs text-muted-foreground underline"
        onClick={onClearFilters}
      >
        Clear all
      </button>
    </div>
  );
};

export default EnvironmentalFilters;
