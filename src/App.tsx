import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import Homepage from './pages/Homepage';
import AssessmentBooking from './pages/AssessmentBooking';
import Portfolio from './pages/Portfolio';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminPosts from './pages/AdminPosts';

const PHONE_DISPLAY = '(859) MURSEN-1';
const PHONE_HREF = 'tel:+18596877361';
const EMAIL = 'hi@mursen.com';
const DOMAIN = 'mursen.com';

const FacebookIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93z" />
  </svg>
);

const InstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`text-2xl font-black tracking-[-0.03em] ${light ? 'text-cream-50' : 'text-ink-900'}`}>
      MURSEN<span className="text-rust-500">.</span>
    </span>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: '/portfolio', label: 'Services' },
    { to: '/how-it-works', label: 'Plans' },
    { to: '/blog', label: 'Resources' },
    { to: '/contact', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Utility bar (desktop only) */}
      <div className="hidden lg:block bg-ink-900 text-cream-50">
        <div className="container-app flex items-center justify-between py-2 text-[11px] tracking-wide">
          <div className="flex items-center gap-6 text-cream-100/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-rust-300" />
              Licensed · Insured · Bonded · Owner-Operated
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rust-300" />
              Covington, KY · Cincinnati Metro
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${EMAIL}`} className="hover:text-rust-300 transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {EMAIL}
            </a>
            <a href={PHONE_HREF} className="hover:text-rust-300 transition-colors flex items-center gap-1.5 font-semibold">
              <Phone className="w-3.5 h-3.5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 bg-cream-100/95 backdrop-blur-md transition-colors duration-150 ${scrolled ? 'border-b border-ink-900/10' : 'border-b border-transparent'}`}>
        <div className="container-app flex justify-between items-center py-5">
          <Link to="/" className="cursor-pointer">
            <Wordmark />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] cursor-pointer transition-colors duration-150 ${
                  isActive(link.to)
                    ? 'text-ink-900'
                    : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-rust-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden lg:inline-flex items-center gap-2 text-sm font-bold tracking-wide text-ink-900 hover:text-rust-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <Link
              to="/assessment"
              className="hidden md:inline-flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-cream-50 font-bold text-xs uppercase tracking-[0.10em] py-3 px-5 rounded-md transition-colors duration-150 cursor-pointer min-h-[44px]"
            >
              Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-md border border-ink-900/15 hover:bg-ink-900/5 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-ink-900" /> : <Menu className="w-5 h-5 text-ink-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-cream-100 animate-fade-up overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-5 border-b border-ink-900/10">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <Wordmark />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-md border border-ink-900/15 hover:bg-ink-900/5 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-ink-900" />
            </button>
          </div>
          <nav className="px-5 py-8 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-4 font-bold uppercase tracking-[0.12em] text-base cursor-pointer transition-colors border-b border-ink-900/10 ${
                  isActive(link.to)
                    ? 'text-rust-500'
                    : 'text-ink-900 hover:text-rust-500'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6 space-y-3">
              <Link
                to="/assessment"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-rust-500 text-cream-50 font-bold uppercase tracking-[0.10em] text-sm py-4 px-6 rounded-md hover:bg-rust-600 transition-colors min-h-[52px]"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="flex w-full items-center justify-center gap-2 bg-ink-900 text-cream-50 font-bold uppercase tracking-[0.10em] text-sm py-4 px-6 rounded-md hover:bg-ink-800 transition-colors min-h-[52px]"
              >
                <Phone className="w-4 h-4" />
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <div className="pt-8 mt-6 border-t border-ink-900/10 text-sm text-ink-500 space-y-2">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-rust-500" /> Covington, KY · Cincinnati Metro</p>
              <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-rust-500" /> Licensed · Insured · Bonded</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-rust-500" /> {EMAIL}</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-cream-100 text-ink-900">
      {/* Top CTA strip */}
      <div className="border-y border-ink-900/10">
        <div className="container-app py-12 md:py-16 grid lg:grid-cols-[1.6fr_1fr] gap-8 items-center">
          <div>
            <p className="eyebrow mb-3">Get Started</p>
            <h3 className="heading-3 text-balance">
              One call. <span className="accent-serif text-rust-500">One company.</span> One bill.
            </h3>
            <p className="text-ink-500 mt-3 max-w-xl">
              Quote your home in 15 minutes. No high-pressure pitch — just a real number.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link to="/assessment" className="btn-primary-lg">
              Get Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={PHONE_HREF} className="btn-outline">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-app py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="text-sm leading-relaxed text-ink-500 mt-5 max-w-sm">
              One subscription for everything around your house. Lawn care, window cleaning, power washing, handyman, and seasonal services across Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and Cincinnati metro.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-md border border-ink-900/20 hover:bg-ink-900 hover:text-cream-50 flex items-center justify-center transition-colors text-ink-700" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-md border border-ink-900/20 hover:bg-ink-900 hover:text-cream-50 flex items-center justify-center transition-colors text-ink-700" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="page-meta mb-5">Services</h4>
            <ul className="space-y-2.5 text-sm text-ink-700">
              <li><Link to="/portfolio#lawn" className="hover:text-rust-500 transition-colors">Lawn Care</Link></li>
              <li><Link to="/portfolio#windows" className="hover:text-rust-500 transition-colors">Window Cleaning</Link></li>
              <li><Link to="/portfolio#powerwash" className="hover:text-rust-500 transition-colors">Power Washing</Link></li>
              <li><Link to="/portfolio#handyman" className="hover:text-rust-500 transition-colors">Handyman</Link></li>
              <li><Link to="/portfolio#seasonal" className="hover:text-rust-500 transition-colors">Snow & Seasonal</Link></li>
              <li><Link to="/portfolio#seasonal" className="hover:text-rust-500 transition-colors">Junk Hauling</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="page-meta mb-5">Company</h4>
            <ul className="space-y-2.5 text-sm text-ink-700">
              <li><Link to="/contact" className="hover:text-rust-500 transition-colors">About</Link></li>
              <li><Link to="/how-it-works" className="hover:text-rust-500 transition-colors">Plans</Link></li>
              <li><Link to="/blog" className="hover:text-rust-500 transition-colors">Resources</Link></li>
              <li><Link to="/assessment" className="hover:text-rust-500 transition-colors">Free Quote</Link></li>
              <li><Link to="/contact" className="hover:text-rust-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="page-meta mb-5">Get In Touch</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-ink-700">
                <Phone className="w-4 h-4 text-rust-500 flex-shrink-0 mt-0.5" />
                <a href={PHONE_HREF} className="hover:text-rust-500 transition-colors font-bold">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-start gap-3 text-ink-700">
                <Mail className="w-4 h-4 text-rust-500 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${EMAIL}`} className="hover:text-rust-500 transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3 text-ink-700">
                <MapPin className="w-4 h-4 text-rust-500 flex-shrink-0 mt-0.5" />
                <span>Covington, KY 41011<br />Serving Northern KY & Cincinnati Metro</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom band */}
      <div className="bg-ink-900 text-cream-100/70 text-xs">
        <div className="container-app py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} Mursen Home Services · Covington, KY 41011 · {DOMAIN}</p>
          <p className="tracking-[0.18em] uppercase font-bold text-cream-100/50">Fully Insured · Bonded · Licensed</p>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-cream-100">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/assessment" element={<AssessmentBooking />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin/posts" element={<AdminPosts />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
