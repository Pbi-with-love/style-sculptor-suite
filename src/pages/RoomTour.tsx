
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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
  }
};

const RoomTour = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRoom, setActiveRoom] = useState("living");
  const [showData, setShowData] = useState(false);
  const [dataCategory, setDataCategory] = useState("environmental");
  
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
    const accentColor = '#a3e635';
    const shadowColor = 'rgba(0, 0, 0, 0.2)';
    
    // Draw 3D room (simple pseudo-3D)
    ctx.fillStyle = floorColor;
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(400, 250);
    ctx.lineTo(500, 350);
    ctx.lineTo(50, 350);
    ctx.closePath();
    ctx.fill();
    
    // Wall 1
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
    
    // Room items based on active room
    if (activeRoom === "living") {
      // Draw sofa
      ctx.fillStyle = '#b0c4de';
      ctx.beginPath();
      ctx.rect(150, 200, 150, 40);
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
      
      // Appliances
      ctx.fillStyle = '#999';
      ctx.beginPath();
      ctx.rect(350, 150, 30, 60);
      ctx.rect(150, 150, 30, 30);
      ctx.fill();
    } else if (activeRoom === "bedroom1") {
      // Bed
      ctx.fillStyle = '#e6e6fa';
      ctx.beginPath();
      ctx.rect(150, 150, 150, 90);
      ctx.fill();
      
      // Nightstand
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.rect(310, 180, 40, 40);
      ctx.fill();
      
      // Dresser
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.rect(150, 110, 100, 30);
      ctx.fill();
    }
    
    // Add data visualizations if enabled
    if (showData) {
      // Semi-transparent overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(50, 50, 300, 100);
      
      ctx.fillStyle = '#333';
      ctx.font = '14px Arial';
      
      if (dataCategory === "environmental") {
        ctx.fillText(`Noise Level: ${roomData.environmentalData.noiseLevel}/10`, 70, 70);
        ctx.fillText(`Crime Rate: ${roomData.environmentalData.crimeRate}/10`, 70, 90);
        ctx.fillText(`Air Quality: ${10 - roomData.environmentalData.pollution}/10`, 70, 110);
        ctx.fillText(`Green Space: ${roomData.environmentalData.greenSpaceAccess}/10`, 70, 130);
      } else if (dataCategory === "demographics") {
        ctx.fillText(`Population: ${roomData.demographics.totalPopulation}`, 70, 70);
        ctx.fillText(`Adults (19-65): ${roomData.demographics.ageGroups[1].percentage + roomData.demographics.ageGroups[2].percentage}%`, 70, 90);
        ctx.fillText(`Children (0-18): ${roomData.demographics.ageGroups[0].percentage}%`, 70, 110);
        ctx.fillText(`Seniors (65+): ${roomData.demographics.ageGroups[3].percentage}%`, 70, 130);
      } else if (dataCategory === "amenities") {
        ctx.fillText(`Nearest Hospital: ${roomData.amenities.hospitals[0].name} (${roomData.amenities.hospitals[0].distance})`, 70, 70);
        ctx.fillText(`Nearest School: ${roomData.amenities.schools[0].name} (${roomData.amenities.schools[0].distance})`, 70, 90);
        ctx.fillText(`Nearest Park: ${roomData.amenities.parks[0].name} (${roomData.amenities.parks[0].distance})`, 70, 110);
        ctx.fillText(`Nearest Shopping: ${roomData.amenities.shopping[0].name} (${roomData.amenities.shopping[0].distance})`, 70, 130);
      }
    }
    
    // Room name
    const currentRoom = roomData.rooms.find(room => room.id === activeRoom);
    if (currentRoom) {
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 20px Arial';
      ctx.fillText(currentRoom.name, 30, 30);
      ctx.font = '14px Arial';
      ctx.fillText(`Size: ${currentRoom.size}`, 30, 50);
    }
  };
  
  // Handle Chatbot query about the room
  const handleChatbotRoomQuery = (query: string) => {
    const queryLower = query.toLowerCase();
    
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
    
    return {
      success: false,
      message: "I don't have specific information about that. You can ask about noise levels, schools, hospitals, crime rates, or demographics in this area.",
    };
  };
  
  // Draw when component mounts or when activeRoom changes
  useEffect(() => {
    draw3DRoom();
  }, [activeRoom, showData, dataCategory]);
  
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
                      onClick={() => setShowData(!showData)}
                    >
                      {showData ? 'Hide Data' : 'Show Data'}
                    </Button>
                    
                    {showData && (
                      <div className="flex gap-1">
                        <Badge
                          variant={dataCategory === 'environmental' ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => setDataCategory('environmental')}
                        >
                          Environmental
                        </Badge>
                        <Badge
                          variant={dataCategory === 'demographics' ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => setDataCategory('demographics')}
                        >
                          Demographics
                        </Badge>
                        <Badge
                          variant={dataCategory === 'amenities' ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => setDataCategory('amenities')}
                        >
                          Amenities
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 bg-gray-100 rounded-md overflow-hidden">
                  <canvas 
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full h-full"
                  />
                </div>
                
                <div className="mt-4">
                  <TabsList className="w-full">
                    {roomData.rooms.map(room => (
                      <TabsTrigger 
                        key={room.id} 
                        value={room.id}
                        onClick={() => setActiveRoom(room.id)}
                        className={activeRoom === room.id ? 'bg-primary text-primary-foreground' : ''}
                      >
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
                    <TabsTrigger value="environmental">Environmental</TabsTrigger>
                    <TabsTrigger value="demographics">Demographics</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="environmental" className="space-y-4">
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Noise Level</span>
                        <span>{roomData.environmentalData.noiseLevel}/10</span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${(roomData.environmentalData.noiseLevel / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Crime Rate</span>
                        <span>{roomData.environmentalData.crimeRate}/10</span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${(roomData.environmentalData.crimeRate / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Air Quality</span>
                        <span>{10 - roomData.environmentalData.pollution}/10</span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${((10 - roomData.environmentalData.pollution) / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Green Space</span>
                        <span>{roomData.environmentalData.greenSpaceAccess}/10</span>
                      </div>
                      <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${(roomData.environmentalData.greenSpaceAccess / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="demographics">
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium">Population</div>
                        <div className="text-2xl">{roomData.demographics.totalPopulation.toLocaleString()}</div>
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2">Age Distribution</div>
                        {roomData.demographics.ageGroups.map(group => (
                          <div key={group.name} className="mb-2">
                            <div className="flex justify-between text-sm">
                              <span>{group.name}</span>
                              <span>{group.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
                              <div 
                                className="bg-primary h-full rounded-full" 
                                style={{ width: `${group.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium">Income Level</div>
                        <div>{roomData.demographics.incomeLevel}</div>
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium">Education</div>
                        <div>{roomData.demographics.educationLevel}</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities">
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2">Hospitals</div>
                        {roomData.amenities.hospitals.map(hospital => (
                          <div key={hospital.name} className="flex justify-between mb-1">
                            <span>{hospital.name}</span>
                            <span className="text-sm text-gray-500">{hospital.distance}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2">Schools</div>
                        {roomData.amenities.schools.map(school => (
                          <div key={school.name} className="mb-1">
                            <div className="flex justify-between">
                              <span>{school.name}</span>
                              <span className="text-sm text-gray-500">{school.distance}</span>
                            </div>
                            <div className="text-sm text-gray-500">Rating: {school.rating}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2">Parks</div>
                        {roomData.amenities.parks.map(park => (
                          <div key={park.name} className="mb-1">
                            <div className="flex justify-between">
                              <span>{park.name}</span>
                              <span className="text-sm text-gray-500">{park.distance}</span>
                            </div>
                            <div className="text-sm text-gray-500">Size: {park.size}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-gray-100 rounded-md">
                        <div className="font-medium mb-2">Shopping</div>
                        {roomData.amenities.shopping.map(shop => (
                          <div key={shop.name} className="flex justify-between mb-1">
                            <span>{shop.name}</span>
                            <span className="text-sm text-gray-500">{shop.distance}</span>
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
            Ask our AI assistant about neighborhood insights or to learn more about the environmental factors in this area.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Try asking about noise levels, schools, hospitals, or demographics!
          </p>
        </div>
      </div>
      
      <Chatbot chatbotId="room-tour-chatbot" handleMapQuery={handleChatbotRoomQuery} />
      <Footer />
    </div>
  );
};

export default RoomTour;
