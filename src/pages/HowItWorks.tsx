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
      <section className="relative bg-gradient-to-br from-primary-800 to-surface-900 text-white py-28 px-6 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent-500/[0.05] rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <Search className="w-4 h-4" />
            Transparent Process
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">How It Works</h1>
          <p className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto text-balance leading-relaxed">
            Three clear steps. No hidden processes. Complete transparency from start to finish.
          </p>
        </div>
      </section>

      {/* Step 1: The Assessment */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-red-100">
                Step 1 — The Assessment
              </div>
              <h2 className="text-2.5rem md:text-3.5rem font-bold text-surface-900 mb-4 tracking-tight">Free Property Health Assessment</h2>
              <p className="text-lg text-surface-500 leading-relaxed mb-6">
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
                    <span className="text-surface-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-50 rounded-3xl p-8 border border-surface-100">
              <div className="flex items-center gap-3 mb-6">
                <ClipboardCheck className="w-8 h-8 text-primary-700" />
                <div>
                  <h3 className="font-bold text-surface-900">75-Point Inspection Checklist</h3>
                  <p className="text-sm text-surface-400">Click categories to expand</p>
                </div>
              </div>
              <div className="space-y-2">
                {inspectionCategories.map((cat, idx) => (
                  <div key={cat.category} className="border border-surface-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleCategory(idx)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-surface-50 transition-colors cursor-pointer font-medium text-surface-700 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${expandedCategory === idx ? 'rotate-90' : ''}`} />
                        {cat.category}
                      </div>
                      <span className="text-xs text-surface-400">{cat.items.length} items</span>
                    </button>
                    {expandedCategory === idx && (
                      <div className="px-4 py-3 bg-surface-50 border-t border-surface-100">
                        <ul className="space-y-2">
                          {cat.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-surface-600">
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
      <section className="py-24 px-6 bg-surface-50/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border border-accent-100">
              Step 2 — The Plans
            </div>
            <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-surface-900 mb-3">Choose Your Protection Level</h2>
            <p className="text-lg text-surface-500 max-w-xl mx-auto leading-relaxed">All plans are month-to-month. Cancel anytime. No lock-in contracts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 lg:p-10 relative transition-all duration-400 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary-800 to-surface-900 text-white shadow-elevated ring-1 ring-accent-500/30 md:-mt-4 hover:scale-[1.02]'
                    : 'bg-white border border-surface-100 shadow-soft hover:shadow-medium hover:-translate-y-1'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wider shadow-button">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 tracking-tight ${plan.popular ? 'text-white' : 'text-surface-900'}`}>
                  {plan.name}
                </h3>
                <div className={`mb-6 text-sm ${plan.popular ? 'text-surface-400' : 'text-surface-400'}`}>
                  {plan.popular ? 'Best for active rental property owners' : 'Starter coverage for single properties'}
                </div>
                <div className="mb-8">
                  <span className={`text-5xl font-extrabold tracking-tight ${plan.popular ? 'text-white' : 'text-surface-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-lg text-surface-400`}>/mo</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-accent-400' : 'text-secondary-500'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-surface-300' : 'text-surface-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.notIncluded && (
                  <div className="mb-8 pt-4 border-t border-white/10">
                    <div className="text-xs text-surface-400 mb-2">Not included:</div>
                    {plan.notIncluded.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-surface-500">
                        <span className="w-3 h-0.5 bg-surface-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to="/assessment"
                  className={`block text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5'
                      : 'bg-surface-900 hover:bg-primary-800 text-white hover:shadow-medium hover:-translate-y-0.5'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Vendor Concierge */}
          <div className="mt-16 bg-white rounded-3xl p-8 lg:p-10 shadow-soft border border-surface-100 max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-primary-700" />
                <h3 className="text-1.875rem font-bold text-surface-900 tracking-tight">Vendor Concierge Network</h3>
              </div>
              <p className="text-lg text-surface-500 leading-relaxed">
                You don't need to shop around for reliable contractors. Our pre-vetted network handles everything from emergency repairs to major renovations. We manage the entire project so you don't have to.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vendorServices.map((service) => (
                <div key={service} className="bg-primary-50 border border-primary-100 p-4 rounded-xl text-sm text-primary-800 font-medium text-center hover:bg-primary-100 transition-colors cursor-default">
                  {service}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-surface-400">
              Available on Complete and Premium plans. Standard markup: 0-10% (vs 25-40% industry standard).
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: The Service */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border border-secondary-100">
              Step 3 — The Service
            </div>
            <h2 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-surface-900 mb-3">The Service Experience</h2>
            <p className="text-lg text-surface-500 leading-relaxed max-w-xl mx-auto">What it looks like to have your maintenance handled by Mursen.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: Users,
                title: 'Same Technician Every Visit',
                desc: 'Your dedicated technician learns your property and builds a complete maintenance history over time.',
                accent: 'text-primary-700',
                bg: 'bg-primary-50',
              },
              {
                icon: Clock,
                title: '4-Hour Emergency Response',
                desc: 'Urgent issues get immediate attention. Non-urgent: next business day. We are on call 24/7, 365 days.',
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
                accent: 'text-primary-700',
                bg: 'bg-blue-50',
              },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl bg-white border border-surface-100 shadow-soft hover:shadow-medium hover:border-surface-200 transition-all duration-300 cursor-default group">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-7 h-7 ${item.accent}`} />
                </div>
                <h3 className="text-1.5rem font-bold text-surface-900 mb-2 tracking-tight">{item.title}</h3>
                <p className="text-surface-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-primary-800 to-surface-900 rounded-3xl p-12 text-center text-white">
            <h3 className="text-2.5rem md:text-3.5rem font-bold tracking-tight text-white mb-3">Ready to Stop Managing Maintenance?</h3>
            <p className="text-lg text-surface-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Start with a free 75-point assessment and see exactly where your property stands today.
            </p>
            <Link to="/assessment" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 px-10 rounded-xl text-lg shadow-button hover:shadow-button-hover transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
              Schedule Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
