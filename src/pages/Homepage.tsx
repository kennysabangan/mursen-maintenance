import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Check, ShieldCheck, ChevronDown, ChevronUp,
  Phone, Calendar, Leaf, Droplets, SprayCan, Wrench,
  Star, Clock, Users, Award, MapPin, Search, Hammer,
  ThumbsUp, BadgeCheck, Sparkles,
} from 'lucide-react';

const services = [
  {
    icon: Leaf,
    name: 'Lawn Care',
    tagline: 'Mow, edge, trim, blow.',
    description: 'Weekly maintenance that keeps your curb appeal sharp through every season.',
    image: 'https://images.unsplash.com/photo-1558435186-d31d126391fa?w=800&q=80&auto=format&fit=crop',
    points: ['Weekly or bi-weekly visits', 'Edging & trimming included', 'Seasonal cleanups'],
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: Droplets,
    name: 'Window Cleaning',
    tagline: 'Streak-free, every time.',
    description: 'Spotless windows inside and out. Tracks, sills, and screens included.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80&auto=format&fit=crop',
    points: ['Interior + exterior options', 'Tracks & screens', 'Hard-water removal'],
    color: 'from-sky-500 to-sky-700',
  },
  {
    icon: SprayCan,
    name: 'Power Washing',
    tagline: 'Restore like new.',
    description: 'Driveways, siding, decks, patios. Commercial-grade equipment, eco-safe detergents.',
    image: 'https://images.unsplash.com/photo-1597211833711-1e84c1338107?w=800&q=80&auto=format&fit=crop',
    points: ['Driveways & walkways', 'Siding & fences', 'Soft-wash for roofs'],
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    icon: Wrench,
    name: 'Handyman & Repairs',
    tagline: 'Big list. One visit.',
    description: 'Drywall, fixtures, doors, mounts, paint touch-ups — all the small jobs handled.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop',
    points: ['Same-tech every visit', 'Licensed partner network', '90-day workmanship promise'],
    color: 'from-amber-500 to-amber-700',
  },
];

const trustPillars = [
  {
    icon: ShieldCheck,
    title: 'Fully Insured & Bonded',
    description: 'Commercial GL coverage and a $1M surety bond. Your home and our team are protected.',
  },
  {
    icon: BadgeCheck,
    title: 'One Vendor, One Bill',
    description: 'Stop juggling five contractors. Every service on one subscription, one invoice.',
  },
  {
    icon: Users,
    title: 'Same Tech Every Visit',
    description: 'You\'ll see the same friendly face on your property. They learn your home over time.',
  },
  {
    icon: ThumbsUp,
    title: '100% Satisfaction Promise',
    description: 'If we miss something we fix it free. 30-day money-back on all subscriptions.',
  },
];

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Tell Us About Your Home',
    description: 'Fill out a quick form or call us. We learn your property, your priorities, and your schedule.',
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Get a Custom Plan',
    description: 'A free assessment + flat-rate plan tailored to your home. No surprises, no upsells.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'We Handle the Rest',
    description: 'Recurring visits start within a week. Photo reports after every job. You stay in the loop.',
  },
];

const plans = [
  {
    name: 'Lawn Plus',
    price: '109',
    period: '/mo',
    seasonalNote: 'Apr–Oct · pauses winter',
    description: 'Perfect for hands-off lawn care year-round.',
    features: [
      'Weekly mow + edge + blow',
      'Seasonal cleanups included',
      'Gutter check on every visit',
      'Photo report after each service',
    ],
    cta: 'Get Lawn Plus',
  },
  {
    name: 'Home Care',
    price: '479',
    period: '/mo',
    seasonalNote: 'Most popular for homeowners',
    description: 'The complete bundle — every service, priority scheduling.',
    features: [
      'Weekly lawn mowing & edging',
      'Monthly exterior window cleaning',
      '4 hours of handyman work / mo',
      'Annual driveway power wash',
      'Priority 48-hour scheduling',
      'Photo report after every visit',
    ],
    cta: 'Get Home Care',
    highlight: true,
  },
  {
    name: 'Property Manager',
    price: '279',
    period: '/unit/mo',
    seasonalNote: 'Volume pricing for 3+ units',
    description: 'Built for landlords and rental investors.',
    features: [
      'Optimized for rental units',
      'Tenant turnover support',
      'Priority scheduling',
      '3+ units: $249 · 5+ units: $229',
    ],
    cta: 'Talk to Us',
  },
];

const stats = [
  { number: '20+', label: 'Properties maintained' },
  { number: '500+', label: 'Jobs completed' },
  { number: '4.9★', label: 'Average rating' },
  { number: '< 24h', label: 'Quote turnaround' },
];

