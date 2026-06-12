import { useState } from 'react';
import BeforeAfterSection from '../components/BeforeAfterSection';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Check, Shield, ShieldCheck, ChevronDown, ChevronUp,
  Phone, Clock, Droplets, AlertTriangle, Star, Play, Zap, TrendingUp, DollarSign, X,
  Leaf, Sparkles, Wrench,
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

const services = [
  { name: 'Lawn Care', price: 'From $199/mo', description: 'Weekly mowing, edging, trimming, blow-off. Steep & complex terrain included.', route: '/services/lawn-care' },
  { name: 'Power Washing', price: 'From $175', description: 'Driveways, walkways, siding, roofs. Per visit pricing.', route: '/services/power-washing' },
  { name: 'Window Cleaning', price: 'From $120', description: 'Interior & exterior. Per visit pricing.', route: '/services/window-cleaning' },
  { name: 'Handyman', price: 'From $110/hr', description: 'Repairs, installs, general tasks. 2-hour minimum.', route: '/services/handyman' },
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
    a: 'Easy — we bill additional hours at $75/hr for regular customers (vs. $95/hr one-off). Just let us know and we\'ll schedule the extra time.',
  },
  {
    q: 'Do I need a contract?',
    a: 'No contracts, ever. Pay per service. We earn your business every single visit.'
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
  const seoTitle = 'Professional Home Services | Lawn Care, Windows, Power Washing, Handyman | Covington & Cincinnati';
  const seoDescription = 'Professional lawn care, window cleaning, power washing, and handyman services in Covington KY and Cincinnati metro. Book individual services starting at $45. Fully insured, bonded, owner-operated.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="lawn care Covington KY, window cleaning Cincinnati, power washing Northern Kentucky, handyman Covington, home maintenance Covington, lawn mowing service, professional window cleaning, driveway power washing, home repair services, property maintenance Cincinnati" />
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
            'alternateName': 'Mursen',
            'description': seoDescription,
            'url': siteUrl,
            'telephone': '+18595550123',
            'email': 'hello@mursenmaintenance.com',
            'address': {
              '@type': 'PostalAddress',
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
            'areaServed': [
              'Covington, KY',
              'Newport, KY',
              'Florence, KY',
              'Fort Mitchell, KY',
              'Independence, KY',
              'Erlanger, KY',
              'Cincinnati, OH'
            ],
            'hasOfferCatalog': {
              '@type': 'OfferCatalog',
              'name': 'Home Maintenance Services',
              'itemListElement': [
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Lawn Care',
                    'description': 'Professional lawn mowing, edging, and blowing services'
                  },
                  'price': '45',
                  'priceCurrency': 'USD'
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Power Washing',
                    'description': 'Driveway, walkway, and exterior power washing'
                  },
                  'price': '280',
                  'priceCurrency': 'USD'
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Window Cleaning',
                    'description': 'Professional interior and exterior window cleaning'
                  },
                  'price': '120',
                  'priceCurrency': 'USD'
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Handyman Services',
                    'description': 'Professional handyman and home repair services'
                  },
                  'price': '500',
                  'priceCurrency': 'USD'
                }
              ]
            },
            'image': `${siteUrl}/og-image.jpg`,
            'logo': `${siteUrl}/favicon.svg`,
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '5',
              'reviewCount': '20'
            },
            'sameAs': []
          })}
        </script>
      </Helmet>

      {/* ═══════════════ 1. HERO — BOLD & WELCOMING ═══════════════ */}
      <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background image with green overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-home.jpg"
            alt="Beautiful suburban home with perfectly maintained lawn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-700/80" />
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
            Lawn care, window cleaning, power washing, handyman — one company, one team, book what you need when you need it.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-fade-up flex flex-col sm:flex-row gap-4 items-center" style={{ animationDelay: '0.24s' }}>
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-700 font-bold text-lg md:text-xl px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
            >
              Book A Service
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
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> 50+ Properties in 5 States</span>
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
                We Maintain 50+ Rental Properties in 5 States. We Built This Because We Needed It.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We own and manage 50+ units across 5 states. We know what it's like to chase 5 different contractors, get surprise $800 bills, and deal with emergencies at 2am because nobody caught the small stuff.
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
            {/* Service cards */}
            {services.map((svc, i) => (
              <Link key={i} to={svc.route} className={`grid grid-cols-3 gap-4 px-6 py-5 hover:bg-brand-50 transition-colors cursor-pointer ${i !== services.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="text-sm text-gray-900 font-bold">{svc.name}</span>
                <span className="text-sm text-gray-600 text-right col-span-2">{svc.price}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link to="/estimate" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Get Your Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. SERVICES GRID ═══════════════ */}
      <section className="section bg-white" id="services">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Our Services</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Book Individual Services
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Need one service? Book à la carte. Simple pricing, no commitments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                to: '/services/lawn-care',
                icon: Leaf,
                name: 'Lawn Care',
                price: '$45',
                note: '/visit',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                to: '/services/power-washing',
                icon: Droplets,
                name: 'Power Washing',
                price: '$280',
                note: 'driveway',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                to: '/services/window-cleaning',
                icon: Sparkles,
                name: 'Window Cleaning',
                price: '$120',
                note: 'exterior',
                color: 'text-cyan-600',
                bg: 'bg-cyan-50',
              },
              {
                to: '/services/handyman',
                icon: Wrench,
                name: 'Handyman',
                price: '$500',
                note: '4 hours',
                color: 'text-orange-600',
                bg: 'bg-orange-50',
              },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.to}
                  to={service.to}
                  className="bg-white border-2 border-gray-200 hover:border-brand-400 rounded-2xl p-6 transition-all hover:shadow-lg cursor-pointer"
                >
                  <div className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    {service.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-2xl font-extrabold text-gray-900">{service.price}</span>
                    <span className="text-sm text-gray-500 ml-1">{service.note}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-brand-600 text-sm font-bold">
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
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

          <BeforeAfterSection />
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
            To maintain quality, we cap new weekly lawn care clients at 10 per month. Once they're filled, you're on the waitlist.
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
            One company. Lawn care + power washing + windows + handyman. <span className="text-white font-semibold">Everything handled.</span>
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
