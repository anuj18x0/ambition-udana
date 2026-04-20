"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";

// Animated counter hook
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const stats = [
  { value: 32, suffix: "×", label: "Faster sales cycle", display: "3.2×" },
  { value: 89, suffix: "%", label: "Buyer engagement" },
  { value: 140, suffix: "+", label: "Projects launched" },
];

function StatItem({
  value,
  suffix,
  display,
  label,
  started,
}: {
  value: number;
  suffix: string;
  display?: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1600, started);
  const shown = display ? (started ? display : "0×") : `${count}${suffix}`;
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight text-foreground">
        {shown}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  // Scroll-driven parallax on the hero image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Entry animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const children = el.querySelectorAll("[data-animate]");
    children.forEach((child, i) => {
      (child as HTMLElement).style.opacity = "0";
      setTimeout(() => {
        child.classList.add("animate-fade-in-up");
      }, 100 + i * 120);
    });
  }, []);

  // Stats counter trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
      id="hero"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <div data-animate className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Now with AI-powered visualization
              </span>
            </div>

            <h1
              data-animate
              className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[5rem]"
            >
              Sell properties
              <br />
              <span className="text-muted-foreground">before they're built.</span>
            </h1>

            <p
              data-animate
              className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed"
            >
              Unada gives real-estate teams interactive sales tools, immersive
              property experiences, and AI visualization — everything needed to
              close deals faster.
            </p>

            <div
              data-animate
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                className="group h-12 rounded-full bg-[#1a1a1a] px-7 text-sm font-medium text-[#fafaf9] btn-premium hover:bg-[#2d2d2d] cursor-pointer"
                id="hero-cta-primary"
              >
                Book a demo
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="ghost"
                className="h-12 rounded-full px-7 text-sm font-medium text-muted-foreground btn-premium hover:text-foreground cursor-pointer"
                id="hero-cta-secondary"
              >
                See how it works
              </Button>
            </div>

            {/* Animated stats */}
            <div
              ref={statsRef}
              data-animate
              className="mt-12 flex items-center gap-8"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  <StatItem {...stat} started={statsStarted} />
                  {i < stats.length - 1 && (
                    <div className="h-8 w-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Parallax Visual */}
          <div data-animate className="relative" ref={imageRef}>
            <motion.div
              style={{ y: imageY }}
              className="relative overflow-hidden rounded-2xl bg-[#f0efed] shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
            >
              <Image
                src="/hero-property.png"
                alt="Premium residential development aerial view"
                width={640}
                height={480}
                className="h-auto w-full object-cover"
                priority
              />
              {/* Floating metric card */}
              <div className="absolute bottom-5 left-5 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 px-4 py-3 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a1a1a]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fafaf9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">
                      Live Sales Analytics
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      12 units sold this week
                    </div>
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