const testimonials = [
  {
    quote: "They caught a slow leak under our kitchen sink before it flooded the floor. Saved us thousands. Eight months in and they're worth every penny.",
    name: 'Sarah M.',
    location: 'Homeowner · Covington, KY',
    initials: 'SM',
    rating: 5,
  },
  {
    quote: "I used to call four different people for my rentals. Now I call one. Mursen handles lawn, windows, handyman — they even painted a unit during turnover.",
    name: 'David R.',
    location: 'Property Owner · Florence, KY',
    initials: 'DR',
    rating: 5,
  },
  {
    quote: "Our driveway was disgusting — oil stains, mold, years of grime. After their power wash it looked brand new. Three neighbors asked who did the work.",
    name: 'Jennifer K.',
    location: 'Homeowner · Fort Mitchell, KY',
    initials: 'JK',
    rating: 5,
  },
];

const beforeAfter = [
  {
    label: 'Lawn Care',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1558435186-d31d126391fa?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'Power Washing',
    before: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'Window Cleaning',
    before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'Handyman Repairs',
    before: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',
  },
];

const serviceAreas = [
  'Covington', 'Newport', 'Florence', 'Fort Mitchell',
  'Independence', 'Erlanger', 'Edgewood', 'Crescent Springs',
  'Cincinnati', 'Hyde Park', 'Oakley', 'Mount Lookout',
];

