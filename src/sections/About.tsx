"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
    <section id="apropos" ref={sectionRef} className="overflow-hidden" style={{ background: "#026D41" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — Hero image */}
          <div className="sr-left flex-shrink-0">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                width: "clamp(280px, 38vw, 480px)",
                height: "clamp(320px, 46vw, 580px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
              }}
            >
              <Image
                src="/hero.jpg"
                alt="Bon Appétit — Famille congolaise"
                fill
                sizes="(max-width:1024px) 80vw, 480px"
                quality={80}
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
              {/* Subtle green vignette overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(29,93,43,0.55), transparent)" }} />
              {/* Red accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5"
                style={{ background: "linear-gradient(90deg, #A52520, #FDEA02)" }} />
            </div>
          </div>

          {/* Right — Text */}
          <div className="sr flex-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6"
              style={{ background: "rgba(165,37,32,0.25)", color: "#fff", border: "1px solid rgba(165,37,32,0.4)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#A52520" }} />
              {t("about.badge") as string}
            </span>

            <h2 className="font-black text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              {t("about.title") as string}
            </h2>
            {/* Red decorative line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-10 rounded-full" style={{ background: "#A52520" }} />
              <div className="h-0.5 w-4 rounded-full" style={{ background: "rgba(165,37,32,0.4)" }} />
            </div>

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
                { icon: "❤️", text: "La confiance des familles congolaises", red: true },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg">{feat.icon}</span>
                  <span className={`text-sm font-medium ${(feat as {red?: boolean}).red ? "text-[#FDEA02] font-black" : "text-white/85"}`}>{feat.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 font-black rounded-full px-8 py-3.5 text-sm shadow-lg"
              style={{ background: "#FDEA02", color: "#026D41" }}
            >
              {t("about.cta") as string}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            <a href="#produits"
              className="inline-flex items-center gap-2 font-bold text-sm underline underline-offset-4"
              style={{ color: "#FDEA02" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#A52520"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#FDEA02"}
            >
              Voir nos produits
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
