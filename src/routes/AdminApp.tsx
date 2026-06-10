import { Spin } from 'antd';
import { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AdminDocumentHead } from '@/components/admin/AdminDocumentHead';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminRouteFallback } from '@/components/admin/AdminRouteFallback';
import { AdminRoutes } from '@/routes/AdminRoutes';
import { useAdminAuth } from '@/store/AdminAuthProvider';
import { AdminProvider } from '@/store/AdminProvider';
import type { ThemeMode } from '@/types/theme';
import { lazyNamed } from '@/utils/lazyNamed';

const AdminLoginPage = lazyNamed(
  () => import('@/pages/admin/AdminLoginPage'),
  'AdminLoginPage',
);

type AdminAppProps = Readonly<{
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

export const AdminApp = ({ themeMode, onThemeToggle }: AdminAppProps) => {
  const { isAuthenticated, isLoading, isAuthRequired } = useAdminAuth();
  const location = useLocation();
  const isLoginRoute = location.pathname === '/admin/login';

  if (isLoading) {
    return (
      <>
        <AdminDocumentHead />
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
          <Spin size="large" />
        </div>
      </>
    );
  }

  if (isAuthRequired && !isAuthenticated && !isLoginRoute) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (isLoginRoute) {
    if (!isAuthRequired || isAuthenticated) {
      return <Navigate to="/admin" replace />;
    }

    return (
      <>
        <AdminDocumentHead />
        <Suspense fallback={<AdminRouteFallback fullScreen />}>
          <AdminLoginPage />
        </Suspense>
      </>
    );
  }

  return (
    <AdminProvider>
      <AdminDocumentHead />
      <AdminLayout themeMode={themeMode} onThemeToggle={onThemeToggle}>
        <AdminRoutes />
      </AdminLayout>
    </AdminProvider>
  );
};
