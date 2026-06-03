export type ContactFormValues = Readonly<{
  name: string;
  email: string;
  phone: string;
  message: string;
}>;

/** Variables expected by the EmailJS contact template. */
export type EmailJsContactParams = Readonly<{
  name: string;
  from_name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  time: string;
  reply_to: string;
}>;

export type ContactDetailKey = 'phone' | 'email' | 'address' | 'hours';

export type ContactDetail = Readonly<{
  key: ContactDetailKey;
  href?: string;
}>;
