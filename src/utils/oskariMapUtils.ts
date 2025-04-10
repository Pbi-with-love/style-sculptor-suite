
/**
 * Utility functions for working with the Oskari map API from Tampere maps service
 * Documentation: https://oskari.org/documentation
 */

// Create a communication channel with the Oskari iframe
export const createOskariChannel = (iframe: HTMLIFrameElement): any => {
  if (!window.Channel || !iframe.contentWindow) {
    console.error('Channel not available or iframe not ready');
    return null;
  }
  
  const channel = new window.Channel('tampere-map');
  channel.connect(iframe.contentWindow, '*');
  return channel;
};

// Add markers to the Oskari map
export const addMarkersToOskari = (
  channel: any, 
  locations: Array<{ lat: number; lng: number; title: string }>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!channel) {
      reject(new Error('Channel not available'));
      return;
    }
    
    const markers = locations.map(location => ({
      x: location.lng,
      y: location.lat,
      color: '#FF5000',
      msg: location.title,
      shape: 1, // 0 = dot, 1 = cross
      size: 3
    }));
    
    channel.send('map.addMarkers', { markers }, () => {
      resolve();
    });
  });
};

// Center the Oskari map on a location
export const centerOskariMap = (
  channel: any,
  location: { lat: number; lng: number },
  zoom: number = 10
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!channel) {
      reject(new Error('Channel not available'));
      return;
    }
    
    channel.send('map.centerMapByCoordinates', {
      x: location.lng,
      y: location.lat,
      zoom: zoom
    }, () => {
      resolve();
    });
  });
};

// Convert Tampere coordinates to standard WGS84 coordinates (if needed)
export const convertTampereToWGS84 = (tampereLng: number, tampereLat: number) => {
  // Tampere maps might use EPSG:3067 (ETRS-TM35FIN)
  // This is a placeholder - proper conversion would require a projection library
  // like proj4js if the coordinates are in a different system
  return {
    lat: tampereLat,
    lng: tampereLng
  };
};
