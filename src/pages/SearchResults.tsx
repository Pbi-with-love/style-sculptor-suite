
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import PropertyRecommendation from '../components/PropertyRecommendation';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

// Mock data for demonstration
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
  },
  {
    id: '2',
    title: 'Spacious Family Home',
    description: 'Perfect for families, this 4-bedroom house features a large backyard and modern amenities.',
    price: '$520,000',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: '456 Suburb Ave, Town',
    lat: 40.7282,
    lng: -74.0776,
  },
  {
    id: '3',
    title: 'Luxury Penthouse',
    description: 'Exclusive penthouse with panoramic views, 3 bedrooms, and high-end finishes throughout.',
    price: '$1,200,000',
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80',
    address: '789 Luxury Blvd, City',
    lat: 40.7551,
    lng: -73.9884,
  },
];

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  
  useEffect(() => {
    // Get the search query from URL parameters
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    // Filter properties based on the search query
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
    // In a real app, you would navigate to the search page with the query
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
    setSearchQuery(query);
    
    // Filter properties based on the search query
    const filtered = mockProperties.filter(property => 
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.description.toLowerCase().includes(query.toLowerCase()) ||
      property.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  // Transform the properties for the map component
  const mapLocations = filteredProperties.map(property => ({
    id: property.id,
    lat: property.lat,
    lng: property.lng,
    title: property.title,
  }));

  return (
    <div className="min-h-screen bg-site-gray flex flex-col">
      <Navbar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-playfair mb-6">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Properties"}
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-[70vh]">
              <Map locations={mapLocations} />
            </div>
            <div className="h-[70vh]">
              <PropertyRecommendation properties={filteredProperties} />
            </div>
          </div>
        </div>
      </div>
      
      <Chatbot />
      <Footer />
    </div>
  );
};

<<<<<<< HEAD
export default SearchResults;
=======
export default SearchResults;
>>>>>>> 9f8b2c7 (add searchbar)
