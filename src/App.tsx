import { App as AntApp, ConfigProvider, theme as antdTheme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRouteFallback } from '@/components/admin/AdminRouteFallback';
import { SiteLayout } from '@/components/common/SiteLayout';
import { useThemeMode } from '@/hooks/useThemeMode';
import { lazyNamed } from '@/utils/lazyNamed';
import { AdminAuthProvider } from '@/store/AdminAuthProvider';
import { getAntdTheme } from '@/theme/antdTheme';

const AdminApp = lazy(() =>
  import('@/routes/AdminApp').then((module) => ({ default: module.AdminApp })),
);

const HomePage = lazyNamed(() => import('@/pages/HomePage'), 'HomePage');
const ServicesPage = lazyNamed(() => import('@/pages/ServicesPage'), 'ServicesPage');
const PortfolioPage = lazyNamed(() => import('@/pages/PortfolioPage'), 'PortfolioPage');
const PortfolioDetailsPage = lazyNamed(
  () => import('@/pages/PortfolioDetailsPage'),
  'PortfolioDetailsPage',
);
const AboutPage = lazyNamed(() => import('@/pages/AboutPage'), 'AboutPage');
const ExperiencePage = lazyNamed(() => import('@/pages/ExperiencePage'), 'ExperiencePage');
const ContactPage = lazyNamed(() => import('@/pages/ContactPage'), 'ContactPage');
const BookingPage = lazy(() => import('@/pages/Booking'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const PublicRouteFallback = () => (
  <div style={{ display: 'grid', placeItems: 'center', minHeight: '40vh' }}>
    <AdminRouteFallback />
  </div>
);

const App = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          ...getAntdTheme(mode),
          algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        <AntApp>
          <AdminAuthProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/admin/*"
                  element={
                    <Suspense fallback={<AdminRouteFallback fullScreen />}>
                      <AdminApp themeMode={mode} onThemeToggle={toggleMode} />
                    </Suspense>
                  }
                />
                <Route
                  path="/*"
                  element={
                    <SiteLayout themeMode={mode} onThemeToggle={toggleMode}>
                      <Suspense fallback={<PublicRouteFallback />}>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/services" element={<ServicesPage />} />
                          <Route path="/portfolio" element={<PortfolioPage />} />
                          <Route
                            path="/portfolio/:portfolioId"
                            element={<PortfolioDetailsPage />}
                          />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/experience" element={<ExperiencePage />} />
                          <Route path="/booking" element={<BookingPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                        </Routes>
                      </Suspense>
                    </SiteLayout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AdminAuthProvider>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
