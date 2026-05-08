import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Phone, Star, ShieldCheck, Users, Award } from 'lucide-react';

const PHONE_DISPLAY = '(859) MURSEN-1';
const PHONE_HREF = 'tel:+18596877361';
const EMAIL = 'hi@mursen.com';

const steps = [
  {
    num: '01',
    title: 'Pick the plan',
    description: 'Choose à la carte for a one-time job or a monthly bundle for the whole property. Five plans, zero contracts.',
    bullets: ['Free 15-min walk-through', 'Flat-rate quote on the spot', 'No high-pressure pitch'],
  },
  {
    num: '02',
    title: 'We show up',
    description: 'Same crew every visit. Photo report after every job. Issues flagged before they become emergencies.',
    bullets: ['Same tech every visit', 'Photo report after each service', 'Insured & bonded team'],
  },
  {
    num: '03',
    title: 'Live better',
    description: 'Your weekends back. Your honey-do list handled. Cancel any month — we earn your business each cycle.',
    bullets: ['30-day risk-free guarantee', 'Cancel any month, no fees', 'Subscriber rate $75/hr extras'],
  },
];

const plans = [
  { name: 'Starter', price: '199', note: 'Per Month', features: ['1 monthly handyman visit · up to 2 hours', 'Bi-weekly lawn mowing + edging (Apr–Oct)', 'Fall + spring cleanup, gutter check'], bestFor: 'Best for: small homes, light upkeep needs.', variant: 'cream' },
  { name: 'Lawn Plus', price: '129', note: 'Per Month · Apr–Oct', features: ['Weekly mow + edge + blow (Apr–Oct)', '$69/mo Nov–Mar · seasonal cleanups', 'Up to ½ acre · larger lots +$40/mo'], bestFor: 'Best for: lawn handled, you do the rest.', variant: 'cream' },
  { name: 'Handyman Plus', price: '149', note: 'Per Month', features: ['1 monthly visit · up to 2 hours', '5 business day scheduling window', 'Overage at $75/hr · no contract'], bestFor: 'Best for: a regular fix-it guy on call.', variant: 'cream' },
  { name: 'Home Care', price: '479', note: 'Per Month', features: ['4 hours handyman every month', 'Weekly lawn (Apr–Oct) + monthly windows', 'Annual power wash + 3 seasonal cleanups'], bestFor: 'Best for: homeowners who want it all done.', variant: 'dark', badge: 'Most Popular' },
];

const propertyManagerPlan = {
  name: 'Property Manager',
  price: '279',
  note: 'Per Unit / Month',
  description: 'Built specifically for landlords with multiple units.',
  features: ['Lawn maintenance + basic exterior upkeep', 'Tenant turnover punch-list included', '24-hour priority response window', 'Volume: 3+ $249 · 5+ $229 per unit'],
};

const testimonials = [
  { quote: "They caught a slow leak before it flooded the floor. Saved us thousands.", name: 'Sarah M.', location: 'Covington, KY', initials: 'SM' },
  { quote: "I used to call four people for my rentals. Now I call one.", name: 'David R.', location: 'Florence, KY', initials: 'DR' },
  { quote: "Three neighbors asked who power-washed our driveway. Mursen.", name: 'Jennifer K.', location: 'Fort Mitchell, KY', initials: 'JK' },
];

const promiseCards = [
  { icon: Award, title: '30-Day Risk-Free', body: 'If we miss a visit, we credit it. If we damage something, we fix it. If you\'re not happy in 30 days, we refund the first month — no questions.' },
  { icon: Users, title: 'Same Tech Every Visit', body: 'You\'ll see the same friendly face on your property. They learn your home, your priorities, your schedule.' },
  { icon: ShieldCheck, title: 'Insured & Bonded', body: 'Commercial GL coverage, workers\' comp, and a $1M surety bond. Proof on request, every time.' },
];

