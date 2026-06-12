import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Droplets, Leaf, Sparkles, Wrench,
  ChevronDown, ChevronUp, FileText,
  Satellite, Layers, ZoomIn, ZoomOut,
  Download, Home, TreePine, LayoutGrid
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
  { id: 'powerWashing', label: 'Power Washing', icon: Droplets, color: 'blue', description: 'Driveways, walkways, siding, roofs' },
  { id: 'lawnCare', label: 'Lawn Care', icon: Leaf, color: 'green', description: 'Mowing, trimming, lawn maintenance' },
  { id: 'windowCleaning', label: 'Window Cleaning', icon: Sparkles, color: 'cyan', description: 'Interior & exterior windows' },
  { id: 'handyman', label: 'Handyman', icon: Wrench, color: 'orange', description: 'Repairs, installs, general tasks' },
];

const POWER_WASHING_AREAS = [
  { id: 'driveway', label: 'Driveway', color: '#3B82F6', icon: '🚗' },
  { id: 'frontWalkway', label: 'Front Walkway', color: '#10B981', icon: '🚶' },
  { id: 'backPatio', label: 'Back Patio', color: '#8B5CF6', icon: '🪑' },
  { id: 'siding', label: 'Siding / Walls', color: '#F59E0B', icon: '🏠' },
  { id: 'roof', label: 'Roof', color: '#EF4444', icon: '🏗️' },
];

const LAWN_CARE_AREAS = [
  { id: 'frontLawn', label: 'Front Lawn', color: '#22C55E', icon: '🌿' },
  { id: 'backLawn', label: 'Back Lawn', color: '#16A34A', icon: '🌳' },
];

const GRADE_OPTIONS = [
  { value: 'flat', label: 'Flat', description: 'Level terrain' },
  { value: 'gentle', label: 'Gentle Slope', description: 'Slight incline' },
  { value: 'moderate', label: 'Moderate Slope', description: 'Noticeable hill' },
  { value: 'steep', label: 'Steep', description: 'Significant incline' },
  { value: 'very_steep', label: 'Very Steep', description: 'Extreme slope' },
];

const COMPLEXITY_OPTIONS = [
  { value: 'simple', label: 'Simple', description: 'Open lawn, few obstacles' },
  { value: 'moderate', label: 'Moderate', description: 'Some flower beds, trees' },
  { value: 'complex', label: 'Complex', description: 'Fences, tight spaces, many obstacles' },
  { value: 'very_complex', label: 'Very Complex', description: 'Steep + obstacles, narrow passages' },
];

/* ──────────────── HELPERS ──────────────── */

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!MAPBOX_TOKEN) return { lat: 39.0837, lng: -84.5086 };
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await res.json();
    if (data.features?.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }
  } catch (e) { console.error('Geocoding failed:', e); }
  return null;
}

function getSatelliteUrl(lat: number, lng: number, zoom = 18, width = 800, height = 600): string {
  if (MAPBOX_TOKEN) {
    return `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},${zoom},0/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`;
  }
  return '';
}

/* ──────────────── COMPONENT ──────────────── */

