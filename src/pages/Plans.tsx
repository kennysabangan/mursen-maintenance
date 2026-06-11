import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check } from 'lucide-react';

const valueStacks = [
  {
    name: 'Lawn Plus',
    price: '109',
    note: '/mo (Apr–Oct)',
    totalValue: '$280+',
    features: [
      { item: 'Weekly mow + edge + blow', worth: '$180/mo' },
      { item: 'Seasonal cleanups included', worth: '$60/yr' },
      { item: 'Gutter check each visit', worth: '$40/mo' },
    ],
  },
  {
    name: 'Handyman Plus',
    price: '149',
    note: '/mo',
    totalValue: '$350+',
    features: [
      { item: '1 visit/month (2 hrs)', worth: '$200/mo' },
      { item: '5-day scheduling window', worth: '$50/mo' },
      { item: 'Same technician every visit', worth: '$100/mo' },
    ],
  },
  {
    name: 'Starter',
    price: '199',
    note: '/mo',
    totalValue: '$500+',
    features: [
      { item: '1 handyman visit/mo (2 hrs)', worth: '$200/mo' },
      { item: 'Biweekly lawn mowing', worth: '$180/mo' },
      { item: 'Same technician every visit', worth: '$70/mo' },
      { item: 'Monthly property summary', worth: '$50/mo' },
    ],
  },
  {
    name: 'Home Care',
    price: '479',
    note: '/mo',
    totalValue: '$850+',
    highlight: true,
    features: [
      { item: 'Weekly lawn mowing & edging', worth: '$180/mo' },
      { item: 'Monthly window cleaning — exterior', worth: '$120/mo' },
      { item: '4 hours handyman work', worth: '$300/mo' },
      { item: '1 annual power wash — driveway & walkways', worth: '$280/yr' },
      { item: 'Priority scheduling (48hr SLA)', worth: '$50/mo' },
      { item: 'Photo report after every visit', worth: 'Priceless' },
    ],
  },
  {
    name: 'Property Manager',
    price: '279',
    note: '/unit/mo',
    totalValue: '$600+',
    features: [
      { item: 'Rental-unit optimized service', worth: '$200/mo' },
      { item: 'Priority scheduling', worth: '$100/mo' },
      { item: 'Tenant turnover support', worth: '$150/mo' },
      { item: '3+ units: $249 · 5+: $229', worth: 'Volume savings' },
    ],
  },
];

