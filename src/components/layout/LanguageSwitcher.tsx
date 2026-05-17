"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheck, HiChevronDown } from "react-icons/hi2";
import { useI18n } from "@/i18n/LanguageProvider";
import { LANGS, LANG_META, type Lang } from "@/i18n/config";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const choose = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("nav.changeLanguage")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-line bg-bg-card/60 px-2.5 font-mono text-xs font-semibold text-fg-muted transition-all duration-300 hover:scale-105 hover:border-accent hover:text-accent"
      >
        <span aria-hidden>{LANG_META[lang].flag}</span>
        <span>{LANG_META[lang].short}</span>
        <HiChevronDown
          size={13}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-line bg-bg-card/95 p-1.5 shadow-card backdrop-blur-xl"
          >
            {LANGS.map((l) => {
              const active = l === lang;
              return (
                <li key={l}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => choose(l)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-body text-sm transition-colors ${
                      active
                        ? "bg-accent/10 text-accent"
                        : "text-fg-muted hover:bg-bg-soft hover:text-fg"
                    }`}
                  >
                    <span aria-hidden className="text-base">
                      {LANG_META[l].flag}
                    </span>
                    <span className="flex-1">{LANG_META[l].native}</span>
                    {active && <HiCheck size={15} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
