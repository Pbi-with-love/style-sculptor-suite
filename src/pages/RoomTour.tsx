
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Info, Eye, EyeOff, MapPin, Home, BarChart3, Users, ShieldCheck } from 'lucide-react';

// Mock data for 3D visualization
const roomData = {
  propertyName: "Modern Downtown Apartment",
  rooms: [
    { id: "living", name: "Living Room", size: "24 x 18 ft" },
    { id: "kitchen", name: "Kitchen", size: "16 x 14 ft" },
    { id: "bedroom1", name: "Master Bedroom", size: "18 x 16 ft" },
    { id: "bedroom2", name: "Guest Bedroom", size: "14 x 12 ft" },
    { id: "bathroom", name: "Bathroom", size: "10 x 8 ft" }
  ],
  environmentalData: {
    noiseLevel: 6.3,
    crimeRate: 4.2, 
    pollution: 5.1,
    greenSpaceAccess: 7.8,
    schoolQuality: 8.2
  },
  demographics: {
    totalPopulation: 12850,
    ageGroups: [
      { name: "0-18", percentage: 18 },
      { name: "19-35", percentage: 42 },
      { name: "36-65", percentage: 28 },
      { name: "65+", percentage: 12 }
    ],
    incomeLevel: "Above Average",
    educationLevel: "College Degree or Higher: 68%"
  },
  amenities: {
    hospitals: [
      { name: "City General Hospital", distance: "1.2 miles" },
      { name: "University Medical Center", distance: "2.4 miles" }
    ],
    schools: [
      { name: "Downtown Elementary", rating: "8/10", distance: "0.7 miles" },
      { name: "Central High School", rating: "9/10", distance: "1.1 miles" }
    ],
    parks: [
      { name: "Riverside Park", size: "24 acres", distance: "0.4 miles" },
      { name: "Memorial Gardens", size: "12 acres", distance: "1.5 miles" }
    ],
    shopping: [
      { name: "City Center Mall", distance: "0.3 miles" },
      { name: "Fresh Market Grocery", distance: "0.5 miles" }
    ]
  },
  futurePredictions: {
    environmentalTrends: [
      { year: 2025, airQuality: 7.4, greenSpace: 8.1, noiseLevel: 5.9 },
      { year: 2030, airQuality: 8.2, greenSpace: 8.5, noiseLevel: 5.2 },
      { year: 2035, airQuality: 8.7, greenSpace: 9.0, noiseLevel: 4.8 }
    ],
    populationTrends: [
      { year: 2025, population: 13500, medianAge: 34 },
      { year: 2030, population: 14200, medianAge: 36 },
      { year: 2035, population: 15000, medianAge: 38 }
    ],
    propertyValueTrends: [
      { year: 2025, estimatedValue: "$450,000", changePercent: "+4.2%" },
      { year: 2030, estimatedValue: "$520,000", changePercent: "+15.5%" },
      { year: 2035, estimatedValue: "$590,000", changePercent: "+13.5%" }
    ]
  }
};

