import { StatsCards } from "@/components/admin/stats-cards";
import { users, stores, ratings } from "@/lib/data";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Admin Dashboard</h1>
      <StatsCards 
        totalUsers={users.length}
        totalStores={stores.length}
        totalRatings={ratings.length}
      />
    </div>
  );
}
