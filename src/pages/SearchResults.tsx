import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyMapContainer from '../components/PropertyMapContainer';
import PropertyRecommendation from '../components/PropertyRecommendation';
import Chatbot from '../components/chatbot';
import Footer from '../components/Footer';
import SearchHeader from '../components/SearchHeader';
import { findLocationsByEnvironmentalCriteria } from '../data/environmentalData';

const mockProperties = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    description: 'A beautiful modern apartment with 2 bedrooms and stunning city views.',
    price: '$350,000',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: '123 Downtown St, City',
    lat: 40.7128,
    lng: -74.0060,
    environmentalFactors: {
      crimeRate: 6.5,
      noiseLevel: 8.2,
      pollution: 7.4,
      trafficCongestion: 8.9,
      greenSpaceAccess: 4.2,
      schoolQuality: 6.8
    }
  },
  {
    id: '2',
    title: 'Spacious Family Home',
    description: 'Perfect for families, this 4-bedroom house features a large backyard and modern amenities.',
    price: '$520,000',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: '456 Suburb Ave, Riverside',
    lat: 40.7282,
    lng: -74.0776,
    environmentalFactors: {
      crimeRate: 3.2,
      noiseLevel: 5.1,
      pollution: 4.3,
      trafficCongestion: 5.8,
      greenSpaceAccess: 7.9,
      schoolQuality: 8.2
    }
  },
  {
    id: '3',
    title: 'Luxury Penthouse',
    description: 'Exclusive penthouse with panoramic views, 3 bedrooms, and high-end finishes throughout.',
    price: '$1,200,000',
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80',
    address: '789 Luxury Blvd, Midtown',
    lat: 40.7551,
    lng: -73.9884,
    environmentalFactors: {
      crimeRate: 5.7,
      noiseLevel: 7.8,
      pollution: 6.2,
      trafficCongestion: 7.5,
      greenSpaceAccess: 5.1,
      schoolQuality: 7.3
    }
  },
  {
    id: '4',
    title: 'Urban Smart Loft',
    description: 'Modern loft with smart home features in an up-and-coming neighborhood.',
    price: '$425,000',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: '101 Tech Blvd, Uptown',
    lat: 40.7831,
    lng: -73.9712,
    environmentalFactors: {
      crimeRate: 4.3,
      noiseLevel: 6.5,
      pollution: 5.4,
      trafficCongestion: 6.7,
      greenSpaceAccess: 6.2,
      schoolQuality: 7.8
    }
  },
  {
    id: '5',
    title: 'Waterfront Condo',
    description: 'Elegant 2-bedroom condo with waterfront views and resort-style amenities.',
    price: '$580,000',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: '234 Harbor Dr, Harbor Heights',
    lat: 40.6937,
    lng: -73.9890,
    environmentalFactors: {
      crimeRate: 3.5,
      noiseLevel: 4.8,
      pollution: 4.1,
      trafficCongestion: 5.2,
      greenSpaceAccess: 7.3,
      schoolQuality: 8.4
    }
  }
];

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [environmentalFilters, setEnvironmentalFilters] = useState<{
    type: string;
    value: 'low' | 'high';
  }[]>([]);
  const [highlightedLocation, setHighlightedLocation] = useState<{lat: number; lng: number} | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const filtered = mockProperties.filter(property => 
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase()) ||
        property.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(mockProperties);
    }
  }, [location.search]);

  const handleSearch = (query: string) => {
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
    setSearchQuery(query);
    
    const filtered = mockProperties.filter(property => 
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.description.toLowerCase().includes(query.toLowerCase()) ||
      property.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
  };
  
  const handleEnvironmentalFilterChange = (type: string, value: 'low' | 'high') => {
    const existingFilterIndex = environmentalFilters.findIndex(f => f.type === type);
    
    let newFilters;
    
    if (existingFilterIndex >= 0) {
      newFilters = [...environmentalFilters];
      newFilters[existingFilterIndex] = { type, value };
    } else {
      newFilters = [...environmentalFilters, { type, value }];
    }
    
    setEnvironmentalFilters(newFilters);
    
    const matchingLocations = findLocationsByEnvironmentalCriteria(
      newFilters.map(f => ({ 
        type: f.type as any, 
        value: f.value 
      }))
    );
    
    if (matchingLocations.length > 0) {
      const matchingPropertyIds = matchingLocations.map(loc => {
        const nearbyProperty = mockProperties.find(p => 
          Math.abs(p.lat - loc.lat) < 0.01 && 
          Math.abs(p.lng - loc.lng) < 0.01
        );
        return nearbyProperty?.id;
      }).filter(Boolean);
      
      const filtered = mockProperties.filter(p => matchingPropertyIds.includes(p.id));
      setFilteredProperties(filtered.length > 0 ? filtered : mockProperties);
    }
  };
  
  const handleMapClick = (location: { lat: number; lng: number }) => {
    const property = mockProperties.find(p => 
      Math.abs(p.lat - location.lat) < 0.01 && 
      Math.abs(p.lng - location.lng) < 0.01
    );
    
    if (property) {
      setHighlightedLocation({ lat: property.lat, lng: property.lng });
    }
  };

  const handleChatbotMapQuery = (query: string) => {
    if (query.toLowerCase().includes('quiet') || query.toLowerCase().includes('low noise')) {
      // Custom map doesn't have the findQuietPlaces function, so implement similar functionality here
      
      const quietProperty = mockProperties.find(property => 
        property.environmentalFactors.noiseLevel <= 5
      );
      
      if (quietProperty) {
        setHighlightedLocation({ lat: quietProperty.lat, lng: quietProperty.lng });
        
        return {
          success: true,
          message: `I found a quiet property: ${quietProperty.title} with a noise level of ${quietProperty.environmentalFactors.noiseLevel}/10.`,
          location: { lat: quietProperty.lat, lng: quietProperty.lng }
        };
      }
    }
    
    if (query.toLowerCase().includes('green') || query.toLowerCase().includes('park')) {
      const greenProperty = mockProperties.find(property => 
        property.environmentalFactors.greenSpaceAccess >= 7
      );
      
      if (greenProperty) {
        setHighlightedLocation({ lat: greenProperty.lat, lng: greenProperty.lng });
        
        return {
          success: true,
          message: `I found a property with great green space access: ${greenProperty.title} with a green space rating of ${greenProperty.environmentalFactors.greenSpaceAccess}/10.`,
          location: { lat: greenProperty.lat, lng: greenProperty.lng }
        };
      }
    }
    
    if (query.toLowerCase().includes('safe') || query.toLowerCase().includes('low crime')) {
      const safeProperty = mockProperties.find(property => 
        property.environmentalFactors.crimeRate <= 4
      );
      
      if (safeProperty) {
        setHighlightedLocation({ lat: safeProperty.lat, lng: safeProperty.lng });
        
        return {
          success: true,
          message: `I found a property in a safe area: ${safeProperty.title} with a crime rate of ${safeProperty.environmentalFactors.crimeRate}/10.`,
          location: { lat: safeProperty.lat, lng: safeProperty.lng }
        };
      }
    }
    
    return {
      success: false,
      message: "I couldn't find any relevant environmental data for your query."
    };
  };

  const handleClearFilters = () => {
    setEnvironmentalFilters([]);
    setFilteredProperties(mockProperties);
  };

  const mapLocations = filteredProperties.map(property => ({
    id: property.id,
    lat: property.lat,
    lng: property.lng,
    title: property.title,
  }));

  return (
    <div className="min-h-screen bg-site-gray flex flex-col">
      <Navbar />
      
      <SearchHeader 
        searchQuery={searchQuery}
        environmentalFilters={environmentalFilters}
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
      />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PropertyMapContainer 
              locations={mapLocations}
              onEnvironmentalFilterChange={handleEnvironmentalFilterChange}
              onMapClick={handleMapClick}
              highlightedLocation={highlightedLocation}
            />
            <div className="h-[70vh]">
              <PropertyRecommendation 
                properties={filteredProperties} 
                title={environmentalFilters.length > 0 
                  ? "Properties Matching Your Environmental Criteria" 
                  : "Available Properties"
                }
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Ensure Chatbot is always displayed */}
      <Chatbot chatbotId="environmental-chatbot" handleMapQuery={handleChatbotMapQuery} />
      <Footer />
    </div>
  );
};

export default SearchResults;
