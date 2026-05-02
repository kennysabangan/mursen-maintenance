import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Shield, Star, ShieldCheck, Award, ChevronRight, PhoneCall, Clock, Gift, Leaf, Droplets, SprayCan, Wrench, Home, Users, MapPin } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjxwYXRoIGQ9Ik01MCAyNUwyNSA0NXYzNWg1MHYtMzVINTB6bTI1IDEwaC0xMHYxNWgxMHYtMTV6IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';

const services = [
  { icon: Leaf, title: 'Lawn Care', desc: 'Mowing, edging, trimming, leaf cleanup. Your yard, always sharp.' },
  { icon: Droplets, title: 'Window Cleaning', desc: 'Interior, exterior, screens, gutters. Crystal clear every time.' },
  { icon: SprayCan, title: 'Power Washing', desc: 'Driveways, siding, patios, decks. Like-new surfaces guaranteed.' },
  { icon: Wrench, title: 'Handyman', desc: 'Repairs, installs, drywall, fixtures. One call, any fix.' },
];

export default function Homepage() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Home Maintenance Subscription | Lawn, Windows, Power Wash, Handyman | Mursen';
  const seoDescription = 'One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman services in Covington KY and Cincinnati metro. Plans from $199/mo.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="home maintenance subscription, lawn care Covington KY, window cleaning Cincinnati, power washing Northern KY, handyman Covington, home maintenance plan" />
        <link rel="canonical" href={`${siteUrl}/`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="Mursen Maintenance" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Mursen Maintenance',
            'description': seoDescription,
            'url': siteUrl,
            'telephone': '+18595550123',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '123 Main Street',
              'addressLocality': 'Covington',
              'addressRegion': 'KY',
              'postalCode': '41011',
              'addressCountry': 'US'
            },
            'priceRange': '$$',
            'openingHoursSpecification': {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              'opens': '08:00',
              'closes': '18:00'
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 39.0837,
              'longitude': -84.5083
            },
            'image': `${siteUrl}/favicon.svg`,
            'sameAs': []
          })}
        </script>
      </Helmet>
      <div className="min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[92vh] flex items-center bg-surface-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format&fit=crop"
            alt="Beautifully maintained home in the Cincinnati metro area"
            className="w-full h-full object-cover opacity-[0.12]"
            loading="eager" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMAGE; }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-surface-900/97 via-surface-900/90 to-surface-900/80" />
        </div>
        <div className="glow-orb w-[60vw] h-[60vw] bg-accent-500/[0.04] -top-32 -right-32" />
        <div className="glow-orb w-[40vw] h-[40vw] bg-secondary-500/[0.04] -bottom-24 -left-24" />

        <div className="relative container-app py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="opacity-0 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-accent-400" />
                Fully Insured & Bonded · Serving Covington & Cincinnati Metro
              </div>
            </div>

            <h1 className="opacity-0 animate-fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight" style={{ animationDelay: '0.1s' }}>
              Your house.<br />Handled.
            </h1>

            <p className="opacity-0 animate-fade-up text-lg md:text-xl text-surface-400 leading-relaxed mb-10 max-w-2xl" style={{ animationDelay: '0.2s' }}>
              One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman — we handle it all so you don't have to.
            </p>

            <div className="opacity-0 animate-fade-up flex flex-col sm:flex-row gap-4 mb-14" style={{ animationDelay: '0.3s' }}>
              <Link to="/assessment" className="btn-primary-lg">
                Book Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/portfolio" className="btn-secondary-lg btn-secondary">
                Book a Single Service
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="opacity-0 animate-fade-up flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-surface-400" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: ShieldCheck, text: 'Fully Insured' },
                { icon: Shield, text: 'Bonded' },
                { icon: MapPin, text: 'Serving Covington & Cincinnati Metro' },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2">
                  <t.icon className="w-4 h-4 text-secondary-400" />
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 mb-4">
              Four services.<br />
              <span className="text-surface-400 font-light">One subscription.</span>
            </h2>
            <p className="text-lg text-surface-500 max-w-2xl mx-auto">
              Everything your home needs, handled by one team. No more juggling contractors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-surface-100 shadow-sm hover:shadow-md transition-all duration-300 group text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-100 transition-colors">
                  <s.icon className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{s.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium transition-colors group">
              See all services & pricing
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="section-alt">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-lg text-surface-500 max-w-xl mx-auto">Three steps. Zero complexity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Pick Your Service', desc: 'Browse lawn, windows, power wash, handyman. Book online or call us.', color: 'text-brand-600', bg: 'bg-brand-50' },
              { step: 2, title: 'We Show Up', desc: 'Professional, on-time, fully insured. Same quality every time.', color: 'text-accent-600', bg: 'bg-accent-50' },
              { step: 3, title: 'Subscribe & Save', desc: 'Love the work? Switch to a monthly plan and save 30–40%.', color: 'text-secondary-600', bg: 'bg-secondary-50' },
            ].map((s) => (
              <div key={s.step} className="text-center group">
                <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-medium transition-all duration-300 group-hover:scale-105`}>
                  <span className={`text-3xl font-extrabold ${s.color}`}>{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3 tracking-tight">{s.title}</h3>
                <p className="text-surface-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PLANS TEASER ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <span className="badge bg-accent-50 text-accent-700 mb-6 border border-accent-100">
              <Award className="w-3.5 h-3.5" />
              Monthly Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 tracking-tight">
              Choose your level of coverage
            </h2>
            <p className="text-lg text-surface-500 max-w-xl mx-auto">Month-to-month. Cancel anytime. No lock-in contracts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
            {[
              {
                name: 'Starter',
                price: 199,
                desc: 'Essential coverage for your home',
                features: ['1 handyman visit/mo (2 hrs)', 'Bi-weekly lawn mowing + edging', 'Same technician every visit', 'Monthly property summary'],
              },
              {
                name: 'Home Care',
                price: 349,
                desc: 'The full package — house, yard, exterior',
                features: ['2 handyman visits/mo (4 hrs each)', 'Weekly lawn mowing + edging + blowing', 'Monthly window cleaning (exterior)', 'Bi-annual power wash (driveway, walkways)', 'Priority scheduling (48hr SLA)', '24/7 hotline for urgent issues'],
                highlight: true,
              },
              {
                name: 'Property Manager',
                price: 279,
                desc: 'For landlords & multi-unit owners',
                features: ['Everything in Home Care', 'Priority same/next-day scheduling', 'Tenant turnover support', 'Dedicated point of contact', '3+ units: $249/unit · 5+: $229/unit'],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={tier.highlight ? 'pricing-card-highlighted' : 'pricing-card-default'}
              >
                {tier.highlight && (
                  <div className="pricing-popular-badge">Most Popular</div>
                )}

                <h3 className="text-xl font-bold mb-1 tracking-tight text-surface-900">{tier.name}</h3>
                <p className="text-sm mb-6 text-surface-500">{tier.desc}</p>

                <div className="mb-8">
                  <span className={`text-5xl font-extrabold tracking-tight ${tier.highlight ? 'text-primary-700' : 'text-surface-900'}`}>${tier.price}</span>
                  <span className={`text-lg ml-1 ${tier.highlight ? 'text-primary-600' : 'text-surface-400'}`}>/mo</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-primary-600' : 'text-secondary-500'}`} />
                      <span className="text-sm text-surface-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/assessment"
                  className={`block text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    tier.highlight
                      ? 'bg-primary-700 hover:bg-primary-800 text-white shadow-glow-brand hover:shadow-glow-brand-hover hover:-translate-y-0.5'
                      : 'bg-surface-900 hover:bg-primary-800 text-white hover:shadow-medium hover:-translate-y-0.5'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium transition-colors group">
              See full service & pricing details
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHO IT'S FOR ═══════════════ */}
      <section className="section-alt">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 tracking-tight">Who It's For</h2>
            <p className="text-lg text-surface-500 max-w-xl mx-auto">Whether it's your home or your portfolio — we've got you covered.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-surface-100 shadow-sm">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                <Home className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-3 tracking-tight">Homeowners</h3>
              <p className="text-surface-500 leading-relaxed mb-6">
                Tired of juggling a lawn guy, a window guy, and a handyman? One subscription covers it all — lawn, windows, power wash, and repairs. Your weekends are yours again.
              </p>
              <ul className="space-y-3">
                {['Never search for a contractor again', 'Consistent quality, every visit', 'Save 30–40% vs. à la carte pricing', 'Cancel anytime, no contracts'].map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-surface-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border border-surface-100 shadow-sm">
              <div className="w-14 h-14 bg-accent-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 mb-3 tracking-tight">Property Investors</h3>
              <p className="text-surface-500 leading-relaxed mb-6">
                Managing multiple units? Our Property Manager plan gives you one team for everything — priority scheduling, turnover support, and volume discounts starting at 3+ units.
              </p>
              <ul className="space-y-3">
                {['Volume pricing: $249/unit (3+), $229/unit (5+)', 'Same/next-day priority scheduling', 'Tenant turnover support included', 'Dedicated point of contact'].map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-surface-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-secondary-50 text-secondary-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-secondary-100 mb-6">
              <Star className="w-3.5 h-3.5" />
              Trusted by Homeowners & Investors
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-surface-900 mb-4">
              What our customers say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "Since hiring Mursen, my house has been spotless inside and out. They handle the lawn, windows, and that driveway stain I kept putting off. One team, zero hassle.",
                name: 'Sarah K.',
                role: 'Homeowner, Highland Ave, Covington',
                color: 'bg-primary-700',
              },
              {
                quote: "We own three properties between Newport and Florence and used to juggle different handymen for each one. Now one team covers it all — same quality everywhere, no surprises.",
                name: 'Mike T.',
                role: 'Multi-Unit Owner, Newport & Florence',
                color: 'bg-accent-600',
              },
              {
                quote: "My duplex in Fort Mitchell was a nightmare before Mursen. A burst pipe at midnight on a Sunday got fixed in under two hours. That alone keeps me as a customer for life.",
                name: 'James R.',
                role: 'Duplex Owner, Fort Mitchell',
                color: 'bg-secondary-600',
              },
              {
                quote: "I live in Oakley and own a rental back in Independence. Mursen bridges the gap perfectly — they handle everything on-site while I just read the monthly report. Zero stress.",
                name: 'Lisa P.',
                role: 'Out-of-Area Owner, Independence',
                color: 'bg-primary-800',
              },
            ].map((t) => (
              <div key={t.name} className="bg-surface-50/80 rounded-3xl p-8 border border-surface-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <blockquote className="text-base text-surface-700 leading-relaxed mb-6 font-light">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>{t.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="font-semibold text-surface-800 text-sm">{t.name}</div>
                    <div className="text-xs text-surface-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRIPLE GUARANTEE ═══════════════ */}
      <section className="section-dark">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="badge bg-accent-500/20 text-accent-400 mb-6">
              <Shield className="w-4 h-4" />
              No-Risk Guarantee
            </span>
            <h2 className="heading-2 text-white mb-3 tracking-tight">The Triple Guarantee</h2>
            <p className="text-surface-400 text-lg">We put our money where our mouth is.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: PhoneCall, title: "We're late?", desc: 'You get a free month of service.' },
              { icon: Award, title: 'Unsatisfied?', desc: 'Full refund within 30 days. No questions.' },
              { icon: ShieldCheck, title: 'Missed something?', desc: 'We fix it free. Always.' },
            ].map((g) => (
              <div key={g.title} className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300 group">
                <g.icon className="w-10 h-10 text-accent-400 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{g.title}</h3>
                <p className="text-surface-400">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="section bg-surface-900 text-white relative overflow-hidden">
        <div className="glow-orb w-[80vw] h-[80vw] bg-accent-500/[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative container-app text-center">
          <h2 className="heading-2 text-white mb-4 tracking-tight">
            One subscription.<br />
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">Everything around your house.</span>
          </h2>
          <p className="text-lg text-surface-400 mb-10 max-w-xl mx-auto">
            Lawn, windows, power wash, handyman — handled. Plans from $199/mo.
          </p>
          <Link to="/assessment" className="btn-primary-lg px-12">
            Book Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-surface-500">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-secondary-400" /> Insured</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-secondary-400" /> Bonded</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-secondary-400" /> Covington & Cincinnati Metro</span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