export default function EstimatePage() {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [satelliteLoaded, setSatelliteLoaded] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [estimate, setEstimate] = useState<any>(null);
  const [generatingQuote, setGeneratingQuote] = useState(false);
  const [zoom, setZoom] = useState(18);

  const [propertyMetrics, setPropertyMetrics] = useState({
    sqft_siding: 1800, sqft_driveway: 600, sqft_frontWalkway: 120,
    sqft_backPatio: 200, sqft_frontLawn: 2000, sqft_backLawn: 1500,
    window_count: 16, sqft_roof: 1800, stories: 2, condition: 'moderate',
    frequency: 'biweekly', grade: 'flat', complexity: 'simple',
    estimated_hours: 2, accessibility: 'street',
  });

  // Get current service's areas
  const currentAreas = selectedService === 'powerWashing' ? POWER_WASHING_AREAS :
    selectedService === 'lawnCare' ? LAWN_CARE_AREAS : [];

  // Auto-select all areas when service changes
  useEffect(() => {
    if (currentAreas.length > 0) {
      setSelectedAreas(currentAreas.map(a => a.id));
    } else {
      setSelectedAreas([]);
    }
    setEstimate(null);
  }, [selectedService]);

  const handleGeocode = useCallback(async () => {
    if (!address.trim()) return;
    setGeocoding(true);
    setSatelliteLoaded(false);
    const result = await geocodeAddress(address);
    if (result) setCoords(result);
    setGeocoding(false);
  }, [address]);

  const toggleArea = (id: string) => {
    setSelectedAreas(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const selectAllAreas = () => {
    setSelectedAreas(currentAreas.map(a => a.id));
  };

  const calculate = () => {
    let pricing = { low: 0, mid: 0, high: 0 };
    const areaResults: any = {};

    if (selectedService === 'powerWashing') {
      let total = { low: 0, mid: 0, high: 0 };
      selectedAreas.forEach(areaId => {
        const area = POWER_WASHING_AREAS.find(a => a.id === areaId);
        if (!area) return;
        let p = { low: 0, mid: 0, high: 0 };
        if (areaId === 'driveway') p = calculatePowerWashing({ sqft_driveway: propertyMetrics.sqft_driveway, stories: 1, condition: propertyMetrics.condition });
        else if (areaId === 'frontWalkway' || areaId === 'backPatio') {
          const sqft = areaId === 'frontWalkway' ? propertyMetrics.sqft_frontWalkway : propertyMetrics.sqft_backPatio;
          p = calculatePowerWashing({ sqft_walkways: sqft, stories: 1, condition: propertyMetrics.condition });
        } else if (areaId === 'siding') p = calculatePowerWashing({ sqft_siding: propertyMetrics.sqft_siding, stories: propertyMetrics.stories, condition: propertyMetrics.condition });
        else if (areaId === 'roof') {
          const r = { low: 0.20, mid: 0.28, high: 0.35 };
          p = { low: propertyMetrics.sqft_roof * r.low, mid: propertyMetrics.sqft_roof * r.mid, high: propertyMetrics.sqft_roof * r.high };
        }
        areaResults[areaId] = { ...p, label: area.label };
        total.low += p.low;
        total.mid += p.mid;
        total.high += p.high;
      });
      pricing = total;
    } else if (selectedService === 'lawnCare') {
      let total = { low: 0, mid: 0, high: 0 };
      selectedAreas.forEach(areaId => {
        const area = LAWN_CARE_AREAS.find(a => a.id === areaId);
        if (!area) return;
        const sqft = areaId === 'frontLawn' ? propertyMetrics.sqft_frontLawn : propertyMetrics.sqft_backLawn;
        const p = calculateLawnCare({
          sqft_lawn: sqft,
          frequency: propertyMetrics.frequency,
          grade: propertyMetrics.grade,
          complexity: propertyMetrics.complexity,
        });
        areaResults[areaId] = { ...p, label: area.label };
        total.low += p.low;
        total.mid += p.mid;
        total.high += p.high;
      });
      pricing = total;
    } else if (selectedService === 'windowCleaning') {
      pricing = calculateWindowCleaning({ window_count: propertyMetrics.window_count, stories: propertyMetrics.stories });
    } else if (selectedService === 'handyman') {
      pricing = calculateHandyman({ estimated_hours: propertyMetrics.estimated_hours });
    }

    setEstimate({ areas: areaResults, total: pricing });
  };

  const handleGenerateQuote = () => {
    setGeneratingQuote(true);
    setTimeout(() => { setGeneratingQuote(false); alert('Quote generated!'); }, 1500);
  };

  const currentService = SERVICES.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Free Estimate | Mursen Maintenance</title>
        <meta name="description" content="Get a free instant estimate powered by satellite imagery." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="bg-brand-700 text-white py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 uppercase tracking-wide">
            <Satellite className="w-4 h-4" />
            Instant Estimates
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Choose Your Service. Get Your Price.
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
            Enter your address, pick a service, and get an instant estimate. Satellite view for exterior jobs.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ─── STEP 1: ADDRESS ─── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm mb-5 sm:mb-6">
          <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600" />
            Step 1: Enter Address
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGeocode()}
              placeholder="123 Main St, Covington, KY 41011"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-base sm:text-lg min-h-[48px]"
            />
            <button
              onClick={handleGeocode}
              disabled={geocoding || !address.trim()}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Satellite className="w-5 h-5" />
              {geocoding ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* ─── STEP 2: SERVICE SELECTOR ─── */}
        {coords && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm mb-5 sm:mb-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-brand-600" />
              Step 2: Select Service
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {SERVICES.map(service => {
                const Icon = service.icon;
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`relative p-4 sm:p-5 rounded-xl border-2 transition text-left min-h-[100px] ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 mb-2 ${isSelected ? 'text-brand-600' : 'text-gray-400'}`} />
                    <div className={`font-bold text-sm sm:text-base ${isSelected ? 'text-brand-700' : 'text-gray-900'}`}>
                      {service.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 hidden sm:block">{service.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── STEP 3: SATELLITE + AREAS + METRICS ─── */}
        {coords && selectedService && (
          <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">

            {/* LEFT: Satellite or Illustration */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900 flex items-center gap-2">
                  {(selectedService === 'powerWashing' || selectedService === 'lawnCare') ? (
                    <><Layers className="w-4 h-4 text-brand-600" /> Satellite View</>
                  ) : (
                    <><Home className="w-4 h-4 text-brand-600" /> {currentService?.label}</>
                  )}
                </h3>
                {(selectedService === 'powerWashing' || selectedService === 'lawnCare') && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => setZoom(z => Math.min(22, z + 1))} className="p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center">
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button onClick={() => setZoom(z => Math.max(14, z - 1))} className="p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center">
                      <ZoomOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {(selectedService === 'powerWashing' || selectedService === 'lawnCare') ? (
                <div className="relative aspect-video bg-gray-100">
                  {MAPBOX_TOKEN ? (
                    <img
                      src={getSatelliteUrl(coords.lat, coords.lng, zoom)}
                      alt="Satellite view"
                      className="w-full h-full object-cover"
                      onLoad={() => setSatelliteLoaded(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                      <Satellite className="w-12 h-12 mb-2 opacity-50" />
                      <p className="font-medium text-sm text-center">Satellite View</p>
                      <p className="text-xs text-center">Add VITE_MAPBOX_TOKEN to .env</p>
                      <p className="text-xs mt-1">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
                    </div>
                  )}
                  {/* Area overlays */}
                  {satelliteLoaded && selectedAreas.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {selectedAreas.map(areaId => {
                        const area = currentAreas.find(a => a.id === areaId);
                        if (!area) return null;
                        const positions: Record<string, any> = {
                          driveway: { top: '55%', left: '20%', width: '35%', height: '25%' },
                          frontWalkway: { top: '40%', left: '45%', width: '15%', height: '30%' },
                          backPatio: { top: '15%', left: '55%', width: '30%', height: '20%' },
                          siding: { top: '20%', left: '25%', width: '35%', height: '35%' },
                          roof: { top: '20%', left: '25%', width: '35%', height: '20%' },
                          frontLawn: { top: '60%', left: '10%', width: '80%', height: '35%' },
                          backLawn: { top: '5%', left: '10%', width: '80%', height: '35%' },
                        };
                        const pos = positions[areaId] || { top: '30%', left: '30%', width: '40%', height: '40%' };
                        return (
                          <div
                            key={areaId}
                            className="absolute border-2 rounded-lg flex items-center justify-center"
                            style={{
                              ...pos,
                              borderColor: area.color,
                              backgroundColor: `${area.color}20`,
                            }}
                          >
                            <span className="text-white text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: area.color }}>
                              {area.icon} {area.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* Illustration for Window Cleaning / Handyman */
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
                  {selectedService === 'windowCleaning' ? (
                    <>
                      <Sparkles className="w-20 h-20 text-cyan-400 mb-4" />
                      <p className="text-gray-600 font-medium text-center">Window Cleaning Estimate</p>
                      <p className="text-gray-400 text-sm text-center mt-1">Enter your window details below</p>
                    </>
                  ) : (
                    <>
                      <Wrench className="w-20 h-20 text-orange-400 mb-4" />
                      <p className="text-gray-600 font-medium text-center">Handyman Estimate</p>
                      <p className="text-gray-400 text-sm text-center mt-1">Describe your project below</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT: Areas + Metrics */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              {/* Area selection (Power Washing & Lawn Care only) */}
              {currentAreas.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-sm text-gray-900">Select Areas</h3>
                    <div className="flex gap-2">
                      <button onClick={selectAllAreas} className="text-xs text-brand-600 hover:text-brand-700 font-medium min-h-[32px]">Select All</button>
                      <button onClick={() => setSelectedAreas([])} className="text-xs text-gray-400 hover:text-gray-600 font-medium min-h-[32px]">Clear</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {currentAreas.map(area => (
                      <button
                        key={area.id}
                        onClick={() => toggleArea(area.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition text-left min-h-[48px] ${
                          selectedAreas.includes(area.id)
                            ? 'border-brand-300 bg-brand-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: selectedAreas.includes(area.id) ? area.color : '#E5E7EB' }}
                        >
                          {selectedAreas.includes(area.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-lg">{area.icon}</span>
                        <span className="font-medium text-sm text-gray-800">{area.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics toggle */}
              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition mb-3 min-h-[48px]"
              >
                <span className="font-display font-bold text-sm text-gray-900">Property Details</span>
                {showMetrics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showMetrics && (
                <div className="space-y-4 pt-2">
                  {/* Power Washing Metrics */}
                  {selectedService === 'powerWashing' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Driveway (sqft)</label>
                          <input type="number" value={propertyMetrics.sqft_driveway}
                            onChange={e => setPropertyMetrics(m => ({ ...m, sqft_driveway: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Walkway (sqft)</label>
                          <input type="number" value={propertyMetrics.sqft_frontWalkway}
                            onChange={e => setPropertyMetrics(m => ({ ...m, sqft_frontWalkway: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Patio (sqft)</label>
                          <input type="number" value={propertyMetrics.sqft_backPatio}
                            onChange={e => setPropertyMetrics(m => ({ ...m, sqft_backPatio: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Siding (sqft)</label>
                          <input type="number" value={propertyMetrics.sqft_siding}
                            onChange={e => setPropertyMetrics(m => ({ ...m, sqft_siding: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Roof (sqft)</label>
                          <input type="number" value={propertyMetrics.sqft_roof}
                            onChange={e => setPropertyMetrics(m => ({ ...m, sqft_roof: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Stories</label>
                          <select value={propertyMetrics.stories}
                            onChange={e => setPropertyMetrics(m => ({ ...m, stories: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]">
                            <option value={1}>1 Story</option>
                            <option value={2}>2 Stories</option>
                            <option value={3}>3+ Stories</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Property Condition</label>
                        <div className="flex gap-2">
                          {['light', 'moderate', 'heavy'].map(c => (
                            <button key={c} onClick={() => setPropertyMetrics(m => ({ ...m, condition: c }))}
                              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium capitalize transition min-h-[44px] ${
                                propertyMetrics.condition === c ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600'
                              }`}>
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Lawn Care Metrics */}
                  {selectedService === 'lawnCare' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Front Lawn (sqft)</label>
                          <input type="number" value={propertyMetrics.sqft_frontLawn}
                            onChange={e => setPropertyMetrics(m => ({ ...m, sqft_frontLawn: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Back Lawn (sqft)</label>
                          <input type="number" value={propertyMetrics.sqft_backLawn}
                            onChange={e => setPropertyMetrics(m => ({ ...m, sqft_backLawn: +e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Grade / Slope</label>
                        <select value={propertyMetrics.grade}
                          onChange={e => setPropertyMetrics(m => ({ ...m, grade: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]">
                          {GRADE_OPTIONS.map(g => (
                            <option key={g.value} value={g.value}>{g.label} — {g.description}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Complexity</label>
                        <select value={propertyMetrics.complexity}
                          onChange={e => setPropertyMetrics(m => ({ ...m, complexity: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]">
                          {COMPLEXITY_OPTIONS.map(c => (
                            <option key={c.value} value={c.value}>{c.label} — {c.description}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Service Frequency</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'weekly', label: 'Weekly' },
                            { value: 'biweekly', label: 'Bi-Weekly' },
                            { value: 'monthly', label: 'Monthly' },
                            { value: 'onetime', label: 'One-Time' },
                          ].map(f => (
                            <button key={f.value} onClick={() => setPropertyMetrics(m => ({ ...m, frequency: f.value }))}
                              className={`py-2.5 rounded-lg border text-sm font-medium transition min-h-[44px] ${
                                propertyMetrics.frequency === f.value ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600'
                              }`}>
                              {f.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Window Cleaning Metrics */}
                  {selectedService === 'windowCleaning' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Number of Windows</label>
                        <input type="number" value={propertyMetrics.window_count}
                          onChange={e => setPropertyMetrics(m => ({ ...m, window_count: +e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Stories</label>
                        <select value={propertyMetrics.stories}
                          onChange={e => setPropertyMetrics(m => ({ ...m, stories: +e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]">
                          <option value={1}>1 Story</option>
                          <option value={2}>2 Stories</option>
                          <option value={3}>3+ Stories</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Accessibility</label>
                        <div className="flex gap-2">
                          {[
                            { value: 'street', label: 'Ground Level' },
                            { value: 'mixed', label: 'Some 2nd Floor' },
                            { value: 'high', label: 'Mostly 2nd Floor+' },
                          ].map(a => (
                            <button key={a.value} onClick={() => setPropertyMetrics(m => ({ ...m, accessibility: a.value }))}
                              className={`flex-1 py-2.5 rounded-lg border text-xs font-medium transition min-h-[44px] ${
                                propertyMetrics.accessibility === a.value ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600'
                              }`}>
                              {a.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Handyman Metrics */}
                  {selectedService === 'handyman' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Estimated Hours</label>
                        <input type="number" value={propertyMetrics.estimated_hours} min={1}
                          onChange={e => setPropertyMetrics(m => ({ ...m, estimated_hours: +e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[44px]" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Describe the Task</label>
                        <textarea
                          placeholder="e.g. Fix leaky faucet, install ceiling fan, repair drywall..."
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm min-h-[80px] resize-none"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── CALCULATE ─── */}
        {selectedService && (
          <button onClick={calculate}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-base sm:text-lg py-4 rounded-xl transition shadow-lg shadow-brand-200 mb-6 sm:mb-8 min-h-[56px]">
            Generate {currentService?.label} Estimate
          </button>
        )}

        {/* ─── RESULTS ─── */}
        {estimate && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                {currentService?.label} Estimate
              </h2>
              <div className="text-xs sm:text-sm text-gray-500">
                {address && <span className="mr-3">📍 {address}</span>}
                {selectedAreas.length > 0 && <span>{selectedAreas.length} areas</span>}
              </div>
            </div>

            {Object.keys(estimate.areas).length > 0 && (
              <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                {Object.entries(estimate.areas).map(([key, val]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between py-2.5 sm:py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: currentAreas.find(a => a.id === key)?.color }} />
                      <span className="font-medium text-gray-800 text-sm sm:text-base">{val.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-bold text-gray-900">${val.mid.toFixed(2)}</span>
                      <span className="text-[10px] sm:text-xs text-gray-500 ml-1 sm:ml-2">${val.low.toFixed(0)}–${val.high.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-brand-50 rounded-xl p-5 sm:p-6 border border-brand-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs sm:text-sm font-medium text-brand-700 mb-1">Estimated Total</div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand-800">${estimate.total.mid.toFixed(2)}</div>
                  <div className="text-xs sm:text-sm text-brand-600 mt-1">Range: ${estimate.total.low.toFixed(2)} – ${estimate.total.high.toFixed(2)}</div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleGenerateQuote} disabled={generatingQuote}
                    className="flex-1 sm:flex-none px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 min-h-[48px]">
                    {generatingQuote ? 'Generating...' : <><FileText className="w-5 h-5" /> Generate Quote</>}
                  </button>
                  <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition min-h-[48px] flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-4">Estimates are approximate. Final pricing confirmed after on-site inspection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
