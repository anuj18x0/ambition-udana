"use client";

import { useEffect, useRef } from "react";
import { Monitor, Layers3, BrainCircuit } from "lucide-react";

const solutions = [
  {
    icon: Monitor,
    title: "Interactive Sales Suite",
    description:
      "A digital showroom that lets buyers explore projects, compare units, and self-serve — while your team closes, not presents.",
  },
  {
    icon: Layers3,
    title: "Immersive Experiences",
    description:
      "Photorealistic walkthroughs, 3D floor plans, and virtual staging that make off-plan properties feel real and desirable.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Visualization",
    description:
      "Generate styled interiors, personalize unit views to buyer taste, and auto-produce marketing assets — in seconds.",
  },
];

export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animateTargets = el.querySelectorAll("[data-animate]");
            animateTargets.forEach((child, i) => {
              (child as HTMLElement).style.opacity = "0";
              setTimeout(() => {
                child.classList.add("animate-fade-in-up");
              }, i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20"
      id="solutions"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-2xl" data-animate>
          <div className="section-divider mb-6" />
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            One platform.
            <br />
            Every tool to sell real estate digitally.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Unada replaces fragmented point solutions with a single, unified
            platform built for how modern property sales actually work.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {solutions.map((item, i) => (
            <div
              key={item.title}
              data-animate
              className={`group relative rounded-2xl border border-border/60 bg-white p-8 transition-all duration-500 hover:border-border hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] delay-${
                (i + 1) * 100
              }`}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f3f1] transition-colors duration-300 group-hover:bg-[#1a1a1a]">
                <item.icon className="h-5 w-5 text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#fafaf9]" />
              </div>

              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
