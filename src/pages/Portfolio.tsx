import { Link, useState } from 'react-router-dom';
import { MapPin, Star, Shield, ArrowRight, Award, TrendingUp, Building2, CalendarCheck, Check } from 'lucide-react';

const allProperties = [
  { neighborhood: 'Highland Ave', type: 'Single-Family', units: 1, since: 'Jan 2024', img: 'https://images.unsplash.com/photo-1600596885409-e4a43e1e7a76?w=800&q=80&auto=format&fit=crop' },
  { neighborhood: 'Riverfront', type: 'Duplex', units: 2, since: 'Mar 2024', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&auto=format&fit=crop' },
  { neighborhood: 'Main Street', type: 'Triplex', units: 3, since: 'Jun 2024', img: 'https://images.unsplash.com/photo-1560448204-603b3fc33dbc?w=800&q=80&auto=format&fit=crop' },
  { neighborhood: 'Lewisburg', type: 'Condo', units: 1, since: 'Sep 2024', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop' },
  { neighborhood: 'Madison', type: 'Townhome', units: 1, since: 'Nov 2024', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop' },
  { neighborhood: 'Pike Street', type: 'Single-Family', units: 1, since: 'Feb 2024', img: 'https://images.unsplash.com/photo-1558036117-18d8b694e309?w=800&q=80&auto=format&fit=crop' },
  { neighborhood: 'Highland Ave', type: 'Duplex', units: 2, since: 'Apr 2024', img: 'https://images.unsplash.com/photo-1576941089067-2de3c901e526?w=800&q=80&auto=format&fit=crop' },
  { neighborhood: 'Riverfront', type: 'Condo', units: 1, since: 'Jul 2024', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&auto=format&fit=crop' },
  // ... keep full array for reference but show subset initially
];

const testimonials = [
  {
    quote: 'Since hiring Mursen, my STR has had zero maintenance complaints. Guests love the quick responses. I sleep better knowing they are on it.',
    name: 'Sarah K.',
    location: 'Highland Ave · STR Owner',
    rating: 5,
    avatar: 'S',
  },
  {
    quote: 'The seasonal prep alone saves me 10 hours per month. Worth every single penny. They proactively found issues before they became expensive emergencies.',
    name: 'Mike R.',
    location: 'Riverfront Duplex · 2 units',
    rating: 5,
    avatar: 'M',
  },
  {
    quote: 'They found a failing water heater during an inspection that would have flooded the unit. Preventative maintenance paid for 5 years of service right there.',
    name: 'Jennifer T.',
    location: 'Main Street Triplex · 3 units',
    rating: 5,
    avatar: 'J',
  },
];

const stats = [
  { label: 'Properties Managed', value: '24+', icon: Building2, color: 'text-primary-700' },
  { label: 'Guest Satisfaction', value: '5.0', icon: Star, color: 'text-accent-500', suffix: '★' },
  { label: 'Emergencies in 2025', value: '0', icon: Shield, color: 'text-secondary-500' },
  { label: 'On-Time Service', value: '98%', icon: CalendarCheck, color: 'text-primary-700' },
];

export default function Portfolio() {
  const [visibleCount, setVisibleCount] = useState(8);
  const visibleProperties = allProperties.slice(0, visibleCount);
  const loadMore = () => setVisibleCount(prev => Math.min(prev + 4, allProperties.length));

  return (
    <div className="min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative bg-gradient-to-br from-primary-800 to-surface-900 text-white py-28 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent-500/[0.04] rounded-full blur-[120px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary-500/20 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 text-secondary-400">
            <Shield className="w-4 h-4" />
            Proven Track Record
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Properties We Maintain
          </h1>
          <p className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed">
            24 rental properties across Covington. Kept guest-ready 365 days a year with zero maintenance emergencies.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 -mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-surface-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                  <div className="text-3xl font-extrabold text-surface-900 tracking-tight">{s.value}{s.suffix || ''}</div>
                  <div className="text-sm text-surface-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO GRID ═══════════════ */}
      <section className="py-20 px-6 bg-surface-50/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-surface-900 mb-3">Our Portfolio</h2>
            <p className="text-lg text-surface-500 leading-relaxed max-w-2xl mx-auto">
              Every property we manage stays guest-ready year-round. Here's a look at our growing portfolio.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProperties.map((p, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-surface-100 shadow-soft overflow-hidden hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
                <div className="h-44 bg-surface-100 relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.neighborhood} ${p.type}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-surface-900 shadow-sm">
                      <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
                      5.0
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 bg-secondary-500/90 text-white px-2 py-1 rounded-lg text-[10px] font-semibold shadow-sm">
                      <Shield className="w-3 h-3" />
                      Guardian
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-surface-900 font-semibold mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-surface-300" />
                    {p.neighborhood}
                  </div>
                  <div className="text-xs text-surface-400 mb-2">{p.type} · {p.units} unit{p.units > 1 ? 's' : ''}</div>
                  <div className="text-xs text-secondary-600 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    On plan since {p.since}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < allProperties.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-surface-900 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors shadow-md hover:shadow-lg"
              >
                Load More Properties
              </button>
              <p className="text-sm text-surface-400 mt-3">Showing {visibleCount} of {allProperties.length} properties</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 bg-accent-50 text-accent-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-accent-100 mb-6">
              Client Stories
            </span>
            <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-surface-900 mb-3">What Owners Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-surface-100 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <blockquote className="text-surface-600 leading-relaxed mb-6 text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
                  <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900 text-sm">{t.name}</div>
                    <div className="text-xs text-surface-400">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ IMPACT METRICS ═══════════════ */}
      <section className="py-24 px-6 bg-surface-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="w-12 h-12 text-accent-400 mx-auto mb-6" />
          <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-white mb-3">The Numbers Speak</h2>
          <p className="text-lg text-surface-400 mb-10 max-w-lg mx-auto leading-relaxed">
            Real results from real properties. Not projections.
          </p>

          <div className="grid grid-cols-3 gap-8 mb-10">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-accent-400 mb-1 tracking-tight">24+</div>
              <div className="text-sm text-surface-400">Properties Managed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-accent-400 mb-1 tracking-tight">0</div>
              <div className="text-sm text-surface-400">Emergencies 2025</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-accent-400 mb-1 tracking-tight">98%</div>
              <div className="text-sm text-surface-400">On-Time Service</div>
            </div>
          </div>

          <Link to="/assessment" className="btn-primary-lg px-12">
            Be Our Next Success Story
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
