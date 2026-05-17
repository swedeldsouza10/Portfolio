"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types";
import ProjectCard from "@/components/ProjectCard";
import { useI18n } from "@/i18n/LanguageProvider";
import { getProjects } from "@/i18n/data";

const filters = [
  { id: "all", key: "projects.filterAll" },
  { id: "fullstack", key: "projects.filterFullstack" },
  { id: "mobile", key: "projects.filterMobile" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export default function ProjectsGrid() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<FilterId>("all");

  const projects = getProjects(lang);
  const visible: Project[] =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {filters.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`relative min-w-[7rem] rounded-full px-5 py-2 text-center font-body text-sm font-medium transition-colors ${
                isActive
                  ? "text-bg"
                  : "border border-line text-fg-muted hover:text-fg"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(120deg, rgb(var(--accent)), rgb(var(--accent-2)))",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t(f.key)}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center font-body text-fg-muted">
          {t("projects.empty")}
        </p>
      )}
    </>
  );
}
