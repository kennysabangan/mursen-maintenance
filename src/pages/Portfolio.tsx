import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Leaf, Droplets, SprayCan, Wrench, Check, ShieldCheck, Phone } from 'lucide-react';

const lawnServices = [
  { name: 'Mow + edge (up to 1/4 acre)', price: '$45' },
  { name: 'Mow + edge (1/4–1/2 acre)', price: '$65' },
  { name: 'Mow + edge (1/2–1 acre)', price: '$95' },
  { name: 'Hedge / shrub trimming', price: '$50/hr' },
  { name: 'Leaf cleanup', price: '$150–350' },
  { name: 'Aeration (per visit)', price: '$85–125' },
  { name: 'Mulch install (per yard)', price: '$85–110' },
  { name: 'Bed weeding / maintenance', price: '$45/hr' },
];

const windowServices = [
  { name: 'Exterior only (standard home)', price: '$120' },
  { name: 'Interior + exterior (standard)', price: '$175' },
  { name: 'Per pane add-on', price: '$5–7' },
  { name: 'Screen cleaning', price: '$3/each' },
  { name: 'Track + sill cleaning', price: '$30' },
  { name: 'Gutter cleaning (exterior)', price: '$135–295' },
];

const powerWashServices = [
  { name: 'Driveway (2-car standard)', price: '$125' },
  { name: 'Driveway (3+ car or long)', price: '$175–250' },
  { name: 'Walkway / front porch', price: '$75–100' },
  { name: 'Patio / deck', price: '$125–200' },
  { name: 'House siding (full exterior)', price: '$350–550' },
  { name: 'Fence (per side)', price: '$100–150' },
  { name: 'Gutter brightening (exterior)', price: '$100–150' },
  { name: 'Roof soft wash', price: '$300–500' },
];

const handymanServices = [
  { name: 'Service call (1 hr minimum)', price: '$75/hr' },
  { name: 'Additional hours', price: '$70/hr' },
  { name: 'Drywall patch (small)', price: '$85–125' },
  { name: 'Drywall patch (large / full sheet)', price: '$175–275' },
  { name: 'Faucet replacement', price: '$125–150', flagged: true },
  { name: 'Toilet repair / rebuild', price: '$125–175', flagged: true },
  { name: 'Door installation (interior)', price: '$150–225' },
  { name: 'Door lock / deadbolt install', price: '$85–100' },
  { name: 'TV mount (up to 65")', price: '$125' },
  { name: 'TV mount (65"+ or over fireplace)', price: '$175–225' },
  { name: 'Caulking (tub, shower, windows)', price: '$85–125' },
  { name: 'Fixture swap — light, fan, etc.', price: '$85–125', flagged: true },
  { name: 'Furniture assembly', price: '$75/hr' },
  { name: 'Paint touch-up (per room)', price: '$100–200' },
  { name: 'Full room paint (walls only)', price: '$300–450' },
  { name: 'Full room paint (walls + trim + ceiling)', price: '$450–700' },
];

const serviceCategories = [
  {
    icon: Leaf,
    title: 'Lawn Care',
    blurb: 'Weekly mowing, edging, trimming, seasonal cleanups, mulch, and aeration.',
    gradient: 'from-emerald-500 via-emerald-600 to-primary-800',
    services: lawnServices,
    anchor: 'lawn',
  },
  {
    icon: Droplets,
    title: 'Window Cleaning',
    blurb: 'Streak-free interior + exterior, screens, tracks, and gutter cleaning.',
    gradient: 'from-sky-500 via-sky-600 to-blue-800',
    services: windowServices,
    anchor: 'windows',
  },
  {
    icon: SprayCan,
    title: 'Power Washing',
    blurb: 'Driveways, siding, decks, fences, walkways, and soft-wash for roofs.',
    gradient: 'from-indigo-500 via-indigo-600 to-violet-800',
    services: powerWashServices,
    anchor: 'powerwash',
  },
  {
    icon: Wrench,
    title: 'Handyman & Repairs',
    blurb: 'Drywall, fixtures, doors, mounts, paint, and licensed-partner trades.',
    gradient: 'from-amber-500 via-orange-600 to-red-700',
    services: handymanServices,
    anchor: 'handyman',
  },
];

function ServiceSection({ icon: Icon, title, services, gradient, anchor }: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  title: string;
  services: { name: string; price: string; flagged?: boolean }[];
  gradient: string;
  anchor: string;
}) {
  return (
    <div id={anchor} className="bg-white rounded-3xl border border-stone-200/70 overflow-hidden shadow-soft scroll-mt-24">
      <div className="grid lg:grid-cols-[2fr_3fr]">
        <div className={`relative aspect-[4/3] lg:aspect-auto min-h-[220px] overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0px, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.3) 0px, transparent 50%)' }} />
          <Icon className="relative w-28 h-28 text-white/95" strokeWidth={1.5} />
          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h3>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="space-y-1">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0 gap-4">
                <span className="text-sm md:text-base text-surface-700 flex items-center gap-2">
                  {s.name}
                  {s.flagged && (
                    <span className="inline-flex items-center text-[10px] font-semibold text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full border border-accent-100 whitespace-nowrap">
                      Licensed Partner
                    </span>
                  )}
                </span>
                <span className="text-sm md:text-base font-bold text-surface-900 whitespace-nowrap">{s.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/assessment" className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm py-3 px-6 rounded-full transition-all duration-200 cursor-pointer min-h-[44px] shadow-glow-brand hover:-translate-y-0.5">
              Book {title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Services & Pricing | Mursen Maintenance';
  const seoDescription = 'Transparent pricing for lawn care, window cleaning, power washing, and handyman work. Serving Covington KY and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${siteUrl}/portfolio`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/portfolio`} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="Mursen Maintenance" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-surface-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-600 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent-500 blur-3xl opacity-50" />
        </div>
        <div className="relative container-app py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow-light mb-4">Services & Pricing</p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-5 text-balance">
              Transparent pricing. <span className="text-primary-400">Zero surprises.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl">
              Browse à la carte rates below or bundle services into a monthly subscription and save up to 30%.
            </p>

            {/* Service jump nav */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              {serviceCategories.map((c) => {
                const Icon = c.icon;
                return (
                  <a key={c.anchor} href={`#${c.anchor}`} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors">
                    <Icon className="w-4 h-4 text-primary-300" />
                    {c.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Service grid overview */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceCategories.map((c) => {
              const Icon = c.icon;
              return (
                <a key={c.title} href={`#${c.anchor}`} className="group bg-stone-50 hover:bg-white rounded-2xl p-6 border border-stone-200/70 hover:border-primary-200 hover:shadow-card-hover transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 group-hover:border-primary-200 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-surface-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-surface-600 leading-relaxed mb-4">{c.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                    See pricing <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed service tables */}
      <section className="section-alt">
        <div className="container-app space-y-8">
          {serviceCategories.map((c) => (
            <ServiceSection key={c.title} icon={c.icon} title={c.title} services={c.services} gradient={c.gradient} anchor={c.anchor} />
          ))}
        </div>
      </section>

      {/* Bundle promo */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary-700 to-surface-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent-500/20 blur-3xl" />
            <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
              <div>
                <p className="eyebrow-light mb-4">Save with a Subscription</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                  Bundle services. Save up to 30%.
                </h2>
                <p className="text-stone-300 leading-relaxed mb-6">
                  Our most popular plan, <strong className="text-white">Home Care</strong>, bundles weekly lawn, monthly windows, 4 hours of handyman, and an annual power wash for $479/mo — that's $850+ in retail value.
                </p>
                <ul className="space-y-2.5 mb-6">
                  {['Same crew every visit', 'Photo report after every job', 'Priority 48-hour scheduling', 'Cancel anytime, no contracts'].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-primary-300 flex-shrink-0" />
                      <span className="text-stone-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/how-it-works" className="btn-accent">
                  Compare All Plans <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/assessment" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold py-3.5 px-6 rounded-full transition-colors min-h-[48px]">
                  Get a Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-surface-900 text-white py-10">
        <div className="container-app">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
            <span className="flex items-center gap-2 text-stone-300"><ShieldCheck className="w-5 h-5 text-primary-400" /> Fully Insured & Bonded</span>
            <span className="hidden md:inline text-stone-600">·</span>
            <span className="flex items-center gap-2 text-stone-300"><Check className="w-5 h-5 text-primary-400" /> Free written estimates</span>
            <span className="hidden md:inline text-stone-600">·</span>
            <a href="tel:+18595550123" className="flex items-center gap-2 text-white font-semibold hover:text-primary-300 transition-colors">
              <Phone className="w-5 h-5 text-primary-400" />
              (859) 555-0123
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
