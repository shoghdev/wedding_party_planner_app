import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminRouteFallback } from '@/components/admin/AdminRouteFallback';
import { lazyNamed } from '@/utils/lazyNamed';

const AdminDashboardPage = lazyNamed(
  () => import('@/pages/admin/AdminDashboardPage'),
  'AdminDashboardPage',
);
const AdminHomePage = lazyNamed(() => import('@/pages/admin/AdminHomePage'), 'AdminHomePage');
const AdminAboutPage = lazyNamed(() => import('@/pages/admin/AdminAboutPage'), 'AdminAboutPage');
const AdminServicesPage = lazyNamed(
  () => import('@/pages/admin/AdminServicesPage'),
  'AdminServicesPage',
);
const AdminExperiencePage = lazyNamed(
  () => import('@/pages/admin/AdminExperiencePage'),
  'AdminExperiencePage',
);
const AdminGalleryPage = lazyNamed(
  () => import('@/pages/admin/AdminGalleryPage'),
  'AdminGalleryPage',
);
const AdminTestimonialsPage = lazyNamed(
  () => import('@/pages/admin/AdminTestimonialsPage'),
  'AdminTestimonialsPage',
);
const AdminContactPage = lazyNamed(
  () => import('@/pages/admin/AdminContactPage'),
  'AdminContactPage',
);
const AdminBookingsPage = lazyNamed(
  () => import('@/pages/admin/AdminBookingsPage'),
  'AdminBookingsPage',
);
const AdminEventsPage = lazyNamed(() => import('@/pages/admin/AdminEventsPage'), 'AdminEventsPage');
const AdminCodeTablePage = lazyNamed(
  () => import('@/pages/admin/AdminCodeTablePage'),
  'AdminCodeTablePage',
);
const AdminSettingsPage = lazyNamed(
  () => import('@/pages/admin/AdminSettingsPage'),
  'AdminSettingsPage',
);
const AdminProfilePage = lazyNamed(
  () => import('@/pages/admin/AdminProfilePage'),
  'AdminProfilePage',
);

export const AdminRoutes = () => (
  <Suspense fallback={<AdminRouteFallback />}>
    <Routes>
      <Route index element={<AdminDashboardPage />} />
      <Route path="home" element={<AdminHomePage />} />
      <Route path="about" element={<AdminAboutPage />} />
      <Route path="services" element={<AdminServicesPage />} />
      <Route path="experience" element={<AdminExperiencePage />} />
      <Route path="gallery" element={<AdminGalleryPage />} />
      <Route path="testimonials" element={<AdminTestimonialsPage />} />
      <Route path="contact" element={<AdminContactPage />} />
      <Route path="bookings" element={<AdminBookingsPage />} />
      <Route path="events" element={<AdminEventsPage />} />
      <Route path="code-table" element={<AdminCodeTablePage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
      <Route path="profile" element={<AdminProfilePage />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  </Suspense>
);
