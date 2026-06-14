import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Check, ChevronDown, ChevronUp,
  Phone, Leaf, Droplets, Sparkles, Wrench,
  ShieldCheck, Clock, DollarSign, Zap,
} from 'lucide-react';
import { useState } from 'react';

/* ──────────────── DATA ──────────────── */

const windowPricing = [
  { service: 'Standard Window', desc: '1st story, in & out', price: '$8' },
  { service: '2nd Story Window', desc: 'In & out', price: '$10' },
  { service: 'French / Divided-Lite', desc: 'Per window', price: '$12 – $15' },
  { service: 'Storm Windows', desc: 'Per window', price: '$25 – $35' },
  { service: 'Bay / Bow Windows', desc: 'Per window', price: '$20 – $30' },
  { service: 'Screens', desc: 'Each', price: '$3 – $4' },
  { service: 'Tracks & Sills', desc: 'Each', price: '$2 – $3' },
];

const otherServices = [
  {
    icon: Leaf,
    name: 'Lawn Care',
    price: '$45',
    note: '/visit',
    tagline: 'Weekly mowing, edging, trimming, and seasonal maintenance',
    features: [
      'Weekly & bi-weekly mowing',
      'Edging & string trimming',
      'Seasonal cleanup & leaf removal',
      'Fertilization programs',
    ],
    cta: '/services/lawn-care',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Droplets,
    name: 'Power Washing',
    price: '$175',
    note: '+',
    tagline: 'Driveways, siding, decks, and more',
    features: [
      'House siding & trim',
      'Driveways & walkways',
      'Decks & patios',
      'Fences & gutters',
    ],
    cta: '/services/power-washing',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Wrench,
    name: 'Handyman',
    price: '$110',
    note: '/hr',
    tagline: 'Repairs, installs, and general maintenance',
    features: [
      'Drywall & paint touch-ups',
      'Fixture installation',
      'Door & window repairs',
      'General property maintenance',
    ],
    cta: '/services/handyman',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

const guarantees = [
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'What we quote is what you pay. No hidden fees, no surprise charges.',
  },
  {
    icon: Clock,
    title: 'Free Estimates',
    desc: 'Not sure what you need? We\'ll assess your property and give you an exact number — no obligation.',
  },
  {
    icon: Zap,
    title: 'Volume Discounts',
    desc: 'Larger jobs and recurring service get better rates. Ask about our maintenance plans.',
  },
];

const faqs = [
  {
    q: 'Is there a minimum job fee?',
    a: 'Yes. Our minimum job fee is $150 for all services. This covers travel, setup, and the time required to deliver quality results.',
  },
  {
    q: 'How do I get an exact quote?',
    a: 'Click "Get a Free Estimate" and fill out a quick form. We\'ll get back to you within a few hours with an exact price — no surprises.',
  },
  {
    q: 'Do you offer discounts for recurring service?',
    a: 'Absolutely. Weekly lawn care and quarterly window cleaning both come with discounted rates. Ask about our maintenance plans.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. We\'re fully insured and bonded. We also maintain 50+ properties, so we understand property-owner needs.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and the greater Cincinnati metro area.',
  },
];

/* ──────────────── COMPONENT ──────────────── */

export default function PricingGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Pricing Guide — Mursen Maintenance | Lawn, Windows, Power Wash, Handyman';
  const seoDescription = 'Transparent pricing for lawn care, window cleaning, power washing, and handyman services in Covington KY and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="pricing lawn care Covington KY, window cleaning prices Cincinnati, power washing cost Northern KY, handyman rates Covington" />
        <link rel="canonical" href={`${siteUrl}/pricing`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/pricing`} />
      </Helmet>

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-home.jpg"
            alt="Beautiful home with professional maintenance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-700/80" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-wide opacity-0 animate-fade-up">
            <DollarSign className="w-4 h-4" />
            Transparent Pricing
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.05] uppercase opacity-0 animate-fade-up" style={{ animationDelay: '0.08s' }}>
            Simple, Honest<br />
            <span className="text-yellow-300">Pricing</span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '0.16s' }}>
            No hidden fees. No surprises. Know exactly what you'll pay before we start — then book in seconds.
          </p>

          <div className="opacity-0 animate-fade-up flex flex-col sm:flex-row gap-4 items-center justify-center" style={{ animationDelay: '0.24s' }}>
            <Link
              to="/estimate"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-700 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
            >
              Get a Free Estimate
              <ArrowRight className="w-6 h-6" />
            </Link>
            <a href="tel:+18595550123" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
              <Phone className="w-5 h-5" />
              (859) 555-0123
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70 opacity-0 animate-fade-up" style={{ animationDelay: '0.32s' }}>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> No Hidden Fees</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Free Estimates</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Fully Insured</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Bonded</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. WINDOW CLEANING PRICING ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Window Cleaning</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Per-Window Pricing
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Transparent per-window rates. Pay only for what needs cleaning.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 px-8 py-4 bg-gray-50 border-b-2 border-gray-200">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Service</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Details</span>
              <span className="text-sm font-bold text-brand-600 uppercase tracking-wide text-right">Price</span>
            </div>

            {/* Rows */}
            {windowPricing.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 px-8 py-5 hover:bg-brand-50 transition-colors ${
                  i < windowPricing.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-sm text-gray-900 font-bold">{item.service}</span>
                <span className="text-sm text-gray-500">{item.desc}</span>
                <span className="text-sm font-extrabold text-brand-600 text-right">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Minimum fee callout */}
          <div className="mt-8 bg-amber-50 border-2 border-amber-300 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 bg-amber-100 border-2 border-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2 uppercase">Minimum Job Fee: $150</h3>
            <p className="text-gray-600 max-w-lg mx-auto">
              All window cleaning jobs have a $150 minimum. This covers travel, setup, and the time required for quality results.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. OTHER SERVICES ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">More Services</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Full-Service Property Care
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              We handle everything. Get a custom quote based on your property.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {otherServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.cta}
                  to={svc.cta}
                  className="bg-white border-2 border-gray-200 hover:border-brand-400 rounded-2xl p-6 transition-all hover:shadow-lg cursor-pointer flex flex-col"
                >
                  <div className={`w-14 h-14 ${svc.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${svc.color}`} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    {svc.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-2xl font-extrabold text-gray-900">{svc.price}</span>
                    <span className="text-sm text-gray-500 ml-1">{svc.note}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{svc.tagline}</p>
                  <ul className="space-y-2 mb-5 flex-grow">
                    {svc.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 text-brand-600 text-sm font-bold">
                    Contact for Quote
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. WHY OUR PRICING ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">The Difference</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Why Our Pricing Works
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {guarantees.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center px-4">
                  <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. FAQ ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Questions</span>
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

      {/* ═══════════════ 6. FINAL CTA ═══════════════ */}
      <section className="section bg-gray-900">
        <div className="container-app text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
            Tell us about your property and we'll put together a custom quote — fast. <span className="text-white font-semibold">No obligation.</span>
          </p>

          <Link
            to="/estimate"
            className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-lg shadow-brand-600/25 min-h-[56px] mb-6"
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
            <span className="text-sm">Serving Covington, Florence, Fort Mitchell &amp; Cincinnati metro.</span>
          </div>
        </div>
      </section>
    </>
  );
}
