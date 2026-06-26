"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || isNaN(target)) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label, delay, started }: {
  value: string; suffix: string; label: string; delay: number; started: boolean;
}) {
  const num = parseInt(value, 10);
  const isNumeric = !isNaN(num);
  const count = useCountUp(isNumeric ? num : 0, 2000, started && isNumeric);

  return (
    <div
      className="flex flex-col items-center text-center p-8 rounded-2xl relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1.5px solid rgba(255,255,255,0.12)",
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

      <div className="relative z-10">
        <div className="font-black leading-none mb-2" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#A52520" }}>
          {isNumeric ? count.toLocaleString() : value}{suffix}
        </div>
        <p className="text-white/80 font-semibold text-sm uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cleanup = initScrollReveal(sectionRef.current);
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(sectionRef.current);
    return () => { cleanup(); obs.disconnect(); };
  }, []);

  const items = t("stats.items") as Array<{ value: string; suffix: string; label: string }>;

  return (
    <section id="chiffres" ref={sectionRef} className="py-20 lg:py-28 overflow-hidden" style={{ background: "#026D41" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sr text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(253,234,2,0.15)", color: "#FDEA02", border: "1px solid rgba(253,234,2,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FDEA02" }} />
            {t("stats.badge") as string}
          </span>
          <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {t("stats.title") as string}
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.isArray(items) && items.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 100}
              started={started}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
