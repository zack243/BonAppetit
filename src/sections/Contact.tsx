"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { initScrollReveal } from "@/lib/scrollReveal";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  useEffect(() => {
    if (!sectionRef.current) return;
    return initScrollReveal(sectionRef.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 5000);
  };

  const formT = t("contact.form") as Record<string, string>;

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 bg-white border border-[rgba(29,93,43,0.15)] text-[#222] placeholder:text-[#222]/40 focus:border-[#1D5D2B] focus:ring-2 focus:ring-[rgba(29,93,43,0.12)]";

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-28 overflow-hidden" style={{ background: "#FFF8EC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left info */}
          <div className="sr-left flex-shrink-0 lg:w-[400px]">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-black uppercase tracking-widest"
              style={{ background: "rgba(29,93,43,0.08)", color: "#1D5D2B" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1D5D2B" }} />
              {t("contact.badge") as string}
            </span>
            <h2 className="font-black text-[#222] leading-tight mb-4" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
              {t("contact.title") as string}
            </h2>
            <p className="text-[#222]/65 leading-relaxed mb-10" style={{ maxWidth: 380 }}>
              {t("contact.subtitle") as string}
            </p>

            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                  label: "Téléphone", value: "+243 000 000 000",
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  label: "Email", value: "contact@bonappetit.cd",
                },
                {
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                  label: "Localisation", value: "Kinshasa, RDC",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(29,93,43,0.06)", border: "1px solid rgba(29,93,43,0.1)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "#1D5D2B", color: "#F4D233" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#222]/50 font-medium mb-0.5">{item.label}</p>
                    <p className="text-sm text-[#222] font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="sr flex-1 w-full">
            <div
              className="rounded-3xl p-6 sm:p-8 shadow-xl"
              style={{ background: "#fff", border: "1.5px solid rgba(29,93,43,0.1)" }}
            >
              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: "rgba(29,93,43,0.1)" }}>
                    ✅
                  </div>
                  <p className="font-black text-[#1D5D2B] text-xl">{formT.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-[#1D5D2B] uppercase tracking-widest">
                        {formT.name}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={formT.namePlaceholder}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-[#1D5D2B] uppercase tracking-widest">
                        {formT.phone}
                      </label>
                      <input
                        type="tel"
                        placeholder={formT.phonePlaceholder}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-[#1D5D2B] uppercase tracking-widest">
                      {formT.email}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={formT.emailPlaceholder}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-[#1D5D2B] uppercase tracking-widest">
                      {formT.message}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={formT.messagePlaceholder}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={inputClass}
                      style={{ resize: "none" }}
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-[#D92525] text-sm font-medium">{formT.error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={state === "sending"}
                    whileHover={{ scale: state === "sending" ? 1 : 1.02 }}
                    whileTap={{ scale: state === "sending" ? 1 : 0.97 }}
                    className="w-full flex items-center justify-center gap-2 font-black py-3.5 rounded-xl text-sm transition-all"
                    style={{
                      background: state === "sending" ? "rgba(29,93,43,0.5)" : "#1D5D2B",
                      color: "#F4D233",
                      cursor: state === "sending" ? "not-allowed" : "pointer",
                    }}
                  >
                    {state === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        {formT.sending}
                      </>
                    ) : (
                      <>
                        {formT.submit}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
