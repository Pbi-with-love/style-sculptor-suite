
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Properties from '../components/Properties';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-site-gray">
      <Navbar />
      <Hero />
      <Stats />
      <Properties />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
