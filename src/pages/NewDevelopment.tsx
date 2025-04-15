
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  CalendarDays, 
  Home, 
  Building, 
  Map, 
  TrendingUp, 
  Landmark,
  Leaf, 
  Droplets, 
  Trees, 
  Bus, 
  Users, 
  Building2
} from 'lucide-react';

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
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Expansion of subway system with 2.5 miles of new tunnels',
            'Introduction of autonomous electric buses on major routes',
            'Creation of 50 miles of dedicated bicycle highways',
            'Implementation of congestion pricing in business districts'
          ],
          housingProjects: [
            'Development of 15,000 affordable housing units',
            'Conversion of 10 office buildings to mixed-use residential',
            'Implementation of micro-apartment zoning in 5 districts',
            'Creation of 3 new inclusive housing communities'
          ],
          sustainabilityMeasures: [
            'Installation of 200MW of solar capacity on public buildings',
            'Creation of 12 new pocket parks in underserved neighborhoods',
            'Implementation of rainwater collection systems city-wide',
            'Upgrade of all street lighting to smart LED systems'
          ],
          timeline: [
            { year: 2025, milestone: 'Completion of first pedestrian zone conversion' },
            { year: 2026, milestone: 'Launch of autonomous bus pilot program' },
            { year: 2027, milestone: 'Completion of first 5,000 affordable housing units' },
            { year: 2029, milestone: 'Activation of smart grid in first district' },
            { year: 2030, milestone: 'Full implementation of green roof mandate' }
          ]
        }
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
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=852&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Expansion of MRT system with 2 new lines totaling 35km',
            'Full electric conversion of all public buses',
            'Implementation of underground freight delivery network',
            'Development of cable car network connecting major attractions'
          ],
          housingProjects: [
            'Construction of 5 vertical forest towers housing 10,000 residents',
            'Retrofit of 30 existing HDB complexes with green facades',
            'Development of floating residential district with 2,000 units',
            'Creation of 3 net-zero energy residential communities'
          ],
          sustainabilityMeasures: [
            'Installation of solar panels on 80% of public housing rooftops',
            'Development of 15km of elevated forest walks',
            'Implementation of pneumatic waste collection in all districts',
            'Creation of 50 community urban farms'
          ],
          timeline: [
            { year: 2024, milestone: 'Groundbreaking for first vertical forest tower' },
            { year: 2026, milestone: 'Completion of first 5km of elevated green corridors' },
            { year: 2027, milestone: 'Launch of first community urban farm network' },
            { year: 2028, milestone: '50% completion of solar panel installation program' },
            { year: 2030, milestone: 'Opening of floating residential district' }
          ]
        }
      },
      {
        city: 'Amsterdam',
        planName: 'Circular City Initiative',
        description: 'Transforming Amsterdam into the world\'s first fully circular economy city with zero waste and sustainable resource management.',
        keyFeatures: [
          'Comprehensive material passport system for all buildings',
          'City-wide separated waste collection with 95% recycling target',
          'Conversion of canal network to clean energy transportation',
          'Implementation of circular procurement for all city contracts'
        ],
        environmentalImpact: '80% reduction in waste sent to landfill and 60% reduction in virgin material use',
        image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Expansion of electric boat public transport network',
            'Creation of car-free zones covering 70% of the city center',
            'Implementation of bicycle highway system connecting suburbs',
            'Introduction of shared autonomous vehicle fleet'
          ],
          housingProjects: [
            'Development of modular housing district with 3,000 units',
            'Retrofit of 5,000 historic buildings for energy efficiency',
            'Creation of floating eco-village with 500 homes',
            'Implementation of material banks for construction resources'
          ],
          sustainabilityMeasures: [
            'Installation of waste-to-energy systems in all districts',
            'Creation of urban mining facilities for reclaiming materials',
            'Implementation of water purification gardens in public spaces',
            'Development of energy-positive public buildings'
          ],
          timeline: [
            { year: 2025, milestone: 'Launch of material passport database' },
            { year: 2027, milestone: 'Opening of first modular housing district' },
            { year: 2028, milestone: 'Implementation of city-wide waste separation' },
            { year: 2029, milestone: 'Completion of first urban mining facility' },
            { year: 2030, milestone: 'Achievement of 80% circular procurement' }
          ]
        }
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
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Extension of Dubai Metro with 3 new lines and 50 stations',
            'Development of Hyperloop connection to Abu Dhabi',
            'Implementation of drone taxi network with 300 landing pads',
            'Creation of underground freight tunnel system'
          ],
          housingProjects: [
            'Construction of 3 self-cooling eco-communities housing 50,000 residents',
            'Development of underground residential district with 10,000 units',
            'Creation of water-positive floating neighborhood in Dubai Creek',
            'Implementation of smart desert homes with integrated agriculture'
          ],
          sustainabilityMeasures: [
            'Installation of atmospheric water generators producing 30% of water needs',
            'Development of 100,000 hectares of desert regeneration zones',
            'Implementation of city-wide fog collection systems',
            'Creation of artificial cloud technology for localized cooling'
          ],
          timeline: [
            { year: 2030, milestone: 'Completion of first self-cooling eco-community' },
            { year: 2033, milestone: 'Launch of Hyperloop connection to Abu Dhabi' },
            { year: 2035, milestone: 'Opening of first section of underground district' },
            { year: 2037, milestone: '50% completion of desert regeneration project' },
            { year: 2040, milestone: 'Full implementation of atmospheric water network' }
          ]
        }
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
        image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Development of canal-based water bus network with 40 stops',
            'Creation of elevated bicycle superhighways above flood zones',
            'Implementation of amphibious public transportation vehicles',
            'Establishment of renewable-powered ferry network'
          ],
          housingProjects: [
            'Construction of 5 floating residential districts with 3,000 units each',
            'Development of amphibious housing that rises with water levels',
            'Retrofit of 10,000 buildings with water-resistant ground floors',
            'Creation of elevated residential platforms in vulnerable areas'
          ],
          sustainabilityMeasures: [
            'Installation of 250 water plazas that convert to retention basins',
            'Development of 30km of permeable streets and pavements',
            'Implementation of living breakwaters around harbor areas',
            'Creation of offshore wind farm generating 200% of city energy needs'
          ],
          timeline: [
            { year: 2032, milestone: 'Completion of first floating district' },
            { year: 2034, milestone: 'Launch of amphibious public transport system' },
            { year: 2036, milestone: '50% completion of building retrofits' },
            { year: 2038, milestone: 'Opening of offshore wind farm' },
            { year: 2040, milestone: 'Full implementation of water plaza network' }
          ]
        }
      },
      {
        city: 'Seoul',
        planName: 'Urban Nature Integration',
        description: 'Reimagining Seoul as a city where technology and nature coexist harmoniously, with buildings seamlessly integrated into restored ecosystems.',
        keyFeatures: [
          'Restoration of all historic streams and rivers through the city',
          'Development of vertical forests on 30% of skyscrapers',
          'Creation of wildlife corridors connecting all major green spaces',
          'Implementation of urban rewilding in 40% of public spaces'
        ],
        environmentalImpact: '60% increase in biodiversity and 70% improvement in air quality',
        image: 'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Extension of Seoul Metro with 4 new ecological-themed lines',
            'Creation of green corridors with embedded transit systems',
            'Implementation of drone delivery network reducing ground traffic',
            'Development of solar-powered tram system through restored streams'
          ],
          housingProjects: [
            'Construction of 10 biophilic apartment complexes housing 30,000 residents',
            'Development of 5 net-positive energy neighborhoods',
            'Retrofit of 20,000 buildings with living walls and green roofs',
            'Creation of forest school communities in suburban areas'
          ],
          sustainabilityMeasures: [
            'Restoration of 12 historic streams with natural filtration systems',
            'Development of 50 urban forests featuring native species',
            'Implementation of artificial intelligence for ecosystem management',
            'Creation of 100 community-managed urban farms'
          ],
          timeline: [
            { year: 2031, milestone: 'Completion of first restored stream network' },
            { year: 2033, milestone: 'Opening of first biophilic apartment complex' },
            { year: 2035, milestone: 'Launch of ecological transit line' },
            { year: 2038, milestone: '50% completion of green roof initiative' },
            { year: 2040, milestone: 'Full implementation of wildlife corridors' }
          ]
        }
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
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Development of maglev metro system with 500km of tracks',
            'Implementation of aerial transportation network with 200 vertiports',
            'Creation of subterranean goods delivery system under all districts',
            'Establishment of hyperloop connections to major Japanese cities'
          ],
          housingProjects: [
            'Construction of 3 mega-structures housing 100,000 residents each',
            'Development of 10 underground residential districts',
            'Creation of adaptive buildings that reconfigure based on needs',
            'Implementation of self-growing organic architecture'
          ],
          sustainabilityMeasures: [
            'Installation of artificial photosynthesis systems capturing 2M tons of CO2 annually',
            'Development of urban materials that purify air and water passively',
            'Implementation of biotech waste digestion facilities in all buildings',
            'Creation of distributed food production within all residential complexes'
          ],
          timeline: [
            { year: 2040, milestone: 'Completion of first adaptive mega-structure' },
            { year: 2043, milestone: 'Launch of first maglev metro line' },
            { year: 2045, milestone: '50% completion of underground expansion' },
            { year: 2047, milestone: 'Implementation of citywide AI management system' },
            { year: 2050, milestone: 'Full deployment of self-healing infrastructure' }
          ]
        }
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
        image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Creation of 30 fully self-contained neighborhoods',
            'Implementation of shared autonomous vehicle network',
            'Development of elevated walkways connecting all districts',
            'Conversion of 60% of former roads to green corridors'
          ],
          housingProjects: [
            'Construction of 20 mixed-use communities with 10,000 residents each',
            'Development of regenerative buildings that produce more than they consume',
            'Implementation of flexible housing that adapts to changing family needs',
            'Creation of intergenerational living complexes in each district'
          ],
          sustainabilityMeasures: [
            'Installation of neighborhood-scale circular economy hubs',
            'Development of 100% edible public landscaping',
            'Implementation of building materials that sequester carbon',
            'Creation of neighborhood biogas generation from organic waste'
          ],
          timeline: [
            { year: 2040, milestone: 'Completion of first five 20-minute neighborhoods' },
            { year: 2043, milestone: '30% conversion of roadways to community spaces' },
            { year: 2045, milestone: 'Implementation of first hyperlocal manufacturing hub' },
            { year: 2047, milestone: '50% completion of edible landscape initiative' },
            { year: 2050, milestone: 'Full integration of all 30 self-contained neighborhoods' }
          ]
        }
      },
      {
        city: 'San Francisco',
        planName: 'Regenerative Bay Area',
        description: 'Transforming San Francisco into a regenerative ecosystem that gives back more to the environment than it takes, while becoming fully resilient to climate threats.',
        keyFeatures: [
          'Living seawalls protecting against rising sea levels while enhancing marine life',
          'Fog-catching structures providing 30% of water needs',
          'Implementation of earthquake-responsive buildings and infrastructure',
          'Full food self-sufficiency through vertical and rooftop farming'
        ],
        environmentalImpact: 'Net positive environmental impact with flourishing bay ecosystems and enhanced biodiversity',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        detailedPlan: {
          transportationInitiatives: [
            'Development of cable-car inspired zero-emission transit system',
            'Implementation of marine public transportation network',
            'Creation of suspended pedestrian pathways across the city',
            'Establishment of hydrogen-powered ferry fleet'
          ],
          housingProjects: [
            'Construction of 15 hillside terraced communities',
            'Development of floating neighborhoods in the bay',
            'Creation of buildings with integrated seismic isolation',
            'Implementation of climate-adaptive architecture'
          ],
          sustainabilityMeasures: [
            'Installation of tidal energy generation throughout the bay',
            'Development of living machine water treatment in all buildings',
            'Implementation of fog collection systems on all tall structures',
            'Creation of carbon-sequestering concrete in all new construction'
          ],
          timeline: [
            { year: 2040, milestone: 'Completion of first living seawall section' },
            { year: 2042, milestone: 'Launch of citywide fog collection system' },
            { year: 2045, milestone: 'Opening of first floating neighborhood' },
            { year: 2048, milestone: '75% completion of food self-sufficiency target' },
            { year: 2050, milestone: 'Full implementation of regenerative infrastructure' }
          ]
        }
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
                <Building2 size={16} />
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

                              <Tabs defaultValue="overview" className="mt-6">
                                <TabsList className="w-full">
                                  <TabsTrigger value="overview" className="text-xs">
                                    Overview
                                  </TabsTrigger>
                                  <TabsTrigger value="transport" className="text-xs">
                                    <Bus size={12} className="mr-1" /> Transport
                                  </TabsTrigger>
                                  <TabsTrigger value="housing" className="text-xs">
                                    <Home size={12} className="mr-1" /> Housing
                                  </TabsTrigger>
                                  <TabsTrigger value="sustainability" className="text-xs">
                                    <Leaf size={12} className="mr-1" /> Green
                                  </TabsTrigger>
                                  <TabsTrigger value="timeline" className="text-xs">
                                    <CalendarDays size={12} className="mr-1" /> Timeline
                                  </TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="pt-4">
                                  <div className="text-sm text-primary font-medium bg-primary/10 p-3 rounded-md">
                                    <span className="block font-bold mb-1">Environmental Impact</span>
                                    {plan.environmentalImpact}
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="transport" className="pt-4">
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                                      <Bus size={14} /> Transportation Initiatives
                                    </h5>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      {plan.detailedPlan.transportationInitiatives.map((item, i) => (
                                        <li key={i} className="text-gray-600">{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="housing" className="pt-4">
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                                      <Building size={14} /> Housing Projects
                                    </h5>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      {plan.detailedPlan.housingProjects.map((item, i) => (
                                        <li key={i} className="text-gray-600">{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="sustainability" className="pt-4">
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                                      <Leaf size={14} /> Sustainability Measures
                                    </h5>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                      {plan.detailedPlan.sustainabilityMeasures.map((item, i) => (
                                        <li key={i} className="text-gray-600">{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="timeline" className="pt-4">
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                                      <CalendarDays size={14} /> Implementation Timeline
                                    </h5>
                                    <div className="space-y-3 text-sm">
                                      {plan.detailedPlan.timeline.map((milestone, i) => (
                                        <div key={i} className="flex gap-3 items-center">
                                          <span className="bg-primary text-white text-xs py-1 px-2 rounded-full">{milestone.year}</span>
                                          <span className="text-gray-700">{milestone.milestone}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                              
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
