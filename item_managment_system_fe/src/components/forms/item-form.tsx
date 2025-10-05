'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNumberInput } from '@/lib/hooks/use-number-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { CreateItemData, ItemStatus } from '@/types/item';

const itemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required').max(100, 'Category must be less than 100 characters'),
  price: z.number().min(0, 'Price must be positive').optional(),
  quantity: z.number().int().min(0, 'Quantity must be non-negative').optional(),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(ItemStatus),
});

type ItemFormData = z.infer<typeof itemSchema>;

interface ItemFormProps {
  initialData?: Partial<CreateItemData>;
  onSubmit: (data: CreateItemData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const ItemForm = ({ initialData, onSubmit, onCancel, isLoading }: ItemFormProps) => {
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
      price: initialData?.price ?? undefined,
      quantity: initialData?.quantity ?? undefined,
      tags: initialData?.tags || [],
      status: initialData?.status || ItemStatus.ACTIVE,
    },
  });

  // Use the number input hook for price and quantity
  const priceInput = useNumberInput({ 
    onChange: (value) => form.setValue('price', value),
    parseFunction: parseFloat 
  });
  
  const quantityInput = useNumberInput({ 
    onChange: (value) => form.setValue('quantity', value),
    parseFunction: parseInt 
  });

  const handleSubmit = (data: ItemFormData) => {
    onSubmit({
      ...data,
      tags,
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter item title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter item description" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    min="0"
                    placeholder="Enter price" 
                    value={priceInput.getValue(field.value)}
                    onChange={priceInput.handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="Enter quantity" 
                    value={quantityInput.getValue(field.value)}
                    onChange={quantityInput.handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ItemStatus.ACTIVE}>Active</SelectItem>
                    <SelectItem value={ItemStatus.INACTIVE}>Inactive</SelectItem>
                    <SelectItem value={ItemStatus.DISCONTINUED}>Discontinued</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sm md:text-base font-medium text-gray-900">Tags</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="h-10 md:h-12 text-sm md:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
            <Button type="button" onClick={addTag} variant="outline" className="h-10 md:h-12 px-4 md:px-6 border-gray-300 hover:bg-gray-50 text-sm md:text-base">
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transition-colors duration-150">
                  {tag}
                  <X 
                    className="h-4 w-4 cursor-pointer hover:text-blue-600" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 pt-4 md:pt-6 border-t border-gray-200">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="h-10 md:h-12 px-6 md:px-8 border-gray-300 hover:bg-gray-50 text-sm md:text-base">
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="h-10 md:h-12 px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base">
            {isLoading ? 'Saving...' : 'Save Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
