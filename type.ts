
export type Language = 'en' | 'es';

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  itemName?: string;
  isVerified?: boolean;
  isLocationVerified?: boolean;
}

/**
 * Interface representing a menu item, used by services and components.
 */
export interface MenuItem {
  id: string;
  grupo: string;
  category: string;
  name: string;
  ingredients: string;
  comment: string;
  unit: string;
  price: string;
  available: boolean;
  isPromo: boolean;
  label: string;
  veggie: boolean;
  vegan: boolean;
  rating: number;
  reviewsCount: number;
}

/**
 * Interface representing an item in the shopping cart.
 */
export interface CartItem extends MenuItem {
  quantity: number;
}

export interface TranslationStrings {
  // Navigation & General
  landingTitle: string;
  selectLanguage: string;
  categories: string;
  backToMenu: string;
  backToHome: string;
  reviews: string;
  currency: string;
  available: string;
  unavailable: string;

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
  branchPalermo: string;
  branchPalermoAddress: string;
  branchRecoleta: string;
  branchRecoletaAddress: string;
  hoursTitle: string;
  hoursValue: string;

  contactTitle: string;
  contactText: string;
  followUs: string;

  // Added properties for menu items and checkout flow
  ingredients: string;
  sides: string;
  specials: string;
  orderSummary: string;
  emptyCart: string;
  total: string;
  checkout: string;
  continueOrdering: string;
}
