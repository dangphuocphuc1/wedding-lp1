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
    let interacting = false;
    let hovered = false;
    let pauseUntil = 0;
    let pointerId: number | null = null;
    let dragStart: { x: number; scrollLeft: number } | null = null;

    function pause() {
      pauseUntil = performance.now() + 4000;
    }
    function pointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerId = event.pointerId;
      interacting = true;
      position = element!.scrollLeft;
      pause();
      if (event.pointerType === "mouse") {
        dragStart = { x: event.clientX, scrollLeft: position };
        element!.setPointerCapture(event.pointerId);
        element!.classList.add("is-dragging");
      }
    }
    function pointerMove(event: PointerEvent) {
      if (!dragStart || event.pointerId !== pointerId) return;
      element!.scrollLeft = dragStart.scrollLeft - (event.clientX - dragStart.x);
      position = element!.scrollLeft;
      pause();
    }
    function pointerEnd(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      if (element!.hasPointerCapture(event.pointerId)) element!.releasePointerCapture(event.pointerId);
      pointerId = null;
      interacting = false;
      dragStart = null;
      element!.classList.remove("is-dragging");
      position = element!.scrollLeft;
      pause();
    }
    function pointerEnter(event: PointerEvent) {
      if (event.pointerType === "mouse") hovered = true;
    }
    function pointerLeave() {
      hovered = false;
      pause();
    }
    function manualScroll() {
      // Cuộn tự động khớp với position; cuộn tay tiếp tục kéo dài thời gian nghỉ.
      if (Math.abs(element!.scrollLeft - position) > 1) {
        position = element!.scrollLeft;
        pause();
      }
    }

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
      if (interacting || hovered || time < pauseUntil || element!.matches(":focus-visible")) {
        position = element!.scrollLeft;
      } else if (width > 0) {
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
    element.addEventListener("pointerdown", pointerDown);
    element.addEventListener("pointermove", pointerMove);
    element.addEventListener("pointerenter", pointerEnter);
    element.addEventListener("pointerleave", pointerLeave);
    element.addEventListener("scroll", manualScroll, { passive: true });
    element.addEventListener("wheel", pause, { passive: true });
    window.addEventListener("pointerup", pointerEnd);
    window.addEventListener("pointercancel", pointerEnd);
    updateSize();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      element.removeEventListener("pointerdown", pointerDown);
      element.removeEventListener("pointermove", pointerMove);
      element.removeEventListener("pointerenter", pointerEnter);
      element.removeEventListener("pointerleave", pointerLeave);
      element.removeEventListener("scroll", manualScroll);
      element.removeEventListener("wheel", pause);
      window.removeEventListener("pointerup", pointerEnd);
      window.removeEventListener("pointercancel", pointerEnd);
      if (pointerId !== null && element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
      element.classList.remove("is-dragging");
    };
  }, [photos, looping]);

  if (!photos.length) return null;
  return (
    <div className="photo-slider" role="region" aria-label="Album ảnh của chúng mình">
      <div className="photo-slider-track" ref={track} tabIndex={0}
        role="group" aria-label="Vuốt hoặc kéo ngang để xem ảnh">
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
