import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, Search, Wrench, CalendarDays, Users, Clock, MessageSquare, ClipboardCheck, Shield, FileCheck, PhoneCall } from 'lucide-react';

const plans = [
  {
    name: 'Essential',
    price: 299,
    features: [
      'Quarterly 75-point inspections',
      'Seasonal maintenance (gutters, HVAC prep)',
      'Small repairs included (up to $150/visit)',
      'Same technician every visit',
      'Digital photo report',
      'Email support',
      'Monthly property health summary',
    ],
    notIncluded: ['Vendor Concierge', 'Emergency Hotline', 'Deep Clean'],
  },
  {
    name: 'Complete',
    price: 399,
    popular: true,
    features: [
      'Everything in Essential',
      'Quarterly deep-clean coordination',
      'Priority scheduling (48hr SLA)',
      'Vendor Concierge network',
      '24/7 hotline for urgent issues',
      'Quarterly guest-ready certificate',
      'Biannual exterior inspection',
      'Home Systems Passport',
    ],
  },
  {
    name: 'Premium',
    price: 599,
    features: [
      'Everything in Complete',
      'Annual exterior paint coordination',
      'Smart home setup & maintenance',
      'Emergency hotline (4hr response)',
      'Full Vendor Concierge (big jobs managed)',
      'Annual deep clean included',
      'Quarterly owner strategy call',
      'Property performance analytics',
    ],
  },
];

const vendorServices = [
  'Roofing repairs & replacement',
  'HVAC installation & repair',
  'Plumbing emergencies & upgrades',
  'Electrical work',
  'Interior & exterior painting',
  'Carpentry & structural',
  'Appliance repair & replacement',
  'Landscaping & tree removal',
  'Pool maintenance & repair',
  'Turnover cleaning between guests',
  'Smart home installation',
  'Pest control services',
];

const inspectionCategories = [
  { category: 'Roof & Exterior', items: ['Roof condition & potential leaks', 'Gutter functionality & downspout clearance', 'Siding & paint condition', 'Deck/patio safety & condition'] },
  { category: 'Structural & Foundation', items: ['Foundation cracks & settling assessment', 'Structural integrity evaluation', 'Drainage around foundation', 'Window & door seals'] },
  { category: 'HVAC & Mechanical', items: ['HVAC system efficiency & filter check', 'Thermostat calibration', 'Ventilation system assessment', 'Ductwork inspection'] },
  { category: 'Plumbing & Water', items: ['Water heater condition & age', 'Pipe leak detection', 'Water pressure & flow', 'Fixture integrity'] },
  { category: 'Electrical & Safety', items: ['Electrical panel safety', 'Smoke & CO detector testing', 'GFCI outlet functionality', 'Outdoor lighting safety'] },
  { category: 'Interior & Systems', items: ['Appliances functionality check', 'Mold or moisture damage assessment', 'Attic ventilation & insulation', 'Smart home device status'] },
];

