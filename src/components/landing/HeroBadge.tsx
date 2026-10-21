const SRC = "/media/hero/distintivo-carreiras.webp";
// Static depth keeps the existing metal appearance without pointer tracking.
const THICKNESS = [1, 2, 3, 4, 5];

/** Decorative insignia: one short reveal after the intro, then completely still. */
export function HeroBadge({ show = true }: { show?: boolean }) {
  return (
    <div className="hero-badge" aria-hidden="true" data-reveal={show ? "in" : "pending"}>
      <div className="hero-badge__float">
        <span className="hero-badge__shadow" />
        <div className="hero-badge__tilt">
          <div className="hero-badge__enter">
            {THICKNESS.map((depth) => (
              <img
                key={depth}
                className="hero-badge__edge"
                src={SRC}
                alt=""
                width={460}
                height={531}
                style={{ transform: `translateZ(${-depth}px)` }}
                draggable={false}
              />
            ))}
            <img
              className="hero-badge__face"
              src={SRC}
              alt=""
              width={460}
              height={531}
              decoding="async"
              draggable={false}
            />
            <span className="hero-badge__glare" />
          </div>
        </div>
      </div>
    </div>
  );
}
