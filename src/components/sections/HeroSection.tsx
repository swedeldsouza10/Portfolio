"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiEnvelope } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import { useI18n } from "@/i18n/LanguageProvider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const socials = [
  { icon: <FaGithub size={18} />, href: "https://github.com", label: "GitHub" },
  {
    icon: <FaLinkedin size={18} />,
    href: "https://www.linkedin.com/in/swedel-dsouza-ss10",
    label: "LinkedIn",
  },
  {
    icon: <HiEnvelope size={18} />,
    href: "mailto:swedeldsouza1005@gmail.com",
    label: "Email",
  },
];

export default function HeroSection() {
  const { t, lang } = useI18n();
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-px relative z-10 text-center"
      >
        <motion.h1
          variants={item}
          className="mx-auto max-w-full font-display text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="mb-3 block font-body text-xs font-medium uppercase tracking-[0.3em] text-fg-subtle md:text-sm">
            {t("hero.greeting")}
          </span>
          <span className="text-gradient animate-gradient">Swedel Dsouza</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-6 flex h-9 items-center justify-center font-display text-xl font-semibold text-accent-2 md:text-3xl"
        >
          <TypeAnimation
            key={lang}
            sequence={[
              t("hero.role1"),
              2000,
              t("hero.role2"),
              2000,
              t("hero.role3"),
              2000,
              t("hero.role4"),
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor
          />
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-fg-muted md:text-lg"
        >
          {t("hero.buildWith")}{" "}
          <span className="font-medium text-fg">React</span>,{" "}
          <span className="font-medium text-fg">Angular</span> {t("common.and")}{" "}
          <span className="font-medium text-fg">Node.js</span>
          {t("hero.taglinePost")}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/projects" className="btn-primary group">
            {t("common.viewProjects")}
            <FiArrowRight
              className="transition-transform group-hover:translate-x-1"
              size={16}
            />
          </Link>
          <Link href="/contact" className="btn-ghost">
            {t("common.getInTouch")}
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 flex items-center justify-center gap-3"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="aura-ring grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-card/50 text-fg-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-2 hover:text-accent-2"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
