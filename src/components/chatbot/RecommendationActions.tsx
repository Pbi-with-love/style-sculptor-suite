
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface RecommendationActionsProps {
  onReset: () => void;
}

const RecommendationActions = ({ onReset }: RecommendationActionsProps) => {
  return (
    <div className="mt-4 flex justify-between">
      <Button variant="outline" size="sm" onClick={onReset}>
        Start Over
      </Button>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => {}}>
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => {}}>
          <ThumbsUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendationActions;
