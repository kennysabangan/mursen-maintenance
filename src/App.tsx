import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

const FacebookIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93z" />
  </svg>
);

const InstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import Homepage from './pages/Homepage';
import AssessmentBooking from './pages/AssessmentBooking';
import Portfolio from './pages/Portfolio';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminPosts from './pages/AdminPosts';

const PHONE_DISPLAY = '(859) 555-0123';
const PHONE_HREF = 'tel:+18595550123';
const EMAIL = 'hello@mursenmaintenance.com';

function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-glow-brand">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
            <path d="M10 20v-6h4v6" />
          </svg>
        </div>
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className={`text-lg font-extrabold tracking-tight font-display ${light ? 'text-white' : 'text-surface-900'}`}>
            Mursen
          </span>
          <span className={`text-[10px] font-semibold tracking-[0.22em] uppercase mt-0.5 ${light ? 'text-primary-300' : 'text-primary-700'}`}>
            Maintenance
          </span>
        </div>
      )}
    </div>
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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/portfolio', label: 'Services' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/blog', label: 'Resources' },
    { to: '/contact', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Utility bar (desktop only) */}
      <div className="hidden lg:block bg-surface-900 text-white">
        <div className="container-app flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6 text-stone-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-400" />
              Mon–Fri 8am–6pm · Sat 9am–2pm
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary-400" />
              Covington, KY · Cincinnati Metro
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
              Licensed · Insured · Bonded
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${EMAIL}`} className="hover:text-primary-300 transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {EMAIL}
            </a>
            <a href={PHONE_HREF} className="hover:text-primary-300 transition-colors flex items-center gap-1.5 font-semibold">
              <Phone className="w-3.5 h-3.5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 ${scrolled ? 'border-b border-stone-200 shadow-soft' : 'border-b border-transparent'}`}>
        <div className="container-app flex justify-between items-center py-4">
          <Link to="/" className="flex items-center group cursor-pointer">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-stone-50 rounded-full px-2 py-1.5 border border-stone-200/70">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive(link.to)
                    ? 'bg-white text-primary-700 shadow-soft'
                    : 'text-surface-700 hover:text-surface-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={PHONE_HREF}
              className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-surface-700 hover:text-primary-700 transition-colors px-3"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <Link
              to="/assessment"
              className="hidden md:inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm py-3 px-5 rounded-full transition-all duration-200 cursor-pointer min-h-[44px] shadow-glow-brand hover:-translate-y-0.5"
            >
              Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl border border-stone-200 hover:bg-stone-50 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-surface-900" /> : <Menu className="w-5 h-5 text-surface-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white animate-fade-up overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <Logo />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-stone-200 hover:bg-stone-50 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-surface-900" />
            </button>
          </div>
          <nav className="px-5 py-6 space-y-1.5">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-5 py-4 rounded-2xl font-semibold text-base cursor-pointer transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-900 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 space-y-3">
              <Link
                to="/assessment"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-primary-600 text-white font-semibold py-4 px-6 rounded-full hover:bg-primary-700 transition-colors min-h-[52px] shadow-glow-brand"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="flex w-full items-center justify-center gap-2 bg-surface-900 text-white font-semibold py-4 px-6 rounded-full hover:bg-surface-800 transition-colors min-h-[52px]"
              >
                <Phone className="w-4 h-4" />
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6 text-sm text-surface-500 space-y-2">
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-600" /> Mon–Fri 8am–6pm · Sat 9am–2pm</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-600" /> Covington, KY · Cincinnati Metro</p>
              <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary-600" /> Licensed · Insured · Bonded</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-900 text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-app py-12 md:py-16 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <p className="eyebrow-light mb-3">Get Started Today</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Ready to hand off the to-do list?
            </h3>
            <p className="text-stone-300 mt-3 max-w-xl">
              One subscription, every service, one team you can trust. Get a free quote in under 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link to="/assessment" className="btn-primary-lg">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-lg px-9 py-4 rounded-full transition-all duration-200 min-h-[56px]">
              <Phone className="w-5 h-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-app py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="text-sm leading-relaxed text-stone-400 mt-5 max-w-sm">
              One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman services across Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and Cincinnati metro.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-400 mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li><Link to="/portfolio" className="hover:text-primary-300 transition-colors">Lawn Care</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary-300 transition-colors">Window Cleaning</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary-300 transition-colors">Power Washing</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary-300 transition-colors">Handyman & Repairs</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary-300 transition-colors">Gutter Cleaning</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-400 mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-stone-300">
              <li><Link to="/contact" className="hover:text-primary-300 transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary-300 transition-colors">How It Works</Link></li>
              <li><Link to="/blog" className="hover:text-primary-300 transition-colors">Blog</Link></li>
              <li><Link to="/assessment" className="hover:text-primary-300 transition-colors">Free Quote</Link></li>
              <li><Link to="/contact" className="hover:text-primary-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-400 mb-5">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-stone-300">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <a href={PHONE_HREF} className="hover:text-primary-300 transition-colors font-semibold">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-start gap-3 text-stone-300">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${EMAIL}`} className="hover:text-primary-300 transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3 text-stone-300">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Covington, KY 41011<br />Serving Northern KY & Cincinnati Metro</span>
              </li>
              <li className="flex items-start gap-3 text-stone-300">
                <Clock className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Mon–Fri 8am–6pm<br />Sat 9am–2pm · Sun closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-400">
            &copy; {new Date().getFullYear()} Mursen Maintenance. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-stone-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary-400" /> Fully Insured</span>
            <span>Bonded</span>
            <span>BBB Accredited</span>
          </div>
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
        <div className="min-h-screen flex flex-col bg-white">
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
