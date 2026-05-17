"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { useI18n } from "@/i18n/LanguageProvider";

const socials = [
  {
    icon: <FaGithub size={18} />,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={18} />,
    href: "https://www.linkedin.com/in/swedel-dsouza-ss10",
    label: "LinkedIn",
  },
  {
    icon: <FaEnvelope size={18} />,
    href: "mailto:swedeldsouza1005@gmail.com",
    label: "Email",
  },
];

const links = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/projects", key: "nav.projects" },
  { href: "/contact", key: "nav.contact" },
];

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line bg-bg-soft">
      <div className="container-px py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-display text-2xl font-extrabold tracking-tight"
            >
              <span className="text-gradient">Swedel</span>
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-3 font-body text-sm leading-relaxed text-fg-muted">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-subtle">
                {t("footer.navigate")}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-subtle">
                {t("footer.connect")}
              </h4>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-card text-fg-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 md:flex-row">
          <p className="font-body text-xs text-fg-subtle">
            © {year} Swedel Dsouza. {t("footer.rights")}
          </p>
          <p className="font-mono text-xs text-fg-subtle">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
