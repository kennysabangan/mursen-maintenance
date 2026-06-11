import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Droplets, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    quote: "Our driveway was disgusting. Oil stains, mold, years of grime. After their power wash it looked brand new. Neighbors asked who did it.",
    name: 'Jennifer K.',
    location: 'Fort Mitchell',
    initials: 'JK',
  },
  {
    quote: "The walkway and patio transformation was incredible. They even got the moss out of the cracks. Looks like it did 10 years ago.",
    name: 'David R.',
    location: 'Florence',
    initials: 'DR',
  },
  {
    quote: "My siding was covered in green algae. They pre-treated, washed, and rinsed. Looks like a brand new house. Worth every dollar.",
    name: 'Sarah M.',
    location: 'Covington',
    initials: 'SM',
  },
];

const faqs = [
  {
    q: 'What surfaces can you power wash?',
    a: 'Driveways, walkways, patios, decks, siding, fences, garage floors, and more. We adjust pressure and temperature based on the surface to avoid damage.',
  },
  {
    q: 'How long does it take?',
    a: 'Typical driveway and walkway takes 2–3 hours. Full home exterior can take 4–6 hours depending on size and condition.',
  },
  {
    q: 'Do I need to be home?',
    a: 'Nope! As long as we have access to water and the areas to be cleaned. We text you before/after photos when we\'re done.',
  },
  {
    q: 'Is it safe for my plants and grass?',
    a: 'Yes. We use eco-friendly detergents and rinse thoroughly. We also pre-wet plants and cover sensitive areas when needed.',
  },
  {
    q: 'How often should I power wash?',
    a: 'We recommend once per year for driveways and walkways. Siding every 2–3 years. We\'ll let you know what makes sense for your property.',
  },
];

export default function ServicePowerWashing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Power Washing Services — Driveways, Walkways, Patios | Mursen';
  const seoDescription = 'Professional power washing for driveways, walkways, patios, and home exteriors. Serving Covington KY, Newport, Florence, and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="power washing Covington KY, pressure washing Cincinnati, driveway cleaning Northern KY, house washing, patio cleaning" />
        <link rel="canonical" href={`${siteUrl}/services/power-washing`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/services/power-washing`} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/before-after/powerwash-after.jpg"
            alt="Clean driveway after power washing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/75" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <Droplets className="w-4 h-4" />
            Power Washing
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-tight uppercase">
            Power Washing Services<br />
            <span className="text-cyan-300">Driveways, Walkways, Patios</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Years of grime, mold, and stains gone. Hot water + commercial equipment + eco-friendly detergents = surfaces that look brand new.
          </p>

          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-blue-900 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Get Quote
            <ArrowRight className="w-6 h-6" />
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> Hot Water Equipment</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> Eco-Friendly Detergents</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> Before/After Photos</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-white">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Pricing</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              No hidden fees. No surprises. Just clean surfaces at a fair price.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Driveway (2-car)', price: '$280', note: 'Standard residential' },
              { label: 'Walkway', price: '$120', note: 'Front + side walkways' },
              { label: 'Patio/Deck', price: '$150', note: 'Up to 300 sq ft' },
              { label: 'Home Exterior', price: '+$300', note: 'Siding + trim' },
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="font-display text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">{item.label}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-gray-900">{item.price}</span>
                </div>
                <p className="text-xs text-gray-500">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Package Deals */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg transition-all">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Full Package</h3>
              <div className="mb-4">
                <span className="text-4xl font-extrabold text-gray-900">$450</span>
                <span className="text-sm text-gray-500 ml-2 line-through">$550</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Driveway + walkway + patio. Save $100.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Driveway (standard 2-car)',
                  'Front & side walkways',
                  'Patio or deck (up to 300 sq ft)',
                  'Pre-treatment + hot water wash + rinse',
                  'Before/after photos',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className="block text-center bg-gray-900 hover:bg-brand-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all min-h-[48px]"
              >
                Get Quote
              </Link>
            </div>

            <div className="bg-white border-2 border-blue-500 rounded-2xl p-7 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wide">
                Best Value
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Full Property</h3>
              <div className="mb-4">
                <span className="text-4xl font-extrabold text-blue-600">$750</span>
                <span className="text-sm text-blue-600 ml-2">(save $200!)</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Everything washed. Driveway, walkway, patio, and full home exterior.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Driveway + walkway + patio',
                  'Full home exterior (siding + trim)',
                  'Garage door',
                  'Front porch + steps',
                  'Pre-treatment + hot water + rinse',
                  'Before/after photos',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 min-h-[48px]"
              >
                Get Quote
              </Link>
            </div>
          </div>

          {/* Add-Ons */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-gray-900 mb-4 uppercase">Add-Ons</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Fence washing (per section)</span>
                <span className="font-bold text-gray-900">+$80</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Garage floor</span>
                <span className="font-bold text-gray-900">+$100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Window cleaning bundle (save $40)</span>
                <span className="font-bold text-brand-600">+$100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Additional sq ft (patio/deck)</span>
                <span className="font-bold text-gray-900">$0.50/sq ft</span>
              </div>
            </div>
          </div>

          {/* Upgrade CTA */}
          <div className="mt-10 bg-brand-50 border-2 border-brand-200 rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 uppercase">
              Add Window Cleaning & Save
            </h3>
            <p className="text-gray-600 mb-5 max-w-xl mx-auto">
              Bundle power washing with exterior window cleaning for just $100 more (normally $140). Get the full exterior refresh.
            </p>
            <Link
              to="/services/window-cleaning"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              View Window Cleaning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              What's Included
            </h2>
            <p className="text-gray-500">Every wash, every time.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Pre-Treatment', desc: 'Eco-friendly detergent applied to break down grime, mold, and stains' },
              { title: 'Hot Water Wash', desc: 'Commercial-grade hot water pressure washing (not just cold rinse)' },
              { title: 'Post-Rinse', desc: 'Thorough rinse to remove all detergent and loosened grime' },
              { title: 'Before/After Photos', desc: 'Texted to you so you can see the transformation' },
              { title: 'Plant & Grass Protection', desc: 'Pre-wet and cover sensitive areas when needed' },
              { title: 'Surface-Specific Pressure', desc: 'Adjusted PSI to avoid damage (wood, concrete, vinyl, etc.)' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight uppercase">
              See The Transformation
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative">
                <img src="/images/before-after/powerwash-before.jpg" alt="Driveway before power washing" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded uppercase">Before</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Oil stains, mold, years of grime</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative">
                <img src="/images/before-after/powerwash-after.jpg" alt="Driveway after power washing" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded uppercase">After</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Looks brand new — neighbors will notice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight uppercase">
              What Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 flex-grow">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{t.initials}</span>
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

      {/* FAQ */}
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

      {/* Final CTA */}
      <section className="section bg-blue-600">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready To Make It Look Brand New?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Before/after photos guaranteed. You\'ll wonder why you waited this long.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-blue-600 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Get Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