const faqs = [
  {
    q: 'How quickly can you start?',
    a: 'Most new clients have their first visit within 5–7 business days of their free assessment. Urgent jobs can often be scheduled same-week.',
  },
  {
    q: 'Are you insured and bonded?',
    a: 'Yes, 100%. We carry commercial general liability insurance, workers\' comp, and a $1M surety bond. Proof of insurance available on request.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes. All plans are month-to-month with no contracts or cancellation fees. We earn your business every month.',
  },
  {
    q: 'What happens in winter when there\'s no lawn to mow?',
    a: 'Lawn-only plans pause Dec–Mar at a reduced rate. Bundled plans (Home Care) swap mowing for seasonal services like gutter cleaning, leaf removal, and winter prep.',
  },
  {
    q: 'Do you service my area?',
    a: 'We serve Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and the greater Cincinnati metro. Call us to confirm your address.',
  },
  {
    q: 'What if I need more handyman hours than my plan includes?',
    a: 'No problem. Subscribers get a discounted rate ($75/hr vs. $95/hr for non-subscribers). Just let us know and we\'ll schedule the extra time.',
  },
];

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Mursen Maintenance | Lawn, Windows, Power Wash & Handyman | Covington KY';
  const seoDescription = 'One subscription for everything around your house. Lawn care, window cleaning, power washing, and handyman services in Covington KY and Cincinnati metro. Plans from $109/mo.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="home maintenance subscription, lawn care Covington KY, window cleaning Cincinnati, power washing Northern KY, handyman Covington" />
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
            'image': `${siteUrl}/favicon.svg`,
          })}
        </script>
      </Helmet>

      {/* ═════════ HERO ═════════ */}
      <section className="relative overflow-hidden bg-surface-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80&auto=format&fit=crop"
            alt="Bright modern home with manicured lawn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-900/95 via-surface-900/80 to-surface-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 via-transparent to-transparent" />
        </div>

        <div className="relative container-app pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6 animate-fade-up opacity-0">
              <Sparkles className="w-3.5 h-3.5 text-accent-400" />
              Trusted by 100+ homeowners across Northern KY
            </div>

            <h1 className="font-display text-white font-extrabold tracking-tight leading-[1.05] text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-up opacity-0 animate-delay-100">
              Your Home,<br />
              <span className="text-primary-400">Beautifully Maintained.</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-8 max-w-xl animate-fade-up opacity-0 animate-delay-200">
              Lawn care, window cleaning, power washing, and handyman service — bundled into one simple subscription. No more juggling vendors.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up opacity-0 animate-delay-300">
              <Link
                to="/assessment"
                className="inline-flex items-center justify-center gap-2.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 shadow-glow-brand hover:-translate-y-0.5 min-h-[56px]"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+18595550123"
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 min-h-[56px]"
              >
                <Phone className="w-5 h-5" />
                (859) 555-0123
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-300 animate-fade-up opacity-0 animate-delay-400">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-400" /> Fully Insured & Bonded</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-400" /> Free Estimates</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-400" /> Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="relative bg-white/5 backdrop-blur border-t border-white/10">
          <div className="container-app grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="py-6 px-4 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white font-display">{s.number}</div>
                <div className="text-xs md:text-sm text-stone-300 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ SERVICES — THE CENTERPIECE ═════════ */}
      <section className="section bg-white relative">
        <div className="container-app">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="eyebrow mb-4">Our Services</p>
            <h2 className="heading-2 text-surface-900 mb-5 text-balance">
              Everything your home needs, under one roof.
            </h2>
            <p className="lead">
              Pick a single service or bundle them all. Either way, you get the same crew who learns your property — and a flat-rate price you can count on.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.name}
                  to="/portfolio"
                  className="service-card group flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/70 via-surface-900/0 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className={`w-11 h-11 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center shadow-soft`}>
                        <Icon className="w-5 h-5 text-primary-700" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="font-display text-xl font-bold text-surface-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-primary-700 font-semibold mb-3">{service.tagline}</p>
                    <p className="text-sm text-surface-600 leading-relaxed mb-5 flex-1">{service.description}</p>
                    <ul className="space-y-2 mb-5">
                      {service.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-surface-700">
                          <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-600">Learn more</span>
                      <ArrowRight className="w-4 h-4 text-primary-700 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════ TRUST PILLARS ═════════ */}
      <section className="section-alt">
        <div className="container-app">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="eyebrow mb-4">Why Mursen</p>
              <h2 className="heading-2 text-surface-900 mb-5 text-balance">
                Reliable like it's our own home.
              </h2>
              <p className="lead mb-6">
                We started Mursen because we maintain 20+ rental units ourselves and we were tired of the same headaches you're tired of.
              </p>
              <Link to="/contact" className="btn-ghost">
                Read our story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {trustPillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="feature-card">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary-700" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-surface-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-surface-600 leading-relaxed">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ HOW IT WORKS ═════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-4 justify-center">Simple Process</p>
            <h2 className="heading-2 text-surface-900 mb-5 text-balance">
              From quote to clean in three steps.
            </h2>
            <p className="lead mx-auto">
              No high-pressure sales calls. No mystery pricing. Just a clear path from "I need help" to "everything is handled."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative bg-white rounded-3xl p-8 border border-stone-200/70 shadow-soft hover:shadow-card-hover transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="step-number">{step.number}</div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-700" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-surface-900 mb-3">{step.title}</h3>
                  <p className="text-surface-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link to="/assessment" className="btn-primary-lg">
              Start Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════ MEMBERSHIP PLANS ═════════ */}
      <section className="section-alt" id="plans">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-4 justify-center">Membership Plans</p>
            <h2 className="heading-2 text-surface-900 mb-5 text-balance">
              Pick the plan that fits your home.
            </h2>
            <p className="lead mx-auto">
              All plans are month-to-month. No contracts. Cancel anytime. Looking for something custom? <Link to="/assessment" className="text-primary-700 font-semibold underline decoration-primary-300 hover:decoration-primary-600">Tell us about your home</Link>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={plan.highlight ? 'pricing-card-highlighted' : 'pricing-card-default'}
              >
                {plan.highlight && (
                  <div className="pricing-popular-badge">Most Popular</div>
                )}

                <div className="mb-6">
                  <h3 className={`font-display text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-surface-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? 'text-primary-200' : 'text-surface-500'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-dashed">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-display text-5xl font-extrabold tracking-tight ${plan.highlight ? 'text-white' : 'text-surface-900'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-base font-medium ${plan.highlight ? 'text-primary-200' : 'text-surface-500'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-xs mt-2 ${plan.highlight ? 'text-primary-300' : 'text-surface-400'}`}>
                    {plan.seasonalNote}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-primary-500/30' : 'bg-primary-100'}`}>
                        <Check className={`w-3 h-3 ${plan.highlight ? 'text-primary-200' : 'text-primary-700'}`} strokeWidth={3} />
                      </div>
                      <span className={`text-sm ${plan.highlight ? 'text-stone-200' : 'text-surface-700'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/assessment"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full font-semibold text-sm transition-all duration-200 min-h-[48px] ${
                    plan.highlight
                      ? 'bg-accent-500 hover:bg-accent-400 text-surface-900'
                      : 'bg-surface-900 hover:bg-primary-700 text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-surface-500 mt-8">
            Need à la carte pricing? <Link to="/portfolio" className="text-primary-700 font-semibold underline decoration-primary-300 hover:decoration-primary-600">View all services & rates →</Link>
          </p>
        </div>
      </section>

      {/* ═════════ BEFORE / AFTER ═════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow mb-4 justify-center">Real Work, Real Results</p>
            <h2 className="heading-2 text-surface-900 mb-5 text-balance">
              See the difference.
            </h2>
            <p className="lead mx-auto">Real properties from real customers across Cincinnati metro.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {beforeAfter.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-soft hover:shadow-card-hover transition-all duration-300">
                <div className="grid grid-cols-2 gap-px bg-stone-200">
                  <div className="relative">
                    <img src={item.before} alt={`${item.label} before`} className="w-full h-40 object-cover" />
                    <span className="absolute top-2 left-2 bg-surface-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Before</span>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt={`${item.label} after`} className="w-full h-40 object-cover" />
                    <span className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">After</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-surface-900">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ TESTIMONIALS ═════════ */}
      <section className="section-alt">
        <div className="container-app">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Customer Stories</p>
              <h2 className="heading-2 text-surface-900 mb-5 text-balance">
                Loved by homeowners and landlords alike.
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <span className="font-bold text-surface-900">4.9 / 5</span>
                <span className="text-sm text-surface-500">based on 80+ reviews</span>
              </div>
              <p className="text-surface-600 leading-relaxed mb-6">
                Every visit ends with a photo report and a thumbs-up survey. We're proud of our average rating — and we work hard for every star.
              </p>
              <Link to="/contact" className="btn-ghost">
                Read more reviews <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className={`feature-card flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-accent-500 fill-accent-500" />
                    ))}
                  </div>
                  <p className="text-base text-surface-800 leading-relaxed mb-5 flex-grow">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow-brand">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-surface-900">{t.name}</p>
                      <p className="text-xs text-surface-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ SERVICE AREA ═════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="rounded-3xl bg-surface-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-500 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-accent-500 blur-3xl opacity-60" />
            </div>
            <div className="relative p-8 md:p-14 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
                  <MapPin className="w-3.5 h-3.5 text-primary-300" />
                  Service Areas
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                  Proudly serving Northern Kentucky and Cincinnati Metro.
                </h2>
                <p className="text-stone-300 mb-6 leading-relaxed">
                  Local crews, local owners. We live where we work — and we treat every property like it's our own.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-surface-900 hover:bg-stone-100 font-semibold text-sm px-5 py-3 rounded-full transition-colors min-h-[44px]">
                  Check My Address
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {serviceAreas.map((area) => (
                  <div key={area} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white flex items-center gap-2 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ GUARANTEE ═════════ */}
      <section className="section-alt">
        <div className="container-app">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 border border-stone-200/70 shadow-card relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-100/60 blur-3xl pointer-events-none" />
            <div className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow-brand">
                <Award className="w-12 h-12 text-white" />
              </div>
              <div>
                <p className="eyebrow mb-3">Our Guarantee</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 tracking-tight mb-4 text-balance">
                  100% satisfaction or your money back.
                </h2>
                <p className="text-lg text-surface-600 leading-relaxed">
                  If we miss something, we come back and fix it — free. If you're not happy in your first 30 days, we refund every penny. No questions, no hassle, no risk to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ FAQ ═════════ */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4 justify-center">Frequently Asked</p>
            <h2 className="heading-2 text-surface-900 mb-5 text-balance">
              Got questions? We've got answers.
            </h2>
            <p className="lead mx-auto">
              Don't see what you're looking for? <a href="tel:+18595550123" className="text-primary-700 font-semibold underline decoration-primary-300 hover:decoration-primary-600">Call us at (859) 555-0123</a>.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${openFaq === i ? 'border-primary-200 shadow-card' : 'border-stone-200 shadow-soft'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer hover:bg-stone-50 transition-colors"
                >
                  <span className="text-base md:text-lg font-semibold text-surface-900 pr-4">{faq.q}</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? 'bg-primary-600 text-white' : 'bg-stone-100 text-surface-700'}`}>
                    {openFaq === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-6 -mt-1">
                    <p className="text-surface-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ FINAL CTA ═════════ */}
      <section className="bg-surface-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-600 blur-3xl" />
        </div>
        <div className="relative container-app py-20 md:py-28 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Clock className="w-3.5 h-3.5 text-accent-400" />
            Quotes returned within 24 hours
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-5 text-balance">
            Stop juggling vendors. <br className="hidden md:block" />
            <span className="text-primary-400">Start enjoying your home.</span>
          </h2>
          <p className="text-lg text-stone-300 mb-10 max-w-xl mx-auto">
            One subscription. One team. One bill. Get your free quote and we'll have a custom plan back to you in 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link to="/assessment" className="btn-primary-lg">
              Get My Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+18595550123" className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/20 text-white font-semibold text-lg px-9 py-4 rounded-full transition-all duration-200 min-h-[56px]">
              <Phone className="w-5 h-5" />
              (859) 555-0123
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-400">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-400" /> No contracts</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-400" /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary-400" /> Money-back guarantee</span>
          </div>
        </div>
      </section>
    </>
  );
}
