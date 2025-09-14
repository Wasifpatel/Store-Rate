import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SidebarLayout } from '@/components/layout/sidebar-layout';

export default function AppLayout() {
  return (
    <SidebarLayout>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SidebarLayout>
  );
}
