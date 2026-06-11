import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Home, Droplets, Leaf, Sparkles, Wrench,
  Calculator, ChevronDown, ChevronUp, FileText, Check,
  Satellite, Layers, Ruler, ZoomIn, ZoomOut, RotateCcw,
  Square, Circle, Triangle, ArrowRight, Download, Send
} from 'lucide-react';
import {
  calculatePowerWashing,
  calculateLawnCare,
  calculateWindowCleaning,
  calculateHandyman
} from '../../lib/pricing';

/* ──────────────── CONSTANTS ──────────────── */

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

const SERVICES = [
  { id: 'powerWashing', label: 'Power Washing', icon: Droplets, color: 'blue' },
  { id: 'lawnCare', label: 'Lawn Care', icon: Leaf, color: 'green' },
  { id: 'windowCleaning', label: 'Window Cleaning', icon: Sparkles, color: 'cyan' },
  { id: 'handyman', label: 'Handyman', icon: Wrench, color: 'orange' },
];

const PROPERTY_AREAS = [
  { id: 'driveway', label: 'Driveway', icon: Square, color: '#3B82F6', service: 'powerWashing' },
  { id: 'frontWalkway', label: 'Front Walkway', icon: ArrowRight, color: '#10B981', service: 'powerWashing' },
  { id: 'backPatio', label: 'Back Patio', icon: Square, color: '#8B5CF6', service: 'powerWashing' },
  { id: 'siding', label: 'Siding / Exterior Walls', icon: Home, color: '#F59E0B', service: 'powerWashing' },
  { id: 'frontLawn', label: 'Front Lawn', icon: Leaf, color: '#22C55E', service: 'lawnCare' },
  { id: 'backLawn', label: 'Back Lawn', icon: Leaf, color: '#16A34A', service: 'lawnCare' },
  { id: 'windows', label: 'Windows', icon: Sparkles, color: '#06B6D4', service: 'windowCleaning' },
  { id: 'roof', label: 'Roof', icon: Triangle, color: '#EF4444', service: 'powerWashing' },
];

/* ──────────────── HELPER: Geocode Address ──────────────── */

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!MAPBOX_TOKEN) {
    // Fallback: Covington, KY
    return { lat: 39.0837, lng: -84.5086 };
  }
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await res.json();
    if (data.features?.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }
  } catch (e) {
    console.error('Geocoding failed:', e);
  }
  return null;
}

/* ──────────────── HELPER: Satellite URL ──────────────── */

function getSatelliteUrl(lat: number, lng: number, zoom = 18, width = 800, height = 600): string {
  if (MAPBOX_TOKEN) {
    return `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},${zoom},0/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`;
  }
  // Fallback: Google Maps static
  return `https://maps.googleapis.com/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=satellite&key=YOUR_KEY`;
}

/* ──────────────── COMPONENT ──────────────── */

