
import { RoomData } from './types';
import { ShieldCheck } from 'lucide-react';

interface EnvironmentalDataViewProps {
  environmentalData: RoomData['environmentalData'];
  futurePredictions: RoomData['futurePredictions']['environmentalTrends'];
}

const EnvironmentalDataView = ({ environmentalData, futurePredictions }: EnvironmentalDataViewProps) => {
  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="flex justify-between items-center">
          <span className="font-medium flex items-center gap-1">
            <ShieldCheck size={16} className="text-primary" />
            Noise Level
          </span>
          <span className={`font-bold ${environmentalData.noiseLevel > 7 ? 'text-red-500' : environmentalData.noiseLevel > 4 ? 'text-yellow-500' : 'text-green-500'}`}>
            {environmentalData.noiseLevel}/10
          </span>
        </div>
        <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${environmentalData.noiseLevel > 7 ? 'bg-red-500' : environmentalData.noiseLevel > 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${(environmentalData.noiseLevel / 10) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="flex justify-between items-center">
          <span className="font-medium flex items-center gap-1">
            <ShieldCheck size={16} className="text-primary" />
            Crime Rate
          </span>
          <span className={`font-bold ${environmentalData.crimeRate > 7 ? 'text-red-500' : environmentalData.crimeRate > 4 ? 'text-yellow-500' : 'text-green-500'}`}>
            {environmentalData.crimeRate}/10
          </span>
        </div>
        <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${environmentalData.crimeRate > 7 ? 'bg-red-500' : environmentalData.crimeRate > 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${(environmentalData.crimeRate / 10) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="flex justify-between items-center">
          <span className="font-medium flex items-center gap-1">
            <ShieldCheck size={16} className="text-primary" />
            Air Quality
          </span>
          <span className={`font-bold ${(10 - environmentalData.pollution) < 3 ? 'text-red-500' : (10 - environmentalData.pollution) < 6 ? 'text-yellow-500' : 'text-green-500'}`}>
            {10 - environmentalData.pollution}/10
          </span>
        </div>
        <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${(10 - environmentalData.pollution) < 3 ? 'bg-red-500' : (10 - environmentalData.pollution) < 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${((10 - environmentalData.pollution) / 10) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="flex justify-between items-center">
          <span className="font-medium flex items-center gap-1">
            <ShieldCheck size={16} className="text-primary" />
            Green Space
          </span>
          <span className={`font-bold ${environmentalData.greenSpaceAccess < 3 ? 'text-red-500' : environmentalData.greenSpaceAccess < 6 ? 'text-yellow-500' : 'text-green-500'}`}>
            {environmentalData.greenSpaceAccess}/10
          </span>
        </div>
        <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${environmentalData.greenSpaceAccess < 3 ? 'bg-red-500' : environmentalData.greenSpaceAccess < 6 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${(environmentalData.greenSpaceAccess / 10) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <h4 className="font-medium mb-2">Future Environmental Trends</h4>
        
        <div className="space-y-1">
          {futurePredictions.map(trend => (
            <div key={trend.year} className="flex items-center justify-between text-sm">
              <span>{trend.year}</span>
              <div className="flex gap-2">
                <span className="text-green-500">Air: {trend.airQuality}</span>
                <span className="text-blue-500">Green: {trend.greenSpace}</span>
                <span className="text-amber-500">Noise: {trend.noiseLevel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalDataView;
