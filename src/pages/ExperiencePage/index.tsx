import { ExperienceCtaSection } from '@/components/experience/ExperienceCtaSection';
import { ExperienceGallerySection } from '@/components/experience/ExperienceGallerySection';
import { ExperienceHeroSection } from '@/components/experience/ExperienceHeroSection';
import { ProcessTimelineSection } from '@/components/experience/ProcessTimelineSection';
import { WhyCouplesSection } from '@/components/experience/WhyCouplesSection';

export const ExperiencePage = () => (
  <div data-page="experience">
    <ExperienceHeroSection />
    <ProcessTimelineSection />
    <WhyCouplesSection />
    <ExperienceGallerySection />
    <ExperienceCtaSection />
  </div>
);
