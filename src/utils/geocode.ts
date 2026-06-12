const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

export interface GeocodeResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function geocodeAddress(address: string): Promise<GeocodeResult[]> {
  if (!MAPBOX_TOKEN) {
    throw new Error('Mapbox token not configured');
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=3&country=us`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    return [];
  }

  return data.features.map((f: any) => ({
    lat: String(f.center[1]),
    lon: String(f.center[0]),
    display_name: f.place_name,
  }));
}
