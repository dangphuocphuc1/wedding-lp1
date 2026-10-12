import { useEffect, useRef, useState, type ReactNode } from "react";
import { Flower } from "./Botanical";

export function ScrollingWishList({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pauseUntil = useRef(0);
  const interacting = useRef(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const list = listRef.current!;
    const observer = new ResizeObserver(() => {
      setOverflowing(contentRef.current!.offsetHeight > list.clientHeight + 1);
    });
    observer.observe(list);
    observer.observe(contentRef.current!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!overflowing) return;
    const list = listRef.current!;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let lastTime = 0;
    let position = list.scrollTop;
    pauseUntil.current = performance.now() + 2000;

    function tick(time: number) {
      const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0;
      lastTime = time;
      if (interacting.current || time < pauseUntil.current || list.matches(":focus-within")) {
        position = list.scrollTop;
      } else {
        const loopHeight = contentRef.current!.offsetHeight;
        if (loopHeight > 0) {
          // Bản sao kế tiếp có cùng bố cục, nên chuyển vòng không gây nhảy hình.
          position = (position + elapsed * 0.025) % loopHeight;
          list.scrollTop = position;
        }
      }
      frame = requestAnimationFrame(tick);
    }

    function updatePlayback() {
      cancelAnimationFrame(frame);
      lastTime = 0;
      position = list.scrollTop;
      if (visible && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame(tick);
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(list);
    reducedMotion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [overflowing]);

  function pauseForReading() {
    pauseUntil.current = performance.now() + 6000;
  }

  return (
    <div className="wish-list-frame">
      <div className="wish-border-flowers" aria-hidden="true">
        <Flower className="border-flower-top-left" />
        <Flower className="border-flower-top-right" />
        <Flower className="border-flower-bottom-left" />
        <Flower className="border-flower-bottom-right" />
        <Flower className="border-flower-bud-top" />
        <Flower className="border-flower-bud-bottom" />
      </div>
    <div className="wish-list-wrapper">
      <div className="wish-list" ref={listRef} role="region"
        aria-label="Những lời chúc" tabIndex={overflowing ? 0 : undefined}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") interacting.current = true; }}
        onPointerLeave={() => { interacting.current = false; }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") interacting.current = true;
          pauseForReading();
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") interacting.current = false;
          pauseForReading();
        }}
        onPointerCancel={() => { interacting.current = false; pauseForReading(); }}
        onWheel={pauseForReading}
        onKeyDown={pauseForReading}>
        <div className="wish-list-content" ref={contentRef}>{children}</div>
        {overflowing && (
          <div className="wish-list-content wish-list-repeat" aria-hidden="true" inert>
            {children}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
