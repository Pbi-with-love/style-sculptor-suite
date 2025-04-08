
import { useState } from 'react';
import { MessageCircle, Send, X, ChevronRight, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import PropertyRecommendation from './PropertyRecommendation';

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

const Chatbot = () => {
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
  ];

  const handleMenuSelect = (menuId: string) => {
    setActiveMenu(menuId);
    const selectedMenu = mainMenuOptions.find(menu => menu.id === menuId);
    
    if (selectedMenu && selectedMenu.questions && selectedMenu.questions.length > 0) {
      // Add bot message introducing the topic
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Let me ask you some yes/no questions about ${selectedMenu.title.toLowerCase()}:`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Set the first question
      setCurrentQuestion(selectedMenu.questions[0]);
      setCurrentQuestionIndex(0);
    }
    
    setShowMainMenu(false);
  };

  const handleAnswerQuestion = (answer: 'yes' | 'no') => {
    const selectedMenu = mainMenuOptions.find(menu => menu.id === activeMenu);
    
    if (!selectedMenu || !currentQuestion) return;
    
    // Add user's answer to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: answer === 'yes' ? 'Yes' : 'No',
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Save the preference with category information
    setUserPreferences(prev => [...prev, { 
      question: currentQuestion, 
      answer,
      category: selectedMenu.title 
    }]);
    
    // Check if there are more questions
    if (selectedMenu.questions && currentQuestionIndex < selectedMenu.questions.length - 1) {
      // Move to the next question
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
      // No more questions for this category
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: "Thanks for your answers! Would you like to explore another category or see recommendations based on what you've told me so far?",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        setShowMainMenu(true);
        setActiveMenu(null);
        setCurrentQuestion(null);
      }, 500);
    }
  };

  const analyzePreferences = () => {
    const preferencesByCategory: Record<string, { yes: string[], no: string[] }> = {};
    
    // Group preferences by category
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
    
    // Analyze each category to determine user profile
    const analysis: Record<string, string> = {};
    
    // Basic Questions Analysis
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
    
    // Demographics Analysis
    if (preferencesByCategory['Current & Future Demographics']) {
      const demo = preferencesByCategory['Current & Future Demographics'];
      if (demo.yes.includes('Is living in an area with young families important to you?')) {
        analysis.community = 'family-oriented';
      }
      
      if (demo.yes.includes('Is living in an area with good schools important?')) {
        analysis.education = 'high priority';
      }
    }
    
    // Construction Plans Analysis
    if (preferencesByCategory['Future & Current Construction Plans']) {
      const construction = preferencesByCategory['Future & Current Construction Plans'];
      if (construction.yes.includes('Is having parks and green spaces nearby important to you?')) {
        analysis.environment = 'green spaces priority';
      }
      
      if (construction.yes.includes('Do you want to live near entertainment options like restaurants and malls?')) {
        analysis.lifestyle = 'entertainment-focused';
      }
    }
    
    // Transportation Analysis
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
    
    // Smart Home Analysis
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
    
    return analysis;
  };

  const matchPropertiesToPreferences = (analysis: Record<string, string>) => {
    // Sample property data with attributes matching our analysis categories
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
          technology: "tech-forward"
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
          technology: "moderate tech"
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
          technology: "basic"
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
          technology: "tech-forward"
        }
      },
      {
        id: "5",
        title: "Green Community Townhouse",
        description: "Energy-efficient 3-bedroom townhouse in a walkable community with bike paths and parks.",
        price: "$580,000",
        imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvd25ob3VzZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
        address: "234 Green Way, Eco Village",
        attributes: {
          budget: "high",
          location: "suburban",
          size: "large",
          age: "new",
          community: "eco-conscious",
          education: "high priority",
          environment: "green spaces priority",
          lifestyle: "community-focused",
          mobility: "bike-friendly preference",
          technology: "tech-forward"
        }
      }
    ];
    
    // Score each property based on how well it matches user preferences
    const scoredProperties = allProperties.map(property => {
      let score = 0;
      const maxPossibleScore = Object.keys(analysis).length;
      
      // Compare each attribute from our analysis to the property
      Object.entries(analysis).forEach(([key, value]) => {
        if (property.attributes[key as keyof typeof property.attributes] === value) {
          score += 1;
        }
      });
      
      const matchPercentage = (score / maxPossibleScore) * 100;
      return {
        ...property,
        matchScore: matchPercentage
      };
    });
    
    // Return top 3 matching properties, sorted by match score
    return scoredProperties
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 3)
      .map(({ id, title, description, price, imageUrl, address, matchScore }) => ({
        id,
        title: `${title} (${Math.round(matchScore || 0)}% match)`,
        description,
        price,
        imageUrl,
        address
      }));
  };

  const handleShowRecommendations = () => {
    if (userPreferences.length === 0) {
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
    
    // Analyze user preferences to create a personalized profile
    const analysis = analyzePreferences();
    
    // Use the analysis to select the most suitable properties
    const matchedProperties = matchPropertiesToPreferences(analysis);
    
    // Generate personalized recommendation text
    setTimeout(() => {
      let recommendationText = "Based on your preferences, I've analyzed what matters most to you. ";
      
      // Add personalized insights based on their strongest preferences
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
      
      // Update properties for the recommendation component
      setSampleProperties(matchedProperties);
      setShowRecommendations(true);
    }, 1000);
  };

  // Sample property data for recommendations (will be dynamically updated)
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Parse user message for yes/no responses if a question is active
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
    
    // Handle recommendation request
    if (newMessage.toLowerCase().includes('recommend') || 
        newMessage.toLowerCase().includes('suggestion') || 
        newMessage.toLowerCase().includes('show me')) {
      handleShowRecommendations();
      return;
    }
    
    // Default response for other inputs
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're looking for specific information. To help you better, please use the menu options below to tell me more about your preferences, or simply answer yes/no to my questions.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setShowMainMenu(true);
      setShowRecommendations(false);
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
    setShowMainMenu(true);
    setActiveMenu(null);
    setCurrentQuestion(null);
    setShowRecommendations(false);
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full shadow-lg"
            variant="default"
          >
            <MessageCircle size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:max-w-md p-0 h-[80vh] flex flex-col">
          <SheetHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle>Home Buying Assistant</SheetTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={handleResetChat}
                >
                  Reset
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {showRecommendations && (
              <PropertyRecommendation properties={sampleProperties} />
            )}
          </div>
          
          {/* Yes/No Buttons for Current Question */}
          {currentQuestion && (
            <div className="px-4 pb-2 flex justify-center gap-4 mt-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-green-500 hover:bg-green-500/10" 
                onClick={() => handleAnswerQuestion('yes')}
              >
                <ThumbsUp size={16} className="text-green-500" />
                Yes
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-red-500 hover:bg-red-500/10" 
                onClick={() => handleAnswerQuestion('no')}
              >
                <ThumbsDown size={16} className="text-red-500" />
                No
              </Button>
            </div>
          )}
          
          {/* Menu Options */}
          {showMainMenu && !currentQuestion && (
            <div className="space-y-2 mt-2 px-4 pb-2">
              {mainMenuOptions.map(option => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="w-full justify-between text-left"
                  onClick={() => handleMenuSelect(option.id)}
                >
                  <span>{option.title}</span>
                  <ChevronRight size={16} />
                </Button>
              ))}
              {userPreferences.length > 0 && (
                <Button
                  variant="default"
                  className="w-full mt-2"
                  onClick={handleShowRecommendations}
                >
                  Show Recommended Properties ({userPreferences.length} preferences)
                </Button>
              )}
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send size={18} />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Chatbot;
