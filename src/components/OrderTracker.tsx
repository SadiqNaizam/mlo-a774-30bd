import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle, ChefHat, Bike, PartyPopper } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the stages with their details for easy mapping
const stages = [
  { name: 'Confirmed', icon: CheckCircle },
  { name: 'In the Kitchen', icon: ChefHat },
  { name: 'On its way', icon: Bike },
  { name: 'Delivered', icon: PartyPopper },
];

interface OrderTrackerProps {
  /** The current active stage, 0-based index. Defaults to 0. */
  currentStage?: number;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStage = 0 }) => {
  console.log('OrderTracker loaded');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-2xl">Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start">
          {stages.map((stage, index) => {
            const isActive = index === currentStage;
            const isCompleted = index < currentStage;

            return (
              <React.Fragment key={stage.name}>
                {/* Step Icon and Label */}
                <div className="flex flex-col items-center text-center w-20 sm:w-24">
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                      isCompleted ? "bg-green-500 border-green-600 text-white" : "",
                      isActive ? "bg-primary border-primary/80 text-primary-foreground animate-pulse" : "",
                      !isCompleted && !isActive ? "bg-muted border-muted-foreground/20 text-muted-foreground" : ""
                    )}
                  >
                    <stage.icon className="w-6 h-6" />
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-xs sm:text-sm font-semibold transition-colors duration-300",
                      isCompleted || isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {stage.name}
                  </p>
                </div>

                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="flex-1 mt-6 h-1 rounded-full mx-2 sm:mx-4">
                     <div
                        className={cn(
                            "h-full w-full rounded-full transition-colors duration-500",
                            isCompleted ? "bg-green-500" : "bg-muted-foreground/20"
                        )}
                        />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;