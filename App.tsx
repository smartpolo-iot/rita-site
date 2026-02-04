
import React, { useRef, useState, useEffect } from 'react';
import { Language } from './types';
import { TRANSLATIONS, THEME } from './constants';
import ReviewsModal from './components/ReviewsModal';

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
];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [showReviews, setShowReviews] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const branchesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const options = { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, options);
    [homeRef, aboutRef, branchesRef, contactRef].forEach(ref => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: 'home' | 'about' | 'branches' | 'contact') => {
    const refs = { home: homeRef, about: aboutRef, branches: branchesRef, contact: contactRef };
    const element = refs[section].current;
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];

  const NavButton = ({ id, label, onClick }: { id: string, label: string, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`text-[10px] font-category font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap ${activeSection === id ? 'text-[#211d1c] border-b-2 border-[#211d1c]' : 'text-[#211d1c] opacity-40 hover:opacity-100'
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen w-full flex flex-col font-lexend" style={{ backgroundColor: THEME.background }}>
      <div className="fixed top-0 left-0 right-0 z-[100] w-full bg-white shadow-sm">
        <header className="px-4 py-3 flex items-center justify-between max-w-7xl mx-auto h-16 md:h-20">
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2">
            <h1 className="text-2xl font-revoxa uppercase tracking-tight text-[#211d1c]">RITA</h1>
          </button>
          <nav className="hidden lg:flex items-center gap-8 flex-grow justify-center">
            <NavButton id="home" label={t.navHome} onClick={() => scrollToSection('home')} />
            <NavButton id="about" label={t.navAbout} onClick={() => scrollToSection('about')} />
            <NavButton id="branches" label={t.navBranches} onClick={() => scrollToSection('branches')} />
            <button onClick={() => window.location.href = MENU_URL} className="text-[10px] font-category font-bold tracking-[0.2em] uppercase text-[#211d1c] opacity-40 hover:opacity-100">{t.navMenu}</button>
            <NavButton id="contact" label={t.navContact} onClick={() => scrollToSection('contact')} />
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowReviews(true)} className="flex items-center gap-2 bg-[#211d1c] text-white px-3 py-1.5 active:scale-95 transition-transform">
              <span className="text-xs">★</span>
              <span className="text-[9px] font-bold tracking-widest uppercase">{t.reviews}</span>
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="text-[10px] font-category font-bold tracking-widest uppercase border-2 border-[#211d1c] px-2 py-1 min-w-[32px]">{lang.toUpperCase()}</button>
          </div>
        </header>
      </div>

      <div className="flex-grow w-full pt-[104px] lg:pt-[80px]">
        <section id="home" ref={homeRef} className="relative h-[85vh] flex flex-col items-center justify-center text-center p-6 bg-cover bg-center" style={{ backgroundImage: 'url("https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/618641053_906678711754749_5075242416977898605_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&oh=00_AfsX0cNeGXzyFujaO40WjORt3vJXNoBtvKPV__WPUDxOdA&oe=6987F665")' }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10">
            <h2 className="text-7xl md:text-[14rem] font-revoxa leading-none text-white tracking-tighter">{t.heroTitle}</h2>
            <p className="text-[10px] md:text-sm font-category tracking-[0.4em] uppercase text-white/90 font-bold">{t.heroSubtitle}</p>
          </div>
        </section>

        <section id="about" ref={aboutRef} className="py-24 px-6 max-w-4xl mx-auto text-center">
          <h3 className="text-[10px] font-category font-bold tracking-[0.5em] uppercase opacity-30 mb-8">{t.aboutTitle}</h3>
          <p className="text-xl md:text-4xl font-lexend font-light text-[#39322c]">{t.aboutText}</p>
        </section>

        <section id="branches" ref={branchesRef} className="py-24 px-6 max-w-7xl mx-auto">
          <h3 className="text-[10px] font-category font-bold tracking-[0.5em] uppercase opacity-30 text-center mb-16">{t.branchesTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANCHES_DATA.map((branch, i) => (
              <div key={i} className="bg-white border border-[#211d1c]/5 overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden"><img src={branch.imageUrl} alt={branch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                <div className="p-8">
                  <h4 className="text-xl font-antonio font-bold uppercase mb-1 text-[#211d1c]">📍 {branch.name}</h4>
                  <p className="text-sm opacity-60 mb-4">{branch.address}</p>
                  <p className="text-[10px] font-bold opacity-30 uppercase">{t.hoursTitle}</p>
                  <p className="text-[11px] opacity-60">{t.hoursValue}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" ref={contactRef} className="py-24 px-6 bg-[#211d1c] text-[#efdecc] text-center">
          <h3 className="text-[10px] font-category font-bold tracking-[0.5em] uppercase opacity-30 mb-8">{t.contactTitle}</h3>
          <p className="text-xl md:text-3xl font-lexend max-w-2xl mx-auto mb-16 opacity-80">{t.contactText}</p>
          <div className="flex justify-center gap-12 font-antonio font-bold text-xl tracking-widest">
            <a href="https://www.instagram.com/ritaspecialtycoffee/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50">INSTAGRAM</a>
            <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="hover:opacity-50">WHATSAPP</a>
          </div>
        </section>
      </div>

      {showReviews && <ReviewsModal lang={lang} onClose={() => setShowReviews(false)} />}
    </div>
  );
};

export default App;
