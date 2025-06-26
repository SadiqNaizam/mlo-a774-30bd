import React, 'react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Minus, Plus } from 'lucide-react';

interface CustomizationChoice {
  id: string;
  name: string;
  priceModifier: number;
}

interface CustomizationOption {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  choices: CustomizationChoice[];
}

interface MenuItemProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  customizationOptions?: CustomizationOption[];
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  customizationOptions = [],
}) => {
  console.log(`MenuItem loaded: ${name}`);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const handleAddToCart = () => {
    setIsDialogOpen(false); // Close the dialog
    toast({
      title: 'Item Added to Cart!',
      description: `${quantity}x ${name} has been successfully added.`,
    });
    // Reset state for next time
    setQuantity(1);
    setSelections({});
  };

  const handleSelectionChange = (optionId: string, choiceId: string, type: 'single' | 'multiple') => {
    setSelections(prev => {
      const newSelections = { ...prev };
      if (type === 'single') {
        newSelections[optionId] = [choiceId];
      } else {
        const currentChoices = newSelections[optionId] || [];
        if (currentChoices.includes(choiceId)) {
          newSelections[optionId] = currentChoices.filter(c => c !== choiceId);
        } else {
          newSelections[optionId] = [...currentChoices, choiceId];
        }
      }
      return newSelections;
    });
  };

  const calculatedPrice = useMemo(() => {
    let finalPrice = price;
    customizationOptions.forEach(option => {
      const selectedChoiceIds = selections[option.id] || [];
      selectedChoiceIds.forEach(choiceId => {
        const choice = option.choices.find(c => c.id === choiceId);
        if (choice) {
          finalPrice += choice.priceModifier;
        }
      });
    });
    return finalPrice * quantity;
  }, [price, quantity, selections, customizationOptions]);

  const hasCustomizations = customizationOptions && customizationOptions.length > 0;

  // Simplified add for items without customization
  const handleSimpleAdd = () => {
    toast({
        title: 'Item Added to Cart!',
        description: `1x ${name} has been successfully added.`,
    });
  }

  return (
    <div className="flex items-start justify-between gap-4 p-4 border-b">
      <div className="flex-1">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <p className="text-md font-semibold mt-2">${price.toFixed(2)}</p>
      </div>
      <div className="flex-shrink-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex items-center self-center">
        {hasCustomizations ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" aria-label={`Add ${name} to cart`}>
                <PlusCircle className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {customizationOptions.map(option => (
                  <div key={option.id} className="space-y-2">
                    <h4 className="font-semibold">{option.title}</h4>
                    {option.type === 'single' ? (
                      <RadioGroup onValueChange={(value) => handleSelectionChange(option.id, value, 'single')}>
                        {option.choices.map(choice => (
                          <div key={choice.id} className="flex items-center justify-between">
                            <Label htmlFor={choice.id} className="flex-1">{choice.name}</Label>
                            <span className="text-sm text-muted-foreground mr-4">
                              {choice.priceModifier > 0 ? `+$${choice.priceModifier.toFixed(2)}` : ''}
                            </span>
                            <RadioGroupItem value={choice.id} id={choice.id} />
                          </div>
                        ))নিং}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-2">
                        {option.choices.map(choice => (
                           <div key={choice.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={choice.id} 
                                  onCheckedChange={() => handleSelectionChange(option.id, choice.id, 'multiple')}
                                />
                                <Label htmlFor={choice.id}>{choice.name}</Label>
                            </div>
                             <span className="text-sm text-muted-foreground">
                               {choice.priceModifier > 0 ? `+$${choice.priceModifier.toFixed(2)}` : ''}
                             </span>
                          </div>
                        ))নিং}
                      </div>
                    )}
                  </div>
                ))নিং}
              </div>
              <DialogFooter className="flex-col sm:flex-row sm:justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full sm:w-auto" onClick={handleAddToCart}>
                  Add to Cart - ${calculatedPrice.toFixed(2)}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
            <Button size="icon" aria-label={`Add ${name} to cart`} onClick={handleSimpleAdd}>
                <PlusCircle className="h-6 w-6" />
            </Button>
        )}
      </div>
    </div>
  );
};

export default MenuItem;