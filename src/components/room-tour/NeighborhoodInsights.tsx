
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, MapPin } from 'lucide-react';
import { RoomData } from './types';
import EnvironmentalDataView from './EnvironmentalDataView';
import DemographicsDataView from './DemographicsDataView';
import AmenitiesDataView from './AmenitiesDataView';

interface NeighborhoodInsightsProps {
  roomData: RoomData;
}

const NeighborhoodInsights = ({ roomData }: NeighborhoodInsightsProps) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Neighborhood Insights</h3>
      
      <Tabs defaultValue="environmental">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="environmental" className="flex items-center gap-1">
            <BarChart3 size={14} />
            Environmental
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center gap-1">
            <Users size={14} />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="amenities" className="flex items-center gap-1">
            <MapPin size={14} />
            Amenities
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="environmental">
          <EnvironmentalDataView 
            environmentalData={roomData.environmentalData}
            futurePredictions={roomData.futurePredictions.environmentalTrends}
          />
        </TabsContent>
        
        <TabsContent value="demographics">
          <DemographicsDataView 
            demographics={roomData.demographics}
            populationTrends={roomData.futurePredictions.populationTrends}
          />
        </TabsContent>
        
        <TabsContent value="amenities">
          <AmenitiesDataView 
            amenities={roomData.amenities}
            propertyValueTrends={roomData.futurePredictions.propertyValueTrends}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeighborhoodInsights;
