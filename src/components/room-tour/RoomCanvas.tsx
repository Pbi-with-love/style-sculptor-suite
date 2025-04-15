import React, { useRef, useEffect, useState } from 'react';
import { RoomData } from './types';
import EnvironmentalDataView from './EnvironmentalDataView';
import DemographicsDataView from './DemographicsDataView';
import AmenitiesDataView from './AmenitiesDataView';

interface RoomCanvasProps {
  roomData: RoomData;
  activeRoom: string;
  setActiveRoom: (room: string) => void;
  showData: boolean;
  setShowData: (show: boolean) => void;
  dataCategory: string;
  setDataCategory: (category: string) => void;
  showFuturePredictions: boolean;
  setShowFuturePredictions: (show: boolean) => void;
  predictionYear: number;
  setPredictionYear: (year: number) => void;
}

const RoomCanvas = ({ 
  roomData, 
  activeRoom, 
  setActiveRoom,
  showData,
  setShowData,
  dataCategory,
  setDataCategory,
  showFuturePredictions,
  setShowFuturePredictions,
  predictionYear,
  setPredictionYear
}: RoomCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = `/rooms/${activeRoom}.png`;

    image.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // Initial scaling to fit the canvas
      const initialScale = Math.min(canvas.width / image.width, canvas.height / image.height);
      setScale(initialScale);
      setOffset({
        x: (canvas.width - image.width * initialScale) / 2,
        y: (canvas.height - image.height * initialScale) / 2,
      });

      // Function to draw everything on the canvas
      const drawCanvas = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Save the current transformation matrix
        ctx.save();

        // Apply transformations (scaling and translation)
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);

        // Draw the base image
        ctx.drawImage(image, 0, 0);

        // Draw hotspots
        if (!showFuturePredictions) {
          roomData.rooms.find(room => room.id === activeRoom)?.hotspots?.forEach(hotspot => {
            if (showData && hotspot.dataField === dataCategory) {
              const hotspotX = hotspot.x;
              const hotspotY = hotspot.y;
              const dataValue = roomData.environmentalData.noiseLevel; // Example data value
              renderHotspot(ctx, hotspotX, hotspotY, hotspot.label, 100);
            }
          });
        }

        // Restore the transformation matrix
        ctx.restore();
      };

      drawCanvas();
    };
  }, [activeRoom, roomData, showData, dataCategory, showFuturePredictions]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setOffset(prevOffset => ({
      x: prevOffset.x + deltaX,
      y: prevOffset.y + deltaY,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newScale = scale + e.deltaY * -zoomSpeed;
    
    setScale(Math.max(0.1, newScale)); // Prevent scale from going too small
  };

  const isHoveredHotspot = (hotspotX: number, hotspotY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const rect = canvas.getBoundingClientRect();
    const mouseX = (hoveredHotspotPosition.x - rect.left - offset.x) / scale;
    const mouseY = (hoveredHotspotPosition.y - rect.top - offset.y) / scale;

    const distance = Math.sqrt((mouseX - hotspotX) ** 2 + (mouseY - hotspotY) ** 2);
    return distance <= 10; // 10 is the radius of the hotspot
  };

  const [hoveredHotspotPosition, setHoveredHotspotPosition] = useState({ x: 0, y: 0 });

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setHoveredHotspotPosition({ x: e.clientX, y: e.clientY });
  };

  const renderDataView = () => {
    if (!showData) return null;

    switch (dataCategory) {
      case 'environmental':
        return <EnvironmentalDataView 
          environmentalData={roomData.environmentalData}
          futurePredictions={roomData.futurePredictions.environmentalTrends}
        />;
      case 'demographics':
        return <DemographicsDataView 
          demographics={roomData.demographics}
          populationTrends={roomData.futurePredictions.populationTrends}
        />;
      case 'amenities':
        return <AmenitiesDataView 
          amenities={roomData.amenities}
          propertyValueTrends={roomData.futurePredictions.propertyValueTrends}
        />;
      default:
        return <div>No data to display.</div>;
    }
  };

  const renderHotspot = (ctx: CanvasRenderingContext2D, hotspotX: number, hotspotY: number, label: string, barMaxHeight: number) => {
    // Draw circle
    ctx.beginPath();
    ctx.arc(hotspotX, hotspotY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw label
    ctx.font = '14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(label, hotspotX, hotspotY - 15);
    
    // Draw info box if hovered
    if (isHoveredHotspot(hotspotX, hotspotY)) {
      // Draw box
      const boxWidth = 150;
      const boxHeight = 100;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(hotspotX - boxWidth / 2, hotspotY - boxHeight - 20, boxWidth, boxHeight);
      ctx.strokeStyle = '#333';
      ctx.strokeRect(hotspotX - boxWidth / 2, hotspotY - boxHeight - 20, boxWidth, boxHeight);
      
      // Draw content
      ctx.fillStyle = '#333';
      ctx.textAlign = 'left';
      ctx.font = '12px Arial';
      ctx.fillText(`Information about ${label}`, hotspotX - boxWidth / 2 + 10, hotspotY - boxHeight - 5);
      // Add more text content as needed
    }
  };

  return (
    <div className="flex h-full">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 cursor-grab active:cursor-grabbing flex-grow"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleMouseWheel}
        onMouseLeave={handleMouseUp}
        onMouseOver={handleCanvasMouseMove}
      />
      
      {showData && (
        <div className="w-1/4 p-4 border border-gray-200 rounded-md">
          {renderDataView()}
        </div>
      )}
    </div>
  );
};

export default RoomCanvas;
