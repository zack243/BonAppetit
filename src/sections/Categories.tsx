"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const CAT_DATA = [
  { src: "/products/mayonnaise.png",              floatDelay: 0,   bg: "#FDEA02", text: "#026D41", shadow: "rgba(253,234,2,0.35)"  },
  { src: "/products/Milk Powder - 1800gm.png",    floatDelay: 0.4, bg: "#026D41", text: "#FDEA02", shadow: "rgba(2,109,65,0.40)"   },
  { src: "/products/corned-beef.png",             floatDelay: 0.8, bg: "#4C753C", text: "#FDEA02", shadow: "rgba(76,117,60,0.40)"  },
  { src: "/products/makayabu.png",                floatDelay: 1.2, bg: "#345B42", text: "#FDEA02", shadow: "rgba(52,91,66,0.35)"   },
  { src: "/products/penne.png",                   floatDelay: 1.6, bg: "#FFF6E1", text: "#026D41", shadow: "rgba(200,182,18,0.30)" },
  { src: "/products/levure.png",                  floatDelay: 2.0, bg: "#A52520", text: "#FDEA02", shadow: "rgba(165,37,32,0.40)"  },
  { src: "/products/choco-duo.png",               floatDelay: 2.4, bg: "#83AC30", text: "#fff",    shadow: "rgba(131,172,48,0.35)" },
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
    <section id="categories" ref={sectionRef} className="py-20 lg:py-28 overflow-hidden" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(2,109,65,0.08)", color: "#026D41" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#026D41" }} />
            {t("categories.badge") as string}
          </span>
          <h2 className="font-black text-[#026D41] leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {t("categories.title") as string}
          </h2>
          <p className="text-[#4A4A4A]/70 max-w-lg mx-auto">{t("categories.subtitle") as string}</p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 justify-items-center">
          {Array.isArray(items) && items.map((cat, i) => {
            const cd = CAT_DATA[i % CAT_DATA.length];
            return (
              <motion.div
                key={i}
                className={`sr sr-d${(i % 5) + 1} group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col items-center text-center w-full`}
                style={{
                  background: cd.bg,
                  minHeight: 210,
                  padding: "28px 20px 22px",
                  boxShadow: `0 6px 28px ${cd.shadow}`,
                  border: `1.5px solid ${cd.bg === "#FFF6E1" ? "rgba(2,109,65,0.12)" : "transparent"}`,
                }}
                whileHover={{ y: -10, scale: 1.02, boxShadow: `0 18px 48px ${cd.shadow}` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Dot texture */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

                {/* Glossy top sheen */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, transparent 50%)", borderRadius: "inherit" }} />

                {/* Product image with float */}
                <motion.div
                  className="relative z-10 mb-4 shrink-0"
                  style={{ width: 96, height: 96 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, delay: cd.floatDelay }}
                >
                  <Image
                    src={cd.src}
                    alt={cat.name}
                    fill
                    sizes="96px"
                    className="object-contain transition-transform duration-400 group-hover:scale-110"
                    quality={78}
                    loading="lazy"
                    style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.28))" }}
                  />
                </motion.div>

                {/* Text */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                  <h3 className="font-black text-base leading-tight mb-1" style={{ color: cd.text }}>
                    {cat.name}
                  </h3>
                  <p className="text-xs leading-snug opacity-80" style={{ color: cd.text }}>
                    {cat.desc}
                  </p>
                </div>

                {/* Arrow on hover */}
                <div className="relative z-10 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.30)" }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={cd.text} strokeWidth={2.5}>
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
