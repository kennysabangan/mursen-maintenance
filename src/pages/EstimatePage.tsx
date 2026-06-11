import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Home, Droplets, Leaf, Sparkles, Wrench,
  Calculator, ChevronDown, ChevronUp, FileText, Check
} from 'lucide-react';
import {
  calculatePowerWashing,
  calculateLawnCare,
  calculateWindowCleaning,
  calculateHandyman
} from '../../lib/pricing';

/* ──────────────── SERVICE OPTIONS ──────────────── */

const SERVICES = [
  { id: 'powerWashing', label: 'Power Washing', icon: Droplets, color: 'blue' },
  { id: 'lawnCare', label: 'Lawn Care', icon: Leaf, color: 'green' },
  { id: 'windowCleaning', label: 'Window Cleaning', icon: Sparkles, color: 'cyan' },
  { id: 'handyman', label: 'Handyman', icon: Wrench, color: 'orange' },
];

/* ──────────────── COMPONENT ──────────────── */

export default function EstimatePage() {
  const [address, setAddress] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [propertyMetrics, setPropertyMetrics] = useState({
    sqft_siding: 1500,
    sqft_driveway: 600,
    sqft_walkways: 150,
    sqft_lawn: 3000,
    window_count: 12,
    stories: 2,
    condition: 'moderate',
    frequency: 'biweekly',
    estimated_hours: 2,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [estimate, setEstimate] = useState<any>(null);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculate = () => {
    const results: any = { services: {}, total: { low: 0, mid: 0, high: 0 } };

    if (selectedServices.includes('powerWashing')) {
      results.services.powerWashing = calculatePowerWashing({
        sqft_siding: propertyMetrics.sqft_siding,
        sqft_driveway: propertyMetrics.sqft_driveway,
        sqft_walkways: propertyMetrics.sqft_walkways,
        stories: propertyMetrics.stories,
        condition: propertyMetrics.condition,
      });
      results.total.low += results.services.powerWashing.low;
      results.total.mid += results.services.powerWashing.mid;
      results.total.high += results.services.powerWashing.high;
    }

    if (selectedServices.includes('lawnCare')) {
      results.services.lawnCare = calculateLawnCare({
        sqft_lawn: propertyMetrics.sqft_lawn,
        frequency: propertyMetrics.frequency,
      });
      results.total.low += results.services.lawnCare.low;
      results.total.mid += results.services.lawnCare.mid;
      results.total.high += results.services.lawnCare.high;
    }

    if (selectedServices.includes('windowCleaning')) {
      results.services.windowCleaning = calculateWindowCleaning({
        window_count: propertyMetrics.window_count,
        stories: propertyMetrics.stories,
      });
      results.total.low += results.services.windowCleaning.low;
      results.total.mid += results.services.windowCleaning.mid;
      results.total.high += results.services.windowCleaning.high;
    }

    if (selectedServices.includes('handyman')) {
      results.services.handyman = calculateHandyman({
        estimated_hours: propertyMetrics.estimated_hours,
      });
      results.total.low += results.services.handyman.low;
      results.total.mid += results.services.handyman.mid;
      results.total.high += results.services.handyman.high;
    }

    setEstimate(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Free Estimate | Mursen Maintenance</title>
        <meta name="description" content="Get a free instant estimate for lawn care, window cleaning, power washing, or handyman services. Satellite-powered property analysis." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="bg-brand-700 text-white py-16">
        <div className="container-app max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <Calculator className="w-4 h-4" />
            Instant Price Estimate
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            See What Your Property Should Cost
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Enter your address. Pick your services. Get a transparent, instant estimate — no sales calls, no surprises.
          </p>
        </div>
      </section>

      <div className="container-app max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ─── LEFT: INPUTS ─── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Address */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-600" />
                Property Address
              </h2>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your full address..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-lg"
              />
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-brand-600" />
                Select Services
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICES.map(svc => {
                  const Icon = svc.icon;
                  const active = selectedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left font-medium ${
                        active
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-brand-600' : 'text-gray-400'}`} />
                      {svc.label}
                      {active && <Check className="w-4 h-4 text-brand-600 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Metrics (Advanced) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="font-display text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-600" />
                  Property Details
                </h2>
                {showAdvanced ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              <p className="text-gray-500 text-sm mt-1">
                Adjust estimates based on your property's specifics
              </p>

              {showAdvanced && (
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Siding (sq ft)</label>
                    <input type="number" value={propertyMetrics.sqft_siding}
                      onChange={e => setPropertyMetrics(p => ({ ...p, sqft_siding: +e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driveway (sq ft)</label>
                    <input type="number" value={propertyMetrics.sqft_driveway}
                      onChange={e => setPropertyMetrics(p => ({ ...p, sqft_driveway: +e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Walkways (sq ft)</label>
                    <input type="number" value={propertyMetrics.sqft_walkways}
                      onChange={e => setPropertyMetrics(p => ({ ...p, sqft_walkways: +e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lawn (sq ft)</label>
                    <input type="number" value={propertyMetrics.sqft_lawn}
                      onChange={e => setPropertyMetrics(p => ({ ...p, sqft_lawn: +e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Windows</label>
                    <input type="number" value={propertyMetrics.window_count}
                      onChange={e => setPropertyMetrics(p => ({ ...p, window_count: +e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stories</label>
                    <select value={propertyMetrics.stories}
                      onChange={e => setPropertyMetrics(p => ({ ...p, stories: +e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none">
                      <option value={1}>1 Story</option>
                      <option value={2}>2 Stories</option>
                      <option value={3}>3+ Stories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                    <select value={propertyMetrics.condition}
                      onChange={e => setPropertyMetrics(p => ({ ...p, condition: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none">
                      <option value="light">Light (well-maintained)</option>
                      <option value="moderate">Moderate (average)</option>
                      <option value="heavy">Heavy (neglected)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lawn Frequency</label>
                    <select value={propertyMetrics.frequency}
                      onChange={e => setPropertyMetrics(p => ({ ...p, frequency: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none">
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Biweekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="onetime">One-time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Handyman Hours</label>
                    <input type="number" value={propertyMetrics.estimated_hours}
                      onChange={e => setPropertyMetrics(p => ({ ...p, estimated_hours: +e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                  </div>
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculate}
              disabled={selectedServices.length === 0}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-brand-200"
            >
              Get My Estimate
            </button>
          </div>

          {/* ─── RIGHT: RESULTS ─── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Your Estimate</h2>

              {!estimate ? (
                <div className="text-center py-12 text-gray-400">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select services and click "Get My Estimate" to see pricing.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Service Breakdown */}
                  {Object.entries(estimate.services).map(([key, val]: [string, any]) => (
                    <div key={key} className="border-b border-gray-100 pb-3">
                      <div className="text-sm font-medium text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-lg font-bold text-gray-900">
                          ${val.mid.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                          ${val.low.toFixed(2)} – ${val.high.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t-2 border-brand-200 pt-4 mt-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Estimated Total</div>
                    <div className="text-3xl font-bold text-brand-700">
                      ${estimate.total.mid.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Range: ${estimate.total.low.toFixed(2)} – ${estimate.total.high.toFixed(2)}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-4">
                    <FileText className="w-5 h-5" />
                    Get Official Quote
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Estimates are approximate. Final pricing confirmed after property inspection.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
