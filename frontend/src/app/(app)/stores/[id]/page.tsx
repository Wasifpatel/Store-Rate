
import { useMemo, useState, useEffect } from 'react';
// import Image from 'next/image'; // Replaced with regular img tag
import { stores, ratings as allRatings, users, getAverageRating } from '@/lib/data';
import { useParams } from 'react-router-dom';
import { StarRating } from '@/components/stores/star-rating';
import { MapPin, MessageSquare, Star, Phone, Tag } from 'lucide-react';
import { useAuth } from '@/components/auth/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SentimentSummary } from '@/components/stores/sentiment-summary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function StoreDetailPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const params = useParams();
  const storeId = params.id as string;

  const store = useMemo(() => stores.find((s) => s.id === storeId), [storeId]);
  
  const storeRatings = useMemo(() => allRatings.filter((r) => r.storeId === storeId).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [storeId]);
  const averageRating = useMemo(() => getAverageRating(storeId), [storeId]);

  const [currentUserRating, setCurrentUserRating] = useState(0);
  const [currentUserReview, setCurrentUserReview] = useState('');

  useEffect(() => {
    if (user) {
      const userRating = storeRatings.find(r => r.userId === user.id);
      setCurrentUserRating(userRating?.rating ?? 0);
      setCurrentUserReview(userRating?.review ?? '');
    }
  }, [storeId, user, storeRatings]);

  if (!store) {
    return <div>Store not found</div>;
  }

  const handleRate = (rate: number) => {
    setCurrentUserRating(rate);
  };

  const handleSubmitRating = () => {
    if (!currentUserRating) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a rating (1-5 stars).' });
      return;
    }
    // Mock submission
    console.log({
      userId: user?.id,
      storeId: store.id,
      rating: currentUserRating,
      review: currentUserReview,
    });
    toast({ title: 'Rating Submitted', description: 'Thank you for your feedback!' });
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };

  return (
    <div>
      <div className="relative h-64 md:h-96 w-full">
        <img
          src={store.imageUrl}
          alt={store.name}
          className="object-cover w-full h-full"
          data-ai-hint={store.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-2 shadow-lg">{store.name}</h1>
          <div className="flex items-center text-gray-200 text-lg mb-1">
            <MapPin className="w-5 h-5 mr-2 shrink-0" />
            <span className="shadow-sm">{store.address}</span>
          </div>
          {store.contactInfo && (
            <div className="flex items-center text-gray-200 text-lg mb-1">
                <Phone className="w-5 h-5 mr-2 shrink-0" />
                <span className="shadow-sm">{store.contactInfo}</span>
            </div>
          )}
          <div className="flex items-center text-gray-200 text-lg">
                <Tag className="w-5 h-5 mr-2 shrink-0" />
                <Badge variant="secondary" className="shadow-sm">{store.category}</Badge>
            </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Star className="text-primary" />Your Rating</CardTitle>
                <CardDescription>Rate this store and share your experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <StarRating rating={currentUserRating} onRate={handleRate} size={32} />
                <Textarea
                  placeholder="Tell us more about your experience..."
                  value={currentUserReview}
                  onChange={(e) => setCurrentUserReview(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleSubmitRating}>Submit Your Rating</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><MessageSquare />Community Reviews</CardTitle>
                <CardDescription>See what others are saying about this store.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {storeRatings.map((rating, index) => {
                  const ratingUser = users.find(u => u.id === rating.userId);
                  return (
                    <div key={rating.id}>
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${ratingUser?.name}`} alt={ratingUser?.name} />
                          <AvatarFallback>{ratingUser ? getInitials(ratingUser.name) : 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{ratingUser?.name ?? 'Anonymous'}</p>
                            <span className="text-sm text-muted-foreground">{format(new Date(rating.date), "MMM d, yyyy")}</span>
                          </div>
                          <StarRating rating={rating.rating} readOnly size={16} className="my-1"/>
                          <p className="text-foreground/80">{rating.review}</p>
                        </div>
                      </div>
                      {index < storeRatings.length - 1 && <Separator className="my-4" />}
                    </div>
                  );
                })}
                 {storeRatings.length === 0 && <p className="text-muted-foreground text-center py-4">Be the first to review this store!</p>}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 lg:sticky lg:top-8 self-start">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="font-headline text-lg">Overall Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-6xl font-bold font-headline mb-2">{averageRating.toFixed(1)}</p>
                <StarRating rating={averageRating} readOnly size={24} className="justify-center"/>
                <p className="text-muted-foreground mt-2">Based on {storeRatings.length} reviews</p>
              </CardContent>
            </Card>

            <SentimentSummary storeName={store.name} reviews={storeRatings.map(r => r.review)} />
          </div>
        </div>
      </div>
    </div>
  );
}
