
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, BarChart3, Users, MapPin } from 'lucide-react';

interface CanvasControlsProps {
  showData: boolean;
  setShowData: (show: boolean) => void;
  dataCategory: string;
  setDataCategory: (category: string) => void;
  showFuturePredictions: boolean;
  setShowFuturePredictions: (show: boolean) => void;
}

const CanvasControls = ({ 
  showData, 
  setShowData, 
  dataCategory, 
  setDataCategory,
  showFuturePredictions,
  setShowFuturePredictions
}: CanvasControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowFuturePredictions(!showFuturePredictions)}
        className="flex items-center gap-1"
      >
        {showFuturePredictions ? "Exit Future View" : "Future Predictions"}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowData(!showData)}
        className="flex items-center gap-1"
      >
        {showData ? <EyeOff size={16} /> : <Eye size={16} />}
        {showData ? 'Hide Data' : 'Show Data'}
      </Button>
      
      {showData && !showFuturePredictions && (
        <div className="flex gap-1">
          <Badge
            variant={dataCategory === 'environmental' ? 'default' : 'outline'}
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setDataCategory('environmental')}
          >
            <BarChart3 size={14} />
            Environmental
          </Badge>
          <Badge
            variant={dataCategory === 'demographics' ? 'default' : 'outline'}
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setDataCategory('demographics')}
          >
            <Users size={14} />
            Demographics
          </Badge>
          <Badge
            variant={dataCategory === 'amenities' ? 'default' : 'outline'}
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setDataCategory('amenities')}
          >
            <MapPin size={14} />
            Amenities
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CanvasControls;
