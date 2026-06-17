"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const RECIPE_GRADIENTS = [
  "linear-gradient(135deg, #1D5D2B 0%, #4F8F38 100%)",
  "linear-gradient(135deg, #F4D233 0%, #F59E0B 100%)",
  "linear-gradient(135deg, #D92525 0%, #F59E0B 100%)",
  "linear-gradient(135deg, #4F8F38 0%, #1D5D2B 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #F4D233 100%)",
  "linear-gradient(135deg, #1D5D2B 0%, #D92525 100%)",
];

const RECIPE_EMOJIS = ["🍗", "🍟", "☕", "🐟", "🍝", "🍔"];

const LEVEL_COLORS: Record<string, string> = {
  "Facile": "#4F8F38",
  "Très facile": "#1D5D2B",
  "Moyen": "#F59E0B",
  "Easy": "#4F8F38",
  "Very easy": "#1D5D2B",
  "Medium": "#F59E0B",
};

export default function Recipes() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  const items = t("recipes.items") as Array<{ title: string; cat: string; time: string; level: string }>;

  return (
    <section id="recettes" ref={sectionRef} className="py-20 lg:py-28 overflow-hidden" style={{ background: "#FFF8EC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(29,93,43,0.08)", color: "#1D5D2B" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1D5D2B" }} />
            {t("recipes.badge") as string}
          </span>
          <h2 className="font-black text-[#222] leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {t("recipes.title") as string}
          </h2>
          <p className="text-[#222]/60 max-w-lg mx-auto">{t("recipes.subtitle") as string}</p>
        </div>

        {/* Recipe grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {Array.isArray(items) && items.map((recipe, i) => (
            <motion.div
              key={i}
              className={`sr sr-d${(i % 5) + 1} group relative rounded-2xl overflow-hidden cursor-pointer`}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#fff",
                boxShadow: "0 2px 16px rgba(29,93,43,0.08)",
                border: "1.5px solid rgba(29,93,43,0.07)",
              }}
            >
              {/* Visual top */}
              <div
                className="relative h-44 flex items-center justify-center overflow-hidden"
                style={{ background: RECIPE_GRADIENTS[i % RECIPE_GRADIENTS.length] }}
              >
                {/* Pattern */}
                <div className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

                {/* Emoji */}
                <motion.div
                  className="text-7xl select-none"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" }}
                >
                  {RECIPE_EMOJIS[i % RECIPE_EMOJIS.length]}
                </motion.div>

                {/* Category pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.9)", color: "#1D5D2B" }}>
                  {recipe.cat}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-black text-[#222] text-base leading-tight mb-3 group-hover:text-[#1D5D2B] transition-colors">
                  {recipe.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#222]/55">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                      </svg>
                      {recipe.time}
                    </span>
                    <span className="font-semibold rounded-full px-2 py-0.5 text-[10px]"
                      style={{ background: `${LEVEL_COLORS[recipe.level] ?? "#1D5D2B"}15`, color: LEVEL_COLORS[recipe.level] ?? "#1D5D2B" }}>
                      {recipe.level}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-black text-[#1D5D2B] group-hover:gap-2 transition-all">
                    {t("recipes.readMore") as string}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
