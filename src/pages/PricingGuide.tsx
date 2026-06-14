import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, HelpCircle, Phone } from 'lucide-react';
import { useState } from 'react';

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
    name: 'Lawn Care',
    tagline: 'Mowing, edging, trimming, and seasonal maintenance',
    features: [
      'Weekly & bi-weekly mowing',
      'Edging & trimming',
      'Seasonal cleanup',
      'Fertilization programs',
    ],
    cta: '/services/lawn-care',
  },
  {
    name: 'Power Washing',
    tagline: 'Driveways, siding, decks, and more',
    features: [
      'House siding & trim',
      'Driveways & walkways',
      'Decks & patios',
      'Fences & gutters',
    ],
    cta: '/services/power-washing',
  },
  {
    name: 'Handyman',
    tagline: 'Repairs, installs, and general maintenance',
    features: [
      'Drywall & paint touch-ups',
      'Fixture installation',
      'Door & window repairs',
      'General property maintenance',
    ],
    cta: '/services/handyman',
  },
];

const faqs = [
  {
    q: 'Is there a minimum job fee?',
    a: 'Yes. Our minimum job fee is $150 for all services. This covers travel, setup, and the time it takes to deliver quality work.',
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
    a: 'Yes. We\'re fully insured and bonded. We also maintain 20+ rental units, so we understand property-owner needs.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and the greater Cincinnati metro area.',
  },
];

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
        <meta name="keywords" content="pricing lawn care Covington KY, window cleaning prices Cincinnati, power washing cost Northern KY" />
        <link rel="canonical" href={`${siteUrl}/pricing`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/pricing`} />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-600 py-16 md:py-20">
        <div className="container-app text-center max-w-3xl mx-auto px-6">
          <span className="inline-block text-brand-200 text-xs font-bold uppercase tracking-widest mb-4">
            Transparent Pricing
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight uppercase">
            Simple, Honest Pricing
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto mb-8">
            No hidden fees. No surprises. Know exactly what you'll pay before we start.
          </p>
          <Link
            to="/estimate"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-600 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Get a Free Estimate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Window Cleaning Pricing */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
              Window Cleaning
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Per-Window Pricing
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Transparent per-window rates. Pay only for what needs cleaning.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_120px] bg-gray-50 border-b border-gray-200 px-8 py-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Service</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Details</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Price</span>
            </div>

            {windowPricing.map((item, i) => (
              <div
                key={i}
                className={`grid md:grid-cols-[1fr_1fr_120px] px-8 py-4 items-center transition-colors hover:bg-gray-50 ${
                  i < windowPricing.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div>
                  <span className="text-base font-bold text-gray-900">{item.service}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">{item.desc}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-brand-600">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-5 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-orange-900 mb-1">Minimum Job Fee: $150</p>
              <p className="text-sm text-orange-700">
                All window cleaning jobs have a $150 minimum. This covers travel, setup, and the time required for quality results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">
              More Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Full-Service Property Care
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              We handle everything. Get a custom quote based on your property.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {otherServices.map((svc, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-brand-300 hover:shadow-lg transition-all flex flex-col"
              >
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  {svc.name}
                </h3>
                <p className="text-sm text-gray-500 mb-5">{svc.tagline}</p>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {svc.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">Contact for quote</span>
                  <Link
                    to={svc.cta}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Pricing */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Why Our Pricing Works
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'No Hidden Fees',
                desc: 'What we quote is what you pay. The price on this page is the price you get.',
              },
              {
                title: 'Free Estimates',
                desc: 'Not sure what you need? We\'ll assess your property and give you an exact number — no obligation.',
              },
              {
                title: 'Volume Discounts',
                desc: 'Larger jobs and recurring service get better rates. Ask about our maintenance plans.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center px-4">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight uppercase">
              Frequently Asked Questions
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
                  <span className="text-gray-400 text-xl flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
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

      {/* Final CTA */}
      <section className="section bg-brand-600">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-4">
            Tell us about your property and we'll put together a custom quote — fast.
          </p>
          <p className="text-sm text-white/70 mb-8">
            Serving Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger &amp; Cincinnati metro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/estimate"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-600 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
            >
              Get a Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+18595550123"
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-5 rounded-xl transition-all text-lg min-h-[56px]"
            >
              <Phone className="w-5 h-5" />
              (859) 555-0123
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
