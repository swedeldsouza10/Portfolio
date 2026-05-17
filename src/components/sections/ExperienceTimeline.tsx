"use client";

import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import { useI18n } from "@/i18n/LanguageProvider";
import { getExperience } from "@/i18n/data";

export default function ExperienceTimeline() {
  const { lang } = useI18n();
  const experience = getExperience(lang);
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line md:left-[23px]" />
      <div className="space-y-10">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.company + exp.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-14 md:pl-16"
          >
            <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-card text-accent md:h-12 md:w-12">
              <FiBriefcase size={18} />
            </span>

            <div className="card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-fg">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-accent">
                  {exp.period}
                </span>
              </div>
              <p className="mt-1 font-body text-sm font-medium text-fg-muted">
                {exp.company} · {exp.location}
              </p>
              <ul className="mt-4 space-y-2.5">
                {exp.description.map((d, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 font-body text-sm leading-relaxed text-fg-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
