import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Check, Shield, ShieldCheck, ChevronDown, ChevronUp,
  Phone, Clock, Leaf, Droplets, SprayCan, Wrench, AlertTriangle,
  Star, Play, ShieldCheckIcon, Zap, TrendingUp,
} from 'lucide-react';

/* ──────────────── DATA ──────────────── */

const painPoints = [
  {
    icon: Clock,
    title: 'You call a lawn guy. He shows up twice then ghosts.',
  },
  {
    icon: AlertTriangle,
    title: 'Your window cleaner is booked out for 6 weeks.',
  },
  {
    icon: Droplets,
    title: 'A small leak becomes a $2,000 emergency because nobody caught it.',
  },
  {
    icon: Zap,
    title: "You're managing 5 different vendors and none of them talk to each other.",
  },
];

const valueStacks = [
  {
    name: 'Lawn Plus',
    price: '109',
    note: '/mo (Apr–Oct)',
    totalValue: '$280+',
    features: [
      { item: 'Weekly mow + edge + blow', worth: '$180/mo' },
      { item: 'Seasonal cleanups included', worth: '$60/yr' },
      { item: 'Gutter check each visit', worth: '$40/mo' },
    ],
  },
  {
    name: 'Handyman Plus',
    price: '149',
    note: '/mo',
    totalValue: '$350+',
    features: [
      { item: '1 visit/month (2 hrs)', worth: '$200/mo' },
      { item: '5-day scheduling window', worth: '$50/mo' },
      { item: 'Same technician every visit', worth: '$100/mo' },
    ],
  },
  {
    name: 'Starter',
    price: '199',
    note: '/mo',
    totalValue: '$500+',
    features: [
      { item: '1 handyman visit/mo (2 hrs)', worth: '$200/mo' },
      { item: 'Biweekly lawn mowing', worth: '$180/mo' },
      { item: 'Same technician every visit', worth: '$70/mo' },
      { item: 'Monthly property summary', worth: '$50/mo' },
    ],
  },
  {
    name: 'Home Care',
    price: '479',
    note: '/mo',
    totalValue: '$850+',
    highlight: true,
    features: [
      { item: 'Weekly lawn mowing & edging', worth: '$180/mo' },
      { item: 'Monthly window cleaning — exterior', worth: '$120/mo' },
      { item: '4 hours handyman work', worth: '$300/mo' },
      { item: '1 annual power wash — driveway & walkways', worth: '$200/yr' },
      { item: 'Priority scheduling (48hr SLA)', worth: '$50/mo' },
      { item: 'Photo report after every visit', worth: 'Priceless' },
    ],
  },
  {
    name: 'Property Manager',
    price: '279',
    note: '/unit/mo',
    totalValue: '$600+',
    features: [
      { item: 'Rental-unit optimized service', worth: '$200/mo' },
      { item: 'Priority scheduling', worth: '$100/mo' },
      { item: 'Tenant turnover support', worth: '$150/mo' },
      { item: '3+ units: $249 · 5+: $229', worth: 'Volume savings' },
    ],
  },
];

const testimonials = [
  {
    quote: "They caught a leaking pipe under our kitchen sink before it flooded the whole floor. Saved us thousands. We've been subscribers for 8 months now.",
    name: 'Sarah M.',
    location: 'Homeowner, Covington',
    initials: 'SM',
  },
  {
    quote: "I used to call 4 different people for my rentals. Now I call one. Mursen handles lawn, windows, handyman — they even painted a unit during turnover. Incredible.",
    name: 'David R.',
    location: 'Property Owner, Florence',
    initials: 'DR',
  },
  {
    quote: "Our driveway was disgusting. Oil stains, mold, years of grudge. After their power wash it looked brand new. Neighbors asked who did it.",
    name: 'Jennifer K.',
    location: 'Homeowner, Fort Mitchell',
    initials: 'JK',
  },
];

