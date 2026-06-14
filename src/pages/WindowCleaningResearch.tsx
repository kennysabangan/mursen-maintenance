import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Check, Phone, Home, DollarSign, Target,
  BarChart3, TrendingUp, ShieldCheck, Clock, Users, BookOpen,
  Lightbulb, Wrench, Package, Star, AlertTriangle, ChevronRight,
  MapPin, Calculator,
} from 'lucide-react';

/* ─────────── SECTION HEADER ─────────── */
function SectionBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-brand-100">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight uppercase">
        {children}
      </h2>
      {sub && <p className="text-lg text-gray-500 max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

/* ─────────── DATA ─────────── */

const localPricing = [
  { service: 'Per Pane (in & out)', range: '$5.80 – $7.60', note: 'Standard residential' },
  { service: 'Per Standard Window (ext only)', range: '~$5.00', note: 'Ground floor' },
  { service: 'Large Windows (ext only)', range: '$8 – $10', note: 'Picture/sliding doors' },
  { service: 'Screens', range: '~$4', note: 'Removal & reinstall' },
  { service: 'Tracks & Sills', range: '~$3', note: 'Deep clean add-on' },
  { service: 'Small Storefront (ext)', range: '$75 – $150', note: 'Commercial' },
  { service: 'Single-Story Home', range: '$150 – $300', note: 'Full service' },
  { service: 'Two-Story Home (full)', range: '$300 – $500', note: 'All windows, ext + int' },
];

const nationalBenchmarks = [
  { service: 'Per Window (residential)', range: '$8 – $16' },
  { service: 'Per Pane', range: '$4 – $8' },
  { service: '2nd Story Windows', range: '+$2 – $5 extra' },
  { service: 'Screens', range: '$2 – $5' },
  { service: 'Minimum Job Fee', range: '$100 – $250' },
  { service: 'Avg Residential Job', range: '$220 (range $150 – $302)' },
  { service: 'Bay / Bow Windows', range: '$15 – $30' },
  { service: 'Storm Windows', range: '$25 – $35' },
  { service: 'Post-Construction', range: '$4–$5/pane + $7 for putty/paint' },
];

const forumInsights = [
  {
    source: 'r/WindowCleaning + Window Cleaning Resource Forum',
    items: [
      { label: 'Pricing models top cleaners use', detail: 'Per pane, per window, or flat rate — depends on job size and client type' },
      { label: 'Real quotes from pros', detail: '"$8 out, $4 in" · "$5 ext, $8 int/ext, $10 French"' },
      { label: 'Cleveland market insight', detail: '"$12/window is an easy sell" — similar demographics to NKY' },
      { label: 'Consensus on 2nd story', detail: 'Charge extra: +$2 minimum for anything above ground floor' },
      { label: 'Storm windows', detail: '$25–$35 — take apart during quote to price correctly' },
      { label: 'Target hourly rate', detail: '$50+/hr on the job for profitable operations' },
    ],
  },
];

const rateCard = [
  { service: 'Standard Window (1st story, in & out)', rate: '$8', why: 'Slightly above local avg ($5.80–$7.60) signals quality' },
  { service: '2nd Story Window (in & out)', rate: '$10', why: 'Covers equipment, time, and risk premium' },
  { service: 'French / Divided-Lite Windows', rate: '$12 – $15', why: 'More panes = more labor per window' },
  { service: 'Storm Windows', rate: '$25 – $35', why: 'Disassembly/reassembly adds significant time' },
  { service: 'Bay / Bow Windows', rate: '$20 – $30', why: 'Multiple panes, awkward angles, more solution' },
  { service: 'Screens (each)', rate: '$3 – $4', why: 'Quick add-on, high-margin line item' },
  { service: 'Tracks & Sills', rate: '$2 – $3', why: 'Low-effort upsell that clients love' },
  { service: 'Minimum Job Fee', rate: '$150', why: 'Keeps small jobs profitable after travel + setup' },
  { service: 'Commercial Storefront (ext only)', rate: '$5 – $8/window', why: 'Volume pricing, lower per-window but repeat business' },
];

const bestPractices = [
  { icon: Users, title: 'Estimate in Person', desc: 'Never quote over the phone for first-time jobs. Walk the property, count every pane, spot storm windows and French doors.' },
  { icon: Target, title: 'Count Every Pane', desc: 'French windows = more panes = more money. A single French door can be 10+ panes. Always count carefully.' },
  { icon: AlertTriangle, title: 'Test Storm Windows', desc: 'Take them apart during the quote. Price based on actual difficulty — some are easy, some fight you.' },
  { icon: Package, title: 'Two-Package System', desc: 'Offer Basic (glass only) + Premium (glass + screens + tracks + sills). Most clients pick Premium.' },
  { icon: Lightbulb, title: 'Clean on Cloudy Days', desc: 'Direct sun causes solution to dry too fast, leaving streaks. Overcast = perfect window cleaning weather.' },
  { icon: Wrench, title: 'Squeegee Technique', desc: '"S" pattern, never lift the blade, 45° angle, light pressure. Consistent technique = consistent results.' },
  { icon: TrendingUp, title: 'WFP for 2nd Story+', desc: 'Water-fed pole system is safer, faster, and produces spot-free results on upper windows.' },
  { icon: BookOpen, title: 'Directional Wiping', desc: 'Inside: horizontal strokes. Outside: vertical. If you see a streak, direction tells you which side it\'s on.' },
  { icon: ShieldCheck, title: 'Debris First', desc: 'Remove loose dirt and cobwebs before applying solution. Otherwise you\'re just pushing grime around.' },
  { icon: DollarSign, title: 'Recurring Contracts', desc: 'The money play. Biweekly or quarterly contracts = predictable revenue and lower acquisition cost.' },
];

const equipmentKit = [
  { item: 'Ettore Squeegee', spec: '12" + 6" channels', price: '$30–50' },
  { item: 'Strip Washer / Mop Sleeve', spec: 'For applying solution', price: '$15–25' },
  { item: 'Bucket', spec: '2-gallon minimum', price: '$10–15' },
  { item: 'Huck Towels / Microfiber', spec: 'Lint-free detailing', price: '$15–25' },
  { item: 'Extension Pole', spec: 'Telescoping, 6–12 ft', price: '$30–60' },
  { item: 'Razor Blade Scraper', spec: 'For paint/sticker removal', price: '$10–15' },
  { item: 'Water-Fed Pole System', spec: 'Upgrade when budget allows', price: '$150–300' },
];

/* ─────────── COMPONENT ─────────── */

export default function WindowCleaningResearch() {
  const siteUrl = 'https://mursenmaintenance.com';
  const pageTitle = 'Window Cleaning Pricing Research — NKY/Cincinnati Market';
  const pageDesc = 'Competitive analysis and pricing research for window cleaning in the Northern Kentucky and Cincinnati metro market.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteUrl}/window-cleaning-research`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/window-cleaning-research`} />
      </Helmet>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-brand-600 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-5 py-2 rounded-full text-sm font-bold mb-8 uppercase tracking-wide border border-white/10">
            <BarChart3 className="w-4 h-4" />
            Internal Research Document
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.05] uppercase">
            Window Cleaning<br />
            <span className="text-brand-300">Pricing Research</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Competitive analysis, market benchmarks, and recommended rate card for the NKY/Cincinnati market.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-white/50">
            <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5" /> Updated June 2026
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <MapPin className="w-3.5 h-3.5" /> NKY / Cincinnati Metro
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Users className="w-3.5 h-3.5" /> For Internal Use
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════ 1. LOCAL MARKET PRICING ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <SectionBadge icon={MapPin} label="Section 1" />
          <SectionTitle sub="What competitors are charging in the Greater Cincinnati and Northern Kentucky area.">
            Local Market Pricing
          </SectionTitle>

          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-3 gap-4 px-8 py-4 bg-gray-50 border-b-2 border-gray-200">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Service</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Rate</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Notes</span>
            </div>
            {localPricing.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 px-8 py-5 hover:bg-brand-50/50 transition-colors ${
                  i < localPricing.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-sm text-gray-900 font-bold">{item.service}</span>
                <span className="text-sm font-extrabold text-brand-600">{item.range}</span>
                <span className="text-sm text-gray-400">{item.note}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Key takeaway:</strong> Local per-window rates are lower than national averages.
              There's room to price above local competitors while still staying below national premium rates — positioning as quality, not cheap.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. NATIONAL BENCHMARKS ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-4xl mx-auto">
          <SectionBadge icon={BarChart3} label="Section 2" />
          <SectionTitle sub="National averages and ranges from industry data and cleaning business databases.">
            National Benchmarks
          </SectionTitle>

          <div className="grid sm:grid-cols-2 gap-4">
            {nationalBenchmarks.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-brand-300 hover:shadow-md transition-all">
                <span className="text-sm text-gray-700 font-medium">{item.service}</span>
                <span className="text-sm font-extrabold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">{item.range}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-brand-50 border-2 border-brand-200 rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              Market Positioning
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed max-w-none">
              The <strong>average residential window cleaning job nationally is $220</strong> (range $150–$302).
              Our recommended $150 minimum fee aligns with the floor of the national average,
              ensuring even small jobs are profitable. A typical 20-window, 2-story home at our rates
              would generate <strong>$200–$300</strong> — right in the national sweet spot.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. FORUM INSIGHTS ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <SectionBadge icon={BookOpen} label="Section 3" />
          <SectionTitle sub="Real-world pricing intelligence from active window cleaning professionals.">
            Forum Insights
          </SectionTitle>

          {forumInsights.map((forum, fi) => (
            <div key={fi} className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-8 py-4 bg-gray-100 border-b border-gray-200">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">{forum.source}</span>
              </div>
              <div className="divide-y divide-gray-200">
                {forum.items.map((item, ii) => (
                  <div key={ii} className="px-8 py-5 flex items-start gap-4 hover:bg-white transition-colors">
                    <ChevronRight className="w-4 h-4 text-brand-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">{item.label}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 4. PRICING FORMULA ═══════════════ */}
      <section className="section bg-gray-900 text-white">
        <div className="container-app max-w-4xl mx-auto">
          <SectionBadge icon={Calculator} label="Section 4" />
          <SectionTitle sub="How to calculate your rates for any job.">
            Pricing Formula
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Formula */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-wide">The Formula</h3>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Step 1</p>
                  <p className="text-base font-bold text-white">Total Cost = Labor + Materials + Overhead</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-px h-6 bg-white/20" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Step 2</p>
                  <p className="text-base font-bold text-white">Total Price = Total Cost + (Profit Margin × Total Cost)</p>
                </div>
              </div>
            </div>

            {/* Targets */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-wide">Targets</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Minimum 30% Gross Profit</p>
                    <p className="text-xs text-white/50">Non-negotiable floor for every job</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">$50+/hr On the Job</p>
                    <p className="text-xs text-white/50">Target hourly rate for profitable operations</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Recurring Client Discounts</p>
                    <p className="text-xs text-white/50">Weekly / biweekly / monthly contracts get better rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. RECOMMENDED RATE CARD ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <SectionBadge icon={Star} label="Section 5" />
          <SectionTitle sub="Our recommended pricing for the NKY/Cincinnati market.">
            Recommended Rate Card
          </SectionTitle>

          <div className="bg-white border-2 border-brand-200 rounded-2xl overflow-hidden shadow-lg shadow-brand-600/5">
            <div className="px-8 py-5 bg-brand-600 text-white">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide">Mursen Maintenance — Window Cleaning Rates</h3>
              <p className="text-sm text-brand-100 mt-1">Northern Kentucky & Cincinnati Metro</p>
            </div>
            <div className="grid grid-cols-3 gap-4 px-8 py-4 bg-brand-50 border-b border-brand-100">
              <span className="text-sm font-bold text-brand-700 uppercase tracking-wide">Service</span>
              <span className="text-sm font-bold text-brand-700 uppercase tracking-wide">Rate</span>
              <span className="text-sm font-bold text-brand-700 uppercase tracking-wide">Why This Price</span>
            </div>
            {rateCard.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 px-8 py-5 hover:bg-brand-50/50 transition-colors ${
                  i < rateCard.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-sm text-gray-900 font-bold">{item.service}</span>
                <span className="text-sm font-extrabold text-brand-600">{item.rate}</span>
                <span className="text-sm text-gray-500 leading-relaxed">{item.why}</span>
              </div>
            ))}
          </div>

          {/* Why this works */}
          <div className="mt-8 bg-brand-50 border-2 border-brand-200 rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              Why This Works
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { point: 'Slightly above local average ($5.80–$7.60) — signals quality without sticker shock' },
                { point: 'Still below national premium ($10–$16) — accessible to most homeowners' },
                { point: '2nd story premium covers equipment, time, and risk — ladder work isn\'t free' },
                { point: '$150 minimum keeps small jobs profitable after travel and setup costs' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-brand-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-700 leading-relaxed">{item.point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. BEST PRACTICES ═══════════════ */}
      <section className="section bg-gray-50">
        <div className="container-app max-w-4xl mx-auto">
          <SectionBadge icon={Lightbulb} label="Section 6" />
          <SectionTitle sub="Operational protocol for delivering consistent, high-quality results.">
            Best Practices Protocol
          </SectionTitle>

          <div className="grid sm:grid-cols-2 gap-4">
            {bestPractices.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-md transition-all flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-brand-100">
                    <span className="text-sm font-extrabold text-brand-600">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-brand-500" />
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. STARTER KIT ═══════════════ */}
      <section className="section bg-white">
        <div className="container-app max-w-4xl mx-auto">
          <SectionBadge icon={Wrench} label="Section 7" />
          <SectionTitle sub="Essential equipment to get started. Budget: $200–$400.">
            Starter Equipment Kit
          </SectionTitle>

          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-3 gap-4 px-8 py-4 bg-gray-50 border-b-2 border-gray-200">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Equipment</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Spec</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide text-right">Est. Cost</span>
            </div>
            {equipmentKit.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-4 px-8 py-5 hover:bg-brand-50/50 transition-colors ${
                  i < equipmentKit.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-sm text-gray-900 font-bold">{item.item}</span>
                <span className="text-sm text-gray-500">{item.spec}</span>
                <span className="text-sm font-extrabold text-brand-600 text-right">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Start with the basics</strong> — squeegee, washer, bucket, towels, and a scraper.
              Upgrade to a water-fed pole system once you're consistently booking 2nd-story jobs.
              The WFP pays for itself within 5–10 upper-story jobs.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section bg-gray-900">
        <div className="container-app text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight uppercase">
            Ready to Set Rates?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
            Use this research to build your rate card. Start with the recommended rates, adjust based on your first 5–10 jobs, and track your hourly output.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-200 shadow-lg shadow-brand-600/25 min-h-[56px]"
            >
              View Public Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services/window-cleaning"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/20 hover:border-white/40 text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 min-h-[52px]"
            >
              Window Cleaning Service Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

