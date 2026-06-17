"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { Locale, defaultLocale, locales } from "@/i18n/config";
import frMessages from "@/i18n/messages/fr.json";
import enMessages from "@/i18n/messages/en.json";

const messages = { fr: frMessages, en: enMessages };
const STORAGE_KEY = "bon-appetit-locale";

type TFunction = (key: string) => any;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TFunction;
  locales: readonly Locale[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNested(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved) && saved !== locale) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (!locales.includes(newLocale) || newLocale === locale) return;
      setLocaleState(newLocale);
      try { localStorage.setItem(STORAGE_KEY, newLocale); } catch {}
      const newPath = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${newLocale}`);
      if (newPath !== pathname) router.replace(newPath, { scroll: false });
    },
    [locale, pathname, router]
  );

  const t: TFunction = useCallback(
    (key: string) => {
      const text = getNested(messages[locale], key);
      return text ?? key;
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t, locales }), [locale, setLocale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
