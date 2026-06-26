"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11V9.4a6.33 6.33 0 00-.82-.05A6.34 6.34 0 003.15 15.7a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.44a8.16 8.16 0 004.76 1.52V7.52a4.85 4.85 0 01-1-.83z" /></svg>,
  },
];

export default function Footer() {
  const { locale, t } = useLanguage();
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("footer.links.company"),
      links: [
        { href: "#apropos", label: t("nav.about") },
        { href: "#contact", label: t("nav.contact") },
      ],
    },
    {
      title: t("footer.links.products"),
      links: [
        { href: "#produits", label: t("nav.products") },
        { href: "#categories", label: t("nav.categories") },
      ],
    },
    {
      title: t("footer.links.support"),
      links: [
        { href: "#contact", label: t("nav.contact") },
        { href: "#recettes", label: t("nav.recipes") },
      ],
    },
  ];

  return (
    <>
      {/* Wave separator */}
      <div className="w-full overflow-hidden leading-none" style={{ background: "#FFF6E1" }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-12 md:h-16 block"
          style={{ display: "block" }}>
          <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
            fill="#FDEA02" />
        </svg>
      </div>

      <footer style={{ background: "#FDEA02", color: "#026D41" }}>

        {/* Marquee band */}
        <div className="overflow-hidden py-3" style={{ background: "#026D41" }}>
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex items-center gap-10 pr-10 flex-shrink-0">
                {["Good Food. Good Mood.", "Every Meal Matters.", "Qualité Premium", "Produits Certifiés", "1000+ Points de Vente", "Good Life.", "Familles Congolaises", "Every Family Matters.", "Votre Cuisine Complète"].map((item, i) => (
                  <span key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#FDEA02" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#FDEA02" }} />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

            {/* Brand col */}
            <div className="md:col-span-2">
              <div className="relative mb-5" style={{ width: 160, height: 54 }}>
                <Image
                  src="/logo.png"
                  alt="Bon Appétit"
                  fill
                  sizes="160px"
                  quality={70}
                  className="object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-4" style={{ color: "rgba(2,109,65,0.80)" }}>
                {t("footer.tagline") as string}
              </p>
              {/* Brand slogans */}
              <div className="flex flex-col gap-1 mb-6">
                <p className="text-xs font-black italic" style={{ color: "#A52520" }}>
                  &ldquo;Good Food. Good Mood. Good Life.&rdquo;
                </p>
                <p className="text-xs font-semibold" style={{ color: "rgba(2,109,65,0.65)" }}>
                  Every Meal Matters. Every Family Matters.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: "rgba(2,109,65,0.12)", border: "1.5px solid rgba(2,109,65,0.18)", color: "#026D41" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#A52520";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                      (e.currentTarget as HTMLElement).style.borderColor = "#A52520";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(2,109,65,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "#026D41";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,109,65,0.18)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {cols.map((col) => (
              <div key={col.title as string}>
                <h3 className="font-black text-sm mb-5 uppercase tracking-widest" style={{ color: "#A52520" }}>
                  {col.title as string}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 group"
                        style={{ color: "rgba(2,109,65,0.70)" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#A52520"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(2,109,65,0.70)"}
                      >
                        <span className="w-1 h-1 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: "#026D41" }} />
                        {link.label as string}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2" style={{ borderColor: "rgba(165,37,32,0.20)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs font-medium" style={{ color: "rgba(2,109,65,0.65)" }}>
              © {year} Bon Appétit RDC. {t("footer.copyright") as string}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs font-medium transition-colors"
                style={{ color: "rgba(2,109,65,0.65)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#A52520"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(2,109,65,0.65)"}>
                {t("footer.legal") as string}
              </a>
              <a href="#" className="text-xs font-medium transition-colors"
                style={{ color: "rgba(2,109,65,0.65)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#A52520"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(2,109,65,0.65)"}>
                {t("footer.privacy") as string}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
