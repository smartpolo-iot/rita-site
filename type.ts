
export type Language = 'en' | 'es';

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
}

export interface TranslationStrings {
  // Navigation & General
  landingTitle: string;
  reviews: string;

  // Navigation Labels
  navHome: string;
  navAbout: string;
  navBranches: string;
  navMenu: string;
  navContact: string;

  // Website Sections
  heroTitle: string;
  heroSubtitle: string;
  seeMenu: string;

  aboutTitle: string;
  aboutText: string;

  branchesTitle: string;
  hoursTitle: string;
  hoursValue: string;

  contactTitle: string;
  contactText: string;
  followUs: string;
}
