import { EXPERIENCE_HERO_HEYGEN_VIDEO_URL } from '@/consts/experienceHeroMedia';
import type { AdminState } from '@/types/admin';

export const ADMIN_SEED_DATA: AdminState = {
  home: {
    heroMainImageUrl:
      'https://i.pinimg.com/736x/d8/c0/e1/d8c0e17972009a1c03ba820ffa958c59.jpg',
    heroPolaroidOneUrl:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80',
    heroPolaroidTwoUrl:
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=80',
    heroAccentImageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
    aboutImageUrl:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80',
  },
  about: {
    heroImageUrl: '/images/about/hero.webp',
    storyImageUrl: '/images/about/story.webp',
  },
  experience: {
    heroImageUrl: '/images/experience/heroImage.jpg',
    heroVideoUrl: EXPERIENCE_HERO_HEYGEN_VIDEO_URL,
    whyCouplesImageUrl: '/images/experience/why-couples.webp',
    ctaImageUrl: '/images/experience/cta-candles.jpg',
  },
  contact: {
    phone: '+374 10 123 456',
    email: 'hello@dreamandcelebrate.com',
    address: 'Yerevan, RA',
    hours: 'Mon – Fri, 10:00 – 18:00',
    decorImageUrl: '/images/experience/cta-roses.jpg',
  },
  services: [
    {
      id: 'svc-wedding',
      title: 'Full Wedding Planning',
      description: 'End-to-end planning for elegant, stress-free wedding days.',
      imageUrl:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
      iconKey: 'wedding',
      status: 'published',
    },
    {
      id: 'svc-parties',
      title: 'Private Celebrations',
      description: 'Intimate parties and milestone events with refined styling.',
      imageUrl:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
      iconKey: 'parties',
      status: 'published',
    },
    {
      id: 'svc-destination',
      title: 'Destination Events',
      description: 'Luxury coordination for celebrations abroad.',
      imageUrl:
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
      iconKey: 'destination',
      status: 'draft',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Garden Ceremony',
      imageUrl:
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
      category: 'Ceremony',
      status: 'published',
    },
    {
      id: 'gal-2',
      title: 'Floral Reception',
      imageUrl: '/images/experience/gallery-2.jpg',
      category: 'Reception',
      status: 'published',
    },
    {
      id: 'gal-3',
      title: 'Evening Celebration',
      imageUrl:
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
      category: 'Celebration',
      status: 'published',
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      clientName: 'Anna & David',
      eventType: 'Garden Wedding',
      quote: 'Every detail felt personal. We enjoyed our day without a single worry.',
      rating: 5,
      status: 'published',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    {
      id: 'test-2',
      clientName: 'Lilit & Arman',
      eventType: 'Luxury Reception',
      quote: 'The styling was breathtaking and the timeline ran perfectly.',
      rating: 5,
      status: 'published',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
  ],
  events: [
    {
      id: 'evt-1',
      title: 'Summer Solstice Gala',
      date: '2024-06-21',
      location: 'Manhattan Rooftop, NY',
      status: 'published',
      imageUrl:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
      description: 'An elegant rooftop celebration with sunset florals.',
    },
    {
      id: 'evt-2',
      title: 'Architectural Forum',
      date: '2024-07-12',
      location: 'The Design Hub, London',
      status: 'draft',
      imageUrl:
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80',
      description: 'Corporate forum with bespoke stage design.',
    },
    {
      id: 'evt-3',
      title: 'Abstract Modernity Expo',
      date: '2024-05-05',
      location: 'Louvre Pyramid, Paris',
      status: 'archived',
      imageUrl:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
      description: 'Contemporary art showcase with immersive décor.',
    },
    {
      id: 'evt-4',
      title: 'Vogue Winter Showcase',
      date: '2024-11-18',
      location: 'Grand Palais, Paris',
      status: 'published',
      imageUrl:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
      description: 'High-fashion winter gala with crystal tablescapes.',
    },
  ],
  bookings: [
    {
      id: 'book-1',
      clientName: 'Maria Petrosyan',
      email: 'maria@example.com',
      eventDate: '2025-09-14',
      serviceType: 'Wedding Planning',
      status: 'pending',
      createdAt: '2025-05-02T10:30:00.000Z',
    },
    {
      id: 'book-2',
      clientName: 'James Miller',
      email: 'james@example.com',
      eventDate: '2025-10-20',
      serviceType: 'Consultation',
      status: 'confirmed',
      createdAt: '2025-05-10T14:15:00.000Z',
    },
  ],
  statistics: [
    {
      id: 'stat-bookings',
      label: 'Total Bookings',
      value: '1,482',
      trend: '+12% vs last month',
      iconKey: 'bookings',
    },
    {
      id: 'stat-tickets',
      label: 'Tickets Issued',
      value: '1,104',
      trend: 'Target: 2k',
      iconKey: 'tickets',
    },
    {
      id: 'stat-revenue',
      label: 'Gross Revenue',
      value: '$248,300',
      trend: '98% Success',
      iconKey: 'revenue',
    },
  ],
  codeTable: [
    {
      id: 'code-1',
      code: 'WED-FULL',
      label: 'Full Wedding Package',
      category: 'Services',
      description: 'Complete planning and day-of coordination.',
    },
    {
      id: 'code-2',
      code: 'EVT-DAY',
      label: 'Day-Of Coordination',
      category: 'Services',
      description: 'On-site management for the celebration day.',
    },
    {
      id: 'code-3',
      code: 'CONS-30',
      label: '30-Min Consultation',
      category: 'Booking',
      description: 'Introductory planning consultation session.',
    },
  ],
  settings: {
    siteName: 'Dream & Celebrate',
    supportEmail: 'support@dreamandcelebrate.com',
    defaultLocale: 'en',
    maintenanceMode: false,
  },
};
