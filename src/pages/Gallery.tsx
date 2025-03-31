
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const projects = [
    {
      id: 1,
      title: 'Modern Residence',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 2,
      title: 'Urban Office',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80'
    },
    {
      id: 3,
      title: 'Minimalist Interior',
      category: 'Interior',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80'
    },
    {
      id: 4,
      title: 'Luxury Villa',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80'
    },
    {
      id: 5,
      title: 'Eco-Friendly Office',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 6,
      title: 'Contemporary Bathroom',
      category: 'Interior',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-playfair mb-8">Our Project Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of completed projects, showcasing our architectural expertise.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">All</button>
            <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors">Residential</button>
            <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors">Commercial</button>
            <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors">Interior</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-2 border-2 border-white text-white hover:bg-white/20 transition-colors">
                    View Project
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-playfair">{project.title}</h3>
                <p className="text-gray-600">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
