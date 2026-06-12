import area from '@turf/area';
import { polygon as turfPolygon } from '@turf/helpers';

/** A parcel boundary as a single outer ring of [lng, lat] coordinates. */
export interface ParcelResult {
  /** Outer ring, GeoJSON order ([lng, lat]), closed (first === last). */
  ring: [number, number][];
  /** Lot area of the parcel in square feet. */
  lotSqft: number;
  /** Which county GIS endpoint answered. */
  source: string;
}

/**
 * Free, key-less county GIS parcel endpoints (ArcGIS REST FeatureServer /
 * MapServer layers that answer point-intersect queries). These cover Mursen's
 * Northern Kentucky / Greater Cincinnati service area. County GIS URLs change
 * over time, so the list can be overridden at build time with a comma-separated
 * VITE_PARCEL_ENDPOINTS env var. Lookups are best-effort: any failure (404,
 * CORS, no match) silently falls through to the next endpoint, and ultimately
 * to manual drawing.
 */
const DEFAULT_ENDPOINTS: string[] = [
  // Hamilton County, OH (CAGIS)
  'https://services.arcgis.com/Qf9LqlMVrZqMLTzd/arcgis/rest/services/Parcels/FeatureServer/0',
  // LINK-GIS — Kenton & Campbell County, KY
  'https://maps.linkgis.org/arcgis/rest/services/AGS_PVA_Parcels/MapServer/0',
  // Boone County, KY
  'https://gisweb.boonecountygis.com/arcgis/rest/services/Parcels/MapServer/0',
];

function getEndpoints(): string[] {
  const override = (import.meta.env.VITE_PARCEL_ENDPOINTS as string | undefined)?.trim();
  if (override) {
    return override.split(',').map(s => s.trim()).filter(Boolean);
  }
  return DEFAULT_ENDPOINTS;
}

/**
 * Look up the parcel polygon containing a lat/lng using free county GIS.
 * Returns null if no endpoint can resolve it (caller should fall back to a
 * fully manual draw).
 */
export async function lookupParcel(
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<ParcelResult | null> {
  for (const endpoint of getEndpoints()) {
    try {
      const ring = await queryArcGISParcel(endpoint, lat, lng, signal);
      if (ring && ring.length >= 4) {
        const lotSqft = ringAreaSqft(ring);
        if (lotSqft > 0) {
          return { ring, lotSqft, source: endpoint };
        }
      }
    } catch {
      /* try the next endpoint */
    }
  }
  return null;
}

async function queryArcGISParcel(
  endpoint: string,
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<[number, number][] | null> {
  const params = new URLSearchParams({
    f: 'geojson',
    geometry: JSON.stringify({ x: lng, y: lat, spatialReference: { wkid: 4326 } }),
    geometryType: 'esriGeometryPoint',
    inSR: '4326',
    outSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: '',
    returnGeometry: 'true',
  });
  const res = await fetch(`${endpoint}/query?${params.toString()}`, { signal });
  if (!res.ok) return null;
  const data = await res.json();

  const geom = data?.features?.[0]?.geometry;
  if (!geom) return null;

  // GeoJSON Polygon → first ring; MultiPolygon → first polygon's first ring.
  if (geom.type === 'Polygon' && Array.isArray(geom.coordinates?.[0])) {
    return geom.coordinates[0] as [number, number][];
  }
  if (geom.type === 'MultiPolygon' && Array.isArray(geom.coordinates?.[0]?.[0])) {
    return geom.coordinates[0][0] as [number, number][];
  }
  return null;
}

/** Geodesic area of a closed [lng,lat] ring, in square feet. */
export function ringAreaSqft(ring: [number, number][]): number {
  if (ring.length < 4) return 0;
  const closed: [number, number][] =
    ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]
      ? ring
      : [...ring, ring[0]];
  try {
    const sqMeters = area(turfPolygon([closed]));
    return sqMeters * 10.7639; // m² → ft²
  } catch {
    return 0;
  }
}
