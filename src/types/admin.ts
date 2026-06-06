export type AdminStatus = 'published' | 'draft' | 'archived';

export type AdminBookingStatus = 'pending' | 'confirmed' | 'cancelled';

export type AdminListSectionKey =
  | 'services'
  | 'gallery'
  | 'testimonials'
  | 'events'
  | 'bookings'
  | 'statistics'
  | 'codeTable';

export type AdminContentSectionKey = 'home' | 'about' | 'experience' | 'contact';

export type AdminEvent = Readonly<{
  id: string;
  title: string;
  date: string;
  location: string;
  status: AdminStatus;
  imageUrl: string;
  description: string;
}>;

export type AdminServiceItem = Readonly<{
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconKey: string;
  status: AdminStatus;
}>;

export type AdminGalleryItem = Readonly<{
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  status: AdminStatus;
}>;

export type AdminTestimonial = Readonly<{
  id: string;
  clientName: string;
  eventType: string;
  quote: string;
  rating: number;
  status: AdminStatus;
  avatarUrl: string;
}>;

export type AdminBookingItem = Readonly<{
  id: string;
  clientName: string;
  email: string;
  eventDate: string;
  serviceType: string;
  status: AdminBookingStatus;
  createdAt: string;
}>;

export type AdminStatistic = Readonly<{
  id: string;
  label: string;
  value: string;
  trend: string;
  iconKey: string;
}>;

export type AdminCodeEntry = Readonly<{
  id: string;
  code: string;
  label: string;
  category: string;
  description: string;
}>;

export type AdminHomeContent = Readonly<{
  heroMainImageUrl: string;
  heroPolaroidOneUrl: string;
  heroPolaroidTwoUrl: string;
  heroAccentImageUrl: string;
  aboutImageUrl: string;
}>;

export type AdminAboutContent = Readonly<{
  heroImageUrl: string;
  storyImageUrl: string;
}>;

export type AdminExperienceContent = Readonly<{
  heroImageUrl: string;
  heroVideoUrl: string;
  whyCouplesImageUrl: string;
  ctaImageUrl: string;
}>;

export type AdminContactContent = Readonly<{
  phone: string;
  email: string;
  address: string;
  hours: string;
  decorImageUrl: string;
}>;

export type AdminSettings = Readonly<{
  siteName: string;
  supportEmail: string;
  defaultLocale: 'en' | 'ru' | 'am';
  maintenanceMode: boolean;
}>;

export type AdminState = Readonly<{
  home: AdminHomeContent;
  about: AdminAboutContent;
  experience: AdminExperienceContent;
  contact: AdminContactContent;
  services: AdminServiceItem[];
  gallery: AdminGalleryItem[];
  testimonials: AdminTestimonial[];
  events: AdminEvent[];
  bookings: AdminBookingItem[];
  statistics: AdminStatistic[];
  codeTable: AdminCodeEntry[];
  settings: AdminSettings;
}>;

export type AdminListRecord =
  | AdminServiceItem
  | AdminGalleryItem
  | AdminTestimonial
  | AdminEvent
  | AdminBookingItem
  | AdminStatistic
  | AdminCodeEntry;

export type AdminNavItem = Readonly<{
  key: string;
  path: string;
  labelKey: string;
  icon: string;
}>;
