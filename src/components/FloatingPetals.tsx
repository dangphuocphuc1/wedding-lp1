import type { CSSProperties } from "react";

// Giá trị cố định giúp cánh hoa không đổi vị trí khi form hoặc đếm ngược cập nhật.
const petals = Array.from({ length: 48 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  size: `${10 + (index % 5) * 3}px`,
  duration: `${18 + (index % 7) * 3}s`,
  delay: `${-((index * 7) % 35)}s`,
  swayDuration: `${4 + (index % 4)}s`,
  drift: `${(index % 2 === 0 ? 1 : -1) * (40 + (index % 4) * 20)}px`,
  rotation: `${index * 47}deg`,
  color: ["#e6bca9", "#edc9d1", "#dfc18c", "#c3cfae"][index % 4],
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
              "--petal-color": petal.color,
            } as CSSProperties
          }
        >
          <span className="floating-petal" />
        </span>
      ))}
    </div>
  );
}
