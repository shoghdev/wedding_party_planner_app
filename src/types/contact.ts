export type ContactFormValues = Readonly<{
  name: string;
  email: string;
  phone: string;
  message: string;
}>;

export type ContactDetailKey = 'phone' | 'email' | 'address' | 'hours';

export type ContactDetail = Readonly<{
  key: ContactDetailKey;
  href?: string;
}>;
