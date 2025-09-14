import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

// Import pages
import LoginPage from '@/app/login/page'
import RegisterPage from '@/app/register/page'
import AppLayout from '@/app/(app)/layout'
import AccountPage from '@/app/(app)/account/page'
import StoresPage from '@/app/(app)/stores/page'
import StoreDetailPage from '@/app/(app)/stores/[id]/page'
import AdminDashboardPage from '@/app/(app)/admin/dashboard/page'
import AdminStoresPage from '@/app/(app)/admin/stores/page'
import AdminUsersPage from '@/app/(app)/admin/users/page'
import OwnerDashboardPage from '@/app/(app)/owner/dashboard/page'

function App() {
  return (
    <div className="font-body antialiased">
      <Routes>
        {/* Auth routes - no sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* App routes - with sidebar */}
        <Route path="/" element={<AppLayout />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/stores/:id" element={<StoreDetailPage />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/stores" element={<AdminStoresPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          
          {/* Owner routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/stores" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
