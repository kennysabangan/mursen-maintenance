import { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Search, Loader2, CheckCircle2, ArrowRight, Leaf,
  DollarSign, Phone, Mail, User, AlertTriangle, Info, Sparkles, Shield,
} from 'lucide-react';
import { geocodeAddress, type GeocodeResult } from '../utils/geocode';
import { analyzeLawnFromImage, getSatelliteTileUrl, type LawnAnalysis } from '../utils/lawnAnalyzer';

type QuoteStep = 'address' | 'analyzing' | 'results' | 'form' | 'submitted';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const PRICING_TIERS = [
  { maxSqFt: 3000, label: 'Small Lawn', price: 79, note: 'up to 3,000 sq ft' },
  { maxSqFt: 6000, label: 'Medium Lawn', price: 109, note: '3,000–6,000 sq ft' },
  { maxSqFt: 10000, label: 'Large Lawn', price: 149, note: '6,000–10,000 sq ft' },
  { maxSqFt: Infinity, label: 'Estate', price: 199, note: '10,000+ sq ft' },
];

function getPricing(sqFt: number) {
  for (const tier of PRICING_TIERS) {
    if (sqFt <= tier.maxSqFt) return tier;
  }
  return PRICING_TIERS[PRICING_TIERS.length - 1];
}

function getAnnualSavings(monthlyPrice: number) {
  const monthly = monthlyPrice * 7; // 7 mowing months (Apr–Oct)
  const withMursen = monthlyPrice * 12;
  const savings = monthly - withMursen;
  return { monthly, withMursen, savings };
}

