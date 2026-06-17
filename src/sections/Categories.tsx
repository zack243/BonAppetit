"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const CAT_PRODUCTS = [
  { src: "/products/mayonnaise.png",  floatDelay: 0   },
  { src: "/products/lait-1800.png",   floatDelay: 0.4 },
  { src: "/products/corned-beef.png", floatDelay: 0.8 },
  { src: "/products/makayabu.png",    floatDelay: 1.2 },
  { src: "/products/penne.png",       floatDelay: 1.6 },
  { src: "/products/levure.png",      floatDelay: 2.0 },
  { src: "/products/choco-duo.png",   floatDelay: 2.4 },
];

const CAT_COLORS = [
  { bg: "#F4D233", text: "#1D5D2B" },
  { bg: "#1D5D2B", text: "#F4D233" },
  { bg: "#4F8F38", text: "#fff"    },
  { bg: "#0ea5e9", text: "#fff"    },
  { bg: "#F59E0B", text: "#1D5D2B" },
  { bg: "#D92525", text: "#fff"    },
  { bg: "#a855f7", text: "#fff"    },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 justify-items-center">
          {Array.isArray(items) && items.map((cat, i) => {
            const color = CAT_COLORS[i % CAT_COLORS.length];
            const prod = CAT_PRODUCTS[i % CAT_PRODUCTS.length];
            return (
              <motion.div
                key={i}
                className={`sr sr-d${(i % 5) + 1} group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col items-center text-center w-full`}
                style={{ background: color.bg, minHeight: 200, padding: "28px 20px 22px" }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

                {/* Glossy top sheen */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 50%)", borderRadius: "inherit" }} />

                {/* Product image with float */}
                <motion.div
                  className="relative z-10 mb-4 shrink-0"
                  style={{ width: 88, height: 88 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, delay: prod.floatDelay }}
                >
                  <Image
                    src={prod.src}
                    alt={cat.name}
                    fill
                    sizes="88px"
                    className="object-contain"
                    quality={75}
                    loading="lazy"
                    style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.30))" }}
                  />
                </motion.div>

                {/* Text */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                  <h3 className="font-black text-base leading-tight mb-1" style={{ color: color.text }}>
                    {cat.name}
                  </h3>
                  <p className="text-xs leading-snug opacity-75" style={{ color: color.text }}>
                    {cat.desc}
                  </p>
                </div>

                {/* Arrow on hover */}
                <div className="relative z-10 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.28)" }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={color.text} strokeWidth={2.5}>
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
