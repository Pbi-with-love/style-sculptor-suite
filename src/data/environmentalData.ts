
export interface EnvironmentalDataPoint {
  id: string;
  lat: number;
  lng: number;
  name: string;
  crimeRate: number; // 0-10 scale, 0 being lowest
  noiseLevel: number; // 0-10 scale, 0 being lowest
  pollution: number; // 0-10 scale, 0 being lowest
  trafficCongestion: number; // 0-10 scale, 0 being lowest
  greenSpaceAccess: number; // 0-10 scale, 10 being highest (best)
  schoolQuality: number; // 0-10 scale, 10 being highest (best)
  // New criteria
  averagePrice: number; // Average property price in thousands ($)
  bedroomsAverage: number; // Average number of bedrooms in properties
  safetyRating: number; // 0-10 scale, 10 being highest (safest)
  publicTransport: number; // 0-10 scale, 10 being highest (best access)
  amenitiesAccess: number; // 0-10 scale, 10 being highest (best access)
}

// Mock environmental data for different areas
export const environmentalData: EnvironmentalDataPoint[] = [
  {
    id: "e1",
    lat: 40.7128,
    lng: -74.0060,
    name: "Downtown",
    crimeRate: 6.5,
    noiseLevel: 8.2,
    pollution: 7.4,
    trafficCongestion: 8.9,
    greenSpaceAccess: 4.2,
    schoolQuality: 6.8,
    averagePrice: 850,
    bedroomsAverage: 2.1,
    safetyRating: 5.5,
    publicTransport: 9.2,
    amenitiesAccess: 9.0
  },
  {
    id: "e2",
    lat: 40.7282,
    lng: -74.0776,
    name: "Riverside",
    crimeRate: 3.2,
    noiseLevel: 5.1,
    pollution: 4.3,
    trafficCongestion: 5.8,
    greenSpaceAccess: 7.9,
    schoolQuality: 8.2,
    averagePrice: 720,
    bedroomsAverage: 3.2,
    safetyRating: 7.8,
    publicTransport: 7.5,
    amenitiesAccess: 7.2
  },
  {
    id: "e3",
    lat: 40.7551,
    lng: -73.9884,
    name: "Midtown",
    crimeRate: 5.7,
    noiseLevel: 7.8,
    pollution: 6.2,
    trafficCongestion: 7.5,
    greenSpaceAccess: 5.1,
    schoolQuality: 7.3,
    averagePrice: 990,
    bedroomsAverage: 2.5,
    safetyRating: 6.3,
    publicTransport: 9.5,
    amenitiesAccess: 9.8
  },
  {
    id: "e4",
    lat: 40.7831,
    lng: -73.9712,
    name: "Uptown",
    crimeRate: 4.3,
    noiseLevel: 6.5,
    pollution: 5.4,
    trafficCongestion: 6.7,
    greenSpaceAccess: 6.2,
    schoolQuality: 7.8,
    averagePrice: 750,
    bedroomsAverage: 3.0,
    safetyRating: 7.2,
    publicTransport: 8.4,
    amenitiesAccess: 8.0
  },
  {
    id: "e5",
    lat: 40.7214,
    lng: -74.0052,
    name: "Westside",
    crimeRate: 2.8,
    noiseLevel: 4.2,
    pollution: 3.6,
    trafficCongestion: 4.9,
    greenSpaceAccess: 8.5,
    schoolQuality: 8.7,
    averagePrice: 680,
    bedroomsAverage: 3.5,
    safetyRating: 8.3,
    publicTransport: 7.0,
    amenitiesAccess: 7.8
  },
  {
    id: "e6",
    lat: 40.7426,
    lng: -73.9540,
    name: "Eastside",
    crimeRate: 3.9,
    noiseLevel: 5.7,
    pollution: 5.1,
    trafficCongestion: 6.3,
    greenSpaceAccess: 6.8,
    schoolQuality: 7.5,
    averagePrice: 710,
    bedroomsAverage: 2.8,
    safetyRating: 7.0,
    publicTransport: 8.7,
    amenitiesAccess: 8.5
  },
  {
    id: "e7",
    lat: 40.6782,
    lng: -73.9442,
    name: "Greenfield",
    crimeRate: 2.1,
    noiseLevel: 3.5,
    pollution: 2.8,
    trafficCongestion: 3.7,
    greenSpaceAccess: 9.2,
    schoolQuality: 9.1,
    averagePrice: 630,
    bedroomsAverage: 3.7,
    safetyRating: 8.8,
    publicTransport: 6.5,
    amenitiesAccess: 6.2
  },
  {
    id: "e8",
    lat: 40.6937,
    lng: -73.9890,
    name: "Harbor Heights",
    crimeRate: 3.5,
    noiseLevel: 4.8,
    pollution: 4.1,
    trafficCongestion: 5.2,
    greenSpaceAccess: 7.3,
    schoolQuality: 8.4,
    averagePrice: 695,
    bedroomsAverage: 3.3,
    safetyRating: 7.5,
    publicTransport: 7.8,
    amenitiesAccess: 7.4
  },
  // New locations
  {
    id: "e9",
    lat: 40.7232,
    lng: -73.9874,
    name: "Tech District",
    crimeRate: 4.8,
    noiseLevel: 7.2,
    pollution: 5.8,
    trafficCongestion: 7.0,
    greenSpaceAccess: 5.4,
    schoolQuality: 8.0,
    averagePrice: 920,
    bedroomsAverage: 2.3,
    safetyRating: 6.8,
    publicTransport: 9.0,
    amenitiesAccess: 9.2
  },
  {
    id: "e10",
    lat: 40.7654,
    lng: -74.0056,
    name: "Arts Quarter",
    crimeRate: 5.2,
    noiseLevel: 6.8,
    pollution: 5.3,
    trafficCongestion: 6.5,
    greenSpaceAccess: 6.0,
    schoolQuality: 7.2,
    averagePrice: 780,
    bedroomsAverage: 2.5,
    safetyRating: 6.5,
    publicTransport: 8.5,
    amenitiesAccess: 8.8
  },
  {
    id: "e11",
    lat: 40.6892,
    lng: -73.9635,
    name: "Garden Hills",
    crimeRate: 2.5,
    noiseLevel: 3.2,
    pollution: 2.7,
    trafficCongestion: 4.0,
    greenSpaceAccess: 9.5,
    schoolQuality: 8.9,
    averagePrice: 655,
    bedroomsAverage: 3.8,
    safetyRating: 8.5,
    publicTransport: 6.2,
    amenitiesAccess: 6.5
  },
  {
    id: "e12",
    lat: 40.7420,
    lng: -74.0310,
    name: "Waterfront",
    crimeRate: 3.6,
    noiseLevel: 5.2,
    pollution: 4.0,
    trafficCongestion: 5.6,
    greenSpaceAccess: 7.8,
    schoolQuality: 7.9,
    averagePrice: 950,
    bedroomsAverage: 2.9,
    safetyRating: 7.2,
    publicTransport: 7.4,
    amenitiesAccess: 8.5
  }
];

