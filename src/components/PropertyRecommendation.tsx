
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  address: string;
}

interface PropertyRecommendationProps {
  properties: Property[];
}

const PropertyRecommendation = ({ properties }: PropertyRecommendationProps) => {
  if (properties.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6 flex items-center justify-center h-full">
          <p className="text-center text-muted-foreground">
            No properties found. Try adjusting your search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto pr-2">
      <h2 className="text-xl font-playfair mb-4">Recommended Properties</h2>
      {properties.map((property) => (
        <Card key={property.id} className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{property.title}</CardTitle>
            <CardDescription>{property.address}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="aspect-video w-full overflow-hidden rounded-md mb-2">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">{property.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="font-semibold">{property.price}</span>
            <button className="text-sm underline">View Details</button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PropertyRecommendation;
