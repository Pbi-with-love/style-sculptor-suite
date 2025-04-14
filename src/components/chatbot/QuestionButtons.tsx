
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface QuestionButtonsProps {
  onAnswerQuestion: (answer: 'yes' | 'no') => void;
}

const QuestionButtons = ({ onAnswerQuestion }: QuestionButtonsProps) => {
  return (
    <div className="space-y-2 mt-4">
      <div className="flex justify-between space-x-2">
        <Button
          variant="outline"
          className="flex-1 justify-center"
          onClick={() => onAnswerQuestion('yes')}
        >
          <Check className="mr-2 h-4 w-4" /> Yes
        </Button>
        <Button
          variant="outline"
          className="flex-1 justify-center"
          onClick={() => onAnswerQuestion('no')}
        >
          <X className="mr-2 h-4 w-4" /> No
        </Button>
      </div>
    </div>
  );
};

export default QuestionButtons;
