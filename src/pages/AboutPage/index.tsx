import { AboutHeroSection } from '@/components/about/AboutHeroSection';
import { AboutStatsSection } from '@/components/about/AboutStatsSection';
import { DifferentiatorsSection } from '@/components/about/DifferentiatorsSection';
import { OurStorySection } from '@/components/about/OurStorySection';

export const AboutPage = () => (
  <div data-page="about">
    <AboutHeroSection />
    <OurStorySection />
    <AboutStatsSection />
    <DifferentiatorsSection />
  </div>
);
