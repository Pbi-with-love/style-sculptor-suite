
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { environmentalRankings } from '../data/environmentalData';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface EnvironmentalFilter {
  type: string;
  value: 'low' | 'high';
}

interface EnvironmentalFiltersProps {
  filters: EnvironmentalFilter[];
  onClearFilters: () => void;
  onFilterChange?: (type: string, value: 'low' | 'high') => void;
}

const EnvironmentalFilters = ({ 
  filters, 
  onClearFilters,
  onFilterChange
}: EnvironmentalFiltersProps) => {
  // Find available criteria that aren't already filtered
  const availableCriteria = environmentalRankings.filter(
    ranking => !filters.some(filter => filter.type === ranking.type)
  ).slice(0, 5); // Limit to 5 options to prevent UI clutter

  const handleFilterSelect = (type: string, value: 'low' | 'high') => {
    if (onFilterChange) {
      onFilterChange(type, value);
    }
  };

  return (
    <div className="space-y-4">
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-sm font-medium mr-2">Active Filters:</p>
          {filters.map((filter) => {
            const ranking = environmentalRankings.find(r => r.type === filter.type);
            return (
              <Badge key={filter.type} variant="secondary" className="flex items-center gap-1">
                {ranking?.label}: {filter.value === 'low' ? 'Low' : 'High'}
                <button 
                  className="ml-1 text-xs opacity-70 hover:opacity-100"
                  onClick={() => {
                    const newFilters = filters.filter(f => f.type !== filter.type);
                    if (onFilterChange) {
                      // Remove this filter by applying all remaining filters
                      newFilters.forEach(f => onFilterChange(f.type, f.value));
                      if (newFilters.length === 0) {
                        onClearFilters();
                      }
                    }
                  }}
                >
                  ✕
                </button>
              </Badge>
            );
          })}
          {filters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-xs h-7"
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Show available criteria to filter by */}
      {availableCriteria.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Add filters:</p>
          <div className="flex flex-wrap gap-3">
            {availableCriteria.map((criterion) => (
              <div key={criterion.type} className="space-y-1">
                <p className="text-xs font-medium">{criterion.label}</p>
                <ToggleGroup type="single" size="sm" variant="outline">
                  <ToggleGroupItem 
                    value="low" 
                    onClick={() => handleFilterSelect(criterion.type, 'low')}
                    className="text-xs h-7"
                  >
                    {criterion.isHigherBetter ? criterion.low : criterion.low}
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="high" 
                    onClick={() => handleFilterSelect(criterion.type, 'high')}
                    className="text-xs h-7"
                  >
                    {criterion.isHigherBetter ? criterion.high : criterion.high}
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalFilters;
