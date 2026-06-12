import { useState } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';

const services = [
  {
    label: 'Lawn Care',
    before: '/images/before-after/lawn-before.jpg',
    after: '/images/before-after/lawn-after.jpg',
  },
  {
    label: 'Power Washing',
    before: '/images/before-after/powerwash-before.jpg',
    after: '/images/before-after/powerwash-after.jpg',
  },
  {
    label: 'Window Cleaning',
    before: '/images/before-after/windows-before.jpg',
    after: '/images/before-after/windows-after.jpg',
  },
  {
    label: 'Handyman Repairs',
    before: '/images/before-after/handyman-before.jpg',
    after: '/images/before-after/handyman-after.jpg',
  },
];

export default function BeforeAfterSection() {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-5xl mx-auto">
      <BeforeAfterSlider
        beforeSrc={services[active].before}
        afterSrc={services[active].after}
        alt={`${services[active].label} before and after comparison`}
      />
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {services.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 font-display
              ${active === i
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
