"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { HiSun, HiMoon, HiBars3, HiXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/projects", key: "nav.projects" },
  { href: "/contact", key: "nav.contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-6">
      <div
        className={`mx-auto mt-3 flex max-w-content items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 md:mt-4 md:px-7 ${
          scrolled
            ? "border border-line bg-bg/70 shadow-card backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight"
          aria-label="Home"
        >
          <span className="text-gradient">Swedel</span>
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-4 py-2 font-body text-sm font-medium transition-colors ${
                  active ? "text-accent" : "text-fg-muted hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(link.key)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />

          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg-card/60 text-accent transition-all duration-300 hover:scale-110 hover:border-accent"
            aria-label={t("nav.toggleTheme")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <HiSun size={17} /> : <HiMoon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link href="/contact" className="btn-primary hidden !px-5 !py-2 md:inline-flex">
            {t("nav.letsTalk")}
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg-card/60 text-fg md:hidden"
            aria-label={t("nav.toggleMenu")}
          >
            {mobileOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-3 mt-2 flex flex-col gap-1 rounded-2xl border border-line bg-bg/90 p-4 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 font-body text-sm font-medium transition-colors ${
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-fg-muted hover:bg-bg-soft hover:text-fg"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary mt-2 w-full">
              {t("nav.letsTalk")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
