
import { environmentalRankings } from '../../data/environmentalData';
import { type EnvironmentalPreference } from './types';

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
