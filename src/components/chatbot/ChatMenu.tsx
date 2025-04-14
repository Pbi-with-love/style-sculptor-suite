
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { type MenuOption } from './types';

interface ChatMenuProps {
  menuOptions: MenuOption[];
  onMenuSelect: (menuId: string) => void;
}

const ChatMenu = ({ menuOptions, onMenuSelect }: ChatMenuProps) => {
  return (
    <div className="space-y-2 mt-4">
      <p className="text-sm font-medium">What would you like to know about?</p>
      <div className="grid grid-cols-1 gap-2">
        {menuOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="justify-start h-auto py-2 text-left"
            onClick={() => onMenuSelect(option.id)}
          >
            <span>{option.title}</span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatMenu;
