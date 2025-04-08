
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
    schoolQuality: 6.8
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
    schoolQuality: 8.2
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
    schoolQuality: 7.3
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
    schoolQuality: 7.8
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
    schoolQuality: 8.7
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
    schoolQuality: 7.5
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
    schoolQuality: 9.1
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
    schoolQuality: 8.4
  }
];

export interface EnvironmentalRanking {
  type: 'crimeRate' | 'noiseLevel' | 'pollution' | 'trafficCongestion' | 'greenSpaceAccess' | 'schoolQuality';
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
