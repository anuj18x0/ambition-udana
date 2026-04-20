export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      heading: "Product",
      items: [
        { label: "Interactive Sales Suite", href: "#" },
        { label: "Immersive Experiences", href: "#" },
        { label: "AI Visualization", href: "#" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      heading: "Company",
      items: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      heading: "Resources",
      items: [
        { label: "Documentation", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a1a1a]">
                <span className="text-sm font-bold text-[#fafaf9] tracking-tight">U</span>
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                Unada
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              The modern platform for real-estate sales teams to close
              properties faster with immersive digital experiences.
            </p>
          </div>

          {/* Links */}
          {links.map((g) => (
            <div key={g.heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
                {g.heading}
              </h4>
              <ul className="mt-5 space-y-3.5">
                {g.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm font-light text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <span className="text-xs font-light text-muted-foreground/50">
            © {currentYear} Unada. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs font-light text-muted-foreground/50 transition-colors duration-300 hover:text-foreground"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
