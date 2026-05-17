"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { getTech } from "@/lib/tech";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";

const categories = ["frontend", "backend", "tools", "language"] as const;

export default function SkillsSection() {
  const { t } = useI18n();
  return (
    <section className="container-px py-24">
      <SectionHeading
        kicker={t("skills.kicker")}
        title={
          <>
            {t("skills.titleA")}{" "}
            <span className="text-gradient">{t("skills.titleB")}</span>
          </>
        }
        subtitle={t("skills.subtitle")}
      />

      <div className="space-y-12">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          return (
            <div key={cat}>
              <div className="mb-6 flex items-center gap-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-fg-subtle">
                  {t(`skills.${cat}`)}
                </h3>
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {catSkills.map((skill, i) => {
                  const { icon: Icon, color } = getTech(skill.name);
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="group card card-hover flex items-center gap-3 p-4"
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${color}1a`,
                          color,
                        }}
                      >
                        <Icon size={22} />
                      </span>
                      <span className="font-display text-sm font-semibold text-fg">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
