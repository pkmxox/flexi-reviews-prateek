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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initDots(rect.width, rect.height);
    };

    const initDots = (width: number, height: number) => {
      dots = [];
      const spacing = 52;
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = null;
    };

    // Listen on the section so hover works even over cards
    const section = wrap.parentElement ?? wrap;
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

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
          const dist = Math.hypot(mdx, mdy);
          const maxDist = 160;
          if (dist < maxDist && dist > 0.01) {
            const force = (maxDist - dist) / maxDist;
            targetDx = (mdx / dist) * force * 22;
            targetDy = (mdy / dist) * force * 22;
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
    window.addEventListener("resize", resize);

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
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
      window.removeEventListener("resize", resize);
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
