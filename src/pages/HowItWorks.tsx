import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Search, Shield, Calendar, Hammer, Phone, Award, Users } from 'lucide-react';

const plans = [
  {
    name: 'Lawn Plus',
    price: 109,
    note: '/mo (Apr–Oct) · $59/mo (Nov–Mar)',
    description: 'Hands-off lawn care, year-round.',
    features: ['Weekly mow + edge + blow', 'Seasonal cleanups included', 'Gutter check each visit'],
  },
  {
    name: 'Handyman Plus',
    price: 149,
    note: '/mo',
    description: 'Monthly fix-it visits.',
    features: ['1 visit/month (2 hrs)', '5-day scheduling window', 'Same technician every visit'],
  },
  {
    name: 'Starter',
    price: 199,
    note: '/mo',
    description: 'Lawn + handyman essentials.',
    features: ['1 handyman visit/mo (2 hrs)', 'Biweekly lawn mowing', 'Same technician every visit', 'Monthly property summary'],
  },
  {
    name: 'Home Care',
    price: 479,
    note: '/mo',
    description: 'The complete bundle.',
    popular: true,
    features: ['1 visit (4 hrs handyman)', 'Weekly lawn + edging', 'Monthly window cleaning', 'Annual power wash', 'Priority 48hr SLA', '24/7 hotline for urgent issues'],
  },
  {
    name: 'Property Manager',
    price: 279,
    note: '/unit/mo',
    description: 'Built for landlords.',
    features: ['Rental-unit optimized', 'Priority scheduling', 'Tenant turnover support', '3+ units: $249 · 5+: $229'],
  },
];

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Tell Us About Your Home',
    description: 'Submit a quick form online or call us directly. We learn your property type, priorities, and your schedule.',
    details: [
      'Free 75-point assessment',
      'No high-pressure sales',
      'Same-day or next-day availability',
      'Talk to a real local owner',
    ],
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Get Your Custom Plan',
    description: 'Within 24 hours we send a flat-rate plan tailored to your home with photos, scope, and timing.',
    details: [
      'Detailed photo assessment',
      'Flat-rate, no surprise pricing',
      'Pick à la carte or subscribe',
      'Lock in your start date',
    ],
  },
  {
    number: '03',
    icon: Hammer,
    title: 'We Handle the Rest',
    description: 'Same crew every visit. Photo report after every service. Issues flagged before they become emergencies.',
    details: [
      'Same friendly tech each time',
      'Photo documentation included',
      'Cancel any time, no contracts',
      '30-day money-back promise',
    ],
  },
];

export default function HowItWorks() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'How It Works | Mursen Maintenance';
  const seoDescription = '3 steps: Tell us about your home, get a custom plan, we handle the rest. Lawn, windows, power wash, handyman in Covington KY.';

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
      </Helmet>

      {/* Hero */}
      <section className="relative bg-surface-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-600 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent-500 blur-3xl opacity-50" />
        </div>
        <div className="relative container-app py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow-light mb-4">How It Works</p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-5 text-balance">
              From quote to clean<br />in <span className="text-primary-400">three simple steps.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl mb-8">
              No contracts, no high-pressure sales calls, no mystery pricing. Just a clear path from "I need help" to "everything is handled."
            </p>
            <Link to="/assessment" className="btn-primary-lg">
              Start Your Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="bg-white rounded-3xl p-7 border border-stone-200/70 shadow-soft hover:shadow-card-hover transition-all duration-300">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="step-number">{step.number}</div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-700" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-surface-900 mb-3">{step.title}</h3>
                  <p className="text-surface-600 leading-relaxed mb-5">{step.description}</p>
                  <ul className="space-y-2.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-surface-700">
                        <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
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
      <section className="section-alt">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-4 justify-center">Membership Plans</p>
            <h2 className="heading-2 text-surface-900 mb-5 text-balance">Choose your plan.</h2>
            <p className="lead mx-auto">All plans are month-to-month. No contracts, no cancellation fees.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary-700 to-surface-900 text-white border border-primary-500/30 shadow-glow-brand lg:scale-105 lg:-my-2'
                    : 'bg-white border border-stone-200/70 shadow-soft hover:shadow-card-hover hover:-translate-y-1'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-surface-900 text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap uppercase tracking-wider shadow-glow-accent">
                    Most Popular
                  </div>
                )}

                <h3 className={`font-display text-base font-bold mb-1 ${plan.popular ? 'text-white' : 'text-surface-900'}`}>{plan.name}</h3>
                <p className={`text-xs mb-4 ${plan.popular ? 'text-primary-200' : 'text-surface-500'}`}>{plan.description}</p>

                <div className="mb-5">
                  <span className={`font-display text-3xl font-extrabold tracking-tight ${plan.popular ? 'text-white' : 'text-surface-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-xs ml-1 ${plan.popular ? 'text-primary-200' : 'text-surface-400'}`}>{plan.note}</span>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-primary-300' : 'text-primary-600'}`} strokeWidth={3} />
                      <span className={`text-xs ${plan.popular ? 'text-stone-200' : 'text-surface-700'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/assessment"
                  className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-all duration-200 min-h-[44px] ${
                    plan.popular
                      ? 'bg-accent-500 hover:bg-accent-400 text-surface-900'
                      : 'bg-surface-900 hover:bg-primary-700 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise band */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Award, title: '30-Day Money Back', desc: 'Not happy in 30 days? Full refund. No questions asked.' },
              { icon: Users, title: 'Same Tech Every Visit', desc: 'Build a relationship. They learn your home over time.' },
              { icon: Shield, title: 'Insured & Bonded', desc: '$1M surety bond. Commercial GL coverage. Workers\' comp.' },
            ].map(b => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="feature-card">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-surface-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-surface-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-600 blur-3xl" />
        </div>
        <div className="relative container-app py-20 md:py-28 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-5 text-balance">
            Ready when you are.
          </h2>
          <p className="text-lg text-stone-300 mb-10">
            Start with a free assessment or call us for à la carte work today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/assessment" className="btn-primary-lg">
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+18595550123" className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/20 text-white font-semibold text-lg px-9 py-4 rounded-full transition-all duration-200 min-h-[56px]">
              <Phone className="w-5 h-5" />
              (859) 555-0123
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
