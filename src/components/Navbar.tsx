
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-playfair">
              Home Buying
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/room-tour" className="nav-link">Room Tour</Link>
              <Link to="/new-development" className="nav-link">New Development</Link>
              <Link to="/gallery" className="nav-link">Gallery</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <div className="ml-6 text-white/80">
                <span>EN</span>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="nav-link block">Home</Link>
            <Link to="/room-tour" className="nav-link block">Room Tour</Link>
            <Link to="/new-development" className="nav-link block">New Development</Link>
            <Link to="/gallery" className="nav-link block">Gallery</Link>
            <Link to="/contact" className="nav-link block">Contact</Link>
            <div className="py-2 px-4 text-white/80">
              <span>EN</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
