import type { CSSProperties } from "react";

// Giá trị cố định giúp cánh hoa không đổi vị trí khi form hoặc đếm ngược cập nhật.
const petals = Array.from({ length: 48 }, (_, index) => ({
  left: `${index % 4 < 2 ? (index * 7) % 25 : 75 + (index * 11) % 25}%`,
  size: `${14 + (index % 5) * 4}px`,
  duration: `${18 + (index % 7) * 3}s`,
  delay: `${-((index * 7) % 35)}s`,
  swayDuration: `${4 + (index % 4)}s`,
  drift: `${(index % 2 === 0 ? 1 : -1) * (40 + (index % 4) * 20)}px`,
  rotation: `${index * 47}deg`,
}));

export function FloatingPetals() {
  return (
    <div className="petal-background" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          className="petal-track"
          key={index}
          style={
            {
              left: petal.left,
              "--petal-size": petal.size,
              "--fall-duration": petal.duration,
              "--petal-delay": petal.delay,
              "--sway-duration": petal.swayDuration,
              "--petal-drift": petal.drift,
              "--petal-rotation": petal.rotation,
            } as CSSProperties
          }
        >
          <span className="floating-petal" />
        </span>
      ))}
    </div>
  );
}
