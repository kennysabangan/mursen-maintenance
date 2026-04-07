import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Search, Wrench, Clock, Shield, Users, Home } from 'lucide-react';

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
      '4hr emergency response SLA',
      'Full Vendor Concierge (big jobs managed)',
      'Quarterly owner strategy call',
      'Property performance analytics',
    ],
  },
];

const steps = [
  {
    icon: Search,
    title: 'Free Assessment',
    subtitle: 'Step 1',
    description: 'Our certified technicians conduct a comprehensive 75-point inspection. Within 24 hours, you receive a detailed photo report — no obligation, no pressure.',
    details: [
      'Takes 2-3 hours on-site',
      'Photo documentation of every issue',
      'Prioritized by urgency and cost',
      'Digital PDF within 24 hours',
      'Zero obligation, no pressure sales',
    ],
    color: 'brand',
  },
  {
    icon: Users,
    title: 'Choose Your Plan',
    subtitle: 'Step 2',
    description: 'All plans are month-to-month. Cancel anytime. No lock-in contracts. Founding pricing locked for your first 12 months.',
    details: [
      'Essential: $299/mo',
      'Complete: $399/mo (most popular)',
      'Premium: $599/mo',
      'Founding pricing locked for 12 months',
      '30-day money-back guarantee',
    ],
    color: 'teal',
  },
  {
    icon: Clock,
    title: 'Hands-Free Service',
    subtitle: 'Step 3',
    description: 'We schedule, repair, coordinate vendors, and provide monthly reports. You get peace of mind without lifting a finger.',
    details: [
      'Dedicated technician who knows your property',
      '24/7 hotline for urgent issues',
      'You pick how often you hear from us',
      'Monthly reports with photos',
      'Vendor Concierge handles all projects',
    ],
    color: 'orange',
  },
];

export default function HowItWorks() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'How It Works | Mursen Maintenance - Simple Process';
  const seoDescription = 'Learn how Mursen Maintenance works: 1) Free 75-point assessment, 2) Choose your plan, 3) Hands-free maintenance. Simple, transparent property care in Covington KY.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="property maintenance process, how maintenance works, Covington property care" />
        <link rel="canonical" href={`${siteUrl}/how-it-works`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/how-it-works`} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="Mursen Maintenance" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Mursen Maintenance Services',
            'description': seoDescription,
            'provider': {
              '@type': 'LocalBusiness',
              'name': 'Mursen Maintenance',
              'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'Covington',
                'addressRegion': 'KY'
              }
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-brand-600 text-white py-24 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <Home className="w-4 h-4" />
            Simple, Transparent Process
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h1>
          <p className="text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
            Three clear steps. No hidden processes. Complete transparency from start to finish.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="relative">
                  <div className="bg-stone-50 rounded-2xl p-8 h-full border border-stone-100 hover:shadow-card-hover transition-shadow duration-400">
                    <div className={`w-12 h-12 bg-${step.color}-50 rounded-xl flex items-center justify-center mb-5`}>
                      <StepIcon className={`w-6 h-6 text-${step.color}-600`} />
                    </div>
                    <span className={`inline-flex items-center justify-center bg-${step.color}-50 text-${step.color}-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4`}>
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                    <p className="text-stone-500 leading-relaxed mb-6 text-sm">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-stone-600">
                          <Check className={`w-4 h-4 text-${step.color}-500 flex-shrink-0 mt-0.5`} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 md:py-28 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Choose Your Level of Coverage</h2>
            <p className="text-lg text-stone-500 max-w-xl mx-auto">
              All plans are month-to-month. Cancel anytime. No lock-in contracts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 relative transition-all duration-400 ${
                  plan.popular
                    ? 'bg-stone-900 text-white shadow-card-hover ring-2 ring-brand-500'
                    : 'bg-white border border-stone-200 shadow-soft hover:shadow-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wider">
                    Best Value
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-stone-900'}`}>{plan.name}</h3>
                <div className={`mb-5 text-sm ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>
                  {plan.popular ? 'For active rental owners' : 'Foundation coverage'}
                </div>

                <div className="mb-7">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.popular ? 'text-white' : 'text-stone-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-base ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>/mo</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-brand-400' : 'text-brand-500'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-stone-300' : 'text-stone-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/assessment"
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-glow-brand'
                      : 'bg-stone-900 hover:bg-brand-600 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise callout */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-50 rounded-2xl p-10 md:p-14 border border-brand-100">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-brand-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-3">Our 30-Day Satisfaction Promise</h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Try any plan for 30 days. If you're not completely satisfied, we'll refund every penny. No questions asked, no hard feelings. We're confident in our work — and we prove it by putting your money back if we fall short.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> Cancel any time</span>
                  <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> No lock-in contracts</span>
                  <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> Founding pricing protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to stop managing maintenance?</h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            Start with a free 75-point assessment and see exactly where your property stands.
          </p>
          <Link to="/assessment" className="btn-primary-lg px-12 inline-flex">
            Schedule Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
