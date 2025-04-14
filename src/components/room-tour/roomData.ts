
import { RoomData } from './types';

// Mock data for 3D visualization
export const roomData: RoomData = {
  propertyName: "Modern Downtown Apartment",
  rooms: [
    { id: "living", name: "Living Room", size: "24 x 18 ft" },
    { id: "kitchen", name: "Kitchen", size: "16 x 14 ft" },
    { id: "bedroom1", name: "Master Bedroom", size: "18 x 16 ft" },
    { id: "bedroom2", name: "Guest Bedroom", size: "14 x 12 ft" },
    { id: "bathroom", name: "Bathroom", size: "10 x 8 ft" }
  ],
  environmentalData: {
    noiseLevel: 6.3,
    crimeRate: 4.2, 
    pollution: 5.1,
    greenSpaceAccess: 7.8,
    schoolQuality: 8.2
  },
  demographics: {
    totalPopulation: 12850,
    ageGroups: [
      { name: "0-18", percentage: 18 },
      { name: "19-35", percentage: 42 },
      { name: "36-65", percentage: 28 },
      { name: "65+", percentage: 12 }
    ],
    incomeLevel: "Above Average",
    educationLevel: "College Degree or Higher: 68%"
  },
  amenities: {
    hospitals: [
      { name: "City General Hospital", distance: "1.2 miles" },
      { name: "University Medical Center", distance: "2.4 miles" }
    ],
    schools: [
      { name: "Downtown Elementary", rating: "8/10", distance: "0.7 miles" },
      { name: "Central High School", rating: "9/10", distance: "1.1 miles" }
    ],
    parks: [
      { name: "Riverside Park", size: "24 acres", distance: "0.4 miles" },
      { name: "Memorial Gardens", size: "12 acres", distance: "1.5 miles" }
    ],
    shopping: [
      { name: "City Center Mall", distance: "0.3 miles" },
      { name: "Fresh Market Grocery", distance: "0.5 miles" }
    ]
  },
  futurePredictions: {
    environmentalTrends: [
      { year: 2025, airQuality: 7.4, greenSpace: 8.1, noiseLevel: 5.9 },
      { year: 2030, airQuality: 8.2, greenSpace: 8.5, noiseLevel: 5.2 },
      { year: 2035, airQuality: 8.7, greenSpace: 9.0, noiseLevel: 4.8 }
    ],
    populationTrends: [
      { year: 2025, population: 13500, medianAge: 34 },
      { year: 2030, population: 14200, medianAge: 36 },
      { year: 2035, population: 15000, medianAge: 38 }
    ],
    propertyValueTrends: [
      { year: 2025, estimatedValue: "$450,000", changePercent: "+4.2%" },
      { year: 2030, estimatedValue: "$520,000", changePercent: "+15.5%" },
      { year: 2035, estimatedValue: "$590,000", changePercent: "+13.5%" }
    ]
  }
};
