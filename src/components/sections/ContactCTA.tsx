"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/LanguageProvider";

export default function ContactCTA() {
  const { t } = useI18n();

  return (
    <section className="container-px py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-card/70 p-12 text-center backdrop-blur-sm md:p-20">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 0%, rgb(var(--accent) / 0.15), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
              {t("cta.titleA")}{" "}
              <span className="text-gradient">{t("cta.titleB")}</span>{" "}
              {t("cta.titleC")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-fg-muted">
              {t("cta.text")}
            </p>
            <Link href="/contact" className="btn-primary group mt-9">
              {t("common.getInTouch")}
              <FiArrowRight
                className="transition-transform group-hover:translate-x-1"
                size={16}
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
