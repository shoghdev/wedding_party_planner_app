import { ExperienceCtaSection } from '@/components/experience/ExperienceCtaSection';
import { ExperienceGallerySection } from '@/components/experience/ExperienceGallerySection';
import { ExperienceHeroSection } from '@/components/experience/ExperienceHeroSection';
import { ProcessTimelineSection } from '@/components/experience/ProcessTimelineSection';
import { WhyCouplesSection } from '@/components/experience/WhyCouplesSection';
import styles from './index.module.css';

export const ExperiencePage = () => (
  <div data-page="experience" className={styles.page}>
    <ExperienceHeroSection />
    <ProcessTimelineSection />
    <WhyCouplesSection />
    <ExperienceGallerySection />
    <ExperienceCtaSection />
  </div>
);
