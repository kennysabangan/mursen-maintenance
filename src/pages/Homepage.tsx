import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Check, ChevronDown, ChevronUp, Phone, Mail,
  Leaf, Droplets, SprayCan, Wrench, Snowflake, Trash,
} from 'lucide-react';

const PHONE_DISPLAY = '(859) MURSEN-1';
const PHONE_HREF = 'tel:+18596877361';
const EMAIL = 'hi@mursen.com';

/* ─── DATA ─── */

const services = [
  { num: '01', icon: Leaf, name: 'Lawn Care', tagline: 'Mowing, edging, leaves, mulch, aeration, light tree work.', from: '$55' },
  { num: '02', icon: Droplets, name: 'Window Cleaning', tagline: 'Interior, exterior, screens, tracks, gutters, dryer vents.', from: '$145' },
  { num: '03', icon: SprayCan, name: 'Power Washing', tagline: 'Driveways, siding, decks, fences, soft-wash roofs.', from: '$165' },
  { num: '04', icon: Wrench, name: 'Handyman', tagline: 'Drywall, doors, paint, fixtures, mounts, caulking.', from: '$75/hr' },
  { num: '05', icon: Snowflake, name: 'Snow & Seasonal', tagline: 'Plowing, salt, leaf cleanup, holiday lights.', from: '$55' },
  { num: '06', icon: Trash, name: 'Junk Hauling', tagline: 'Quarter to full truckload, single-call removal.', from: '$125' },
];

const valueBreakdown = [
  { item: 'Weekly lawn mow + edge + blow', detail: '28 visits · April through October · up to ½ acre', cost: '$1,540' },
  { item: '4 hours of handyman service every month', detail: 'Drywall, paint, doors, mounts, caulking · 48 hrs/yr', cost: '$3,600' },
  { item: 'Monthly exterior window cleaning', detail: '7 visits · April through October', cost: '$1,015' },
  { item: 'Annual driveway + walkway power wash', detail: 'Spring scheduling · scheduled around your calendar', cost: '$165' },
  { item: 'Fall leaf cleanup (×2) + spring cleanup', detail: 'Three full seasonal cleanups, no extra charge', cost: '$575' },
  { item: 'Annual gutter cleaning + bonus priority scheduling', detail: 'Late fall gutter clean · 72-hour response window', cost: '$440' },
];

const plans = [
  {
    name: 'Starter',
    price: '199',
    note: 'Per Month',
    features: [
      '1 monthly handyman visit · up to 2 hours',
      'Bi-weekly lawn mowing + edging (Apr–Oct)',
      'Fall + spring cleanup, gutter check',
    ],
    bestFor: 'Best for: small homes, light upkeep needs.',
    variant: 'cream',
  },
  {
    name: 'Lawn Plus',
    price: '129',
    note: 'Per Month · Apr–Oct',
    features: [
      'Weekly mow + edge + blow (Apr–Oct)',
      '$69/mo Nov–Mar · seasonal cleanups',
      'Up to ½ acre · larger lots +$40/mo',
    ],
    bestFor: 'Best for: lawn handled, you do the rest.',
    variant: 'cream',
  },
  {
    name: 'Handyman Plus',
    price: '149',
    note: 'Per Month',
    features: [
      '1 monthly visit · up to 2 hours',
      '5 business day scheduling window',
      'Overage at $75/hr · no contract',
    ],
    bestFor: 'Best for: a regular fix-it guy on call.',
    variant: 'cream',
  },
  {
    name: 'Home Care',
    price: '479',
    note: 'Per Month',
    features: [
      '4 hours handyman every month',
      'Weekly lawn (Apr–Oct) + monthly windows',
      'Annual power wash + 3 seasonal cleanups',
    ],
    bestFor: 'Best for: homeowners who want it all done.',
    variant: 'dark',
    badge: 'Most Popular',
  },
];

const propertyManagerPlan = {
  name: 'Property Manager',
  price: '279',
  note: 'Per Unit / Month',
  description: 'Built specifically for landlords with multiple units.',
  features: [
    'Lawn maintenance + basic exterior upkeep',
    'Tenant turnover punch-list included',
    '24-hour priority response window',
    'Volume: 3+ $249 · 5+ $229 per unit',
  ],
};

const volumePricing = [
  { tier: '1–2 units', price: '$279/mo' },
  { tier: '3–4 units', price: '$249/mo' },
  { tier: '5+ units', price: '$229/mo' },
];

