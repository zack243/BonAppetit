"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const HERO_PRODUCTS = [
  { src: "/products/mayonnaise.png", name: "Mayonnaise", category: "Sauces", bg: "#F4D233", accent: "#1D5D2B" },
  { src: "/products/lait-1800.png",  name: "Lait 1.8kg",  category: "Produits Laitiers", bg: "#1D5D2B", accent: "#F4D233" },
  { src: "/products/ketchup.png",    name: "Ketchup",    category: "Sauces", bg: "#D92525", accent: "#fff" },
  { src: "/products/makayabu.png",   name: "Makayabu",   category: "Produits de la Mer", bg: "#4F8F38", accent: "#F4D233" },
  { src: "/products/pilchards.png",  name: "Pilchards",  category: "Conserves", bg: "#F59E0B", accent: "#1D5D2B" },
  { src: "/products/corned-beef.png",name: "Corned Beef",category: "Conserves", bg: "#222222", accent: "#F4D233" },
];

const FLOATING = [
  { emoji: "🍅", size: 42, top: "12%", left: "8%", delay: 0, speed: 5 },
  { emoji: "🌿", size: 36, top: "70%", left: "5%", delay: 1.2, speed: 6.5 },
  { emoji: "🐟", size: 44, top: "20%", left: "92%", delay: 0.5, speed: 5.5 },
  { emoji: "🍝", size: 38, top: "75%", left: "88%", delay: 1.8, speed: 7 },
  { emoji: "🌶️", size: 34, top: "50%", left: "96%", delay: 0.8, speed: 4.5 },
  { emoji: "🧅", size: 32, top: "40%", left: "3%", delay: 2.1, speed: 6 },
];

