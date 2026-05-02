import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, ArrowRight, Star, Check, Leaf, Droplets, SprayCan, Wrench } from 'lucide-react';

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
  { name: 'Faucet replacement (Licensed Partner Required)', price: '$125–150' },
  { name: 'Toilet repair / rebuild (Licensed Partner Required)', price: '$125–175' },
  { name: 'Door installation (interior)', price: '$150–225' },
  { name: 'Door lock / deadbolt install', price: '$85–100' },
  { name: 'TV mount (up to 65")', price: '$125' },
  { name: 'TV mount (65"+ or over fireplace)', price: '$175–225' },
  { name: 'Caulking (tub, shower, windows)', price: '$85–125' },
  { name: 'Fixture swap — light, fan, etc. (Licensed Partner Required)', price: '$85–125' },
  { name: 'Furniture assembly', price: '$75/hr' },
  { name: 'Paint touch-up (per room)', price: '$100–200' },
  { name: 'Full room paint (walls only)', price: '$300–450' },
  { name: 'Full room paint (walls + trim + ceiling)', price: '$450–700' },
];

function ServiceSection({ icon: Icon, title, color, bgColor, services }: { icon: any, title: string, color: string, bgColor: string, services: { name: string, price: string }[] }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <div className={`${bgColor} px-8 py-6 flex items-center gap-4`}>
        <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <h3 className="text-xl font-bold text-stone-900">{title}</h3>
      </div>
      <div className="p-6 md:p-8">
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
              <span className="text-sm text-stone-700">{s.name}</span>
              <span className="text-sm font-semibold text-stone-900 whitespace-nowrap ml-4">{s.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/assessment" className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer">
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
        <meta name="keywords" content="lawn care pricing Covington KY, window cleaning cost Cincinnati, power washing price Northern KY, handyman rate Covington, home maintenance services" />
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
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
      </Helmet>
      <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-brand-600 text-white py-24 md:py-28 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Services & Pricing
          </h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            Transparent pricing. No surprises. Book individual services or save big with a monthly subscription.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto space-y-10">
          <ServiceSection icon={Leaf} title="Lawn Care" color="text-green-600" bgColor="bg-green-50" services={lawnServices} />
          <ServiceSection icon={Droplets} title="Window Cleaning" color="text-blue-600" bgColor="bg-blue-50" services={windowServices} />
          <ServiceSection icon={SprayCan} title="Power Washing" color="text-cyan-600" bgColor="bg-cyan-50" services={powerWashServices} />
          <ServiceSection icon={Wrench} title="Handyman & Repairs" color="text-orange-600" bgColor="bg-orange-50" services={handymanServices} />
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20 md:py-28 px-6 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            One subscription. One company. One bill.
          </h2>
          <p className="text-lg text-stone-400 mb-10 max-w-xl mx-auto">
            We handle everything around your house — lawn, windows, power wash, handyman.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/how-it-works" className="btn-primary-lg px-12 inline-flex">
              See Our Plans
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/assessment" className="btn-outline border-white/30 text-white hover:text-white hover:border-white inline-flex">
              Book Free Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Trusted by homeowners & investors</h2>
            <p className="text-lg text-stone-500">Don't take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "They found a failing water heater during a routine visit that would have flooded our unit. One catch saved us thousands.", name: 'Mike R.', role: 'Duplex Owner, Riverside' },
              { quote: "The seasonal prep alone saves me 10 hours per month. Worth every penny. They proactively found issues before they became emergencies.", name: 'Jennifer T.', role: 'Triplex Owner, Main St' },
              { quote: "Since Mursen started managing our property, we've had zero maintenance complaints. They fix things before we even know there's a problem.", name: 'Sarah K.', role: 'Homeowner, Highland Ave' },
            ].map((t, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <blockquote className="text-stone-700 text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-xs">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 text-sm">{t.name}</div>
                    <div className="text-xs text-stone-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
