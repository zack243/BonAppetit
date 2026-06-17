"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const PHARES = [
  { src: "/products/lait-1800.png",   bg: "#1D5D2B", accent: "#F4D233", flip: false },
  { src: "/products/mayonnaise.png",  bg: "#F4D233", accent: "#1D5D2B", flip: true  },
  { src: "/products/ketchup.png",     bg: "#D92525", accent: "#fff",    flip: false },
  { src: "/products/makayabu.png",    bg: "#4F8F38", accent: "#F4D233", flip: true  },
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
    <section id="phares" ref={sectionRef} className="overflow-hidden" style={{ background: "#FFF8EC" }}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-12 text-center">
        <div className="sr inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
          style={{ background: "rgba(29,93,43,0.08)", color: "#1D5D2B" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1D5D2B" }} />
          {t("phares.badge") as string}
        </div>
        <h2 className="sr font-black text-[#222] leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
          {t("phares.title") as string}
        </h2>
        <p className="sr text-[#222]/60 max-w-lg mx-auto">{t("phares.subtitle") as string}</p>
      </div>

      {/* Alternating rows */}
      <div className="flex flex-col gap-0">
        {PHARES.map((ph, i) => {
          const item = Array.isArray(items) ? items[i] : null;
          if (!item) return null;
          const isFlipped = ph.flip;

          return (
            <div
              key={i}
              className={`relative overflow-hidden py-16 lg:py-24`}
              style={{ background: i % 2 === 0 ? "#fff" : "#FFF8EC" }}
            >
              {/* Ambient glow */}
              <div className="absolute pointer-events-none rounded-full hidden lg:block"
                style={{
                  width: 400, height: 400,
                  [isFlipped ? "right" : "left"]: "-80px",
                  top: "50%", transform: "translateY(-50%)",
                  background: ph.bg,
                  filter: "blur(80px)",
                  opacity: 0.12,
                }}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col ${isFlipped ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>

                  {/* Product image */}
                  <div className={`sr ${isFlipped ? "sr-right" : "sr-left"} flex-shrink-0`}>
                    <div
                      className="relative rounded-3xl flex items-center justify-center"
                      style={{
                        width: "clamp(220px, 32vw, 380px)",
                        height: "clamp(280px, 40vw, 460px)",
                        background: ph.bg,
                        boxShadow: `0 32px 80px ${ph.bg}55`,
                      }}
                    >
                      {/* Glossy */}
                      <div className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 55%)" }} />

                      <motion.div
                        className="relative w-4/5 h-4/5"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      >
                        <Image
                          src={ph.src}
                          alt={item.name}
                          fill
                          sizes="380px"
                          quality={80}
                          loading="lazy"
                          className="object-contain"
                          style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.45))" }}
                        />
                      </motion.div>

                      {/* Tag badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                        style={{ background: `${ph.accent}22`, color: ph.accent, border: `1px solid ${ph.accent}44` }}>
                        {item.tag}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="sr flex-1">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-5"
                      style={{ background: `${ph.bg}15`, color: ph.bg }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: ph.bg }} />
                      {item.tag}
                    </span>
                    <h3 className="font-black text-[#222] leading-tight mb-4"
                      style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}>
                      {item.name}
                    </h3>
                    <p className="text-[#222]/65 leading-relaxed mb-8"
                      style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", maxWidth: 480 }}>
                      {item.desc}
                    </p>
                    <motion.a
                      href="#produits"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2.5 font-black rounded-full px-7 py-3 text-sm shadow-lg"
                      style={{ background: ph.bg, color: ph.accent }}
                    >
                      {t("phares.discover") as string}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