const RoomTour = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRoom, setActiveRoom] = useState("living");
  const [showData, setShowData] = useState(false);
  const [dataCategory, setDataCategory] = useState("environmental");
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dataPoints, setDataPoints] = useState<{x: number, y: number, type: string, value: string}[]>([]);
  const [showFuturePredictions, setShowFuturePredictions] = useState(false);
  const [predictionYear, setPredictionYear] = useState(2025);
  
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
        
        // Store button coordinates for click handling
        // This will be used in the click handler
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
  
  // Handle Chatbot query about the room
  const handleChatbotRoomQuery = (query: string) => {
    const queryLower = query.toLowerCase();
    
    // Handle future prediction queries
    if (queryLower.includes('future') || queryLower.includes('predict') || queryLower.includes('forecast')) {
      const year = queryLower.includes('2025') ? 2025 : 
                  queryLower.includes('2030') ? 2030 : 
                  queryLower.includes('2035') ? 2035 : 2025;
      
      setPredictionYear(year);
      setShowFuturePredictions(true);
      
      return {
        success: true,
        message: `Showing future predictions for ${year}. You can view environmental trends, population changes, and property value forecasts.`,
      };
    }
    
    // Reset future predictions view if asked
    if (queryLower.includes('reset') || queryLower.includes('return') || queryLower.includes('back to room')) {
      setShowFuturePredictions(false);
      return {
        success: true,
        message: "Returning to normal room view.",
      };
    }
    
    if (queryLower.includes('noise') || queryLower.includes('quiet')) {
      return {
        success: true,
        message: `The noise level in this area is ${roomData.environmentalData.noiseLevel}/10, which is ${roomData.environmentalData.noiseLevel < 5 ? 'relatively quiet' : 'moderate to noisy'}.`,
      };
    }
    
    if (queryLower.includes('school') || queryLower.includes('education')) {
      return {
        success: true,
        message: `The nearest school is ${roomData.amenities.schools[0].name}, rated ${roomData.amenities.schools[0].rating}, located ${roomData.amenities.schools[0].distance} away. School quality in this area is rated ${roomData.environmentalData.schoolQuality}/10.`,
      };
    }
    
    if (queryLower.includes('hospital') || queryLower.includes('medical') || queryLower.includes('healthcare')) {
      return {
        success: true,
        message: `The nearest medical facility is ${roomData.amenities.hospitals[0].name}, located ${roomData.amenities.hospitals[0].distance} away.`,
      };
    }
    
    if (queryLower.includes('demographics') || queryLower.includes('population')) {
      return {
        success: true,
        message: `This area has a population of ${roomData.demographics.totalPopulation} people. ${roomData.demographics.ageGroups[1].percentage}% are young adults (19-35), ${roomData.demographics.ageGroups[0].percentage}% are children, and ${roomData.demographics.ageGroups[3].percentage}% are seniors.`,
      };
    }
    
    if (queryLower.includes('crime') || queryLower.includes('safe')) {
      return {
        success: true,
        message: `The crime rate in this area is ${roomData.environmentalData.crimeRate}/10, which is ${roomData.environmentalData.crimeRate < 5 ? 'relatively low' : 'moderate to high'}.`,
      };
    }
    
    if (queryLower.includes('property value') || queryLower.includes('worth') || queryLower.includes('price')) {
      return {
        success: true,
        message: `The current property value is estimated around $420,000. By ${roomData.futurePredictions.propertyValueTrends[1].year}, it's predicted to be worth ${roomData.futurePredictions.propertyValueTrends[1].estimatedValue}.`,
      };
    }
    
    return {
      success: false,
      message: "I don't have specific information about that. You can ask about noise levels, schools, hospitals, crime rates, demographics, or future predictions.",
    };
  };
  
  // Draw when component mounts or when activeRoom changes
  useEffect(() => {
    draw3DRoom();
  }, [activeRoom, showData, dataCategory, rotation, dataPoints, showFuturePredictions, predictionYear]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <h1 className="text-4xl font-playfair mb-4">Immersive Room Tours</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our architectural designs through interactive 3D virtual tours. Explore spaces from every angle and discover neighborhood insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="w-full h-[500px]">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-medium">{roomData.propertyName}</h2>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowFuturePredictions(!showFuturePredictions)}
                      className="flex items-center gap-1"
                    >
                      {showFuturePredictions ? "Exit Future View" : "Future Predictions"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowData(!showData)}
                      className="flex items-center gap-1"
                    >
                      {showData ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showData ? 'Hide Data' : 'Show Data'}
                    </Button>
                    
                    {showData && !showFuturePredictions && (
                      <div className="flex gap-1">
                        <Badge
                          variant={dataCategory === 'environmental' ? 'default' : 'outline'}
                          className="cursor-pointer flex items-center gap-1"
                          onClick={() => setDataCategory('environmental')}
                        >
                          <BarChart3 size={14} />
                          Environmental
                        </Badge>
                        <Badge
                          variant={dataCategory === 'demographics' ? 'default' : 'outline'}
                          className="cursor-pointer flex items-center gap-1"
                          onClick={() => setDataCategory('demographics')}
                        >
                          <Users size={14} />
                          Demographics
                        </Badge>
                        <Badge
                          variant={dataCategory === 'amenities' ? 'default' : 'outline'}
                          className="cursor-pointer flex items-center gap-1"
                          onClick={() => setDataCategory('amenities')}
                        >
                          <MapPin size={14} />
                          Amenities
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                <div 
                  className="flex-1 bg-gray-100 rounded-md overflow-hidden relative cursor-move"
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
                
                <div className="mt-4">
                  <TabsList className="w-full">
                    {roomData.rooms.map(room => (
                      <TabsTrigger 
                        key={room.id} 
                        value={room.id}
                        onClick={() => setActiveRoom(room.id)}
                        className={`flex items-center gap-1 ${activeRoom === room.id ? 'bg-primary text-primary-foreground' : ''}`}
                        disabled={showFuturePredictions}
                      >
                        <Home size={14} />
                        {room.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardContent className="p-4">
                <h3 className="text-xl font-medium mb-4">Neighborhood Insights</h3>
                
                <Tabs defaultValue="environmental">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="environmental" className="flex items-center gap-1">
                      <BarChart3 size={14} />
                      Environmental
                    </TabsTrigger>
                    <TabsTrigger value="demographics" className="flex items-center gap-1">
                      <Users size={14} />
                      Demographics
                    </TabsTrigger>
                    <TabsTrigger value="amenities" className="flex items-center gap-1">
                      <MapPin size={14} />
                      Amenities
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="environmental" className="space-y-4">
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-1">
                          <ShieldCheck size={16} className="text-primary" />
                          Noise Level
                        </span>
                        <span className={`font-bold ${roomData.environmentalData.noiseLevel > 7 ? 'text-red-500' : roomData.environmentalData.noiseLevel > 4 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {roomData.environmentalData.noiseLevel}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${roomData.environmentalData.noiseLevel > 7 ? 'bg-red-500' : roomData.environmentalData.noiseLevel > 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${(roomData.environmentalData.noiseLevel / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-1">
                          <ShieldCheck size={16} className="text-primary" />
                          Crime Rate
                        </span>
                        <span className={`font-bold ${roomData.environmentalData.crimeRate > 7 ? 'text-red-500' : roomData.environmentalData.crimeRate > 4 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {roomData.environmentalData.crimeRate}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${roomData.environmentalData.crimeRate > 7 ? 'bg-red-500' : roomData.environmentalData.crimeRate > 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${(roomData.environmentalData.crimeRate / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-1">
                          <ShieldCheck size={16} className="text-primary" />
                          Air Quality
                        </span>
                        <span className={`font-bold ${(10 - roomData.environmentalData.pollution) < 3 ? 'text-red-500' : (10 - roomData.environmentalData.pollution) < 6 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {10 - roomData.environmentalData.pollution}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${(10 - roomData.environmentalData.pollution) < 3 ? 'bg-red-500' : (10 - roomData.environmentalData.pollution) < 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${((10 - roomData.environmentalData.pollution) / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-1">
                          <ShieldCheck size={16} className="text-primary" />
                          Green Space
                        </span>
                        <span className={`font-bold ${roomData.environmentalData.greenSpaceAccess < 3 ? 'text-red-500' : roomData.environmentalData.greenSpaceAccess < 6 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {roomData.environmentalData.greenSpaceAccess}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${roomData.environmentalData.greenSpaceAccess < 3 ? 'bg-red-500' : roomData.environmentalData.greenSpaceAccess < 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${(roomData.environmentalData.greenSpaceAccess / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-md">
                      <h4 className="font-medium mb-2">Future Environmental Trends</h4>
                      
                      <div className="space-y-1">
                        {roomData.futurePredictions.environmentalTrends.map(trend => (
                          <div key={trend.year} className="flex items-center justify-between text-sm">
                            <span>{trend.year}</span>
                            <div className="flex gap-2">
                              <span className="text-green-500">Air: {trend.airQuality}</span>
                              <span className="text-blue-500">Green: {trend.greenSpace}</span>
                              <span className="text-amber-500">Noise: {trend.noiseLevel}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="demographics">
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium">Population</div>
                        <div className="text-2xl text-primary font-bold">{roomData.demographics.totalPopulation.toLocaleString()}</div>
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2">Age Distribution</div>
                        {roomData.demographics.ageGroups.map((group, index) => (
                          <div key={group.name} className="mb-2">
                            <div className="flex justify-between text-sm">
                              <span>{group.name}</span>
                              <span className="font-semibold">{group.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full`}
                                style={{ 
                                  width: `${group.percentage}%`,
                                  backgroundColor: `hsl(${260 + index * 15}, 70%, 60%)`
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium">Income Level</div>
                        <div className="text-primary font-semibold">{roomData.demographics.incomeLevel}</div>
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium">Education</div>
                        <div className="text-primary font-semibold">{roomData.demographics.educationLevel}</div>
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <h4 className="font-medium mb-2">Future Population Trends</h4>
                        
                        {roomData.futurePredictions.populationTrends.map(trend => (
                          <div key={trend.year} className="mb-2">
                            <div className="font-medium text-sm">{trend.year}</div>
                            <div className="flex justify-between text-sm">
                              <span>Population:</span>
                              <span className="font-semibold">{trend.population.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Median Age:</span>
                              <span className="font-semibold">{trend.medianAge} years</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities">
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2 flex items-center gap-1">
                          <MapPin size={16} className="text-red-500" />
                          Hospitals
                        </div>
                        {roomData.amenities.hospitals.map(hospital => (
                          <div key={hospital.name} className="flex justify-between mb-1">
                            <span>{hospital.name}</span>
                            <span className="text-sm text-primary font-semibold">{hospital.distance}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2 flex items-center gap-1">
                          <MapPin size={16} className="text-blue-500" />
                          Schools
                        </div>
                        {roomData.amenities.schools.map(school => (
                          <div key={school.name} className="mb-1">
                            <div className="flex justify-between">
                              <span>{school.name}</span>
                              <span className="text-sm text-primary font-semibold">{school.distance}</span>
                            </div>
                            <div className="text-sm text-green-600 font-semibold">Rating: {school.rating}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2 flex items-center gap-1">
                          <MapPin size={16} className="text-green-500" />
                          Parks
                        </div>
                        {roomData.amenities.parks.map(park => (
                          <div key={park.name} className="mb-1">
                            <div className="flex justify-between">
                              <span>{park.name}</span>
                              <span className="text-sm text-primary font-semibold">{park.distance}</span>
                            </div>
                            <div className="text-sm text-gray-600">Size: {park.size}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2 flex items-center gap-1">
                          <MapPin size={16} className="text-purple-500" />
                          Shopping
                        </div>
                        {roomData.amenities.shopping.map(shop => (
                          <div key={shop.name} className="flex justify-between mb-1">
                            <span>{shop.name}</span>
                            <span className="text-sm text-primary font-semibold">{shop.distance}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <h4 className="font-medium mb-2">Property Value Forecast</h4>
                        
                        {roomData.futurePredictions.propertyValueTrends.map(trend => (
                          <div key={trend.year} className="flex justify-between items-center mb-1">
                            <span>{trend.year}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{trend.estimatedValue}</span>
                              <span className={trend.changePercent.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                                {trend.changePercent}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Ask our AI assistant about neighborhood insights, environmental factors, or to see future predictions for this area.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Try asking about future predictions, property values, demographics, or environmental trends!
          </p>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-50">
        <Chatbot chatbotId="room-tour-chatbot" handleMapQuery={handleChatbotRoomQuery} />
      </div>
      <Footer />
    </div>
  );
};

export default RoomTour;
