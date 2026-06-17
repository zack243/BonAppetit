"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const PHARES = [
  {
    src: "/products/lait-1800.png",
    bg: "linear-gradient(145deg, #1D5D2B 0%, #2d7a3a 100%)",
    solidBg: "#1D5D2B",
    accent: "#F4D233",
    glow: "rgba(29,93,43,0.45)",
    featured: false,
  },
  {
    src: "/products/mayonnaise.png",
    bg: "linear-gradient(145deg, #F4D233 0%, #f7dc5a 100%)",
    solidBg: "#F4D233",
    accent: "#1D5D2B",
    glow: "rgba(244,210,51,0.55)",
    featured: true,
  },
  {
    src: "/products/ketchup.png",
    bg: "linear-gradient(145deg, #D92525 0%, #e83535 100%)",
    solidBg: "#D92525",
    accent: "#fff",
    glow: "rgba(217,37,37,0.45)",
    featured: false,
  },
  {
    src: "/products/makayabu.png",
    bg: "linear-gradient(145deg, #4F8F38 0%, #5fa344 100%)",
    solidBg: "#4F8F38",
    accent: "#F4D233",
    glow: "rgba(79,143,56,0.45)",
    featured: false,
  },
];

export default function Phares() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  const items = t("phares.items") as Array<{ name: string; desc: string; tag: string }>;

  return (
    <section
      id="phares"
      ref={sectionRef}
      className="overflow-hidden py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg, #fff 0%, #FFF8EC 60%, #fff 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(29,93,43,0.08)", color: "#1D5D2B" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#F4D233", boxShadow: "0 0 8px #F4D233" }} />
            {t("phares.badge") as string}
          </span>
          <h2 className="font-black text-[#1a1a1a] leading-tight mb-3" style={{ fontSize: "clamp(1.9rem,4vw,3.2rem)" }}>
            {t("phares.title") as string}
          </h2>
          <p className="text-[#222]/55 max-w-md mx-auto text-base">{t("phares.subtitle") as string}</p>
        </div>

        {/* Desktop: featured center grid — Mobile: horizontal scroll */}
        <div
          className="flex gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none lg:grid lg:grid-cols-4"
          style={{ scrollbarWidth: "none" }}
        >
          {PHARES.map((ph, i) => {
            const item = Array.isArray(items) ? items[i] : null;
            if (!item) return null;

            return (
              <motion.div
                key={i}
                className="group relative flex-shrink-0 snap-center flex flex-col cursor-pointer"
                style={{
                  width: "clamp(260px, 72vw, 320px)",
                  minWidth: "clamp(260px, 72vw, 320px)",
                }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: ph.featured ? -10 : -8, scale: ph.featured ? 1.01 : 1.01 }}
              >
                {/* Card shell */}
                <div
                  className="relative flex flex-col overflow-hidden h-full transition-all duration-400"
                  style={{
                    borderRadius: 28,
                    background: "#fff",
                    border: ph.featured
                      ? `2.5px solid ${ph.solidBg}`
                      : "1.5px solid rgba(29,93,43,0.08)",
                    boxShadow: ph.featured
                      ? `0 8px 32px ${ph.glow}, 0 2px 8px rgba(0,0,0,0.06)`
                      : "0 4px 20px rgba(29,93,43,0.07)",
                    transform: ph.featured ? "translateY(-12px)" : "none",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 24px 64px ${ph.glow}, 0 4px 16px rgba(0,0,0,0.10)`;
                    (e.currentTarget as HTMLElement).style.borderColor = ph.solidBg;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = ph.featured
                      ? `0 8px 32px ${ph.glow}, 0 2px 8px rgba(0,0,0,0.06)`
                      : "0 4px 20px rgba(29,93,43,0.07)";
                    (e.currentTarget as HTMLElement).style.borderColor = ph.featured
                      ? ph.solidBg
                      : "rgba(29,93,43,0.08)";
                  }}
                >
                  {/* Featured ribbon */}
                  {ph.featured && (
                    <div
                      className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                      style={{ background: ph.solidBg, color: ph.accent, boxShadow: `0 4px 16px ${ph.glow}` }}
                    >
                      ⭐ Bestseller
                    </div>
                  )}

                  {/* Image area */}
                  <div
                    className="relative flex items-center justify-center overflow-hidden"
                    style={{
                      height: ph.featured ? 280 : 240,
                      background: ph.bg,
                      borderRadius: "26px 26px 0 0",
                    }}
                  >
                    {/* Glossy sheen */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(150deg, rgba(255,255,255,0.20) 0%, transparent 55%)", borderRadius: "26px 26px 0 0" }}
                    />

                    {/* Radial glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 65%, rgba(255,255,255,0.18) 0%, transparent 65%)` }}
                    />

                    {/* Floating product image */}
                    <motion.div
                      className="relative"
                      style={{ width: ph.featured ? 200 : 168, height: ph.featured ? 200 : 168 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4 + i * 0.5, ease: "easeInOut", repeat: Infinity, delay: i * 0.35 }}
                    >
                      <Image
                        src={ph.src}
                        alt={item.name}
                        fill
                        sizes="220px"
                        quality={82}
                        loading="lazy"
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.08]"
                        style={{ filter: `drop-shadow(0 16px 32px rgba(0,0,0,0.35))` }}
                      />
                    </motion.div>

                    {/* Tag badge — bottom-left of image area */}
                    <div
                      className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                      style={{
                        background: "rgba(255,255,255,0.22)",
                        backdropFilter: "blur(8px)",
                        color: ph.accent,
                        border: `1px solid ${ph.accent}44`,
                      }}
                    >
                      {item.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-2">
                    <h3
                      className="font-black leading-tight text-[#1a1a1a]"
                      style={{ fontSize: ph.featured ? "1.15rem" : "1rem" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-[#444]/70 text-xs leading-relaxed flex-1" style={{ minHeight: 48 }}>
                      {item.desc}
                    </p>

                    {/* CTA */}
                    <motion.a
                      href="#produits"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center justify-center gap-2 font-black rounded-2xl text-sm mt-1 transition-all duration-300"
                      style={{
                        background: ph.solidBg,
                        color: ph.accent,
                        padding: ph.featured ? "12px 20px" : "10px 18px",
                        boxShadow: `0 6px 24px ${ph.glow}`,
                      }}
                    >
                      {t("phares.discover") as string}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile scroll indicator dots */}
        <div className="flex lg:hidden justify-center gap-2 mt-6">
          {PHARES.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === 1 ? 20 : 6,
                height: 6,
                background: i === 1 ? "#1D5D2B" : "rgba(29,93,43,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
