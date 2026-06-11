import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Home, Leaf } from 'lucide-react';
import Homepage from './pages/Homepage';
import AssessmentBooking from './pages/AssessmentBooking';
import Portfolio from './pages/Portfolio';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminPosts from './pages/AdminPosts';
import InstantQuote from './pages/InstantQuote';
import ServiceLawnCare from './pages/ServiceLawnCare';
import ServicePowerWashing from './pages/ServicePowerWashing';
import ServiceWindowCleaning from './pages/ServiceWindowCleaning';
import ServiceHandyman from './pages/ServiceHandyman';
import BookService from './pages/BookService';
import EstimatePage from './pages/EstimatePage';
import Plans from './pages/Plans';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/services', label: 'Services', dropdown: [
      { to: '/services/lawn-care', label: 'Lawn Care' },
      { to: '/services/power-washing', label: 'Power Washing' },
      { to: '/services/window-cleaning', label: 'Window Cleaning' },
      { to: '/services/handyman', label: 'Handyman' },
    ]},
    { to: '/plans', label: 'Plans' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-sm border-b border-gray-100' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-display font-bold tracking-tight text-gray-900 uppercase">
              Mursen<span className="text-brand-600">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              link.dropdown ? (
                <div key={link.to} className="relative group">
                  <button
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                      location.pathname.startsWith('/services')
                        ? 'text-brand-700 bg-brand-50'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </button>
                  <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
                    {link.dropdown.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive(link.to)
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/book"
              className="hidden md:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              Book A Service
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white animate-fade-up">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-display font-bold tracking-tight text-gray-900 uppercase">
                Mursen<span className="text-brand-600">.</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <nav className="px-6 py-8 space-y-2">
            {navLinks.map(link => (
              link.dropdown ? (
                <div key={link.to}>
                  <div className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {link.label}
                  </div>
                  {link.dropdown.map(item => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-5 py-3 rounded-xl font-medium text-base cursor-pointer transition-colors ml-3 ${
                        isActive(item.to)
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-5 py-4 rounded-xl font-medium text-base cursor-pointer transition-colors ${
                    isActive(link.to)
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-brand-600 text-white font-bold py-4 px-6 rounded-xl mt-3 hover:bg-brand-700 transition-colors min-h-[48px]"
            >
              Book A Service
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-display font-bold tracking-tight text-gray-900 uppercase">
                Mursen<span className="text-brand-600">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman. Serving Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and Cincinnati.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Owner-operated. We maintain 20+ rental units.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/contact', label: 'About Us' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/blog', label: 'Blog' },
                { to: '/portfolio', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-gray-500 hover:text-brand-600 transition-colors cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>Lawn Mowing &amp; Care</li>
              <li>Window Cleaning</li>
              <li>Power Washing</li>
              <li>Handyman &amp; Repairs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="tel:+18595550123" className="hover:text-brand-600 transition-colors">(859) 555-0123</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="mailto:hello@mursenmaintenance.com" className="hover:text-brand-600 transition-colors">hello@mursenmaintenance.com</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                Covington, KY 41011
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Mursen Maintenance. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-400">
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
              <Route path="/estimate" element={<EstimatePage />} />
              <Route path="/services/lawn-care" element={<ServiceLawnCare />} />
              <Route path="/services/power-washing" element={<ServicePowerWashing />} />
              <Route path="/services/window-cleaning" element={<ServiceWindowCleaning />} />
              <Route path="/services/handyman" element={<ServiceHandyman />} />
              <Route path="/book" element={<BookService />} />
              <Route path="/plans" element={<Plans />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
