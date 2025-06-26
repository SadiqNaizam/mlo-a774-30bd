import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import LiveLocationMap from '@/components/LiveLocationMap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(10);
  const totalStages = 4; // As defined in OrderTracker component

  useEffect(() => {
    // Simulate order stage progression every 8 seconds
    const stageTimer = setInterval(() => {
      setCurrentStage(prevStage => {
        if (prevStage < totalStages - 1) {
          return prevStage + 1;
        }
        clearInterval(stageTimer); // Stop when the last stage is reached
        return prevStage;
      });
    }, 8000);

    // Simulate progress bar filling up. It should complete roughly with the stages.
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer); // Stop at 100
          return 100;
        }
        return prev + 4; // Fills up over ~20-25 seconds
      });
    }, 1000);

    // Cleanup timers when the component unmounts
    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {currentStage === 3 ? "Your Order has Arrived!" : "Your Order is on its Way!"}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Order #D12345-67890
            </p>
          </div>

          {/* Delivery Estimate & Progress Card */}
          <Card className="mb-8 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Clock className="w-8 h-8 text-orange-500" />
              <div>
                <CardTitle>Estimated Delivery Time</CardTitle>
                <CardDescription>Approximately 15-20 minutes remaining</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
            </CardContent>
          </Card>

          {/* Main content grid for tracker and map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <OrderTracker currentStage={currentStage} />
            </div>
            <div className="flex items-center justify-center">
              <LiveLocationMap />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTrackingPage;