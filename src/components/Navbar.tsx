"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const SOCIALS = [
  {
    label: "Facebook", href: "https://www.facebook.com/bonappetit.rdc",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "Instagram", href: "https://www.instagram.com/bonappetit.rdc",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    label: "TikTok", href: "https://www.tiktok.com/@bonappetit.rdc",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11V9.4a6.33 6.33 0 00-.82-.05A6.34 6.34 0 003.15 15.7a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.44a8.16 8.16 0 004.76 1.52V7.52a4.85 4.85 0 01-1-.83z"/></svg>,
  },
  {
    label: "YouTube", href: "https://www.youtube.com/@bonappetit.rdc",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const links = [
    { label: t("nav.home") as string,       anchor: "#accueil"    },
    { label: t("nav.products") as string,   anchor: "#produits"   },
    { label: t("nav.categories") as string, anchor: "#categories" },
    { label: t("nav.recipes") as string,    anchor: "#recettes"   },
    { label: t("nav.about") as string,      anchor: "#apropos"    },
    { label: t("nav.contact") as string,    anchor: "#contact"    },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "#FDEA02",
        boxShadow: scrolled ? "0 2px 24px rgba(2,109,65,0.18)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <Link href={`/${locale}/`} className="flex-shrink-0 relative" style={{ width: 148, height: 46 }}>
            <Image
              src="/logo.png"
              alt="Bon Appétit"
              fill
              sizes="148px"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <a
                key={link.anchor}
                href={link.anchor}
                className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-full transition-colors"
                style={{ color: "#026D41" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(2,109,65,0.10)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Social icons — desktop only */}
            <div className="hidden lg:flex items-center gap-1 mr-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ color: "#026D41" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "#026D41";
                    (e.currentTarget as HTMLElement).style.color = "#FDEA02";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#026D41";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Separator */}
            <div className="hidden lg:block w-px h-5 bg-[#026D41]/20" />

            {/* Language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-black rounded-full transition-colors"
                style={{ background: "#026D41", color: "#FDEA02" }}
                aria-label="Changer de langue"
              >
                {locale.toUpperCase()}
                <svg className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[130px] z-50">
                  {locales.map((loc) => {
                    const currentPath = pathname.replace(/^\/(fr|en)/, "") || "/";
                    return (
                      <Link
                        key={loc}
                        href={`/${loc}${currentPath}`}
                        onClick={() => { setLocale(loc); setLangOpen(false); }}
                        className="block px-4 py-2.5 text-sm font-semibold transition-colors"
                        style={{
                          background: locale === loc ? "rgba(2,109,65,0.08)" : "transparent",
                          color: locale === loc ? "#026D41" : "#4A4A4A",
                        }}
                      >
                        {loc === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA button */}
            <a
              href="#produits"
              className="hidden sm:flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-black text-sm rounded-full transition-all whitespace-nowrap"
              style={{ background: "#026D41", color: "#FDEA02", boxShadow: "0 4px 14px rgba(2,109,65,0.35)" }}
            >
              {t("nav.discover") as string}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#026D41" }}
              aria-label={mobileOpen ? "Fermer" : "Menu"}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ background: "#FDEA02", borderColor: "rgba(2,109,65,0.15)" }}>
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.anchor}
                href={link.anchor}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base font-semibold rounded-xl transition-colors"
                style={{ color: "#026D41" }}
              >
                {link.label}
              </a>
            ))}
            {/* Social row mobile */}
            <div className="flex items-center justify-center gap-3 py-3 mt-1">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(2,109,65,0.10)", color: "#026D41" }}>
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href="#produits"
              onClick={() => setMobileOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 px-4 py-3 font-black rounded-xl transition-colors"
              style={{ background: "#026D41", color: "#FDEA02" }}
            >
              {t("nav.discover") as string}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
