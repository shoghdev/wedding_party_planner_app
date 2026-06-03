export const QUERY_KEYS = {
  home: {
    content: ['home', 'content'] as const,
    services: ['home', 'services'] as const,
    stories: ['home', 'stories'] as const,
  },
  services: {
    page: ['services', 'page'] as const,
  },
  portfolio: {
    page: ['portfolio', 'page'] as const,
  },
  about: {
    content: ['about', 'content'] as const,
    stats: ['about', 'stats'] as const,
    differentiators: ['about', 'differentiators'] as const,
  },
  experience: {
    content: ['experience', 'content'] as const,
    processSteps: ['experience', 'processSteps'] as const,
    whyCouples: ['experience', 'whyCouples'] as const,
    gallery: ['experience', 'gallery'] as const,
  },
} as const;
