"use client";

import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { HiCheck } from "react-icons/hi2";
import type { Project } from "@/types";
import { getTech } from "@/lib/tech";
import { useI18n } from "@/i18n/LanguageProvider";

const categoryKey: Record<Project["category"], string> = {
  fullstack: "projects.catFullstack",
  mobile: "projects.catMobile",
  frontend: "projects.catFrontend",
  backend: "projects.catBackend",
};

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { t } = useI18n();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="card card-hover group relative flex h-full flex-col overflow-hidden p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-accent-2 to-accent-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
            {t(categoryKey[project.category])}
          </span>
          {project.featured && (
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
              {t("projects.featured")}
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source`}
              className="grid h-8 w-8 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <FiGithub size={15} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="grid h-8 w-8 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <FiArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-fg transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-3 line-clamp-4 font-body text-sm leading-relaxed text-fg-muted">
        {project.description}
      </p>

      <ul className="mt-5 space-y-2">
        {project.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 font-body text-[13px] leading-snug text-fg-muted"
          >
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-3/15 text-accent-3">
              <HiCheck size={11} strokeWidth={1} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-5">
        {project.tech.map((t) => {
          const { icon: Icon, color } = getTech(t);
          return (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px] text-fg-muted transition-colors group-hover:border-line/80"
            >
              <Icon size={13} style={{ color }} />
              {t}
            </span>
          );
        })}
      </div>
    </motion.article>
  );
}
