import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Admin Context & Components
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';

// Admin Pages
import { AdminLogin } from './pages/AdminLogin';
import { Dashboard } from './pages/Dashboard';
import { MenuManagement } from './pages/MenuManagement';
import { CategoryManagement } from './pages/CategoryManagement';
import { PlatterManagement } from './pages/PlatterManagement';
import { GalleryManagement } from './pages/GalleryManagement';
import { ReviewManagement } from './pages/ReviewManagement';
import { OrderManagement } from './pages/OrderManagement';
import { ReservationManagement } from './pages/ReservationManagement';
import { CustomerManagement } from './pages/CustomerManagement';
import { MessageManagement } from './pages/MessageManagement';
import { SettingsManagement } from './pages/SettingsManagement';
import { ProfileSettings } from './pages/ProfileSettings';
import { AccessDenied } from './pages/AccessDenied';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Login & Access Denied */}
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/access-denied" element={<AccessDenied />} />

            {/* Protected Admin CMS Dashboard */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="platters" element={<PlatterManagement />} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="reviews" element={<ReviewManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="reservations" element={<ReservationManagement />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="messages" element={<MessageManagement />} />
              <Route path="settings" element={<SettingsManagement />} />
              <Route path="profile" element={<ProfileSettings />} />

              {/* /admin/* alias routes */}
              <Route path="admin" element={<Dashboard />} />
              <Route path="admin/menu" element={<MenuManagement />} />
              <Route path="admin/categories" element={<CategoryManagement />} />
              <Route path="admin/platters" element={<PlatterManagement />} />
              <Route path="admin/gallery" element={<GalleryManagement />} />
              <Route path="admin/reviews" element={<ReviewManagement />} />
              <Route path="admin/orders" element={<OrderManagement />} />
              <Route path="admin/reservations" element={<ReservationManagement />} />
              <Route path="admin/customers" element={<CustomerManagement />} />
              <Route path="admin/messages" element={<MessageManagement />} />
              <Route path="admin/settings" element={<SettingsManagement />} />
              <Route path="admin/profile" element={<ProfileSettings />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
