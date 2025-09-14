"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { stores as allStores, getAverageRating } from '@/lib/data';
import { storeCategories, StoreCategory } from '@/lib/definitions';
import { StoreCard } from '@/components/stores/store-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<StoreCategory | 'all'>('all');

  const filteredStores = useMemo(() => {
    return allStores.filter(
      (store) => {
        const searchMatch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            store.address.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = categoryFilter === 'all' || store.category === categoryFilter;
        return searchMatch && categoryMatch;
      }
    );
  }, [searchTerm, categoryFilter]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-bold font-headline mb-2">Find Your Next Favorite Store</h1>
        <p className="text-lg text-muted-foreground">Search and discover stores rated by our community.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by store name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-base"
          />
        </div>
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as StoreCategory | 'all')}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {storeCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} averageRating={getAverageRating(store.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No Stores Found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
