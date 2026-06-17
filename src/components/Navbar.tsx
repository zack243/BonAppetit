"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { locale, t, locales, setLocale } = useLanguage();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const isActive = useCallback((href: string) => {
    const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
    const clean = rest.replace(/\/$/, "") || "/";
    if (href === "/") return clean === "/";
    const h = href.replace(/\/$/, "");
    return clean === h || clean.startsWith(h + "/");
  }, [pathname, locale]);

  const links = [
    { href: "/", label: t("nav.home"), anchor: "#accueil" },
    { href: "/", label: t("nav.products"), anchor: "#produits" },
    { href: "/", label: t("nav.categories"), anchor: "#categories" },
    { href: "/", label: t("nav.recipes"), anchor: "#recettes" },
    { href: "/", label: t("nav.about"), anchor: "#apropos" },
    { href: "/", label: t("nav.contact"), anchor: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 32px rgba(29,93,43,0.10)" : "none",
        borderBottom: scrolled ? "1px solid rgba(29,93,43,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href={`/${locale}/`} className="flex-shrink-0 relative" style={{ width: 140, height: 44 }}>
            <Image
              src="/logo.png"
              alt="Bon Appétit"
              fill
              sizes="140px"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.anchor}
                href={link.anchor}
                className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-full transition-colors text-[#1D5D2B] hover:bg-[#1D5D2B]/10 hover:text-[#1D5D2B]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full transition-colors"
                style={{ background: "#1D5D2B", color: "#fff" }}
                aria-label="Changer de langue"
                aria-expanded={langOpen}
              >
                {locale.toUpperCase()}
                <svg
                  className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[120px] z-50">
                  {locales.map((loc) => {
                    const currentPath = pathname.replace(/^\/(fr|en)/, "");
                    return (
                      <Link
                        key={loc}
                        href={`/${loc}${currentPath}`}
                        onClick={() => { setLocale(loc); setLangOpen(false); }}
                        className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                          locale === loc
                            ? "bg-[#1D5D2B]/10 text-[#1D5D2B]"
                            : "text-[#222] hover:bg-[#F4D233]/20"
                        }`}
                      >
                        {loc === "fr" ? "Français" : "English"}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href="#produits"
              className="hidden sm:flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-bold text-sm rounded-full shadow-md transition-all whitespace-nowrap"
              style={{ background: "#F4D233", color: "#1D5D2B" }}
            >
              {t("nav.discover")}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#1D5D2B" }}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg" style={{ borderColor: "rgba(29,93,43,0.1)" }}>
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.anchor}
                href={link.anchor}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold rounded-xl transition-colors text-[#1D5D2B] hover:bg-[#1D5D2B]/08"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#produits"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center px-4 py-3 font-bold rounded-xl transition-colors"
              style={{ background: "#F4D233", color: "#1D5D2B" }}
            >
              {t("nav.discover")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
