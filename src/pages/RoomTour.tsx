
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RoomTour = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-20">
          <h1 className="text-4xl font-playfair mb-8">Immersive Room Tours</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our architectural designs through interactive 3D virtual tours. Explore spaces from every angle, at your own pace.
          </p>
        </div>
        
        <div className="text-center py-20 bg-gray-100">
          <h2 className="text-2xl font-playfair mb-8">Coming Soon</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're working on bringing you immersive 3D virtual tours of our most stunning architectural projects.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomTour;
