"use client";

import { motion } from "framer-motion";
import Constellation from "./Constellation";

/**
 * Ambient galaxy background: a deep base wash, slowly rotating galaxy
 * swirl, drifting nebula clouds, the animated star constellation, and a
 * soft vignette so foreground content stays readable.
 * Tuned to stay visible in both light and dark themes.
 * Fixed + pointer-events-none.
 */
export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* deep base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% -10%, rgb(var(--accent) / 0.22), transparent 60%), radial-gradient(ellipse 70% 60% at 85% 110%, rgb(var(--accent-3) / 0.16), transparent 60%)",
        }}
      />

      {/* slowly rotating galaxy swirl */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgb(var(--accent) / 0.5) 40deg, transparent 110deg, rgb(var(--accent-2) / 0.45) 200deg, transparent 250deg, rgb(var(--accent-3) / 0.5) 320deg, transparent 360deg)",
          maskImage:
            "radial-gradient(circle, transparent 12%, #000 30%, #000 55%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 12%, #000 30%, #000 55%, transparent 78%)",
          filter: "blur(34px)",
        }}
      />

      {/* counter-rotating inner swirl for depth */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16]"
        style={{
          background:
            "conic-gradient(from 120deg, transparent 0deg, rgb(var(--accent-3) / 0.55) 60deg, transparent 150deg, rgb(var(--accent) / 0.5) 260deg, transparent 340deg)",
          maskImage:
            "radial-gradient(circle, transparent 20%, #000 42%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 20%, #000 42%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* drifting nebula — accent */}
      <motion.div
        animate={{ x: [0, 60, -24, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full blur-[150px]"
        style={{ background: "rgb(var(--accent) / 0.3)" }}
      />

      {/* drifting nebula — sky */}
      <motion.div
        animate={{ x: [0, -70, 28, 0], y: [0, 50, -22, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-12rem] top-1/3 h-[40rem] w-[40rem] rounded-full blur-[160px]"
        style={{ background: "rgb(var(--accent-2) / 0.26)" }}
      />

      {/* drifting nebula — cyan */}
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, 30, -36, 0] }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10rem] left-1/3 h-[34rem] w-[34rem] rounded-full blur-[150px]"
        style={{ background: "rgb(var(--accent-3) / 0.24)" }}
      />

      {/* the animated star constellation */}
      <Constellation />

      {/* soft vignette for contrast (kept light so it never washes out) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 100% at 50% 45%, transparent 62%, rgb(var(--bg) / 0.45))",
        }}
      />
    </div>
  );
}
