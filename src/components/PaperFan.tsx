export function PaperFan({ className = "" }: { className?: string }) {
  return <img
    className={`paper-fan ${className}`}
    src="/images/wedding-sage-fan.png"
    alt="" aria-hidden="true" loading="lazy" decoding="async"
  />;
}
