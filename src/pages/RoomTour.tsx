
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/chatbot';
import { Card } from '@/components/ui/card';
import { roomData } from '../components/room-tour/roomData';
import { handleChatbotRoomQuery } from '../components/room-tour/roomChatUtils';
import RoomVisualizer from '../components/room-tour/RoomVisualizer';
import NeighborhoodInsights from '../components/room-tour/NeighborhoodInsights';
import { Info } from 'lucide-react';

const RoomTour = () => {
  const [showFuturePredictions, setShowFuturePredictions] = useState(false);
  const [predictionYear, setPredictionYear] = useState(2025);
  
  // Handle Chatbot query about the room
  const handleChatbotRoomQueryWrapper = (query: string) => {
    return handleChatbotRoomQuery(
      query, 
      roomData, 
      setShowFuturePredictions, 
      setPredictionYear
    );
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <h1 className="text-4xl font-playfair mb-4">Immersive Room Tours</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our architectural designs through interactive 3D virtual tours. Explore spaces from every angle and discover neighborhood insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="w-full h-[500px]">
              <RoomVisualizer 
                roomData={roomData}
                propertyName={roomData.propertyName}
              />
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <div className="p-4">
                <NeighborhoodInsights roomData={roomData} />
              </div>
            </Card>
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Ask our AI assistant about neighborhood insights, environmental factors, or to see future predictions for this area.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Try asking about future predictions, property values, demographics, or environmental trends!
          </p>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-50">
        <Chatbot chatbotId="room-tour-chatbot" handleMapQuery={handleChatbotRoomQueryWrapper} />
      </div>
      <Footer />
    </div>
  );
};

export default RoomTour;
