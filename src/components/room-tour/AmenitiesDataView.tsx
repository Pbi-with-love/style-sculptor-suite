
import { RoomData } from './types';
import { MapPin } from 'lucide-react';

interface AmenitiesDataViewProps {
  amenities: RoomData['amenities'];
  propertyValueTrends: RoomData['futurePredictions']['propertyValueTrends'];
}

const AmenitiesDataView = ({ amenities, propertyValueTrends }: AmenitiesDataViewProps) => {
  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium mb-2 flex items-center gap-1">
          <MapPin size={16} className="text-red-500" />
          Hospitals
        </div>
        {amenities.hospitals.map(hospital => (
          <div key={hospital.name} className="flex justify-between mb-1">
            <span>{hospital.name}</span>
            <span className="text-sm text-primary font-semibold">{hospital.distance}</span>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium mb-2 flex items-center gap-1">
          <MapPin size={16} className="text-blue-500" />
          Schools
        </div>
        {amenities.schools.map(school => (
          <div key={school.name} className="mb-1">
            <div className="flex justify-between">
              <span>{school.name}</span>
              <span className="text-sm text-primary font-semibold">{school.distance}</span>
            </div>
            <div className="text-sm text-green-600 font-semibold">Rating: {school.rating}</div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium mb-2 flex items-center gap-1">
          <MapPin size={16} className="text-green-500" />
          Parks
        </div>
        {amenities.parks.map(park => (
          <div key={park.name} className="mb-1">
            <div className="flex justify-between">
              <span>{park.name}</span>
              <span className="text-sm text-primary font-semibold">{park.distance}</span>
            </div>
            <div className="text-sm text-gray-600">Size: {park.size}</div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <div className="font-medium mb-2 flex items-center gap-1">
          <MapPin size={16} className="text-purple-500" />
          Shopping
        </div>
        {amenities.shopping.map(shop => (
          <div key={shop.name} className="flex justify-between mb-1">
            <span>{shop.name}</span>
            <span className="text-sm text-primary font-semibold">{shop.distance}</span>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-gray-100 rounded-md">
        <h4 className="font-medium mb-2">Property Value Forecast</h4>
        
        {propertyValueTrends.map(trend => (
          <div key={trend.year} className="flex justify-between items-center mb-1">
            <span>{trend.year}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{trend.estimatedValue}</span>
              <span className={trend.changePercent.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {trend.changePercent}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesDataView;
