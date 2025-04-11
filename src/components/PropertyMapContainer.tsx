
import CustomMap from './CustomMap';
import { useState } from 'react';

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
  const [activeLayer, setActiveLayer] = useState<string>('noiseLevel');
  
  // Handle layer change in the container and pass to CustomMap
  const handleLayerChange = (layerType: string) => {
    setActiveLayer(layerType);
    
    if (onEnvironmentalFilterChange) {
      const isHigherBetter = ['greenSpaceAccess', 'schoolQuality'].includes(layerType);
      onEnvironmentalFilterChange(layerType, isHigherBetter ? 'high' : 'low');
    }
  };

  return (
    <div className="h-[70vh] relative rounded-lg overflow-hidden border border-gray-200 shadow-md">
      <CustomMap 
        locations={locations} 
        onEnvironmentalFilterChange={onEnvironmentalFilterChange}
        onMapClick={onMapClick}
        highlightedLocation={highlightedLocation}
        activeLayer={activeLayer}
        onLayerChange={handleLayerChange}
      />
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 p-2 rounded-md shadow text-xs">
        <p className="font-semibold">Map Data Visualization</p>
        <p>Yellow areas indicate high values for the selected metric</p>
      </div>
    </div>
  );
};

export default PropertyMapContainer;
