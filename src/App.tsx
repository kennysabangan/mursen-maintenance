import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Home } from 'lucide-react';
import Homepage from './pages/Homepage';
import AssessmentBooking from './pages/AssessmentBooking';
import Portfolio from './pages/Portfolio';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminPosts from './pages/AdminPosts';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/portfolio', label: 'Services' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'border-b border-surface-100' : ''}`} style={scrolled ? { boxShadow: '0 1px 3px rgba(0,0,0,0.04)' } : {}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Home className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-surface-900">
              Mursen<span className="text-brand-600">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive(link.to)
                    ? 'text-brand-700 bg-primary-50'
                    : 'text-surface-500 hover:text-surface-900 hover:bg-surface-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/assessment"
              className="hidden md:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              Free Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-50 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-surface-700" /> : <Menu className="w-5 h-5 text-surface-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white animate-fade-up">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <Home className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-surface-900">
                Mursen<span className="text-brand-600">.</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-50 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-surface-700" />
            </button>
          </div>
          <nav className="px-6 py-8 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-5 py-4 rounded-xl font-medium text-base cursor-pointer transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary-50 text-brand-700'
                    : 'text-surface-700 hover:bg-surface-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/assessment"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-brand-600 text-white font-semibold py-4 px-6 rounded-xl mt-6 hover:bg-brand-700 transition-colors min-h-[48px]"
            >
              Free Assessment
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-surface-100">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-surface-900">
                Mursen<span className="text-brand-600">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-surface-500">
              One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman. Serving Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and Cincinnati.
            </p>
            <p className="text-xs text-surface-400 mt-2">
              Owner-operated. We maintain 20+ rental units.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-surface-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/contact', label: 'About Us' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/blog', label: 'Blog' },
                { to: '/portfolio', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-surface-500 hover:text-brand-600 transition-colors cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-surface-400 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-surface-500">
              <li>Lawn Mowing &amp; Care</li>
              <li>Window Cleaning</li>
              <li>Power Washing</li>
              <li>Handyman &amp; Repairs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-surface-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-surface-500">
                <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="tel:+18595550123" className="hover:text-brand-600 transition-colors">(859) 555-0123</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-surface-500">
                <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="mailto:hello@mursenmaintenance.com" className="hover:text-brand-600 transition-colors">hello@mursenmaintenance.com</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-surface-500">
                <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                Covington, KY 41011
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-surface-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-400">
            &copy; {new Date().getFullYear()} Mursen Maintenance. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-surface-400">
            <span>Fully Insured</span>
            <span>Bonded</span>
            <span>Serving Covington &amp; Cincinnati Metro</span>
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
