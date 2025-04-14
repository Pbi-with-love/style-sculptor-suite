
import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { RoomData } from './types';
import RoomCanvas from './RoomCanvas';
import RoomSelector from './RoomSelector';
import CanvasControls from './CanvasControls';

interface RoomVisualizerProps {
  roomData: RoomData;
  propertyName: string;
}

const RoomVisualizer = ({ roomData, propertyName }: RoomVisualizerProps) => {
  const [activeRoom, setActiveRoom] = useState("living");
  const [showData, setShowData] = useState(false);
  const [dataCategory, setDataCategory] = useState("environmental");
  const [showFuturePredictions, setShowFuturePredictions] = useState(false);
  const [predictionYear, setPredictionYear] = useState(2025);

  return (
    <CardContent className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">{propertyName}</h2>
        
        <CanvasControls 
          showData={showData}
          setShowData={setShowData}
          dataCategory={dataCategory}
          setDataCategory={setDataCategory}
          showFuturePredictions={showFuturePredictions}
          setShowFuturePredictions={setShowFuturePredictions}
        />
      </div>
      
      <RoomCanvas 
        roomData={roomData}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        showData={showData}
        setShowData={setShowData}
        dataCategory={dataCategory}
        setDataCategory={setDataCategory}
        showFuturePredictions={showFuturePredictions}
        setShowFuturePredictions={setShowFuturePredictions}
        predictionYear={predictionYear}
        setPredictionYear={setPredictionYear}
      />
      
      <div className="mt-4">
        <RoomSelector 
          roomData={roomData}
          activeRoom={activeRoom}
          setActiveRoom={setActiveRoom}
          disabled={showFuturePredictions}
        />
      </div>
    </CardContent>
  );
};

export default RoomVisualizer;
