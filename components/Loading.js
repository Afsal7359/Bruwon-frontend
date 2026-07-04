export default function Loading({ label = 'Loading', full = true }) {
  return (
    <div className={full ? 'brand-loader' : 'brand-loader inline'}>
      <div className="bl-inner">
        <span className="bl-logo">Bruwon<sup>™</sup></span>
        <div className="bl-ring" aria-hidden="true" />
        <span className="bl-text">{label}…</span>
      </div>
    </div>
  );
}
