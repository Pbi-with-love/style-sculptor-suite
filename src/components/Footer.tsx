
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-playfair mb-4">Elevate-X</h3>
            <p className="text-gray-400">
              Creating exceptional architectural experiences that transcend expectations.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/room-tour" className="text-gray-400 hover:text-white transition-colors">Room Tour</a></li>
              <li><a href="/new-development" className="text-gray-400 hover:text-white transition-colors">New Development</a></li>
              <li><a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Architecture Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Interior Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">3D Visualization</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Construction</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <address className="text-gray-400 not-italic">
              1234 Architecture Blvd<br />
              New York, NY 10001<br />
              Email: info@elevate-x.com<br />
              Phone: (123) 456-7890
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Elevate-X. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
