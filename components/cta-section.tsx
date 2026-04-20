"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";

function useMagnet(strength = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return { ref, springX, springY, onMove, onLeave };
}

export function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const [go, setGo] = useState(false);
  const mag = useMagnet(0.2);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 lg:py-36" id="cta">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.99 }}
          animate={go ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#1a1a1a] px-10 py-24 sm:px-20 lg:px-28 lg:py-28"
        >
          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
          />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={go ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#fafaf9] sm:text-5xl">
                Ready to transform
                <br />
                <span className="text-[#a3a3a3]">how you sell property?</span>
              </h2>

              <p className="mt-6 text-[1.05rem] font-light leading-[1.7] text-[#888888]">
                Join 140+ developers and sales teams already closing deals faster.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                {["SOC 2 Compliant", "GDPR Ready", "24/7 Support"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-xs font-light text-[#5a5a5a]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="#4b4b4b" /><path d="M3.5 6l1.8 1.8 3.2-3.2" stroke="#4b4b4b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={go ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 lg:items-end"
            >
              <div ref={mag.ref} onMouseMove={mag.onMove} onMouseLeave={mag.onLeave} className="inline-block">
                <motion.div style={{ x: mag.springX, y: mag.springY }}>
                  <Button
                    className="group h-16 rounded-full bg-[#fafaf9] px-12 text-base font-semibold text-[#1a1a1a] shadow-[0_4px_32px_rgba(255,255,255,0.12)] btn-premium hover:bg-white cursor-pointer"
                    id="cta-book-demo"
                  >
                    Book a demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </motion.div>
              </div>
              <span className="text-[13px] font-light text-[#5a5a5a] lg:text-right">
                Free walkthrough · No commitment · Set up in minutes
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
