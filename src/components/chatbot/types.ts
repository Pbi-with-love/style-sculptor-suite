
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface MenuOption {
  id: string;
  title: string;
  questions?: string[];
}

export interface UserPreference {
  question: string;
  answer: 'yes' | 'no' | null;
  category: string;
}

export interface EnvironmentalPreference {
  type: string;
  value: 'low' | 'high';
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  address: string;
  attributes?: Record<string, any>;
}

export interface ChatbotMapQueryResponse {
  success: boolean;
  message: string;
  location?: { lat: number; lng: number };
}

export interface MapInteractionEvent {
  action: string;
  location?: { lat: number; lng: number };
  environmentalType?: string;
  value?: 'low' | 'high';
}

export interface EnvironmentalDataPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  [key: string]: any;
}

export interface ScoredEnvironmentalDataPoint extends EnvironmentalDataPoint {
  matchScore?: number;
}
