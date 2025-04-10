
import Map from './Map';
import OskariMap from './OskariMap';

interface Location {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface PropertyMapContainerProps {
  mapType: 'leaflet' | 'oskari';
  locations: Location[];
  onEnvironmentalFilterChange?: (type: string, value: 'low' | 'high') => void;
  onMapClick: (location: { lat: number; lng: number }) => void;
  highlightedLocation: { lat: number; lng: number } | null;
}

const PropertyMapContainer = ({
  mapType,
  locations,
  onEnvironmentalFilterChange,
  onMapClick,
  highlightedLocation
}: PropertyMapContainerProps) => {
  return (
    <div className="h-[70vh]">
      {mapType === 'leaflet' ? (
        <Map 
          locations={locations} 
          onEnvironmentalFilterChange={onEnvironmentalFilterChange}
          onMapClick={onMapClick}
          highlightedLocation={highlightedLocation}
        />
      ) : (
        <OskariMap 
          locations={locations}
          onMapClick={onMapClick}
          highlightedLocation={highlightedLocation}
        />
      )}
    </div>
  );
};

export default PropertyMapContainer;
