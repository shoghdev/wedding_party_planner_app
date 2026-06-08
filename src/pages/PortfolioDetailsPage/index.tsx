import { useParams } from 'react-router-dom';
import { PortfolioDetailsSection } from '@/components/portfolio/PortfolioDetailsSection';

export const PortfolioDetailsPage = () => {
  const { portfolioId = '' } = useParams<{ portfolioId: string }>();

  return <PortfolioDetailsSection portfolioId={portfolioId} />;
};
