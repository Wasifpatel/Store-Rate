import { Link } from 'react-router-dom';
// import Image from 'next/image'; // Replaced with regular img tag
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Store } from '@/lib/definitions';
import { StarRating } from '@/components/stores/star-rating';
import { MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';

interface StoreCardProps {
  store: Store;
  averageRating: number;
}

export function StoreCard({ store, averageRating }: StoreCardProps) {
  return (
    <Link to={`/stores/${store.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <img
              src={store.imageUrl}
              alt={store.name}
              className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
              data-ai-hint={store.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <CardTitle className="font-headline text-xl mb-2">{store.name}</CardTitle>
              <Badge variant="outline" className="shrink-0">{store.category}</Badge>
            </div>
            <div className="flex items-start text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4 mr-2 shrink-0 mt-1" />
              <span>{store.address}</span>
            </div>
          </div>
          <div className="mt-4">
            <StarRating rating={averageRating} readOnly />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
