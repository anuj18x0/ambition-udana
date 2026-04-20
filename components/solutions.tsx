"use client";

import { useEffect, useRef } from "react";
import { Monitor, Layers3, BrainCircuit } from "lucide-react";
import { motion } from "motion/react";

const solutions = [
  {
    icon: Monitor,
    title: "Interactive Sales Suite",
    description:
      "A digital showroom that lets buyers explore, compare, and self-serve — so your team closes deals instead of giving tours.",
  },
  {
    icon: Layers3,
    title: "Immersive Experiences",
    description:
      "Photorealistic walkthroughs, 3D floor plans, and virtual staging that make off-plan properties feel tangible and desirable.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Visualization",
    description:
      "Generate styled interiors matched to buyer preferences. Produce marketing-ready assets in seconds, not weeks.",
  },
];

export function Solutions() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.querySelectorAll("[data-animate]").forEach((c, i) => {
            (c as HTMLElement).style.opacity = "0";
            setTimeout(() => c.classList.add("animate-fade-in-up"), i * 120);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 lg:py-36" id="solutions">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl" data-animate>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            One platform.
            <br />
            <span className="text-muted-foreground">Every tool to sell digitally.</span>
          </h2>
          <p className="mt-6 text-[1.05rem] font-light leading-[1.7] text-muted-foreground max-w-lg">
            Replace fragmented point solutions with a unified system
            built for how modern property sales actually work.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              data-animate
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl border border-border/50 bg-white p-10 transition-shadow duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f3f1] transition-all duration-400 group-hover:bg-[#1a1a1a] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <item.icon className="h-5 w-5 text-[#1a1a1a] transition-colors duration-400 group-hover:text-[#fafaf9]" />
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>

              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
