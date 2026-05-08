import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Award, Building2, Star, ArrowRight, User as UserIcon, MessageCircle, Check } from 'lucide-react';
import { useState } from 'react';

const PHONE_DISPLAY = '(859) MURSEN-1';
const PHONE_HREF = 'tel:+18596877361';
const EMAIL = 'hi@mursen.com';

const values = [
  { icon: ShieldCheck, title: 'Reliability', desc: 'We show up. On time. Every time. Non-negotiable.' },
  { icon: Star, title: 'Transparency', desc: 'Clear pricing, photo evidence, no hidden fees. Ever.' },
  { icon: Award, title: 'Quality', desc: 'We do it right the first time, or we fix it free.' },
];

const credentials = [
  { icon: ShieldCheck, label: 'Fully Insured', sub: 'Commercial General Liability' },
  { icon: Award, label: 'Bonded', sub: '$1M surety bond' },
  { icon: Building2, label: 'Licensed', sub: 'KY Trade Licenses' },
  { icon: Star, label: 'BBB Accredited', sub: 'A+ Rating' },
];

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const siteUrl = 'https://mursen.com';
  const seoTitle = 'About Mursen | Built by landlords for the Cincinnati metro';
  const seoDescription = 'Mursen Home Services started managing 20+ rental units of our own. Reach us at (859) MURSEN-1 or hi@mursen.com. Covington, KY · Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${siteUrl}/contact`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Helmet>

      {/* HERO */}
      <section className="bg-cream-100 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="container-app">
          <div className="flex items-start justify-between mb-12">
            <p className="eyebrow">About Us</p>
            <span className="page-meta hidden md:inline">Mursen · Est. 2024</span>
          </div>
          <h1 className="heading-display mb-8 text-balance max-w-5xl">
            BUILT BY
            <br />
            <span className="accent-serif font-normal text-rust-500">landlords.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-700 max-w-2xl leading-relaxed">
            We started managing our own rental properties across Northern Kentucky and got tired of the maintenance nightmares — no-shows, inflated quotes, contractors who don't communicate. So we built the company we wished existed.
          </p>
        </div>
      </section>

      {/* OWNER STORY */}
      <section className="bg-cream-50 border-y border-ink-900/10 py-20 md:py-28">
        <div className="container-narrow">
          <div className="bg-cream-100 border border-ink-900/10 rounded-md overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1.4fr]">
              <div className="relative aspect-[4/5] md:aspect-auto bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 flex items-center justify-center">
                <UserIcon className="w-24 h-24 text-cream-50/15" strokeWidth={1.2} />
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-50 bg-rust-500 px-2.5 py-1 rounded">Owner-Operated</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-[10px] uppercase tracking-[0.18em] text-cream-50/60 italic">⚠ Photo placeholder — real photo coming</div>
              </div>
              <div className="p-6 md:p-10">
                <p className="eyebrow mb-4">Our Story</p>
                <h3 className="heading-3 text-balance mb-5">
                  Twenty units. <span className="accent-serif font-normal text-rust-500">Five vendors. Every weekend.</span>
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    We started managing our own rental properties across Northern Kentucky and got frustrated with the same maintenance nightmares — no-shows, inflated quotes, emergency repairs at 2 AM, and contractors who don't communicate.
                  </p>
                  <p>
                    So we built the solution we wished existed: a maintenance company that treats every property like a business operation. Same crew, same standards, photo report after every visit. We made the bet that landlords aren't the only ones who want this — homeowners do too.
                  </p>
                  <p>
                    Today we run that company across the Cincinnati metro. Same phone we use for our own units. Same standards. Same answer to "can you handle this": yes.
                  </p>
                </div>
                <div className="pt-5 mt-6 border-t border-ink-900/10">
                  <p className="accent-serif text-ink-500">— The Mursen team · Covington, KY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-cream-100">
        <div className="container-app">
          <p className="eyebrow mb-4">What we believe</p>
          <h2 className="heading-2 text-balance mb-12 max-w-3xl">
            Three values. <span className="accent-serif font-normal text-rust-500">Every visit.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card-cream">
                  <Icon className="w-8 h-8 text-rust-500 mb-5" strokeWidth={1.6} />
                  <h3 className="text-xl font-black uppercase tracking-[-0.02em] mb-3">{v.title}</h3>
                  <p className="text-ink-700 leading-relaxed text-sm">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="bg-cream-50 border-y border-ink-900/10 py-14 md:py-16">
        <div className="container-app">
          <p className="eyebrow mb-4 text-center justify-center">Fully Credentialed</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.02em] mb-10 text-center">
            Insured. Bonded. <span className="accent-serif font-normal text-rust-500">Locked in.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {credentials.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="bg-cream-100 border border-ink-900/10 rounded-md p-5 text-center">
                  <Icon className="w-6 h-6 text-rust-500 mx-auto mb-3" strokeWidth={1.6} />
                  <div className="font-black uppercase text-sm tracking-[-0.01em] text-ink-900">{c.label}</div>
                  <div className="text-xs text-ink-500 mt-1">{c.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="section bg-cream-100">
        <div className="container-app">
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="heading-2 text-balance mb-12 max-w-3xl">
            Real number. <span className="accent-serif font-normal text-rust-500">Real people. Same day.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Info */}
            <div>
              <div className="card-cream mb-5">
                <h3 className="font-black uppercase text-sm tracking-[0.06em] mb-5">Direct Lines</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Phone, label: 'Call/Text', value: PHONE_DISPLAY, href: PHONE_HREF },
                    { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                    { icon: MapPin, label: 'Office', value: 'Covington, KY 41011' },
                    { icon: Clock, label: 'Hours', value: 'Mon–Fri 8am–6pm · Sat 9am–2pm' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-start gap-4 pb-4 border-b border-ink-900/8 last:border-0 last:pb-0">
                        <div className="w-10 h-10 bg-rust-500/10 rounded-md flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-rust-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="font-bold text-ink-900 hover:text-rust-500 transition-colors">{item.value}</a>
                          ) : (
                            <div className="font-bold text-ink-900">{item.value}</div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="card-dark">
                <p className="eyebrow-light mb-3">Quick Path</p>
                <h4 className="text-xl font-black uppercase tracking-[-0.02em] text-cream-50 mb-3">Skip the form.</h4>
                <p className="text-cream-100/80 text-sm mb-5 leading-relaxed">
                  Already know what you need? Book a free 15-minute walk-through and we'll quote you on the spot.
                </p>
                <Link to="/assessment" className="inline-flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-cream-50 font-bold text-xs uppercase tracking-[0.10em] py-3 px-5 rounded-md transition-colors">
                  Book Walk-Through <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="card-cream">
              <p className="eyebrow mb-3">Send a message</p>
              <h3 className="text-2xl font-black uppercase tracking-[-0.02em] mb-6">Tell us about your home.</h3>
              {formSubmitted ? (
                <div className="bg-cream-100 border border-rust-500/30 rounded-md p-8 text-center">
                  <Check className="w-10 h-10 text-rust-500 mx-auto mb-3" />
                  <h4 className="text-xl font-black uppercase tracking-[-0.02em] text-ink-900 mb-2">Message sent.</h4>
                  <p className="text-ink-500 text-sm mb-5">We respond within 2 hours during business hours.</p>
                  <button onClick={() => setFormSubmitted(false)} className="text-sm font-bold text-rust-500 hover:text-rust-700">
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">Your Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
                      <input id="name" type="text" required placeholder="John Smith" className="input-field-icon" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
                      <input id="email" type="email" required placeholder="john@example.com" className="input-field-icon" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-700 mb-2">How can we help?</label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-ink-400 pointer-events-none" />
                      <textarea
                        id="message"
                        rows={5}
                        required
                        placeholder="Tell us about your property maintenance needs..."
                        className="w-full pl-12 pr-4 py-3.5 border border-ink-200 rounded-md bg-cream-50 text-ink-900 placeholder:text-ink-400 focus:ring-2 focus:ring-rust-500/20 focus:border-rust-500 focus:outline-none transition-all duration-150 resize-none"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-ink-400 text-center">We respond within 2 hours · Mon–Fri 8am–6pm EST</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
