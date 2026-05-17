"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { getStats } from "@/i18n/data";

export default function AboutPreview() {
  const { t, lang } = useI18n();
  const stats = getStats(lang);

  return (
    <section className="container-px py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span className="h-px w-6 bg-accent/50" />
            {t("aboutPreview.kicker")}
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
            {t("aboutPreview.titleA")}{" "}
            <span className="text-gradient">
              {t("aboutPreview.titleB")}
            </span>
          </h2>
          <p className="mt-5 font-body leading-relaxed text-fg-muted">
            {t("aboutPreview.p1")}
          </p>
          <p className="mt-4 font-body leading-relaxed text-fg-muted">
            {t("aboutPreview.p2")}
          </p>
          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 font-display text-sm font-semibold text-accent"
          >
            {t("common.moreAboutMe")}
            <FiArrowRight
              className="transition-transform group-hover:translate-x-1"
              size={15}
            />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card card-hover flex flex-col items-center justify-center p-8 text-center"
            >
              <span className="font-display text-4xl font-extrabold text-gradient">
                {s.value}
              </span>
              <span className="mt-2 font-mono text-xs uppercase tracking-wider text-fg-muted">
                {s.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
