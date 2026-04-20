"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Magnetic button hook
function useMagnet(strength = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
}

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const magnet = useMagnet(0.25);

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20" id="cta">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.99 }}
          animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#1a1a1a] px-8 py-20 sm:px-16 lg:px-24 lg:py-24"
        >
          {/* Subtle grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative radial glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-[0.06]"
            style={{
              background:
                "radial-gradient(circle, #ffffff 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#fafaf9] sm:text-4xl lg:text-[2.75rem]">
                Ready to transform
                <br />
                how you sell property?
              </h2>

              <p className="mt-5 text-base leading-relaxed text-[#a3a3a3] sm:text-lg">
                Join 140+ developers and sales teams already using Unada to
                close deals faster.
              </p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  "SOC 2 Compliant",
                  "GDPR Ready",
                  "24/7 Support",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 text-xs text-[#6b6b6b]"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5.5" stroke="#4b4b4b" />
                      <path
                        d="M3.5 6l1.8 1.8 3.2-3.2"
                        stroke="#4b4b4b"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Magnetic CTA */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 lg:items-end"
            >
              {/* Magnetic wrapper */}
              <div
                ref={magnet.ref}
                onMouseMove={magnet.handleMouseMove}
                onMouseLeave={magnet.handleMouseLeave}
                className="inline-block"
              >
                <motion.div style={{ x: magnet.springX, y: magnet.springY }}>
                  <Button
                    className="group h-14 rounded-full bg-[#fafaf9] px-10 text-sm font-semibold text-[#1a1a1a] btn-premium hover:bg-white cursor-pointer shadow-[0_4px_24px_rgba(255,255,255,0.1)]"
                    id="cta-book-demo"
                  >
                    Book a demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>

              <span className="text-xs text-[#6b6b6b] lg:text-right">
                Free walkthrough · No commitment · Set up in minutes
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
