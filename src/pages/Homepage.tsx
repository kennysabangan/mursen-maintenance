import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Shield, ShieldCheck, Award, ChevronRight, PhoneCall, Clock, Leaf, Droplets, SprayCan, Wrench, Home, Users, MapPin } from 'lucide-react';

const services = [
  { icon: Leaf, title: 'Lawn Care', desc: 'Mowing, edging, trimming, leaf cleanup.' },
  { icon: Droplets, title: 'Window Cleaning', desc: 'Interior, exterior, screens, gutters.' },
  { icon: SprayCan, title: 'Power Washing', desc: 'Driveways, siding, patios, decks.' },
  { icon: Wrench, title: 'Handyman', desc: 'Repairs, installs, drywall, fixtures.' },
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
      <div className="min-h-screen bg-white">

      {/* ═══════════════ HERO — LIGHT ═══════════════ */}
      <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-primary-50/40" />
        <div className="glow-orb w-[50vw] h-[50vw] bg-primary-500/[0.03] -top-24 -right-24" />

        <div className="relative container-app py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Trust badge */}
            <div className="opacity-0 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-surface-50 text-surface-600 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-surface-100">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                Fully Insured & Bonded · Serving Covington & Cincinnati Metro
              </div>
            </div>

            {/* Headline */}
            <h1 className="opacity-0 animate-fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-surface-900 mb-6 tracking-tight leading-[1.1]" style={{ animationDelay: '0.08s' }}>
              Your house.<br />Handled.
            </h1>

            {/* Subheadline */}
            <p className="opacity-0 animate-fade-up text-lg md:text-xl text-surface-500 leading-relaxed mb-3 max-w-xl" style={{ animationDelay: '0.15s' }}>
              One call. One company. One bill.
            </p>
            <p className="opacity-0 animate-fade-up text-base text-surface-400 mb-10 max-w-xl" style={{ animationDelay: '0.2s' }}>
              Owner-operated. We maintain 20+ rental units ourselves.
            </p>

            {/* CTAs */}
            <div className="opacity-0 animate-fade-up flex flex-col sm:flex-row gap-4 mb-14" style={{ animationDelay: '0.25s' }}>
              <Link to="/assessment" className="btn-primary-lg w-full sm:w-auto justify-center">
                See Our Plans
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/portfolio" className="btn-secondary-lg w-full sm:w-auto justify-center">
                Book a Single Service
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="opacity-0 animate-fade-up flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-surface-400" style={{ animationDelay: '0.32s' }}>
              {[
                { icon: ShieldCheck, text: 'Fully Insured' },
                { icon: Shield, text: 'Bonded' },
                { icon: MapPin, text: 'Covington & Cincinnati Metro' },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-1.5">
                  <t.icon className="w-3.5 h-3.5 text-brand-500" />
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-surface-900 mb-3">
              What We Do
            </h2>
            <p className="text-lg text-surface-500 max-w-xl mx-auto">
              Four services. One team. Everything your home needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-7 border border-surface-100 text-center transition-all duration-200 hover:border-surface-200" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-base font-bold text-surface-900 mb-1.5">{s.title}</h3>
                <p className="text-sm text-surface-500">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors group">
              See all services & pricing
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">How It Works</h2>
            <p className="text-lg text-surface-500 max-w-md mx-auto">Three steps. Zero complexity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Pick a Service', desc: 'Browse lawn, windows, power wash, handyman. Book online or call.' },
              { step: '2', title: 'We Show Up', desc: 'Professional, on-time, fully insured. Same quality every time.' },
              { step: '3', title: 'Subscribe & Save', desc: 'Love the work? Switch to a plan. One flat fee, everything handled.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-extrabold text-brand-600">{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{s.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">
              Simple Plans
            </h2>
            <p className="text-lg text-surface-500 max-w-md mx-auto">Month-to-month. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto mb-8">
            {[
              {
                name: 'Lawn Plus',
                price: '109',
                note: '/mo (Apr–Oct)',
                desc: 'Weekly lawn maintenance',
                features: ['Weekly mow + edge + blow', 'Seasonal cleanups included', 'Gutter check each visit'],
              },
              {
                name: 'Handyman Plus',
                price: '149',
                desc: 'Monthly handyman visits',
                features: ['1 visit/month (2 hrs)', '5-day scheduling window', 'Same technician every visit'],
              },
              {
                name: 'Starter',
                price: '199',
                desc: 'Essential coverage',
                features: ['1 handyman visit/mo (2 hrs)', 'Biweekly lawn mowing', 'Same technician every visit', 'Monthly property summary'],
              },
              {
                name: 'Home Care',
                price: '479',
                desc: 'The full package',
                features: ['1 visit (4 hrs handyman)', 'Weekly lawn mowing + edging', 'Monthly window cleaning', 'Annual power wash', 'Priority scheduling (48hr SLA)', '24/7 hotline'],
                highlight: true,
              },
              {
                name: 'Property Manager',
                price: '279',
                note: '/unit/mo',
                desc: 'For landlords & investors',
                features: ['Rental-unit optimized', 'Priority scheduling', 'Tenant turnover support', '3+ units: $249 · 5+: $229'],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={tier.highlight ? 'pricing-card-highlighted' : 'pricing-card-default'}
              >
                {tier.highlight && (
                  <div className="pricing-popular-badge">Most Popular</div>
                )}

                <h3 className="text-base font-bold mb-1 text-surface-900">{tier.name}</h3>
                <p className="text-xs mb-5 text-surface-500">{tier.desc}</p>

                <div className="mb-6">
                  <span className={`text-3xl font-extrabold tracking-tight ${tier.highlight ? 'text-brand-700' : 'text-surface-900'}`}>${tier.price}</span>
                  <span className={`text-xs ml-1 ${tier.highlight ? 'text-brand-600' : 'text-surface-400'}`}>{tier.note || '/mo'}</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-brand-600' : 'text-surface-400'}`} />
                      <span className="text-xs text-surface-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/assessment"
                  className={`block text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer min-h-[44px] ${
                    tier.highlight
                      ? 'bg-brand-600 hover:bg-brand-700 text-white'
                      : 'bg-surface-900 hover:bg-brand-600 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors group">
              See full service & pricing details
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHO IT'S FOR ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">Who It's For</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-surface-100" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                <Home className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Homeowners</h3>
              <p className="text-sm text-surface-500 leading-relaxed mb-5">
                Your to-do list never ends. One subscription and it's handled.
              </p>
              <ul className="space-y-2.5">
                {['Never search for a contractor again', 'One flat monthly fee', 'Cancel anytime'].map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-surface-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-surface-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-surface-100" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Property Investors</h3>
              <p className="text-sm text-surface-500 leading-relaxed mb-5">
                10 units? One subscription. Work once, manage everything.
              </p>
              <ul className="space-y-2.5">
                {['Volume pricing at 3+ units', 'Priority scheduling', 'Tenant turnover support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-surface-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-surface-600">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="glow-orb w-[60vw] h-[60vw] bg-primary-500/[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative container-app text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 tracking-tight">
            Stop Managing Five Vendors.
          </h2>
          <p className="text-lg text-surface-500 mb-8 max-w-md mx-auto">
            One subscription. One company. One bill.
          </p>
          <Link to="/assessment" className="btn-primary-lg px-12">
            See Our Plans
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-surface-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-brand-500" /> Insured</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-500" /> Bonded</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-500" /> Local</span>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
