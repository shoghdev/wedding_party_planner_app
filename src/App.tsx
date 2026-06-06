import { App as AntApp, ConfigProvider, theme as antdTheme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/common/SiteLayout';
import { useThemeMode } from '@/hooks/useThemeMode';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { HomePage } from '@/pages/HomePage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { PortfolioDetailsPage } from '@/pages/PortfolioDetailsPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { AdminApp } from '@/routes/AdminApp';
import { AdminAuthProvider } from '@/store/AdminAuthProvider';
import { getAntdTheme } from '@/theme/antdTheme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

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
                  element={<AdminApp themeMode={mode} onThemeToggle={toggleMode} />}
                />
                <Route
                  path="/*"
                  element={
                    <SiteLayout themeMode={mode} onThemeToggle={toggleMode}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/portfolio" element={<PortfolioPage />} />
                        <Route path="/portfolio/:portfolioId" element={<PortfolioDetailsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/experience" element={<ExperiencePage />} />
                        <Route path="/contact" element={<ContactPage />} />
                      </Routes>
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
