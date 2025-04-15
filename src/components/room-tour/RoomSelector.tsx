
import { Home, Sofa, Coffee, Bed, Bath } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoomData } from './types';

interface RoomSelectorProps {
  roomData: RoomData;
  activeRoom: string;
  setActiveRoom: (room: string) => void;
  disabled: boolean;
}

const RoomSelector = ({ roomData, activeRoom, setActiveRoom, disabled }: RoomSelectorProps) => {
  // Function to determine which icon to show based on room ID
  const getRoomIcon = (roomId: string) => {
    switch (roomId) {
      case 'living':
        return <Sofa size={14} />;
      case 'kitchen':
        return <Coffee size={14} />;
      case 'bedroom':
        return <Bed size={14} />;
      case 'bathroom':
        return <Bath size={14} />;
      default:
        return <Home size={14} />;
    }
  };

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
            {getRoomIcon(room.id)}
            {room.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default RoomSelector;
