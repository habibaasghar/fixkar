export type CityStatus = "active" | "coming_soon";

export type City = {
  slug: string;
  name: string;
  status: CityStatus;
  areas: string[];
  metaTitle: string;
  metaDescription: string;
};

export type PriceRangeItem = {
  item: string;
  range: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  shortName: string;
  h1Template: (city: string) => string;
  metaTitleTemplate: (city: string) => string;
  metaDescriptionTemplate: (city: string) => string;
  intro: (city: string) => string;
  commonIssues: string[];
  pricingNote?: string;
  priceRanges?: PriceRangeItem[];
};

export type VerificationTier = "tier1" | "tier2";

export type ProviderProfile = {
  id: string;
  slug: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  completedJobsCount: number;
  primaryArea: string;
  citySlug: string;
  verificationTier: VerificationTier;
  responseTimeMinutes: number;
  skills: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
  category: "customer" | "vendor" | "general";
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTimeMinutes: number;
};
