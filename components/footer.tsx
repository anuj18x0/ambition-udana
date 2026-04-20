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
    <footer className="border-t border-border/60 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1a1a]">
                <span className="text-sm font-bold text-[#fafaf9] tracking-tight">
                  U
                </span>
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                Unada
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The modern platform for real-estate sales teams to sell properties
              faster with digital experiences.
            </p>
          </div>

          {/* Link Columns */}
          {links.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                {group.heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <span className="text-xs text-muted-foreground/60">
            © {currentYear} Unada. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
