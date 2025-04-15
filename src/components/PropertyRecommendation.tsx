
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Home, MapPin, Maximize2, Clock } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  address: string;
  matchScore?: number;
  attributes?: Record<string, any>;
}

interface PropertyRecommendationProps {
  properties: Property[];
  title?: string;
}

const PropertyRecommendation = ({ properties, title = "Recommended Properties" }: PropertyRecommendationProps) => {
  const [expandedPropertyId, setExpandedPropertyId] = useState<string | null>(null);
  
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

  const togglePropertyDetails = (propertyId: string) => {
    setExpandedPropertyId(prevId => prevId === propertyId ? null : propertyId);
  };

  return (
    <div className="space-y-4 h-full overflow-y-auto pr-2">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {properties.map((property) => (
        <Card key={property.id} className="mb-4 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {property.address}
                </CardDescription>
              </div>
              {property.matchScore && (
                <Badge variant={property.matchScore > 75 ? "default" : "outline"} className="ml-2">
                  {property.matchScore}% match
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="aspect-video w-full overflow-hidden rounded-md mb-2">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <p className="text-sm text-muted-foreground">{property.description}</p>
            
            {property.attributes && expandedPropertyId === property.id && (
              <div className="mt-3 space-y-2 pt-2 border-t">
                <div className="flex flex-wrap gap-3">
                  {property.attributes.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{property.attributes.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.attributes.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{property.attributes.bathrooms} Baths</span>
                    </div>
                  )}
                  {property.attributes.squareFeet && (
                    <div className="flex items-center">
                      <Maximize2 className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{property.attributes.squareFeet} sq ft</span>
                    </div>
                  )}
                  {property.attributes.yearBuilt && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">Built {property.attributes.yearBuilt}</span>
                    </div>
                  )}
                </div>
                
                {property.attributes.highlights && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {property.attributes.highlights.map((highlight: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="font-semibold">{property.price}</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => togglePropertyDetails(property.id)}
              >
                {expandedPropertyId === property.id ? "Less Info" : "More Info"}
              </Button>
              <Button size="sm">View Details</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PropertyRecommendation;
