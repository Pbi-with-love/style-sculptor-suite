
interface Window {
  findQuietPlaces?: () => {
    name: string;
    lat: number;
    lng: number;
    type: string;
    attributes: {
      noiseLevel: number;
      [key: string]: any;
    };
  } | null;
  
  // Oskari API related global variables
  Oskari?: {
    setLang: (lang: string) => void;
    setMarkers: (markers: any[]) => void;
    getSandbox: () => any;
    bundle: (name: string) => any;
    makeMarker: (lat: number, lon: number, msg?: string) => any;
  };
  Channel?: any;
}

