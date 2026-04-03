import { socialLinks } from "@/lib/socials";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-card bg-bg px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold font-[family-name:var(--font-heading)]">
              <span className="text-teal">M</span>asudur Rahman
            </p>
            <p className="mt-1 text-sm text-text-muted">
              CTO & Partner at Wicflow
            </p>
            <p className="text-sm text-text-muted">
              Finland | Working Globally
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
            {socialLinks
              .filter((l) => l.label !== "WhatsApp")
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-card text-text-muted transition-all hover:border-teal/40 hover:text-text active:scale-95 mx-auto sm:mx-0"
                >
                  <link.icon size={18} />
                </a>
              ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border-card pt-8 text-center">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Masudur Rahman. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
