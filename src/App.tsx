import { ConfigProvider, theme as antdTheme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/common/SiteLayout';
import { useThemeMode } from '@/hooks/useThemeMode';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
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
        <BrowserRouter>
          <SiteLayout themeMode={mode} onThemeToggle={toggleMode}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
            </Routes>
          </SiteLayout>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
