import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Leaf, Droplets, SprayCan, Wrench } from 'lucide-react';

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

function ServiceSection({ icon: Icon, title, services }: { icon: any, title: string, services: { name: string, price: string, flagged?: boolean }[] }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div className="px-8 py-5 flex items-center gap-4 border-b border-surface-50">
        <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-brand-600" />
        </div>
        <h3 className="text-lg font-bold text-surface-900">{title}</h3>
      </div>
      <div className="p-6 md:p-8">
        <div className="space-y-0">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-2.5 border-b border-surface-50 last:border-0">
              <span className="text-sm text-surface-700 flex items-center gap-2">
                {s.name}
                {s.flagged && (
                  <span className="inline-flex items-center text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 whitespace-nowrap">
                    Licensed Partner
                  </span>
                )}
              </span>
              <span className="text-sm font-semibold text-surface-900 whitespace-nowrap ml-4">{s.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/assessment" className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer min-h-[44px]">
            Book This Service
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Services & Pricing | Lawn, Windows, Power Wash, Handyman | Mursen';
  const seoDescription = 'Home maintenance services with transparent pricing. Lawn care from $45, window cleaning from $120, power washing from $125, handyman from $75/hr. Serving Covington KY and Cincinnati metro.';

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
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>

      <div className="min-h-screen bg-white">

        {/* Header */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-surface-900 mb-4">
              Services & Pricing
            </h1>
            <p className="text-lg text-surface-500 max-w-xl mx-auto">
              Transparent pricing. No surprises. Book individual services or save with a monthly subscription.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto space-y-8">
            <ServiceSection icon={Leaf} title="Lawn Care" services={lawnServices} />
            <ServiceSection icon={Droplets} title="Window Cleaning" services={windowServices} />
            <ServiceSection icon={SprayCan} title="Power Washing" services={powerWashServices} />
            <ServiceSection icon={Wrench} title="Handyman & Repairs" services={handymanServices} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 tracking-tight">
              One subscription. One company. One bill.
            </h2>
            <p className="text-lg text-surface-500 mb-8 max-w-md mx-auto">
              Everything around your house — handled.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/how-it-works" className="btn-primary-lg px-12 inline-flex justify-center">
                See Our Plans
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/assessment" className="btn-secondary-lg inline-flex justify-center">
                Book Free Assessment
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
