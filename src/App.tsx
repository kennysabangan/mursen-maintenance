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
  const location = useLocation();

  const navLinks = [
    { to: '/portfolio', label: 'Services' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur border-b border-stone-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-stone-900">
            Mursen<span className="text-brand-600">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive(link.to)
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-stone-600 hover:text-brand-600 hover:bg-stone-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/assessment"
            className="hidden md:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-glow-brand"
          >
            Free Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-50 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-6 py-6 animate-fade-up">
          <nav className="space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-5 py-3 rounded-xl font-medium cursor-pointer transition-colors ${
                  isActive(link.to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/assessment"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-brand-600 text-white font-semibold py-3 px-6 rounded-xl mt-4 hover:bg-brand-700 transition-colors"
            >
              Free Assessment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-stone-900">
                Mursen<span className="text-brand-600">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman services serving Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and Cincinnati. Fully insured, bonded, and committed to quality.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-stone-400 mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { to: '/contact', label: 'About Us' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/blog', label: 'Blog' },
                { to: '/portfolio', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-stone-600 hover:text-brand-600 transition-colors cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-stone-400 mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-stone-600">
              <li>Lawn Mowing &amp; Care</li>
              <li>Window Cleaning</li>
              <li>Power Washing</li>
              <li>Handyman &amp; Repairs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-stone-400 mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2.5 text-sm text-stone-600">
                <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="tel:+18595550123" className="hover:text-brand-600 transition-colors">(859) 555-0123</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-stone-600">
                <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <a href="mailto:hello@mursenmaintenance.com" className="hover:text-brand-600 transition-colors">hello@mursenmaintenance.com</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-stone-600">
                <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                Covington, KY 41011
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Mursen Maintenance. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-stone-400">
            <span>Fully Insured</span>
            <span>Bonded</span>
            <span>BBB A+</span>
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
        <div className="min-h-screen flex flex-col">
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
