"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useI18n } from "@/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="container-px flex min-h-screen flex-col items-center justify-center text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
        {t("notFound.code")}
      </p>
      <h1 className="mt-6 font-display text-7xl font-extrabold tracking-tight text-gradient md:text-9xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-6 max-w-md font-body text-fg-muted">
        {t("notFound.text")}
      </p>
      <Link href="/" className="btn-primary group mt-9">
        <FiArrowLeft
          className="transition-transform group-hover:-translate-x-1"
          size={16}
        />
        {t("common.backToHome")}
      </Link>
    </div>
  );
}
