
import React, { useRef, useEffect, useState } from 'react';
import { RoomData } from './types';
import EnvironmentalDataView from './EnvironmentalDataView';
import DemographicsDataView from './DemographicsDataView';
import AmenitiesDataView from './AmenitiesDataView';
import { Cube, Eye, Database, ArrowDownUp, ArrowLeftRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [hoveredHotspotPosition, setHoveredHotspotPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'2D' | 'VR'>('2D');
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = `/rooms/${activeRoom}.png`;

    image.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Initial scaling to fit the canvas
      const initialScale = Math.min(
        canvas.width / image.width, 
        canvas.height / image.height
      ) * 0.9;
      
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

        // Apply VR effect if in VR mode
        if (viewMode === 'VR') {
          // Create stereoscopic view (simple implementation)
          // Left eye view
          ctx.save();
          ctx.translate(-image.width * 0.05, 0);
          ctx.drawImage(image, 0, 0);
          
          // Draw hotspots for left eye
          drawHotspots(ctx, -image.width * 0.05, 0);
          ctx.restore();
          
          // Right eye view
          ctx.save();
          ctx.translate(image.width * 0.55, 0);
          ctx.drawImage(image, 0, 0);
          
          // Draw hotspots for right eye
          drawHotspots(ctx, image.width * 0.55, 0);
          ctx.restore();
          
          // Add VR perspective indicator
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(image.width * 0.5 - 2, 0, 4, image.height);
        } else {
          // Regular 2D view
          ctx.drawImage(image, 0, 0);
          drawHotspots(ctx, 0, 0);
        }

        // Restore the transformation matrix
        ctx.restore();
      };

      const drawHotspots = (ctx: CanvasRenderingContext2D, offsetX = 0, offsetY = 0) => {
        if (showFuturePredictions) return;
        
        const currentRoom = roomData.rooms.find(room => room.id === activeRoom);
        if (currentRoom && 'hotspots' in currentRoom) {
          const hotspotsArray = (currentRoom as any).hotspots || [];
          hotspotsArray.forEach((hotspot: any) => {
            if (!showData || hotspot.dataField === dataCategory) {
              renderHotspot(ctx, hotspot.x + offsetX, hotspot.y + offsetY, hotspot.label, hotspot.value || 100);
            }
          });
        }
      };

      drawCanvas();
      setIsDataReady(true);
    };

    // Re-render when relevant props change
    const renderCanvas = () => {
      if (ctx && image.complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Save the current transformation matrix
        ctx.save();
        
        // Apply transformations (scaling and translation)
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);
        
        // Apply VR effect if in VR mode
        if (viewMode === 'VR') {
          // Create stereoscopic view (simple implementation)
          // Left eye view
          ctx.save();
          ctx.translate(-image.width * 0.05, 0);
          ctx.drawImage(image, 0, 0);
          
          // Draw hotspots for left eye
          const currentRoom = roomData.rooms.find(room => room.id === activeRoom);
          if (currentRoom && 'hotspots' in currentRoom && !showFuturePredictions) {
            const hotspotsArray = (currentRoom as any).hotspots || [];
            hotspotsArray.forEach((hotspot: any) => {
              if (!showData || hotspot.dataField === dataCategory) {
                renderHotspot(ctx, hotspot.x - image.width * 0.05, hotspot.y, hotspot.label, hotspot.value || 100);
              }
            });
          }
          ctx.restore();
          
          // Right eye view
          ctx.save();
          ctx.translate(image.width * 0.55, 0);
          ctx.drawImage(image, 0, 0);
          
          // Draw hotspots for right eye
          if (currentRoom && 'hotspots' in currentRoom && !showFuturePredictions) {
            const hotspotsArray = (currentRoom as any).hotspots || [];
            hotspotsArray.forEach((hotspot: any) => {
              if (!showData || hotspot.dataField === dataCategory) {
                renderHotspot(ctx, hotspot.x + image.width * 0.55, hotspot.y, hotspot.label, hotspot.value || 100);
              }
            });
          }
          ctx.restore();
          
          // Add VR perspective indicator
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(image.width * 0.5 - 2, 0, 4, image.height);
        } else {
          // Regular 2D view
          ctx.drawImage(image, 0, 0);
          
          // Draw hotspots
          const currentRoom = roomData.rooms.find(room => room.id === activeRoom);
          if (currentRoom && 'hotspots' in currentRoom && !showFuturePredictions) {
            const hotspotsArray = (currentRoom as any).hotspots || [];
            hotspotsArray.forEach((hotspot: any) => {
              if (!showData || hotspot.dataField === dataCategory) {
                renderHotspot(ctx, hotspot.x, hotspot.y, hotspot.label, hotspot.value || 100);
              }
            });
          }
        }
        
        // Restore the transformation matrix
        ctx.restore();
      }
    };

    const intervalId = setInterval(renderCanvas, 100);
    return () => clearInterval(intervalId);
  }, [activeRoom, roomData, showData, dataCategory, showFuturePredictions, offset, scale, viewMode]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setHoveredHotspotPosition({ x: e.clientX, y: e.clientY });
    
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
    const newScale = scale + (e.deltaY > 0 ? -zoomSpeed : zoomSpeed);
    
    setScale(Math.max(0.1, Math.min(5, newScale))); // Limit scale between 0.1 and 5
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

  const renderHotspot = (ctx: CanvasRenderingContext2D, hotspotX: number, hotspotY: number, label: string, value: number) => {
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
      ctx.fillText(`${label}: ${value}`, hotspotX - boxWidth / 2 + 10, hotspotY - boxHeight + 15);
      ctx.fillText(`Data Category: ${dataCategory}`, hotspotX - boxWidth / 2 + 10, hotspotY - boxHeight + 35);
      ctx.fillText(`Location: ${activeRoom}`, hotspotX - boxWidth / 2 + 10, hotspotY - boxHeight + 55);
      ctx.fillText(`Open Data Source: City DB`, hotspotX - boxWidth / 2 + 10, hotspotY - boxHeight + 75);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === '2D' ? 'VR' : '2D');
  };

  const zoomIn = () => {
    setScale(prev => Math.min(5, prev + 0.1));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(0.1, prev - 0.1));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end mb-3 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleViewMode}
          className="flex items-center gap-2"
        >
          {viewMode === '2D' ? <Cube className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {viewMode === '2D' ? 'Switch to VR' : 'Switch to 2D'}
        </Button>
        <Button variant="outline" size="sm" onClick={zoomIn}><ZoomIn className="h-4 w-4" /></Button>
        <Button variant="outline" size="sm" onClick={zoomOut}><ZoomOut className="h-4 w-4" /></Button>
        <Button
          variant={showData ? "default" : "outline"}
          size="sm"
          onClick={() => setShowData(!showData)}
        >
          <Database className="h-4 w-4 mr-1" />
          {showData ? 'Hide Data' : 'Show Data'}
        </Button>
      </div>
      
      <div className="flex flex-grow h-full">
        <div className={`${showData ? 'w-3/4 pr-3' : 'w-full'} h-full relative`}>
          <canvas
            ref={canvasRef}
            className="border border-gray-300 cursor-grab active:cursor-grabbing w-full h-full rounded-md"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleMouseWheel}
            onMouseLeave={handleMouseUp}
          />
          {viewMode === 'VR' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/10 p-2 rounded text-white backdrop-blur-sm">
                VR Mode (Stereoscopic View)
              </div>
            </div>
          )}
          {!isDataReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
        
        {showData && (
          <div className="w-1/4 p-4 border border-gray-200 rounded-md overflow-y-auto max-h-[500px]">
            {renderDataView()}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCanvas;
