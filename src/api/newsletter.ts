import { isValidEmail, sanitizeEmailParam } from '@/api/emailjsClient';
import {
  NewsletterAlreadySubscribedError,
  type NewsletterSubscriber,
} from '@/types/newsletter';

const STORAGE_KEY = 'dream-celebrate-newsletter-subscribers';

const normalizeEmail = (email: string): string => sanitizeEmailParam(email).toLowerCase();

export const loadNewsletterSubscribers = (): NewsletterSubscriber[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as NewsletterSubscriber[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (entry): entry is NewsletterSubscriber =>
        typeof entry?.email === 'string' &&
        typeof entry?.subscribedAt === 'string' &&
        isValidEmail(entry.email),
    );
  } catch {
    return [];
  }
};

export const subscribeToNewsletter = async (email: string): Promise<NewsletterSubscriber> => {
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error('INVALID_EMAIL');
  }

  const subscribers = loadNewsletterSubscribers();

  if (subscribers.some((entry) => normalizeEmail(entry.email) === normalizedEmail)) {
    throw new NewsletterAlreadySubscribedError();
  }

  const subscriber: NewsletterSubscriber = {
    email: normalizedEmail,
    subscribedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscribers, subscriber]));

  return subscriber;
};
