import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Sparkles, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    quote: "I didn\'t realize how dirty my windows were until they cleaned them. It\'s like getting new windows for a fraction of the cost. Incredible.",
    name: 'Sarah M.',
    location: 'Covington',
    initials: 'SM',
  },
  {
    quote: "They did interior and exterior. No streaks, no water spots. My house feels brighter. I\'m scheduling quarterly now.",
    name: 'David R.',
    location: 'Florence',
    initials: 'DR',
  },
  {
    quote: "Fast, professional, and the windows look crystal clear. They even cleaned the screens. Worth every dollar.",
    name: 'Jennifer K.',
    location: 'Fort Mitchell',
    initials: 'JK',
  },
];

const faqs = [
  {
    q: 'Do you do interior and exterior?',
    a: 'Yes! Exterior-only is $120 (up to 20 windows). Interior + exterior is $200. You choose what you need.',
  },
  {
    q: 'How long does it take?',
    a: 'Typical home with 15–20 windows takes 1.5–2 hours for exterior only, 3–4 hours for interior + exterior.',
  },
  {
    q: 'Do I need to be home?',
    a: 'For exterior only, no. For interior, yes — we need access inside. We work efficiently and clean up after ourselves.',
  },
  {
    q: 'What about screens?',
    a: 'Screen cleaning is +$40. We remove, wash, dry, and reinstall them. Totally optional but highly recommended.',
  },
  {
    q: 'How often should I clean my windows?',
    a: 'We recommend exterior cleaning every 3–6 months, interior once or twice a year. Quarterly service gets you a 20% discount.',
  },
];

export default function ServiceWindowCleaning() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Crystal Clear Windows — Interior & Exterior | Mursen';
  const seoDescription = 'Professional window cleaning services. Interior, exterior, screens. Serving Covington KY, Newport, Florence, Fort Mitchell, and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="window cleaning Covington KY, window washing Cincinnati, residential window cleaning Northern KY, screen cleaning" />
        <link rel="canonical" href={`${siteUrl}/services/window-cleaning`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/services/window-cleaning`} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/before-after/windows-after.jpg"
            alt="Crystal clear windows after cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-cyan-900/70" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            Window Cleaning
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-tight uppercase">
            Crystal Clear Windows<br />
            <span className="text-cyan-300">Interior & Exterior</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Streak-free, spotless windows. More light. Better curb appeal. Like getting new windows for a fraction of the cost.
          </p>

          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-cyan-900 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Book Now
            <ArrowRight className="w-6 h-6" />
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> No Streaks</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> No Water Spots</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-300" /> Screen Cleaning Available</span>
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
              No surprises. Just clean, clear windows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Exterior Only */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 hover:border-cyan-300 hover:shadow-lg transition-all">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Exterior Only</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-gray-900">$120</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Up to 20 windows. Outside glass only. Perfect for curb appeal.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Exterior glass cleaned',
                  'Frames & sills wiped',
                  'Streak-free finish',
                  'Up to 20 windows',
                  'Additional windows: $5 each',
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

            {/* Interior + Exterior */}
            <div className="bg-white border-2 border-cyan-500 rounded-2xl p-7 shadow-xl scale-[1.03]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Interior + Exterior</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-cyan-600">$200</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Up to 20 windows. Both sides cleaned. Maximum clarity and light.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Interior & exterior glass',
                  'Frames & sills wiped (both sides)',
                  'Streak-free finish',
                  'Up to 20 windows',
                  'Additional windows: $5 each',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className="block text-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-cyan-200 min-h-[48px]"
              >
                Book Now
              </Link>
            </div>

            {/* Add-Ons */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 hover:border-cyan-300 hover:shadow-lg transition-all">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Add-Ons</h3>
              <div className="mb-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Screen cleaning</span>
                  <span className="text-lg font-bold text-gray-900">+$40</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Track cleaning</span>
                  <span className="text-lg font-bold text-gray-900">+$30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Hard water stain removal</span>
                  <span className="text-lg font-bold text-gray-900">+$80</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-5">Mix and match to get exactly what you need.</p>
              <ul className="space-y-2.5 mb-6 text-xs text-gray-600">
                <li>• Screens: Remove, wash, dry, reinstall</li>
                <li>• Tracks: Vacuum + wipe clean</li>
                <li>• Hard water: Special treatment for mineral deposits</li>
              </ul>
              <Link
                to="/book"
                className="block text-center bg-gray-900 hover:bg-brand-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all min-h-[48px]"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Frequency Discount */}
          <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 uppercase">
              Schedule Quarterly & Save 20%
            </h3>
            <p className="text-gray-600 mb-5 max-w-xl mx-auto">
              Sign up for quarterly window cleaning (every 3 months) and get 20% off every visit. Cancel anytime. No commitments.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div>
                <span className="text-gray-400 line-through">$200/visit</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-cyan-600">$160/visit</span>
                <span className="block text-xs text-cyan-600">(save $160/year)</span>
              </div>
            </div>
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
            <p className="text-gray-500">Every clean, every time.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Streak-Free Cleaning', desc: 'Professional squeegee technique — no streaks, no water spots' },
              { title: 'Frames & Sills', desc: 'Wiped clean on all included sides' },
              { title: 'Detail Work', desc: 'Corners, edges, and stubborn spots hand-detailed' },
              { title: 'Efficient Service', desc: 'We work fast without sacrificing quality' },
              { title: 'Clean-Up', desc: 'We clean up after ourselves — no mess left behind' },
              { title: 'Before/After Check', desc: 'We walk through with you (if home) or text photos' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-cyan-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-cyan-600" />
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
                <img src="/images/before-after/windows-before.jpg" alt="Windows before cleaning" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded uppercase">Before</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Streaks, dust, water spots blocking light</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative">
                <img src="/images/before-after/windows-after.jpg" alt="Windows after cleaning" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded uppercase">After</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Crystal clear — like new windows</p>
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
                  <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-cyan-600">{t.initials}</span>
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
      <section className="section bg-cyan-600">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready For Crystal Clear Windows?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            More light. Better views. Instant curb appeal upgrade.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-cyan-600 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Book Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
