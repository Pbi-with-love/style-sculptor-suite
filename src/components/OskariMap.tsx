
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Location {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface OskariMapProps {
  locations?: Location[];
  onMapClick?: (location: { lat: number; lng: number }) => void;
  highlightedLocation?: { lat: number; lng: number } | null;
  className?: string;
}

const OskariMap = ({
  locations = [],
  onMapClick,
  highlightedLocation,
  className = ''
}: OskariMapProps) => {
  const mapContainer = useRef<HTMLIFrameElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const channel = useRef<any>(null);

  useEffect(() => {
    // Initialize the Oskari map
    if (!mapContainer.current) return;

    const iframe = mapContainer.current;
    iframe.onload = () => {
      // Create a channel for communication with the Oskari map
      if (window.Channel && iframe.contentWindow) {
        channel.current = new window.Channel('tampere-map');
        channel.current.connect(iframe.contentWindow, '*');
        
        // Send a message to get the Oskari map ready for external control
        channel.current.send('init', {}, (data: any) => {
          console.log('Oskari map initialized:', data);
          setMapReady(true);
        });
      }
    };

    // Cleanup on unmount
    return () => {
      if (channel.current) {
        channel.current.disconnect();
      }
    };
  }, []);

  // Add markers for locations when map is ready
  useEffect(() => {
    if (mapReady && channel.current && locations.length > 0) {
      // Convert locations to Oskari markers
      const markers = locations.map(location => ({
        x: location.lng,
        y: location.lat,
        color: '#FF5000',
        msg: location.title,
        shape: 1, // 0 = dot, 1 = cross
        size: 3
      }));

      // Send markers to Oskari map
      channel.current.send('map.addMarkers', { markers }, () => {
        console.log('Markers added to Oskari map');
      });
    }
  }, [mapReady, locations]);

  // Handle highlighted location
  useEffect(() => {
    if (mapReady && channel.current && highlightedLocation) {
      // Center the map on the highlighted location
      channel.current.send('map.centerMapByCoordinates', {
        x: highlightedLocation.lng,
        y: highlightedLocation.lat,
        zoom: 10
      }, () => {
        console.log('Centered map on highlighted location');
      });
    }
  }, [mapReady, highlightedLocation]);

  // Handle map click
  useEffect(() => {
    if (mapReady && channel.current && onMapClick) {
      // Set up event listener for map click
      channel.current.handleEvent('map.clicked', (data: any) => {
        if (data && data.lat && data.lon) {
          onMapClick({
            lat: data.lat,
            lng: data.lon
          });
        }
      });
    }
  }, [mapReady, onMapClick]);

  return (
    <Card className={`w-full h-full min-h-[400px] relative overflow-hidden ${className}`}>
      <iframe
        ref={mapContainer}
        src="https://kartat.tampere.fi/oskari/published/063ce05f-28d1-44ce-9297-73fa9fb0e86d"
        className="w-full h-full border-0"
        title="Tampere Oskari Map"
        allow="geolocation"
      />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center">
            <p className="mb-2">Loading Tampere Map...</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload if map doesn't appear
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OskariMap;