export default function InstantQuote() {
  const [step, setStep] = useState<QuoteStep>('address');
  const [address, setAddress] = useState('');
  const [geocodeResults, setGeocodeResults] = useState<GeocodeResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<GeocodeResult | null>(null);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<LawnAnalysis | null>(null);
  const [formData, setFormData] = useState<LeadFormData>({ name: '', email: '', phone: '', address: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const siteUrl = 'https://mursenmaintenance.com';

  const handleGeocode = async () => {
    if (!address.trim()) return;
    setError('');
    setStep('analyzing');
    try {
      const results = await geocodeAddress(address.trim());
      if (results.length === 0) {
        setError('Address not found. Try adding city and state (e.g., "123 Main St, Covington, KY").');
        setStep('address');
        return;
      }
      setGeocodeResults(results);
      const first = results[0];
      setSelectedResult(first);
      await loadAndAnalyze(first);
    } catch {
      setError('Could not find that address. Please try again.');
      setStep('address');
    }
  };

  const loadAndAnalyze = useCallback(async (result: GeocodeResult) => {
    setStep('analyzing');
    setError('');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = getSatelliteTileUrl(parseFloat(result.lat), parseFloat(result.lon), 18);

    img.onload = () => {
      if (!canvasRef.current) return;
      try {
        const result = analyzeLawnFromImage(img, canvasRef.current);
        setAnalysis(result);
        setStep('results');
      } catch {
        setError('Could not analyze the satellite image. Please try a different address.');
        setStep('address');
      }
    };

    img.onerror = () => {
      setError('Could not load satellite imagery for this location. Please try again.');
      setStep('address');
    };
  }, []);

  const handleSelectResult = (result: GeocodeResult) => {
    setSelectedResult(result);
    loadAndAnalyze(result);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: selectedResult?.display_name || address,
          source: 'instant-quote',
          plan_interest: 'lawn-care',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStep('submitted');
    } catch {
      alert('Something went wrong. Please try again or call us directly.');
    }
  };

  const pricing = analysis ? getPricing(analysis.estimatedSqFt) : null;
  const savings = pricing ? getAnnualSavings(pricing.price) : null;

  return (
    <>
      <Helmet>
        <title>Instant Lawn Care Quote | Mursen Maintenance</title>
        <meta name="description" content="Get an instant lawn care quote from satellite imagery. No photos needed. See your lawn size estimate and pricing in seconds." />
        <link rel="canonical" href={`${siteUrl}/estimate`} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-brand-100">
              <Leaf className="w-4 h-4" />
              Instant Estimate · No Photos Needed
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 uppercase">
              Get Your Lawn Quote in Seconds
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              We use satellite imagery to measure your lawn and generate an instant estimate. No site visit required.
            </p>
          </div>
        </section>

        {/* Hidden canvas for image analysis */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Step: Address Input */}
        {step === 'address' && (
          <section className="py-8 px-6 bg-gray-50">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Where's Your Property?
                </h2>
                <div className="relative mb-4">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGeocode()}
                    placeholder="123 Main St, Covington, KY"
                    className="input-field-icon"
                    autoFocus
                  />
                </div>
                {error && (
                  <div className="flex items-start gap-2 text-red-600 text-sm mb-4 bg-red-50 border border-red-100 rounded-xl p-4">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <button onClick={handleGeocode} className="btn-primary-lg w-full">
                  <Search className="w-5 h-5" />
                  Analyze My Lawn
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  We'll pull satellite imagery and estimate your lawn size automatically.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Step: Analyzing */}
        {step === 'analyzing' && (
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white rounded-2xl p-12 shadow-card border border-gray-100">
                <Loader2 className="w-12 h-12 text-brand-600 animate-spin mx-auto mb-6" />
                <h2 className="font-display text-xl font-bold text-gray-900 mb-3 uppercase">Analyzing Your Property</h2>
                <p className="text-gray-500 text-sm">Pulling satellite imagery and measuring lawn coverage...</p>
                {selectedResult && (
                  <p className="text-xs text-gray-400 mt-4 truncate">{selectedResult.display_name}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Step: Results */}
        {step === 'results' && analysis && selectedResult && pricing && savings && (
          <section className="py-8 px-6 bg-gray-50">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Address confirmation */}
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-600" />
                <span className="truncate">{selectedResult.display_name}</span>
              </div>

              {/* Multiple results selector */}
              {geocodeResults.length > 1 && (
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Did you mean?</p>
                  <div className="space-y-1">
                    {geocodeResults.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectResult(r)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                          r === selectedResult ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {r.display_name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Results */}
              <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Lawn Analysis</h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-brand-600">{analysis.estimatedSqFt.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Est. Lawn (sq ft)</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-brand-600">{analysis.lawnPercent}%</p>
                    <p className="text-xs text-gray-500 mt-1">Lawn Coverage</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {analysis.confidence === 'high' && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                      {analysis.confidence === 'medium' && <Info className="w-5 h-5 text-amber-500" />}
                      {analysis.confidence === 'low' && <AlertTriangle className="w-5 h-5 text-orange-500" />}
                      <p className="text-lg font-bold text-gray-700 capitalize">{analysis.confidence}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Confidence</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    This is an automated estimate from satellite imagery. Actual lawn size may vary.
                    {analysis.confidence === 'low' && ' We recommend a free on-site assessment for an exact measurement.'}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl p-8 shadow-card border-2 border-brand-200">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="w-5 h-5 text-brand-600" />
                  <h2 className="font-display text-xl font-bold text-gray-900 uppercase tracking-tight">Your Estimate</h2>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold text-brand-600">${pricing.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{pricing.label} plan — {pricing.note}</p>

                <div className="bg-brand-50 rounded-xl p-5 mb-6 border border-brand-100">
                  <h3 className="font-bold text-sm text-brand-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Subscription Savings
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Pay-as-you-go (7 months)</span>
                      <span className="line-through">${savings.monthly}/yr</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Mursen subscription (12 months)</span>
                      <span className="font-semibold">${savings.withMursen}/yr</span>
                    </div>
                    <div className="border-t border-brand-200 pt-2 flex justify-between font-bold text-brand-700">
                      <span>You save</span>
                      <span>${savings.savings}/yr</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {[
                    'Weekly mow, edge & blow',
                    'Seasonal cleanups included',
                    'Priority scheduling',
                    'No contracts — cancel anytime',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, address: selectedResult.display_name }));
                    setStep('form');
                  }}
                  className="btn-primary-lg w-full"
                >
                  Claim This Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Re-analyze */}
              <div className="text-center">
                <button
                  onClick={() => { setStep('address'); setAnalysis(null); setSelectedResult(null); setGeocodeResults([]); }}
                  className="text-sm text-gray-400 hover:text-brand-600 transition-colors cursor-pointer"
                >
                  Try a different address
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Step: Lead Form */}
        {step === 'form' && (
          <section className="py-8 px-6 bg-gray-50">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
                  Claim Your Quote
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  We'll lock in this price and schedule your first service. No obligation.
                </p>

                <form onSubmit={handleSubmitLead} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="input-field-icon"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="input-field-icon"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(859) 555-0123"
                        className="input-field-icon"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Property Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="input-field-icon bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary-lg w-full mt-2">
                    <Shield className="w-5 h-5" />
                    Lock In My Quote
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    No contracts. Cancel anytime. We'll confirm within 2 hours.
                  </p>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Step: Submitted */}
        {step === 'submitted' && (
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white rounded-2xl p-12 shadow-card border border-gray-100">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-brand-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-3 uppercase">Quote Claimed!</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  We've received your information and will contact you within 2 hours to confirm your first service date.
                </p>
                <button
                  onClick={() => {
                    setStep('address');
                    setAddress('');
                    setAnalysis(null);
                    setSelectedResult(null);
                    setGeocodeResults([]);
                    setFormData({ name: '', email: '', phone: '', address: '' });
                  }}
                  className="text-brand-600 hover:text-brand-700 font-semibold cursor-pointer transition-colors inline-flex items-center gap-1"
                >
                  Get Another Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* How it works — always visible below the fold */}
        {step === 'address' && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-10 uppercase tracking-tight">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: MapPin,
                    title: 'Enter Your Address',
                    desc: 'We locate your property using satellite imagery. No photos needed from you.',
                  },
                  {
                    icon: Leaf,
                    title: 'We Analyze Your Lawn',
                    desc: 'Our system measures lawn coverage and estimates square footage automatically.',
                  },
                  {
                    icon: DollarSign,
                    title: 'Get Instant Pricing',
                    desc: 'See your monthly rate, annual savings, and claim your quote in seconds.',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-100">
                        <Icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <div className="text-xs font-bold text-brand-600 mb-2 uppercase tracking-wide">Step {i + 1}</div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
