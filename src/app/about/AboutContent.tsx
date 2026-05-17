"use client";

import { FiAward, FiMapPin } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import { useI18n } from "@/i18n/LanguageProvider";
import { getEducation } from "@/i18n/data";

export default function AboutContent() {
  const { t, lang } = useI18n();
  const education = getEducation(lang);

  return (
    <div className="container-px pb-12 pt-36">
      {/* Intro */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-6 bg-accent/50" />
          {t("about.kicker")}
          <span className="h-px w-6 bg-accent/50" />
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-fg md:text-6xl">
          {t("about.titleA")}{" "}
          <span className="text-gradient">{t("about.titleB")}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-fg-muted md:text-lg">
          {t("about.intro")}
        </p>
      </Reveal>

      {/* Experience */}
      <div className="mt-28">
        <SectionHeading
          align="left"
          kicker={t("about.careerKicker")}
          title={
            <>
              {t("about.careerTitleA")}{" "}
              <span className="text-gradient">
                {t("about.careerTitleB")}
              </span>
            </>
          }
        />
        <ExperienceTimeline />
      </div>

      {/* Education */}
      <div className="mt-28">
        <SectionHeading
          align="left"
          kicker={t("about.eduKicker")}
          title={
            <>
              <span className="text-gradient">{t("about.eduTitleA")}</span>{" "}
              {t("about.eduTitleB")}
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {education.map((edu, i) => (
            <Reveal key={edu.institution} delay={i * 0.08} className="h-full">
              <div className="card card-hover flex h-full flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <FiAward size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-fg">
                  {edu.institution}
                </h3>
                <p className="mt-2 font-body text-sm leading-snug text-fg-muted">
                  {edu.degree}
                </p>
                <div className="mt-3 flex items-start gap-2 font-mono text-xs leading-relaxed text-fg-subtle">
                  <FiMapPin size={13} className="mt-0.5 shrink-0" />
                  <span>
                    {edu.location} · {edu.period}
                  </span>
                </div>
                <p className="mt-auto rounded-lg border border-line bg-bg-soft px-3 py-2 pt-3 font-mono text-xs leading-relaxed text-accent">
                  {edu.score}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
