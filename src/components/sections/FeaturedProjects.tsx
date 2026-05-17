"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";
import { getProjects } from "@/i18n/data";

export default function FeaturedProjects() {
  const { t, lang } = useI18n();
  const featured = getProjects(lang)
    .filter((p) => p.featured)
    .slice(0, 3);

  return (
    <section className="container-px py-24">
      <SectionHeading
        kicker={t("featured.kicker")}
        title={
          <>
            {t("featured.titleA")}{" "}
            <span className="text-gradient">{t("featured.titleB")}</span>
          </>
        }
        subtitle={t("featured.subtitle")}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/projects" className="btn-ghost group">
          {t("common.viewAllProjects")}
          <FiArrowRight
            className="transition-transform group-hover:translate-x-1"
            size={15}
          />
        </Link>
      </div>
    </section>
  );
}