const faqs = [
  {
    q: 'What if I need more handyman hours?',
    a: 'Easy — we bill additional hours at $75/hr for subscribers (vs. $95/hr one-off). Just let us know and we\'ll schedule the extra time.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. All plans are month-to-month. No contracts, no cancellation fees. We earn your business every single month.',
  },
  {
    q: 'What happens in winter when there\'s no lawn to mow?',
    a: 'Lawn plans pause Dec–Mar automatically. Your rate adjusts. We swap mowing for seasonal services like gutter cleaning and winter prep.',
  },
  {
    q: 'Do you service my area?',
    a: 'We serve Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and the greater Cincinnati metro. Call us to confirm your address.',
  },
  {
    q: 'Are your workers insured?',
    a: '100%. Every team member is covered under our general liability and workers\' comp insurance. We\'re also bonded. Proof available on request.',
  },
  {
    q: 'What\'s included in the power wash?',
    a: 'Driveway, walkways, and front porch/entry. We use commercial-grade equipment and eco-friendly detergents. Siding and decks available as add-ons.',
  },
];

/* ──────────────── COMPONENT ──────────────── */

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Home Maintenance Subscription | Lawn, Windows, Power Wash, Handyman | Mursen';
  const seoDescription = 'One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman services in Covington KY and Cincinnati metro. Plans from $109/mo.';

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

      {/* ═══════════════ 1. HERO — PATTERN INTERRUPT ═══════════════ */}
      <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full-bleed background image — bright daytime home */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80&auto=format&fit=crop"
            alt="Bright modern home with green lawn and blue sky"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl px-6 py-20">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.05] opacity-0 animate-fade-up">
            Your House.<br />
            <span className="text-green-400">Handled.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-up" style={{ animationDelay: '0.12s' }}>
            One subscription. Lawn, windows, power wash, handyman — we handle everything so you don't have to.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold text-lg md:text-xl px-10 py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-green-500/40 min-h-[56px]"
            >
              Get My Free Quote
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>

          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-300 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> Fully Insured</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> Bonded</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> Serving Covington & Cincinnati Metro</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> 20+ Properties Maintained</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. FOUNDER VIDEO ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">
              Why We Started Mursen
            </h2>
            <p className="text-lg text-surface-500 max-w-xl mx-auto">
              We maintain 20+ rental properties ourselves. We started Mursen because we were tired of calling 5 different guys and none of them showing up.
            </p>
          </div>

          {/* Video placeholder */}
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Home maintenance team at work"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. PROBLEM AGITATION ═══════════════ */}
      <section className="section bg-red-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">
              Sound Familiar?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
            {painPoints.map((p, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
                <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-base font-semibold text-surface-800 leading-snug">{p.title}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-surface-900">
              What if <span className="text-green-600">ONE company</span> handled ALL of it?
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. THE OFFER — HORMOZI VALUE STACK ═══════════════ */}
      <section className="section bg-white" id="plans">
        <div className="container-app">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">
              The Mursen Home Care Plan
            </h2>
            <p className="text-lg text-surface-500 max-w-xl mx-auto">
              Stack so much value, you'd feel stupid saying no.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {valueStacks.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-7 border-2 transition-all duration-200 ${
                  tier.highlight
                    ? 'border-green-400 bg-green-50/50 shadow-lg shadow-green-600/10'
                    : 'border-surface-100 bg-white hover:border-surface-200'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <h3 className="text-lg font-bold text-surface-900 mb-1">{tier.name}</h3>

                {/* Price */}
                <div className="mb-5">
                  <span className={`text-4xl font-extrabold tracking-tight ${tier.highlight ? 'text-green-700' : 'text-surface-900'}`}>
                    ${tier.price}
                  </span>
                  <span className={`text-sm ml-1 ${tier.highlight ? 'text-green-600' : 'text-surface-400'}`}>
                    {tier.note}
                  </span>
                </div>

                {/* Value stack */}
                <div className="space-y-3 mb-5">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-green-600' : 'text-surface-400'}`} />
                        <span className="text-sm text-surface-700">{f.item}</span>
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${tier.highlight ? 'text-green-600' : 'text-surface-400'}`}>
                        {f.worth}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total value line */}
                <div className={`border-t pt-4 mb-5 ${tier.highlight ? 'border-green-200' : 'border-surface-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-surface-500">Total value:</span>
                    <span className="text-lg font-bold text-surface-400 line-through">{tier.totalValue}/mo</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-surface-500">Your price:</span>
                    <span className={`text-xl font-extrabold ${tier.highlight ? 'text-green-700' : 'text-green-600'}`}>
                      ${tier.price}{tier.note}
                    </span>
                  </div>
                </div>

                <Link
                  to="/assessment"
                  className={`block text-center py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer min-h-[48px] ${
                    tier.highlight
                      ? 'bg-green-600 hover:bg-green-500 text-white shadow-md shadow-green-600/20'
                      : 'bg-surface-900 hover:bg-green-600 text-white'
                  }`}
                >
                  Get My Free Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. BEFORE & AFTER ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">
              See The Difference
            </h2>
            <p className="text-lg text-surface-500 max-w-md mx-auto">
              Real results. Real properties. Real clean.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              {
                label: 'Lawn Care',
                before: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=75',
                after: 'https://images.unsplash.com/photo-1558435186-d31d126391fa?w=400&q=75',
              },
              {
                label: 'Power Washing',
                before: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=75',
                after: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=75',
              },
              {
                label: 'Window Cleaning',
                before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=75',
                after: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=75',
              },
              {
                label: 'Handyman Repairs',
                before: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=75',
                after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=75',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-surface-100 shadow-sm">
                <div className="grid grid-cols-2 gap-px bg-surface-100">
                  <div className="relative">
                    <img src={item.before} alt={`${item.label} before`} className="w-full h-36 object-cover" />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Before</span>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt={`${item.label} after`} className="w-full h-36 object-cover" />
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">After</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm font-bold text-surface-800">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. SOCIAL PROOF ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-surface-100 shadow-sm flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-surface-700 leading-relaxed mb-6 flex-grow">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-green-700">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-surface-900">{t.name}</p>
                    <p className="text-xs text-surface-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. GUARANTEE ═══════════════ */}
      <section className="section bg-green-50">
        <div className="container-app text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 tracking-tight">
            Our 100% Satisfaction Guarantee
          </h2>
          <p className="text-lg text-surface-600 leading-relaxed">
            If we miss something, we come back and fix it — free. If you're not happy in the first 30 days, we refund every penny. No questions. No hassle. No risk to you.
          </p>
        </div>
      </section>

      {/* ═══════════════ 8. SCARCITY / URGENCY ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <TrendingUp className="w-4 h-4" />
            Limited Availability
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 tracking-tight">
            We Only Take 10 New Clients Per Month
          </h2>
          <p className="text-lg text-surface-500 mb-8 max-w-lg mx-auto">
            To maintain quality, we cap new Home Care subscriptions at 10 per month. Once they're filled, you're on the waitlist.
          </p>

          {/* Spots counter */}
          <div className="bg-surface-50 rounded-2xl p-6 max-w-sm mx-auto mb-8 border border-surface-100">
            <p className="text-sm text-surface-500 mb-2">Spots remaining this month:</p>
            <div className="text-5xl font-extrabold text-green-600 mb-3">3</div>
            <div className="w-full bg-surface-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: '70%' }} />
            </div>
            <p className="text-xs text-surface-400 mt-2">7 of 10 spots taken</p>
          </div>

          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-green-600/30 min-h-[56px]"
          >
            Claim My Spot — Get My Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ═══════════════ 9. FAQ ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-3 tracking-tight">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-surface-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-surface-50 transition-colors"
                >
                  <span className="text-base font-semibold text-surface-800 pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-surface-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-surface-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-surface-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 10. FINAL CTA ═══════════════ */}
      <section className="section bg-gray-900">
        <div className="container-app text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to Stop Managing Five Vendors?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
            One company. One subscription. One bill. Everything handled.
          </p>

          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-green-600/30 w-full sm:w-auto min-h-[56px] mb-6"
          >
            Get My Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400">
            <a href="tel:+18595550123" className="flex items-center gap-2 text-base hover:text-green-400 transition-colors">
              <Phone className="w-5 h-5" />
              (859) 555-0123
            </a>
            <span className="hidden sm:block text-gray-600">·</span>
            <span className="text-sm">Or call us directly — we answer every call.</span>
          </div>
        </div>
      </section>
    </>
  );
}
