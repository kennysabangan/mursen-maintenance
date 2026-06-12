export interface GeocodeResult {
  lat: number;
  lng: number;
  /** Normalized/matched address string, when the provider returns one. */
  label?: string;
  source: 'census' | 'nominatim';
}

/**
 * Geocode a US street address using only free, key-less, CORS-friendly
 * services. Tries the US Census geocoder first (best for US street
 * addresses), then falls back to OpenStreetMap Nominatim.
 *
 * Returns null if the address could not be located.
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const query = address.trim();
  if (!query) return null;

  const census = await geocodeCensus(query);
  if (census) return census;

  const nominatim = await geocodeNominatim(query);
  if (nominatim) return nominatim;

  return null;
}

async function geocodeCensus(address: string): Promise<GeocodeResult | null> {
  try {
    const url =
      'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress' +
      `?address=${encodeURIComponent(address)}` +
      '&benchmark=Public_AR_Current&format=json';
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const match = data?.result?.addressMatches?.[0];
    if (match?.coordinates) {
      return {
        lat: match.coordinates.y,
        lng: match.coordinates.x,
        label: match.matchedAddress,
        source: 'census',
      };
    }
  } catch {
    /* fall through to next provider */
  }
  return null;
}

async function geocodeNominatim(address: string): Promise<GeocodeResult | null> {
  try {
    const url =
      'https://nominatim.openstreetmap.org/search' +
      `?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=us`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    const hit = Array.isArray(data) ? data[0] : null;
    if (hit?.lat && hit?.lon) {
      return {
        lat: parseFloat(hit.lat),
        lng: parseFloat(hit.lon),
        label: hit.display_name,
        source: 'nominatim',
      };
    }
  } catch {
    /* give up */
  }
  return null;
}
