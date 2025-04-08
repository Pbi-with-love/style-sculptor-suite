
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Properties from '../components/Properties';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Map from '../components/Map';
import { environmentalRankings } from '../data/environmentalData';

const Index = () => {
  // Function to handle environmental data requests from chatbot
  const handleChatbotMapQuery = (query: string) => {
    if (query.toLowerCase().includes('quiet') || query.toLowerCase().includes('low noise')) {
      // @ts-ignore - Using the function exposed on window by Map component
      const quietPlace = window.findQuietPlaces?.();
      
      if (quietPlace) {
        return {
          success: true,
          message: `I found a quiet area called ${quietPlace.name} with a noise level of ${quietPlace.attributes.noiseLevel}/10.`,
          location: { lat: quietPlace.lat, lng: quietPlace.lng }
        };
      }
    }
    
    return {
      success: false,
      message: "I couldn't find any relevant environmental data for your query."
    };
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
              <Map />
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
      
      <Chatbot chatbotId="home-chatbot" handleMapQuery={handleChatbotMapQuery} />
      <Footer />
    </div>
  );
};

export default Index;
