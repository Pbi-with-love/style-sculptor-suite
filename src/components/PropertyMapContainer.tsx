
import CustomMap from './CustomMap';

interface Location {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface PropertyMapContainerProps {
  locations: Location[];
  onEnvironmentalFilterChange?: (type: string, value: 'low' | 'high') => void;
  onMapClick: (location: { lat: number; lng: number }) => void;
  highlightedLocation: { lat: number; lng: number } | null;
}

const PropertyMapContainer = ({
  locations,
  onEnvironmentalFilterChange,
  onMapClick,
  highlightedLocation
}: PropertyMapContainerProps) => {
  return (
    <div className="h-[70vh]">
      <CustomMap 
        locations={locations} 
        onEnvironmentalFilterChange={onEnvironmentalFilterChange}
        onMapClick={onMapClick}
        highlightedLocation={highlightedLocation}
      />
    </div>
  );
};

export default PropertyMapContainer;
