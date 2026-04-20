"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const steps = [
  {
    id: "explore",
    label: "01 — Explore",
    heading: "Let buyers explore every detail",
    description:
      "Interactive 3D walkthroughs and detailed floor plans give prospects a complete picture of their future home — from any device, anywhere. Buyers navigate room-by-room, adjust viewpoints, and share favourites with family before committing.",
    tag: "Immersive Experiences",
    metric: "4.2 min",
    metricLabel: "Avg. session time",
    detail:
      "Buyers spend 4× longer in digital showrooms than with brochures — giving your team far more qualified conversations.",
  },
  {
    id: "customize",
    label: "02 — Customize",
    heading: "Personalize to buyer preferences",
    description:
      "AI-powered visualization adapts interiors, finishes, and furniture in real-time to match what each buyer envisions. No waiting for renders — changes happen instantly, on any device.",
    tag: "AI Visualization",
    metric: "78%",
    metricLabel: "Customization rate",
    detail:
      "When buyers see themselves in a space, purchase intent increases dramatically. Personalization closes the emotional gap between interest and commitment.",
  },
  {
    id: "convert",
    label: "03 — Convert",
    heading: "From interest to contract, seamlessly",
    description:
      "Integrated booking flows, availability maps, and live pricing turn engaged browsers into committed buyers — without leaving the experience. Less friction means faster decisions.",
    tag: "Sales Conversion",
    metric: "3.2×",
    metricLabel: "Faster close rate",
    detail:
      "Teams using the platform report a 60% reduction in time-to-offer and a 3.2× improvement in overall sales-cycle speed.",
  },
];

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setActiveStep(Math.min(Math.floor(p * steps.length), steps.length - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cur = steps[activeStep];

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36"
      id="showcase"
      style={{ minHeight: "260vh" }}
    >
      <div className="sticky top-28 mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            See the platform
            <br />
            <span className="text-muted-foreground">in action.</span>
          </h2>
          <p className="mt-6 text-[1.05rem] font-light leading-[1.7] text-muted-foreground max-w-lg">
            A unified experience — from first click to signed contract.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20 items-start"
        >
          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left rounded-2xl border px-6 py-6 transition-all duration-500 cursor-pointer group ${
                  i === activeStep
                    ? "border-foreground/8 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                    : "border-transparent hover:bg-white/60"
                }`}
              >
                <div
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 transition-colors duration-300 ${
                    i === activeStep ? "text-foreground" : "text-muted-foreground/35 group-hover:text-muted-foreground/55"
                  }`}
                >
                  {step.label}
                </div>
                <div
                  className={`text-base font-semibold leading-snug transition-colors duration-300 ${
                    i === activeStep ? "text-foreground" : "text-muted-foreground/50 group-hover:text-muted-foreground/70"
                  }`}
                >
                  {step.heading}
                </div>

                <AnimatePresence>
                  {i === activeStep && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      <p className="mt-4 text-xs font-light leading-relaxed text-muted-foreground/55 border-l-2 border-border/60 pl-4">
                        {step.detail}
                      </p>
                      <div className="mt-5 flex items-center gap-3">
                        <span className="text-2xl font-bold text-foreground">
                          {step.metric}
                        </span>
                        <span className="text-xs font-light text-muted-foreground">
                          {step.metricLabel}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Image — desktop only */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.08)]">
              <Image
                src="/platform-showcase.png"
                alt="Platform showcase"
                width={680}
                height={420}
                className="h-auto w-full object-cover"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-5 right-5 rounded-xl bg-white/95 backdrop-blur-lg border border-white/50 px-5 py-3.5 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{cur.tag}</span>
                  </div>
                  <div className="text-xl font-bold text-foreground leading-none">{cur.metric}</div>
                  <div className="text-[11px] font-light text-muted-foreground mt-0.5">{cur.metricLabel}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Dots */}
        <div className="mt-10 flex items-center gap-2.5">
          {steps.map((_, i) => (
            <button key={i} onClick={() => setActiveStep(i)} className="cursor-pointer" aria-label={`Step ${i + 1}`}>
              <motion.div
                animate={{ width: i === activeStep ? 24 : 6, backgroundColor: i === activeStep ? "#1a1a1a" : "#d4d4d4" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
