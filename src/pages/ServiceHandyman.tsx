import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Wrench, Star, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    quote: "They caught a leaking pipe under our kitchen sink before it flooded the whole floor. A $12 fix that prevented a $2,400 emergency. Best money I've ever spent.",
    name: 'Sarah M.',
    location: 'Covington',
    initials: 'SM',
  },
  {
    quote: "I had a running list of 10 small things that needed fixing. They knocked it all out in one visit. Doors, outlets, fixtures — all done. Incredible value.",
    name: 'David R.',
    location: 'Florence',
    initials: 'DR',
  },
  {
    quote: "They painted my rental unit during turnover. Fast, clean, professional. Even patched drywall and fixed the closet door. Saved me days of work.",
    name: 'Jennifer K.',
    location: 'Fort Mitchell',
    initials: 'JK',
  },
];

const faqs = [
  {
    q: 'What kind of work do you do?',
    a: 'Repairs, painting, fixtures, carpentry, drywall, minor plumbing/electrical, door/window repairs, furniture assembly, and more. If it\'s around the house and doesn\'t require a licensed specialist, we handle it.',
  },
  {
    q: 'Do you charge by the hour or by the job?',
    a: 'By the hour after a 4-hour minimum ($500 half-day, $900 full day). Emergency/ASAP work adds a $200 jump fee + hourly.',
  },
  {
    q: 'Can I send you my list ahead of time?',
    a: 'Yes! We recommend it. Send photos and descriptions via the booking form. We\'ll review and confirm if it fits within your time block.',
  },
  {
    q: 'What if the job takes longer than expected?',
    a: 'We bill additional time at $125/hr. We always let you know before going over the time block.',
  },
  {
    q: 'Do you provide materials?',
    a: 'We can source materials at cost + 15%, or you can provide them yourself. Your choice.',
  },
];

export default function ServiceHandyman() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Professional Handyman Services — No Job Too Small | Mursen';
  const seoDescription = 'Repairs, painting, fixtures, carpentry, and more. Half-day, full-day, or emergency service. Serving Covington KY, Newport, Florence, and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="handyman Covington KY, handyman services Cincinnati, home repairs Northern KY, handyman Florence KY, painting repairs carpentry" />
        <link rel="canonical" href={`${siteUrl}/services/handyman`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/services/handyman`} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/before-after/handyman-after.jpg"
            alt="Professional handyman work completed"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-orange-900/75" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <Wrench className="w-4 h-4" />
            Handyman Services
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight leading-tight uppercase">
            Professional Handyman<br />
            <span className="text-yellow-300">No Job Too Small</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Repairs, painting, fixtures, carpentry, minor plumbing/electrical. One pro, one visit, a dozen things fixed. No more putting it off.
          </p>

          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-orange-900 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Submit Work Request
            <ArrowRight className="w-6 h-6" />
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Fully Insured</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Photo Upload for Quotes</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-yellow-300" /> Same-Day Emergency Available</span>
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
              Half-day, full-day, or emergency. You pick the time block that fits your list.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Half Day */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-7 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Half Day</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-gray-900">$500</span>
                <span className="text-sm text-gray-500 ml-1">(4 hours)</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Perfect for a running list of small repairs. Knock out 5–10 items in one visit.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  '4 hours of work',
                  'Additional hours: $125/hr',
                  'Photo review before visit',
                  'Materials at cost + 15%',
                  'Clean-up included',
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

            {/* Full Day */}
            <div className="bg-white border-2 border-orange-500 rounded-2xl p-7 shadow-xl scale-[1.03]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wide">
                Best Value
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Full Day</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-orange-600">$900</span>
                <span className="text-sm text-orange-600 ml-1">(8 hours)</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">Big projects or long lists. Paint a room, assemble furniture, fix a dozen things.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  '8 hours of work',
                  'Additional hours: $125/hr',
                  'Photo review before visit',
                  'Materials at cost + 15%',
                  'Clean-up included',
                  'Priority scheduling',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className="block text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-orange-200 min-h-[48px]"
              >
                Book Now
              </Link>
            </div>

            {/* Emergency/Priority */}
            <div className="bg-white border-2 border-red-500 rounded-2xl p-7 hover:shadow-lg transition-all">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Emergency/Priority</h3>
              <div className="mb-5">
                <span className="text-4xl font-extrabold text-red-600">$200</span>
                <span className="text-sm text-red-600 ml-1">jump fee</span>
                <div className="text-sm text-gray-500 mt-1">+ $125/hr after minimum</div>
              </div>
              <p className="text-sm text-gray-600 mb-5">Urgent repairs. Tenant turnovers. Pre-sale prep. We drop everything and come ASAP.</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  '24-hour response guarantee',
                  '$125/hr after 2-hour minimum',
                  'Same-day or next-day',
                  'Materials sourced urgently',
                  'Photo upload for triage',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="tel:+18595550123"
                className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all min-h-[48px]"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Testimonial Callout */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="font-display text-xl font-bold text-gray-900 uppercase">Real Story</h3>
            </div>
            <p className="text-gray-700 mb-4 max-w-2xl mx-auto italic">
              "They caught a leaking pipe under our kitchen sink before it flooded the whole floor. A <span className="font-bold text-orange-600">$12 fix</span> that prevented a <span className="font-bold text-orange-600">$2,400 emergency</span>. Best money I've ever spent."
            </p>
            <p className="text-sm text-gray-500">— Sarah M., Covington</p>
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              What We Handle
            </h2>
            <p className="text-gray-500">If it's around the house, we fix it.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'Repairs', desc: 'Doors, locks, hinges, handles, fixtures, shelving, furniture' },
              { title: 'Painting', desc: 'Rooms, trim, touch-ups, accent walls, cabinets' },
              { title: 'Carpentry', desc: 'Trim, baseboards, shelving, door frames, minor framing' },
              { title: 'Drywall', desc: 'Patches, nail pops, texture matching, small holes' },
              { title: 'Plumbing (minor)', desc: 'Faucets, toilets, sinks, garbage disposals, minor leaks' },
              { title: 'Electrical (minor)', desc: 'Outlets, switches, light fixtures, ceiling fans' },
              { title: 'Assembly', desc: 'Furniture, grills, storage, playsets, fixtures' },
              { title: 'Miscellaneous', desc: 'Caulking, weatherstripping, hardware installs, and more' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-100 border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">Not sure if we handle it?</span> Send us a photo and description via the booking form. We\'ll confirm if it fits or refer you to a specialist.
            </p>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight uppercase">
              See The Work
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative">
                <img src="/images/before-after/handyman-before.jpg" alt="Before handyman work" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded uppercase">Before</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Broken, worn, neglected</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative">
                <img src="/images/before-after/handyman-after.jpg" alt="After handyman work" className="w-full h-60 object-cover" />
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded uppercase">After</span>
              </div>
              <div className="p-5 text-center">
                <p className="text-sm text-gray-500">Fixed, clean, functional</p>
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
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">{t.initials}</span>
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
      <section className="section bg-orange-600">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight uppercase">
            Stop Putting It Off
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Send us your list. Upload photos. We\'ll knock it out in one visit.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-orange-600 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Submit Work Request
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
