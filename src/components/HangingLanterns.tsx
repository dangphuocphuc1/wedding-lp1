export function HangingLanterns({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <div className={`hanging-lanterns hanging-lanterns-${side}`} aria-hidden="true">
      <span className="hanging-lantern hanging-lantern-main">
        <img src="/images/sticker-sage-lantern.png" alt="" loading="lazy" decoding="async" />
      </span>
      <span className="hanging-lantern hanging-lantern-small">
        <img src="/images/sticker-sage-lantern.png" alt="" loading="lazy" decoding="async" />
      </span>
    </div>
  );
}
