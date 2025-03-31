
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background with white color */}
      <div className="absolute inset-0 bg-site-gray"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-black font-playfair leading-tight mb-6">
          Every structure tells a story, built with
          <br />
          artistry, heart, and precision.
        </h1>
        <p className="max-w-2xl mx-auto text-black/70 text-lg md:text-xl mb-10">
          It's about more than just crafting visually appealing and durable structures; it's 
          about understanding their purpose and the people who will rely on them.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-10">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search for properties, locations, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-12 text-base shadow-md"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              className="absolute right-0 px-3"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link to="/contact" className="btn-primary bg-black text-white border-black/50 hover:bg-black/90">
            Get started →
          </Link>
          <Link to="/gallery" className="btn-primary bg-white text-black border-black/50 hover:bg-gray-100">
            View Gallery →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
