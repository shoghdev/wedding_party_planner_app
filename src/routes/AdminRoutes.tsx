import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminAboutPage } from '@/pages/admin/AdminAboutPage';
import { AdminBookingsPage } from '@/pages/admin/AdminBookingsPage';
import { AdminCodeTablePage } from '@/pages/admin/AdminCodeTablePage';
import { AdminContactPage } from '@/pages/admin/AdminContactPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminEventsPage } from '@/pages/admin/AdminEventsPage';
import { AdminExperiencePage } from '@/pages/admin/AdminExperiencePage';
import { AdminGalleryPage } from '@/pages/admin/AdminGalleryPage';
import { AdminHomePage } from '@/pages/admin/AdminHomePage';
import { AdminServicesPage } from '@/pages/admin/AdminServicesPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';
import { AdminStatisticsPage } from '@/pages/admin/AdminStatisticsPage';
import { AdminTestimonialsPage } from '@/pages/admin/AdminTestimonialsPage';

export const AdminRoutes = () => (
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
    <Route path="statistics" element={<AdminStatisticsPage />} />
    <Route path="code-table" element={<AdminCodeTablePage />} />
    <Route path="settings" element={<AdminSettingsPage />} />
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
);
