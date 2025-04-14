
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all mb-4 mr-4"
      aria-label="Open chat"
    >
      <Bot className="w-6 h-6" />
    </Button>
  );
};

export default ChatbotButton;
