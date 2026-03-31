import { FaYoutube, FaLinkedinIn, FaGithub, FaEnvelope, FaFacebookF, FaWhatsapp, FaPeopleGroup } from "react-icons/fa6";

const socialLinks = [
  { href: "https://www.youtube.com/@IamMasudurRahman", icon: FaYoutube, label: "YouTube", color: "#FF0000" },
  { href: "https://linkedin.com/in/masudur-rahman0a", icon: FaLinkedinIn, label: "LinkedIn", color: "#0A66C2" },
  { href: "https://web.facebook.com/masudurrahmanai", icon: FaFacebookF, label: "Facebook", color: "#1877F2" },
  { href: "https://web.facebook.com/share/g/1HLfiAUTxF/", icon: FaPeopleGroup, label: "Community", color: "#1877F2" },

  { href: "https://github.com/masudur", icon: FaGithub, label: "GitHub", color: "#8B5CF6" },
  { href: "mailto:masudurrahman0e@gmail.com", icon: FaEnvelope, label: "Email", color: "#14B8A6" },
];

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

          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-teal"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-card text-text-muted transition-all hover:border-teal hover:text-teal"
              >
                <link.icon size={18} style={{ color: link.color }} />
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
