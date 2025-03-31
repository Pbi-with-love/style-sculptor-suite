
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-playfair mb-8">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interested in working with us? Get in touch to discuss your project needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-playfair mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Subject of your message"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-playfair mb-6">Contact Information</h2>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="space-y-4 mb-8">
                <p className="flex items-start">
                  <span className="text-gray-700 font-medium w-24">Address:</span>
                  <span>1234 Architecture Blvd, New York, NY 10001</span>
                </p>
                <p className="flex items-start">
                  <span className="text-gray-700 font-medium w-24">Phone:</span>
                  <span>(123) 456-7890</span>
                </p>
                <p className="flex items-start">
                  <span className="text-gray-700 font-medium w-24">Email:</span>
                  <span>info@elevate-x.com</span>
                </p>
                <p className="flex items-start">
                  <span className="text-gray-700 font-medium w-24">Hours:</span>
                  <span>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed</span>
                </p>
              </div>
              
              <div className="h-64 bg-gray-300 rounded-lg mb-6">
                {/* Map would go here in a real application */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Interactive Map
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-black text-white rounded">FB</a>
                <a href="#" className="p-2 bg-black text-white rounded">IG</a>
                <a href="#" className="p-2 bg-black text-white rounded">TW</a>
                <a href="#" className="p-2 bg-black text-white rounded">LI</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
