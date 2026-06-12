import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ringAreaSqft } from '../utils/parcels';
import { Pencil, Check, Undo2, Trash2, X, MousePointer2 } from 'lucide-react';

type LngLat = [number, number];
interface LawnPolygon {
  id: string;
  coords: LngLat[]; // open ring (not closed)
}
type Mode = 'idle' | 'draw' | 'edit';

interface Props {
  center: { lat: number; lng: number };
  /** Optional reference parcel boundary (open or closed ring of [lng,lat]). */
  parcelRing?: LngLat[] | null;
  /** Called whenever the measured lawn area changes. */
  onAreaChange: (totalSqft: number) => void;
}

const ESRI_IMAGERY =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

const emptyFC = (): GeoJSON.FeatureCollection => ({ type: 'FeatureCollection', features: [] });

function closeRing(coords: LngLat[]): LngLat[] {
  if (coords.length === 0) return coords;
  const [fx, fy] = coords[0];
  const [lx, ly] = coords[coords.length - 1];
  return fx === lx && fy === ly ? coords : [...coords, coords[0]];
}

export default function LawnMeasureMap({ center, parcelRing, onAreaChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const loadedRef = useRef(false);

  // Mutable drawing state (refs so map event handlers always see latest).
  const polygonsRef = useRef<LawnPolygon[]>([]);
  const draftRef = useRef<LngLat[]>([]);
  const cursorRef = useRef<LngLat | null>(null);
  const modeRef = useRef<Mode>('idle');
  const onAreaChangeRef = useRef(onAreaChange);
  onAreaChangeRef.current = onAreaChange;

  const [mode, setMode] = useState<Mode>('idle');
  const [draftLen, setDraftLen] = useState(0);
  const [polyCount, setPolyCount] = useState(0);
  const [totalSqft, setTotalSqft] = useState(0);

  const setModeBoth = useCallback((m: Mode) => {
    modeRef.current = m;
    setMode(m);
    const map = mapRef.current;
    if (map) {
      map.getCanvas().style.cursor = m === 'draw' ? 'crosshair' : '';
      if (m === 'idle') map.doubleClickZoom.enable();
      else map.doubleClickZoom.disable();
    }
  }, []);

  /** Push current geometry to the map sources + recompute area. */
  const sync = useCallback(() => {
    const map = mapRef.current;
    if (!map || !loadedRef.current) return;
    const polys = polygonsRef.current;

    // Completed polygons (fill + outline).
    (map.getSource('lawn') as maplibregl.GeoJSONSource | undefined)?.setData({
      type: 'FeatureCollection',
      features: polys
        .filter(p => p.coords.length >= 3)
        .map((p, idx) => ({
          type: 'Feature',
          properties: { idx },
          geometry: { type: 'Polygon', coordinates: [closeRing(p.coords)] },
        })),
    } as GeoJSON.FeatureCollection);

    // Draft (in-progress) line with a live rubber-band segment to the cursor.
    const draft = draftRef.current;
    const draftLine = cursorRef.current && modeRef.current === 'draw'
      ? [...draft, cursorRef.current]
      : draft;
    (map.getSource('draft') as maplibregl.GeoJSONSource | undefined)?.setData({
      type: 'FeatureCollection',
      features: draftLine.length >= 2
        ? [{ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: draftLine } }]
        : [],
    } as GeoJSON.FeatureCollection);

    // Edit handles: vertices + edge midpoints (only shown in edit mode).
    const vertexFeatures: GeoJSON.Feature[] = [];
    const midFeatures: GeoJSON.Feature[] = [];
    if (modeRef.current === 'edit') {
      polys.forEach((p, polyIdx) => {
        const n = p.coords.length;
        p.coords.forEach((c, vertIdx) => {
          vertexFeatures.push({
            type: 'Feature',
            properties: { polyIdx, vertIdx },
            geometry: { type: 'Point', coordinates: c },
          });
          const next = p.coords[(vertIdx + 1) % n];
          midFeatures.push({
            type: 'Feature',
            properties: { polyIdx, insertAt: vertIdx + 1 },
            geometry: { type: 'Point', coordinates: [(c[0] + next[0]) / 2, (c[1] + next[1]) / 2] },
          });
        });
      });
    }
    // Also show draft vertices while drawing.
    if (modeRef.current === 'draw') {
      draft.forEach((c, vertIdx) => {
        vertexFeatures.push({
          type: 'Feature',
          properties: { draft: true, vertIdx },
          geometry: { type: 'Point', coordinates: c },
        });
      });
    }
    (map.getSource('midpoints') as maplibregl.GeoJSONSource | undefined)?.setData({
      type: 'FeatureCollection',
      features: midFeatures,
    } as GeoJSON.FeatureCollection);
    (map.getSource('vertices') as maplibregl.GeoJSONSource | undefined)?.setData({
      type: 'FeatureCollection',
      features: vertexFeatures,
    } as GeoJSON.FeatureCollection);

    // Recompute total measured area.
    const total = polys
      .filter(p => p.coords.length >= 3)
      .reduce((sum, p) => sum + ringAreaSqft(closeRing(p.coords)), 0);
    setTotalSqft(total);
    setPolyCount(polys.filter(p => p.coords.length >= 3).length);
    setDraftLen(draft.length);
    onAreaChangeRef.current(total);
  }, []);

  /* ── Map init (once) ── */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          esri: {
            type: 'raster',
            tiles: [ESRI_IMAGERY],
            tileSize: 256,
            attribution:
              'Imagery © Esri, Maxar, Earthstar Geographics, and the GIS User Community',
          },
        },
        layers: [{ id: 'esri', type: 'raster', source: 'esri' }],
      },
      center: [center.lng, center.lat],
      zoom: 19,
      maxZoom: 22,
      attributionControl: { compact: true },
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      loadedRef.current = true;

      map.addSource('parcel', { type: 'geojson', data: emptyFC() });
      map.addSource('lawn', { type: 'geojson', data: emptyFC() });
      map.addSource('draft', { type: 'geojson', data: emptyFC() });
      map.addSource('midpoints', { type: 'geojson', data: emptyFC() });
      map.addSource('vertices', { type: 'geojson', data: emptyFC() });

      map.addLayer({
        id: 'parcel-line', type: 'line', source: 'parcel',
        paint: { 'line-color': '#facc15', 'line-width': 2, 'line-dasharray': [2, 2] },
      });
      map.addLayer({
        id: 'lawn-fill', type: 'fill', source: 'lawn',
        paint: { 'fill-color': '#22c55e', 'fill-opacity': 0.35 },
      });
      map.addLayer({
        id: 'lawn-outline', type: 'line', source: 'lawn',
        paint: { 'line-color': '#16a34a', 'line-width': 3 },
      });
      map.addLayer({
        id: 'draft-line', type: 'line', source: 'draft',
        paint: { 'line-color': '#22c55e', 'line-width': 2, 'line-dasharray': [1, 1] },
      });
      map.addLayer({
        id: 'midpoints', type: 'circle', source: 'midpoints',
        paint: {
          'circle-radius': 4, 'circle-color': '#ffffff',
          'circle-opacity': 0.7, 'circle-stroke-color': '#16a34a', 'circle-stroke-width': 1,
        },
      });
      map.addLayer({
        id: 'vertices', type: 'circle', source: 'vertices',
        paint: {
          'circle-radius': 6, 'circle-color': '#ffffff',
          'circle-stroke-color': '#16a34a', 'circle-stroke-width': 2.5,
        },
      });

      // Seed the parcel reference boundary, if we have one, and fit to it.
      if (parcelRing && parcelRing.length >= 3) {
        const ring = closeRing(parcelRing);
        (map.getSource('parcel') as maplibregl.GeoJSONSource).setData({
          type: 'Feature', properties: {},
          geometry: { type: 'Polygon', coordinates: [ring] },
        } as GeoJSON.Feature);
        const bounds = ring.reduce(
          (b, c) => b.extend(c as [number, number]),
          new maplibregl.LngLatBounds(ring[0] as [number, number], ring[0] as [number, number]),
        );
        map.fitBounds(bounds, { padding: 60, maxZoom: 21, duration: 0 });
      }
      sync();
    });

    /* ── Drawing interactions ── */
    let dragging: { poly: number; vert: number } | null = null;

    map.on('click', (e) => {
      if (modeRef.current !== 'draw') return;
      draftRef.current.push([e.lngLat.lng, e.lngLat.lat]);
      sync();
    });

    map.on('mousemove', (e) => {
      if (dragging) {
        const p = polygonsRef.current[dragging.poly];
        if (p) {
          p.coords[dragging.vert] = [e.lngLat.lng, e.lngLat.lat];
          sync();
        }
        return;
      }
      if (modeRef.current === 'draw' && draftRef.current.length > 0) {
        cursorRef.current = [e.lngLat.lng, e.lngLat.lat];
        sync();
      }
    });

    map.on('mousedown', 'vertices', (e) => {
      if (modeRef.current !== 'edit') return;
      const f = e.features?.[0];
      if (!f || f.properties?.draft) return;
      e.preventDefault();
      dragging = { poly: f.properties!.polyIdx as number, vert: f.properties!.vertIdx as number };
      map.dragPan.disable();
      map.getCanvas().style.cursor = 'grabbing';
    });

    map.on('mouseup', () => {
      if (dragging) {
        dragging = null;
        map.dragPan.enable();
        map.getCanvas().style.cursor = '';
      }
    });

    map.on('click', 'midpoints', (e) => {
      if (modeRef.current !== 'edit') return;
      const f = e.features?.[0];
      if (!f) return;
      const poly = f.properties!.polyIdx as number;
      const insertAt = f.properties!.insertAt as number;
      polygonsRef.current[poly]?.coords.splice(insertAt, 0, [e.lngLat.lng, e.lngLat.lat]);
      sync();
    });

    map.on('dblclick', 'vertices', (e) => {
      if (modeRef.current !== 'edit') return;
      const f = e.features?.[0];
      if (!f || f.properties?.draft) return;
      e.preventDefault();
      const poly = f.properties!.polyIdx as number;
      const vert = f.properties!.vertIdx as number;
      const coords = polygonsRef.current[poly]?.coords;
      if (coords && coords.length > 3) {
        coords.splice(vert, 1);
        sync();
      }
    });

    const setGrab = () => {
      if (modeRef.current === 'edit' && !dragging) map.getCanvas().style.cursor = 'grab';
    };
    const clearGrab = () => {
      if (!dragging) map.getCanvas().style.cursor = modeRef.current === 'draw' ? 'crosshair' : '';
    };
    map.on('mouseenter', 'vertices', setGrab);
    map.on('mouseleave', 'vertices', clearGrab);

    return () => {
      map.remove();
      mapRef.current = null;
      loadedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Recenter when the address changes ── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loadedRef.current) return;
    if (parcelRing && parcelRing.length >= 3) {
      const ring = closeRing(parcelRing);
      (map.getSource('parcel') as maplibregl.GeoJSONSource | undefined)?.setData({
        type: 'Feature', properties: {},
        geometry: { type: 'Polygon', coordinates: [ring] },
      } as GeoJSON.Feature);
      const bounds = ring.reduce(
        (b, c) => b.extend(c as [number, number]),
        new maplibregl.LngLatBounds(ring[0] as [number, number], ring[0] as [number, number]),
      );
      map.fitBounds(bounds, { padding: 60, maxZoom: 21, duration: 400 });
    } else {
      map.flyTo({ center: [center.lng, center.lat], zoom: 19, duration: 400 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center.lat, center.lng, parcelRing]);

  /* ── Toolbar actions ── */
  const startDraw = () => {
    draftRef.current = [];
    cursorRef.current = null;
    setModeBoth('draw');
    sync();
  };
  const undoPoint = () => {
    draftRef.current.pop();
    sync();
  };
  const finishArea = () => {
    if (draftRef.current.length >= 3) {
      polygonsRef.current.push({ id: `lawn-${Date.now()}`, coords: draftRef.current });
    }
    draftRef.current = [];
    cursorRef.current = null;
    setModeBoth('idle');
    sync();
  };
  const cancelDraw = () => {
    draftRef.current = [];
    cursorRef.current = null;
    setModeBoth('idle');
    sync();
  };
  const toggleEdit = () => {
    setModeBoth(mode === 'edit' ? 'idle' : 'edit');
    sync();
  };
  const clearAll = () => {
    polygonsRef.current = [];
    draftRef.current = [];
    cursorRef.current = null;
    setModeBoth('idle');
    sync();
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden bg-gray-200"
      />

      {/* Toolbar */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 max-w-[60%]">
        {mode === 'draw' ? (
          <div className="flex flex-wrap gap-2">
            <button onClick={finishArea} disabled={draftLen < 3}
              className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-xs font-bold rounded-lg shadow">
              <Check className="w-4 h-4" /> Finish area
            </button>
            <button onClick={undoPoint} disabled={draftLen === 0}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 disabled:opacity-50 text-gray-700 text-xs font-bold rounded-lg shadow">
              <Undo2 className="w-4 h-4" /> Undo
            </button>
            <button onClick={cancelDraw}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg shadow">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button onClick={startDraw}
              className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow">
              <Pencil className="w-4 h-4" /> {polyCount ? 'Add area' : 'Trace lawn'}
            </button>
            {polyCount > 0 && (
              <>
                <button onClick={toggleEdit}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg shadow ${
                    mode === 'edit' ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}>
                  <MousePointer2 className="w-4 h-4" /> {mode === 'edit' ? 'Done editing' : 'Adjust'}
                </button>
                <button onClick={clearAll}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-red-600 text-xs font-bold rounded-lg shadow">
                  <Trash2 className="w-4 h-4" /> Clear
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Live area readout */}
      <div className="absolute bottom-6 left-3 bg-black/70 backdrop-blur text-white rounded-lg px-3 py-2 shadow">
        <div className="text-[10px] uppercase tracking-wide text-white/60">Measured lawn</div>
        <div className="text-lg font-bold leading-tight">
          {totalSqft > 0 ? `${Math.round(totalSqft).toLocaleString()} sq ft` : '—'}
        </div>
        {totalSqft > 0 && (
          <div className="text-[10px] text-white/60">{(totalSqft / 43560).toFixed(2)} acres · {polyCount} area{polyCount !== 1 ? 's' : ''}</div>
        )}
      </div>

      {/* Hint */}
      <div className="absolute bottom-6 right-3 bg-white/90 text-gray-700 text-[10px] rounded-lg px-2.5 py-1.5 shadow max-w-[45%] hidden sm:block">
        {mode === 'draw'
          ? 'Click around the edge of the lawn. Press “Finish area” to close it.'
          : mode === 'edit'
          ? 'Drag white dots to move · click a midpoint to add · double-click to delete.'
          : 'Trace each lawn area on the satellite image for an exact measurement.'}
      </div>
    </div>
  );
}
