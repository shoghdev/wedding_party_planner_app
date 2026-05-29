export const QUERY_KEYS = {
  home: {
    content: ['home', 'content'] as const,
    services: ['home', 'services'] as const,
    stories: ['home', 'stories'] as const,
  },
  about: {
    content: ['about', 'content'] as const,
    stats: ['about', 'stats'] as const,
    differentiators: ['about', 'differentiators'] as const,
  },
} as const;
