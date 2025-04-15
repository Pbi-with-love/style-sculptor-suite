
import { environmentalRankings } from '../../data/environmentalData';
import { type EnvironmentalPreference } from './types';

// Enhanced property matching data with more details
export const propertyData = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description: "A spacious 3-bedroom apartment with smart home features in the heart of downtown.",
    price: "$520,000",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    address: "123 Main St, Downtown District",
    attributes: {
      budget: "high",
      location: "urban",
      size: "large",
      age: "new",
      community: "diverse",
      education: "high priority",
      environment: "limited green space",
      lifestyle: "entertainment-focused",
      mobility: "public transport dependent",
      technology: "tech-forward",
      crimeRate: "high",
      noiseLevel: "high",
      pollution: "high",
      trafficCongestion: "high",
      greenSpaceAccess: "low",
      schoolQuality: "high",
      bedrooms: "3", // Changed from number to string
      bathrooms: "2", // Changed from number to string
      squareFeet: "1450", // Changed from number to string
      yearBuilt: "2019", // Changed from number to string
      highlights: ["Smart Home", "City View", "Fitness Center", "Doorman"]
    }
  },
  {
    id: "2",
    title: "Suburban Family Home",
    description: "Beautiful 4-bedroom house with a backyard and smart security system in a family-friendly neighborhood.",
    price: "$650,000",
    imageUrl: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    address: "456 Oak Lane, Greenview Heights",
    attributes: {
      budget: "high",
      location: "suburban",
      size: "large",
      age: "new",
      community: "family-oriented",
      education: "high priority",
      environment: "green spaces priority",
      lifestyle: "community-focused",
      mobility: "car dependent",
      technology: "moderate tech",
      crimeRate: "low",
      noiseLevel: "low",
      pollution: "low",
      trafficCongestion: "moderate",
      greenSpaceAccess: "high",
      schoolQuality: "high",
      bedrooms: 4,
      bathrooms: 3.5,
      squareFeet: 2800,
      yearBuilt: 2018,
      highlights: ["Large Backyard", "Smart Security", "Basement", "Garage"]
    }
  },
  {
    id: "3",
    title: "Riverside Condo",
    description: "Modern 2-bedroom condo with river views, close to public transportation and green spaces.",
    price: "$475,000",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    address: "789 River Road, Riverside Community",
    attributes: {
      budget: "moderate",
      location: "urban",
      size: "small to medium",
      age: "established",
      community: "mixed",
      education: "moderate",
      environment: "green spaces priority",
      lifestyle: "balanced",
      mobility: "public transport dependent",
      technology: "basic",
      crimeRate: "low",
      noiseLevel: "moderate",
      pollution: "low",
      trafficCongestion: "moderate",
      greenSpaceAccess: "high",
      schoolQuality: "high",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      yearBuilt: 2015,
      highlights: ["River View", "Balcony", "Community Pool", "Gated"]
    }
  },
  {
    id: "4",
    title: "Smart Urban Loft",
    description: "Fully automated 1-bedroom loft with cutting-edge smart home technology in a tech hub district.",
    price: "$490,000",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    address: "101 Tech Blvd, Innovation District",
    attributes: {
      budget: "moderate",
      location: "urban",
      size: "small to medium",
      age: "new",
      community: "professional",
      education: "moderate",
      environment: "limited green space",
      lifestyle: "entertainment-focused",
      mobility: "walkability priority",
      technology: "tech-forward",
      crimeRate: "moderate",
      noiseLevel: "high",
      pollution: "moderate",
      trafficCongestion: "high",
      greenSpaceAccess: "low",
      schoolQuality: "moderate",
      bedrooms: 1,
      bathrooms: 1.5,
      squareFeet: 950,
      yearBuilt: 2021,
      highlights: ["Smart Home", "Voice Control", "High Ceilings", "Industrial Style"]
    }
  },
  {
    id: "5",
    title: "Green Community Townhouse",
    description: "Energy-efficient 3-bedroom townhouse in a walkable community with bike paths and parks",
    price: "$580,000",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    address: "234 Eco Lane, Green Valley",
    attributes: {
      budget: "moderate",
      location: "suburban",
      size: "medium",
      age: "new",
      community: "eco-conscious",
      education: "high priority",
      environment: "green spaces priority",
      lifestyle: "healthy living",
      mobility: "bike-friendly preference",
      technology: "eco-tech",
      crimeRate: "low",
      noiseLevel: "low",
      pollution: "very low",
      trafficCongestion: "low",
      greenSpaceAccess: "very high",
      schoolQuality: "high",
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 1850,
      yearBuilt: 2020,
      highlights: ["Solar Panels", "Energy Efficient", "Community Garden", "EV Charger"]
    }
  },
  {
    id: "6",
    title: "Historic District Brownstone",
    description: "Beautifully restored 4-bedroom brownstone with modern amenities in a historic neighborhood",
    price: "$750,000",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25zdG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    address: "567 Heritage Ave, Historic District",
    attributes: {
      budget: "high",
      location: "urban",
      size: "large",
      age: "established",
      community: "cultural",
      education: "high priority",
      environment: "limited green space",
      lifestyle: "culture-focused",
      mobility: "walkability priority",
      technology: "classic with modern upgrades",
      crimeRate: "low",
      noiseLevel: "moderate",
      pollution: "moderate",
      trafficCongestion: "moderate",
      greenSpaceAccess: "moderate",
      schoolQuality: "very high",
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 3200,
      yearBuilt: 1910,
      highlights: ["Historic", "Renovated", "Fireplace", "High Ceilings"]
    }
  },
  {
    id: "7",
    title: "Lakeside Villa",
    description: "Luxurious 5-bedroom villa with private dock and panoramic lake views",
    price: "$1,250,000",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    address: "123 Lakefront Dr, Crystal Lake",
    attributes: {
      budget: "premium",
      location: "suburban",
      size: "very large",
      age: "new",
      community: "exclusive",
      education: "high priority",
      environment: "waterfront",
      lifestyle: "luxury",
      mobility: "car dependent",
      technology: "high-end smart home",
      crimeRate: "very low",
      noiseLevel: "very low",
      pollution: "very low",
      trafficCongestion: "low",
      greenSpaceAccess: "very high",
      schoolQuality: "excellent",
      bedrooms: 5,
      bathrooms: 4.5,
      squareFeet: 4800,
      yearBuilt: 2022,
      highlights: ["Waterfront", "Private Dock", "Home Theater", "Wine Cellar"]
    }
  },
  {
    id: "8",
    title: "Mountain View Cabin",
    description: "Cozy 2-bedroom cabin with stunning mountain views and modern renewable energy systems",
    price: "$380,000",
    imageUrl: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    address: "456 Forest Path, Mountain Springs",
    attributes: {
      budget: "moderate",
      location: "rural",
      size: "small to medium",
      age: "new",
      community: "nature-focused",
      education: "limited",
      environment: "natural setting",
      lifestyle: "outdoor",
      mobility: "car dependent",
      technology: "eco-tech",
      crimeRate: "very low",
      noiseLevel: "very low",
      pollution: "very low",
      trafficCongestion: "very low",
      greenSpaceAccess: "very high",
      schoolQuality: "moderate",
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 1100,
      yearBuilt: 2017,
      highlights: ["Mountain Views", "Solar Power", "Hiking Trails", "Wood Stove"]
    }
  },
  {
    id: "9",
    title: "Urban Micro-Apartment",
    description: "Innovative space-efficient studio with transforming furniture and smart features",
    price: "$295,000",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    address: "789 Compact St, Downtown Core",
    attributes: {
      budget: "affordable",
      location: "urban",
      size: "micro",
      age: "new",
      community: "young professionals",
      education: "moderate",
      environment: "limited green space",
      lifestyle: "minimalist",
      mobility: "public transport dependent",
      technology: "tech-forward",
      crimeRate: "moderate",
      noiseLevel: "high",
      pollution: "moderate",
      trafficCongestion: "high",
      greenSpaceAccess: "low",
      schoolQuality: "moderate",
      bedrooms: 0,
      bathrooms: 1,
      squareFeet: 450,
      yearBuilt: 2021,
      highlights: ["Space Saving", "Transforming Furniture", "Gym Access", "Rooftop Garden"]
    }
  },
  {
    id: "10",
    title: "Solar-Powered Family Home",
    description: "Energy-independent 4-bedroom home with large garden and modern eco features",
    price: "$720,000",
    imageUrl: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29sYXIlMjBob21lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    address: "101 Sunshine Ave, Green Hills",
    attributes: {
      budget: "high",
      location: "suburban",
      size: "large",
      age: "new",
      community: "eco-conscious",
      education: "high priority",
      environment: "green spaces priority",
      lifestyle: "sustainable",
      mobility: "mixed",
      technology: "eco-tech",
      crimeRate: "low",
      noiseLevel: "low",
      pollution: "very low",
      trafficCongestion: "low",
      greenSpaceAccess: "high",
      schoolQuality: "high",
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2500,
      yearBuilt: 2020,
      highlights: ["Solar Power", "Energy Storage", "Garden", "Rainwater Collection"]
    }
  },
  {
    id: "11",
    title: "Downtown Penthouse",
    description: "Luxurious 3-bedroom penthouse with panoramic city views and private rooftop terrace",
    price: "$1,850,000",
    imageUrl: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    address: "1000 Skyline Ave, City Center",
    attributes: {
      budget: "premium",
      location: "urban",
      size: "large",
      age: "new",
      community: "exclusive",
      education: "high priority",
      environment: "limited green space",
      lifestyle: "luxury",
      mobility: "walkability priority",
      technology: "high-end smart home",
      crimeRate: "low",
      noiseLevel: "moderate",
      pollution: "moderate",
      trafficCongestion: "high",
      greenSpaceAccess: "low",
      schoolQuality: "high",
      bedrooms: 3,
      bathrooms: 3.5,
      squareFeet: 3200,
      yearBuilt: 2023,
      highlights: ["Panoramic Views", "Private Elevator", "Smart Home", "Concierge Service"]
    }
  },
  {
    id: "12",
    title: "Coastal Cottage",
    description: "Charming 2-bedroom beach cottage with ocean views and walking distance to the shore",
    price: "$525,000",
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    address: "42 Shore Drive, Coastal Village",
    attributes: {
      budget: "moderate",
      location: "suburban",
      size: "small to medium",
      age: "established",
      community: "mixed",
      education: "moderate",
      environment: "waterfront",
      lifestyle: "relaxed",
      mobility: "car dependent",
      technology: "basic",
      crimeRate: "very low",
      noiseLevel: "moderate",
      pollution: "very low",
      trafficCongestion: "low",
      greenSpaceAccess: "very high",
      schoolQuality: "moderate",
      bedrooms: 2,
      bathrooms: 1.5,
      squareFeet: 1100,
      yearBuilt: 1995,
      highlights: ["Beach Access", "Ocean Views", "Renovated Kitchen", "Deck"]
    }
  },
  {
    id: "13",
    title: "Urban Garden Apartment",
    description: "Unique 2-bedroom apartment with large private terrace garden in a vibrant neighborhood",
    price: "$485,000",
    imageUrl: "https://images.unsplash.com/photo-1451976426598-a7593bd6b5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2FyZGVuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    address: "345 Green Terrace, Arts District",
    attributes: {
      budget: "moderate",
      location: "urban",
      size: "medium",
      age: "established",
      community: "creative",
      education: "moderate",
      environment: "green spaces priority",
      lifestyle: "balanced",
      mobility: "public transport dependent",
      technology: "moderate tech",
      crimeRate: "moderate",
      noiseLevel: "moderate",
      pollution: "moderate",
      trafficCongestion: "moderate",
      greenSpaceAccess: "high",
      schoolQuality: "moderate",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      yearBuilt: 2005,
      highlights: ["Private Garden", "Terrace", "Renovated", "Unique Design"]
    }
  },
  {
    id: "14",
    title: "Country Estate",
    description: "Elegant 6-bedroom estate on 5 acres with pool, tennis court, and guest house",
    price: "$2,450,000",
    imageUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    address: "8 Estate Lane, Rolling Hills",
    attributes: {
      budget: "premium",
      location: "rural",
      size: "very large",
      age: "established",
      community: "exclusive",
      education: "high priority",
      environment: "natural setting",
      lifestyle: "luxury",
      mobility: "car dependent",
      technology: "high-end smart home",
      crimeRate: "very low",
      noiseLevel: "very low",
      pollution: "very low",
      trafficCongestion: "very low",
      greenSpaceAccess: "very high",
      schoolQuality: "excellent",
      bedrooms: 6,
      bathrooms: 5.5,
      squareFeet: 6800,
      yearBuilt: 2008,
      highlights: ["Tennis Court", "Pool", "Guest House", "5 Acres"]
    }
  }
];

