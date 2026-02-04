
import { TranslationStrings, Review } from './types';

export const REVIEWS_API_URL = "";

export const THEME = {
  primary: "#39322c",
  accent: "#39322c",
  background: "#efdecc",
  surface: "#ffffff",
  textLight: "#efdecc",
  textDark: "#39322c",
};

export const MOCK_REVIEWS: Review[] = [
  { id: '1', author: 'Lucía M.', rating: 5, comment: 'Los buñuelos de zucchini son de otro planeta. Excelente atención.', date: '2024-03-10', isVerified: true },
  { id: '2', author: 'James W.', rating: 4, comment: 'Great coffee and cozy atmosphere. The cakes are huge!', date: '2024-03-08', isVerified: true },
  { id: '3', author: 'Marcos G.', rating: 5, comment: 'El mejor lugar de Palermo para merendar. Muy recomendado.', date: '2024-03-05', isVerified: true },
  { id: '4', author: 'Sofi R.', rating: 5, comment: 'El flat white es perfecto, la temperatura justa.', date: '2024-03-12', isVerified: true },
  { id: '5', author: 'Tomas L.', rating: 5, comment: 'Increíble la pastelería, siempre fresca.', date: '2024-03-11', isVerified: true },
];

export const TRANSLATIONS: Record<'en' | 'es', TranslationStrings> = {
  en: {
    landingTitle: "RITA SPECIALTY COFFEE",
    reviews: "Reviews",

    navHome: "HOME",
    navAbout: "ABOUT US",
    navBranches: "LOCATIONS",
    navMenu: "MENU",
    navContact: "CONTACT",

    heroTitle: "RITA",
    heroSubtitle: "SPECIALTY COFFEE & EXPERIENCE",
    seeMenu: "EXPLORE MENU",

    aboutTitle: "OUR ESSENCE",
    aboutText: "We believe in the beauty of the ritual. At RITA, specialty coffee is not just a drink, but a moment of pause. Our beans are ethically sourced and roasted with precision to bring out their unique character.",

    branchesTitle: "LOCATIONS",
    hoursTitle: "HOURS",
    hoursValue: "MON to SUN 8.00 to 20.30",

    contactTitle: "GET IN TOUCH",
    contactText: "Join the RITA experience. Whether it's for a quick espresso or a long brunch, our doors are always open.",
    followUs: "FOLLOW US",
  },
  es: {
    landingTitle: "RITA SPECIALTY COFFEE",
    reviews: "Reseñas",

    navHome: "INICIO",
    navAbout: "NOSOTROS",
    navBranches: "SUCURSALES",
    navMenu: "MENÚ",
    navContact: "CONTACTO",

    heroTitle: "RITA",
    heroSubtitle: "CAFÉ DE ESPECIALIDAD & EXPERIENCIA",
    seeMenu: "EXPLORAR MENÚ",

    aboutTitle: "NUESTRA ESENCIA",
    aboutText: "Creemos en la belleza del ritual. En RITA, el café de especialidad no es solo una bebida, es un momento de pausa. Nuestros granos son seleccionados éticamente y tostados con precisión para resaltar su carácter único.",

    branchesTitle: "SUCURSALES",
    hoursTitle: "HORARIOS",
    hoursValue: "LUN a DOM 8.00 a 20.30",

    contactTitle: "CONTACTO",
    contactText: "Sumate a la experiencia RITA. Ya sea para un espresso rápido o un brunch tranquilo, nuestras puertas están siempre abiertas.",
    followUs: "SEGUINOS",
  },
};
