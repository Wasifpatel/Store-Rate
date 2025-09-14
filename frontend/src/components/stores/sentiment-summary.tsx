"use client";

import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SentimentSummaryProps {
  storeName: string;
  reviews: string[];
}

export function SentimentSummary({ storeName, reviews }: SentimentSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <MessageSquare />Customer Reviews
        </CardTitle>
        <CardDescription>What customers are saying about {storeName}</CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review this store!</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''} available
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="text-sm bg-muted/50 p-3 rounded-lg">
                  "{review}"
                </div>
              ))}
              {reviews.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{reviews.length - 3} more review{reviews.length - 3 !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