export default function HowItWorks() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setExpandedCategory(prev => prev === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary-600 to-slate-900 text-white py-20 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Search className="w-4 h-4" />
            Transparent Process
          </div>
          <h1 className="heading-xl text-white mb-4 text-balance">How It Works</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-balance">
            Three clear steps. No hidden processes. Complete transparency from start to finish.
          </p>
        </div>
      </section>

      {/* Step 1: The Assessment */}
      <section className="section bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                Step 1 — The Assessment
              </div>
              <h2 className="heading-lg text-primary-800 mb-4">Free Property Health Assessment</h2>
              <p className="body-lg mb-6">
                Our certified technicians conduct a comprehensive 75-point inspection of your property, inside and out. Within 24 hours, you receive a detailed photo report highlighting every maintenance item that could impact your rental income or guest satisfaction.
              </p>
              <ul className="space-y-3">
                {[
                  'Takes 2-3 hours on-site',
                  'Photo documentation of all items found',
                  'Prioritized by urgency and impact',
                  'Digital PDF delivery within 24 hours',
                  'No charge, no obligation, no pressure',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <ClipboardCheck className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="font-bold text-slate-800">75-Point Inspection Checklist</h3>
                  <p className="text-sm text-slate-500">Click categories to expand</p>
                </div>
              </div>
              <div className="space-y-2">
                {inspectionCategories.map((cat, idx) => (
                  <div key={cat.category} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleCategory(idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-100 transition-colors cursor-pointer font-medium text-slate-700 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${expandedCategory === idx ? 'rotate-90' : ''}`} />
                        {cat.category}
                      </div>
                      <span className="text-xs text-slate-400">{cat.items.length} items</span>
                    </button>
                    {expandedCategory === idx && (
                      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                        <ul className="space-y-2">
                          {cat.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                              <Check className="w-3.5 h-3.5 text-secondary-500 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: The Plans */}
      <section className="section bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              Step 2 — The Plans
            </div>
            <h2 className="heading-lg text-primary-800 mb-3">Choose Your Protection Level</h2>
            <p className="body-lg">All plans are month-to-month. Cancel anytime. No lock-in contracts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 relative ${
                  plan.popular
                    ? 'bg-primary-800 text-white shadow-2xl ring-4 ring-accent-500 md:-mt-4'
                    : 'bg-white border-2 border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full inline-block mb-4 uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-primary-800'}`}>
                  {plan.name}
                </h3>
                <div className={`mb-6 ${plan.popular ? 'text-slate-300 text-sm' : 'text-slate-500 text-sm'}`}>
                  {plan.popular ? 'Best for active rental property owners' : 'Starter coverage for single properties'}
                </div>
                <div className="mb-6">
                  <span className={`text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-primary-800'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-accent-400' : 'text-secondary-500'}`} />
                      <span className={plan.popular ? 'text-slate-200 text-sm' : 'text-slate-600 text-sm'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.notIncluded && (
                  <div className="mb-8 pt-4 border-t border-white/10">
                    <div className="text-xs text-slate-400 mb-2">Not included:</div>
                    {plan.notIncluded.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="w-3 h-0.5 bg-slate-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to="/assessment"
                  className={`block text-center py-3 px-6 rounded-xl font-bold transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? 'bg-accent-500 hover:bg-accent-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-primary-800 hover:bg-primary-700 text-white hover:shadow-md'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Vendor Concierge */}
          <div className="mt-16 bg-white rounded-2xl p-10 shadow-lg border border-slate-200 max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-primary-600" />
                <h3 className="heading-md text-primary-800">Vendor Concierge Network</h3>
              </div>
              <p className="body-lg">
                You don't need to shop around for reliable contractors. Our pre-vetted network handles everything from emergency repairs to major renovations. We manage the entire project so you don't have to.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vendorServices.map((service) => (
                <div key={service} className="bg-primary-50 border border-primary-100 p-3 rounded-xl text-sm text-primary-700 font-medium text-center hover:bg-primary-100 transition-colors cursor-pointer">
                  {service}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Available on Complete and Premium plans. Standard markup: 0-10% (vs 25-40% industry standard).
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: The Service */}
      <section className="section bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              Step 3 — The Service
            </div>
            <h2 className="heading-lg text-primary-800 mb-3">The Service Experience</h2>
            <p className="body-lg">What it looks like to have your maintenance handled by Mursen.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: Users,
                title: 'Same Technician Every Visit',
                desc: 'Your dedicated technician learns your property and builds a complete maintenance history over time.',
                accent: 'text-primary-600',
                bg: 'bg-primary-50',
              },
              {
                icon: Clock,
                title: '4-Hour Emergency Response',
                desc: 'Urgent issues get immediate attention. Non-urgent: next business day. We're on call 24/7, 365 days.',
                accent: 'text-accent-600',
                bg: 'bg-accent-50',
              },
              {
                icon: MessageSquare,
                title: 'Choose Your Communication',
                desc: 'SMS, email, or full web portal access. Stay informed the way you want, without the noise.',
                accent: 'text-secondary-600',
                bg: 'bg-secondary-50',
              },
              {
                icon: FileCheck,
                title: 'Monthly Owner Reports',
                desc: 'Complete dashboard of all activities, upcoming maintenance, property health metrics, and seasonal tasks ahead.',
                accent: 'text-primary-600',
                bg: 'bg-blue-50',
              },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-pointer group">
                <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-7 h-7 ${item.accent}`} />
                </div>
                <h3 className="heading-md text-primary-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-slate-900 rounded-2xl p-12 text-center text-white">
            <h3 className="heading-lg text-white mb-3">Ready to Stop Managing Maintenance?</h3>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
              Start with a free 75-point assessment and see exactly where your property stands today.
            </p>
            <Link to="/assessment" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-0.5">
              Schedule Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
