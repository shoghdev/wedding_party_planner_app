import { Spin } from 'antd';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminRoutes } from '@/routes/AdminRoutes';
import { AdminAuthProvider, useAdminAuth } from '@/store/AdminAuthProvider';
import { AdminProvider } from '@/store/AdminProvider';
import type { ThemeMode } from '@/types/theme';

type AdminAppProps = Readonly<{
  themeMode: ThemeMode;
  onThemeToggle: () => void;
}>;

const AdminAppContent = ({ themeMode, onThemeToggle }: AdminAppProps) => {
  const { session, isLoading, isAuthRequired } = useAdminAuth();
  const location = useLocation();
  const isLoginRoute = location.pathname === '/admin/login';

  if (isLoading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthRequired && !session && !isLoginRoute) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (isLoginRoute) {
    if (!isAuthRequired || session) {
      return <Navigate to="/admin" replace />;
    }

    return <AdminLoginPage />;
  }

  return (
    <AdminProvider>
      <AdminLayout themeMode={themeMode} onThemeToggle={onThemeToggle}>
        <AdminRoutes />
      </AdminLayout>
    </AdminProvider>
  );
};

export const AdminApp = ({ themeMode, onThemeToggle }: AdminAppProps) => (
  <AdminAuthProvider>
    <Routes>
      <Route
        path="*"
        element={<AdminAppContent themeMode={themeMode} onThemeToggle={onThemeToggle} />}
      />
    </Routes>
  </AdminAuthProvider>
);
