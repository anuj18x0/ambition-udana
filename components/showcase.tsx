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
      "Interactive 3D walkthroughs and detailed floor plans give prospects a complete picture of their future home — from any device, at any time. Buyers can navigate room-by-room, adjust viewpoints, and share their favourite units with family before committing.",
    tag: "Immersive Experiences",
    metric: "4.2 min",
    metricLabel: "Avg. session time",
    detail: "Buyers spend 4× longer in digital showrooms than traditional brochures — giving your sales team far more qualified conversations.",
  },
  {
    id: "customize",
    label: "02 — Customize",
    heading: "Personalize to buyer preferences",
    description:
      "AI-powered visualization adapts interiors, finishes, and furniture styles in real-time to match exactly what each individual buyer envisions. No waiting for renders — changes happen instantly, on any device.",
    tag: "AI Visualization",
    metric: "78%",
    metricLabel: "Customization rate",
    detail: "When buyers can see themselves in a space, purchase intent increases dramatically. Personalization closes the emotional gap between interest and commitment.",
  },
  {
    id: "convert",
    label: "03 — Convert",
    heading: "From interest to contract, seamlessly",
    description:
      "Integrated booking flows, availability maps, and live pricing tools turn engaged browsers into committed buyers — without ever leaving the immersive experience. Less friction means faster decisions.",
    tag: "Sales Conversion",
    metric: "3.2×",
    metricLabel: "Faster close rate",
    detail: "Teams using Unada report a 60% reduction in time-to-offer and a 3.2× improvement in overall sales-cycle speed across all project types.",
  },
];

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven step progression
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const step = Math.min(Math.floor(progress * steps.length), steps.length - 1);
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20"
      id="showcase"
      style={{ minHeight: "260vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-24 mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="section-divider mb-5" />
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            See the platform in action
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-lg">
            A unified experience — from discovery to signed contract.
          </p>
        </motion.div>

        {/* Main grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-start"
        >
          {/* LEFT — Step navigation */}
          <div className="space-y-2">
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left rounded-2xl border px-5 py-5 transition-all duration-500 cursor-pointer group ${
                  i === activeStep
                    ? "border-foreground/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                    : "border-transparent bg-transparent hover:bg-white/70"
                }`}
              >
                <div
                  className={`text-[11px] font-semibold uppercase tracking-widest mb-1.5 transition-colors duration-300 ${
                    i === activeStep
                      ? "text-foreground"
                      : "text-muted-foreground/40 group-hover:text-muted-foreground/60"
                  }`}
                >
                  {step.label}
                </div>
                <div
                  className={`text-[15px] font-medium leading-snug transition-colors duration-300 ${
                    i === activeStep
                      ? "text-foreground"
                      : "text-muted-foreground/60 group-hover:text-muted-foreground/80"
                  }`}
                >
                  {step.heading}
                </div>

                {/* Expanded content when active */}
                <AnimatePresence>
                  {i === activeStep && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground/60 border-l-2 border-border pl-3">
                        {step.detail}
                      </p>
                      {/* Metric inline */}
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-xl font-semibold text-foreground">
                          {step.metric}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {step.metricLabel}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* RIGHT — Image (hidden on mobile) */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl bg-[#f0efed] shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              <Image
                src="/platform-showcase.png"
                alt="Unada platform showcase"
                width={680}
                height={420}
                className="h-auto w-full object-cover"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />

              {/* Animated overlay badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + "-badge"}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-4 right-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 px-4 py-3 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                      {current.tag}
                    </span>
                  </div>
                  <div className="text-xl font-semibold text-foreground leading-none">
                    {current.metric}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {current.metricLabel}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Feature tags */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {["Works on any device", "No app downloads", "Real-time data"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-foreground/70 border border-white/60"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll dots */}
        <div className="mt-8 flex items-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="cursor-pointer"
              aria-label={`Go to step ${i + 1}`}
            >
              <motion.div
                animate={{
                  width: i === activeStep ? 20 : 5,
                  backgroundColor: i === activeStep ? "#1a1a1a" : "#d4d4d4",
                }}
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
