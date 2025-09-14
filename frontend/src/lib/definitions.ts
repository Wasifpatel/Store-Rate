export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'owner';
};

export const storeCategories = ['Coffee Shop', 'Bookstore', 'Boutique', 'Grocery', 'Electronics', 'Bakery', 'Other'] as const;

export type StoreCategory = typeof storeCategories[number];

export type Store = {
  id: string;
  ownerId?: string;
  name: string;
  address: string;
  imageUrl: string;
  imageHint: string;
  category: StoreCategory;
  contactInfo?: string;
};

export type Rating = {
  id:string;
  storeId: string;
  userId: string;
  rating: number;
  review: string;
  date: string;
};