export interface EnvironmentalRanking {
  type: 'crimeRate' | 'noiseLevel' | 'pollution' | 'trafficCongestion' | 'greenSpaceAccess' | 'schoolQuality' | 
        'averagePrice' | 'bedroomsAverage' | 'safetyRating' | 'publicTransport' | 'amenitiesAccess';
  label: string;
  description: string;
  high: string;
  low: string;
  isHigherBetter: boolean;
}

export const environmentalRankings: EnvironmentalRanking[] = [
  {
    type: 'crimeRate',
    label: 'Crime Rate',
    description: 'Reported incidents per capita',
    high: 'High crime area',
    low: 'Low crime area',
    isHigherBetter: false
  },
  {
    type: 'noiseLevel',
    label: 'Noise Level',
    description: 'Average ambient noise in decibels',
    high: 'Very noisy',
    low: 'Quiet area',
    isHigherBetter: false
  },
  {
    type: 'pollution',
    label: 'Air Pollution',
    description: 'Air quality index',
    high: 'High pollution',
    low: 'Clean air',
    isHigherBetter: false
  },
  {
    type: 'trafficCongestion',
    label: 'Traffic Congestion',
    description: 'Average traffic density',
    high: 'Heavy traffic',
    low: 'Light traffic',
    isHigherBetter: false
  },
  {
    type: 'greenSpaceAccess',
    label: 'Green Space Access',
    description: 'Proximity to parks and natural areas',
    high: 'Excellent access to green spaces',
    low: 'Limited green spaces',
    isHigherBetter: true
  },
  {
    type: 'schoolQuality',
    label: 'School Quality',
    description: 'Educational institution ratings',
    high: 'Excellent schools',
    low: 'Below average schools',
    isHigherBetter: true
  },
  // New criteria
  {
    type: 'averagePrice',
    label: 'Average Price',
    description: 'Average property price in thousands of dollars',
    high: 'Expensive area',
    low: 'Affordable area',
    isHigherBetter: false
  },
  {
    type: 'bedroomsAverage',
    label: 'Bedroom Count',
    description: 'Average number of bedrooms in properties',
    high: 'Spacious homes',
    low: 'Smaller homes',
    isHigherBetter: true
  },
  {
    type: 'safetyRating',
    label: 'Safety Rating',
    description: 'Overall safety score based on multiple factors',
    high: 'Very safe area',
    low: 'Less safe area',
    isHigherBetter: true
  },
  {
    type: 'publicTransport',
    label: 'Public Transport',
    description: 'Access to public transportation options',
    high: 'Excellent public transport',
    low: 'Limited public transport',
    isHigherBetter: true
  },
  {
    type: 'amenitiesAccess',
    label: 'Amenities Access',
    description: 'Proximity to shops, restaurants, and services',
    high: 'Abundant amenities',
    low: 'Limited amenities',
    isHigherBetter: true
  }
];

// Helper function to find locations with specified environmental criteria
export const findLocationsByEnvironmentalCriteria = (
  criteria: {
    type: keyof Omit<EnvironmentalDataPoint, 'id' | 'lat' | 'lng' | 'name'>;
    value: 'low' | 'high';
  }[]
): EnvironmentalDataPoint[] => {
  if (criteria.length === 0) return environmentalData;

  return environmentalData.filter(location => {
    return criteria.every(criterion => {
      const ranking = environmentalRankings.find(rank => rank.type === criterion.type);
      
      if (!ranking) return true;
      
      const threshold = 5; // Middle value on our 0-10 scale
      
      if (criterion.value === 'low') {
        return ranking.isHigherBetter 
          ? location[criterion.type] <= threshold 
          : location[criterion.type] <= threshold;
      } else { // high
        return ranking.isHigherBetter 
          ? location[criterion.type] > threshold 
          : location[criterion.type] > threshold;
      }
    });
  });
};
