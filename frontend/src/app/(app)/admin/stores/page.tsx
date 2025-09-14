import { useState, useMemo } from 'react';
import { stores as initialStores, getAverageRating } from '@/lib/data';
import type { Store, StoreCategory } from '@/lib/definitions';
import { storeCategories } from '@/lib/definitions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddStoreForm } from '@/components/forms/add-store-form';
import { StarRating } from '@/components/stores/star-rating';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import Image from 'next/image'; // Replaced with regular img tag
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function AdminStoresPage() {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [filters, setFilters] = useState({ name: '', address: '', category: 'all' as StoreCategory | 'all' });
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const nameMatch = store.name.toLowerCase().includes(filters.name.toLowerCase());
      const addressMatch = store.address.toLowerCase().includes(filters.address.toLowerCase());
      const categoryMatch = filters.category === 'all' || store.category === filters.category;
      return nameMatch && addressMatch && categoryMatch;
    });
  }, [stores, filters]);

  const handleStoreAdded = (newStore: Store) => {
    setStores(prev => [...prev, newStore]);
    setIsAddStoreOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Store Management</h1>
            <p className="text-muted-foreground">View, filter, and add stores.</p>
        </div>
        <Dialog open={isAddStoreOpen} onOpenChange={setIsAddStoreOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2" />Add Store</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a New Store</DialogTitle>
                </DialogHeader>
                <AddStoreForm onStoreAdded={handleStoreAdded} />
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine the store list based on specific criteria.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Filter by name..."
              value={filters.name}
              onChange={e => handleFilterChange('name', e.target.value)}
            />
            <Input
              placeholder="Filter by address..."
              value={filters.address}
              onChange={e => handleFilterChange('address', e.target.value)}
            />
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {storeCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </CardContent>
      </Card>
      
      <Card className="mt-8">
        <CardHeader>
            <CardTitle>Stores List</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStores.map(store => (
                    <TableRow key={store.id}>
                      <TableCell>
                        <img
                            src={store.imageUrl}
                            alt={store.name}
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{store.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{store.category}</Badge>
                      </TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell>{store.contactInfo || 'N/A'}</TableCell>
                      <TableCell>
                        <StarRating rating={getAverageRating(store.id)} readOnly size={16} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredStores.length === 0 && <p className="text-center text-muted-foreground py-8">No stores found.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
