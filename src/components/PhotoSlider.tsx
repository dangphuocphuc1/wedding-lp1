import { useEffect, useRef } from "react";

export function PhotoSlider({ photos }: {
  photos: readonly { src: string; alt: string }[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const looping = photos.length > 1;

  useEffect(() => {
    const element = track.current;
    if (!element || !looping) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let position = element.scrollLeft;
    let width = 0;

    function updateSize() {
      const first = element!.children[0] as HTMLElement;
      const copy = element!.children[photos.length] as HTMLElement;
      width = copy.offsetLeft - first.offsetLeft;
      position = width > 0 ? element!.scrollLeft % width : 0;
      element!.scrollLeft = position;
    }
    function tick(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      if (width > 0) {
        // Giữ phần thập phân để chuyển động mượt, nối liền với bản sao kế tiếp.
        position = (position + elapsed * 0.032) % width;
        element!.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    }
    function updatePlayback() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (visible && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame(tick);
      }
    }
    const resize = new ResizeObserver(updateSize);
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    intersection.observe(element);
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    updateSize();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
  }, [photos, looping]);

  if (!photos.length) return null;
  return (
    <div className="photo-slider" role="region" aria-label="Album ảnh của chúng mình">
      <div className="photo-slider-track" ref={track}>
        {Array.from({ length: looping ? 2 : 1 }, (_, copy) => photos.map((item, index) => (
          <div className="album-photo photo-slider-slide" key={`${copy}-${item.src}-${index}`}
            aria-hidden={copy === 1 ? true : undefined}>
            <img src={item.src} alt={copy === 1 ? "" : item.alt} loading="lazy" draggable={false} />
          </div>
        )))}
      </div>
    </div>
  );
}
