
import { environmentalRankings } from '../../data/environmentalData';
import { type EnvironmentalPreference } from './types';

// Enhanced property matching data
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
      schoolQuality: "high"
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
      schoolQuality: "high"
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
      schoolQuality: "high"
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
      schoolQuality: "moderate"
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
      schoolQuality: "high"
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
      schoolQuality: "very high"
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
      schoolQuality: "excellent"
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
      schoolQuality: "moderate"
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
      schoolQuality: "moderate"
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
      schoolQuality: "high"
    }
  }
];

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

// Score properties based on user preferences
export const matchPropertiesToPreferences = (
  analysis: Record<string, string>,
  environmentalPreferences: EnvironmentalPreference[] = []
) => {
  // Create a scoring system for properties
  const scoredProperties = propertyData.map(property => {
    let score = 0;
    let maxScore = 0;
    
    // Score based on basic preferences
    const propertyAttributes = property.attributes as Record<string, string>;
    
    // For each analysis criterion, check if property matches
    Object.keys(analysis).forEach(key => {
      if (
        key in propertyAttributes && 
        propertyAttributes[key].toLowerCase().includes(analysis[key].toLowerCase())
      ) {
        score += 1;
      }
      maxScore += 1;
    });
    
    // Score based on environmental preferences
    environmentalPreferences.forEach(pref => {
      const envKey = pref.type;
      const envValue = pref.value;
      
      if (
        envKey in propertyAttributes && 
        (
          (envValue === 'high' && ['high', 'very high', 'excellent'].includes(propertyAttributes[envKey])) ||
          (envValue === 'low' && ['low', 'very low', 'minimal'].includes(propertyAttributes[envKey]))
        )
      ) {
        score += 2; // Environmental factors weighted higher
      }
      maxScore += 2;
    });
    
    const matchPercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    return {
      ...property,
      matchScore: matchPercent
    };
  });
  
  // Return top properties sorted by score
  return scoredProperties
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 3);
};
