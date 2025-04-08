import { useState, useEffect } from 'react';
import { MessageCircle, Send, X, ChevronRight, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import PropertyRecommendation from './PropertyRecommendation';
import { environmentalData, environmentalRankings, EnvironmentalDataPoint } from '../data/environmentalData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MenuOption {
  id: string;
  title: string;
  questions?: string[];
}

interface UserPreference {
  question: string;
  answer: 'yes' | 'no' | null;
  category: string;
}

interface EnvironmentalPreference {
  type: string;
  value: 'low' | 'high';
}

interface ScoredEnvironmentalDataPoint extends EnvironmentalDataPoint {
  matchScore?: number;
}

interface ChatbotProps {
  chatbotId?: string;
}

const Chatbot = ({ chatbotId = 'default-chatbot' }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your Home Buying Assistant! How can I help you find your dream property today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [environmentalPreferences, setEnvironmentalPreferences] = useState<EnvironmentalPreference[]>([]);
  const [mapInteractionEvent, setMapInteractionEvent] = useState<{
    action: string;
    location?: {lat: number; lng: number};
    environmentalType?: string;
    value?: 'low' | 'high';
  } | null>(null);
  const [sampleProperties, setSampleProperties] = useState([
    {
      id: "1",
      title: "Modern Downtown Apartment",
      description: "A spacious 3-bedroom apartment with smart home features in the heart of downtown.",
      price: "$520,000",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      address: "123 Main St, Downtown District"
    },
    {
      id: "2",
      title: "Suburban Family Home",
      description: "Beautiful 4-bedroom house with a backyard and smart security system in a family-friendly neighborhood.",
      price: "$650,000",
      imageUrl: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      address: "456 Oak Lane, Greenview Heights"
    },
    {
      id: "3",
      title: "Riverside Condo",
      description: "Modern 2-bedroom condo with river views, close to public transportation and green spaces.",
      price: "$475,000",
      imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      address: "789 River Road, Riverside Community"
    }
  ]);

  const mainMenuOptions: MenuOption[] = [
    { 
      id: 'basic', 
      title: 'Basic Questions',
      questions: [
        'Is your budget above $500,000?',
        'Are you looking for a property in an urban area?',
        'Do you need at least 3 bedrooms?',
        'Would you prefer a newly built home?'
      ]
    },
    { 
      id: 'demographics', 
      title: 'Current & Future Demographics',
      questions: [
        'Is living in an area with young families important to you?',
        'Do you care about population growth in the next 20 years?',
        'Is living in an area with good schools important?',
        'Would you prefer an area with higher income residents?',
        'Are you interested in areas with a diverse age distribution?'
      ]
    },
    { 
      id: 'construction', 
      title: 'Future & Current Construction Plans',
      questions: [
        'Is having parks and green spaces nearby important to you?',
        'Do you want to live near entertainment options like restaurants and malls?',
        'Are you concerned about major construction projects in the next 5 years?',
        'Would you prefer an area with limited future development?'
      ]
    },
    { 
      id: 'transportation', 
      title: 'Current & Future Transportation',
      questions: [
        'Is access to public transportation important to you?',
        'Do you care about future transportation improvements?',
        'Is living in a bike-friendly neighborhood important?',
        'Would you prefer an area with good walkability?',
        'Do you mind living near commercial buildings?'
      ]
    },
    { 
      id: 'smart', 
      title: 'Smart Home Facilities',
      questions: [
        'Is having smart home technology important to you?',
        'Would you prefer a home connected to smart energy grids?',
        'Are you interested in living in an area with future smart city initiatives?',
        'Is having high-speed internet essential for you?'
      ]
    },
    {
      id: 'environmental',
      title: 'Environmental Factors',
      questions: [
        'Is living in an area with low crime rates important to you?',
        'Do you prefer quiet neighborhoods with low noise levels?',
        'Is air quality a significant concern for you?',
        'Do you want to avoid areas with heavy traffic congestion?',
        'Is access to parks and green spaces important to you?',
        'Are good schools a priority for you?'
      ]
    }
  ];

  const parseEnvironmentalQuery = (query: string): EnvironmentalPreference | null => {
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

  const findBestLocationsForPreferences = (preferences: EnvironmentalPreference[]): ScoredEnvironmentalDataPoint[] => {
    if (preferences.length === 0) return [];
    
    const scoredLocations = environmentalData.map(location => {
      let score = 0;
      const maxScore = preferences.length;
      
      for (const pref of preferences) {
        const ranking = environmentalRankings.find(r => r.type === pref.type);
        if (!ranking) continue;
        
        const value = location[pref.type as keyof EnvironmentalDataPoint] as number;
        const threshold = 5;
        
        const matchesPrefDirection = 
          (ranking.isHigherBetter && pref.value === 'high' && value > threshold) ||
          (!ranking.isHigherBetter && pref.value === 'low' && value < threshold) ||
          (ranking.isHigherBetter && pref.value === 'low' && value < threshold) ||
          (!ranking.isHigherBetter && pref.value === 'high' && value > threshold);
        
        if (matchesPrefDirection) {
          score += 1;
        }
      }
      
      return {
        ...location,
        matchScore: (score / maxScore) * 100
      };
    });
    
    return scoredLocations
      .filter(loc => (loc.matchScore || 0) > 0)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  };

  const handleEnvironmentalQuestion = (message: string) => {
    const preference = parseEnvironmentalQuery(message);
    
    if (!preference) {
      return false;
    }
    
    const ranking = environmentalRankings.find(r => r.type === preference.type);
    
    if (!ranking) return false;
    
    let responseText = '';
    
    if (ranking.isHigherBetter) {
      if (preference.value === 'high') {
        responseText = `I'll look for areas with excellent ${ranking.label.toLowerCase()}. Let me update the map to highlight these areas.`;
      } else {
        responseText = `I'll look for areas with more modest ${ranking.label.toLowerCase()}. Let me update the map.`;
      }
    } else {
      if (preference.value === 'low') {
        responseText = `I understand you want areas with low ${ranking.label.toLowerCase()}. Let me highlight those on the map for you.`;
      } else {
        responseText = `I'll find areas with higher ${ranking.label.toLowerCase()}, though most people prefer lower levels.`;
      }
    }
    
    const botResponse: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botResponse]);
    
    setEnvironmentalPreferences(prev => {
      const filtered = prev.filter(p => p.type !== preference.type);
      return [...filtered, preference];
    });
    
    setMapInteractionEvent({
      action: 'highlightEnvironmentalFactor',
      environmentalType: preference.type,
      value: preference.value
    });
    
    const bestLocations = findBestLocationsForPreferences([preference]);
    
    if (bestLocations.length > 0) {
      setTimeout(() => {
        setMapInteractionEvent({
          action: 'zoomToLocation',
          location: {
            lat: bestLocations[0].lat,
            lng: bestLocations[0].lng
          }
        });
        
        const followupResponse: Message = {
          id: (Date.now() + 100).toString(),
          text: `I've found ${bestLocations.length} areas that match your preference. The best match is ${bestLocations[0].name} with a ${Math.round(bestLocations[0].matchScore || 0)}% match to your preferences.`,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, followupResponse]);
      }, 1500);
    }
    
    return true;
  };

  const handleMenuSelect = (menuId: string) => {
    setActiveMenu(menuId);
    setShowMainMenu(false);
    
    const selectedMenu = mainMenuOptions.find(menu => menu.id === menuId);
    
    if (selectedMenu && selectedMenu.questions && selectedMenu.questions.length > 0) {
      const firstQuestion = selectedMenu.questions[0];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: firstQuestion,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setCurrentQuestion(firstQuestion);
      setCurrentQuestionIndex(0);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    if (currentQuestion) {
      const lowerMessage = newMessage.toLowerCase();
      if (lowerMessage.includes('yes') || lowerMessage.includes('yeah') || lowerMessage.includes('sure') || lowerMessage.includes('ok')) {
        handleAnswerQuestion('yes');
        return;
      } else if (lowerMessage.includes('no') || lowerMessage.includes('nope') || lowerMessage.includes('not')) {
        handleAnswerQuestion('no');
        return;
      }
    }
    
    if (handleEnvironmentalQuestion(newMessage)) {
      return;
    }
    
    if (newMessage.toLowerCase().includes('recommend') || 
        newMessage.toLowerCase().includes('suggestion') || 
        newMessage.toLowerCase().includes('show me')) {
      handleShowRecommendations();
      return;
    }
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're looking for specific information. To help you better, please use the menu options below to tell me more about your preferences, or simply ask me about environmental factors like 'Show me areas with low noise' or 'Find neighborhoods with good schools'.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setShowMainMenu(true);
      setShowRecommendations(false);
    }, 1000);
  };

  const handleAnswerQuestion = (answer: 'yes' | 'no') => {
    const selectedMenu = mainMenuOptions.find(menu => menu.id === activeMenu);
    
    if (!selectedMenu || !currentQuestion) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: answer === 'yes' ? 'Yes' : 'No',
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    setUserPreferences(prev => [...prev, { 
      question: currentQuestion, 
      answer,
      category: selectedMenu.title 
    }]);
    
    if (selectedMenu.id === 'environmental') {
      const preference = convertEnvironmentalQuestionToPreference(currentQuestion, answer);
      
      if (preference) {
        setEnvironmentalPreferences(prev => {
          const filtered = prev.filter(p => p.type !== preference.type);
          return [...filtered, preference];
        });
        
        setMapInteractionEvent({
          action: 'highlightEnvironmentalFactor',
          environmentalType: preference.type,
          value: preference.value
        });
      }
    }
    
    if (selectedMenu.questions && currentQuestionIndex < selectedMenu.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion = selectedMenu.questions[nextIndex];
      
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: nextQuestion,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentQuestion(nextQuestion);
        setCurrentQuestionIndex(nextIndex);
      }, 500);
    } else {
      let botMessage: Message;
      
      if (selectedMenu.id === 'environmental') {
        botMessage = {
          id: Date.now().toString(),
          text: "Thanks for telling me about your environmental preferences. I've updated the map to highlight areas that match what you're looking for.",
          sender: 'bot',
          timestamp: new Date(),
        };
        
        const bestLocations = findBestLocationsForPreferences(environmentalPreferences);
        
        if (bestLocations.length > 0) {
          setTimeout(() => {
            setMapInteractionEvent({
              action: 'zoomToLocation',
              location: {
                lat: bestLocations[0].lat,
                lng: bestLocations[0].lng
              }
            });
          }, 1000);
        }
      } else {
        botMessage = {
          id: Date.now().toString(),
          text: "Thanks for your answers! Would you like to explore another category or see recommendations based on what you've told me so far?",
          sender: 'bot',
          timestamp: new Date(),
        };
      }
      
      setMessages(prev => [...prev, botMessage]);
      setShowMainMenu(true);
      setActiveMenu(null);
      setCurrentQuestion(null);
    }
  };

  const convertEnvironmentalQuestionToPreference = (
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

  const handleShowRecommendations = () => {
    if (userPreferences.length === 0 && environmentalPreferences.length === 0) {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: "Please answer some questions about your preferences before I can show recommendations.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: "Show me recommended properties",
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const analysis = analyzePreferences();
    
    const matchedProperties = matchPropertiesToPreferences(analysis);
    
    setTimeout(() => {
      let recommendationText = "Based on your preferences, I've analyzed what matters most to you. ";
      
      if (analysis.budget === 'high') {
        recommendationText += "You're looking for higher-end properties ";
      } else {
        recommendationText += "You're looking for moderately priced homes ";
      }
      
      if (analysis.location === 'urban') {
        recommendationText += "in urban areas. ";
      } else {
        recommendationText += "in suburban neighborhoods. ";
      }
      
      if (environmentalPreferences.length > 0) {
        recommendationText += "You care about environmental factors such as ";
        
        const prefDescriptions = environmentalPreferences.map(pref => {
          const ranking = environmentalRankings.find(r => r.type === pref.type);
          if (!ranking) return '';
          
          return `${pref.value} ${ranking.label.toLowerCase()}`;
        });
        
        recommendationText += prefDescriptions.join(', ') + ". ";
        
        const bestLocations = findBestLocationsForPreferences(environmentalPreferences);
        if (bestLocations.length > 0) {
          recommendationText += `The ${bestLocations[0].name} area is an excellent match for these preferences. `;
        }
      }
      
      if (analysis.community === 'family-oriented') {
        recommendationText += "Family-friendly communities seem important to you. ";
      }
      
      if (analysis.environment === 'green spaces priority') {
        recommendationText += "Access to parks and green spaces is a priority for you. ";
      }
      
      if (analysis.technology === 'tech-forward') {
        recommendationText += "You value smart home technology and modern amenities. ";
      }
      
      recommendationText += "Here are three properties that best match your criteria:";
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: recommendationText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      
      setSampleProperties(matchedProperties);
      setShowRecommendations(true);
    }, 1000);
  };

  const handleResetChat = () => {
    setMessages([{
      id: '1',
      text: 'Welcome to your Home Buying Assistant! How can I help you find your dream property today?',
      sender: 'bot',
      timestamp: new Date(),
    }]);
    setUserPreferences([]);
    setEnvironmentalPreferences([]);
    setShowMainMenu(true);
    setActiveMenu(null);
    setCurrentQuestion(null);
    setShowRecommendations(false);
    setMapInteractionEvent(null);
    setSampleProperties([
      {
        id: "1",
        title: "Modern Downtown Apartment",
        description: "A spacious 3-bedroom apartment with smart home features in the heart of downtown.",
        price: "$520,000",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        address: "123 Main St, Downtown District"
      },
      {
        id: "2",
        title: "Suburban Family Home",
        description: "Beautiful 4-bedroom house with a backyard and smart security system in a family-friendly neighborhood.",
        price: "$650,000",
        imageUrl: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        address: "456 Oak Lane, Greenview Heights"
      },
      {
        id: "3",
        title: "Riverside Condo",
        description: "Modern 2-bedroom condo with river views, close to public transportation and green spaces.",
        price: "$475,000",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        address: "789 River Road, Riverside Community"
      }
    ]);
  };

  useEffect(() => {
    if (!mapInteractionEvent) return;
    
    const event = new CustomEvent('chatbot-map-interaction', { 
      detail: mapInteractionEvent 
    });
    
    window.dispatchEvent(event);
    
    setTimeout(() => {
      setMapInteractionEvent(null);
    }, 100);
  }, [mapInteractionEvent]);

  const analyzePreferences = () => {
    const preferencesByCategory: Record<string, { yes: string[], no: string[] }> = {};
    
    userPreferences.forEach(pref => {
      if (!preferencesByCategory[pref.category]) {
        preferencesByCategory[pref.category] = { yes: [], no: [] };
      }
      
      if (pref.answer === 'yes') {
        preferencesByCategory[pref.category].yes.push(pref.question);
      } else {
        preferencesByCategory[pref.category].no.push(pref.question);
      }
    });
    
    const analysis: Record<string, string> = {};
    
    if (preferencesByCategory['Basic Questions']) {
      const basic = preferencesByCategory['Basic Questions'];
      if (basic.yes.includes('Is your budget above $500,000?')) {
        analysis.budget = 'high';
      } else {
        analysis.budget = 'moderate';
      }
      
      if (basic.yes.includes('Are you looking for a property in an urban area?')) {
        analysis.location = 'urban';
      } else {
        analysis.location = 'suburban';
      }
      
      if (basic.yes.includes('Do you need at least 3 bedrooms?')) {
        analysis.size = 'large';
      } else {
        analysis.size = 'small to medium';
      }
      
      if (basic.yes.includes('Would you prefer a newly built home?')) {
        analysis.age = 'new';
      } else {
        analysis.age = 'established';
      }
    }
    
    if (preferencesByCategory['Current & Future Demographics']) {
      const demo = preferencesByCategory['Current & Future Demographics'];
      if (demo.yes.includes('Is living in an area with young families important to you?')) {
        analysis.community = 'family-oriented';
      }
      
      if (demo.yes.includes('Is living in an area with good schools important?')) {
        analysis.education = 'high priority';
      }
    }
    
    if (preferencesByCategory['Future & Current Construction Plans']) {
      const construction = preferencesByCategory['Future & Current Construction Plans'];
      if (construction.yes.includes('Is having parks and green spaces nearby important to you?')) {
        analysis.environment = 'green spaces priority';
      }
      
      if (construction.yes.includes('Do you want to live near entertainment options like restaurants and malls?')) {
        analysis.lifestyle = 'entertainment-focused';
      }
    }
    
    if (preferencesByCategory['Current & Future Transportation']) {
      const transport = preferencesByCategory['Current & Future Transportation'];
      if (transport.yes.includes('Is access to public transportation important to you?')) {
        analysis.mobility = 'public transport dependent';
      } else if (transport.yes.includes('Is living in a bike-friendly neighborhood important?')) {
        analysis.mobility = 'bike-friendly preference';
      } else if (transport.yes.includes('Would you prefer an area with good walkability?')) {
        analysis.mobility = 'walkability priority';
      }
    }
    
    if (preferencesByCategory['Smart Home Facilities']) {
      const smart = preferencesByCategory['Smart Home Facilities'];
      if (smart.yes.filter(q => 
        q.includes('smart home') || 
        q.includes('smart energy') || 
        q.includes('smart city')
      ).length >= 2) {
        analysis.technology = 'tech-forward';
      }
    }
    
    if (environmentalPreferences.length > 0) {
      environmentalPreferences.forEach(pref => {
        const ranking = environmentalRankings.find(r => r.type === pref.type);
        if (!ranking) return;
        
        const key = ranking.type;
        analysis[key] = pref.value;
      });
    }
    
    return analysis;
  };

  const matchPropertiesToPreferences = (analysis: Record<string, string>) => {
    const allProperties = [
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
        imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
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
      }
    ];
    
    return allProperties.slice(0, 3);
  };

  return (
    <div>
      {/* JSX rendering */}
    </div>
  );
};

export default Chatbot;
