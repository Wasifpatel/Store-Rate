
import type { User, Store, Rating, StoreCategory } from './definitions';
import { PlaceHolderImages } from './placeholder-images';

export const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'user@example.com', address: '123 Maple St', role: 'user' },
  { id: '2', name: 'Bob Smith', email: 'owner@example.com', address: '456 Oak Ave', role: 'owner' },
  { id: '3', name: 'Charlie Brown', email: 'admin@example.com', address: '789 Pine Ln', role: 'admin' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', address: '101 Power Ct', role: 'user' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', address: '202 Mission Rd', role: 'user' },
];

const storeImages = PlaceHolderImages;

export const stores: Store[] = [
  { id: '1', ownerId: '2', name: 'The Daily Grind', address: '123 Coffee Ave, Brewtown', category: 'Coffee Shop', imageUrl: storeImages.find(img => img.id === 'store-1')?.imageUrl || '', imageHint: storeImages.find(img => img.id === 'store-1')?.imageHint || '', contactInfo: '555-1234' },
  { id: '2', ownerId: '2', name: 'Page Turners', address: '456 Book Rd, Readville', category: 'Bookstore', imageUrl: storeImages.find(img => img.id === 'store-2')?.imageUrl || '', imageHint: storeImages.find(img => img.id === 'store-2')?.imageHint || '', contactInfo: 'contact@pageturners.com' },
  { id: '3', name: 'Chic Boutique', address: '789 Fashion St, Styleburg', category: 'Boutique', imageUrl: storeImages.find(img => img.id === 'store-3')?.imageUrl || '', imageHint: storeImages.find(img => img.id === 'store-3')?.imageHint || '' },
  { id: '4', name: 'Green Grocers', address: '101 Organic Way, Farmdale', category: 'Grocery', imageUrl: storeImages.find(img => img.id === 'store-4')?.imageUrl || '', imageHint: storeImages.find(img => img.id === 'store-4')?.imageHint || '' },
  { id: '5', name: 'Gadget Garage', address: '202 Tech Blvd, Silicon City', category: 'Electronics', imageUrl: storeImages.find(img => img.id === 'store-5')?.imageUrl || '', imageHint: storeImages.find(img => img.id === 'store-5')?.imageHint || '' },
  { id: '6', name: 'Sweet Treats', address: '303 Pastry Pl, Sugarton', category: 'Bakery', imageUrl: storeImages.find(img => img.id === 'store-6')?.imageUrl || '', imageHint: storeImages.find(img => img.id === 'store-6')?.imageHint || '' },
];

export const ratings: Rating[] = [
  { id: '1', storeId: '1', userId: '1', rating: 5, review: "Great coffee and atmosphere! The baristas are super friendly.", date: "2024-07-20" },
  { id: '2', storeId: '1', userId: '4', rating: 4, review: "Good place to work, but can get a bit crowded during peak hours.", date: "2024-07-19" },
  { id: '3', storeId: '2', userId: '1', rating: 4, review: "Lovely selection of books. A true gem for book lovers.", date: "2024-07-18" },
  { id: '4', storeId: '3', userId: '4', rating: 5, review: "Found the perfect dress here! The staff was incredibly helpful.", date: "2024-07-21" },
  { id: '5', storeId: '4', userId: '5', rating: 3, review: "A bit pricey, but the produce is very fresh.", date: "2024-07-22" },
  { id: '6', storeId: '5', userId: '1', rating: 5, review: "Top-notch service and they have all the latest gadgets.", date: "2024-07-23" },
  { id: '7', storeId: '1', userId: '5', rating: 4, review: "The WiFi is reliable and the seating is comfortable.", date: "2024-07-22" },
];

// In a real app, this would be dynamic
export function getAverageRating(storeId: string): number {
  const storeRatings = ratings.filter(r => r.storeId === storeId);
  if (storeRatings.length === 0) return 0;
  const total = storeRatings.reduce((acc, r) => acc + r.rating, 0);
  return total / storeRatings.length;
}

export function addStore(storeData: Omit<Store, 'id' | 'imageHint'> & { imageUrl?: string }): Store {
    const newId = String(stores.length + 1);
    const newStore: Store = {
      ...storeData,
      id: newId,
      imageUrl: storeData.imageUrl || `https://picsum.photos/seed/store${newId}/600/400`,
      imageHint: storeData.name.toLowerCase().split(' ').slice(0,2).join(' ')
    };
    stores.unshift(newStore);
    return newStore;
}
