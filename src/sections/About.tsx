"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  return (
    <section id="apropos" ref={sectionRef} className="overflow-hidden" style={{ background: "#1D5D2B" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — Image placeholder with family illustration */}
          <div className="sr-left flex-shrink-0">
            <div
              className="relative rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                width: "clamp(280px, 38vw, 500px)",
                height: "clamp(320px, 44vw, 560px)",
                background: "linear-gradient(135deg, #4F8F38 0%, #1D5D2B 100%)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Dot texture */}
              <div className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

              {/* Family illustration */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-white text-center px-8">
                <motion.div
                  className="text-8xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  👨‍👩‍👧‍👦
                </motion.div>
                <div className="mt-4">
                  <p className="font-black text-2xl text-white mb-1">Famille Congolaise</p>
                  <p className="text-white/70 text-sm">Unis autour de la table Bon Appétit</p>
                </div>

                {/* Floating food icons */}
                {[
                  { emoji: "🍽️", style: { top: "12%", left: "8%", fontSize: 28 } },
                  { emoji: "🥛", style: { top: "25%", right: "10%", fontSize: 24 } },
                  { emoji: "🍝", style: { bottom: "20%", left: "12%", fontSize: 26 } },
                  { emoji: "🥫", style: { bottom: "15%", right: "8%", fontSize: 22 } },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="absolute select-none pointer-events-none"
                    style={{ ...item.style }}
                    animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </div>

              {/* Corner decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 opacity-50"
                style={{ background: "linear-gradient(90deg, #F4D233, #F59E0B)" }} />
            </div>
          </div>

          {/* Right — Text */}
          <div className="sr flex-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6"
              style={{ background: "rgba(244,210,51,0.2)", color: "#F4D233", border: "1px solid rgba(244,210,51,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F4D233" }} />
              {t("about.badge") as string}
            </span>

            <h2 className="font-black text-white leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              {t("about.title") as string}
            </h2>

            <p className="text-white/80 leading-relaxed mb-10"
              style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", maxWidth: 520 }}>
              {t("about.text") as string}
            </p>

            {/* Feature points */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: "✅", text: "Une gamme complète de 20+ produits" },
                { icon: "🏪", text: "Plus de 1000 points de vente" },
                { icon: "🇨🇩", text: "Présence sur toute l'étendue du territoire" },
                { icon: "❤️", text: "La confiance des familles congolaises" },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg">{feat.icon}</span>
                  <span className="text-white/85 text-sm font-medium">{feat.text}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 font-black rounded-full px-8 py-3.5 text-sm shadow-lg"
              style={{ background: "#F4D233", color: "#1D5D2B" }}
            >
              {t("about.cta") as string}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
