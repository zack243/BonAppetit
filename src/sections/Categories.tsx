"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const CAT_ICONS = [
  // Sauces
  <svg key="s" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
  </svg>,
  // Dairy
  <svg key="d" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  // Conserves
  <svg key="c" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 012 2v3H3V5a2 2 0 012-2zm-2 5h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
  </svg>,
  // Seafood
  <svg key="f" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C6.5 3 2 7.5 2 13s4.5 10 10 10 10-4.5 10-10S17.5 3 12 3zm0 0c0 0 2 4 2 10s-2 10-2 10m-4-6c0 0 2-2 4-2s4 2 4 2" />
  </svg>,
  // Pasta
  <svg key="p" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>,
  // Bakery
  <svg key="b" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
  </svg>,
  // Sweets
  <svg key="sw" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>,
];

const CAT_COLORS = [
  { bg: "#F4D233", text: "#1D5D2B", hover: "#1D5D2B", hoverText: "#F4D233" },
  { bg: "#1D5D2B", text: "#F4D233", hover: "#4F8F38", hoverText: "#fff" },
  { bg: "#4F8F38", text: "#fff",    hover: "#1D5D2B", hoverText: "#F4D233" },
  { bg: "#0ea5e9", text: "#fff",    hover: "#0284c7", hoverText: "#fff" },
  { bg: "#F59E0B", text: "#1D5D2B", hover: "#D97706", hoverText: "#fff" },
  { bg: "#D92525", text: "#fff",    hover: "#b91c1c", hoverText: "#fff" },
  { bg: "#a855f7", text: "#fff",    hover: "#9333ea", hoverText: "#fff" },
];

export default function Categories() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  const items = t("categories.items") as Array<{ name: string; desc: string }>;

  return (
    <section id="categories" ref={sectionRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(29,93,43,0.08)", color: "#1D5D2B" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1D5D2B" }} />
            {t("categories.badge") as string}
          </span>
          <h2 className="font-black text-[#222] leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {t("categories.title") as string}
          </h2>
          <p className="text-[#222]/60 max-w-lg mx-auto">{t("categories.subtitle") as string}</p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.isArray(items) && items.map((cat, i) => {
            const color = CAT_COLORS[i % CAT_COLORS.length];
            return (
              <motion.div
                key={i}
                className={`sr sr-d${(i % 5) + 1} group relative rounded-2xl overflow-hidden cursor-pointer p-6 flex flex-col gap-4`}
                style={{ background: color.bg, minHeight: 180 }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)", color: color.text }}>
                  {CAT_ICONS[i % CAT_ICONS.length]}
                </div>

                {/* Text */}
                <div className="relative z-10 flex-1">
                  <h3 className="font-black text-base leading-tight mb-1.5" style={{ color: color.text }}>
                    {cat.name}
                  </h3>
                  <p className="text-sm leading-snug opacity-75" style={{ color: color.text }}>
                    {cat.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="relative z-10 self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.25)" }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color.text} strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
