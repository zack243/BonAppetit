"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const VALUE_ICONS: Record<string, React.ReactNode> = {
  quality: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  flavor: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  trust: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  availability: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  innovation: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const VALUE_COLORS = [
  { bg: "#026D41", light: "#FDEA02" },
  { bg: "#FDEA02", light: "#026D41" },
  { bg: "#A52520", light: "#fff" },
  { bg: "#4C753C", light: "#FDEA02" },
  { bg: "#C8B612", light: "#fff" },
];

export default function Values() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  const items = t("values.items") as Array<{ key: string; title: string; desc: string }>;

  return (
    <section id="valeurs" ref={sectionRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(165,37,32,0.08)", color: "#A52520" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#A52520" }} />
            {t("values.badge") as string}
          </span>
          <h2 className="font-black text-[#026D41] leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {t("values.title") as string}
          </h2>
          <p className="text-[#222]/60 max-w-lg mx-auto">{t("values.subtitle") as string}</p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {Array.isArray(items) && items.map((val, i) => {
            const color = VALUE_COLORS[i % VALUE_COLORS.length];
            return (
              <motion.div
                key={val.key}
                className={`sr sr-d${i + 1} group relative rounded-2xl overflow-hidden p-6 flex flex-col gap-4 cursor-default`}
                style={{
                  background: i === 0 ? "#FFF8EC" : (i % 2 === 0 ? "#FFF8EC" : "#fff"),
                  border: "1.5px solid rgba(2,109,65,0.08)",
                }}
                whileHover={{ y: -4, borderColor: "#A52520" + "30" }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: color.bg, color: color.light }}>
                  {VALUE_ICONS[val.key] ?? VALUE_ICONS.quality}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-black text-[#1a1a1a] text-lg mb-2 group-hover:text-[#A52520] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-[#222]/60 text-sm leading-relaxed">{val.desc}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl"
                  style={{ background: color.bg }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
