import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItem from '@/components/MenuItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin, Phone } from 'lucide-react';

// --- Placeholder Data ---

const restaurantDetails = {
  name: 'Sushi Palace',
  imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1974&auto=format&fit=crop',
  rating: 4.8,
  reviews: 250,
  cuisine: ['Sushi', 'Japanese'],
  address: '123 Ocean Ave, Seaside, CA 90210',
  hours: '11:00 AM - 10:00 PM',
  phone: '555-123-4567',
};

const menuData = {
  appetizers: [
    {
      id: 1,
      name: 'Edamame',
      description: 'Steamed young soybeans with sea salt.',
      price: 5.0,
      imageUrl: 'https://images.unsplash.com/photo-1594912239386-2a781015694a?q=80&w=1964&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Gyoza',
      description: 'Pan-fried pork and vegetable dumplings.',
      price: 7.5,
      imageUrl: 'https://images.unsplash.com/photo-1626382492429-37965a3151b7?q=80&w=2071&auto=format&fit=crop',
    },
  ],
  sushiRolls: [
    {
      id: 3,
      name: 'Spicy Tuna Roll',
      description: 'Tuna, cucumber, spicy mayo, and sesame seeds.',
      price: 9.0,
      imageUrl: 'https://images.unsplash.com/photo-1592313636932-35359424c522?q=80&w=1974&auto=format&fit=crop',
      customizationOptions: [
        {
          id: 'rice-option',
          title: 'Rice Choice',
          type: 'single' as 'single',
          choices: [
            { id: 'white', name: 'White Rice', priceModifier: 0 },
            { id: 'brown', name: 'Brown Rice', priceModifier: 1.0 },
          ],
        },
        {
          id: 'extras',
          title: 'Add Extras',
          type: 'multiple' as 'multiple',
          choices: [
            { id: 'avocado', name: 'Avocado', priceModifier: 1.5 },
            { id: 'cream-cheese', name: 'Cream Cheese', priceModifier: 1.0 },
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'California Roll',
      description: 'Crab, avocado, cucumber, and masago.',
      price: 8.5,
      imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1974&auto=format&fit=crop',
    },
     {
      id: 5,
      name: 'Dragon Roll',
      description: 'Eel and cucumber topped with avocado and eel sauce.',
      price: 14.0,
      imageUrl: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1964&auto=format&fit=crop',
    },
  ],
  sashimi: [
    {
      id: 6,
      name: 'Tuna Sashimi (5 pcs)',
      description: 'Fresh, high-quality slices of raw tuna.',
      price: 15.0,
      imageUrl: 'https://images.unsplash.com/photo-1611069234850-29c21a44c02f?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 7,
      name: 'Salmon Sashimi (5 pcs)',
      description: 'Rich and buttery slices of raw salmon.',
      price: 14.0,
      imageUrl: 'https://images.unsplash.com/photo-1553641243-c7a86894429d?q=80&w=1974&auto=format&fit=crop',
    },
  ],
};

const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="relative h-48 md:h-64">
            <img
                src={restaurantDetails.imageUrl}
                alt={`${restaurantDetails.name} interior`}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
        </section>

        <div className="container mx-auto px-4 -mt-16 sm:-mt-20">
            <Card className="shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {restaurantDetails.cuisine.map(tag => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))নিং}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{restaurantDetails.name}</h1>
                             <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span>{restaurantDetails.rating} ({restaurantDetails.reviews} reviews)</span>
                                </div>
                                <span>$$$</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex-shrink-0">
                            <Button>View Cart</Button>
                        </div>
                    </div>
                   
                    <div className="border-t my-6" />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{restaurantDetails.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Open Today: {restaurantDetails.hours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{restaurantDetails.phone}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <section className="mt-8">
                <Tabs defaultValue="sushi-rolls" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
                        <TabsTrigger value="sushi-rolls">Sushi Rolls</TabsTrigger>
                        <TabsTrigger value="sashimi">Sashimi</TabsTrigger>
                    </TabsList>
                    <TabsContent value="appetizers">
                        <Card>
                            <CardContent className="p-0">
                                {menuData.appetizers.map((item) => <MenuItem key={item.id} {...item} />)}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sushi-rolls">
                         <Card>
                            <CardContent className="p-0">
                                {menuData.sushiRolls.map((item) => <MenuItem key={item.id} {...item} />)}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sashimi">
                         <Card>
                            <CardContent className="p-0">
                                {menuData.sashimi.map((item) => <MenuItem key={item.id} {...item} />)}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;