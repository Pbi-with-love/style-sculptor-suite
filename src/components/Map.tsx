
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { environmentalData, environmentalRankings, EnvironmentalRanking } from '../data/environmentalData';

interface Location {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface MapProps {
  locations?: Location[];
  onMapClick?: (location: { lat: number; lng: number }) => void;
  onEnvironmentalFilterChange?: (type: string, value: 'low' | 'high') => void;
  highlightedLocation?: { lat: number; lng: number } | null;
}

const Map = ({ 
  locations = [], 
  onMapClick, 
  onEnvironmentalFilterChange,
  highlightedLocation 
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>('noiseLevel');
  const [view, setView] = useState<'properties' | 'environmental'>('properties');
  
  // For simplicity, we'll fake the map interaction with this state
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });

  // Handle selection of environmental metric
  const handleMetricChange = (value: string) => {
    setSelectedMetric(value);
    setView('environmental');
    
    if (onEnvironmentalFilterChange) {
      // Default to showing low values (which is generally better for most metrics)
      const ranking = environmentalRankings.find(r => r.type === value);
      onEnvironmentalFilterChange(value, ranking?.isHigherBetter ? 'high' : 'low');
    }
  };

  // Switch between property markers and environmental data view
  const toggleView = () => {
    setView(prev => prev === 'properties' ? 'environmental' : 'properties');
  };

  // Simulate clicking on a specific location on the map
  const handleMapAreaClick = (area: any) => {
    if (onMapClick) {
      onMapClick({ lat: area.lat, lng: area.lng });
    }
    
    // Simulate zooming to that location
    setMapCenter({ lat: area.lat, lng: area.lng });
    setZoomLevel(14);
  };

  // Effect to handle highlighted location from chatbot
  useEffect(() => {
    if (highlightedLocation) {
      setMapCenter({ 
        lat: highlightedLocation.lat, 
        lng: highlightedLocation.lng 
      });
      setZoomLevel(14);
    }
  }, [highlightedLocation]);

  // Get a color based on the value for the selected metric
  const getColorForValue = (value: number, isHigherBetter: boolean) => {
    // Scale is from 0-10, transform to 0-100%
    const percentage = value * 10;
    
    if (isHigherBetter) {
      // Green (good) to red (bad)
      if (percentage >= 70) return 'bg-green-500';
      if (percentage >= 50) return 'bg-green-300';
      if (percentage >= 30) return 'bg-yellow-400';
      return 'bg-red-500';
    } else {
      // Red (bad) to green (good)
      if (percentage >= 70) return 'bg-red-500';
      if (percentage >= 50) return 'bg-orange-400';
      if (percentage >= 30) return 'bg-yellow-400';
      return 'bg-green-500';
    }
  };

  // Get the appropriate rating text
  const getRatingText = (value: number, isHigherBetter: boolean) => {
    if (isHigherBetter) {
      if (value >= 7) return 'Excellent';
      if (value >= 5) return 'Good';
      if (value >= 3) return 'Average';
      return 'Poor';
    } else {
      if (value >= 7) return 'Poor';
      if (value >= 5) return 'Average';
      if (value >= 3) return 'Good';
      return 'Excellent';
    }
  };

  return (
    <Card className="w-full h-full min-h-[400px] relative overflow-hidden">
      {/* Map toolbar */}
      <div className="absolute top-2 left-2 right-2 z-10 flex justify-between items-center gap-2 p-2 bg-background/90 backdrop-blur-sm rounded-lg">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleView}
        >
          {view === 'properties' ? 'Show Environmental Data' : 'Show Properties'}
        </Button>
        
        <Select value={selectedMetric} onValueChange={handleMetricChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            {environmentalRankings.map((ranking) => (
              <SelectItem key={ranking.type} value={ranking.type}>
                {ranking.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Map visualization (mock) */}
      <div ref={mapRef} className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-start pt-16">
        {view === 'properties' ? (
          <>
            <h3 className="text-lg font-medium mb-4">Property Locations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 max-h-[calc(100%-2rem)] overflow-y-auto w-full">
              {locations.length > 0 ? locations.map((location) => (
                <div 
                  key={location.id}
                  className="p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-blue-50 transition-colors"
                  onClick={() => handleMapAreaClick(location)}
                >
                  <p className="font-medium">{location.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                  </p>
                </div>
              )) : (
                <p className="col-span-full text-center p-4">No property locations to display</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Environmental Data View */}
            <h3 className="text-lg font-medium mb-2">
              {environmentalRankings.find(r => r.type === selectedMetric)?.label || 'Environmental Data'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {environmentalRankings.find(r => r.type === selectedMetric)?.description || 'Select a metric to view data'}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-h-[calc(100%-5rem)] overflow-y-auto w-full">
              {environmentalData.map((area) => {
                const metricKey = selectedMetric as keyof typeof area;
                const value = area[metricKey] as number;
                const ranking = environmentalRankings.find(r => r.type === selectedMetric);
                const isHigherBetter = ranking?.isHigherBetter || false;
                
                return (
                  <div 
                    key={area.id}
                    className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => handleMapAreaClick(area)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{area.name}</h4>
                      <span className={`px-2 py-1 text-xs text-white rounded ${getColorForValue(value, isHigherBetter)}`}>
                        {getRatingText(value, isHigherBetter)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-1">
                      <div 
                        className={`h-2.5 rounded-full ${getColorForValue(value, isHigherBetter)}`} 
                        style={{ width: `${value * 10}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{isHigherBetter ? 'Poor' : 'Good'}</span>
                      <span>{value.toFixed(1)} / 10</span>
                      <span>{isHigherBetter ? 'Good' : 'Poor'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        
        {/* Map zoom level indicator */}
        <div className="absolute bottom-2 right-2 text-xs bg-white px-2 py-1 rounded shadow">
          Zoom: {zoomLevel}x | Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
        </div>
      </div>
    </Card>
  );
};

export default Map;
