"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const PRODUCTS = [
  { src: "/products/mayonnaise.png",  name: "Mayonnaise",  size: "250ml", bg: "#F4D233", accent: "#1D5D2B" },
  { src: "/products/lait-1800.png",   name: "Lait 1.8kg",  size: "1.8kg", bg: "#1D5D2B", accent: "#F4D233" },
  { src: "/products/corned-beef.png", name: "Corned Beef", size: "340g",  bg: "#D92525", accent: "#fff"    },
];

const POS = [
  { x: -155, y: 0,   scale: 0.84, zIndex: 1, opacity: 0.88 },
  { x: 0,    y: -25, scale: 1,    zIndex: 3, opacity: 1    },
  { x: 155,  y: 0,   scale: 0.84, zIndex: 2, opacity: 0.88 },
];

const FLOATS = [
  { emoji: "🍅", size: 38, top: "14%", left: "7%",  delay: 0,   dur: 5   },
  { emoji: "🌿", size: 32, top: "72%", left: "4%",  delay: 1.4, dur: 6.5 },
  { emoji: "🐟", size: 42, top: "18%", left: "93%", delay: 0.6, dur: 5.5 },
  { emoji: "🍝", size: 36, top: "76%", left: "89%", delay: 2.0, dur: 7   },
  { emoji: "🌶️", size: 30, top: "50%", left: "97%", delay: 0.9, dur: 4.5 },
  { emoji: "🧅", size: 28, top: "42%", left: "2%",  delay: 2.3, dur: 6   },
];

