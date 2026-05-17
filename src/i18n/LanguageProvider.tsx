"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries } from "./dictionaries";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  LANGS,
  type Lang,
} from "./config";

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translate a dot-path key. Falls back to English, then the key itself. */
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (k) => k,
});

function lookup(dict: unknown, path: string): string | undefined {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      dict
    );
  return typeof value === "string" ? value : undefined;
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // SSR + first client render use the default so hydration matches; the
  // stored language is applied right after mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      if (saved && (LANGS as readonly string[]).includes(saved)) {
        setLangState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string) =>
      lookup(dictionaries[lang], key) ??
      lookup(dictionaries[DEFAULT_LANG], key) ??
      key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
