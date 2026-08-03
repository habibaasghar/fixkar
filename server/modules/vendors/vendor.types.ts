/** Fields safe to expose on the public vendor profile endpoint — never phone, CNIC, verification notes, or internal user/document IDs. */
export interface PublicVendorProfile {
  id: string;
  slug: string;
  fullName: string;
  businessName: string | null;
  tagline: string | null;
  bio: string | null;
  profilePhotoUrl: string | null;
  skills: string[];
  languagesSpoken: string[];
  experienceYears: number;
  city: { slug: string; name: string };
  areas: { slug: string; name: string }[];
  categories: { slug: string; name: string }[];
  verificationTier: string;
  averageRating: number;
  totalReviews: number;
  portfolio: { imageUrl: string; caption: string | null }[];
}
