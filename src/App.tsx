import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AssessmentBooking from './pages/AssessmentBooking';
import Portfolio from './pages/Portfolio';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-800">
          Mursen Maintenance
        </Link>
        <nav className="hidden md:flex gap-8">
          {[
            { to: '/', label: 'Home' },
            { to: '/how-it-works', label: 'How It Works' },
            { to: '/portfolio', label: 'Portfolio' },
            { to: '/assessment', label: 'Book Assessment' },
            { to: '/contact', label: 'Contact' }
          ].map(link => (
            <Link key={link.to} to={link.to} className="text-primary-700 hover:text-accent-500 font-medium transition">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/assessment" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-2 px-6 rounded-lg transition">
          Get Started
        </Link>
      </div>
      {/* Mobile nav placeholder */}
      <div className="md:hidden px-6 pb-4 flex flex-wrap gap-4 justify-center">
        {[
          { to: '/', label: 'Home' },
          { to: '/how-it-works', label: 'How It Works' },
          { to: '/portfolio', label: 'Portfolio' },
          { to: '/assessment', label: 'Book' },
          { to: '/contact', label: 'Contact' }
        ].map(link => (
          <Link key={link.to} to={link.to} className="text-primary-700 font-medium">
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4">Mursen Maintenance</h3>
          <p className="opacity-80">
            Professional property maintenance for rental owners. Guest-ready guaranteed.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 opacity-80">
            {[
              { to: '/', label: 'Home' },
              { to: '/how-it-works', label: 'How It Works' },
              { to: '/portfolio', label: 'Portfolio' },
              { to: '/assessment', label: 'Book Assessment' },
              { to: '/contact', label: 'Contact' }
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-accent-300 transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Service Area</h4>
          <p className="opacity-80">
            Covington, KY and surrounding Northern Kentucky communities.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-primary-800 text-center opacity-60 text-sm">
        © {new Date().getFullYear()} Mursen Maintenance. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
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