export default function EstimatePage() {
  // Address & Geocoding
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [satelliteLoaded, setSatelliteLoaded] = useState(false);

  // Services & Areas
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [showAllAreas, setShowAllAreas] = useState(true);

  // Property Metrics (editable after satellite analysis)
  const [propertyMetrics, setPropertyMetrics] = useState({
    sqft_siding: 1800,
    sqft_driveway: 600,
    sqft_frontWalkway: 120,
    sqft_backPatio: 200,
    sqft_frontLawn: 2000,
    sqft_backLawn: 1500,
    window_count: 16,
    sqft_roof: 1800,
    stories: 2,
    condition: 'moderate',
    frequency: 'biweekly',
    estimated_hours: 2,
  });

  // UI State
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [estimate, setEstimate] = useState<any>(null);
  const [generatingQuote, setGeneratingQuote] = useState(false);
  const [zoom, setZoom] = useState(18);
  const mapRef = useRef<HTMLDivElement>(null);

  // Auto-select all areas when services change
  useEffect(() => {
    if (selectedServices.length > 0 && showAllAreas) {
      const relevantAreas = PROPERTY_AREAS
        .filter(a => selectedServices.includes(a.service))
        .map(a => a.id);
      setSelectedAreas(relevantAreas);
    }
  }, [selectedServices, showAllAreas]);

  // Geocode on address submit
  const handleGeocode = useCallback(async () => {
    if (!address.trim()) return;
    setGeocoding(true);
    setSatelliteLoaded(false);
    const result = await geocodeAddress(address);
    if (result) {
      setCoords(result);
    }
    setGeocoding(false);
  }, [address]);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleArea = (id: string) => {
    setSelectedAreas(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
    setShowAllAreas(false);
  };

  const selectAllAreas = () => {
    const relevantAreas = PROPERTY_AREAS
      .filter(a => selectedServices.includes(a.service))
      .map(a => a.id);
    setSelectedAreas(relevantAreas);
    setShowAllAreas(true);
  };

  const deselectAllAreas = () => {
    setSelectedAreas([]);
    setShowAllAreas(false);
  };

  // Calculate pricing for selected areas only
  const calculate = () => {
    const results: any = { areas: {}, total: { low: 0, mid: 0, high: 0 } };

    selectedAreas.forEach(areaId => {
      const area = PROPERTY_AREAS.find(a => a.id === areaId);
      if (!area) return;

      let pricing = { low: 0, mid: 0, high: 0 };

      if (area.service === 'powerWashing') {
        if (areaId === 'driveway') {
          pricing = calculatePowerWashing({ sqft_driveway: propertyMetrics.sqft_driveway, stories: 1, condition: propertyMetrics.condition });
        } else if (areaId === 'frontWalkway' || areaId === 'backPatio') {
          const sqft = areaId === 'frontWalkway' ? propertyMetrics.sqft_frontWalkway : propertyMetrics.sqft_backPatio;
          pricing = calculatePowerWashing({ sqft_walkways: sqft, stories: 1, condition: propertyMetrics.condition });
        } else if (areaId === 'siding') {
          pricing = calculatePowerWashing({ sqft_siding: propertyMetrics.sqft_siding, stories: propertyMetrics.stories, condition: propertyMetrics.condition });
        } else if (areaId === 'roof') {
          // Roof pricing: ~$0.20-0.35/sqft
          const rate = { low: 0.20, mid: 0.28, high: 0.35 };
          pricing = {
            low: propertyMetrics.sqft_roof * rate.low,
            mid: propertyMetrics.sqft_roof * rate.mid,
            high: propertyMetrics.sqft_roof * rate.high,
          };
        }
      } else if (area.service === 'lawnCare') {
        const sqft = areaId === 'frontLawn' ? propertyMetrics.sqft_frontLawn : propertyMetrics.sqft_backLawn;
        pricing = calculateLawnCare({ sqft_lawn: sqft, frequency: propertyMetrics.frequency });
      } else if (area.service === 'windowCleaning') {
        // Split windows roughly: 60% main, 40% secondary
        const windows = areaId === 'windows' ? propertyMetrics.window_count : Math.round(propertyMetrics.window_count * 0.4);
        pricing = calculateWindowCleaning({ window_count: windows, stories: propertyMetrics.stories });
      }

      results.areas[areaId] = { ...pricing, label: area.label, service: area.service };
      results.total.low += pricing.low;
      results.total.mid += pricing.mid;
      results.total.high += pricing.high;
    });

    setEstimate(results);
  };

  // Generate quote
  const handleGenerateQuote = () => {
    setGeneratingQuote(true);
    // Simulate quote generation
    setTimeout(() => {
      setGeneratingQuote(false);
      alert('Quote generated! In production, this would create a PDF and save to Supabase.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Free Estimate | Mursen Maintenance</title>
        <meta name="description" content="Get a free instant estimate powered by satellite imagery. Select exactly which areas you need serviced." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="bg-brand-700 text-white py-12">
        <div className="container-app max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            <Satellite className="w-4 h-4" />
            Satellite-Powered Estimates
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            See Your Property. Pick What You Need.
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Enter your address. View satellite imagery. Select exactly which areas to quote — driveway, backyard, siding, or everything.
          </p>
        </div>
      </section>

      <div className="container-app max-w-7xl mx-auto px-6 py-8">
        {/* ─── STEP 1: ADDRESS INPUT ─── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600" />
            Step 1: Enter Property Address
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGeocode()}
              placeholder="123 Main St, Covington, KY 41011"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-lg"
            />
            <button
              onClick={handleGeocode}
              disabled={geocoding || !address.trim()}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition flex items-center gap-2"
            >
              <Satellite className="w-5 h-5" />
              {geocoding ? 'Analyzing...' : 'Analyze Property'}
            </button>
          </div>
        </div>

        {/* ─── STEP 2: SATELLITE VIEW + AREA SELECTION ─── */}
        {coords && (
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Satellite Image */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-display font-bold text-gray-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-brand-600" />
                  Satellite View
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(z => Math.min(22, z + 1))} className="p-1.5 rounded-lg hover:bg-gray-100">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-gray-500">Zoom {zoom}</span>
                  <button onClick={() => setZoom(z => Math.max(14, z - 1))} className="p-1.5 rounded-lg hover:bg-gray-100">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div ref={mapRef} className="relative aspect-video bg-gray-100">
                {MAPBOX_TOKEN ? (
                  <img
                    src={getSatelliteUrl(coords.lat, coords.lng, zoom)}
                    alt="Satellite view"
                    className="w-full h-full object-cover"
                    onLoad={() => setSatelliteLoaded(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <Satellite className="w-16 h-16 mb-3 opacity-50" />
                    <p className="font-medium">Satellite View</p>
                    <p className="text-sm">Add VITE_MAPBOX_TOKEN to .env for live imagery</p>
                    <p className="text-xs mt-2">Coords: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
                  </div>
                )}

                {/* Area overlays (when loaded) */}
                {satelliteLoaded && selectedAreas.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Visual overlay indicators */}
                    {selectedAreas.map(areaId => {
                      const area = PROPERTY_AREAS.find(a => a.id === areaId);
                      if (!area) return null;
                      // Simplified overlay positions (in production, use actual polygon detection)
                      const positions: Record<string, { top: string; left: string; width: string; height: string }> = {
                        driveway: { top: '65%', left: '20%', width: '30%', height: '25%' },
                        frontWalkway: { top: '55%', left: '45%', width: '10%', height: '20%' },
                        backPatio: { top: '25%', left: '55%', width: '25%', height: '15%' },
                        siding: { top: '30%', left: '30%', width: '35%', height: '30%' },
                        frontLawn: { top: '60%', left: '5%', width: '40%', height: '30%' },
                        backLawn: { top: '10%', left: '5%', width: '40%', height: '40%' },
                        windows: { top: '35%', left: '35%', width: '10%', height: '10%' },
                        roof: { top: '25%', left: '25%', width: '40%', height: '25%' },
                      };
                      const pos = positions[areaId] || { top: '50%', left: '50%', width: '20%', height: '20%' };
                      return (
                        <div
                          key={areaId}
                          className="absolute border-2 rounded-lg animate-pulse"
                          style={{
                            ...pos,
                            borderColor: area.color,
                            backgroundColor: `${area.color}20`,
                          }}
                        >
                          <span className="absolute -top-5 left-0 text-xs font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: area.color }}>
                            {area.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Coordinates display */}
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                </div>
              </div>
            </div>

            {/* Area Selection Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-display font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-brand-600" />
                  Step 2: Select Areas to Quote
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Click areas on the property you want serviced. Unchecked areas won't be included in the quote.
                </p>

                {/* Quick actions */}
                <div className="flex gap-2 mb-4">
                  <button onClick={selectAllAreas} className="text-xs px-3 py-1.5 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition font-medium">
                    Select All
                  </button>
                  <button onClick={deselectAllAreas} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition font-medium">
                    Clear All
                  </button>
                </div>

                {/* Area checkboxes */}
                <div className="space-y-2">
                  {PROPERTY_AREAS.filter(a => selectedServices.includes(a.service)).map(area => {
                    const Icon = area.icon;
                    const selected = selectedAreas.includes(area.id);
                    return (
                      <label
                        key={area.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selected
                            ? 'border-brand-400 bg-brand-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleArea(area.id)}
                          className="sr-only"
                        />
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${area.color}20` }}>
                          <Icon className="w-4 h-4" style={{ color: area.color }} />
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{area.label}</span>
                        {selected && <Check className="w-4 h-4 text-brand-600 ml-auto" />}
                      </label>
                    );
                  })}
                </div>

                {/* Selected count */}
                <div className="mt-4 text-xs text-gray-500 text-center">
                  {selectedAreas.length} of {PROPERTY_AREAS.filter(a => selectedServices.includes(a.service)).length} areas selected
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 3: SERVICES + METRICS ─── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Services */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-brand-600" />
              Step 3: Select Services
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

          {/* Property Metrics */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="font-display text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brand-600" />
                Property Measurements
              </h2>
              {showAdvanced ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <p className="text-gray-500 text-sm mt-1">
              Adjust square footage based on your property
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Front Walkway (sq ft)</label>
                  <input type="number" value={propertyMetrics.sqft_frontWalkway}
                    onChange={e => setPropertyMetrics(p => ({ ...p, sqft_frontWalkway: +e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Back Patio (sq ft)</label>
                  <input type="number" value={propertyMetrics.sqft_backPatio}
                    onChange={e => setPropertyMetrics(p => ({ ...p, sqft_backPatio: +e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Front Lawn (sq ft)</label>
                  <input type="number" value={propertyMetrics.sqft_frontLawn}
                    onChange={e => setPropertyMetrics(p => ({ ...p, sqft_frontLawn: +e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Back Lawn (sq ft)</label>
                  <input type="number" value={propertyMetrics.sqft_backLawn}
                    onChange={e => setPropertyMetrics(p => ({ ...p, sqft_backLawn: +e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roof (sq ft)</label>
                  <input type="number" value={propertyMetrics.sqft_roof}
                    onChange={e => setPropertyMetrics(p => ({ ...p, sqft_roof: +e.target.value }))}
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
        </div>

        {/* ─── CALCULATE BUTTON ─── */}
        <button
          onClick={calculate}
          disabled={selectedAreas.length === 0}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-brand-200 mb-8"
        >
          Generate Estimate for {selectedAreas.length} Area{selectedAreas.length !== 1 ? 's' : ''}
        </button>

        {/* ─── ESTIMATE RESULTS ─── */}
        {estimate && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-gray-900">Your Estimate</h2>
              <div className="text-sm text-gray-500">
                {address && <span className="mr-3">📍 {address}</span>}
                <span>{selectedAreas.length} areas</span>
              </div>
            </div>

            {/* Area Breakdown */}
            <div className="space-y-3 mb-6">
              {Object.entries(estimate.areas).map(([key, val]: [string, any]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PROPERTY_AREAS.find(a => a.id === key)?.color }} />
                    <span className="font-medium text-gray-800">{val.label}</span>
                    <span className="text-xs text-gray-400 capitalize">({val.service.replace(/([A-Z])/g, ' $1').trim()})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">${val.mid.toFixed(2)}</span>
                    <span className="text-xs text-gray-500 ml-2">${val.low.toFixed(0)}–${val.high.toFixed(0)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-brand-700 mb-1">Estimated Total</div>
                  <div className="text-4xl font-bold text-brand-800">${estimate.total.mid.toFixed(2)}</div>
                  <div className="text-sm text-brand-600 mt-1">
                    Range: ${estimate.total.low.toFixed(2)} – ${estimate.total.high.toFixed(2)}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleGenerateQuote}
                    disabled={generatingQuote}
                    className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition flex items-center gap-2"
                  >
                    {generatingQuote ? (
                      <>Generating...</>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        Generate Quote
                      </>
                    )}
                  </button>
                  <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              Estimates are approximate. Final pricing confirmed after on-site inspection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
