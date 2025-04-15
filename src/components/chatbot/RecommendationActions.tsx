
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp, Undo2 } from 'lucide-react';
import { toast } from 'sonner';

interface RecommendationActionsProps {
  onReset: () => void;
}

const RecommendationActions = ({ onReset }: RecommendationActionsProps) => {
  const handleFeedback = (isPositive: boolean) => {
    if (isPositive) {
      toast.success("Thanks for your feedback! We'll use it to improve future recommendations.");
    } else {
      toast.info("Thanks for your feedback. We'll work on improving our recommendations.");
    }
  };
  
  return (
    <div className="mt-4 flex justify-between">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onReset}
        className="flex items-center gap-1"
      >
        <Undo2 className="h-3.5 w-3.5" />
        Start Over
      </Button>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleFeedback(false)}
          className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleFeedback(true)}
          className="hover:bg-green-50 hover:text-green-600 hover:border-green-200"
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendationActions;
