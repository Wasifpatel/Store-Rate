
import { useState } from 'react';
import { useAuth } from '@/components/auth/use-auth';
import { stores, ratings as allRatings, users } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/stores/star-rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Star, Users, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddStoreForm } from '@/components/forms/add-store-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Store } from '@/lib/definitions';
// import Image from 'next/image'; // Replaced with regular img tag

export default function OwnerDashboardPage() {
    const { user } = useAuth();
    const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);
    const [ownedStores, setOwnedStores] = useState(() => stores.filter(store => store.ownerId === user?.id));

    const handleStoreAdded = (newStore: Store) => {
        setOwnedStores(prevStores => [newStore, ...prevStores]);
        setIsAddStoreOpen(false);
    };

    const getStoreData = (storeId: string) => {
        const storeRatings = allRatings.filter(r => r.storeId === storeId);
        const averageRating = storeRatings.length > 0
            ? storeRatings.reduce((acc, r) => acc + r.rating, 0) / storeRatings.length
            : 0;

        const reviewers = storeRatings.map(rating => {
            const reviewer = users.find(u => u.id === rating.userId);
            return {
                ...rating,
                userName: reviewer?.name || 'Anonymous',
                userAvatar: `https://api.dicebear.com/7.x/micah/svg?seed=${reviewer?.name}`,
            };
        }).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return { averageRating, reviewers, ratingCount: storeRatings.length };
    };
    
    const getInitials = (name: string) => {
      const names = name.split(' ');
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`;
      }
      return name.substring(0, 2);
    };

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">Owner Dashboard</h1>
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
            {ownedStores.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>My Stores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You do not own any stores yet. Click "Add Store" to get started.</p>
                    </CardContent>
                </Card>
            ) : ownedStores.map(store => {
                const { averageRating, reviewers, ratingCount } = getStoreData(store.id);
                return (
                    <Card key={store.id}>
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline">{store.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-1 space-y-4">
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                    <img 
                                        src={store.imageUrl} 
                                        alt={store.name} 
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                                        <Star className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                                        <p className="text-xs text-muted-foreground">Based on {ratingCount} reviews</p>
                                        <StarRating rating={averageRating} readOnly size={20} className="mt-2" />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="md:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl font-headline"><Users /> Recent Reviewers</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                                        {reviewers.length > 0 ? reviewers.map((review, index) => (
                                            <div key={review.id}>
                                                <div className="flex gap-4">
                                                    <Avatar>
                                                        <AvatarImage src={review.userAvatar} alt={review.userName} />
                                                        <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold">{review.userName}</p>
                                                            <span className="text-sm text-muted-foreground">{format(new Date(review.date), "MMM d, yyyy")}</span>
                                                        </div>
                                                        <StarRating rating={review.rating} readOnly size={16} className="my-1" />
                                                        <p className="text-foreground/80">{review.review}</p>
                                                    </div>
                                                </div>
                                                {index < reviewers.length - 1 && <Separator className="my-4" />}
                                            </div>
                                        )) : <p>No reviews for this store yet.</p>}
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
