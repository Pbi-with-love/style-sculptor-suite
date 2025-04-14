
import { RoomData } from './types';

interface DemographicsDataViewProps {
  demographics: RoomData['demographics'];
  populationTrends: RoomData['futurePredictions']['populationTrends'];
}

const DemographicsDataView = ({ demographics, populationTrends }: DemographicsDataViewProps) => {
  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium">Population</div>
        <div className="text-2xl text-primary font-bold">{demographics.totalPopulation.toLocaleString()}</div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium mb-2">Age Distribution</div>
        {demographics.ageGroups.map((group, index) => (
          <div key={group.name} className="mb-2">
            <div className="flex justify-between text-sm">
              <span>{group.name}</span>
              <span className="font-semibold">{group.percentage}%</span>
            </div>
            <div className="w-full bg-gray-300 h-2 mt-1 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${group.percentage}%`,
                  backgroundColor: `hsl(${260 + index * 15}, 70%, 60%)`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium">Income Level</div>
        <div className="text-primary font-semibold">{demographics.incomeLevel}</div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium">Education</div>
        <div className="text-primary font-semibold">{demographics.educationLevel}</div>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <h4 className="font-medium mb-2">Future Population Trends</h4>
        
        {populationTrends.map(trend => (
          <div key={trend.year} className="mb-2">
            <div className="font-medium text-sm">{trend.year}</div>
            <div className="flex justify-between text-sm">
              <span>Population:</span>
              <span className="font-semibold">{trend.population.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Median Age:</span>
              <span className="font-semibold">{trend.medianAge} years</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemographicsDataView;
