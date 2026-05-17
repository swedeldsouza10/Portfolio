"use client";

import { useEffect, useRef } from "react";

/**
 * Animated galaxy starfield:
 *  - depth-layered, drifting + slowly swirling stars (parallax galaxy spin)
 *  - twinkle, soft glow halos on bright stars, nebula-like density
 *  - lines linking nearby stars and stars near the cursor
 *  - frequent shooting stars
 *  - theme-aware: bright on dark, ink/accent-toned on light (always visible)
 * Pure <canvas> + requestAnimationFrame, no dependencies.
 * Honours prefers-reduced-motion and is pointer-events-none.
 */
export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Touch devices have no cursor — drive the link effect with a smooth
    // auto-roaming point so the same animation is alive on every device,
    // and let an active touch take over while the user is dragging.
    const coarse = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const isDark = () =>
      document.documentElement.classList.contains("dark");

    // Live theme palette. On light we drop pure white (invisible on a
    // near-white page) and lean on the accent colors + ink.
    let palette: string[] = [];
    let darkMode = isDark();
    const readPalette = () => {
      const root = getComputedStyle(document.documentElement);
      const toRGB = (v: string, fb: string) =>
        (v.trim() || fb).replace(/\s+/g, ",");
      const a = toRGB(root.getPropertyValue("--accent"), "96 165 250");
      const a2 = toRGB(root.getPropertyValue("--accent-2"), "56 189 248");
      const a3 = toRGB(root.getPropertyValue("--accent-3"), "34 211 238");
      darkMode = isDark();
      palette = darkMode
        ? [a, a2, a3, "255,255,255", a3]
        : [a, a2, a3, "51,65,85", a];
    };
    readPalette();

    type Star = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      z: number; // depth 0.2 (far) → 1 (near) — drives size/speed/brightness
      r: number;
      c: string;
      tw: number;
      ts: number;
    };
    let stars: Star[] = [];

    type Shooting = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
    };
    let shooting: Shooting | null = null;
    let nextShoot = 60 + Math.random() * 160;

    const mouse = { x: -9999, y: -9999 };
    let touching = false;
    let autoT = Math.random() * 1000;

    const makeStars = () => {
      const count = Math.min(Math.floor((width * height) / 6200), 240);
      stars = Array.from({ length: count }, () => {
        const z = Math.random() * 0.8 + 0.2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          z,
          r: (Math.random() * 1.3 + 0.5) * (0.6 + z * 0.9),
          c: palette[(Math.random() * palette.length) | 0],
          tw: Math.random() * Math.PI * 2,
          ts: Math.random() * 0.02 + 0.005,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    };

    const LINK = 138;
    const LINK2 = LINK * LINK;
    const MOUSE = 180;
    const MOUSE2 = MOUSE * MOUSE;

    let raf = 0;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // theme-tuned visibility
      const baseA = darkMode ? 0.55 : 0.7;
      const twA = darkMode ? 0.4 : 0.3;
      const linkMul = darkMode ? 0.16 : 0.3;
      const mouseMul = darkMode ? 0.42 : 0.5;

      const cx = width / 2;
      const cy = height / 2;

      // No cursor on touch screens → roam a point automatically so the
      // link animation runs on every device (a live touch overrides it).
      if (coarse && !touching && !reduce) {
        autoT += 0.0075;
        mouse.x = width * (0.5 + 0.4 * Math.sin(autoT * 0.9));
        mouse.y = height * (0.5 + 0.36 * Math.sin(autoT * 1.4 + 1.2));
      }

      // star-to-star links
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const o = (1 - d2 / LINK2) * linkMul;
            ctx.strokeStyle = `rgba(${a.c},${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // stars: drift + gentle galaxy swirl + twinkle + glow
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!reduce) {
          // slow rotation about the center — nearer layers spin a touch
          // faster for a parallax galaxy feel
          const ang = 0.00045 * s.z;
          const px = s.x - cx;
          const py = s.y - cy;
          const cos = Math.cos(ang);
          const sin = Math.sin(ang);
          s.x = cx + px * cos - py * sin + s.vx;
          s.y = cy + px * sin + py * cos + s.vy;
        }

        if (s.x < -14) s.x = width + 14;
        else if (s.x > width + 14) s.x = -14;
        if (s.y < -14) s.y = height + 14;
        else if (s.y > height + 14) s.y = -14;

        s.tw += s.ts;
        const a = (baseA + Math.sin(s.tw) * twA) * (0.45 + s.z * 0.55);

        // soft glow halo on the brighter foreground stars → nebulosity
        if (s.r > 1.5) {
          const g = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            s.r * 6
          );
          g.addColorStop(0, `rgba(${s.c},${a * 0.45})`);
          g.addColorStop(1, `rgba(${s.c},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.c},${a})`;
        ctx.fill();

        const mdx = s.x - mouse.x;
        const mdy = s.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < MOUSE2) {
          const o = (1 - md2 / MOUSE2) * mouseMul;
          ctx.strokeStyle = `rgba(${s.c},${o})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // shooting star
      if (!reduce) {
        if (shooting) {
          shooting.x += shooting.vx;
          shooting.y += shooting.vy;
          shooting.life++;
          const p = shooting.life / shooting.max;
          const fade = Math.sin(Math.PI * p);
          const tailX = shooting.x - shooting.vx * 10;
          const tailY = shooting.y - shooting.vy * 10;
          const head = darkMode ? "255,255,255" : palette[0];
          const grad = ctx.createLinearGradient(
            shooting.x,
            shooting.y,
            tailX,
            tailY
          );
          grad.addColorStop(0, `rgba(${head},${0.95 * fade})`);
          grad.addColorStop(1, `rgba(${head},0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          if (shooting.life >= shooting.max) shooting = null;
        } else if (--nextShoot <= 0) {
          const fromLeft = Math.random() > 0.5;
          const speed = 7 + Math.random() * 5;
          shooting = {
            x: fromLeft ? -40 : width + 40,
            y: Math.random() * height * 0.6,
            vx: (fromLeft ? 1 : -1) * speed,
            vy: speed * (0.32 + Math.random() * 0.32),
            life: 0,
            max: 55 + Math.random() * 30,
          };
          nextShoot = 160 + Math.random() * 320;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touching = true;
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    };
    const onTouchEnd = () => {
      touching = false;
      if (!coarse) {
        mouse.x = -9999;
        mouse.y = -9999;
      }
    };

    // Recolor live when the user toggles light/dark.
    const themeObserver = new MutationObserver(() => {
      const wasDark = darkMode;
      readPalette();
      if (wasDark !== darkMode)
        stars.forEach(
          (s) => (s.c = palette[(Math.random() * palette.length) | 0])
        );
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
