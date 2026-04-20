"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

/* ── Animated counter ── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return count;
}

const stats = [
  { value: 32, suffix: "×", label: "Faster sales cycle", display: "3.2×" },
  { value: 89, suffix: "%", label: "Buyer engagement" },
  { value: 140, suffix: "+", label: "Projects launched" },
];

function Stat({
  value, suffix, display, label, started,
}: {
  value: number; suffix: string; display?: string; label: string; started: boolean;
}) {
  const n = useCountUp(value, 1800, started);
  const shown = display ? (started ? display : "0×") : `${n}${suffix}`;
  return (
    <div>
      <div className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
        {shown}
      </div>
      <div className="mt-1 text-[13px] font-normal text-muted-foreground/70">
        {label}
      </div>
    </div>
  );
}

/* ── Hero ── */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsGo, setStatsGo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  /* entry reveal */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll("[data-animate]").forEach((c, i) => {
      (c as HTMLElement).style.opacity = "0";
      setTimeout(() => c.classList.add("animate-fade-in-up"), 80 + i * 110);
    });
  }, []);

  /* stats trigger */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsGo(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-24 lg:pt-38 lg:pb-36"
      id="hero"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-28">

          {/* ── Left: Copy ── */}
          <div className="max-w-2xl">

            <h2
              data-animate
              className="text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-[5.5rem]"
            >
              Close unit
              <br />
              <span className="text-muted-foreground">before the keys exist.</span>
            </h2>

            <p
              data-animate
              className="mt-8 max-w-lg text-[1.05rem] font-light leading-[1.7] text-muted-foreground lg:text-lg"
            >
              AI visualization, immersive walkthroughs, and interactive sales
              tools — in one platform built to move real&nbsp;estate faster.
            </p>

            <div
              data-animate
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                className="group h-14 rounded-full bg-[#1a1a1a] px-9 text-[15px] font-semibold text-[#fafaf9] shadow-[0_2px_16px_rgba(0,0,0,0.12)] btn-premium hover:bg-[#2d2d2d] cursor-pointer"
                id="hero-cta-primary"
              >
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="ghost"
                className="h-14 rounded-full px-8 text-[15px] font-medium text-muted-foreground btn-premium hover:text-foreground cursor-pointer"
                id="hero-cta-secondary"
              >
                See how it works
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              data-animate
              className="mt-16 flex items-center gap-10 lg:gap-12"
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-10 lg:gap-12">
                  <Stat {...s} started={statsGo} />
                  {i < stats.length - 1 && (
                    <div className="h-10 w-px bg-border/60" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Visual ── */}
          <div data-animate className="relative">
            <motion.div
              style={{ y: imageY }}
              className="relative overflow-hidden rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.08)]"
            >
              <Image
                src="/hero-property.png"
                alt="Premium residential development aerial view"
                width={680}
                height={500}
                className="h-auto w-full object-cover"
                priority
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 rounded-xl bg-white/92 backdrop-blur-lg border border-white/50 px-5 py-3.5 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a1a]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fafaf9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-foreground">Live Sales Analytics</div>
                    <div className="text-[11px] text-muted-foreground">12 units sold this week</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
