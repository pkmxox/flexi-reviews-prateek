"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  speed: number;
  baseSize: number;
  baseOpacity: number;
  dx: number;
  dy: number;
  size: number;
  opacity: number;
};

export default function DotsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let animationId = 0;
    let dots: Dot[] = [];
    // Cap DPR at 1.5: halves fill cost on retina with no visible difference for 1-2px dots.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rectRef = { left: 0, top: 0, width: 0, height: 0 };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      rectRef.left = rect.left;
      rectRef.top = rect.top;
      rectRef.width = rect.width;
      rectRef.height = rect.height;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initDots(rect.width, rect.height);
    };

    // Debounce resize via rAF — avoids re-init storm during scroll/resize.
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };

    const initDots = (width: number, height: number) => {
      dots = [];
      // Fewer dots on small screens: same look, ~40% less per-frame work.
      const spacing = width < 640 ? 64 : 54;
      for (let x = 0; x <= width + spacing; x += spacing) {
        for (let y = 0; y <= height + spacing; y += spacing) {
          const jx = (Math.random() - 0.5) * 14;
          const jy = (Math.random() - 0.5) * 14;
          dots.push({
            x: x + jx,
            y: y + jy,
            speed: 0.25 + Math.random() * 0.3,
            baseSize: 1.2 + Math.random() * 1.1,
            baseOpacity: 0.12 + Math.random() * 0.16,
            dx: 0,
            dy: 0,
            size: 1.2,
            opacity: 0.15,
          });
        }
      }
    };

    const rawMouse = { x: 0, y: 0, active: false };
    const onMouseMove = (e: MouseEvent) => {
      // Store raw coords only — rect lookup happens once per frame in animate(),
      // so rapid mousemoves never cause layout thrash.
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
      rawMouse.active = true;
    };

    const onMouseLeave = () => {
      rawMouse.active = false;
      mouseRef.current = null;
    };

    // Listen on the section so hover works even over cards (passive: never blocks scroll)
    const section = wrap.parentElement ?? wrap;
    section.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Single rect lookup per frame (not per dot / per mousemove).
      let mouse: { x: number; y: number } | null = null;
      if (rawMouse.active) {
        const rect = canvas.getBoundingClientRect();
        const mx = rawMouse.x - rect.left;
        const my = rawMouse.y - rect.top;
        // Ignore mouse far outside canvas — skips all per-dot math.
        if (mx > -200 && mx < width + 200 && my > -200 && my < height + 200) {
          mouse = { x: mx, y: my };
        }
      }
      mouseRef.current = mouse;

      const maxDist = 160;
      const maxDistSq = maxDist * maxDist;

      for (const dot of dots) {
        // Drift left-to-right, wrap around
        dot.x += dot.speed;
        if (dot.x > width + 20) {
          dot.x = -20;
          dot.y = Math.random() * height;
        }

        let targetDx = 0;
        let targetDy = 0;
        let targetSize = dot.baseSize;
        let targetOpacity = dot.baseOpacity;

        if (mouse) {
          const px = dot.x + dot.dx;
          const py = dot.y + dot.dy;
          const mdx = px - mouse.x;
          const mdy = py - mouse.y;
          // Squared-distance check: avoids Math.hypot (sqrt) for every dot.
          const distSq = mdx * mdx + mdy * mdy;
          if (distSq < maxDistSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const force = (maxDist - dist) / maxDist;
            const inv = 1 / dist;
            targetDx = mdx * inv * force * 22;
            targetDy = mdy * inv * force * 22;
            targetSize = Math.min(4.5, dot.baseSize + force * 2.5);
            targetOpacity = Math.min(0.7, dot.baseOpacity + force * 0.45);
          }
        }

        dot.dx += (targetDx - dot.dx) * 0.12;
        dot.dy += (targetDy - dot.dy) * 0.12;
        dot.size += (targetSize - dot.size) * 0.18;
        dot.opacity += (targetOpacity - dot.opacity) * 0.15;

        ctx.beginPath();
        ctx.arc(dot.x + dot.dx, dot.y + dot.dy, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(27, 191, 106, ${dot.opacity.toFixed(3)})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Draw a single static frame of dots (used on load and if reduced motion).
    const drawStatic = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.baseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(27, 191, 106, ${dot.baseOpacity.toFixed(3)})`;
        ctx.fill();
      }
    };

    // Run the rAF loop only while the canvas is on screen (perf).
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        } else if (!prefersReducedMotion && animationId === 0) {
          animate();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(wrap);

    resize();
    if (prefersReducedMotion) {
      drawStatic();
    } else {
      visible = true;
      animate();
    }
    window.addEventListener("resize", onResize, { passive: true });

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      } else if (!prefersReducedMotion && visible && animationId === 0) {
        animate();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(resizeRaf);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
