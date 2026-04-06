import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Star, Building2, Home, ShieldCheck, Users, Award, TrendingUp, MapPin, ChevronRight, Wrench, FileText, PhoneCall, Clock, Gift } from 'lucide-react';

const featuredProperties = [
  { neighborhood: 'Highland Ave', type: 'Single-Family', units: '1 unit', since: 'Jan 2024', img: 'https://images.unsplash.com/photo-1600596885409-e4a43e1e7a76?w=600&q=80&auto=format&fit=crop' },
  { neighborhood: 'Riverfront', type: 'Duplex', units: '2 units', since: 'Mar 2024', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80&auto=format&fit=crop' },
  { neighborhood: 'Main Street', type: 'Triplex', units: '3 units', since: 'Jun 2024', img: 'https://images.unsplash.com/photo-1560448204-603b3fc33dbc?w=600&q=80&auto=format&fit=crop' },
  { neighborhood: 'Lewisburg', type: 'Condo', units: '1 unit', since: 'Sep 2024', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&auto=format&fit=crop' },
] as const;

export default function Homepage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[92vh] flex items-center bg-surface-900 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596885409-e4a43e1e7a76?w=1920&q=80&auto=format&fit=crop"
            alt="Luxury property exterior"
            className="w-full h-full object-cover opacity-[0.12]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-surface-900/97 via-surface-900/90 to-surface-900/80" />
        </div>
        <div className="glow-orb w-[60vw] h-[60vw] bg-accent-500/[0.04] -top-32 -right-32" />
        <div className="glow-orb w-[40vw] h-[40vw] bg-secondary-500/[0.04] -bottom-24 -left-24" />

        <div className="relative container-app py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Trust badge */}
            <div className="opacity-0 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-accent-400" />
                Trusted by <strong className="text-white">24+ rental properties</strong> in Covington, KY
              </div>
            </div>

            <h1 className="opacity-0 animate-fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight" style={{ animationDelay: '0.1s' }}>
              Your Rentals Stay<br />
              <span className="bg-gradient-to-r from-accent-400 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                Guest-Ready. Guaranteed.
              </span>
            </h1>

            <p className="opacity-0 animate-fade-up text-lg md:text-xl text-surface-400 leading-relaxed mb-10 max-w-2xl" style={{ animationDelay: '0.2s' }}>
              We keep your short-term rental properties perfectly maintained so you get 5-star reviews, zero surprises, and full occupancy — all for a predictable monthly fee.
            </p>

            {/* CTAs */}
            <div className="opacity-0 animate-fade-up flex flex-col sm:flex-row gap-4 mb-14" style={{ animationDelay: '0.3s' }}>
              <Link to="/assessment" className="btn-primary-lg">
                Book Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/portfolio" className="btn-secondary-lg btn-secondary">
                See Our Properties
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust signals row */}
            <div className="opacity-0 animate-fade-up flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-surface-400" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: ShieldCheck, text: 'Fully Insured & Bonded' },
                { icon: Star, text: '5.0 Average Rating' },
                { icon: Award, text: 'Triple Guarantee' },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2">
                  <t.icon className="w-4 h-4 text-secondary-400" />
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SCARCITY BAR ═══════════════ */}
      <div className="bg-accent-500 py-3.5 px-6">
        <div className="container-app flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-semibold text-white">
          <TrendingUp className="w-4 h-4" />
          50 Property Cap This Quarter — <span className="text-white/80 font-normal">Only 26 Spots Remaining</span>
          <span className="opacity-50">|</span>
          Next intake closes soon
        </div>
      </div>

      {/* ═══════════════ PROBLEM SECTION ═══════════════ */}
      <section className="section bg-surface-50">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-red-100 mb-4">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 leading-tight">
                Maintenance is killing<br />your rental profit
              </h2>
              <p className="text-surface-500 text-lg leading-relaxed mb-6">
                Every maintenance issue that slips through the cracks costs you reviews, bookings, and revenue. We eliminate the guesswork.
              </p>

              <ul className="space-y-3">
                {[
                  { text: 'Last-minute repairs between guests cost $200–$500 in emergency fees', severity: 'high' },
                  { text: 'Poor maintenance leads to 1–2 star reviews and lost bookings', severity: 'high' },
                  { text: 'Finding reliable contractors who actually show up is impossible', severity: 'mid' },
                  { text: 'Preventable issues become $2,000+ emergencies', severity: 'high' },
                  { text: 'Your time wasted on calls, quotes, vetting, and follow-up', severity: 'mid' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.severity === 'high' ? 'bg-red-500' : 'bg-amber-400'}`} />
                    <span className="text-surface-600 leading-relaxed text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual card - simplified */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-surface-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900 text-sm">Annual Maintenance Cost</div>
                    <div className="text-xs text-surface-400">Without a proactive plan</div>
                  </div>
                </div>
                <div className="text-4xl font-bold text-red-500 mb-4 tracking-tight">$12,000+</div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Emergency repairs', value: '$4,200', pct: 'w-[85%]' },
                    { label: 'Lost bookings (reviews)', value: '$3,800', pct: 'w-[76%]' },
                    { label: 'Vacant nights between fixes', value: '$2,400', pct: 'w-[48%]' },
                    { label: 'Your time managing it', value: '$1,600', pct: 'w-[32%]' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-surface-500">{item.label}</span>
                        <span className="font-semibold text-surface-700">{item.value}</span>
                      </div>
                      <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full ${item.pct}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating comparison */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-md p-4 border border-surface-50 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-50 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-secondary-500" />
                  </div>
                  <div>
                    <div className="font-medium text-surface-900 text-sm">With Mursen</div>
                    <div className="text-xl text-secondary-600 font-bold tracking-tight">$3,588<span className="text-xs text-surface-400 font-normal">/yr</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-secondary-50 text-secondary-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-secondary-100 mb-6">
              <Building2 className="w-3.5 h-3.5" />
              Proven Track Record
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 mb-4">
              We keep rental properties<br />
              <span className="text-surface-400 font-light">perfectly maintained</span>
            </h2>
            <p className="text-lg text-surface-500 max-w-2xl mx-auto">
              24+ properties across Covington. Zero maintenance emergencies. 5.0 guest satisfaction.
            </p>
          </div>

          {/* Stats row - more elegant */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {[
              { icon: Building2, value: '24+', label: 'Properties Managed', color: 'text-primary-700' },
              { icon: Star, value: '5.0', label: 'Avg Guest Rating', color: 'text-accent-500', suffix: '★' },
              { icon: Shield, value: '0', label: 'Emergencies (2025)', color: 'text-secondary-500' },
              { icon: Clock, value: '48hr', label: 'Guest-Ready Guarantee', color: 'text-primary-700' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 text-center border border-surface-100 shadow-sm hover:shadow-md transition-all duration-300">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3`} />
                <div className="text-4xl font-bold text-surface-900 mb-1 tracking-tight">
                  {stat.value}{stat.suffix || ''}
                </div>
                <div className="text-sm text-surface-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Featured properties - reduced to 4 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredProperties.map((p) => (
              <div key={p.neighborhood} className="group bg-white rounded-2xl border border-surface-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="h-48 bg-surface-100 relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.neighborhood} property`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-surface-900 shadow-sm">
                      <Star className="w-3 h-3 text-accent-500 fill-accent-500" />
                      5.0
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-semibold text-surface-900 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-surface-400" />
                    {p.neighborhood}
                  </div>
                  <div className="text-sm text-surface-500 mb-2">{p.type} · {p.units}</div>
                  <div className="text-xs text-secondary-600 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Since {p.since}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* "24+" social proof badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-surface-50 border border-surface-200 rounded-2xl px-6 py-3.5">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                    {['SK', 'MT', 'JR', 'LP', 'AC'][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-surface-600">
                <strong className="text-surface-900">24+ property owners</strong> trust Mursen
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium transition-colors group">
              View all managed properties
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Testimonial - more refined */}
          <div className="mt-20 bg-surface-50/80 rounded-3xl p-8 md:p-12 border border-surface-100 max-w-3xl mx-auto">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-surface-700 leading-relaxed mb-8 font-light">
              "Since hiring Mursen, my STR has had zero maintenance complaints. Guests love the quick responses. I sleep better knowing they handle everything proactively."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold">SK</div>
              <div className="text-left">
                <div className="font-semibold text-surface-800">Sarah K.</div>
                <div className="text-sm text-surface-400">Highland Ave · STR Owner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ OFFER / PRICING ═══════════════ */}
      <section className="section-alt">
        <div className="container-app">
          <div className="text-center mb-16">
            <span className="badge bg-accent-50 text-accent-700 mb-6 border border-accent-100">
              <Award className="w-3.5 h-3.5" />
              Grand Slam Offer
            </span>
            <h2 className="heading-2 text-surface-900 mb-4 tracking-tight">
              Maintenance made simple.<br />
              <span className="text-surface-400">Choose your protection level.</span>
            </h2>
            <p className="lead mx-auto">Month-to-month plans. Cancel anytime. No lock-in contracts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {[
              {
                name: 'Essential',
                price: 299,
                desc: 'Core maintenance for single properties',
                features: ['Quarterly 75-point inspections', 'Seasonal maintenance', 'Small repairs up to $150/visit', 'Same tech every visit', 'Monthly property health summary'],
                gradient: '',
              },
              {
                name: 'Complete',
                price: 399,
                desc: 'Best for active rental owners',
                features: ['Everything in Essential', 'Quarterly deep-clean coordination', 'Priority scheduling (48hr SLA)', 'Vendor Concierge network', '24/7 hotline for urgent issues', 'Home Systems Passport', 'Quarterly guest-ready certificate'],
                highlight: true,
                gradient: 'from-primary-800 to-surface-900',
              },
              {
                name: 'Premium',
                price: 599,
                desc: 'Full-service for multi-property owners',
                features: ['Everything in Complete', 'Annual exterior paint coordination', 'Smart home setup & maintenance', '4hr emergency response SLA', 'Full vendor project management', 'Quarterly owner strategy call', 'Property performance analytics'],
                gradient: '',
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`${
                  tier.highlight
                    ? 'pricing-card-highlighted'
                    : 'pricing-card-default'
                }`}
              >
                {tier.highlight && (
                  <div className="pricing-popular-badge">Most Popular</div>
                )}

                <h3 className={`text-xl font-bold mb-1 tracking-tight ${tier.highlight ? 'text-white' : 'text-surface-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-surface-400' : 'text-surface-400'}`}>{tier.desc}</p>

                <div className="mb-8">
                  <span className={`text-5xl font-extrabold tracking-tight ${tier.highlight ? 'text-white' : 'text-surface-900'}`}>${tier.price}</span>
                  <span className={`text-lg ml-1 ${tier.highlight ? 'text-surface-400' : 'text-surface-400'}`}>/mo</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-accent-400' : 'text-secondary-500'}`} />
                      <span className={`text-sm ${tier.highlight ? 'text-surface-300' : 'text-surface-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/assessment"
                  className={`block text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    tier.highlight
                      ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5'
                      : 'bg-surface-900 hover:bg-primary-800 text-white hover:shadow-medium hover:-translate-y-0.5'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Bonus Stack */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-surface-100 shadow-soft">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Gift className="w-4 h-4" />
                  Total Bonus Value: $1,245 — Included Free Today
                </div>
                <h3 className="heading-3 text-surface-900 tracking-tight">When You Join</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: 'Free Property Assessment', value: '$399' },
                  { name: 'Home Systems Passport', value: '$199' },
                  { name: 'Vendor Concierge Network', value: '$149' },
                  { name: '24/7 Emergency Hotline', value: '$299' },
                  { name: 'Quarterly Guest-Ready Reports', value: '$199' },
                ].map((bonus, i) => (
                  <div key={i} className="flex items-center justify-between bg-surface-50 p-4 rounded-2xl border border-surface-100">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-surface-700">{bonus.name}</span>
                    </div>
                    <span className="bg-secondary-50 text-secondary-700 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{bonus.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRIPLE GUARANTEE ═══════════════ */}
      <section className="section-dark">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="badge bg-accent-500/20 text-accent-400 mb-6">
              <Shield className="w-4 h-4" />
              No-Risk Guarantee
            </span>
            <h2 className="heading-2 text-white mb-3 tracking-tight">The Triple Guarantee</h2>
            <p className="text-surface-400 text-lg">We put our money where our mouth is.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: PhoneCall, title: "We're late?", desc: 'You get a free month of service.' },
              { icon: Award, title: 'Unsatisfied?', desc: 'Full refund within 30 days. No questions.' },
              { icon: ShieldCheck, title: 'Missed something?', desc: 'We fix it free. Always.' },
            ].map((g) => (
              <div key={g.title} className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300 group">
                <g.icon className="w-10 h-10 text-accent-400 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{g.title}</h3>
                <p className="text-surface-400">{g.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-surface-500">
            Capacity limited to 50 properties per quarter. Next intake:{' '}
            <span className="text-accent-400 font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </p>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-surface-900 mb-4 tracking-tight">How It Works</h2>
            <p className="lead mx-auto">Three steps. Zero complexity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Free Assessment', desc: '75-point inspection. Photo report delivered in 24 hours.', color: 'text-red-600', bg: 'bg-red-50' },
              { step: 2, title: 'Choose Your Plan', desc: 'Essential, Complete, or Premium. Founding pricing locked for 12 months.', color: 'text-accent-600', bg: 'bg-accent-50' },
              { step: 3, title: 'Hands-Free Maintenance', desc: 'We schedule, repair, coordinate. You get monthly reports. Done.', color: 'text-secondary-600', bg: 'bg-secondary-50' },
            ].map((s) => (
              <div key={s.step} className="text-center group">
                <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-medium transition-all duration-300 group-hover:scale-105`}>
                  <span className={`text-3xl font-extrabold ${s.color}`}>{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3 tracking-tight">{s.title}</h3>
                <p className="text-surface-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES GRID ═══════════════ */}
      <section className="section-alt">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-surface-900 mb-3 tracking-tight">What Is Included</h2>
            <p className="lead mx-auto">Complete care for your rental portfolio.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: '75-Point Inspection', icon: Wrench },
              { name: 'Seasonal Care', icon: Home },
              { name: 'Small Repairs', icon: FileText },
              { name: 'Same Tech Every Visit', icon: Users },
              { name: 'Digital Reports', icon: FileText },
              { name: 'Vendor Concierge', icon: PhoneCall },
              { name: '24/7 Hotline', icon: PhoneCall },
              { name: 'Guest-Ready Certs', icon: Award },
              { name: 'Smart Home Setup', icon: Home },
              { name: 'Annual Deep Clean', icon: Users },
              { name: 'Emergency SLA', icon: Shield },
              { name: 'Owner Portal', icon: FileText },
            ].map((f) => (
              <div key={f.name} className="bg-white rounded-2xl p-6 text-center border border-surface-100 shadow-soft hover:shadow-medium hover:bg-primary-50/50 transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 bg-primary-800/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-800/10 transition-colors">
                  <f.icon className="w-5 h-5 text-primary-700" />
                </div>
                <h4 className="font-semibold text-surface-700 text-sm">{f.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="section bg-surface-900 text-white relative overflow-hidden">
        <div className="glow-orb w-[80vw] h-[80vw] bg-accent-500/[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative container-app text-center">
          <h2 className="heading-2 text-white mb-4 tracking-tight">
            Stop Managing Maintenance.<br />
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">Start Scaling Your Portfolio.</span>
          </h2>
          <p className="text-lg text-surface-400 mb-10 max-w-xl mx-auto">
            Join 24 rental property owners who sleep soundly knowing Mursen has it covered.
          </p>
          <Link to="/assessment" className="btn-primary-lg px-12">
            Book Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-surface-500">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-secondary-400" /> Insured</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-secondary-400" /> Bonded</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-secondary-400" /> Covington, KY</span>
          </div>
        </div>
      </section>
    </div>
  );
}
