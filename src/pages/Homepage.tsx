import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Star, Award, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-primary-600 via-primary-700 to-slate-900 text-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-slate-900/90 z-0" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-0 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4 text-accent-400" />
            Trusted by 24+ Rental Properties in Covington, KY
          </div>
          
          <h1 className="heading-xl text-white mb-6 max-w-4xl mx-auto text-balance">
            Your Rentals Stay Guest-Ready.{' '}
            <span className="text-accent-400">We Guarantee It.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-slate-300 leading-relaxed text-balance">
            Mursen Maintenance keeps short-term rental properties perfectly maintained so you get 5-star reviews, zero maintenance surprises, and full occupancy — all for a predictable monthly fee.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/assessment"
              className="btn-primary text-lg px-10 py-5"
            >
              <span className="flex items-center gap-2">
                Book Free Property Assessment
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link
              to="/portfolio"
              className="btn-secondary text-lg px-10 py-5"
            >
              See Our 24 Managed Properties <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
          </div>
          
          {/* Trust signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: ShieldCheck, text: 'Fully Insured & Bonded' },
              { icon: Star, text: '5.0 Average Guest Rating' },
              { icon: Shield, text: 'Triple Guarantee' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                <item.icon className="w-5 h-5 text-accent-400 flex-shrink-0" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="badge bg-red-100 text-red-700 mb-4">
              <span>⚠</span> The Problem
            </div>
            <h2 className="heading-lg text-primary-800 mb-4">
              Maintenance is Killing Your Rental Profit
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              { title: 'Emergency Repair Costs', desc: 'Last-minute repairs between guests cost $200-500 in emergency fees', severity: 'high' },
              { title: 'Damaged Reviews', desc: 'Poor maintenance = 1-2 star reviews, lost bookings, reduced revenue', severity: 'high' },
              { title: 'Unreliable Contractors', desc: 'Finding reliable contractors who show up and do it right = nearly impossible', severity: 'medium' },
              { title: 'Preventable Emergencies', desc: 'Preventable issues become $2,000+ emergencies that eat your profit margin', severity: 'high' },
              { title: 'Time Drain', desc: 'Your time wasted on calls, quotes, vetting, and follow-up instead of growing your portfolio', severity: 'medium' },
            ].map((item) => (
              <div key={item.title} className="card p-6 flex items-start gap-4">
                <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${item.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`} />
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-primary-800 mb-3">
              We Keep 24 Rental Properties Perfectly Maintained
            </h2>
            <p className="body-lg">
              All properties on our Mursen Property Guardian plan. Here is the proof.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 24 }, (_, i) => {
              const types = ['Single-Family', 'Duplex', 'Triplex', 'Condo'];
              const neighborhoods = ['Highland Ave', 'Riverfront', 'Main Street', 'Pike Street', 'Madison', 'Lewisburg'];
              return (
                <div key={i} className="card p-4 text-center hover:scale-[1.02] transition-transform duration-200">
                  <div className="w-full h-16 bg-gradient-to-br from-primary-100 to-secondary-50 rounded-lg mb-3 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mb-1">{neighborhoods[i % 6]}</div>
                  <div className="text-xs text-slate-500 mb-2">{types[i % 4]}</div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <span className="badge bg-secondary-100 text-secondary-700">Guest-ready</span>
                    <span className="badge bg-accent-100 text-accent-700">★ 5.0</span>
                  </div>
                  <div className="mt-2 text-xs text-secondary-600 font-medium">Zero emergencies in 2025</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-primary-800 mb-3">
              Mursen Property Guardian — Maintenance Made Simple
            </h2>
            <p className="body-lg">Choose the plan that fits your portfolio. Month-to-month. Cancel anytime.</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            {[
              {
                name: 'Essential',
                price: 299,
                desc: 'Core maintenance coverage',
                features: ['Basic inspections', 'Seasonal maintenance', 'Small repairs included', 'Monthly property summary'],
              },
              {
                name: 'Complete',
                price: 399,
                desc: 'Most popular for rental owners',
                features: ['Everything in Essential', 'Quarterly deep-clean', 'Priority scheduling (48hr)', 'Vendor coordination', '24/7 hotline for urgent issues', 'Home Systems Passport'],
                highlighted: true,
              },
              {
                name: 'Premium',
                price: 599,
                desc: 'Full-service property care',
                features: ['Everything in Complete', 'Annual exterior paint coordination', 'Smart home maintenance', 'Emergency hotline (4hr response)', 'Vendor Concierge (big jobs)', 'Quarterly owner strategy call'],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 relative ${
                  tier.highlighted
                    ? 'bg-primary-800 text-white shadow-2xl ring-4 ring-accent-500 md:-mt-4'
                    : 'bg-white border-2 border-slate-200'
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full inline-block mb-4 uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-1 ${tier.highlighted ? 'text-white' : 'text-primary-800'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-4 ${tier.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>{tier.desc}</p>
                <div className="mb-6">
                  <span className={`text-5xl font-extrabold ${tier.highlighted ? 'text-white' : 'text-primary-800'}`}>
                    ${tier.price}
                  </span>
                  <span className={`text-lg ${tier.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-accent-400' : 'text-secondary-500'}`} />
                      <span className={tier.highlighted ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/assessment"
                  className={`block text-center py-3 px-6 rounded-xl font-bold transition-all duration-200 cursor-pointer ${
                    tier.highlighted
                      ? 'bg-accent-500 hover:bg-accent-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-primary-800 hover:bg-primary-700 text-white hover:shadow-md'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Bonuses Stack */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-200 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Award className="w-4 h-4" />
                Total Bonus Value: $1,245 — Yours Free
              </div>
              <h3 className="heading-md text-primary-800">When You Join Today</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { name: 'Free Property Assessment', value: '$399' },
                { name: 'Home Systems Passport (digital history)', value: '$199' },
                { name: 'Vendor Concierge Network Access', value: '$149' },
                { name: '24/7 Emergency Hotline', value: '$299' },
                { name: 'Quarterly Guest-Ready Reports', value: '$199' },
              ].map((bonus, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                    <span className="font-medium text-slate-700">{bonus.name}</span>
                  </div>
                  <span className="bg-secondary-50 text-secondary-700 px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                    {bonus.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Triple Guarantee */}
      <section className="py-16 px-6 bg-primary-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="heading-lg text-white mb-3">The Triple Guarantee</h2>
            <p className="text-slate-300 text-lg">We put our money where our mouth is.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: 'We\'re Late?', desc: 'You get a free month of service', color: 'text-accent-400' },
              { icon: Award, title: 'Unsatisfied?', desc: 'Full refund within 30 days', color: 'text-accent-400' },
              { icon: Check, title: 'Missed Something?', desc: 'We fix it — completely free', color: 'text-accent-400' },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 cursor-pointer">
                <item.icon className={`w-12 h-12 ${item.color} mx-auto mb-4`} />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-400">
            Capacity limited to 50 properties per quarter. Next intake:{' '}
            <span className="text-accent-400 font-semibold">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-primary-800 mb-3">How It Works</h2>
            <p className="body-lg">Three simple steps to a hands-off rental maintenance experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Free Property Assessment',
                desc: 'We inspect 75+ items inside and out. You get a full report with photos within 24 hours.',
                color: 'bg-red-500',
              },
              {
                step: '2',
                title: 'Choose Your Plan',
                desc: 'Pick Essential, Complete, or Premium. Lock in founding pricing for 12 months.',
                color: 'bg-accent-500',
              },
              {
                step: '3',
                title: 'Automatic Maintenance',
                desc: 'We schedule inspections, handle repairs, coordinate vendors. You get monthly reports. Zero effort.',
                color: 'bg-secondary-500',
              },
            ].map((step, i) => (
              <div key={step.step} className="text-center group">
                <div className={`w-16 h-16 ${step.color} text-white text-3xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.step}
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute w-24 border-t-2 border-dashed border-slate-300 top-1/2 left-1/2 translate-x-12" />
                )}
                <h3 className="heading-md text-primary-800 mb-3">
                  <span className="text-sm uppercase tracking-wider text-accent-600 font-semibold">Step {step.step}</span>
                  <br />
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed max-w-sm mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-primary-800 mb-3">What's Included</h2>
            <p className="body-lg">Everything you need to keep your rental portfolio in perfect condition.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: '75-Point Inspection', icon: '🔍' },
              { name: 'Seasonal Maintenance', icon: '🌿' },
              { name: 'Small Repairs', icon: '🔧' },
              { name: 'Same Technician', icon: '👤' },
              { name: 'Digital Reporting', icon: '📱' },
              { name: 'Vendor Concierge', icon: '🤝' },
              { name: '24/7 Hotline', icon: '📞' },
              { name: 'Guest-Ready Certs', icon: '🏅' },
              { name: 'Smart Home Setup', icon: '🏠' },
              { name: 'Annual Deep Clean', icon: '✨' },
              { name: 'Emergency SLA', icon: '⚡' },
              { name: 'Dedicated Portal', icon: '📊' },
            ].map((feature) => (
              <div key={feature.name} className="card p-6 text-center group hover:bg-primary-50 transition-colors duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h4 className="font-semibold text-slate-700 text-sm">{feature.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-br from-primary-600 via-primary-700 to-slate-900 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg text-white mb-4 max-w-3xl mx-auto text-balance">
            Stop Wasting Time on Maintenance.<br />
            <span className="text-accent-400">Focus on Your Guests.</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join 24 rental property owners who already sleep soundly knowing Mursen has it covered.
          </p>
          <Link to="/assessment" className="btn-primary text-lg px-12 py-5">
            <span className="flex items-center gap-2">
              Book Free Assessment
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary-400" />
              Fully Insured
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-secondary-400" />
              Bonded Technicians
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary-400" />
              Covington, KY
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
