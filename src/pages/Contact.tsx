import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-8 text-center">
            About Mursen Maintenance
          </h1>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg mb-6">
              We started managing our own 24 rental properties in Covington and got frustrated with the same maintenance nightmares you face. No-shows, inflated quotes, emergency repairs between guest stays, and contractors who don't communicate.
            </p>
            <p className="text-lg mb-6">
              So we built the solution we wish existed — a maintenance service that treats rental properties like a business operation. We developed the 75-point inspection system, the same-technician guarantee, and the vendor concierge network to make property maintenance predictable, professional, and hands-off for owners.
            </p>
            <p className="text-lg mb-8">
              Today, we keep 24 rental properties guest-ready 365 days a year. And we're ready to do the same for your portfolio.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-primary-800 mb-2">Reliability</h3>
                <p className="text-gray-600">We show up. On time. Every time. That's non-negotiable.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold text-primary-800 mb-2">Transparency</h3>
                <p className="text-gray-600">Clear pricing, photo evidence, no hidden fees. Ever.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="font-bold text-primary-800 mb-2">Quality</h3>
                <p className="text-gray-600">We do it right the first time, or we fix it free.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-800 mb-12 text-center">
            Meet The Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Mike Henderson', role: 'Lead Technician', bio: '15 years in property maintenance. Certified HVAC, plumbing, and electrical. Manages all 24 client properties.' },
              { name: 'Sarah Kim', role: 'Operations Manager', bio: 'Coordinates scheduling, vendor networks, and client communications. Former Airbnb host.' },
              { name: 'David Ross', role: 'Founder', bio: 'Built the Mursen system after managing 24 rentals himself. MBA, former property manager.' }
            ].map((member, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-primary-800 text-lg">{member.name}</h3>
                <div className="text-secondary-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-6 bg-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Credentials & Certifications</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <div className="text-xl font-bold">Fully Insured</div>
              <div className="text-sm opacity-80">Commercial General Liability</div>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <div className="text-xl font-bold">Bonded</div>
              <div className="text-sm opacity-80">$1M surety bond</div>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <div className="text-xl font-bold">Licensed</div>
              <div className="text-sm opacity-80">KY Trade Licenses</div>
            </div>
            <div className="bg-white/10 px-6 py-4 rounded-lg">
              <div className="text-xl font-bold">BBB Accredited</div>
              <div className="text-sm opacity-80">A+ Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-800 mb-12 text-center">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-primary-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <div className="font-semibold text-gray-700">Phone</div>
                  <a href="tel:+18595550123" className="text-primary-600 hover:underline text-xl">
                    (859) 555-0123
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Email</div>
                  <a href="mailto:hello@mursenmaintenance.com" className="text-primary-600 hover:underline text-lg">
                    hello@mursenmaintenance.com
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Office</div>
                  <div className="text-gray-700">
                    123 Main Street<br />
                    Covington, KY 41011
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Response Promise</div>
                  <div className="text-gray-700">We respond within 2 hours during business hours.</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-800 mb-6">Send a Message</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                <textarea placeholder="How can we help?" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
                <button type="button" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 px-6">
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
              <li><Link to="/" className="hover:text-accent-300 transition">Home</Link></li>
              <li><Link to="/how-it-works" className="hover:text-accent-300 transition">How It Works</Link></li>
              <li><Link to="/portfolio" className="hover:text-accent-300 transition">Portfolio</Link></li>
              <li><Link to="/assessment" className="hover:text-accent-300 transition">Book Assessment</Link></li>
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
    </div>
  );
}
