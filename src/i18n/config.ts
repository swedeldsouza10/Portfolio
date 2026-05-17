export const LANGS = ["en", "hi", "fr", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_META: Record<
  Lang,
  { label: string; native: string; flag: string; short: string }
> = {
  en: { label: "English", native: "English", flag: "🇬🇧", short: "EN" },
  hi: { label: "Hindi", native: "हिन्दी", flag: "🇮🇳", short: "HI" },
  fr: { label: "French", native: "Français", flag: "🇫🇷", short: "FR" },
  de: { label: "German", native: "Deutsch", flag: "🇩🇪", short: "DE" },
};

export const DEFAULT_LANG: Lang = "en";
export const LANG_STORAGE_KEY = "lang";
