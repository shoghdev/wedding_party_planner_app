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
} as const;
