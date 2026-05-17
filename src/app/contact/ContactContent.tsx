"use client";

import { FiMail, FiMapPin, FiLinkedin, FiGithub } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ContactForm";
import { useI18n } from "@/i18n/LanguageProvider";

export default function ContactContent() {
  const { t } = useI18n();

  const details = [
    {
      icon: <FiMail size={18} />,
      label: t("contact.email"),
      value: "swedeldsouza1005@gmail.com",
      href: "mailto:swedeldsouza1005@gmail.com",
    },
    {
      icon: <FiLinkedin size={18} />,
      label: t("contact.linkedin"),
      value: "swedel-dsouza-ss10",
      href: "https://www.linkedin.com/in/swedel-dsouza-ss10",
    },
    {
      icon: <FiGithub size={18} />,
      label: t("contact.github"),
      value: "github.com",
      href: "https://github.com",
    },
    {
      icon: <FiMapPin size={18} />,
      label: t("contact.location"),
      value: t("contact.locationValue"),
      href: undefined,
    },
  ];

  return (
    <div className="container-px pb-12 pt-36">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-6 bg-accent/50" />
          {t("contact.kicker")}
          <span className="h-px w-6 bg-accent/50" />
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-fg md:text-6xl">
          {t("contact.titleA")}{" "}
          <span className="text-gradient">{t("contact.titleB")}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-fg-muted">
          {t("contact.subtitle")}
        </p>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="space-y-4">
            {details.map((d) => {
              const inner = (
                <div className="card card-hover flex items-center gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    {d.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                      {d.label}
                    </p>
                    <p className="truncate font-body text-sm font-medium text-fg">
                      {d.value}
                    </p>
                  </div>
                </div>
              );
              return d.href ? (
                <a
                  key={d.label}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={d.label}>{inner}</div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
