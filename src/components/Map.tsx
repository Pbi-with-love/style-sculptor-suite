
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { environmentalData, environmentalRankings } from '../data/environmentalData';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Sample data for points of interest
const placesData = {
  parks: [
    { name: "Central Park", lat: 40.7812, lng: -73.9665, type: "park", attributes: { quiet: true, outdoor: true, nature: true } },
    { name: "Washington Square Park", lat: 40.7308, lng: -73.9973, type: "park", attributes: { outdoor: true, nature: true, busy: true } },
    { name: "Bryant Park", lat: 40.7536, lng: -73.9832, type: "park", attributes: { outdoor: true, nature: true } }
  ],
  libraries: [
    { name: "New York Public Library", lat: 40.7532, lng: -73.9822, type: "library", attributes: { quiet: true, indoor: true } },
    { name: "Brooklyn Public Library", lat: 40.6726, lng: -73.9684, type: "library", attributes: { quiet: true, indoor: true } }
  ],
  cafes: [
    { name: "Starbucks - Times Square", lat: 40.7580, lng: -73.9855, type: "cafe", attributes: { indoor: true, busy: true } },
    { name: "Blue Bottle Coffee", lat: 40.7195, lng: -74.0027, type: "cafe", attributes: { indoor: true, coffee: true } },
    { name: "Quiet Corner Café", lat: 40.7410, lng: -73.9897, type: "cafe", attributes: { quiet: true, indoor: true, coffee: true } }
  ],
  museums: [
    { name: "Metropolitan Museum of Art", lat: 40.7794, lng: -73.9632, type: "museum", attributes: { indoor: true, culture: true } },
    { name: "Museum of Modern Art", lat: 40.7614, lng: -73.9776, type: "museum", attributes: { indoor: true, culture: true } }
  ]
};

// Fix Leaflet default icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to adjust map view when props change
function MapController({ center, zoom, places }: { center?: [number, number], zoom?: number, places?: any[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    } else if (places && places.length > 0) {
      // Create bounds and fit map to all places
      const bounds = L.latLngBounds(places.map(place => [place.lat, place.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, center, zoom, places]);
  
  return null;
}

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
  const [selectedMetric, setSelectedMetric] = useState<string>('noiseLevel');
  const [view, setView] = useState<'properties' | 'environmental'>('properties');
  const [filteredPlaces, setFilteredPlaces] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]);
  const [mapZoom, setMapZoom] = useState(13);
  
  // Handle selection of environmental metric
  const handleMetricChange = (value: string) => {
    setSelectedMetric(value);
    setView('environmental');
    
    if (onEnvironmentalFilterChange) {
      // Default to showing low values (which is generally better for most metrics)
      const ranking = environmentalRankings.find(r => r.type === value);
      onEnvironmentalFilterChange(value, ranking?.isHigherBetter ? 'high' : 'low');
    }
    
    // Filter environmental data based on selected metric
    const filteredData = environmentalData.filter(area => {
      const metricKey = value as keyof typeof area;
      const metricValue = area[metricKey] as number;
      const ranking = environmentalRankings.find(r => r.type === value);
      
      // Consider "good" places based on whether higher is better for this metric
      if (ranking?.isHigherBetter) {
        return metricValue >= 7; // Arbitrary threshold for "good"
      } else {
        return metricValue <= 4; // Arbitrary threshold for "good" when lower is better
      }
    });
    
    setFilteredPlaces(filteredData.map(area => ({
      name: area.name,
      lat: area.lat,
      lng: area.lng,
      type: 'area',
      attributes: { [value]: area[value as keyof typeof area] }
    })));
  };

  // Find quiet places for chatbot interaction
  const findQuietPlaces = () => {
    let quietPlaces: any[] = [];
    
    // Get places from environmental data with low noise levels
    quietPlaces = environmentalData
      .filter(area => (area.noiseLevel as number) <= 4)
      .map(area => ({
        name: area.name,
        lat: area.lat,
        lng: area.lng,
        type: 'quiet area',
        attributes: { noiseLevel: area.noiseLevel }
      }));
    
    setFilteredPlaces(quietPlaces);
    setSelectedMetric('noiseLevel');
    setView('environmental');
    
    // Return the first quiet place for the chatbot to focus on
    if (quietPlaces.length > 0) {
      return quietPlaces[0];
    }
    return null;
  };

  // Switch between property markers and environmental data view
  const toggleView = () => {
    setView(prev => {
      const newView = prev === 'properties' ? 'environmental' : 'properties';
      
      if (newView === 'properties') {
        setFilteredPlaces([]);
      } else {
        // Show environmental data based on selected metric
        handleMetricChange(selectedMetric);
      }
      
      return newView;
    });
  };

  // Effect to handle highlighted location from chatbot
  useEffect(() => {
    if (highlightedLocation) {
      setMapCenter([highlightedLocation.lat, highlightedLocation.lng]);
      setMapZoom(14);
    }
  }, [highlightedLocation]);
  
  // When locations prop changes, reset filtered places
  useEffect(() => {
    if (view === 'properties' && locations.length > 0) {
      setFilteredPlaces([]);
    }
  }, [locations, view]);

  // Make findQuietPlaces available to parent components (like chatbot)
  useEffect(() => {
    // Adding to window for chat interaction
    window.findQuietPlaces = findQuietPlaces;
    
    return () => {
      // Clean up when component unmounts
      delete window.findQuietPlaces;
    };
  }, []);

  return (
    <Card className="w-full h-full min-h-[400px] relative overflow-hidden">
      {/* Map toolbar */}
      <div className="absolute top-2 left-2 right-2 z-[1000] flex justify-between items-center gap-2 p-2 bg-background/90 backdrop-blur-sm rounded-lg">
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
      
      {/* Leaflet Map */}
      <div className="h-full w-full">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController 
            center={mapCenter} 
            zoom={mapZoom} 
            places={filteredPlaces.length > 0 ? filteredPlaces : undefined}
          />
          
          {/* Show property markers */}
          {view === 'properties' && locations.map((location) => (
            <Marker 
              key={location.id} 
              position={[location.lat, location.lng]}
              eventHandlers={{
                click: () => {
                  if (onMapClick) {
                    onMapClick({ lat: location.lat, lng: location.lng });
                  }
                }
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-medium">{location.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Show environmental data points */}
          {view === 'environmental' && filteredPlaces.map((place, index) => (
            <Marker 
              key={`${place.name}-${index}`} 
              position={[place.lat, place.lng]}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-medium">{place.name}</h3>
                  <p className="text-xs">Type: {place.type}</p>
                  <p className="text-xs">
                    {Object.entries(place.attributes).map(([key, value]) => (
                      <span key={key}>{key}: {String(value)}</span>
                    ))}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};

export default Map;