export default function Plans() {
  const siteUrl = 'https://mursenmaintenance.com';
  const seoTitle = 'Subscription Plans — Save 30%+ on Home Maintenance | Mursen';
  const seoDescription = 'All-in-one home maintenance subscriptions. Lawn care, windows, power washing, handyman. One monthly bill, massive savings. Plans from $109/mo.';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${siteUrl}/plans`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`${siteUrl}/plans`} />
      </Helmet>

      {/* Hero */}
      <section className="section bg-gray-900 text-white">
        <div className="container-app text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            Save 30%+
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-5 tracking-tight uppercase">
            Use Us Often?<br />
            <span className="text-brand-400">Save With A Plan</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
            All-in-one home maintenance subscriptions. One monthly bill. Massive savings. No contracts.
          </p>

          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 text-gray-900 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Booked separately:</span>
              <span className="text-lg font-bold text-gray-400 line-through">$670/mo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Home Care plan:</span>
              <span className="text-2xl font-extrabold text-brand-600">$479/mo</span>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">Save $191/month = $2,292/year</p>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-6">
            <span className="inline-block text-brand-600 text-xs font-bold uppercase tracking-widest mb-4">Our Plans</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              Pick Your Level of "Done For You"
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              All plans month-to-month. Cancel anytime. Stack so much value, you'd feel stupid saying no.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {valueStacks.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-7 border-2 transition-all duration-200 bg-white ${
                  tier.highlight
                    ? 'border-brand-500 shadow-xl shadow-brand-100 scale-[1.03]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <h3 className="font-display text-lg font-bold text-gray-900 mb-1 uppercase tracking-wide">{tier.name}</h3>

                {/* Price */}
                <div className="mb-5">
                  <span className={`text-4xl font-extrabold tracking-tight ${tier.highlight ? 'text-brand-600' : 'text-gray-900'}`}>
                    ${tier.price}
                  </span>
                  <span className={`text-sm ml-1 ${tier.highlight ? 'text-brand-600' : 'text-gray-500'}`}>
                    {tier.note}
                  </span>
                </div>

                {/* Value stack */}
                <div className="space-y-3 mb-5">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-brand-500' : 'text-gray-400'}`} />
                        <span className="text-sm text-gray-700">{f.item}</span>
                      </div>
                      <span className={`text-xs font-semibold whitespace-nowrap ${tier.highlight ? 'text-brand-600' : 'text-gray-400'}`}>
                        {f.worth}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total value line */}
                <div className={`border-t pt-4 mb-5 ${tier.highlight ? 'border-brand-100' : 'border-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">Total value:</span>
                    <span className="text-lg font-bold text-gray-400 line-through">{tier.totalValue}/mo</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-semibold text-gray-500">Your price:</span>
                    <span className={`text-xl font-extrabold ${tier.highlight ? 'text-brand-600' : 'text-brand-600'}`}>
                      ${tier.price}{tier.note}
                    </span>
                  </div>
                </div>

                <Link
                  to="/assessment"
                  className={`block text-center py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer min-h-[48px] ${
                    tier.highlight
                      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200'
                      : 'bg-gray-900 hover:bg-brand-600 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
              À La Carte vs. Subscription
            </h2>
            <p className="text-gray-500">See how much you save when you bundle services.</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b-2 border-gray-200">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Service</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide text-right">À La Carte</span>
              <span className="text-sm font-bold text-brand-600 uppercase tracking-wide text-right">Subscription</span>
            </div>
            {/* Rows */}
            {[
              { service: 'Lawn care (weekly Apr–Oct)', ala: '$180/mo', sub: 'Included ($109/mo plan)' },
              { service: 'Window cleaning (monthly)', ala: '$120/mo', sub: 'Included ($479/mo plan)' },
              { service: 'Handyman visit (4 hrs)', ala: '$300/visit', sub: 'Included ($479/mo plan)' },
              { service: 'Power wash (1x/yr)', ala: '$280/yr', sub: 'Included ($479/mo plan)' },
              { service: 'Priority scheduling', ala: '$50/visit', sub: 'Included' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 gap-4 px-6 py-4 ${i !== 4 ? 'border-b border-gray-100' : ''}`}>
                <span className="text-sm text-gray-700 font-medium">{row.service}</span>
                <span className="text-sm text-gray-400 text-right line-through">{row.ala}</span>
                <span className="text-sm text-brand-600 text-right font-bold">{row.sub}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 bg-orange-50 border border-orange-200 rounded-xl p-5">
            <p className="text-orange-800 font-bold">
              Home Care plan saves you <span className="text-orange-900">$2,292/year</span> compared to booking separately. Already a customer? Email us to switch plans anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-white">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight uppercase">
              Subscription FAQs
            </h2>
          </div>

          <div className="space-y-5">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. All plans are month-to-month. No contracts, no cancellation fees. We earn your business every single month.',
              },
              {
                q: 'What if I need more handyman hours?',
                a: 'Easy — we bill additional hours at $75/hr for subscribers (vs. $95/hr one-off). Just let us know and we\'ll schedule the extra time.',
              },
              {
                q: 'What happens in winter when there\'s no lawn to mow?',
                a: 'Lawn plans pause Dec–Mar automatically. Your rate adjusts. We swap mowing for seasonal services like gutter cleaning and winter prep.',
              },
              {
                q: 'Can I switch plans mid-month?',
                a: 'Yes. Email us and we\'ll prorate the difference. No penalties, no hassle.',
              },
              {
                q: 'Do you offer multi-property discounts?',
                a: 'Absolutely. Property Manager plan starts at $279/unit/mo. Volume discounts at 3+ units ($249/unit) and 5+ units ($229/unit).',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="text-base font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-600">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready To Save 30%+ On Home Maintenance?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            One monthly bill. One team. Everything handled. No contracts.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-brand-700 font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-xl min-h-[56px]"
          >
            Get My Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
