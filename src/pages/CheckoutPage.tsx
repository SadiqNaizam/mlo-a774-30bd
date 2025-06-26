import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

// Icons
import { CreditCard, Wallet, Apple } from 'lucide-react';

// Form Schema Validation
const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a city." }),
  zipCode: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code." }),
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Please enter a valid 16-digit card number." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Use MM/YY format." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "Enter a valid CVC." }),
});

// Placeholder Data
const cartItems = [
  { id: 1, name: 'Spicy Tuna Roll', price: 12.99, quantity: 2 },
  { id: 2, name: 'Miso Soup', price: 3.50, quantity: 1 },
  { id: 3, name: 'Edamame', price: 5.00, quantity: 1 },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [tipPercentage, setTipPercentage] = useState(15);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      zipCode: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const subtotal = useMemo(() => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), []);
  const deliveryFee = 5.00;
  const tipAmount = useMemo(() => subtotal * (tipPercentage / 100), [subtotal, tipPercentage]);
  const total = useMemo(() => subtotal + deliveryFee + tipAmount, [subtotal, deliveryFee, tipAmount]);

  const handlePlaceOrder = (values: z.infer<typeof checkoutSchema>) => {
    console.log("Order submitted:", values);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Placing your order...',
        success: () => {
          navigate('/order-tracking'); // Navigate on success, path from App.tsx
          return `Your order has been placed!`;
        },
        error: 'Something went wrong.',
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePlaceOrder)} className="space-y-6">
                  {/* Delivery Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Address</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address</FormLabel>
                          <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="zipCode" render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl><Input placeholder="12345" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </CardContent>
                  </Card>

                  {/* Tipping */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Add a Tip</CardTitle>
                      <CardDescription>Your support for the delivery driver is appreciated!</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup defaultValue="15" onValueChange={(val) => setTipPercentage(Number(val))} className="flex space-x-4">
                        {[15, 20, 25].map(p => (
                          <div key={p} className="flex items-center space-x-2">
                            <RadioGroupItem value={String(p)} id={`tip-${p}`} />
                            <Label htmlFor={`tip-${p}`}>{p}%</Label>
                          </div>
                        ))}\
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Payment */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="font-medium"><CreditCard className="mr-2 h-5 w-5"/>Credit Card</AccordionTrigger>
                          <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="cardName" render={({ field }) => (
                                <FormItem className="md:col-span-2"><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                <FormItem className="md:col-span-2"><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                <FormItem><FormLabel>Expiry</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="cvc" render={({ field }) => (
                                <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                           <AccordionTrigger className="font-medium text-muted-foreground"><Wallet className="mr-2 h-5 w-5"/>PayPal</AccordionTrigger>
                           <AccordionContent>Coming soon!</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                           <AccordionTrigger className="font-medium text-muted-foreground"><Apple className="mr-2 h-5 w-5"/>Apple Pay</AccordionTrigger>
                           <AccordionContent>Coming soon!</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                   <Button type="submit" size="lg" className="w-full text-lg">
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}\
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tip ({tipPercentage}%)</span>
                      <span>${tipAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                </CardContent>
                <CardFooter className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;