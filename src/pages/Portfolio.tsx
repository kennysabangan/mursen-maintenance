import { Link } from 'react-router-dom';
import { MapPin, Star, Shield, ArrowRight, Building, Home as HomeIcon, ChevronRight, Quote, CalendarCheck, TrendingUp } from 'lucide-react';

const properties = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  neighborhood: ['Highland Ave', 'Riverfront', 'Main Street', 'Lewisburg', 'Madison', 'Pike Street'][i % 6],
  type: ['Single-Family', 'Duplex', 'Triplex', 'Condo', 'Townhome'][i % 5],
  sinceDate: new Date(2024, i % 12, (i * 3) % 28 + 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  rating: '5.0',
  emergencies: 0,
  units: [1, 1, 2, 3, 1][i % 5],
}));

const testimonials = [
  {
    quote: 'Since hiring Mursen, my STR has had zero maintenance complaints. Guests love the quick responses. I sleep better knowing they are on it.',
    name: 'Sarah K.',
    location: 'Highland Ave Property',
    rating: 5,
  },
  {
    quote: 'The seasonal prep alone saves me 10 hours per month. Worth every penny. They proactively found issues before they became expensive emergencies.',
    name: 'Mike R.',
    location: 'Riverfront Duplex',
    rating: 5,
  },
  {
    quote: 'They found a failing water heater during an inspection that would have flooded the unit. Preventative maintenance paid for 5 years of service right there.',
    name: 'Jennifer T.',
    location: 'Main Street Triplex',
    rating: 5,
  },
];

const stats = [
  { label: 'Properties Managed', value: '24', icon: Building },
  { label: 'Guest Satisfaction', value: '5.0', icon: Star },
  { label: 'Maintenance Emergencies', value: '0', icon: Shield },
  { label: 'On-Time Service Rate', value: '98%', icon: CalendarCheck },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary-600 to-slate-900 text-white py-20 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Proven Track Record
          </div>
          <h1 className="heading-xl text-white mb-4 text-balance">
            Properties We Maintain
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-balance">
            24 rental properties across Covington kept guest-ready 365 days a year with zero maintenance emergencies.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white -mt-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 text-secondary-500 mx-auto mb-2" />
                  <div className="text-3xl font-extrabold text-primary-800">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary-100 to-secondary-50 rounded-2xl h-64 md:h-80 flex items-center justify-center border border-slate-200">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Map of Covington, KY with 24 property locations</p>
              <p className="text-sm text-slate-400 mt-1">Interactive map — integrate with Google Maps or Mapbox</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="heading-lg text-primary-800">Our Managed Portfolio</h2>
              <p className="text-slate-500 mt-1">Every property on a Mursen Property Guardian plan</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {properties.map((property) => (
              <div key={property.id} className="card group">
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-primary-700">
                    <HomeIcon className="w-5 h-5" />
                    <span className="font-semibold text-sm">{property.neighborhood}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{property.type} — {property.units} unit{property.units > 1 ? 's' : ''}</div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">On plan since</span>
                    <span className="font-medium text-slate-700">{property.sinceDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Guest rating</span>
                    <span className="bg-secondary-50 text-secondary-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {property.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Emergencies</span>
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                      Zero
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 group-hover:text-accent-700 transition-colors">
                      Guest-ready in 48h guarantee
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-primary-800 mb-3">What Our Clients Say</h2>
            <p className="body-lg">Real feedback from property owners who trust Mursen.</p>
          </div>
          <div className="space-y-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="card p-8 relative hover:border-primary-200 transition-colors duration-300">
                <Quote className="w-8 h-8 text-primary-200 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-slate-600 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 px-6 bg-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="w-12 h-12 text-accent-400 mx-auto mb-6" />
          <h2 className="heading-lg text-white mb-4">The Numbers Speak</h2>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-4xl font-extrabold text-accent-400">24</div>
              <div className="text-sm text-slate-300 mt-1">Properties Managed</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-accent-400">0</div>
              <div className="text-sm text-slate-300 mt-1">Emergencies in 2025</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-accent-400">98%</div>
              <div className="text-sm text-slate-300 mt-1">On-Time Service</div>
            </div>
          </div>
          <div className="mt-10">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
            >
              Join Them — Book Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
