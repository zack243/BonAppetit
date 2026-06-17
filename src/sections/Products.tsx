"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

const ALL_PRODUCTS = [
  // Sauces
  { id: "mayonnaise",   name: "Mayonnaise",         category: "sauces",  src: "/products/mayonnaise.png",   tag: "Sauces" },
  { id: "ketchup",      name: "Ketchup",             category: "sauces",  src: "/products/ketchup.png",      tag: "Sauces" },
  { id: "moutarde",     name: "Moutarde de Dijon",   category: "sauces",  src: "/products/moutarde.png",     tag: "Sauces" },
  // Dairy
  { id: "lait-400",     name: "Lait 400g",           category: "dairy",   src: "/products/lait-400.png",     tag: "Laitier" },
  { id: "lait-900",     name: "Lait 900g",           category: "dairy",   src: "/products/lait-900.png",     tag: "Laitier" },
  { id: "lait-1800",    name: "Lait 1.8kg",          category: "dairy",   src: "/products/lait-1800.png",    tag: "Laitier" },
  // Canned
  { id: "petits-pois",  name: "Petits Pois",         category: "canned",  src: "/products/can-1.png",        tag: "Conserve" },
  { id: "mais-doux",    name: "Maïs Doux",           category: "canned",  src: "/products/can-2.png",        tag: "Conserve" },
  { id: "pois-carotte", name: "Petits Pois & Carottes", category: "canned", src: "/products/can-3.png",      tag: "Conserve" },
  { id: "printaniere",  name: "Printanière de Légumes", category: "canned", src: "/products/can-4.png",      tag: "Conserve" },
  { id: "corned-beef",  name: "Corned Beef",         category: "canned",  src: "/products/corned-beef.png",  tag: "Conserve" },
  { id: "pilchards",    name: "Pilchards Tomate",    category: "canned",  src: "/products/pilchards.png",    tag: "Conserve" },
  { id: "pilchards-p",  name: "Pilchards Piment",    category: "canned",  src: "/products/pilchards-chilli.png", tag: "Conserve" },
  // Seafood
  { id: "makayabu",     name: "Makayabu",            category: "seafood", src: "/products/makayabu.png",     tag: "Mer" },
  // Pasta
  { id: "macaroni",     name: "Macaroni 500g",       category: "pasta",   src: "/products/macaroni.png",     tag: "Pâtes" },
  { id: "penne",        name: "Penne 500g",          category: "pasta",   src: "/products/penne.png",        tag: "Pâtes" },
  { id: "fusilli",      name: "Fusilli 500g",        category: "pasta",   src: "/products/fusilli.png",      tag: "Pâtes" },
  // Bakery
  { id: "levure",       name: "Levure Sèche",        category: "bakery",  src: "/products/levure.png",       tag: "Boulangerie" },
  // Sweets
  { id: "choco-duo",    name: "Choco Duo",           category: "sweets",  src: "/products/choco-duo.png",    tag: "Gourmandise" },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Sauces":     { bg: "#F4D233", text: "#1D5D2B" },
  "Laitier":    { bg: "#1D5D2B", text: "#F4D233" },
  "Conserve":   { bg: "#4F8F38", text: "#fff" },
  "Mer":        { bg: "#0ea5e9", text: "#fff" },
  "Pâtes":      { bg: "#F59E0B", text: "#1D5D2B" },
  "Boulangerie":{ bg: "#D92525", text: "#fff" },
  "Gourmandise":{ bg: "#a855f7", text: "#fff" },
};

export default function Products() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  const tabs = [
    { key: "all",     label: t("products.tabs.all") },
    { key: "sauces",  label: t("products.tabs.sauces") },
    { key: "dairy",   label: t("products.tabs.dairy") },
    { key: "canned",  label: t("products.tabs.canned") },
    { key: "pasta",   label: t("products.tabs.pasta") },
    { key: "seafood", label: t("products.tabs.seafood") },
    { key: "bakery",  label: t("products.tabs.bakery") },
    { key: "sweets",  label: t("products.tabs.sweets") },
  ];

  const filtered = activeTab === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section id="produits" ref={sectionRef} className="bg-white overflow-hidden py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(29,93,43,0.08)", color: "#1D5D2B" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1D5D2B" }} />
            {t("products.badge")}
          </span>
          <h2 className="font-black text-[#222] leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {t("products.title")}
          </h2>
          <p className="text-[#222]/60 max-w-lg mx-auto">{t("products.subtitle")}</p>
        </div>

        {/* Tabs */}
        <div className="sr sr-d1 flex gap-2 flex-wrap justify-center mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-300"
              style={
                activeTab === tab.key
                  ? { background: "#1D5D2B", color: "#F4D233", boxShadow: "0 4px 16px rgba(29,93,43,0.25)" }
                  : { background: "rgba(29,93,43,0.07)", color: "#1D5D2B" }
              }
            >
              {tab.label as string}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6"
          >
            {filtered.map((product, i) => {
              const tagColor = TAG_COLORS[product.tag] ?? { bg: "#1D5D2B", text: "#fff" };
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col cursor-pointer"
                  style={{ borderRadius: 24 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Card shell */}
                  <div className="relative flex flex-col overflow-hidden h-full transition-all duration-300"
                    style={{
                      borderRadius: 24,
                      background: "#fff",
                      border: "1.5px solid rgba(29,93,43,0.07)",
                      boxShadow: "0 4px 20px rgba(29,93,43,0.08)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 48px ${tagColor.bg}44, 0 4px 16px rgba(0,0,0,0.08)`;
                      (e.currentTarget as HTMLElement).style.borderColor = tagColor.bg;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(29,93,43,0.08)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(29,93,43,0.07)";
                    }}
                  >
                    {/* Image area with colored bg */}
                    <div className="relative overflow-hidden flex items-center justify-center"
                      style={{
                        height: "clamp(140px, 19vw, 210px)",
                        background: `linear-gradient(145deg, ${tagColor.bg}18 0%, ${tagColor.bg}08 100%)`,
                        borderRadius: "22px 22px 0 0",
                      }}>
                      {/* Subtle radial glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 60%, ${tagColor.bg}30 0%, transparent 70%)` }}
                      />
                      <Image
                        src={product.src}
                        alt={product.name}
                        fill
                        sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 220px"
                        quality={75}
                        loading="lazy"
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.12] p-3"
                        style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.22))" }}
                      />
                    </div>

                    {/* Bottom content */}
                    <div className="flex flex-col items-center text-center px-3 pt-3 pb-4 gap-2">
                      {/* Tag badge */}
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: tagColor.bg, color: tagColor.text }}>
                        {product.tag}
                      </span>
                      <h3 className="font-black text-[#1a1a1a] text-sm leading-tight">{product.name}</h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-black transition-all duration-300 group-hover:gap-2"
                        style={{ color: "#1D5D2B" }}>
                        {t("products.discover") as string}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <div className="sr sr-d2 text-center mt-12">
          <motion.a
            href="#categories"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
            style={{ border: "2px solid rgba(29,93,43,0.2)", color: "#1D5D2B" }}
          >
            {t("products.viewAll") as string}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