// Fix property matching algorithm to handle the attributes correctly
export const matchPropertiesToPreferences = (
  analysis: Record<string, string>,
  environmentalPreferences: EnvironmentalPreference[] = []
) => {
  // Create a scoring system for properties
  const scoredProperties = propertyData.map(property => {
    let score = 0;
    let maxScore = 0;
    const matchDetails: Record<string, number> = {};
    
    // Score based on basic preferences
    // Need to cast attributes to Record<string, string> to satisfy TypeScript
    const propertyAttributes = property.attributes as Record<string, string | string[]>;
    
    // For each analysis criterion, check if property matches
    Object.keys(analysis).forEach(key => {
      if (key in propertyAttributes) {
        // Skip if the attribute is an array (like highlights)
        if (Array.isArray(propertyAttributes[key])) return;
        
        const userPref = analysis[key].toLowerCase();
        const propValue = (propertyAttributes[key] as string).toLowerCase();
        
        // Calculate match score based on exact or partial matches
        let matchScore = 0;
        
        if (propValue.includes(userPref) || userPref.includes(propValue)) {
          if (propValue === userPref) {
            matchScore = 1; // Exact match
          } else {
            matchScore = 0.7; // Partial match
          }
        }
        
        // Apply weighted scoring for more important attributes
        const weightedKeys: Record<string, number> = {
          'budget': 1.5,
          'location': 1.5,
          'size': 1.2,
          'community': 1.2,
          'education': 1.2
        };
        
        const weight = weightedKeys[key] || 1;
        score += matchScore * weight;
        maxScore += weight;
        matchDetails[key] = matchScore * weight;
      }
    });
    
    // Score based on environmental preferences
    environmentalPreferences.forEach(pref => {
      const envKey = pref.type;
      const envValue = pref.value;
      
      if (envKey in propertyAttributes && !Array.isArray(propertyAttributes[envKey])) {
        const propValue = (propertyAttributes[envKey] as string).toLowerCase();
        let matchScore = 0;
        
        if (envValue === 'high' && ['high', 'very high', 'excellent'].includes(propValue)) {
          matchScore = propValue === 'very high' || propValue === 'excellent' ? 2 : 1.5;
        } else if (envValue === 'low' && ['low', 'very low', 'minimal'].includes(propValue)) {
          matchScore = propValue === 'very low' || propValue === 'minimal' ? 2 : 1.5;
        }
        
        // Environmental factors weighted higher
        const weight = 2;
        score += matchScore * weight;
        maxScore += weight;
        matchDetails[envKey] = matchScore * weight;
      }
    });
    
    const matchPercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    return {
      ...property,
      matchScore: matchPercent,
      matchDetails
    };
  });
  
  // Return top properties sorted by score
  return scoredProperties
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 3);
};

