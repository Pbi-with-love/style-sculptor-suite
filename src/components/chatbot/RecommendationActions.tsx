
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp, Undo2, Save } from 'lucide-react';
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
  
  const handleSaveRecommendation = () => {
    toast.success("Recommendations saved to your account!");
  };
  
  return (
    <div className="mt-4 flex flex-col space-y-3">
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <Undo2 className="h-3.5 w-3.5" />
          Start Over
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveRecommendation}
          className="flex items-center gap-1"
        >
          <Save className="h-3.5 w-3.5" />
          Save
        </Button>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleFeedback(false)}
          className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        >
          <ThumbsDown className="h-4 w-4" />
          Not Helpful
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleFeedback(true)}
          className="flex items-center gap-1 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
        >
          <ThumbsUp className="h-4 w-4" />
          Helpful
        </Button>
      </div>
    </div>
  );
};

export default RecommendationActions;
