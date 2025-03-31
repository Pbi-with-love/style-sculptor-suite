
const Stats = () => {
  return (
    <div className="w-full bg-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div className="flex flex-col p-8">
            <span className="text-5xl font-playfair mb-2">20</span>
            <span className="text-lg text-white/80">Experts are working here</span>
          </div>
          
          <div className="flex flex-col p-8">
            <span className="text-5xl font-playfair mb-2">5</span>
            <span className="text-lg text-white/80">Years of Experiences</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
