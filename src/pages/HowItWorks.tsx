import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Search, Clock, Shield, Users, Home } from 'lucide-react';

const services = [
  { name: 'Lawn Care', price: 'From $199/mo', description: 'Weekly mowing, edging, trimming. Steep & complex terrain included.', route: '/services/lawn-care' },
  { name: 'Power Washing', price: 'From $175', description: 'Driveways, walkways, siding, roofs. Per visit.', route: '/services/power-washing' },
  { name: 'Window Cleaning', price: 'From $120', description: 'Interior & exterior. Per visit.', route: '/services/window-cleaning' },
  { name: 'Handyman', price: 'From $110/hr', description: 'Repairs, installs, general tasks. 2-hour minimum.', route: '/services/handyman' },
];

const steps = [
  {
    icon: Search,
    title: 'Pick Your Service',
    subtitle: 'Step 1',
    description: 'Browse lawn, windows, power wash, handyman. Book online or call us.',
    details: [
      'View transparent pricing online',
      'Book any service',
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
    description: 'Love the work? Set up recurring service. Same crew every visit.',
    details: [
      'Weekly, biweekly, or monthly',
      'No contracts, ever',
      'Same crew every visit',
      'Volume discounts for investors',
    ],
  },
];

export default function HowItWorks() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'How It Works | Mursen Maintenance';
  const seoDescription = 'How Mursen works: 1) Pick your service, 2) We show up, 3) Get it done. Lawn care, window cleaning, power washing, handyman. Serving Covington KY and Cincinnati metro.';

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
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">How It Works</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 uppercase">
              Three Steps. Zero Complexity.
            </h1>
            <p className="text-lg text-gray-500 max-w-lg mx-auto">
              Your house, handled. Here's how simple it actually is.
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
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-brand-200 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-5">
                      <StepIcon className="w-6 h-6 text-brand-600" />
                    </div>
                    <span className="inline-block bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                      {step.subtitle}
                    </span>
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{step.description}</p>
                    <ul className="space-y-2.5">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
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
              <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Services</span>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-3 uppercase">Per-Service Pricing</h2>
              <p className="text-lg text-gray-500 max-w-md mx-auto">
                No contracts. No subscriptions. Pay per service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((svc) => (
                <Link
                  key={svc.name}
                  to={svc.route}
                  className="rounded-2xl p-6 border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all duration-200 bg-white"
                >
                  <h3 className="font-display text-base font-bold mb-1 text-gray-900 uppercase tracking-wide">{svc.name}</h3>
                  <p className="text-2xl font-extrabold text-brand-600 mb-2">{svc.price}</p>
                  <p className="text-xs text-gray-500 mb-5">{svc.description}</p>
                  <span className="text-sm font-bold text-brand-600 hover:text-brand-700">Get Estimate →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="py-16 md:py-24 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2 uppercase tracking-wide">30-Day Satisfaction Promise</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Try any plan for 30 days. Not satisfied? Full refund. No questions asked.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-amber-700 font-bold"><Check className="w-4 h-4" /> Cancel any time</span>
                    <span className="flex items-center gap-1.5 text-amber-700 font-bold"><Check className="w-4 h-4" /> No lock-in contracts</span>
                    <span className="flex items-center gap-1.5 text-amber-700 font-bold"><Check className="w-4 h-4" /> Money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4 uppercase">Ready to Stop Juggling Contractors?</h2>
            <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
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
