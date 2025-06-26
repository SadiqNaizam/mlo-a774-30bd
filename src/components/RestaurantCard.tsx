import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  imageUrl: string;
  name: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: number; // in minutes
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  imageUrl,
  name,
  cuisineTypes,
  rating,
  deliveryTime,
}) => {
  console.log(`RestaurantCard loaded for: ${name}`);

  return (
    <Link to="/restaurant-detail" state={{ restaurantId: id }} className="block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Delish+Delivery'}
              alt={`Image of ${name} restaurant`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-primary">{name}</h3>
            <div className="flex flex-wrap gap-1 mb-3">
              {cuisineTypes.slice(0, 3).map((cuisine) => (
                <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime} min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;