import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Shield, Home } from 'lucide-react';
import Homepage from './pages/Homepage';
import AssessmentBooking from './pages/AssessmentBooking';
import Portfolio from './pages/Portfolio';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-surface-100/80 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-800 text-white text-xs py-2 px-6">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5 opacity-75">
            <a href="tel:+18595550123" className="flex items-center gap-1.5 hover:opacity-100 transition-opacity">
              <Phone className="w-3 h-3" />(859) 555-0123
            </a>
            <span className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3 h-3" />hello@mursenmaintenance.com
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-accent-400 font-semibold text-[11px] tracking-wide uppercase">
            <Shield className="w-3 h-3" />
            50 Property Cap This Quarter — <span className="text-white/90 font-normal normal-case">26 Spots Left</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-3.5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 bg-primary-800 rounded-xl flex items-center justify-center group-hover:bg-primary-700 transition-colors">
            <Home className="w-5 h-5 text-accent-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary-900">
            Mursen<span className="text-accent-500">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive(link.to)
                  ? 'text-primary-800 bg-primary-50/80'
                  : 'text-surface-500 hover:text-primary-700 hover:bg-surface-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/assessment"
            className="hidden md:inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm py-2.5 px-6 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-button hover:-translate-y-0.5"
          >
            Book Free Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-50 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-100 bg-white px-6 py-4 animate-slide-up">
          <nav className="space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary-50 text-primary-800'
                    : 'text-surface-600 hover:bg-surface-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/assessment"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-accent-500 text-white font-semibold py-3 px-6 rounded-xl mt-3 hover:bg-accent-600 transition-colors"
            >
              Book Free Assessment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-900 text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Ready to Get Started?</h3>
              <p className="text-surface-400 text-lg">Book your free 75-point property assessment today.</p>
            </div>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-button hover:-translate-y-0.5 flex-shrink-0"
            >
              Schedule Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-accent-400" />
              </div>
              <span className="text-lg font-bold tracking-tight">Mursen<span className="text-accent-400">.</span></span>
            </div>
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs">
              Professional property maintenance for rental owners in Covington, KY. Guest-ready guaranteed.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-surface-500 mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { to: '/contact', label: 'About Us' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-surface-400 hover:text-accent-400 transition-colors cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-surface-500 mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-surface-400">
              <li className="hover:text-white cursor-default transition-colors">Property Inspections</li>
              <li className="hover:text-white cursor-default transition-colors">Seasonal Maintenance</li>
              <li className="hover:text-white cursor-default transition-colors">Emergency Repairs</li>
              <li className="hover:text-white cursor-default transition-colors">Vendor Concierge</li>
              <li className="hover:text-white cursor-default transition-colors">Smart Home Setup</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-surface-500 mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2.5 text-sm text-surface-400">
                <Phone className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <a href="tel:+18595550123" className="hover:text-white transition-colors">(859) 555-0123</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-surface-400">
                <Mail className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <a href="mailto:hello@mursenmaintenance.com" className="hover:text-white transition-colors">hello@mursenmaintenance.com</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-surface-400">
                <MapPin className="w-4 h-4 text-accent-400 flex-shrink-0" />
                Covington, KY 41011
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} Mursen Maintenance. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-surface-500">
            <a href="#" className="hover:text-surface-300 transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-surface-300 transition-colors cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useState(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  return null;
}

function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
