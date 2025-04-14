
import { RoomData } from './types';

export const handleChatbotRoomQuery = (query: string, roomData: RoomData, 
  setShowFuturePredictions: (show: boolean) => void, 
  setPredictionYear: (year: number) => void) => {
  
  const queryLower = query.toLowerCase();
  
  // Handle future prediction queries
  if (queryLower.includes('future') || queryLower.includes('predict') || queryLower.includes('forecast')) {
    const year = queryLower.includes('2025') ? 2025 : 
                queryLower.includes('2030') ? 2030 : 
                queryLower.includes('2035') ? 2035 : 2025;
    
    setPredictionYear(year);
    setShowFuturePredictions(true);
    
    return {
      success: true,
      message: `Showing future predictions for ${year}. You can view environmental trends, population changes, and property value forecasts.`,
    };
  }
  
  // Reset future predictions view if asked
  if (queryLower.includes('reset') || queryLower.includes('return') || queryLower.includes('back to room')) {
    setShowFuturePredictions(false);
    return {
      success: true,
      message: "Returning to normal room view.",
    };
  }
  
  if (queryLower.includes('noise') || queryLower.includes('quiet')) {
    return {
      success: true,
      message: `The noise level in this area is ${roomData.environmentalData.noiseLevel}/10, which is ${roomData.environmentalData.noiseLevel < 5 ? 'relatively quiet' : 'moderate to noisy'}.`,
    };
  }
  
  if (queryLower.includes('school') || queryLower.includes('education')) {
    return {
      success: true,
      message: `The nearest school is ${roomData.amenities.schools[0].name}, rated ${roomData.amenities.schools[0].rating}, located ${roomData.amenities.schools[0].distance} away. School quality in this area is rated ${roomData.environmentalData.schoolQuality}/10.`,
    };
  }
  
  if (queryLower.includes('hospital') || queryLower.includes('medical') || queryLower.includes('healthcare')) {
    return {
      success: true,
      message: `The nearest medical facility is ${roomData.amenities.hospitals[0].name}, located ${roomData.amenities.hospitals[0].distance} away.`,
    };
  }
  
  if (queryLower.includes('demographics') || queryLower.includes('population')) {
    return {
      success: true,
      message: `This area has a population of ${roomData.demographics.totalPopulation} people. ${roomData.demographics.ageGroups[1].percentage}% are young adults (19-35), ${roomData.demographics.ageGroups[0].percentage}% are children, and ${roomData.demographics.ageGroups[3].percentage}% are seniors.`,
    };
  }
  
  if (queryLower.includes('crime') || queryLower.includes('safe')) {
    return {
      success: true,
      message: `The crime rate in this area is ${roomData.environmentalData.crimeRate}/10, which is ${roomData.environmentalData.crimeRate < 5 ? 'relatively low' : 'moderate to high'}.`,
    };
  }
  
  if (queryLower.includes('property value') || queryLower.includes('worth') || queryLower.includes('price')) {
    return {
      success: true,
      message: `The current property value is estimated around $420,000. By ${roomData.futurePredictions.propertyValueTrends[1].year}, it's predicted to be worth ${roomData.futurePredictions.propertyValueTrends[1].estimatedValue}.`,
    };
  }
  
  return {
    success: false,
    message: "I don't have specific information about that. You can ask about noise levels, schools, hospitals, crime rates, demographics, or future predictions.",
  };
};
