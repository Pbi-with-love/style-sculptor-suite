
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
}
