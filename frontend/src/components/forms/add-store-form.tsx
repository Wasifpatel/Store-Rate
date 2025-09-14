
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Store, storeCategories } from '@/lib/definitions';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Store name is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  category: z.enum(storeCategories, { required_error: 'Category is required.' }),
  contactInfo: z.string().optional(),
  image: z.instanceof(File).optional(),
});

interface AddStoreFormProps {
  onStoreAdded: (newStore: Store) => void;
}

export function AddStoreForm({ onStoreAdded }: AddStoreFormProps) {
  const { user, addStore } = useAuth();
  const { toast } = useToast();
  const [fileName, setFileName] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      contactInfo: '',
      category: 'Other',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || (user.role !== 'owner' && user.role !== 'admin')) {
        toast({
            variant: 'destructive',
            title: 'Unauthorized',
            description: 'You do not have permission to add a store.',
        });
        return;
    }
    
    const imageUrl = values.image ? URL.createObjectURL(values.image) : undefined;

    const newStore = addStore({
        ...values,
        ownerId: user.role === 'owner' ? user.id : undefined,
        imageUrl,
    });
    
    toast({
      title: 'Store Added',
      description: `${values.name} has been successfully added.`,
    });
    
    onStoreAdded(newStore);
    form.reset();
    setFileName('');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Corner Cafe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 123 Main St, Anytown" {...field} />
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
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {storeCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Info</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 555-1234 or contact@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Store Image</FormLabel>
              <FormControl>
                <Input 
                  {...fieldProps}
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                    setFileName(file?.name || '');
                  }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adding Store...' : 'Add Store'}
        </Button>
      </form>
    </Form>
  );
}
