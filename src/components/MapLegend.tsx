
import { environmentalRankings } from '../data/environmentalData';
import { Badge } from '@/components/ui/badge';

interface MapLegendProps {
  selectedMetric: string;
  className?: string;
}

const MapLegend = ({ selectedMetric, className = '' }: MapLegendProps) => {
  const currentRanking = environmentalRankings.find(r => r.type === selectedMetric);
  
  if (!currentRanking) return null;
  
  const getColorForLevel = (isHigh: boolean) => {
    // If higher is better, then high = good (green), low = bad (red)
    // If lower is better, then low = good (green), high = bad (red)
    if (currentRanking.isHigherBetter) {
      return isHigh ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
    } else {
      return isHigh ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-md p-3 shadow-sm ${className}`}>
      <div className="text-sm font-medium mb-2">{currentRanking.label} Legend</div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getColorForLevel(true)}>
            {currentRanking.high}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {currentRanking.isHigherBetter ? 'Better' : 'Worse'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getColorForLevel(false)}>
            {currentRanking.low}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {currentRanking.isHigherBetter ? 'Worse' : 'Better'}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        {currentRanking.description}
      </div>
    </div>
  );
};

export default MapLegend;
