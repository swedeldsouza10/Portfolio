"use client";

import Reveal from "@/components/ui/Reveal";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { useI18n } from "@/i18n/LanguageProvider";

export default function ProjectsContent() {
  const { t } = useI18n();

  return (
    <div className="container-px pb-12 pt-36">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-6 bg-accent/50" />
          {t("projects.kicker")}
          <span className="h-px w-6 bg-accent/50" />
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-fg md:text-6xl">
          {t("projects.titleA")}{" "}
          <span className="text-gradient">{t("projects.titleB")}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-fg-muted">
          {t("projects.subtitle")}
        </p>
      </Reveal>

      <ProjectsGrid />
    </div>
  );
}
