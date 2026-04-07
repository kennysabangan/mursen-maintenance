import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, ArrowRight, Star, Check, Home, Wrench, Calendar, Plug, Droplets, Zap, Paintbrush, Trees, Bug, Waves, Sparkles } from 'lucide-react';

const services = [
  { icon: Home, title: 'Property Inspections', desc: 'Comprehensive 75-point inspections with photo reports. Catches issues before they cost you.', category: 'Inspection' },
  { icon: Calendar, title: 'Seasonal Maintenance', desc: 'Gutter cleaning, HVAC prep, winterization. Stay ahead of every season.', category: 'Preventive' },
  { icon: Wrench, title: 'Emergency Repairs', desc: 'Fast response when things break. Average 4-hour emergency response time.', category: 'Repair' },
  { icon: Plug, title: 'Smart Home Setup', desc: 'Thermostats, locks, cameras. Make your property smarter and more efficient.', category: 'Upgrade' },
  { icon: Droplets, title: 'Plumbing', desc: 'Leak detection, pipe repair, fixture replacement. Licensed plumbers only.', category: 'Specialty' },
  { icon: Zap, title: 'Electrical Work', desc: 'Panel upgrades, outlet repair, rewiring. Certified electricians.', category: 'Specialty' },
  { icon: Paintbrush, title: 'Interior & Exterior Painting', desc: 'Full coordination from prep to final coat. Professional results, every time.', category: 'Improvement' },
  { icon: Trees, title: 'Landscaping & Tree Care', desc: 'Mowing, trimming, removal. Keep your property looking its best.', category: 'Exterior' },
  { icon: Sparkles, title: 'Deep Cleaning', desc: 'Turnover cleaning, move-in/move-out prep. Guest-ready guarantee.', category: 'Cleaning' },
  { icon: Bug, title: 'Pest Control', desc: 'Inspection, treatment, prevention. Protect your property from unwanted guests.', category: 'Exterior' },
  { icon: Waves, title: 'Pool Maintenance', desc: 'Opening, closing, weekly care. Crystal clear water all season.', category: 'Specialty' },
  { icon: Shield, title: 'Vendor Concierge', desc: 'Pre-vetted contractors. Full project management. Zero markup surprise.', category: 'Management' },
];

const testimonials = [
  {
    quote: "Since Mursen started managing our rental, we've had zero maintenance complaints. They fix things before we even know there's a problem.",
    name: 'Sarah K.',
    role: 'STR Owner, Highland Ave',
  },
  {
    quote: "They found a failing water heater during an inspection that would have flooded our unit. One catch saved us thousands.",
    name: 'Mike R.',
    role: 'Duplex Owner, Riverside',
  },
  {
    quote: "The seasonal prep alone saves me 10 hours per month. Worth every penny. They proactively found issues before they became emergencies.",
    name: 'Jennifer T.',
    role: 'Triplex Owner, Main St',
  },
];

export default function Portfolio() {
  // Group services by category
  const categories = ['Inspection', 'Preventive', 'Repair', 'Management', 'Specialty', 'Upgrade', 'Exterior', 'Improvement', 'Cleaning'];
  const grouped: Record<string, typeof services> = {};
  services.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Our Services | Mursen Maintenance - Property Care';
  const seoDescription = 'Comprehensive property maintenance services in Covington KY. Inspections, repairs, seasonal care, vendor concierge, and more. View all services we offer.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="property maintenance services, Covington property care, rental maintenance services, home maintenance subscription" />
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
          <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Full-Service Property Care
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Our Services
          </h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto">
            From routine inspections to emergency repairs — everything your property needs, handled by people who care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">What we handle</h2>
            <p className="text-lg text-stone-500">One call. Every service. No more chasing multiple contractors.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-7 border border-stone-100 shadow-soft hover:shadow-card-hover transition-all duration-400 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
                      <ServiceIcon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-1">{service.title}</h3>
                      <p className="text-sm text-stone-500 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Trusted by property owners</h2>
            <p className="text-lg text-stone-500">Don't take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
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

      {/* Vendor Concierge highlight */}
      <section className="py-20 md:py-28 px-6 bg-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-7 h-7 text-teal-700" />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Vendor Concierge Network</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Pre-vetted contractors. Full project management. Industry-leading 0–10% markup vs. the typical 25–40%. We manage the mess so you don't have to.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {'Roofing,HVAC,Plumbing,Electrical,Painting,Carpentry,Appliances,Landscaping,Pools,Cleaning,Smart Home,Pest Control'.split(',').map((s, i) => (
              <span key={i} className="bg-white text-teal-700 px-4 py-2 rounded-full text-sm font-medium shadow-soft border border-teal-100">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Ready for worry-free property care?
          </h2>
          <p className="text-lg text-stone-500 mb-8">
            Start with a free 75-point assessment. See exactly where your property stands.
          </p>
          <Link to="/assessment" className="btn-primary-lg inline-flex">
            Schedule Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
