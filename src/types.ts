// TypeScript interfaces for HomeHealthHero project resources

export interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  avatar: string;
  logo: string;
}

export interface Statistic {
  id: number;
  label: string;
  value: string;
  description: string;
}

export interface HeroContent {
  id: number;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface Contact {
  id: number;
  address1: string;
  city1: string;
  state1: string;
  zip1: string;
  phone1: string;
  address2: string;
  city2: string;
  state2: string;
  zip2: string;
  phone2: string;
  email: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  createdAt: string;
}
