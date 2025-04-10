
import { Button } from '@/components/ui/button';

interface MapToggleProps {
  mapType: 'leaflet' | 'oskari';
  onToggle: () => void;
}

const MapToggle = ({ mapType, onToggle }: MapToggleProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onToggle}
      className="ml-auto"
    >
      {mapType === 'leaflet' ? 'Switch to Tampere Map' : 'Switch to Standard Map'}
    </Button>
  );
};

export default MapToggle;