const serviceAreas = [
  'Covington', 'Newport', 'Florence', 'Fort Mitchell',
  'Independence', 'Erlanger', 'Edgewood', 'Crescent Springs',
  'Cincinnati', 'Hyde Park', 'Oakley', 'Mount Lookout',
];

const faqs = [
  { q: 'How quickly can you start?', a: 'Most new clients have their first visit within 5–7 business days of booking. Urgent jobs can often be scheduled same-week.' },
  { q: 'Are you insured and bonded?', a: 'Yes. We carry commercial general liability insurance, workers\' comp, and a $1M surety bond. Proof of insurance available on request.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Yes. All plans are month-to-month with a 30-day cancellation policy. No contracts. We earn your business every month.' },
  { q: 'What happens in winter when there\'s no lawn to mow?', a: 'Lawn-only plans drop to $69/mo Dec–Mar. Bundled plans swap mowing for seasonal services like gutter cleaning, leaf removal, and snow.' },
  { q: 'Do you service my area?', a: 'We serve Covington, Newport, Florence, Fort Mitchell, Independence, Erlanger, and the greater Cincinnati metro. Call to confirm your address.' },
  { q: 'What if I need more handyman hours than my plan includes?', a: 'No problem. Subscribers get $75/hr (vs. $95/hr non-subscriber). Just let us know and we\'ll schedule the extra time.' },
];

