import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Filter, Star, Clock, DollarSign } from 'lucide-react';

const sampleRestaurants = [
  { id: 1, name: 'Sushi Palace', cuisineTypes: ['Sushi', 'Japanese', 'Asian'], rating: 4.8, deliveryTime: 25, imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Pizza Heaven', cuisineTypes: ['Pizza', 'Italian'], rating: 4.5, deliveryTime: 30, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Burger Joint', cuisineTypes: ['Burgers', 'American', 'Fast Food'], rating: 4.2, deliveryTime: 20, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Taco Town', cuisineTypes: ['Tacos', 'Mexican'], rating: 4.7, deliveryTime: 22, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Green Leaf Salad Bar', cuisineTypes: ['Salads', 'Healthy'], rating: 4.9, deliveryTime: 15, imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Noodle House', cuisineTypes: ['Noodles', 'Vietnamese', 'Asian'], rating: 4.6, deliveryTime: 35, imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop' },
  { id: 7, name: "Mama's Pasta", cuisineTypes: ['Italian', 'Pasta'], rating: 4.8, deliveryTime: 40, imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326e22e3924?q=80&w=800&auto=format&fit=crop' },
  { id: 8, name: 'The Curry Pot', cuisineTypes: ['Indian', 'Curry'], rating: 4.4, deliveryTime: 45, imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop' },
];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  const [deliveryTime, setDeliveryTime] = useState([45]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <main className="flex-grow container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Restaurants near you</h1>
          <p className="text-muted-foreground">
            Explore {sampleRestaurants.length} restaurants ready to deliver to your door.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                  <div className="space-y-6">
                    {/* Sort By on mobile */}
                    <div className="lg:hidden">
                       <Label className="text-base font-semibold">Sort By</Label>
                        <Select defaultValue="rating">
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="rating">Rating: High to Low</SelectItem>
                                <SelectItem value="delivery">Delivery Time: Fastest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Cuisine Filter */}
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Cuisine</Label>
                      <div className="space-y-2">
                        {['Sushi', 'Pizza', 'Burgers', 'Italian', 'Mexican', 'Healthy'].map((cuisine) => (
                          <div key={cuisine} className="flex items-center space-x-2">
                            <Checkbox id={cuisine.toLowerCase()} />
                            <Label htmlFor={cuisine.toLowerCase()} className="font-normal">{cuisine}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    {/* Rating Filter */}
                    <div className="space-y-2">
                      <Label className="text-base font-semibold flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> Rating</Label>
                       <div className="space-y-2">
                        {[4, 3, 2].map(star => (
                          <div key={star} className="flex items-center space-x-2">
                            <Checkbox id={`star-${star}`} />
                            <Label htmlFor={`star-${star}`} className="font-normal flex items-center">{star} stars & up</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    {/* Delivery Time Filter */}
                    <div className="space-y-2">
                       <Label htmlFor="delivery-time" className="text-base font-semibold flex items-center gap-1"><Clock className="w-4 h-4" /> Max Delivery Time</Label>
                       <div className="flex justify-between text-sm text-muted-foreground">
                          <span>5 min</span>
                          <span>{deliveryTime[0]} min</span>
                          <span>60 min</span>
                       </div>
                       <Slider
                          id="delivery-time"
                          defaultValue={deliveryTime}
                          onValueChange={setDeliveryTime}
                          max={60}
                          min={5}
                          step={5}
                       />
                    </div>
                    <Separator />
                     {/* Price Range */}
                    <div className="space-y-2">
                        <Label className="text-base font-semibold flex items-center gap-1"><DollarSign className="w-4 h-4" /> Price Range</Label>
                        <div className="flex items-center space-x-2">
                            {['$', '$$', '$$$', '$$$$'].map(price => (
                                <Button key={price} variant="outline" size="sm" className="flex-1">{price}</Button>
                            ))}
                        </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>

          {/* Restaurant List */}
          <section className="lg:col-span-3">
            <div className="flex justify-end mb-4 hidden lg:flex">
              <Select defaultValue="rating">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="delivery">Delivery Time: Fastest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;