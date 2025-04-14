
import { useState } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatbotContent from './ChatbotContent';

interface ChatbotProps {
  chatbotId?: string;
  handleMapQuery?: (query: string) => {
    success: boolean;
    message: string;
    location?: { lat: number; lng: number };
  };
}

const Chatbot = ({ chatbotId = 'default-chatbot', handleMapQuery }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <ChatbotButton onClick={() => setIsOpen(true)} />
      <ChatbotContent 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        chatbotId={chatbotId}
        handleMapQuery={handleMapQuery}
      />
    </div>
  );
};

export default Chatbot;
