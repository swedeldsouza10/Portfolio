import type { IconType } from "react-icons";
import { FiCode, FiCpu } from "react-icons/fi";
import {
  SiReact,
  SiAngular,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPython,
  SiDjango,
  SiPytorch,
  SiAndroid,
  SiAndroidstudio,
  SiGit,
  SiGithub,
  SiJavascript,
  SiC,
  SiOpenjdk,
} from "react-icons/si";

export interface TechMeta {
  icon: IconType;
  /** Brand color used for the logo glyph */
  color: string;
}

/**
 * Keyed by the exact display string used in lib/data.ts (skills + project tech).
 * Falls back to a neutral code icon for anything unmapped.
 */
const TECH: Record<string, TechMeta> = {
  React: { icon: SiReact, color: "#61DAFB" },
  Angular: { icon: SiAngular, color: "#DD0031" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  "HTML/CSS": { icon: SiHtml5, color: "#E34F26" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { icon: SiExpress, color: "#9CA3AF" },
  SQL: { icon: SiMysql, color: "#4479A1" },
  Python: { icon: SiPython, color: "#3776AB" },
  Django: { icon: SiDjango, color: "#44B78B" },
  PyTorch: { icon: SiPytorch, color: "#EE4C2C" },
  Android: { icon: SiAndroid, color: "#3DDC84" },
  "Android Studio": { icon: SiAndroidstudio, color: "#3DDC84" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#9CA3AF" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  C: { icon: SiC, color: "#A8B9CC" },
  Java: { icon: SiOpenjdk, color: "#F89820" },
  "Machine Learning": { icon: FiCpu, color: "#22D3EE" },
};

const FALLBACK: TechMeta = { icon: FiCode, color: "currentColor" };

export function getTech(name: string): TechMeta {
  return TECH[name] ?? FALLBACK;
}
