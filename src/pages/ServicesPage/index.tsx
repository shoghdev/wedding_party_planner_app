import { ServicesGridSection } from '@/components/services/ServicesGridSection';
import { ServicesHeroSection } from '@/components/services/ServicesHeroSection';

export const ServicesPage = () => (
  <div data-page="services">
    <ServicesHeroSection />
    <ServicesGridSection />
  </div>
);
