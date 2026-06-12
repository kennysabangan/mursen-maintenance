import { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Before and after comparison',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPositionFromEvent = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(100, (x / rect.width) * 100));
  }, []);

  const handleStart = useCallback((clientX: number) => {
    dragging.current = true;
    setPosition(getPositionFromEvent(clientX));
  }, [getPositionFromEvent]);

  const handleMove = useCallback((clientX: number) => {
    if (!dragging.current) return;
    setPosition(getPositionFromEvent(clientX));
  }, [getPositionFromEvent]);

  const handleEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleStart(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    handleMove(e.clientX);
  };

  const onPointerUp = () => {
    handleEnd();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[520px] rounded-2xl overflow-hidden cursor-col-resize select-none touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={handleEnd}
    >
      {/* After image (full background) */}
      <img
        src={afterSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped from left) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Drag handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L4 7M7 10L4 13M13 10L16 7M13 10L16 13" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Before label */}
      <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-20 pointer-events-none">
        {beforeLabel}
      </span>

      {/* After label */}
      <span className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-20 pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
}
