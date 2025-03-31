
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NewDevelopment = () => {
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-playfair mb-8">New Developments</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest architectural projects and upcoming developments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
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
      </div>
      <Footer />
    </div>
  );
};

export default NewDevelopment;
