import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Icons
import { Search } from 'lucide-react';

// Placeholder data for restaurant cards
const featuredRestaurants = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    name: 'Pizza Palace',
    cuisineTypes: ['Pizza', 'Italian', 'Fast Food'],
    rating: 4.5,
    deliveryTime: 30,
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1569317002804-ab796db1ccac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    name: 'Burger Bonanza',
    cuisineTypes: ['Burgers', 'American', 'Fries'],
    rating: 4.8,
    deliveryTime: 25,
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1559329022-13b3346435a3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3',
    name: 'Sushi Station',
    cuisineTypes: ['Sushi', 'Japanese', 'Asian'],
    rating: 4.9,
    deliveryTime: 40,
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3',
    name: 'Taco Town',
    cuisineTypes: ['Tacos', 'Mexican', 'Burritos'],
    rating: 4.6,
    deliveryTime: 20,
  },
];

const popularRestaurants = [
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1626700051185-36579c401319?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    name: 'Noodle House',
    cuisineTypes: ['Ramen', 'Noodles', 'Asian'],
    rating: 4.7,
    deliveryTime: 35,
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1588566565464-150fab31a868?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    name: 'The Salad Spot',
    cuisineTypes: ['Salads', 'Healthy', 'Wraps'],
    rating: 4.9,
    deliveryTime: 15,
  },
];


const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to RestaurantListingPage with search query
      navigate('/restaurant-listing', { state: { query: searchQuery.trim() } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-primary/10 py-20 md:py-32 text-center">
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')"}}
            ></div>
            <div className="container relative">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-4">
                    Your next meal, delivered.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Discover local restaurants and get your favorite food delivered fast.
                </p>
                <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex gap-2">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Enter a restaurant name or cuisine..."
                            className="w-full h-12 pl-12 text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button type="submit" size="lg" className="h-12">
                        Find Food
                    </Button>
                </form>
            </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))নিং}
            </div>
          </div>
        </section>
        
        {/* Cuisine Categories Section (Placeholder) */}
        <section className="py-16 bg-white">
            <div className="container">
                <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Browse by Cuisine</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {['Pizza', 'Sushi', 'Burgers', 'Mexican', 'Indian', 'Chinese'].map(cuisine => (
                        <Button key={cuisine} variant="outline" size="lg" onClick={() => navigate('/restaurant-listing', { state: { query: cuisine } })}>
                            {cuisine}
                        </Button>
                    ))নিং}
                </div>
            </div>
        </section>

        {/* Popular Near You Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Popular Near You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
                ))নিং}
                {/* Adding a card as a simple placeholder */}
                <Card className="flex items-center justify-center p-6 border-dashed">
                    <p className="text-muted-foreground text-center">More great restaurants coming soon!</p>
                </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;