"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const VIDEOS = [
  { id: "pdrkhs9fQCc", title: "Recette Poulet & Mayonnaise Bon Appétit",        cat: "Sauce"  },
  { id: "kdd3S9gJftk", title: "Recette Frites Maison Dorées",                   cat: "Sauce"  },
  { id: "_-H9_7o4Aps", title: "Petit-déjeuner Familial au Lait Bon Appétit",    cat: "Lait"   },
  { id: "KXcGOpl3Qnk", title: "Recette Makayabu Mijoté",                        cat: "Mer"    },
  { id: "ztNIgeqJor4", title: "Spaghetti Bon Appétit",                          cat: "Pâtes"  },
  { id: "QULG3Ja-DH4", title: "Burger & Ketchup Maison",                        cat: "Sauce"  },
];

function VideoCard({ video, index }: { video: typeof VIDEOS[0]; index: number }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <motion.div
      className={`sr sr-d${(index % 5) + 1} group relative rounded-2xl overflow-hidden cursor-pointer`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: "#fff",
        boxShadow: "0 4px 24px rgba(29,93,43,0.10)",
        border: "1.5px solid rgba(29,93,43,0.07)",
      }}
    >
      {/* Thumbnail / Player */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <>
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Lire ${video.title}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-full shadow-2xl"
                style={{ width: 60, height: 60, background: "#F4D233" }}
              >
                <svg className="w-6 h-6 ml-1" fill="#1D5D2B" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </button>

            {/* Category pill */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{ background: "#F4D233", color: "#1D5D2B" }}>
              {video.cat}
            </div>

            {/* YouTube logo */}
            <div className="absolute top-3 right-3 opacity-80">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="font-black text-[#1a1a1a] text-sm leading-tight mb-3 group-hover:text-[#1D5D2B] transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] text-[#222]/50 font-medium">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </span>
          <button
            onClick={() => setPlaying(true)}
            className="inline-flex items-center gap-1 text-xs font-black transition-all group-hover:gap-2"
            style={{ color: "#1D5D2B" }}
          >
            Voir la recette
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Recipes() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

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

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
