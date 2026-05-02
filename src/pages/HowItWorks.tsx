import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Search, Clock, Shield, Users, Home } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 199,
    features: [
      '1 handyman visit per month (2 hrs)',
      'Bi-weekly lawn mowing + edging',
      'Same technician every visit',
      'Monthly property summary',
    ],
  },
  {
    name: 'Home Care',
    price: 349,
    popular: true,
    features: [
      '2 handyman visits per month (4 hrs each)',
      'Weekly lawn mowing + edging + blowing',
      'Monthly window cleaning (exterior)',
      'Bi-annual power wash (driveway, walkways)',
      'Priority scheduling (48hr SLA)',
      '24/7 hotline for urgent issues',
    ],
  },
  {
    name: 'Property Manager',
    price: 279,
    features: [
      'Everything in Home Care',
      'Priority same/next-day scheduling',
      'Tenant turnover support',
      'Dedicated point of contact',
      '3+ units: $249/unit · 5+: $229/unit',
    ],
  },
];

const steps = [
  {
    icon: Search,
    title: 'Pick Your Service',
    subtitle: 'Step 1',
    description: 'Browse lawn, windows, power wash, handyman. Book online or call us - single service or monthly plan.',
    details: [
      'View transparent pricing online',
      'Book à la carte or subscribe',
      'Free assessment available',
      'Same-day or next-day scheduling',
      'No obligation, no pressure',
    ],
    color: 'brand',
  },
  {
    icon: Users,
    title: 'We Show Up',
    subtitle: 'Step 2',
    description: 'Professional, on-time, fully insured. Same quality every time - whether it\'s a one-time job or a monthly plan.',
    details: [
      'Same technician every visit',
      'Fully insured & bonded team',
      'On-time, every time',
      'Photo documentation of completed work',
      'Satisfaction guaranteed',
    ],
    color: 'teal',
  },
  {
    icon: Clock,
    title: 'Subscribe',
    subtitle: 'Step 3',
    description: 'Love the work? Switch to a monthly plan. One flat fee, everything handled — lawn, windows, power wash, handyman.',
    details: [
      'Plans from $109/mo',
      'One flat monthly fee',
      'Cancel anytime, no contracts',
      '30-day money-back guarantee',
      'Property Manager volume discounts',
    ],
    color: 'orange',
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
        <meta name="keywords" content="home maintenance process, how it works, lawn care subscription, handyman plan, Cincinnati property care, Covington" />
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
            Three steps. No hidden processes. Your house, handled.
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
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Choose Your Plan</h2>
            <p className="text-lg text-stone-500 max-w-xl mx-auto">
              All plans are month-to-month. Cancel anytime. No lock-in contracts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 relative transition-all duration-400 ${
                  plan.popular
                    ? 'bg-stone-900 text-white shadow-card-hover ring-2 ring-brand-500'
                    : 'bg-white border border-stone-200 shadow-soft hover:shadow-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <h3 className={`text-lg font-bold mb-1 ${plan.popular ? 'text-white' : 'text-stone-900'}`}>{plan.name}</h3>
                <div className={`mb-5 text-xs ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>
                  {plan.popular ? 'The full package' : plan.name === 'Property Manager' ? 'For landlords & investors' : plan.name === 'Lawn Plus' ? 'Weekly lawn maintenance' : plan.name === 'Handyman Plus' ? 'Monthly handyman' : 'Essential coverage'}
                </div>

                <div className="mb-7">
                  <span className={`text-3xl font-extrabold tracking-tight ${plan.popular ? 'text-white' : 'text-stone-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-xs ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>{plan.note || '/mo'}</span>
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
                  Try any plan for 30 days. If you're not completely satisfied, we'll refund every penny. No questions asked, no hard feelings. We're confident in our work - and we prove it by putting your money back if we fall short.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> Cancel any time</span>
                  <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> No lock-in contracts</span>
                  <span className="flex items-center gap-1.5 text-brand-700 font-medium"><Check className="w-4 h-4" /> 30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to stop juggling contractors?</h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            Start with a free assessment or book a single service today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/assessment" className="btn-primary-lg px-12 inline-flex">
              Book Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/portfolio" className="btn-outline border-white/30 text-white hover:text-white hover:border-white inline-flex">
              View Services & Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
