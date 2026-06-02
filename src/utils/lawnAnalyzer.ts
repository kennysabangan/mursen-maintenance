export interface LawnAnalysis {
  lawnPercent: number;
  estimatedSqFt: number;
  confidence: 'low' | 'medium' | 'high';
  sampleCount: number;
  greenCount: number;
}

/**
 * Analyze a satellite image to estimate lawn coverage.
 * Uses canvas pixel sampling to classify green (lawn) vs non-green pixels.
 */
export function analyzeLawnFromImage(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
): LawnAnalysis {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas not supported');

  // Draw image to canvas at a manageable size for analysis
  const MAX_ANALYSIS_SIZE = 400;
  const scale = Math.min(MAX_ANALYSIS_SIZE / image.naturalWidth, MAX_ANALYSIS_SIZE / image.naturalHeight, 1);
  const w = Math.round(image.naturalWidth * scale);
  const h = Math.round(image.naturalHeight * scale);
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(image, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const pixels = imageData.data;

  // Sample every Nth pixel for performance
  const SAMPLE_STEP = 4; // sample every 4th pixel
  let greenCount = 0;
  let totalSampled = 0;

  for (let i = 0; i < pixels.length; i += 4 * SAMPLE_STEP) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (isLawnPixel(r, g, b)) {
      greenCount++;
    }
    totalSampled++;
  }

  const lawnPercent = totalSampled > 0 ? (greenCount / totalSampled) * 100 : 0;

  // Estimate sq ft: typical residential lot visible in satellite ~ 9000-12000 sq ft total
  // We assume the visible area in a zoomed-in satellite tile is roughly 10,000 sq ft
  const ASSUMED_TOTAL_VISIBLE_SQFT = 10000;
  const estimatedSqFt = Math.round((lawnPercent / 100) * ASSUMED_TOTAL_VISIBLE_SQFT);

  // Confidence based on sample size and how clear the classification is
  let confidence: 'low' | 'medium' | 'high' = 'medium';
  if (totalSampled < 500) {
    confidence = 'low';
  } else if (lawnPercent > 15 && lawnPercent < 85) {
    confidence = 'high';
  } else if (lawnPercent <= 5 || lawnPercent >= 95) {
    confidence = 'low'; // might be misclassifying
  }

  return {
    lawnPercent: Math.round(lawnPercent),
    estimatedSqFt,
    confidence,
    sampleCount: totalSampled,
    greenCount,
  };
}

/**
 * Classify a pixel as lawn (green) based on RGB values.
 * Uses HSV-inspired logic: green must dominate and have sufficient saturation.
 */
function isLawnPixel(r: number, g: number, b: number): boolean {
  // Green must be the dominant channel
  if (g <= r || g <= b) return false;

  // Minimum green value (not too dark)
  if (g < 60) return false;

  // Green must be sufficiently above the average of r and b
  const avgRB = (r + b) / 2;
  const greenExcess = g - avgRB;

  // Threshold: green must be noticeably dominant
  if (greenExcess < 15) return false;

  // Reject very bright pixels (clouds, roofs)
  if (r > 220 && g > 220 && b > 220) return false;

  // Reject very dark pixels (shadows, water)
  if (r < 30 && g < 30 && b < 30) return false;

  // Reject brownish tones (bare soil, dead grass)
  // Brown: r is high, g is moderate, b is low
  if (r > g && g > b && r - b > 30) return false;

  return true;
}

/**
 * Get satellite tile URL for a given lat/lon at zoom 18.
 * Uses OpenStreetMap's static tile server.
 */
export function getSatelliteTileUrl(lat: number, lon: number, zoom: number = 18): string {
  // Use ESRI World Imagery via a CORS-friendly approach
  // ArcGIS REST tile server - free, no key, CORS-friendly
  const tile = latLonToTile(lat, lon, zoom);
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${tile.y}/${tile.x}`;
}

function latLonToTile(lat: number, lon: number, zoom: number) {
  const n = Math.pow(2, zoom);
  const x = Math.floor((lon + 180) / 360 * n);
  const latRad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  return { x, y };
}
