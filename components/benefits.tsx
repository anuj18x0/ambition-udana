"use client";

import { useEffect, useRef } from "react";

const benefits = [
  {
    number: "01",
    title: "Close deals before construction completes",
    description:
      "Buyers experience finished units through immersive visualization, building confidence to purchase off-plan without hesitation.",
  },
  {
    number: "02",
    title: "Reduce sales cycle by 60%",
    description:
      "Interactive tools let prospects self-qualify, compare options, and shortlist — so your team only engages high-intent buyers.",
  },
  {
    number: "03",
    title: "Eliminate expensive physical showrooms",
    description:
      "Replace costly model apartments with digital experiences that are always available, easily updated, and infinitely scalable.",
  },
  {
    number: "04",
    title: "Data-driven insights for every interaction",
    description:
      "Understand which units get the most views, where buyers spend time, and what drives decisions — then optimize accordingly.",
  },
];

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = el.querySelectorAll("[data-animate]");
            targets.forEach((child, i) => {
              (child as HTMLElement).style.opacity = "0";
              setTimeout(() => {
                child.classList.add("animate-fade-in-up");
              }, i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-white" id="benefits">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl" data-animate>
          <div className="section-divider mb-6" />
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Built for results,
            <br />
            not just impressions.
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid gap-0 border-t border-border/60 md:grid-cols-2">
          {benefits.map((item, i) => (
            <div
              key={item.number}
              data-animate
              className={`group border-b border-border/60 py-10 pr-8 transition-colors duration-500 ${
                i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"
              }`}
            >
              <span className="text-xs font-medium text-muted-foreground/50 tracking-widest">
                {item.number}
              </span>

              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