export default function Hero() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % HERO_PRODUCTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const p = HERO_PRODUCTS[current];

  return (
    <section
      id="accueil"
      className="relative overflow-hidden"
      style={{ background: "#1D5D2B", minHeight: "100dvh" }}
      aria-label="Section héros Bon Appétit"
    >
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Floating ingredients */}
      {FLOATING.map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{ top: f.top, left: f.left, fontSize: f.size }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: f.speed, ease: "easeInOut", repeat: Infinity, delay: f.delay }}
        >
          {f.emoji}
        </motion.div>
      ))}

      {/* ═══ DESKTOP ═══ */}
      <div className="hidden lg:flex absolute inset-0" style={{ paddingTop: 72 }}>

        {/* LEFT — Text */}
        <div className="flex-1 flex flex-col justify-center px-12 xl:px-20 pb-12 max-w-[52%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{ background: "rgba(244,210,51,0.15)", border: "1px solid rgba(244,210,51,0.35)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#F4D233" }} />
              <span className="text-[#F4D233] font-black text-[11px] uppercase tracking-[0.15em]">
                {t("hero.badge")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-black text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", letterSpacing: "-0.02em" }}
            >
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 leading-relaxed mb-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", maxWidth: 520 }}>
              {t("hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#produits"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 font-black rounded-full px-8 py-3.5 shadow-lg"
                style={{ background: "#F4D233", color: "#1D5D2B", fontSize: "0.95rem" }}
              >
                {t("hero.ctaPrimary")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-bold rounded-full px-8 py-3.5 transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", fontSize: "0.95rem" }}
              >
                {t("hero.ctaSecondary")}
              </motion.a>
            </div>

            {/* Dot navigation */}
            <div className="flex items-center gap-3 mt-12">
              {HERO_PRODUCTS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Produit ${i + 1}`}
                  animate={{ width: i === current ? 32 : 8, backgroundColor: i === current ? "#F4D233" : "rgba(255,255,255,0.3)" }}
                  transition={{ duration: 0.4 }}
                  className="h-2 rounded-full border-none cursor-pointer"
                  style={{ padding: 0 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Product carousel */}
        <div className="flex-1 flex items-center justify-center pb-8 pr-8">
          <div className="relative w-full max-w-[520px] h-[clamp(440px,60vh,640px)] flex items-end justify-center">

            {/* Background glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "70%", height: "70%",
                top: "15%", left: "15%",
                background: p.bg,
                filter: "blur(60px)",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center z-10"
                style={{ width: "100%" }}
              >
                {/* Product card */}
                <div
                  className="relative rounded-[36px] overflow-hidden flex flex-col items-center"
                  style={{
                    width: "clamp(260px, 36vw, 360px)",
                    aspectRatio: "3/4",
                    background: p.bg,
                    boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Glossy sheen */}
                  <div className="absolute inset-0 pointer-events-none z-10" style={{
                    background: "linear-gradient(150deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)",
                  }} />

                  {/* Header badge */}
                  <div className="w-full px-4 pt-4 shrink-0 relative z-20">
                    <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-2"
                      style={{ background: `${p.accent}22`, border: `1px solid ${p.accent}44` }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
                      <span className="font-black text-[10px] uppercase tracking-widest" style={{ color: p.accent }}>
                        Bon Appétit
                      </span>
                    </div>
                    <p className="font-black text-sm leading-tight" style={{ color: p.accent }}>{p.name}</p>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-70" style={{ color: p.accent }}>{p.category}</span>
                  </div>

                  {/* Product image */}
                  <div className="flex-1 relative w-full flex items-center justify-center px-4 pb-4">
                    <motion.div
                      className="relative w-full h-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image
                        src={p.src}
                        alt={p.name}
                        fill
                        sizes="360px"
                        className="object-contain"
                        style={{ filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.5))", transform: "scale(1.05)" }}
                        priority={current === 0}
                        loading={current === 0 ? "eager" : "lazy"}
                        quality={80}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Product label below card */}
                <div className="mt-5 text-center">
                  <p className="text-white font-black text-xl">{p.name}</p>
                  <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "rgba(244,210,51,0.15)", color: "#F4D233" }}>
                    {p.category}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev/Next */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                onClick={() => setCurrent((c) => (c - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)" }}
                aria-label="Produit précédent"
              >
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                onClick={() => setCurrent((c) => (c + 1) % HERO_PRODUCTS.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)" }}
                aria-label="Produit suivant"
              >
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE ═══ */}
      <div className="lg:hidden flex flex-col" style={{ minHeight: "100svh", paddingTop: 64 }}>

        {/* Text */}
        <div className="flex-shrink-0 px-5 pt-8 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(244,210,51,0.15)", border: "1px solid rgba(244,210,51,0.3)" }}>
            <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#F4D233" }} />
            <span className="text-[#F4D233] font-black text-[10px] uppercase tracking-widest">{t("hero.badge")}</span>
          </div>
          <h1 className="font-black text-white leading-[1.1] mb-3" style={{ fontSize: "clamp(1.8rem, 8vw, 2.8rem)" }}>
            {t("hero.title")}
          </h1>
          <p className="text-white/75 text-sm leading-relaxed mb-5">{t("hero.subtitle")}</p>
          <div className="flex items-center gap-3">
            <a href="#produits"
              className="inline-flex items-center gap-2 font-black rounded-full px-5 py-2.5 text-sm"
              style={{ background: "#F4D233", color: "#1D5D2B" }}>
              {t("hero.ctaPrimary")}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#contact"
              className="font-bold text-sm rounded-full px-4 py-2.5"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>

        {/* Product image mobile */}
        <div className="flex-1 flex items-end justify-center pb-6 px-4 relative">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 80%, ${p.bg}55 0%, transparent 70%)`,
          }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
              style={{ width: "70vw", maxWidth: 300, aspectRatio: "3/4" }}
            >
              <div className="w-full h-full rounded-3xl flex flex-col items-center overflow-hidden"
                style={{ background: p.bg, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
                <div className="px-3 pt-3 w-full">
                  <p className="font-black text-xs" style={{ color: p.accent }}>{p.name}</p>
                </div>
                <div className="flex-1 relative w-full px-3 pb-3">
                  <Image src={p.src} alt={p.name} fill sizes="300px" className="object-contain"
                    style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))" }} loading="lazy" quality={75} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot nav mobile */}
        <div className="flex justify-center gap-2 pb-6">
          {HERO_PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Produit ${i + 1}`}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", transition: "all 0.3s", background: i === current ? "#F4D233" : "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
