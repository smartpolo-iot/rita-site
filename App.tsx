
import React, { useRef, useState, useEffect } from 'react';
import { Language } from './types';
import { TRANSLATIONS, THEME } from './constants';
import ReviewsModal from './components/ReviewsModal';

// This URL points to your dedicated menu application
const MENU_URL = "https://rita-menu.netlify.app";

const BRANCHES_DATA = [
  {
    name: 'RITA SINCLAIR',
    address: 'Sinclair 3095',
    imageUrl: 'https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/605639407_891706146585339_8732405428350702014_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGpa6-HYx3F0bepmH7LzohT8YcD_yal_2nxhwP_JqX_aV4QzQIIbwNKcjhC2lu0XbU&_nc_ohc=jM1n7iC_gUcQ7kNvwFCPwY8&_nc_oc=AdmHnrtQSW3akNCSeRa_u_oioV5uLVEkGZkqH6ObtQR7MfK-NYR3P-9bIpX_5eV9AnM&_nc_zt=23&_nc_ht=scontent.faep24-1.fna&_nc_gid=xxrNViLDOqHUXdyf02qd-Q&oh=00_Afs8x78p46mHVqCSCJvthRXsyrNPxlSOyOictOQNXfWuBA&oe=6987D18F',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rita+Specialty+Coffee+Sinclair+3095+Buenos+Aires'
  },
  {
    name: 'RITA AMENÁBAR',
    address: 'Amenábar 3361',
    imageUrl: 'https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/484544458_671187951970494_1951752561904025169_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGF9ffCqQbh_CCP1OoPi7usDWrBeeb1F-0NasF55vUX7QshE1eVq6A7OOrErxk-v2k&_nc_ohc=UJbuc1c2pC8Q7kNvwH0eY6A&_nc_oc=AdktDlG3cb0Y4Ack2zAuNQ9RAznvZ8PmFLR8NAo4ywLEs_hnthU512C_fhD9vaqDFp4&_nc_zt=23&_nc_ht=scontent.faep24-2.fna&_nc_gid=ihhJf_IpkdnNUShc2pIbww&oh=00_Afvc4pwNXFtYPy8MjI4hlMIHmkljAPfJvaF-ljd14xe6AQ&oe=6987D475',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rita+Specialty+Coffee+Amenabar+3361+Buenos+Aires'
  },
  {
    name: 'RITA MATIENZO',
    address: 'Matienzo 2489',
    imageUrl: 'https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/589466099_870787958677158_1024245383005981371_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGZvDCkqZZMiGDoWCs5l6EgdyeFmpTa6-93J4WalNrr764HPuU9mTlWW4WWq9KqrAU&_nc_ohc=lQ9kQvETJEcQ7kNvwGVbHhi&_nc_oc=Adk5GeooYWouhgX8lsxOYQCv1ICxh75VL8GTbBOMt8m_ZuaaEiKow6BwE5Jt5VOPl2s&_nc_zt=23&_nc_ht=scontent.faep24-1.fna&_nc_gid=ID_E7RL1Xhq17AZqtti91A&oh=00_AftGJ0as0cI91qYzTYarXO23bccfv3KHzJ5HPXXha0i6HQ&oe=6987E30B',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rita+Specialty+Coffee+Matienzo+2489+Buenos+Aires'
  },
  {
    name: 'RITA SOLER',
    address: 'Soler 6093',
    imageUrl: 'https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/556501445_820114790411142_7023919654546404004_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfGwLbjSlS4EwVgC1F1o9Q0w-9d9yELQ3TD7133IQtDVcStzVRGrgQwa2zww3AguY&_nc_ohc=Af4cWkHa3gMQ7kNvwFU_8EE&_nc_oc=Adk-F49WRTGhSEH4xyNQrYtlqleQVFALRmEoOD2gM3e068LYFQpJ6UgSymMxwRPcBJI&_nc_zt=23&_nc_ht=scontent.faep24-2.fna&_nc_gid=zGB-llXynf2BrpesbS_YgA&oh=00_Afs2AoQajatmEYTnm-75zpaY769GE4VriRvZHlqelx9d2g&oe=6987E5CB',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rita+Specialty+Coffee+Soler+6093+Buenos+Aires'
  },
  {
    name: 'RITA ARMENIA',
    address: 'Armenia 1595',
    imageUrl: 'https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/556453728_820114783744476_2623720907892167194_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFbtlIz2QMrD-tk02A1V5VzGNp_Z_1gD_8Y2n9n_WAP_-dNROuxldqpFnB3FEySDwk&_nc_ohc=LgsEPC2NS9gQ7kNvwGSfwxn&_nc_oc=AdlYzdim1xybedWRVUTd-xQDtoUJ7vFX0BgeSVUkbxahwrcC9mM2fK3zdNpMX7g3CAA&_nc_zt=23&_nc_ht=scontent.faep24-1.fna&_nc_gid=Jo-PqpiWl5vlrP7zGKqGgg&oh=00_AfvAiK3tAhmB2Npl6RZssBqGs-u9kth-ZxfAfcDa9V1vgQ&oe=6987D1D0',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rita+Specialty+Coffee+Armenia+1595+Buenos+Aires'
  },
  {
    name: 'RITA 11 DE SEP.',
    address: '11 de Sep. 4050',
    imageUrl: 'https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/515440828_774241451665143_4334336245243883176_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFfU5NJsJ33IzxkjPjbRkoalPDlN9X6V1aU8OU31fpXVr3GCoZkB_x_Ut7ayVb-WwY&_nc_ohc=Kt_Zw9w4RR4Q7kNvwGTpIhM&_nc_oc=AdkxvAvcfxUoS11_gciE8WCwhIHeA9SpY2MC3jx4eYOSlDkXmbw35gGKl3AwYDDg3W0&_nc_zt=23&_nc_ht=scontent.faep24-1.fna&_nc_gid=hy6HnD24GzwCwQAJ5DGZGQ&oh=00_Afu_aMoX4XxGZyI0MQ1sl4BArmbSpt-2OALp7YN_A0RAiw&oe=6987D514',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rita+Specialty+Coffee+11+de+Septiembre+4050+Buenos+Aires'
  },
  {
    name: 'RITA V. OBLIGADO',
    address: 'V. Obligado 1183',
    imageUrl: 'https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/492216183_702372648852024_3455078471809708574_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFCaeCOz8S-V3GsxgeNoo6Rw-BesEUYY1_D4F6wRRhjXxmLuLENYN-9EzdbdwBr2Kg&_nc_ohc=nRYdfpo_yMoQ7kNvwFXb7FW&_nc_oc=Admlan8mvIvefT2nYLq9fxTlPwkWN_uQTPm8WANbKSqvamSQXBN9UEGG6eg2cOL8yIo&_nc_zt=23&_nc_ht=scontent.faep24-2.fna&_nc_gid=hNc0b0mkC-7Zy-FkEjx-vQ&oh=00_AfvtKlJdNe8y406XxXqf_F1iXTGM7CnM1XsJWOAJe6F7rw&oe=6987C9D2',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rita+Specialty+Coffee+Vuelta+de+Obligado+1183+Buenos+Aires'
  },
];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [showReviews, setShowReviews] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const branchesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Scroll Spy Logic
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = [homeRef, aboutRef, branchesRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: 'home' | 'about' | 'branches' | 'contact') => {
    const refs = { home: homeRef, about: aboutRef, branches: branchesRef, contact: contactRef };
    const element = refs[section].current;
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleMenuClick = () => {
    window.location.href = MENU_URL;
  };

  const t = TRANSLATIONS[lang];

  const NavButton = ({ id, label, onClick }: { id: string, label: string, onClick: () => void }) => {
    const isActive = activeSection === id;
    return (
      <button
        onClick={onClick}
        className={`text-[10px] font-category font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${isActive
            ? 'text-[#211d1c] border-b-2 border-[#211d1c] opacity-100'
            : 'text-[#211d1c] opacity-40 hover:opacity-100'
          }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-lexend" style={{ backgroundColor: THEME.background }}>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] w-full bg-white shadow-sm">
        <header className="px-4 py-3 flex items-center justify-between max-w-7xl mx-auto w-full h-16 md:h-20 bg-white">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 active:opacity-70 transition-opacity flex-shrink-0"
          >
            <div className="h-10 px-0 flex items-center justify-center">
              <h1 className="text-2xl font-revoxa font-normal uppercase tracking-tight text-[#211d1c]">
                RITA<span className="text-[8px] font-bold align-top ml-0.5 rounded-full px-1 font-inter opacity-40">R</span>
              </h1>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8 flex-grow justify-center">
            <NavButton id="home" label={t.navHome} onClick={() => scrollToSection('home')} />
            <NavButton id="about" label={t.navAbout} onClick={() => scrollToSection('about')} />
            <NavButton id="branches" label={t.navBranches} onClick={() => scrollToSection('branches')} />
            <button
              onClick={handleMenuClick}
              className="text-[10px] font-category font-bold tracking-[0.2em] uppercase text-[#211d1c] opacity-40 hover:opacity-100 transition-opacity"
            >
              {t.navMenu}
            </button>
            <NavButton id="contact" label={t.navContact} onClick={() => scrollToSection('contact')} />
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReviews(true)}
              className="flex items-center gap-2 bg-[#211d1c] text-white px-2 py-1.5 md:px-3 active:scale-95 transition-transform"
            >
              <span className="text-xs">★</span>
              <span className="hidden xs:inline text-[9px] font-bold tracking-widest uppercase">{t.reviews}</span>
            </button>
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="text-[10px] font-category font-bold tracking-widest uppercase border-2 border-[#211d1c] px-2 py-1 min-w-[32px] hover:bg-[#211d1c] hover:text-white transition-colors"
            >
              {lang?.toUpperCase()}
            </button>
          </div>
        </header>

        {/* Mobile Nav */}
        <nav className="lg:hidden flex overflow-x-auto no-scrollbar border-t border-gray-50 px-4 py-2.5 gap-6 justify-start sm:justify-center bg-white items-center">
          <NavButton id="home" label={t.navHome} onClick={() => scrollToSection('home')} />
          <NavButton id="about" label={t.navAbout} onClick={() => scrollToSection('about')} />
          <NavButton id="branches" label={t.navBranches} onClick={() => scrollToSection('branches')} />
          <button
            onClick={handleMenuClick}
            className="text-[10px] font-category font-bold tracking-widest uppercase whitespace-nowrap opacity-40"
          >
            {t.navMenu}
          </button>
          <NavButton id="contact" label={t.navContact} onClick={() => scrollToSection('contact')} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full pt-[104px] lg:pt-[80px]">
        <div className="animate-in fade-in duration-700">
          {/* Hero - Corrected URL ID from 8505 to 8605 */}
          <section
            id="home"
            ref={homeRef}
            className="relative h-[85vh] md:h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: 'url("https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/618641053_906678711754749_5075242416977898605_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE1_QVr0e2Sntye-7s5NYs0TmTrlwOO3gFOZOuXA47eAZuhQXID9XaPL-DSBZqGZyA&_nc_ohc=Wy51qG3OD8EQ7kNvwH9V3Al&_nc_oc=Adn8yUE1UE0t9ms_OceyPJCI81hsAfI65u50nKaM0ejFKCPe4KCgs-mVuM4exnmsCGw&_nc_zt=23&_nc_ht=scontent.faep24-2.fna&_nc_gid=hcy7JXUj9V7Ccrfdh9lBOA&oh=00_AfsX0cNeGXzyFujaO40WjORt3vJXNoBtvKPV__WPUDxOdA&oe=6987F665")' }}
          >
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            <div className="relative z-10 max-w-full px-4 flex flex-col items-center">
              <h2 className="text-6xl sm:text-8xl md:text-[14rem] font-revoxa font-normal leading-none text-white mb-2 tracking-tighter drop-shadow-2xl">
                {t.heroTitle}
              </h2>
              <p className="text-[10px] md:text-sm font-category tracking-[0.4em] uppercase text-white/90 font-bold drop-shadow-md">
                {t.heroSubtitle}
              </p>
            </div>
          </section>

          {/* About */}
          <section id="about" ref={aboutRef} className="py-24 md:py-32 px-6 max-w-4xl mx-auto text-center">
            <h3 className="text-[10px] font-category font-bold tracking-[0.5em] uppercase opacity-30 mb-8">{t.aboutTitle}</h3>
            <p className="text-xl md:text-4xl font-lexend font-light leading-snug text-[#39322c]">
              {t.aboutText}
            </p>
          </section>

          {/* Branches */}
          <section id="branches" ref={branchesRef} className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
            <h3 className="text-[10px] font-category font-bold tracking-[0.5em] uppercase opacity-30 text-center mb-16">{t.branchesTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {BRANCHES_DATA.map((branch, i) => (
                <div key={i} className="bg-white border border-[#211d1c]/5 overflow-hidden group hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={branch.imageUrl}
                      alt={branch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between min-h-[160px]">
                    <div>
                      <h4 className="text-xl font-antonio font-bold uppercase mb-1 flex items-start gap-2 text-[#211d1c]">
                        <span className="text-base mt-1">📍</span>
                        {branch.name}
                      </h4>
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/map flex items-center gap-2 text-[#211d1c] opacity-60 hover:opacity-100 transition-opacity"
                      >
                        <p className="font-lexend text-sm leading-relaxed group-hover/map:underline">{branch.address}</p>
                        <div className="bg-[#211d1c]/5 p-1 rounded-full group-hover/map:scale-110 transition-transform">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                          </svg>
                        </div>
                      </a>
                    </div>
                    <div className="pt-3 border-t border-[#211d1c]/10">
                      <p className="text-[10px] font-category font-bold opacity-30 uppercase mb-0.5 text-[#211d1c]">{t.hoursTitle}</p>
                      <p className="text-[11px] font-category whitespace-nowrap opacity-60 text-[#211d1c]">🕣 {t.hoursValue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" ref={contactRef} className="py-24 md:py-32 px-6 bg-[#211d1c] text-[#efdecc] text-center">
            <h3 className="text-[10px] font-category font-bold tracking-[0.5em] uppercase opacity-30 mb-8">{t.contactTitle}</h3>
            <p className="text-xl md:text-3xl font-lexend max-w-2xl mx-auto mb-16 opacity-80 font-light">
              {t.contactText}
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                <span className="font-antonio font-bold text-xl md:text-2xl tracking-widest">WHATSAPP</span>
                <div className="h-px w-0 group-hover:w-full bg-[#efdecc] transition-all duration-300"></div>
              </a>
              <a href="https://www.instagram.com/ritaspecialtycoffee/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                <span className="font-antonio font-bold text-xl md:text-2xl tracking-widest">INSTAGRAM</span>
                <div className="h-px w-0 group-hover:w-full bg-[#efdecc] transition-all duration-300"></div>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-16 text-center border-t border-[#211d1c]/5 bg-white/5 mt-auto">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-20 font-description text-[#211d1c] mb-2">
          Rita Specialty Coffee
        </p>
        <p className="text-[8px] font-bold tracking-[0.2em] uppercase opacity-10 font-inter text-[#211d1c]">
          Buenos Aires, Argentina
        </p>
      </footer>

      {showReviews && (
        <ReviewsModal
          lang={lang}
          onClose={() => setShowReviews(false)}
          menuItems={[]}
        />
      )}
    </div>
  );
};

export default App;
