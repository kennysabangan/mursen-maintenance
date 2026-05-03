import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Search, Clock, Shield, Users, Home } from 'lucide-react';

const plans = [
  {
    name: 'Lawn Plus',
    price: 109,
    note: '/mo (Apr–Oct) · $59/mo (Nov–Mar)',
    features: ['Weekly mow + edge + blow', 'Seasonal cleanups included', 'Gutter check each visit'],
  },
  {
    name: 'Handyman Plus',
    price: 149,
    features: ['1 visit/month (2 hrs)', '5-day scheduling window', 'Same technician every visit'],
  },
  {
    name: 'Starter',
    price: 199,
    features: ['1 handyman visit/mo (2 hrs)', 'Biweekly lawn mowing', 'Same technician every visit', 'Monthly property summary'],
  },
  {
    name: 'Home Care',
    price: 479,
    popular: true,
    features: ['1 visit (4 hrs handyman)', 'Weekly lawn mowing + edging', 'Monthly window cleaning (exterior)', 'Annual power wash', 'Priority scheduling (48hr SLA)', '24/7 hotline for urgent issues'],
  },
  {
    name: 'Property Manager',
    price: 279,
    note: '/unit/mo',
    features: ['Rental-unit optimized', 'Priority scheduling', 'Tenant turnover support', '3+ units: $249 · 5+: $229'],
  },
];

const steps = [
  {
    icon: Search,
    title: 'Pick Your Service',
    subtitle: 'Step 1',
    description: 'Browse lawn, windows, power wash, handyman. Book online or call us.',
    details: [
      'View transparent pricing online',
      'Book à la carte or subscribe',
      'Free assessment available',
      'Same-day or next-day scheduling',
    ],
  },
  {
    icon: Users,
    title: 'We Show Up',
    subtitle: 'Step 2',
    description: 'Professional, on-time, fully insured. Same quality every time.',
    details: [
      'Same technician every visit',
      'Fully insured & bonded team',
      'On-time, every time',
      'Photo documentation of work',
    ],
  },
  {
    icon: Clock,
    title: 'Subscribe & Save',
    subtitle: 'Step 3',
    description: 'Love the work? Switch to a monthly plan. One flat fee, everything handled.',
    details: [
      'Plans from $109/mo',
      'Cancel anytime, no contracts',
      '30-day money-back guarantee',
      'Volume discounts for investors',
    ],
  },
];

export default function HowItWorks() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'How It Works | Mursen Maintenance - Home Maintenance Subscription';
  const seoDescription = 'How Mursen works: 1) Pick your service, 2) We show up, 3) Subscribe. Lawn care, window cleaning, power washing, handyman. Serving Covington KY and Cincinnati metro.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
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
      </Helmet>

      <div className="min-h-screen bg-white">

        {/* Header */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-surface-900 mb-4">How It Works</h1>
            <p className="text-lg text-surface-500 max-w-lg mx-auto">
              Three steps. Zero complexity. Your house, handled.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-surface-100" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                      <StepIcon className="w-6 h-6 text-brand-600" />
                    </div>
                    <span className="inline-block bg-primary-50 text-brand-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-surface-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-surface-500 leading-relaxed mb-5">{step.description}</p>
                    <ul className="space-y-2.5">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-surface-600">
                          <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-surface-900 mb-3">Choose Your Plan</h2>
              <p className="text-lg text-surface-500 max-w-md mx-auto">
                All plans are month-to-month. Cancel anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-6 relative transition-all duration-200 ${
                    plan.popular
                      ? 'border-2 border-brand-300 bg-white'
                      : 'bg-white border border-surface-100'
                  }`}
                  style={{ boxShadow: plan.popular ? '0 4px 24px rgba(22,163,74,0.1)' : '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-5 py-1.5 rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-base font-bold mb-1 text-surface-900">{plan.name}</h3>
                  <p className="text-xs text-surface-500 mb-5">
                    {plan.popular ? 'The full package' : plan.name === 'Property Manager' ? 'For landlords & investors' : plan.name === 'Lawn Plus' ? 'Weekly lawn maintenance' : plan.name === 'Handyman Plus' ? 'Monthly handyman' : 'Essential coverage'}
                  </p>

                  <div className="mb-6">
                    <span className={`text-3xl font-extrabold tracking-tight ${plan.popular ? 'text-brand-700' : 'text-surface-900'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-xs ml-1 ${plan.popular ? 'text-brand-600' : 'text-surface-400'}`}>{plan.note || '/mo'}</span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-brand-600' : 'text-surface-400'}`} />
                        <span className="text-xs text-surface-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/assessment"
                    className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px] ${
                      plan.popular
                        ? 'bg-brand-600 hover:bg-brand-700 text-white'
                        : 'bg-surface-900 hover:bg-brand-600 text-white'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="py-16 md:py-24 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-50 rounded-2xl p-8 md:p-12 border border-primary-100">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-brand-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-surface-900 mb-2">30-Day Satisfaction Promise</h3>
                  <p className="text-sm text-surface-600 leading-relaxed mb-5">
                    Try any plan for 30 days. Not satisfied? Full refund. No questions asked.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> Cancel any time</span>
                    <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> No lock-in contracts</span>
                    <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> Money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Ready to stop juggling contractors?</h2>
            <p className="text-lg text-surface-500 mb-8 max-w-lg mx-auto">
              Start with a free assessment or book a single service today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/assessment" className="btn-primary-lg px-12 inline-flex justify-center">
                Book Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/portfolio" className="btn-secondary-lg inline-flex justify-center">
                View Services & Pricing
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
