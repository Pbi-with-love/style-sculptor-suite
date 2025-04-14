
import { Home } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoomData } from './types';

interface RoomSelectorProps {
  roomData: RoomData;
  activeRoom: string;
  setActiveRoom: (room: string) => void;
  disabled: boolean;
}

const RoomSelector = ({ roomData, activeRoom, setActiveRoom, disabled }: RoomSelectorProps) => {
  return (
    <Tabs defaultValue={activeRoom}>
      <TabsList className="w-full">
        {roomData.rooms.map(room => (
          <TabsTrigger 
            key={room.id} 
            value={room.id}
            onClick={() => setActiveRoom(room.id)}
            className="flex items-center gap-1"
            disabled={disabled}
          >
            <Home size={14} />
            {room.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default RoomSelector;
