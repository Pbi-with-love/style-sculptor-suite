
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/56a186cb-5695-47b8-8e85-ba61e5d029b9.png')"
        }}
      />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 glass-panel"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white font-playfair leading-tight mb-6">
          Every structure tells a story, built with
          <br />
          artistry, heart, and precision.
        </h1>
        <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl mb-10">
          It's about more than just crafting visually appealing and durable structures; it's 
          about understanding their purpose and the people who will rely on them.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link to="/contact" className="btn-primary">
            Get started →
          </Link>
          <Link to="/gallery" className="btn-primary">
            Get started →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
