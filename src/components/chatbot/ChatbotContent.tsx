
import { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Bot, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ChatMessage from './ChatMessage';
import ChatMenu from './ChatMenu';
import QuestionButtons from './QuestionButtons';
import ChatInputForm from './ChatInputForm';
import RecommendationActions from './RecommendationActions';
import PropertyRecommendation from '../PropertyRecommendation';
import { environmentalRankings, environmentalData } from '../../data/environmentalData';
import { 
  parseEnvironmentalQuery, 
  convertEnvironmentalQuestionToPreference,
  matchPropertiesToPreferences,
  propertyData
} from './ChatbotService';
import { 
  type Message, 
  type MenuOption, 
  type UserPreference, 
  type EnvironmentalPreference,
  type Property,
  type MapInteractionEvent,
  type ScoredEnvironmentalDataPoint
} from './types';

interface ChatbotContentProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  chatbotId: string;
  handleMapQuery?: (query: string) => {
    success: boolean;
    message: string;
    location?: { lat: number; lng: number };
  };
}

const ChatbotContent = ({ 
  isOpen, 
  onOpenChange, 
  chatbotId,
  handleMapQuery 
}: ChatbotContentProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your Home Buying Assistant! How can I help you find your dream property today? You can ask me about environmental factors like "Show me areas with low noise" or type "show recommendations" after answering some questions.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [environmentalPreferences, setEnvironmentalPreferences] = useState<EnvironmentalPreference[]>([]);
  const [mapInteractionEvent, setMapInteractionEvent] = useState<MapInteractionEvent | null>(null);
  const [sampleProperties, setSampleProperties] = useState<Property[]>(propertyData.slice(0, 3));
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const findBestLocationsForPreferences = (preferences: EnvironmentalPreference[]): ScoredEnvironmentalDataPoint[] => {
    if (preferences.length === 0) return [];
    
    const scoredLocations = environmentalData.map(location => {
      let score = 0;
      const maxScore = preferences.length;
      
      for (const pref of preferences) {
        const ranking = environmentalRankings.find(r => r.type === pref.type);
        if (!ranking) continue;
        
        const value = location[pref.type as keyof typeof location] as number;
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
    
    // Handle the recommendation request
    if (preference.type === 'recommendation') {
      handleShowRecommendations();
      return true;
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

  const handleSendMessage = (newMessage: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
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
    
    if (handleEnvironmentalQuery(newMessage)) {
      return;
    }
    
    // If the chatbot has a handler for map queries
    if (handleMapQuery) {
      const result = handleMapQuery(newMessage);
      if (result.success) {
        setTimeout(() => {
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: result.message,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botResponse]);
          
          if (result.location) {
            setMapInteractionEvent({
              action: 'zoomToLocation',
              location: result.location
            });
          }
        }, 1000);
        return;
      }
    }
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're looking for specific information. To help you better, please use the menu options below to tell me more about your preferences, or simply ask me about environmental factors like 'Show me areas with low noise' or 'Find neighborhoods with good schools'. After answering some questions, type 'show recommendations' to see properties that match your preferences.",
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
          text: "Thanks for your answers! Would you like to explore another category or type 'show recommendations' to see properties that match your preferences?",
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

  const handleShowRecommendations = () => {
    if (userPreferences.length === 0 && environmentalPreferences.length === 0) {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: "Please answer some questions about your preferences before I can show recommendations. Click on a category below to get started!",
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
    
    const matchedProperties = matchPropertiesToPreferences(analysis, environmentalPreferences);
    
    setTimeout(() => {
      let recommendationText = "Based on your preferences, I've analyzed what matters most to you. ";
      
      if (analysis.budget === 'high' || analysis.budget === 'premium') {
        recommendationText += "You're looking for higher-end properties ";
      } else {
        recommendationText += "You're looking for moderately priced homes ";
      }
      
      if (analysis.location === 'urban') {
        recommendationText += "in urban areas. ";
      } else if (analysis.location === 'suburban') {
        recommendationText += "in suburban neighborhoods. ";
      } else if (analysis.location === 'rural') {
        recommendationText += "in rural settings. ";
      }
      
      if (environmentalPreferences.length > 0) {
        recommendationText += "You care about environmental factors such as ";
        
        const prefDescriptions = environmentalPreferences.map(pref => {
          const ranking = environmentalRankings.find(r => r.type === pref.type);
          if (!ranking) return '';
          
          return `${pref.value} ${ranking.label.toLowerCase()}`;
        }).filter(desc => desc !== '');
        
        if (prefDescriptions.length > 0) {
          recommendationText += prefDescriptions.join(', ') + ". ";
          
          const bestLocations = findBestLocationsForPreferences(environmentalPreferences);
          if (bestLocations.length > 0) {
            recommendationText += `The ${bestLocations[0].name} area is an excellent match for these preferences. `;
          }
        }
      }
      
      if (analysis.community === 'family-oriented') {
        recommendationText += "Family-friendly communities seem important to you. ";
      }
      
      if (analysis.environment === 'green spaces priority' || analysis.environment === 'waterfront' || analysis.environment === 'natural setting') {
        recommendationText += "Access to nature and green spaces is a priority for you. ";
      }
      
      if (analysis.technology === 'tech-forward' || analysis.technology === 'high-end smart home') {
        recommendationText += "You value smart home technology and modern amenities. ";
      }
      
      if (matchedProperties.length > 0) {
        const topProperty = matchedProperties[0];
        recommendationText += `I found ${matchedProperties.length} properties that match your criteria, with the top match being ${topProperty.title} (${topProperty.matchScore}% match). Here are my recommendations:`;
      } else {
        recommendationText += "Here are three properties that best match your criteria:";
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: recommendationText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      
      setSampleProperties(matchedProperties);
      setShowRecommendations(true);
      
      toast.info("Pro tip: Try the thumbs up/down buttons to help improve recommendations!", {
        icon: <Info className="h-4 w-4" />
      });
    }, 1000);
  };

  const handleResetChat = () => {
    setMessages([{
      id: '1',
      text: 'Welcome to your Home Buying Assistant! How can I help you find your dream property today? You can ask me about environmental factors like "Show me areas with low noise" or type "show recommendations" after answering some questions.',
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
    setSampleProperties(propertyData.slice(0, 3));
    
    toast.success("Chat has been reset. Let's start fresh!");
  };

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
        if (pref.type === 'recommendation') return; // Skip recommendation preference
        
        const ranking = environmentalRankings.find(r => r.type === pref.type);
        if (!ranking) return;
        
        const key = ranking.type;
        analysis[key] = pref.value;
      });
    }
    
    return analysis;
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0 flex flex-col h-full">
        <SheetHeader className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center text-lg">
              <Bot className="mr-2 h-5 w-5" />
              Home Buying Assistant
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />

          {showMainMenu && (
            <ChatMenu 
              menuOptions={mainMenuOptions} 
              onMenuSelect={handleMenuSelect} 
            />
          )}

          {currentQuestion && (
            <QuestionButtons onAnswerQuestion={handleAnswerQuestion} />
          )}

          {showRecommendations && (
            <div className="mt-4">
              <PropertyRecommendation properties={sampleProperties} title="Recommended Properties" />
              <RecommendationActions onReset={handleResetChat} />
            </div>
          )}
        </div>

        <ChatInputForm onSendMessage={handleSendMessage} />
      </SheetContent>
    </Sheet>
  );
};

export default ChatbotContent;
