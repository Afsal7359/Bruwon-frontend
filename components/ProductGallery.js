'use client';
import { useState } from 'react';

export default function ProductGallery({ image, gallery = [], tag, alt }) {
  const images = [image, ...(gallery || [])].filter(Boolean);
  const [active, setActive] = useState(0);
  const current = images[active] || image;

  return (
    <div>
      <div className="pdp-media">
        {tag ? <span className="pdp-tag">{tag}</span> : null}
        {current ? <img src={current} alt={alt} /> : null}
      </div>

      {images.length > 1 && (
        <div className="pdp-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`pdp-thumb${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
