
export interface RoomData {
  propertyName: string;
  rooms: {
    id: string;
    name: string;
    size: string;
  }[];
  environmentalData: {
    noiseLevel: number;
    crimeRate: number;
    pollution: number;
    greenSpaceAccess: number;
    schoolQuality: number;
  };
  demographics: {
    totalPopulation: number;
    ageGroups: {
      name: string;
      percentage: number;
    }[];
    incomeLevel: string;
    educationLevel: string;
  };
  amenities: {
    hospitals: {
      name: string;
      distance: string;
    }[];
    schools: {
      name: string;
      rating: string;
      distance: string;
    }[];
    parks: {
      name: string;
      size: string;
      distance: string;
    }[];
    shopping: {
      name: string;
      distance: string;
    }[];
  };
  futurePredictions: {
    environmentalTrends: {
      year: number;
      airQuality: number;
      greenSpace: number;
      noiseLevel: number;
    }[];
    populationTrends: {
      year: number;
      population: number;
      medianAge: number;
    }[];
    propertyValueTrends: {
      year: number;
      estimatedValue: string;
      changePercent: string;
    }[];
  };
}