export const parseEnvironmentalQuery = (query: string): EnvironmentalPreference | null => {
  const queryLower = query.toLowerCase();
  
  for (const ranking of environmentalRankings) {
    const factorKey = ranking.type;
    const factorLabel = ranking.label.toLowerCase();
    
    if (queryLower.includes(factorLabel) || queryLower.includes(factorKey.toLowerCase())) {
      let value: 'high' | 'low' = 'low';
      
      if (ranking.isHigherBetter) {
        value = 'high';
        
        if (
          queryLower.includes('low ' + factorLabel) ||
          queryLower.includes('less ' + factorLabel) ||
          queryLower.includes('minimal ' + factorLabel) ||
          queryLower.includes('poor ' + factorLabel)
        ) {
          value = 'low';
        }
      } else {
        value = 'low';
        
        if (
          queryLower.includes('high ' + factorLabel) ||
          queryLower.includes('more ' + factorLabel) ||
          queryLower.includes('lots of ' + factorLabel)
        ) {
          value = 'high';
        }
      }
      
      return { type: factorKey, value };
    }
  }
  
  if (queryLower.includes('quiet') || queryLower.includes('peaceful')) {
    return { type: 'noiseLevel', value: 'low' };
  }
  
  if (queryLower.includes('safe') || queryLower.includes('security')) {
    return { type: 'crimeRate', value: 'low' };
  }
  
  if (queryLower.includes('clean air') || queryLower.includes('fresh air')) {
    return { type: 'pollution', value: 'low' };
  }
  
  if (queryLower.includes('park') || queryLower.includes('nature') || queryLower.includes('green')) {
    return { type: 'greenSpaceAccess', value: 'high' };
  }
  
  if (queryLower.includes('education') || queryLower.includes('school')) {
    return { type: 'schoolQuality', value: 'high' };
  }
  
  if (queryLower.includes('traffic') || queryLower.includes('commute')) {
    return { type: 'trafficCongestion', value: 'low' };
  }
  
  // Check for recommendation requests
  if (
    queryLower.includes('recommend') || 
    queryLower.includes('suggestion') || 
    queryLower.includes('show me property') || 
    queryLower.includes('show property') ||
    queryLower.includes('show recommendation') ||
    queryLower.includes('show me recommendation')
  ) {
    return { type: 'recommendation', value: 'high' };
  }
  
  return null;
};

export const convertEnvironmentalQuestionToPreference = (
  question: string, 
  answer: 'yes' | 'no'
): EnvironmentalPreference | null => {
  if (question.includes('crime rates')) {
    return { type: 'crimeRate', value: answer === 'yes' ? 'low' : 'high' };
  }
  
  if (question.includes('quiet neighborhoods') || question.includes('noise levels')) {
    return { type: 'noiseLevel', value: answer === 'yes' ? 'low' : 'high' };
  }
  
  if (question.includes('air quality')) {
    return { type: 'pollution', value: answer === 'yes' ? 'low' : 'high' };
  }
  
  if (question.includes('traffic congestion')) {
    return { type: 'trafficCongestion', value: answer === 'yes' ? 'low' : 'high' };
  }
  
  if (question.includes('parks and green spaces')) {
    return { type: 'greenSpaceAccess', value: answer === 'yes' ? 'high' : 'low' };
  }
  
  if (question.includes('good schools')) {
    return { type: 'schoolQuality', value: answer === 'yes' ? 'high' : 'low' };
  }
  
  return null;
};
