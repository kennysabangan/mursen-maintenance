import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Leaf, Calendar, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    quote: "They show up every week like clockwork. Our yard has never looked this good. Worth every penny.",
    name: 'Michael T.',
    location: 'Covington',
    initials: 'MT',
  },
  {
    quote: "I used to stress about mowing. Now I just come home to a perfect lawn every week. Best decision ever.",
    name: 'Jennifer K.',
    location: 'Fort Mitchell',
    initials: 'JK',
  },
  {
    quote: "They edge, blow, and clean up everything. Not just a quick mow. Real attention to detail.",
    name: 'David R.',
    location: 'Florence',
    initials: 'DR',
  },
];

const faqs = [
  {
    q: 'What does each visit include?',
    a: 'Every visit includes mowing, edging, string trimming, blowing off walkways and driveways, and removing all clippings. We also do a quick gutter check and report any issues.',
  },
  {
    q: 'What happens in winter?',
    a: 'Lawn plans pause automatically Dec–Mar. Your rate adjusts. We swap mowing for seasonal services like leaf cleanup, gutter cleaning, and winter prep.',
  },
  {
    q: 'Do I need to be home?',
    a: 'Nope! We handle everything. You can be at work, on vacation, or just relaxing inside. We text you a photo report after every visit.',
  },
  {
    q: 'What if it rains on my scheduled day?',
    a: 'We reschedule to the next available dry day, usually within 24–48 hours. You\'re never skipped.',
  },
];

export default function ServiceLawnCare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Professional Lawn Care — Covington & Cincinnati Metro | Mursen';
  const seoDescription = 'Weekly lawn mowing, edging, and cleanup. Per-cut, package, or seasonal pricing. Serving Covington KY, Newport, Florence, Fort Mitchell, and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="lawn care Covington KY, lawn mowing Cincinnati, lawn service Northern KY, weekly mowing, lawn maintenance Covington" />
        <link rel="canonical" href={`${siteUrl}/services/lawn-care`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/services/lawn-care`} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/before-after/lawn-after.jpg"
            alt="Perfectly maintained lawn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-700/75" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <Leaf className="w-4 h-4" />
            Lawn Care
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-tight uppercase">
            Professional Lawn Care<br />
            <span className="text-yellow-300">Covington & Cincinnati Metro</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Weekly mowing, edging, blowing, and seasonal cleanup. Show up every week. No ghosting. No surprises.
          </p>

          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-700 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Book Now
            <ArrowRight className="w-6 h-6" />
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> No Contracts</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Same Crew Every Week</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Photo Reports</span>
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="section bg-white">
        <div className="container-app max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Pricing</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Pick Your Plan
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Pay per visit, save with packages, or lock in seasonal pricing. All options include mow, edge, blow, and cleanup.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Per Cut */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 hover:border-brand-300 hover:shadow-lg transition-all">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Per-Cut</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-gray-900">$45</span>
                <span className="text-sm text-gray-500 ml-1">/visit</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Weekly during season (Apr–Oct). Pay as you go. Cancel anytime.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Mow + edge + blow',
                  'Walkway & driveway cleanup',
                  'Photo report after each visit',
                  'Same crew every time',
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
                Book Now
              </Link>
            </div>

            {/* 4-Cut Package */}
            <div className="bg-white border-2 border-brand-500 rounded-2xl p-7 shadow-xl scale-[1.03]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wide">
                Best Value
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">4-Cut Package</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-brand-600">$160</span>
                <span className="text-sm text-brand-600 ml-1">(save $20)</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Four visits. Use anytime during the season. Perfect for month-to-month flexibility.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Mow + edge + blow',
                  'Walkway & driveway cleanup',
                  'Photo report after each visit',
                  'Priority scheduling',
                  'Gutter check included',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className="block text-center bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-brand-200 min-h-[48px]"
              >
                Book Now
              </Link>
            </div>

            {/* Seasonal Pass */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 hover:border-brand-300 hover:shadow-lg transition-all">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Seasonal Pass</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-gray-900">$280</span>
                <span className="text-sm text-gray-500 ml-1">(save $80)</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">8 cuts throughout the season. Lock in your rate. Best per-cut price.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Mow + edge + blow',
                  'Walkway & driveway cleanup',
                  'Photo report after each visit',
                  'Priority scheduling',
                  'Gutter check included',
                  'Seasonal cleanups included',
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
                Book Now
              </Link>
            </div>
          </div>

          {/* Upgrade CTA */}
          <div className="mt-10 bg-brand-50 border-2 border-brand-200 rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 uppercase">
              Save 30% with Home Care Plan
            </h3>
            <p className="text-gray-600 mb-5 max-w-xl mx-auto">
              Get lawn care plus window cleaning, power washing, and handyman visits — all included. One monthly bill, massive savings.
            </p>
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              View Subscription Plans
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
            <p className="text-gray-500">Every visit, every time.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Mow', desc: 'Professional cut at the right height for your grass type' },
              { title: 'Edge', desc: 'Clean lines along walkways, driveways, and borders' },
              { title: 'String Trim', desc: 'Tight spots, fence lines, and around obstacles' },
              { title: 'Blow', desc: 'All clippings removed from walkways and driveways' },
              { title: 'Gutter Check', desc: 'Quick visual inspection — we flag issues early' },
              { title: 'Seasonal Cleanup', desc: 'Leaf removal, spring cleanup, winter prep included' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-brand-600" />
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
              See The Difference
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative">
                <img src="/images/before-after/lawn-before.jpg" alt="Lawn before" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded uppercase">Before</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Overgrown, patchy, no maintenance</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative">
                <img src="/images/before-after/lawn-after.jpg" alt="Lawn after" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded uppercase">After</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Clean lines, healthy grass, consistent care</p>
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
      <section className="section bg-brand-600">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready For A Perfect Lawn Every Week?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            No contracts. No ghosting. Just a great-looking lawn, every single week.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-700 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Book Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
