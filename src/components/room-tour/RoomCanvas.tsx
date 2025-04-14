
import { useEffect, useRef, useState } from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, BarChart3, Users, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoomData } from './types';

interface RoomCanvasProps {
  roomData: RoomData;
  activeRoom: string;
  setActiveRoom: (roomId: string) => void;
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
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dataPoints, setDataPoints] = useState<{x: number, y: number, type: string, value: string}[]>([]);
  
  // Function to handle mouse down for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  
  // Function to handle mouse move for rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const delta = e.clientX - startX;
      setRotation(prev => prev + delta * 0.01);
      setStartX(e.clientX);
    }
  };
  
  // Function to handle mouse up to stop rotation
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Function to handle 3D drawing
  const draw3DRoom = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up colors
    const wallColor = '#f5f5f5';
    const floorColor = '#e0e0e0';
    const accentColor = '#9b87f5'; // Primary purple from color palette
    const secondaryColor = '#7E69AB'; // Secondary purple
    const shadowColor = 'rgba(0, 0, 0, 0.2)';
    
    // Apply rotation transformation
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    // Draw 3D room (enhanced pseudo-3D)
    // Floor
    ctx.fillStyle = floorColor;
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(400, 250);
    ctx.lineTo(500, 350);
    ctx.lineTo(50, 350);
    ctx.closePath();
    ctx.fill();
    
    // Add floor grid for depth perception
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 10; i++) {
      const y = 250 + (i * 10);
      const startX = 100 - (i * 5);
      const endX = 400 + (i * 10);
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
    
    for (let i = 0; i < 10; i++) {
      const x = 100 + (i * 30);
      const startY = 250;
      const endY = 350;
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x + 45, endY);
      ctx.stroke();
    }
    
    // Wall 1 (back)
    ctx.fillStyle = wallColor;
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(100, 100);
    ctx.lineTo(400, 100);
    ctx.lineTo(400, 250);
    ctx.closePath();
    ctx.fill();
    
    // Wall 2 (side)
    ctx.fillStyle = '#eaeaea';
    ctx.beginPath();
    ctx.moveTo(400, 250);
    ctx.lineTo(400, 100);
    ctx.lineTo(500, 150);
    ctx.lineTo(500, 350);
    ctx.closePath();
    ctx.fill();
    
    // Shadow effect for dimension
    ctx.fillStyle = shadowColor;
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(100, 100);
    ctx.lineTo(110, 110);
    ctx.lineTo(110, 260);
    ctx.closePath();
    ctx.fill();
    
    // Room items based on active room
    if (activeRoom === "living") {
      // Draw sofa
      ctx.fillStyle = secondaryColor;
      ctx.beginPath();
      ctx.rect(150, 200, 150, 40);
      ctx.fill();
      
      // Sofa back
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.rect(150, 170, 150, 30);
      ctx.fill();
      
      // Sofa shadow
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.rect(150, 240, 150, 10);
      ctx.fill();
      
      // Coffee table
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.rect(200, 150, 80, 40);
      ctx.fill();
      
      // TV
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.rect(250, 110, 100, 10);
      ctx.fill();
      
      // Window
      ctx.fillStyle = '#1EAEDB';
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.rect(120, 120, 80, 80);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      
      // Window frame
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2;
      ctx.strokeRect(120, 120, 80, 80);
      
      // Add plants for decor
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.arc(350, 180, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Data points for living room (when data view is active)
      setDataPoints([
        { x: 175, y: 140, type: 'noise', value: roomData.environmentalData.noiseLevel.toString() + "/10" },
        { x: 300, y: 180, type: 'green', value: roomData.environmentalData.greenSpaceAccess.toString() + "/10" },
        { x: 250, y: 220, type: 'crime', value: roomData.environmentalData.crimeRate.toString() + "/10" }
      ]);
    } else if (activeRoom === "kitchen") {
      // Counter
      ctx.fillStyle = '#ddd';
      ctx.beginPath();
      ctx.rect(150, 220, 200, 20);
      ctx.fill();
      
      // Island
      ctx.fillStyle = '#ddd';
      ctx.beginPath();
      ctx.rect(200, 150, 100, 50);
      ctx.fill();
      
      // Island shadow
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.rect(200, 200, 100, 10);
      ctx.fill();
      
      // Appliances
      ctx.fillStyle = '#999';
      ctx.beginPath();
      ctx.rect(350, 150, 30, 60);
      ctx.rect(150, 150, 30, 30);
      ctx.fill();
      
      // Window
      ctx.fillStyle = '#1EAEDB';
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.rect(320, 110, 60, 30);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      
      // Window frame
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2;
      ctx.strokeRect(320, 110, 60, 30);
      
      // Kitchen cabinets
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.rect(150, 110, 150, 30);
      ctx.fill();
      
      // Data points for kitchen
      setDataPoints([
        { x: 230, y: 130, type: 'noise', value: roomData.environmentalData.noiseLevel.toString() + "/10" },
        { x: 350, y: 200, type: 'pollution', value: roomData.environmentalData.pollution.toString() + "/10" }
      ]);
    } else if (activeRoom === "bedroom1") {
      // Bed
      ctx.fillStyle = '#e6e6fa';
      ctx.beginPath();
      ctx.rect(150, 150, 150, 90);
      ctx.fill();
      
      // Bed frame
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.rect(140, 240, 170, 10);
      ctx.rect(140, 150, 10, 90);
      ctx.fill();
      
      // Pillows
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.rect(160, 160, 40, 30);
      ctx.rect(210, 160, 40, 30);
      ctx.fill();
      
      // Nightstand
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.rect(310, 180, 40, 40);
      ctx.fill();
      
      // Lamp on nightstand
      ctx.fillStyle = '#FFF3E0';
      ctx.beginPath();
      ctx.arc(330, 170, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Dresser
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.rect(150, 110, 100, 30);
      ctx.fill();
      
      // Window
      ctx.fillStyle = '#1EAEDB';
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.rect(350, 120, 40, 60);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      
      // Window frame
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2;
      ctx.strokeRect(350, 120, 40, 60);
      
      // Data points for bedroom
      setDataPoints([
        { x: 220, y: 200, type: 'noise', value: roomData.environmentalData.noiseLevel.toString() + "/10" },
        { x: 350, y: 210, type: 'schools', value: roomData.environmentalData.schoolQuality.toString() + "/10" }
      ]);
    }
    
    // Restore canvas state after rotation
    ctx.restore();
    
    // Add data visualizations if enabled - draw after restore so they don't rotate
    if (showData) {
      // Draw data points with icons
      ctx.font = 'bold 14px Arial';
      
      dataPoints.forEach(point => {
        // Draw connecting line
        ctx.strokeStyle = '#9b87f5';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.x - 40, point.y - 40);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw data bubble
        ctx.fillStyle = 'rgba(155, 135, 245, 0.9)';
        ctx.beginPath();
        ctx.arc(point.x - 40, point.y - 40, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw value
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(point.value, point.x - 40, point.y - 40);
        
        // Draw icon or label for the data type
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        
        let label = '';
        if (point.type === 'noise') label = 'Noise';
        if (point.type === 'green') label = 'Green';
        if (point.type === 'schools') label = 'Schools';
        if (point.type === 'crime') label = 'Safety';
        if (point.type === 'pollution') label = 'Air';
        
        ctx.fillText(label, point.x - 40, point.y - 25);
      });
      
      // Draw demographics overlay if that data category is selected
      if (dataCategory === "demographics") {
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(155, 135, 245, 0.8)';
        ctx.fillRect(50, 50, 220, 140);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Neighborhood Demographics', 160, 70);
        
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        
        // Draw age distribution as mini bar chart
        ctx.fillText('Age Distribution:', 70, 95);
        
        const barWidth = 30;
        const barSpacing = 10;
        const barMaxHeight = 40;
        const startX = 70;
        const startY = 110;
        
        roomData.demographics.ageGroups.forEach((group, index) => {
          const barHeight = (group.percentage / 100) * barMaxHeight;
          const x = startX + index * (barWidth + barSpacing);
          const y = startY + barMaxHeight - barHeight;
          
          // Draw bar
          ctx.fillStyle = `hsl(${260 + index * 15}, 70%, 70%)`;
          ctx.fillRect(x, y, barWidth, barHeight);
          
          // Draw label
          ctx.fillStyle = '#fff';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(group.name, x + barWidth/2, startY + barMaxHeight + 15);
          ctx.fillText(`${group.percentage}%`, x + barWidth/2, y - 5);
        });
      }
      
      // Draw amenities info if that category is selected
      else if (dataCategory === "amenities") {
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(30, 174, 219, 0.8)';
        ctx.fillRect(420, 50, 170, 180);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Nearby Amenities', 505, 70);
        
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        
        // Draw nearest hospital
        ctx.fillText('Hospital:', 430, 95);
        ctx.font = '10px Arial';
        ctx.fillText(roomData.amenities.hospitals[0].name, 430, 110);
        ctx.fillText(roomData.amenities.hospitals[0].distance, 430, 125);
        
        // Draw nearest school
        ctx.font = '12px Arial';
        ctx.fillText('School:', 430, 145);
        ctx.font = '10px Arial';
        ctx.fillText(roomData.amenities.schools[0].name, 430, 160);
        ctx.fillText(`${roomData.amenities.schools[0].rating} (${roomData.amenities.schools[0].distance})`, 430, 175);
        
        // Draw nearest park
        ctx.font = '12px Arial';
        ctx.fillText('Park:', 430, 195);
        ctx.font = '10px Arial';
        ctx.fillText(roomData.amenities.parks[0].name, 430, 210);
        ctx.fillText(roomData.amenities.parks[0].distance, 430, 225);
      }
    }
    
    // Draw future predictions if enabled
    if (showFuturePredictions) {
      const predictions = roomData.futurePredictions;
      const yearData = predictions.environmentalTrends.find(p => p.year === predictionYear) || predictions.environmentalTrends[0];
      const populationData = predictions.populationTrends.find(p => p.year === predictionYear) || predictions.populationTrends[0];
      const valueData = predictions.propertyValueTrends.find(p => p.year === predictionYear) || predictions.propertyValueTrends[0];
      
      // Background overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Future Prediction: ${predictionYear}`, canvas.width / 2, 40);
      
      // Draw prediction panels
      const panels = [
        {
          title: "Environmental Outlook",
          values: [
            { label: "Air Quality", value: `${yearData.airQuality}/10`, color: yearData.airQuality > 7 ? '#4CAF50' : '#FFC107' },
            { label: "Green Space", value: `${yearData.greenSpace}/10`, color: yearData.greenSpace > 7 ? '#4CAF50' : '#FFC107' },
            { label: "Noise Level", value: `${yearData.noiseLevel}/10`, color: yearData.noiseLevel < 5 ? '#4CAF50' : '#FFC107' }
          ],
          x: 120,
          y: 80
        },
        {
          title: "Population Trends",
          values: [
            { label: "Population", value: populationData.population.toLocaleString(), color: '#64B5F6' },
            { label: "Median Age", value: `${populationData.medianAge} years`, color: '#64B5F6' }
          ],
          x: 320,
          y: 80
        },
        {
          title: "Property Value",
          values: [
            { label: "Estimated Value", value: valueData.estimatedValue, color: '#9575CD' },
            { label: "Change", value: valueData.changePercent, color: valueData.changePercent.startsWith('+') ? '#4CAF50' : '#F44336' }
          ],
          x: 220,
          y: 220
        }
      ];
      
      // Draw each prediction panel
      panels.forEach(panel => {
        // Panel background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(panel.x - 90, panel.y - 20, 180, 30 + panel.values.length * 30);
        
        // Panel title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(panel.title, panel.x, panel.y);
        
        // Panel values
        ctx.font = '14px Arial';
        panel.values.forEach((item, index) => {
          ctx.textAlign = 'left';
          ctx.fillText(item.label, panel.x - 80, panel.y + 20 + (index * 30));
          
          ctx.textAlign = 'right';
          ctx.fillStyle = item.color;
          ctx.fillText(item.value, panel.x + 80, panel.y + 20 + (index * 30));
          ctx.fillStyle = '#ffffff';
        });
      });
      
      // Year selection buttons
      const years = [2025, 2030, 2035];
      const buttonWidth = 60;
      const buttonSpacing = 20;
      const startButtonX = (canvas.width - (buttonWidth * years.length + buttonSpacing * (years.length - 1))) / 2;
      const buttonY = canvas.height - 50;
      
      years.forEach((year, index) => {
        const x = startButtonX + (buttonWidth + buttonSpacing) * index;
        
        // Button background
        ctx.fillStyle = year === predictionYear ? '#9b87f5' : 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x, buttonY, buttonWidth, 30);
        
        // Button text
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(year.toString(), x + buttonWidth / 2, buttonY + 15);
      });
    }
    
    // Room name - always show
    const currentRoom = roomData.rooms.find(room => room.id === activeRoom);
    if (currentRoom) {
      ctx.fillStyle = '#9b87f5';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(currentRoom.name, 30, 30);
      ctx.font = '14px Arial';
      ctx.fillText(`Size: ${currentRoom.size}`, 30, 50);
    }
  };
  
  // Function to handle canvas click for year selection in future predictions
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!showFuturePredictions) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if the click is on one of the year buttons
    const years = [2025, 2030, 2035];
    const buttonWidth = 60;
    const buttonSpacing = 20;
    const startButtonX = (canvas.width - (buttonWidth * years.length + buttonSpacing * (years.length - 1))) / 2;
    const buttonY = canvas.height - 50;
    
    years.forEach((year, index) => {
      const buttonX = startButtonX + (buttonWidth + buttonSpacing) * index;
      
      if (
        x >= buttonX && 
        x <= buttonX + buttonWidth && 
        y >= buttonY && 
        y <= buttonY + 30
      ) {
        setPredictionYear(year);
      }
    });
  };

  // Draw when component mounts or when relevant props change
  useEffect(() => {
    draw3DRoom();
  }, [activeRoom, showData, dataCategory, rotation, dataPoints, showFuturePredictions, predictionYear]);

  return (
    <div className="flex-1 bg-gray-100 rounded-md overflow-hidden relative cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas 
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-full"
        onClick={handleCanvasClick}
      />
      
      {/* Drag instructions overlay */}
      <div className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-1 rounded flex items-center gap-1">
        <Info size={12} />
        Click and drag to rotate view
      </div>
      
      {showData && !showFuturePredictions && (
        <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
          Data points are highlighted in purple
        </div>
      )}
      
      {showFuturePredictions && (
        <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
          Future prediction mode - Click on years to change view
        </div>
      )}
    </div>
  );
};

export default RoomCanvas;
