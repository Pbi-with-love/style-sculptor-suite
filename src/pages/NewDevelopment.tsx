
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CalendarDays, Home, Building, City, Map, TrendingUp } from 'lucide-react';

const NewDevelopment = () => {
  const [selectedYear, setSelectedYear] = useState('2030');
  
  const developments = [
    {
      id: 1,
      title: 'Skyline Residences',
      description: 'A new concept in urban living with panoramic city views.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      status: 'Under Construction',
      completion: 'Q4 2023'
    },
    {
      id: 2,
      title: 'Coastal Villas',
      description: 'Luxury beachfront properties with sustainable design.',
      image: 'https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      status: 'Pre-construction',
      completion: 'Q2 2024'
    }
  ];

  const cityPlans = {
    '2030': [
      {
        city: 'New York',
        planName: 'Vision 2030: Sustainable Manhattan',
        description: 'A comprehensive plan to transform Manhattan into a carbon-neutral borough with increased green spaces and sustainable infrastructure.',
        keyFeatures: [
          'Conversion of 30% of streets to pedestrian-only zones',
          'Mandatory green roofs for all new buildings over 10,000 sq ft',
          'Expansion of bike lanes to cover 50% of city streets',
          'Implementation of smart grid technology throughout the city'
        ],
        environmentalImpact: 'Projected 45% reduction in carbon emissions by 2030',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
      },
      {
        city: 'Singapore',
        planName: 'Garden City 2.0',
        description: 'Building upon Singapore\'s garden city legacy with vertical forests and integrated nature corridors connecting all neighborhoods.',
        keyFeatures: [
          'Vertical forest residential towers with over 100,000 plants per building',
          'Elevated green corridors connecting all major districts',
          'Underground water collection and filtration systems',
          'Self-sufficient neighborhood food production'
        ],
        environmentalImpact: 'Temperature reduction of 3°C in urban areas and 95% water self-sufficiency',
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=852&q=80'
      }
    ],
    '2040': [
      {
        city: 'Dubai',
        planName: 'Desert Oasis Initiative',
        description: 'Transforming Dubai into a self-sustaining desert ecosystem with advanced water conservation and renewable energy.',
        keyFeatures: [
          'City-wide atmospheric water harvesting network',
          'Solar roadways generating 40% of city power needs',
          'Desert greening initiatives expanding city green space by 200%',
          'Autonomous public transport network powered by renewables'
        ],
        environmentalImpact: 'Full carbon neutrality and 80% reduction in water imports',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
      },
      {
        city: 'Copenhagen',
        planName: 'Blue-Green Copenhagen 2040',
        description: 'Integrating water management and green infrastructure to create a city resilient to climate change and rising sea levels.',
        keyFeatures: [
          'Floating neighborhoods accommodating 15,000 residents',
          'Convertible infrastructure adapting to seasonal flooding',
          'Urban waterways for transportation and recreation',
          '100% renewable energy powering the entire city'
        ],
        environmentalImpact: 'Carbon negative city with surplus clean energy exported to neighboring regions',
        image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
      }
    ],
    '2050': [
      {
        city: 'Tokyo',
        planName: 'Neo-Tokyo Resilience Project',
        description: 'Rebuilding Tokyo as a disaster-proof, self-healing urban environment using advanced materials and AI urban management.',
        keyFeatures: [
          'Self-healing infrastructure using nanotechnology',
          'Distributed energy microgrids for each district',
          'Underground expansion increasing city capacity by 35%',
          'AI-managed traffic and resource allocation'
        ],
        environmentalImpact: 'Zero waste economy with 100% material recycling',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
      },
      {
        city: 'Melbourne',
        planName: 'Melbourne 2050: The 20-Minute Metropolis',
        description: 'Restructuring Melbourne into interconnected villages where all necessities are within a 20-minute walk.',
        keyFeatures: [
          'Hyperlocal manufacturing hubs in each district',
          'Edible landscaping throughout public spaces',
          'Repurposed roadways as community spaces',
          'Integrated health monitoring in public infrastructure'
        ],
        environmentalImpact: '90% reduction in transportation emissions and 75% locally sourced food',
        image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-playfair mb-4">New Developments</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our latest architectural projects and upcoming developments.
          </p>
          
          <Tabs defaultValue="developments" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="developments" className="flex items-center gap-2">
                <Building size={16} />
                Current Projects
              </TabsTrigger>
              <TabsTrigger value="cityplans" className="flex items-center gap-2">
                <City size={16} />
                Future City Plans
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="developments">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
                {developments.map((dev) => (
                  <div key={dev.id} className="overflow-hidden rounded-lg shadow-lg">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={dev.image} 
                        alt={dev.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-playfair">{dev.title}</h3>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">{dev.status}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{dev.description}</p>
                      <div className="text-sm text-gray-500">
                        Estimated completion: {dev.completion}
                      </div>
                      <button className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="cityplans">
              <div className="mb-8">
                <h2 className="text-2xl font-playfair mb-6 text-center">
                  Future City Planning Visions
                </h2>
                
                <Tabs defaultValue={selectedYear} onValueChange={setSelectedYear} className="w-full">
                  <TabsList className="flex justify-center mb-8">
                    <TabsTrigger value="2030" className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      2030
                    </TabsTrigger>
                    <TabsTrigger value="2040" className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      2040
                    </TabsTrigger>
                    <TabsTrigger value="2050" className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      2050
                    </TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(cityPlans).map(([year, plans]) => (
                    <TabsContent key={year} value={year}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {plans.map((plan, index) => (
                          <div key={index} className="overflow-hidden rounded-lg shadow-lg border border-gray-100">
                            <div className="h-64 overflow-hidden relative">
                              <img 
                                src={plan.image} 
                                alt={plan.city} 
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <div className="p-6 text-white">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Map size={16} className="text-white/80" />
                                    <span className="text-sm font-medium">{plan.city}</span>
                                  </div>
                                  <h3 className="text-2xl font-playfair">{plan.planName}</h3>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <p className="text-gray-600 mb-6">{plan.description}</p>
                              
                              <div className="mb-4">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <TrendingUp size={16} className="text-primary" />
                                  Key Features
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {plan.keyFeatures.map((feature, i) => (
                                    <li key={i} className="text-gray-600">{feature}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="text-sm text-primary font-medium bg-primary/10 p-3 rounded-md">
                                <span className="block font-bold mb-1">Environmental Impact</span>
                                {plan.environmentalImpact}
                              </div>
                              
                              <button className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors w-full">
                                View Detailed Plan
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewDevelopment;
