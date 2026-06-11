export type NewsletterSubscribeValues = Readonly<{
  email: string;
}>;

export type NewsletterSubscriber = Readonly<{
  email: string;
  subscribedAt: string;
}>;

export class NewsletterAlreadySubscribedError extends Error {
  constructor() {
    super('ALREADY_SUBSCRIBED');
    this.name = 'NewsletterAlreadySubscribedError';
  }
}
