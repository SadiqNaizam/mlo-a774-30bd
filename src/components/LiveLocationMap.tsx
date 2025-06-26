import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Store, Bike } from 'lucide-react';

/**
 * Defines the location coordinates using top/left percentages for positioning.
 */
type Location = {
  top: number;
  left: number;
};

/**
 * Props for the LiveLocationMap component.
 * Allows customizing the start and end points of the delivery.
 */
interface LiveLocationMapProps {
  restaurantLocation?: Location;
  customerLocation?: Location;
}

const LiveLocationMap: React.FC<LiveLocationMapProps> = ({
  restaurantLocation = { top: 15, left: 15 },
  customerLocation = { top: 80, left: 85 },
}) => {
  console.log('LiveLocationMap loaded');

  // State to hold the rider's current position on the map.
  const [riderPosition, setRiderPosition] = useState<Location>({ ...restaurantLocation });

  /**
   * Effect to simulate the rider's journey from the restaurant to the customer.
   * This animation runs once when the component mounts.
   */
  useEffect(() => {
    const journeyDuration = 20000; // 20 seconds for the full journey simulation
    const updateInterval = 100;   // Update position every 100ms for smooth animation
    const totalSteps = journeyDuration / updateInterval;
    let step = 0;

    const intervalId = setInterval(() => {
      // Stop the interval and snap to the final destination when the journey is complete.
      if (step > totalSteps) {
        setRiderPosition(customerLocation);
        clearInterval(intervalId);
        return;
      }

      // Calculate the progress of the journey (0.0 to 1.0)
      const progress = step / totalSteps;
      
      // Interpolate the new coordinates based on the progress
      const newLeft = restaurantLocation.left + (customerLocation.left - restaurantLocation.left) * progress;
      const newTop = restaurantLocation.top + (customerLocation.top - restaurantLocation.top) * progress;

      setRiderPosition({ top: newTop, left: newLeft });
      step++;
    }, updateInterval);

    // Cleanup function to clear the interval if the component is unmounted mid-journey.
    return () => clearInterval(intervalId);
  }, [restaurantLocation, customerLocation]); // Reruns the effect if locations change.

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Live Delivery Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map Canvas: A container that represents the map area. */}
        <div className="relative w-full h-80 md:h-96 bg-muted rounded-lg overflow-hidden border">
          
          {/* SVG to draw a dashed line representing the delivery route. */}
          <svg className="absolute w-full h-full" width="100%" height="100%">
            <line
              x1={`${restaurantLocation.left}%`}
              y1={`${restaurantLocation.top}%`}
              x2={`${customerLocation.left}%`}
              y2={`${customerLocation.top}%`}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Restaurant Icon */}
          <div
            className="absolute p-2 bg-background rounded-full shadow-lg flex items-center justify-center"
            style={{ top: `${restaurantLocation.top}%`, left: `${restaurantLocation.left}%`, transform: 'translate(-50%, -50%)' }}
            title="Restaurant"
          >
            <Store className="h-6 w-6 text-foreground" />
          </div>

          {/* Customer Home Icon */}
          <div
            className="absolute p-2 bg-background rounded-full shadow-lg flex items-center justify-center"
            style={{ top: `${customerLocation.top}%`, left: `${customerLocation.left}%`, transform: 'translate(-50%, -50%)' }}
            title="Your Location"
          >
            <Home className="h-6 w-6 text-primary" />
          </div>

          {/* Animated Rider Icon */}
          <div
            className="absolute p-2 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center transition-all duration-100 ease-linear"
            style={{ top: `${riderPosition.top}%`, left: `${riderPosition.left}%`, transform: 'translate(-50%, -50%)' }}
            title="Rider"
          >
            <Bike className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveLocationMap;