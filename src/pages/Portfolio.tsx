import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Leaf, Droplets, SprayCan, Wrench, Snowflake, Trash, Phone, Check } from 'lucide-react';

const PHONE_DISPLAY = '(859) MURSEN-1';
const PHONE_HREF = 'tel:+18596877361';

/* ─── PACKET PRICING DATA ─── */

const lawnServices = [
  { name: 'Mow + edge — up to ¼ acre', detail: 'Includes blow-off of hard surfaces', price: '$55' },
  { name: 'Mow + edge — ¼ to ½ acre', detail: 'Standard suburban lot', price: '$75' },
  { name: 'Mow + edge — ½ to 1 acre', detail: '', price: '$115' },
  { name: 'Mow + edge — 1 to 2 acres', detail: '', price: '$165' },
  { name: 'Mow + edge — 2+ acres', detail: 'Per acre · larger properties quoted', price: '$85/acre' },
  { name: 'Hedge & shrub trimming', detail: 'Hourly · debris removal included', price: '$60/hr' },
  { name: 'Small tree / limb trimming', detail: 'Under 20 ft · larger jobs quoted', price: '$125 – $325' },
  { name: 'Leaf cleanup (seasonal)', detail: 'Full property · bagged or hauled', price: '$175 – $400' },
  { name: 'Lawn aeration', detail: 'Core aeration · best in fall', price: '$95 – $145' },
  { name: 'Mulch installation', detail: 'Per cubic yard · delivered & spread', price: '$95 – $125' },
  { name: 'Bed weeding & maintenance', detail: 'Hourly · per visit', price: '$55/hr' },
  { name: 'First-cut surcharge (overgrown)', detail: 'Added to first visit if grass exceeds 8"', price: '+$40' },
];

const windowServices = [
  { name: 'Exterior only — standard home', detail: 'Up to 25 panes · single-story', price: '$145' },
  { name: 'Interior + exterior — standard home', detail: 'Sills wiped · streak-free finish', price: '$245' },
  { name: 'Per pane add-on', detail: 'Storm, French, oversized, transom', price: '$5 – $7' },
  { name: 'Screen cleaning', detail: 'Per screen · removed & washed', price: '$3' },
  { name: 'Track & sill deep clean', detail: 'All windows · vacuum + detail', price: '$35' },
  { name: 'Gutter cleaning', detail: 'Debris removed · downspouts flushed', price: '$145 – $295' },
  { name: 'Dryer vent cleaning', detail: 'Annual recommended · fire safety', price: '$115 – $145' },
];

const powerWashServices = [
  { name: 'Driveway — 2-car standard', detail: 'Up to 600 sq ft', price: '$165' },
  { name: 'Driveway — 3+ car or long', detail: 'Larger or multi-vehicle', price: '$225 – $325' },
  { name: 'Walkway / front porch', detail: 'Concrete, brick, or stone', price: '$85 – $115' },
  { name: 'Patio / deck wash', detail: 'Soft-wash for wood · pressure for stone', price: '$150 – $250' },
  { name: 'House siding — full exterior', detail: 'Vinyl, brick, fiber cement', price: '$375 – $625' },
  { name: 'Fence wash (per side)', detail: 'Standard residential fence', price: '$115 – $175' },
  { name: 'Gutter brightening (exterior)', detail: 'Removes oxidation & black streaks', price: '$115 – $175' },
  { name: 'Roof soft wash', detail: 'Algae, moss & black streak removal', price: '$325 – $550' },
  { name: 'Deck staining & sealing', detail: 'Per sq ft · after wash & dry', price: '$2.50 – $4.50/sq ft' },
];

const handymanServices = [
  { name: 'Service call — 1-hour minimum', detail: 'Hourly · materials billed at cost', price: '$75/hr' },
  { name: 'Drywall patch — small', detail: 'Up to 1 sq ft · sand & prime included', price: '$95 – $135' },
  { name: 'Drywall patch — large / full sheet', detail: 'Tape, mud, prime · paint quoted separately', price: '$185 – $295' },
  { name: 'Interior door installation', detail: 'Pre-hung · trim included', price: '$165 – $245' },
  { name: 'Door lock / deadbolt install', detail: 'Standard or smart lock', price: '$95 – $115' },
  { name: 'TV mount — up to 65"', detail: 'Wall mount · cable concealment available', price: '$135' },
  { name: 'TV mount — 65"+ or over fireplace', detail: 'Larger mount or specialty placement', price: '$185 – $245' },
  { name: 'Caulking — tub, shower, windows', detail: 'Old caulk removed · re-sealed', price: '$95 – $135' },
  { name: 'Furniture assembly', detail: 'Hourly · IKEA, Wayfair, etc.', price: '$75/hr' },
  { name: 'Paint touch-up — per room', detail: 'Spot repair · paint provided by you', price: '$115 – $215' },
  { name: 'Full room paint — walls only', detail: '2 coats · standard size room', price: '$325 – $475' },
  { name: 'Full room paint — walls + trim + ceiling', detail: 'Complete room · cut-in detail', price: '$475 – $725' },
];

const seasonalServices = [
  { name: 'Snow — driveway only (per visit)', detail: '', price: '$55 – $85' },
  { name: 'Snow — driveway + walkway', detail: '', price: '$85 – $125' },
  { name: 'Snow — seasonal contract (Dec–Mar)', detail: 'Unlimited visits per snow event', price: '$325 – $525' },
  { name: 'Salt / de-ice application', detail: '', price: '$35 – $65' },
  { name: 'Junk hauling — ¼ truckload', detail: '', price: '$125 – $175' },
  { name: 'Junk hauling — ½ truckload', detail: '', price: '$225 – $295' },
  { name: 'Junk hauling — full truckload', detail: '', price: '$385 – $495' },
  { name: 'Holiday lights — single-story install', detail: '', price: '$225 – $375' },
  { name: 'Holiday lights — two-story install', detail: '', price: '$375 – $625' },
  { name: 'Holiday lights — takedown & storage', detail: '', price: '$145 – $245' },
  { name: 'Christmas tree disposal', detail: 'Curbside pickup · zero hassle', price: '$45' },
];

const serviceCategories = [
  { num: '01', icon: Leaf, title: 'Lawn Care', tagline: 'Mowing · edging · cleanup · light tree work', services: lawnServices, anchor: 'lawn' },
  { num: '02', icon: Droplets, title: 'Window Cleaning', tagline: 'Interior · exterior · screens · gutters · vents', services: windowServices, anchor: 'windows' },
  { num: '03', icon: SprayCan, title: 'Power Washing', tagline: 'Driveway · siding · decks · fence · roof · staining', services: powerWashServices, anchor: 'powerwash' },
  { num: '04', icon: Wrench, title: 'Handyman', tagline: 'Drywall · paint · doors · mounts · caulking', services: handymanServices, anchor: 'handyman', footnote: 'Plumbing & electrical requiring KY licensure (faucet replacement, toilet rebuild, light/fan fixture swap) — coordinated through our licensed partner network. We remain your single point of contact. Quoted separately.' },
  { num: '05', icon: Snowflake, title: 'Seasonal & Specialty', tagline: 'Snow · holiday lights · junk hauling', services: seasonalServices, anchor: 'seasonal' },
];