/* ─── COMPONENT ─── */

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const siteUrl = 'https://mursen.com';
  const seoTitle = 'Mursen — Your House. Handled. | Lawn, Windows, Power Wash, Handyman in Covington KY';
  const seoDescription = 'One subscription. Lawn care, window cleaning, power washing, handyman, and seasonal services across Covington KY and Cincinnati metro. Plans from $129/mo. Stop calling 5 different guys.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="home maintenance subscription, lawn care Covington KY, window cleaning Cincinnati, power washing Northern KY, handyman Covington" />
        <link rel="canonical" href={`${siteUrl}/`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
      </Helmet>

      {/* ════════ HERO ════════ */}
      <section className="bg-cream-100 pt-12 pb-0 md:pt-20 md:pb-0 relative overflow-hidden">
        <div className="container-app">
          <p className="eyebrow mb-6">A better way to maintain a home</p>

          <h1 className="heading-display text-balance mb-8 max-w-5xl">
            YOUR HOUSE.
            <br />
            <span className="accent-serif font-normal text-rust-500">Handled.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-700 max-w-2xl leading-relaxed mb-8">
            One subscription. One bill. One company that does lawn care, window cleaning, power washing, and handyman work — so you stop juggling five vendors and start getting your weekends back.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            <span className="pill-dark">Fully Insured</span>
            <span className="pill-outline">Bonded</span>
            <span className="pill-outline">Owner-Operated</span>
            <span className="pill-outline">20+ Rentals Maintained</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-16">
            <Link to="/assessment" className="btn-dark-lg">
              Stop Calling 5 Different Guys
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={PHONE_HREF} className="btn-outline">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Black band — service strip */}
        <div className="bg-ink-900 text-cream-50">
          <div className="container-app py-10 md:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
              {services.slice(0, 4).map((s) => (
                <Link key={s.num} to="/portfolio" className="group">
                  <div className="text-rust-400 font-bold text-xs tracking-[0.16em] mb-2">{s.num}</div>
                  <div className="font-black text-xl tracking-[-0.02em] mb-2 uppercase group-hover:text-rust-300 transition-colors">{s.name}</div>
                  <div className="text-cream-100/70 text-sm leading-snug">{s.tagline}</div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-10 pt-8 border-t border-cream-100/15">
              <div className="text-cream-100/70 text-sm">Mursen Home Services · Covington, KY 41011</div>
              <Link to="/assessment" className="inline-flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-cream-50 font-bold text-xs uppercase tracking-[0.10em] py-2.5 px-4 rounded-md transition-colors">
                One Call. One Company. One Bill.
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ALL 6 SERVICES (cream cards) ════════ */}
      <section className="section bg-cream-100">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow mb-4">Every Service</p>
              <h2 className="heading-2 text-balance max-w-2xl">
                Six services. <span className="accent-serif font-normal text-rust-500">One number to call.</span>
              </h2>
            </div>
            <Link to="/portfolio" className="btn-link">
              See full pricing menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.num} to="/portfolio" className="card-cream group flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="section-number">{s.num}</div>
                    <Icon className="w-6 h-6 text-ink-400 group-hover:text-rust-500 transition-colors" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-2xl font-black tracking-[-0.02em] uppercase mb-2 group-hover:text-rust-500 transition-colors">{s.name}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-6 flex-1">{s.tagline}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-ink-900/10">
                    <span className="text-sm">
                      <span className="text-ink-400 italic">from </span>
                      <span className="font-bold text-ink-900">{s.from}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-rust-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ THE HERO OFFER (Annual Value Breakdown) ════════ */}
      <section className="section-cream-light">
        <div className="container-narrow">
          <p className="eyebrow mb-4">The Hero Offer</p>
          <h2 className="heading-2 text-balance mb-4 max-w-3xl">
            Everything your home needs.
            <br />
            <span className="accent-serif font-normal text-rust-500">For one flat monthly price.</span>
          </h2>
          <p className="lead text-ink-500 max-w-2xl mb-12">
            We bundled the four services every homeowner buys separately — and added the seasonal stuff most companies forget. Here's exactly what's included, and what each piece would cost à la carte:
          </p>

          {/* Breakdown table */}
          <div className="bg-cream-50 border border-ink-900/10 rounded-md overflow-hidden">
            <div className="px-6 py-4 border-b border-ink-900/10 flex items-center justify-between">
              <span className="font-black text-sm tracking-[0.06em] uppercase">Home Care · Annual Value Breakdown</span>
              <span className="page-meta hidden sm:inline">À La Carte Cost</span>
            </div>
            <div className="divide-y divide-ink-900/8">
              {valueBreakdown.map((b) => (
                <div key={b.item} className="px-6 py-5 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-bold text-ink-900 text-sm md:text-base">{b.item}</div>
                    <div className="text-xs md:text-sm text-ink-500 mt-1">{b.detail}</div>
                  </div>
                  <div className="text-base md:text-lg font-black text-ink-900 whitespace-nowrap">{b.cost}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Total band */}
          <div className="bg-ink-900 text-cream-50 px-6 py-5 rounded-md mt-3 flex items-center justify-between">
            <span className="font-black text-xs md:text-sm tracking-[0.10em] uppercase">Total Annual Value If Purchased Separately</span>
            <span className="text-2xl md:text-3xl font-black">$7,335</span>
          </div>

          {/* Comparison cards */}
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="bg-cream-50 border border-ink-900/10 rounded-md p-6">
              <p className="page-meta mb-3">À La Carte Total</p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-4xl font-black">$611</span>
                <span className="text-sm text-ink-500 font-bold">/mo avg</span>
              </div>
              <p className="accent-serif text-ink-500">Five vendors · five invoices · five phone numbers</p>
            </div>
            <div className="bg-rust-500 text-cream-50 rounded-md p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream-100/80 mb-3">Your Mursen Price</p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-4xl font-black">$479</span>
                <span className="text-sm font-bold">/mo</span>
              </div>
              <p className="accent-serif text-cream-100/90">One company. One bill. One call.</p>
            </div>
          </div>

          {/* Savings band */}
          <div className="bg-rust-500 text-cream-50 px-6 py-5 rounded-md mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="font-black text-base md:text-lg uppercase tracking-[0.06em]">You Save</span>
              <p className="text-cream-100/80 text-sm mt-0.5">vs. à la carte rates · plus the time managing 5 vendors</p>
            </div>
            <span className="text-3xl md:text-4xl font-black accent-serif font-normal">$1,587/yr</span>
          </div>

          <div className="text-center mt-10">
            <Link to="/assessment" className="btn-primary-lg">
              Get My Home Care Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ FIVE PLANS ════════ */}
      <section className="section bg-cream-100">
        <div className="container-app">
          <p className="eyebrow mb-4">Pick the plan that fits</p>
          <h2 className="heading-2 text-balance mb-4 max-w-3xl">
            Five plans.
            <br />
            <span className="accent-serif font-normal text-rust-500">Zero headaches.</span>
          </h2>
          <p className="lead text-ink-500 max-w-2xl mb-12">
            Whether you want the full bundle or just lawn handled, we've got a fit. Every plan is month-to-month with a 30-day cancellation policy. No long-term contracts. Ever.
          </p>

          {/* 4-up plan grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {plans.map((plan) => {
              const isDark = plan.variant === 'dark';
              const cardClass = isDark ? 'plan-card-dark' : 'plan-card';
              return (
                <div key={plan.name} className={cardClass}>
                  {plan.badge && (
                    <div className="absolute -top-3 right-6 bg-rust-500 text-cream-50 text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded">
                      {plan.badge}
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-6">
                    <h3 className={`text-xl font-black uppercase tracking-[-0.01em] ${isDark ? 'text-cream-50' : 'text-ink-900'}`}>
                      {plan.name}
                    </h3>
                    <div className="text-right">
                      <div className={`text-4xl font-black tracking-[-0.03em] leading-none ${isDark ? 'text-cream-50' : 'text-ink-900'}`}>
                        ${plan.price}
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-[0.18em] mt-1.5 ${isDark ? 'text-cream-100/60' : 'text-ink-400'}`}>
                        {plan.note}
                      </div>
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
                  <div className={`pt-4 border-t ${isDark ? 'border-cream-100/15' : 'border-ink-900/10'}`}>
                    <p className={`accent-serif text-sm ${isDark ? 'text-cream-100/70' : 'text-ink-500'}`}>{plan.bestFor}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Property Manager (full width) */}
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
                  Talk to Us
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/how-it-works" className="btn-link">
              Compare all plans in detail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ FOR PROPERTY INVESTORS ════════ */}
      <section className="section bg-cream-100">
        <div className="container-app">
          <div className="card-forest">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start p-2 md:p-4">
              <div>
                <p className="eyebrow-light mb-4">For Property Investors</p>
                <h2 className="heading-2 text-balance mb-5 text-cream-50">
                  One sign-up.
                  <br />
                  <span className="accent-serif font-normal text-rust-300">Twenty subscriptions.</span>
                </h2>
                <p className="text-cream-100/85 leading-relaxed mb-4 max-w-xl">
                  We built this company on the back of <strong className="text-cream-50">20+ rental units we maintain ourselves</strong>. We know what landlords actually need: fast response, predictable invoices, and someone who can handle tenant turnovers without you flying out to inspect.
                </p>
                <p className="text-cream-100/85 leading-relaxed max-w-xl">
                  Sign up your portfolio once. We assign a dedicated point of contact, lock in priority scheduling, and quote you volume pricing. Most clients with 5+ units cut their property management workload by half within 60 days.
                </p>
              </div>
              <div className="bg-forest-800 rounded-md p-6">
                <div className="page-meta text-cream-100/60 mb-4">Volume Pricing · Per Unit</div>
                <div className="space-y-3 mb-4 pb-4 border-b border-cream-100/15">
                  {volumePricing.map((v) => (
                    <div key={v.tier} className="flex items-baseline justify-between text-cream-50">
                      <span className="text-sm">{v.tier}</span>
                      <span className="font-black text-lg">{v.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline justify-between mb-5">
                  <span className="accent-serif text-rust-300">10 units saves</span>
                  <span className="font-black text-rust-300">$6,000/yr</span>
                </div>
                <Link to="/assessment" className="flex items-center justify-center gap-2 bg-rust-500 hover:bg-rust-600 text-cream-50 font-bold text-xs uppercase tracking-[0.10em] py-3.5 px-5 rounded-md transition-colors">
                  Investor Walk-Through
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ THE MURSEN PROMISE ════════ */}
      <section className="section bg-cream-100">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-4">
            {/* 30-day risk-free */}
            <div className="card-cream">
              <p className="eyebrow-plain mb-4">— The Mursen Promise</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-rust-500 mb-5 leading-[1.0] tracking-[-0.02em]">
                30-Day<br />Risk-Free.
              </h2>
              <p className="text-ink-700 leading-relaxed mb-4">
                <strong>If we miss a scheduled visit, we credit you the full visit value.</strong> If a tech damages something, we fix it on our dime. If you're not satisfied in your first 30 days, we refund your first month — no questions, no fine print, no awkward phone calls.
              </p>
              <p className="text-ink-700 leading-relaxed mb-6">
                We're not the cheapest crew in town. We don't try to be. We're the one you keep, because nothing else slips off your plate.
              </p>
              <div className="pt-4 border-t border-ink-900/10">
                <p className="accent-serif text-ink-500">— The Mursen team</p>
              </div>
            </div>

            {/* Walk-through CTA */}
            <div className="card-dark">
              <p className="eyebrow-light mb-4">Get Started</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase text-cream-50 mb-4 leading-[1.05] tracking-[-0.02em]">
                Book a Free<br />15-Min<br />Walk-Through.
              </h2>
              <p className="text-cream-100/85 leading-relaxed mb-6">
                We'll quote your home, walk your property, and lock in your launch pricing on the spot. No high-pressure pitch. Just a real number.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-baseline justify-between gap-3 pb-2 border-b border-cream-100/15">
                  <span className="page-meta text-cream-100/60">Call/Text</span>
                  <a href={PHONE_HREF} className="font-black text-cream-50 hover:text-rust-300 transition-colors">{PHONE_DISPLAY}</a>
                </div>
                <div className="flex items-baseline justify-between gap-3 pb-2 border-b border-cream-100/15">
                  <span className="page-meta text-cream-100/60">Online</span>
                  <Link to="/assessment" className="font-bold text-cream-50 hover:text-rust-300 transition-colors">mursen.com/start</Link>
                </div>
                <div className="flex items-baseline justify-between gap-3 pb-2 border-b border-cream-100/15">
                  <span className="page-meta text-cream-100/60">Email</span>
                  <a href={`mailto:${EMAIL}`} className="font-bold text-cream-50 hover:text-rust-300 transition-colors">{EMAIL}</a>
                </div>
              </div>
              <div className="text-xs leading-relaxed text-cream-100/70">
                <span className="text-rust-300 font-bold uppercase tracking-[0.10em]">Launch Pricing — </span>
                <span className="accent-serif">Sign up before season-end and lock your monthly rate for 12 months. We're capping new homeowners at 50 this quarter.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SERVICE AREAS ════════ */}
      <section className="section-tight bg-cream-100">
        <div className="container-app">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-4">Where We Work</p>
              <h2 className="heading-3 text-balance mb-4">
                Northern Kentucky <span className="accent-serif font-normal text-rust-500">& Cincinnati metro.</span>
              </h2>
              <p className="text-ink-500 leading-relaxed">
                Local crews, local owners. We live where we work — and we treat every property like it's our own.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 lg:border-l lg:border-ink-900/15 lg:pl-10">
              {serviceAreas.map((a) => (
                <div key={a} className="flex items-center gap-2 text-ink-700">
                  <span className="w-1.5 h-1.5 bg-rust-500 rounded-full flex-shrink-0" />
                  <span className="text-sm font-bold">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="section-cream-light">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Common Questions</p>
            <h2 className="heading-2 text-balance">
              Got questions? <span className="accent-serif font-normal text-rust-500">We've got answers.</span>
            </h2>
            <p className="lead text-ink-500 mt-4 mx-auto">
              Don't see what you're looking for? <a href={PHONE_HREF} className="text-ink-900 font-bold border-b border-rust-500 hover:text-rust-500 transition-colors">Call {PHONE_DISPLAY}</a>.
            </p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-cream-50 border rounded-md transition-colors duration-150 overflow-hidden ${openFaq === i ? 'border-ink-900/25' : 'border-ink-900/10'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer hover:bg-cream-100/40 transition-colors"
                >
                  <span className="font-bold text-ink-900 pr-4 text-base md:text-lg">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? 'bg-rust-500 text-cream-50' : 'bg-ink-900/5 text-ink-500'}`}>
                    {openFaq === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-6 -mt-1">
                    <p className="text-ink-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="bg-ink-900 text-cream-50">
        <div className="container-narrow py-20 md:py-28 text-center">
          <p className="eyebrow-light mb-4 justify-center">Get Started</p>
          <h2 className="heading-1 text-balance mb-6">
            Ready to stop juggling vendors?
            <br />
            <span className="accent-serif font-normal text-rust-300">We'll quote you in 15 minutes.</span>
          </h2>
          <p className="text-lg text-cream-100/80 max-w-2xl mx-auto mb-10">
            Walk your property, lock in your launch pricing, and start handing off the to-do list. No high-pressure pitch — just a real number.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link to="/assessment" className="btn-primary-lg">
              Book Free Walk-Through
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={PHONE_HREF} className="btn-outline-light">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-cream-100/70">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-rust-300" /> No contracts</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-rust-300" /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-rust-300" /> 30-day money-back</span>
          </div>
        </div>
      </section>
    </>
  );
}
