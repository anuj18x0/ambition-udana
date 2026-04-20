"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const benefits = [
  {
    number: "01",
    title: "Close deals before construction completes",
    description:
      "Immersive visualization builds buyer confidence to commit off-plan — no finished unit required.",
  },
  {
    number: "02",
    title: "Reduce your sales cycle by 60%",
    description:
      "Self-serve tools let prospects qualify, compare, and shortlist — your team only engages high-intent buyers.",
  },
  {
    number: "03",
    title: "Eliminate expensive physical showrooms",
    description:
      "Replace model apartments with digital experiences — always available, easily updated, infinitely scalable.",
  },
  {
    number: "04",
    title: "Data-driven insights on every interaction",
    description:
      "See which units get the most views, where buyers linger, and what drives decisions — then optimize.",
  },
];

export function Benefits() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.querySelectorAll("[data-animate]").forEach((c, i) => {
            (c as HTMLElement).style.opacity = "0";
            setTimeout(() => c.classList.add("animate-fade-in-up"), i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 lg:py-36 bg-white" id="benefits">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Header */}
        <div className="max-w-2xl" data-animate>
          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Built for results,
            <br />
            <span className="text-muted-foreground">not just impressions.</span>
          </h2>
          <p className="mt-6 text-[1.05rem] font-light leading-[1.7] text-muted-foreground max-w-lg">
            Every feature exists to shorten your path from first view to signed contract.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-20 grid gap-0 border-t border-border/50 md:grid-cols-2">
          {benefits.map((item, i) => (
            <motion.div
              key={item.number}
              data-animate
              whileHover={{ backgroundColor: "rgba(243,243,241,0.5)" }}
              transition={{ duration: 0.4 }}
              className={`border-b border-border/50 px-4 py-12 pr-8 cursor-default ${
                i % 2 === 0 ? "md:border-r md:pr-14" : "md:pl-14"
              }`}
            >
              <span className="text-[11px] font-semibold text-muted-foreground/40 tracking-[0.2em] uppercase">
                {item.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-foreground">
                {item.title}
              </h3>

              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
