// Họa tiết ảnh nền trong suốt, đồng bộ với bộ hoa và đèn lồng của thiệp.
export function Flower({ className = "" }: { className?: string }) {
  return (
    <img
      className={`flower floral-sprig ${className}`}
      src="/images/wedding-floral-sprig.png"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width="100"
      height="100"
    />
  );
}

export function Botanical({ className = "" }: { className?: string }) {
  return (
    <img
      className={`botanical floral-installation ${className}`}
      src="/images/wedding-lantern-floral.png"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  );
}