export default function Hero() {
  const { t } = useLanguage();
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCardIndex((i) => (i + 1) % PRODUCTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[#1D5D2B]"
      style={{ height: "100dvh", minHeight: "580px", maxHeight: "960px" }}
      aria-label="Section heros Bon Appetit"
    >
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      {/* Floating ingredients */}
      {FLOATS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{ top: f.top, left: f.left, fontSize: f.size, lineHeight: 1 }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: f.dur, ease: "easeInOut", repeat: Infinity, delay: f.delay }}
        >
          {f.emoji}
        </motion.div>
      ))}

      {/* DESKTOP */}
      <div className="hidden lg:flex absolute inset-0" style={{ paddingTop: 64 }}>

        {/* LEFT 45% — Hero image */}
        <div className="relative shrink-0 overflow-hidden"
          style={{ width: "45%", height: "100%", display: "flex", alignItems: "flex-end", paddingLeft: "5%" }}>
          <div className="relative w-full h-full">
            <Image
              src="/hero.jpg"
              alt="Bon Appetit — Votre Cuisine Complete"
              fill
              priority
              fetchPriority="high"
              sizes="45vw"
              quality={80}
              className="object-contain"
              style={{ objectPosition: "bottom center" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,0,0,0.28) 0%, transparent 70%)" }}
            />
          </div>
        </div>

        {/* RIGHT 55% — 3 cards + CTA */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 pb-8" style={{ marginTop: 16 }}>

          {/* 3-card carousel */}
          <div className="relative flex items-end justify-center w-full max-w-[760px]"
            style={{ height: "clamp(300px, 40vh, 440px)" }}>
            {PRODUCTS.map((p, i) => {
              const posIdx = (i - cardIndex + PRODUCTS.length) % PRODUCTS.length;
              const pos = POS[posIdx];
              const isCenter = posIdx === 1;
              return (
                <motion.div
                  key={p.src}
                  animate={{ x: pos.x, y: pos.y, scale: pos.scale, opacity: pos.opacity }}
                  transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                  style={{ position: "absolute", bottom: 0, left: "calc(50% - 150px)", zIndex: pos.zIndex, transformOrigin: "bottom center" }}
                >
                  <motion.div
                    animate={{ y: isCenter ? [0, -8, 0] : [0, -4, 0] }}
                    transition={{ duration: isCenter ? 4 : 5, ease: "easeInOut", repeat: Infinity, delay: i * 0.4 }}
                  >
                    <div
                      onClick={() => setCardIndex(i)}
                      className="flex flex-col cursor-pointer relative"
                      style={{
                        width: isCenter ? 300 : 220,
                        aspectRatio: "3/4",
                        borderRadius: 32,
                        background: p.bg,
                        overflow: "hidden",
                        boxShadow: isCenter ? "0 24px 60px rgba(0,0,0,0.45)" : "0 12px 32px rgba(0,0,0,0.28)",
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, transparent 60%)", borderRadius: 30, zIndex: 2 }}
                      />
                      <div className="px-3 pt-3 shrink-0 relative z-10">
                        <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-1"
                          style={{ background: p.accent + "22" }}>
                          <div className="w-1 h-1 rounded-full" style={{ background: p.accent }} />
                          <span className="font-black text-[6px] uppercase tracking-widest" style={{ color: p.accent }}>Bon Appetit</span>
                        </div>
                        <p className="font-black leading-tight text-[10px]" style={{ color: p.accent }}>{p.name}</p>
                        <div className="mt-0.5 inline-flex items-center rounded-full px-1.5 py-0.5"
                          style={{ background: p.accent + "14" }}>
                          <span className="font-black text-[6px] uppercase tracking-widest" style={{ color: p.accent }}>{p.size}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-center px-2 pb-2 min-h-0 relative">
                        <div className="relative w-full h-full">
                          <Image
                            src={p.src}
                            alt={p.name}
                            fill
                            sizes={isCenter ? "300px" : "220px"}
                            className="object-contain"
                            quality={isCenter ? 80 : 70}
                            priority={i === 0}
                            loading={i === 0 ? "eager" : "lazy"}
                            style={{
                              filter: isCenter ? "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" : "none",
                              transform: isCenter ? "scale(1.05)" : "scale(1)",
                              transition: "transform 0.6s ease",
                              transformOrigin: "center 55%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 w-full max-w-[760px] justify-center">
            <motion.button
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
              onClick={() => setCardIndex((i) => (i - 1 + PRODUCTS.length) % PRODUCTS.length)}
              aria-label="Produit precedent"
              className="flex items-center justify-center rounded-full"
              style={{ width: 44, height: 44, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </motion.button>
            <div className="flex items-center gap-2">
              {PRODUCTS.map((_, i) => {
                const isActive = (i - cardIndex + PRODUCTS.length) % PRODUCTS.length === 1;
                return (
                  <motion.button
                    key={i}
                    onClick={() => setCardIndex(i)}
                    aria-label={"Produit " + (i + 1)}
                    animate={{ width: isActive ? 28 : 8, backgroundColor: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
                    transition={{ duration: 0.4 }}
                    className="h-2 rounded-full border-none cursor-pointer"
                    style={{ padding: 0, minWidth: 8 }}
                  />
                );
              })}
            </div>
            <motion.button
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
              onClick={() => setCardIndex((i) => (i + 1) % PRODUCTS.length)}
              aria-label="Produit suivant"
              className="flex items-center justify-center rounded-full"
              style={{ width: 44, height: 44, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </motion.button>
          </div>

          {/* Yellow CTA card */}
          <div className="w-full max-w-[620px]">
            <div style={{
              background: "#F4D233",
              borderRadius: 22,
              padding: "22px 28px",
              boxShadow: "0 12px 50px rgba(244,210,51,0.35), 0 4px 20px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3 w-fit"
                  style={{ background: "rgba(29,93,43,0.10)", border: "1px solid rgba(29,93,43,0.15)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#1D5D2B" }} />
                  <span className="font-black text-[8px] uppercase tracking-[0.12em]" style={{ color: "#1D5D2B" }}>
                    {t("hero.tagline") as string}
                  </span>
                </div>
                <h1 className="font-black leading-[1.15] mb-2" style={{ color: "#1D5D2B", fontSize: "clamp(1.2rem,2.2vw,1.75rem)" }}>
                  {t("hero.line1") as string}{" "}
                  <span>{t("hero.line2") as string}</span>
                </h1>
                <p className="leading-[1.55]" style={{ color: "rgba(29,93,43,0.80)", fontSize: "clamp(0.72rem,0.9vw,0.82rem)" }}>
                  {t("hero.subtitle") as string}
                </p>
              </div>
              <div className="flex flex-col gap-2.5 shrink-0">
                <motion.a
                  href="#produits"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 font-black rounded-full whitespace-nowrap"
                  style={{ background: "#1D5D2B", color: "#F4D233", fontSize: "0.84rem", padding: "11px 26px" }}
                >
                  {t("hero.ctaPrimary") as string}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <a href="#apropos"
                  className="inline-flex items-center justify-center whitespace-nowrap"
                  style={{ color: "rgba(29,93,43,0.70)", fontSize: "0.76rem" }}>
                  {t("hero.ctaSecondary") as string}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden flex flex-col" style={{ minHeight: "92svh", maxHeight: "720px", paddingTop: 60 }}>
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: "38%", maxHeight: "50%" }}>
          <Image src="/hero.jpg" alt="Bon Appetit" fill priority sizes="100vw" quality={75}
            className="object-contain" style={{ objectPosition: "bottom center" }} />
          <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(29,93,43,0.6), transparent)" }} />
        </div>

        <div className="shrink-0 px-4 pb-2" style={{ marginTop: -16, zIndex: 10, position: "relative" }}>
          <div className="w-full rounded-2xl px-4 py-3.5 flex flex-col gap-1.5"
            style={{ background: "#F4D233", boxShadow: "0 8px 32px rgba(244,210,51,0.35)" }}>
            <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 w-fit"
              style={{ background: "rgba(29,93,43,0.10)", border: "1px solid rgba(29,93,43,0.15)" }}>
              <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#1D5D2B" }} />
              <span className="font-black text-[7px] uppercase tracking-[0.12em]" style={{ color: "#1D5D2B" }}>
                {t("hero.tagline") as string}
              </span>
            </div>
            <h1 className="font-black leading-tight text-lg" style={{ color: "#1D5D2B" }}>
              {t("hero.line1") as string}{" "}{t("hero.line2") as string}
            </h1>
            <p className="text-[11px] leading-snug" style={{ color: "rgba(29,93,43,0.80)" }}>
              {t("hero.subtitle") as string}
            </p>
            <div className="flex items-center gap-3 mt-0.5">
              <a href="#produits" className="inline-flex items-center gap-1.5 px-4 py-2 font-black rounded-full text-xs"
                style={{ background: "#1D5D2B", color: "#F4D233" }}>
                {t("hero.ctaPrimary") as string}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#apropos" className="text-[11px]" style={{ color: "rgba(29,93,43,0.70)" }}>
                {t("hero.ctaSecondary") as string}
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-end justify-center gap-2.5 px-4 pb-2">
          {PRODUCTS.map((p, i) => {
            const isCenter = i === 1;
            return (
              <div key={i} onClick={() => setCardIndex(i)}
                style={{ width: isCenter ? "34%" : "28%", marginBottom: isCenter ? 8 : 0, cursor: "pointer" }}>
                <div className="flex flex-col"
                  style={{ aspectRatio: "3/4", borderRadius: 16, background: p.bg, overflow: "hidden",
                    boxShadow: isCenter ? "0 12px 32px rgba(0,0,0,0.4)" : "0 6px 18px rgba(0,0,0,0.25)" }}>
                  <div className="px-2 pt-2 shrink-0">
                    <p className="font-black leading-tight text-[8px]" style={{ color: p.accent }}>{p.name}</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-1 pb-1 min-h-0">
                    <div className="relative w-full h-full">
                      <Image src={p.src} alt={p.name} fill sizes="30vw" quality={70}
                        loading={isCenter ? "eager" : "lazy"} priority={isCenter}
                        className="object-contain"
                        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.45))" }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}