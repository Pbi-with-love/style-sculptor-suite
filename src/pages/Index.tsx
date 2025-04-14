
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Properties from '../components/Properties';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PropertyMapContainer from '../components/PropertyMapContainer';
import { environmentalRankings } from '../data/environmentalData';
import { useState } from 'react';

const Index = () => {
  const [highlightedLocation, setHighlightedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Function to handle environmental data requests from chatbot
  const handleChatbotMapQuery = (query: string) => {
    // Check if query is related to a quiet area
    if (query.toLowerCase().includes('quiet') || query.toLowerCase().includes('noise')) {
      const quietPlace = {
        name: "Suburb South",
        lat: 130,
        lng: 290,
        attributes: { noiseLevel: 2 }
      };
      
      setHighlightedLocation({ lat: quietPlace.lat, lng: quietPlace.lng });
      
      return {
        success: true,
        message: `I found a quiet area called ${quietPlace.name} with a noise level of ${quietPlace.attributes.noiseLevel}/10.`,
        location: { lat: quietPlace.lat, lng: quietPlace.lng }
      };
    }
    
    // Check if query is related to schools
    if (query.toLowerCase().includes('school') || query.toLowerCase().includes('education')) {
      const goodSchoolArea = {
        name: "Suburb North",
        lat: 140,
        lng: 10,
        attributes: { schoolQuality: 9 }
      };
      
      setHighlightedLocation({ lat: goodSchoolArea.lat, lng: goodSchoolArea.lng });
      
      return {
        success: true,
        message: `I found an area with excellent schools called ${goodSchoolArea.name} with a school quality rating of ${goodSchoolArea.attributes.schoolQuality}/10.`,
        location: { lat: goodSchoolArea.lat, lng: goodSchoolArea.lng }
      };
    }
    
    // For any other environmental query
    return {
      success: false,
      message: "I couldn't find any specific data for your query. Try asking about noise levels, schools, or pollution."
    };
  };

  // Sample location data
  const locationMarkers = [
    { id: '1', lat: 100, lng: 180, title: 'Modern Apartment in Downtown' },
    { id: '2', lat: 230, lng: 100, title: 'Spacious Family Home' },
    { id: '3', lat: 270, lng: 250, title: 'Luxury Penthouse' },
    { id: '4', lat: 60, lng: 320, title: 'Urban Smart Loft' },
    { id: '5', lat: 170, lng: 30, title: 'Waterfront Condo' },
    { id: '6', lat: 380, lng: 120, title: 'Tech Hub Studio' },
    { id: '7', lat: 390, lng: 270, title: 'Harbor View Apartment' },
    { id: '8', lat: 60, lng: 70, title: 'Arts District Loft' },
    { id: '9', lat: 320, lng: 180, title: 'Midtown Townhouse' },
  ];

  const handleMapClick = (location: { lat: number; lng: number }) => {
    setHighlightedLocation(location);
  };

  return (
    <div className="min-h-screen bg-site-gray">
      <Navbar />
      <Hero />
      <Stats />
      <Properties />
      
      {/* Open Data Map Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-playfair mb-2">Explore Environmental Data</h2>
            <p className="text-lg text-muted-foreground">
              Discover neighborhoods based on environmental factors like noise levels, pollution, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-[500px]">
              <PropertyMapContainer 
                locations={locationMarkers}
                onMapClick={handleMapClick}
                highlightedLocation={highlightedLocation}
              />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Factors</CardTitle>
                  <CardDescription>
                    Explore different environmental metrics on the map
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {environmentalRankings.map((ranking) => (
                      <li key={ranking.type} className="flex items-center justify-between">
                        <span className="font-medium">{ranking.label}</span>
                        <span className="text-sm text-muted-foreground">{ranking.description}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-sm">
                    <p>Ask our chatbot about areas with specific environmental characteristics.</p>
                    <p className="font-medium mt-2">Try asking:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                      <li>"Show me areas with low noise levels"</li>
                      <li>"Where can I find neighborhoods with good schools?"</li>
                      <li>"Find properties with clean air"</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add Chatbot component at fixed position */}
      <div className="fixed bottom-8 right-8 z-50">
        <Chatbot chatbotId="home-chatbot" handleMapQuery={handleChatbotMapQuery} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
