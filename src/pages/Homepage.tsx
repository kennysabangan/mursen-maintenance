import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Check, Shield, ShieldCheck, ChevronDown, ChevronUp,
  Phone, Clock, Droplets, AlertTriangle, Star, Play, Zap, TrendingUp, DollarSign, X,
} from 'lucide-react';

/* ──────────────── DATA ──────────────── */

const painPoints = [
  {
    icon: Clock,
    title: 'You call a lawn guy. He shows up twice then ghosts.',
    sub: 'Now your yard looks abandoned and your HOA is sending letters.',
  },
  {
    icon: AlertTriangle,
    title: 'Your window cleaner is "booked out 6 weeks."',
    sub: 'Your curb appeal is shot and you can\'t even see outside.',
  },
  {
    icon: Droplets,
    title: 'A $12 fix becomes a $2,400 emergency because nobody checked.',
    sub: 'Deferred maintenance doesn\'t wait. Neither do repair bills.',
  },
  {
    icon: Zap,
    title: "You're coordinating 5 contractors who don't talk to each other.",
    sub: 'You became a project manager for the thing you bought to enjoy.',
  },
];

const valueComparison = [
  { service: 'Lawn care (biweekly)', standalone: '$180/mo', withMursen: 'Included' },
  { service: 'Window cleaning (monthly)', standalone: '$120/mo', withMursen: 'Included' },
  { service: 'Handyman visit (4 hrs)', standalone: '$300/mo', withMursen: 'Included' },
  { service: 'Power wash (annual ÷ 12)', standalone: '$20/mo', withMursen: 'Included' },
  { service: 'Priority scheduling', standalone: '$50/mo', withMursen: 'Included' },
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
    quote: "Our driveway was disgusting. Oil stains, mold, years of grime. After their power wash it looked brand new. Neighbors asked who did it.",
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

      {/* ═══════════════ 1. HERO — BOLD & WELCOMING ═══════════════ */}
      <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-brand-600">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-6 py-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-8 tracking-wide uppercase opacity-0 animate-fade-up">
            <Zap className="w-4 h-4" />
            Serving Covington & Cincinnati Metro
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05] opacity-0 animate-fade-up uppercase" style={{ animationDelay: '0.08s' }}>
            Your House.<br />
            <span className="text-yellow-300">Handled.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl opacity-0 animate-fade-up" style={{ animationDelay: '0.16s' }}>
            Lawn care, window cleaning, power washing, handyman — one monthly fee, one team, zero chasing contractors.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-fade-up flex flex-col sm:flex-row gap-4 items-center" style={{ animationDelay: '0.24s' }}>
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-700 font-bold text-lg md:text-xl px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
            >
              Get My Free Quote
              <ArrowRight className="w-6 h-6" />
            </Link>
            <a href="tel:+18595550123" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
              <Phone className="w-5 h-5" />
              (859) 555-0123
            </a>
          </div>

          {/* Trust bar */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70 opacity-0 animate-fade-up" style={{ animationDelay: '0.32s' }}>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Fully Insured</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Bonded</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> No Contracts</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> 20+ Properties Maintained</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. FOUNDER STORY ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Why We Exist</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight uppercase">
                We Maintain 20+ Rental Properties. We Built This Because We Needed It.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We own and manage 20+ units in Covington and NKY. We know what it's like to chase 5 different contractors, get surprise $800 bills, and deal with emergencies at 2am because nobody caught the small stuff.
              </p>
              <p className="text-gray-900 leading-relaxed font-semibold">
                So we built the maintenance company we wished existed. One team. One bill. Everything handled — inside and out.
              </p>
            </div>
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Home maintenance team at work"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center shadow-lg shadow-brand-600/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. PROBLEM AGITATION ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="inline-block text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">Sound Familiar?</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              You've Been Burned Before.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              The contractors who ghost. The surprise bills. The weekends lost to projects you shouldn't be doing yourself.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
            {painPoints.map((p, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-300 hover:shadow-md transition-all">
                <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900 leading-snug mb-1">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-2xl md:text-4xl font-bold text-gray-900 uppercase">
              What if <span className="text-brand-600">ONE company</span> handled <span className="text-brand-600">ALL of it?</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. VALUE COMPARISON ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">The Math</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              What You'd Pay vs. What You Actually Pay
            </h2>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b-2 border-gray-200">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Service</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide text-right">Separately</span>
              <span className="text-sm font-bold text-brand-600 uppercase tracking-wide text-right">With Mursen</span>
            </div>
            {/* Rows */}
            {valueComparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 gap-4 px-6 py-4 ${i !== valueComparison.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="text-sm text-gray-700 font-medium">{row.service}</span>
                <span className="text-sm text-gray-400 text-right line-through">{row.standalone}</span>
                <span className="text-sm text-brand-600 text-right font-bold">{row.withMursen}</span>
              </div>
            ))}
            {/* Totals */}
            <div className="grid grid-cols-3 gap-4 px-6 py-5 bg-brand-50 border-t-2 border-brand-200">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-base text-red-500 text-right font-bold line-through">$670/mo</span>
              <span className="text-base text-brand-700 text-right font-extrabold">$479/mo</span>
            </div>
          </div>

          <div className="text-center mt-6 bg-orange-50 border border-orange-200 rounded-xl p-5">
            <p className="text-orange-800 font-bold">
              That's <span className="text-orange-900">$191/mo saved</span> — or <span className="text-orange-900">$2,292/year</span> back in your pocket. And you get one team, one bill, and zero headaches.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. THE OFFER — VALUE STACK ═══════════════ */}
      <section className="section bg-gray-50" id="plans">
        <div className="container-app">
          <div className="text-center mb-6">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Our Plans</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Pick Your Level of "Done For You"
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              All plans month-to-month. Cancel anytime. Stack so much value, you'd feel stupid saying no.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {valueStacks.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-7 border-2 transition-all duration-200 bg-white ${
                  tier.highlight
                    ? 'border-brand-500 shadow-xl shadow-brand-100 scale-[1.03]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <h3 className="font-display text-lg font-bold text-gray-900 mb-1 uppercase tracking-wide">{tier.name}</h3>

                {/* Price */}
                <div className="mb-5">
                  <span className={`text-4xl font-extrabold tracking-tight ${tier.highlight ? 'text-brand-600' : 'text-gray-900'}`}>
                    ${tier.price}
                  </span>
                  <span className={`text-sm ml-1 ${tier.highlight ? 'text-brand-600' : 'text-gray-500'}`}>
                    {tier.note}
                  </span>
                </div>

                {/* Value stack */}
                <div className="space-y-3 mb-5">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-brand-500' : 'text-gray-400'}`} />
                        <span className="text-sm text-gray-700">{f.item}</span>
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${tier.highlight ? 'text-brand-600' : 'text-gray-400'}`}>
                        {f.worth}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total value line */}
                <div className={`border-t pt-4 mb-5 ${tier.highlight ? 'border-brand-100' : 'border-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">Total value:</span>
                    <span className="text-lg font-bold text-gray-400 line-through">{tier.totalValue}/mo</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-gray-500">Your price:</span>
                    <span className={`text-xl font-extrabold ${tier.highlight ? 'text-brand-600' : 'text-brand-600'}`}>
                      ${tier.price}{tier.note}
                    </span>
                  </div>
                </div>

                <Link
                  to="/assessment"
                  className={`block text-center py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer min-h-[48px] ${
                    tier.highlight
                      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200'
                      : 'bg-gray-900 hover:bg-brand-600 text-white'
                  }`}
                >
                  Get My Free Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. BEFORE & AFTER ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Results</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              See The Difference
            </h2>
            <p className="text-lg text-gray-500 max-w-md mx-auto">
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
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-2 gap-px bg-gray-100">
                  <div className="relative">
                    <img src={item.before} alt={`${item.label} before`} className="w-full h-36 object-cover" />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Before</span>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt={`${item.label} after`} className="w-full h-36 object-cover" />
                    <span className="absolute top-2 left-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">After</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wide font-display">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. SOCIAL PROOF ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Proof</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Don't Take Our Word For It
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-grow">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-brand-600">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. GUARANTEE — GOLD BOX ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-3xl mx-auto">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-amber-100 border-2 border-amber-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-amber-600" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight uppercase">
              Our Iron-Clad Guarantee
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              If we miss something, we come back and fix it — free. Not happy in the first 30 days? We refund every penny. No questions. No hassle. <span className="font-bold text-gray-900">The entire risk is on us.</span>
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-amber-700 font-bold"><Check className="w-4 h-4" /> 30-Day Money Back</span>
              <span className="flex items-center gap-2 text-amber-700 font-bold"><Check className="w-4 h-4" /> Free Re-Service</span>
              <span className="flex items-center gap-2 text-amber-700 font-bold"><Check className="w-4 h-4" /> No Contracts</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. SCARCITY / URGENCY ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-5 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-wide">
            <TrendingUp className="w-4 h-4" />
            Limited Availability
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
            We Only Take 10 New Clients Per Month
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
            To maintain quality, we cap new Home Care subscriptions at 10 per month. Once they're filled, you're on the waitlist.
          </p>

          {/* Spots counter */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-sm mx-auto mb-8 shadow-sm">
            <p className="text-sm text-gray-500 mb-3 uppercase tracking-wide font-semibold">Spots remaining this month:</p>
            <div className="font-display text-6xl font-bold text-brand-600 mb-4">3</div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
              <div className="bg-brand-600 h-3 rounded-full" style={{ width: '70%' }} />
            </div>
            <p className="text-xs text-gray-400">7 of 10 spots taken</p>
          </div>

          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-lg shadow-brand-200 hover:shadow-brand-300 min-h-[56px]"
          >
            Claim My Spot — Get My Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ═══════════════ 10. FAQ ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight uppercase">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <span className="text-base font-bold text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 11. FINAL CTA ═══════════════ */}
      <section className="section bg-gray-900">
        <div className="container-app text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready to Stop Managing Five Vendors?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
            One company. One subscription. One bill. <span className="text-white font-semibold">Everything handled.</span>
          </p>

          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-lg shadow-brand-600/25 w-full sm:w-auto min-h-[56px] mb-6"
          >
            Get My Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400">
            <a href="tel:+18595550123" className="flex items-center gap-2 text-base hover:text-brand-400 transition-colors">
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
