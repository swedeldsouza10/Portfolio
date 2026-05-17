import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          soft: "rgb(var(--bg-soft) / <alpha-value>)",
          card: "rgb(var(--bg-card) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          muted: "rgb(var(--fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--fg-subtle) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          2: "rgb(var(--accent-2) / <alpha-value>)",
          3: "rgb(var(--accent-3) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        glow: "0 0 70px -15px rgb(var(--accent-2) / 0.5)",
        card: "0 10px 40px -12px rgb(0 0 0 / 0.35)",
        aura: "0 0 0 1px rgb(var(--accent) / 0.25), 0 18px 60px -18px rgb(var(--accent-2) / 0.5)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgb(var(--accent) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent) / 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "spin-slow": "spin 14s linear infinite",
        gradient: "gradient 6s ease infinite",
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee 28s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "spin-slower": "spin 26s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-22px)" },
        },
        glow: {
          "0%": { opacity: "0.35" },
          "100%": { opacity: "0.8" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        aurora: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.55",
          },
          "33%": {
            transform: "translate(6%, -8%) scale(1.15)",
            opacity: "0.75",
          },
          "66%": {
            transform: "translate(-6%, 6%) scale(0.92)",
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