export default function HowItWorks() {
  const siteUrl = 'https://mursen.com';
  const seoTitle = 'How It Works | Mursen — Five Plans. Zero Headaches.';
  const seoDescription = 'Three simple steps: pick a plan, we show up, you live better. Five subscription plans for homeowners and landlords across Covington KY and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${siteUrl}/how-it-works`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Helmet>

      {/* HERO */}
      <section className="bg-cream-100 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="container-app">
          <div className="flex items-start justify-between mb-12">
            <p className="eyebrow">Pick the plan that fits</p>
            <span className="page-meta hidden md:inline">How It Works · 03/04</span>
          </div>

          <h1 className="heading-display mb-8 text-balance max-w-5xl">
            FIVE PLANS.
            <br />
            <span className="accent-serif font-normal text-rust-500">Zero headaches.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-700 max-w-2xl leading-relaxed mb-10">
            Whether you want the full bundle or just lawn handled, we've got a fit. Every plan is month-to-month with a 30-day cancellation policy. No long-term contracts. Ever.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/assessment" className="btn-primary-lg">
              Book Free Walk-Through <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={PHONE_HREF} className="btn-outline">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* 3 STEPS */}
      <section className="bg-cream-50 border-y border-ink-900/10 py-20 md:py-24">
        <div className="container-app">
          <p className="eyebrow mb-4">Three Steps</p>
          <h2 className="heading-2 text-balance mb-12 max-w-3xl">
            From quote to clean. <span className="accent-serif font-normal text-rust-500">In a week.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((step, i) => (
              <div key={step.num} className="relative bg-cream-100 border border-ink-900/10 rounded-md p-7 flex flex-col">
                {/* Visual block (gradient placeholder) */}
                <div className={`relative aspect-[16/9] rounded-md mb-6 overflow-hidden ${
                  i === 0 ? 'bg-gradient-to-br from-rust-400 to-rust-700' :
                  i === 1 ? 'bg-gradient-to-br from-ink-700 to-ink-900' :
                  'bg-gradient-to-br from-forest-600 to-forest-800'
                } flex items-center justify-center`}>
                  <span className="text-cream-50/15 font-black text-7xl tracking-[-0.04em]">{step.num}</span>
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.18em] text-cream-50 bg-ink-900/40 backdrop-blur px-2.5 py-1 rounded">Step {step.num}</span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-[-0.02em] mb-3">{step.title}</h3>
                <p className="text-ink-700 leading-relaxed mb-5">{step.description}</p>
                <ul className="space-y-2 mt-auto">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="text-rust-500 font-black flex-shrink-0">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 PLANS */}
      <section className="section bg-cream-100">
        <div className="container-app">
          <p className="eyebrow mb-4">All Plans · Side by side</p>
          <h2 className="heading-2 text-balance mb-12 max-w-3xl">
            Choose your <span className="accent-serif font-normal text-rust-500">starting point.</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {plans.map((plan) => {
              const isDark = plan.variant === 'dark';
              const cardClass = isDark ? 'plan-card-dark' : 'plan-card';
              return (
                <div key={plan.name} className={cardClass}>
                  {plan.badge && (
                    <div className="absolute -top-3 right-6 bg-rust-500 text-cream-50 text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded">{plan.badge}</div>
                  )}
                  <div className="flex items-start justify-between mb-6">
                    <h3 className={`text-xl font-black uppercase tracking-[-0.01em] ${isDark ? 'text-cream-50' : 'text-ink-900'}`}>{plan.name}</h3>
                    <div className="text-right">
                      <div className={`text-4xl font-black tracking-[-0.03em] leading-none ${isDark ? 'text-cream-50' : 'text-ink-900'}`}>${plan.price}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-[0.18em] mt-1.5 ${isDark ? 'text-cream-100/60' : 'text-ink-400'}`}>{plan.note}</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${isDark ? 'text-cream-100/90' : 'text-ink-700'}`}>
                        <span className="text-rust-400 font-black flex-shrink-0">›</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`pt-4 border-t mb-5 ${isDark ? 'border-cream-100/15' : 'border-ink-900/10'}`}>
                    <p className={`accent-serif text-sm ${isDark ? 'text-cream-100/70' : 'text-ink-500'}`}>{plan.bestFor}</p>
                  </div>
                  <Link to="/assessment" className={`flex items-center justify-center gap-2 w-full font-bold text-xs uppercase tracking-[0.10em] py-3 px-5 rounded-md transition-colors ${
                    isDark ? 'bg-rust-500 hover:bg-rust-600 text-cream-50' : 'bg-ink-900 hover:bg-ink-800 text-cream-50'
                  }`}>
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="plan-card-forest">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-start">
              <div>
                <h3 className="text-xl font-black uppercase tracking-[-0.01em] text-cream-50 mb-1">{propertyManagerPlan.name}</h3>
                <p className="accent-serif text-cream-100/80 mb-5">{propertyManagerPlan.description}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {propertyManagerPlan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-cream-100/90">
                      <span className="text-rust-300 font-black flex-shrink-0">›</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right md:border-l md:border-cream-100/15 md:pl-8">
                <div className="text-5xl font-black tracking-[-0.03em] text-cream-50 leading-none">${propertyManagerPlan.price}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-100/70 mt-2 mb-5">{propertyManagerPlan.note}</div>
                <Link to="/assessment" className="inline-flex items-center gap-2 bg-cream-50 hover:bg-cream-100 text-forest-700 font-bold text-xs uppercase tracking-[0.10em] py-3 px-5 rounded-md transition-colors">
                  Talk to Us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS LINE */}
      <section className="bg-cream-50 border-y border-ink-900/10 py-14 md:py-20">
        <div className="container-app">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <p className="eyebrow">What subscribers say</p>
            <div className="flex items-center gap-2 text-sm text-ink-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-rust-500 fill-rust-500" />
                ))}
              </div>
              <span><span className="font-black text-ink-900">4.9</span> · 80+ reviews</span>
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-400 mb-8 italic">⚠ Sample testimonials — replaced with verified reviews when published.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-cream-100 border border-ink-900/10 rounded-md p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-rust-500 fill-rust-500" />
                  ))}
                </div>
                <p className="accent-serif text-base text-ink-900 leading-relaxed mb-5 flex-grow">"{t.quote}"</p>
                <div className="flex items-center gap-2.5 pt-3 border-t border-ink-900/10">
                  <div className="w-9 h-9 bg-rust-500 text-cream-50 rounded-full flex items-center justify-center font-black text-xs">{t.initials}</div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE BAND */}
      <section className="section bg-cream-100">
        <div className="container-app">
          <p className="eyebrow mb-4">The Mursen Promise</p>
          <h2 className="heading-2 text-balance mb-12 max-w-3xl">
            Three guarantees. <span className="accent-serif font-normal text-rust-500">Zero asterisks.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {promiseCards.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card-cream">
                  <Icon className="w-8 h-8 text-rust-500 mb-5" strokeWidth={1.6} />
                  <h3 className="text-xl font-black uppercase tracking-[-0.02em] mb-3">{p.title}</h3>
                  <p className="text-ink-700 leading-relaxed text-sm">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink-900 text-cream-50">
        <div className="container-narrow py-20 md:py-28 text-center">
          <p className="eyebrow-light mb-4 justify-center">Get Started</p>
          <h2 className="heading-1 text-balance mb-6">
            Ready when you are.
            <br />
            <span className="accent-serif font-normal text-rust-300">15 minutes to a quote.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/assessment" className="btn-primary-lg">
              Book Free Walk-Through <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={PHONE_HREF} className="btn-outline-light">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-cream-100/60 text-sm mt-8">{EMAIL} · mursen.com/start</p>
        </div>
      </section>
    </>
  );
}