function PriceTable({ num, icon: Icon, title, tagline, services, anchor, footnote }: {
  num: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  title: string;
  tagline: string;
  services: { name: string; detail: string; price: string }[];
  anchor: string;
  footnote?: string;
}) {
  return (
    <div id={anchor} className="scroll-mt-24">
      <div className="flex items-end justify-between gap-4 pb-3 border-b-2 border-ink-900 mb-2">
        <div className="flex items-center gap-4">
          <span className="section-number text-base">{num}</span>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.02em]">{title}</h3>
          <Icon className="hidden md:block w-5 h-5 text-ink-400" strokeWidth={1.6} />
        </div>
        <span className="accent-serif text-ink-500 text-sm md:text-base hidden sm:inline">{tagline}</span>
      </div>

      <div className="divide-y divide-ink-900/10">
        {services.map((s) => (
          <div key={s.name} className="py-4 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_2fr_auto] gap-x-6 gap-y-1 items-baseline">
            <div className="font-bold text-ink-900 text-sm md:text-base">{s.name}</div>
            <div className="hidden sm:block text-sm text-ink-500 italic">{s.detail}</div>
            <div className="text-base md:text-lg font-black text-ink-900 whitespace-nowrap text-right">{s.price}</div>
            {s.detail && <div className="sm:hidden col-span-2 text-xs text-ink-500 italic mt-0.5">{s.detail}</div>}
          </div>
        ))}
      </div>

      {footnote && (
        <div className="mt-4 border-l-2 border-rust-500 pl-4 py-2 text-sm text-ink-500 italic leading-relaxed">
          {footnote}
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const siteUrl = 'https://mursen.com';
  const seoTitle = 'Services & Pricing | Mursen — Every Service. One Number.';
  const seoDescription = 'Transparent pricing for lawn care, window cleaning, power washing, handyman, snow, and junk hauling. Serving Covington KY and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${siteUrl}/portfolio`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Helmet>

      {/* HERO — packet page 1 cover */}
      <section className="bg-cream-100 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="container-app">
          <div className="flex items-start justify-between mb-12">
            <p className="eyebrow">The Complete Service Menu</p>
            <div className="text-right page-meta hidden md:block">
              Service Menu · 2026<br />
              <span className="text-ink-700 font-normal normal-case tracking-normal text-xs">Covington, KY · Cincinnati Metro</span>
            </div>
          </div>

          <h1 className="heading-display mb-12 text-balance max-w-5xl">
            EVERY SERVICE.
            <br />
            <span className="accent-serif font-normal text-rust-500">One Number.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-700 max-w-2xl leading-relaxed mb-10">
            Below is the full price list for every service we offer — book individually as a one-time job, or bundle several into a monthly subscription and save up to 22%.
          </p>

          {/* 6-service jump grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {serviceCategories.slice(0, 6).map((c) => {
              return (
                <a key={c.anchor} href={`#${c.anchor}`} className="card-cream group flex items-center gap-4 hover:border-rust-400">
                  <span className="section-number text-base">{c.num}</span>
                  <div className="flex-1">
                    <div className="font-black uppercase tracking-[-0.01em] text-sm md:text-base group-hover:text-rust-500 transition-colors">{c.title}</div>
                    <div className="text-xs text-ink-500 italic mt-0.5 hidden sm:block">{c.tagline}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-rust-500 group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}
            <a href="#bundle" className="card-cream group flex items-center gap-4 hover:border-rust-400">
              <span className="section-number text-base">★</span>
              <div className="flex-1">
                <div className="font-black uppercase tracking-[-0.01em] text-sm md:text-base group-hover:text-rust-500 transition-colors">Bundle & Save</div>
                <div className="text-xs text-ink-500 italic mt-0.5 hidden sm:block">Up to $1,587/yr · Home Care plan</div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-rust-500 group-hover:translate-x-0.5 transition-all" />
            </a>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            <span className="pill-dark">Fully Insured</span>
            <span className="pill-outline">Bonded</span>
            <span className="pill-outline">No Hidden Fees</span>
            <span className="pill-outline">Free Quotes</span>
          </div>

          {/* Bundle band */}
          <div id="bundle" className="bg-ink-900 text-cream-50 rounded-md p-6 md:p-8 grid md:grid-cols-[1.6fr_1fr] gap-6 md:gap-10 items-center scroll-mt-24">
            <div>
              <p className="eyebrow-light mb-3">Save with a Subscription</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[-0.02em] leading-[1.05]">
                Bundle 4 services. <span className="accent-serif font-normal text-rust-300">Save up to $1,587/yr.</span>
              </h2>
            </div>
            <div className="text-sm text-cream-100/85 leading-relaxed md:border-l md:border-cream-100/15 md:pl-8">
              <p className="mb-4">
                Ask about <strong className="text-cream-50">Home Care</strong> for $479/mo — includes weekly lawn, monthly windows, 4 hrs handyman, plus seasonal cleanups.
              </p>
              <Link to="/how-it-works" className="inline-flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-cream-50 font-bold text-xs uppercase tracking-[0.10em] py-2.5 px-4 rounded-md transition-colors">
                See All Plans
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-ink-500 mt-8 pt-4 border-t border-ink-900/10">
            <span>Mursen Home Services · Covington, KY 41011 · mursen.com</span>
            <span className="page-meta hidden md:inline">01 / 04</span>
          </div>
        </div>
      </section>

      {/* DETAILED PRICE TABLES */}
      <section className="bg-cream-50 py-20 md:py-28">
        <div className="container-narrow space-y-20">
          {serviceCategories.map((c) => (
            <PriceTable key={c.anchor} {...c} />
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-rust-500 text-cream-50 py-12">
        <div className="container-app">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream-100/80 mb-2">Get Started</p>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[-0.02em]">
                One call. <span className="accent-serif font-normal">One company.</span> One bill.
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/assessment" className="bg-ink-900 hover:bg-ink-800 text-cream-50 font-bold text-sm uppercase tracking-[0.10em] px-7 py-4 rounded-md transition-colors inline-flex items-center justify-center gap-2 min-h-[48px]">
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={PHONE_HREF} className="border border-cream-50 hover:bg-cream-50 hover:text-rust-500 text-cream-50 font-bold text-sm uppercase tracking-[0.10em] px-7 py-4 rounded-md transition-colors inline-flex items-center justify-center gap-2 min-h-[48px]">
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST + GUARANTEE STRIP */}
      <section className="bg-cream-100 py-12">
        <div className="container-app">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-700">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-rust-500" /> Fully Insured & Bonded</span>
            <span className="hidden md:inline text-ink-300">·</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-rust-500" /> Free written estimates</span>
            <span className="hidden md:inline text-ink-300">·</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-rust-500" /> 30-day satisfaction guarantee</span>
          </div>
        </div>
      </section>
    </>
  );
}
