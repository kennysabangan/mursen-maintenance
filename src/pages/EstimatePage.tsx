import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Satellite, Loader2, Ruler, Info, ArrowRight, Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LawnMeasureMap from '../components/LawnMeasureMap';
import { geocodeAddress } from '../utils/geocode';
import { lookupParcel } from '../utils/parcels';
import { calculateLawnCare } from '../../lib/pricing';

export default function EstimatePage() {
  const [address, setAddress] = useState('');
  const [geocoding, setGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [matchedLabel, setMatchedLabel] = useState<string | null>(null);

  const [parcelRing, setParcelRing] = useState<[number, number][] | null>(null);
  const [parcelLoading, setParcelLoading] = useState(false);

  const [measuredSqft, setMeasuredSqft] = useState(0);

  const handleAnalyze = useCallback(async () => {
    if (!address.trim()) return;
    setGeocoding(true);
    setError(null);
    setParcelRing(null);
    setMeasuredSqft(0);

    const result = await geocodeAddress(address);
    setGeocoding(false);

    if (!result) {
      setError("We couldn't find that address. Try adding the city and state.");
      setCoords(null);
      return;
    }
    setCoords({ lat: result.lat, lng: result.lng });
    setMatchedLabel(result.label ?? null);

    // Best-effort: pull the real parcel boundary from free county GIS to frame
    // the property. Never blocks measuring — the customer can always trace.
    setParcelLoading(true);
    try {
      const parcel = await lookupParcel(result.lat, result.lng);
      setParcelRing(parcel?.ring ?? null);
    } catch {
      setParcelRing(null);
    } finally {
      setParcelLoading(false);
    }
  }, [address]);

  const pricing = measuredSqft > 0
    ? calculateLawnCare({ sqft_lawn: measuredSqft })
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Free Lawn Care Estimate | Mursen Maintenance</title>
        <meta
          name="description"
          content="Get an instant lawn care quote. Trace your lawn on satellite imagery for an exact square-footage measurement and transparent pricing."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-brand-700 text-white py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 uppercase tracking-wide">
            <Satellite className="w-4 h-4" /> Satellite-Measured Lawn Care
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Get an Exact Lawn Care Quote
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
            Enter your address, trace your lawn on the satellite map, and see real
            pricing based on the actual square footage we'll mow.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
        {/* Step 1: Address */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600" /> Step 1: Enter Your Address
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
              placeholder="123 Main St, Covington, KY 41011"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-base sm:text-lg min-h-[48px]"
            />
            <button
              onClick={handleAnalyze}
              disabled={geocoding || !address.trim()}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 min-h-[48px]"
            >
              {geocoding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Satellite className="w-5 h-5" />}
              {geocoding ? 'Locating...' : 'Find My Lawn'}
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          {matchedLabel && !error && (
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-600" /> {matchedLabel}
            </p>
          )}
        </div>

        {/* Step 2: Measure */}
        {coords && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-brand-600" /> Step 2: Trace Your Lawn
              </h2>
              {parcelLoading && (
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Finding lot lines…
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {parcelRing
                ? 'The dashed yellow line is your property boundary from county records. Trace the grass you want mowed inside it.'
                : 'Click around the edge of each grassy area you want mowed. Add the front and back separately if needed.'}
            </p>

            <LawnMeasureMap
              center={coords}
              parcelRing={parcelRing}
              onAreaChange={setMeasuredSqft}
            />

            <p className="text-[11px] text-gray-400 mt-3 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              Area is measured geodesically from the outline you draw — only the
              grass you trace is counted, not driveways, beds, or the house.
            </p>
          </div>
        )}

        {/* Results */}
        {pricing && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-1">Your Lawn Care Quote</h2>
            <p className="text-sm text-gray-500 mb-5 sm:mb-6">
              {pricing.sqft.toLocaleString()} sq ft measured · {pricing.tier}
              {address && <> · 📍 {address}</>}
            </p>

            <div className="bg-brand-50 rounded-xl p-6 sm:p-7 border border-brand-200 mb-5 text-center">
              <div className="text-xs sm:text-sm font-medium text-brand-700 mb-1 uppercase tracking-wide">
                Per visit · mow + edge
              </div>
              <div className="text-5xl sm:text-6xl font-bold text-brand-800">${pricing.perVisit.mid.toFixed(0)}</div>
              <div className="text-sm text-brand-600 mt-2">
                Typically ${pricing.perVisit.low.toFixed(0)}–${pricing.perVisit.high.toFixed(0)} per visit
              </div>
            </div>

            <div className="flex">
              <Link
                to="/book"
                className="flex-1 px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 min-h-[48px]"
              >
                Book This Service <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-4">
              Estimate based on the area you traced. Final pricing confirmed on a quick site check —
              steep terrain, heavy overgrowth, or obstacles may adjust the price.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
