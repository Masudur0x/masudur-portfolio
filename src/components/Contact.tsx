"use client";

import { Section, SectionHeading, SectionSubheading } from "./Section";
import { FaYoutube, FaLinkedinIn, FaGithub, FaEnvelope, FaFacebookF, FaWhatsapp, FaPeopleGroup } from "react-icons/fa6";

const socials = [
  { href: "https://www.youtube.com/@IamMasudurRahman", icon: FaYoutube, label: "YouTube", color: "#FF0000" },
  { href: "https://linkedin.com/in/masudur-rahman0a", icon: FaLinkedinIn, label: "LinkedIn", color: "#0A66C2" },
  { href: "https://web.facebook.com/masudurrahmanai", icon: FaFacebookF, label: "Facebook", color: "#1877F2" },
  { href: "https://web.facebook.com/share/g/1HLfiAUTxF/", icon: FaPeopleGroup, label: "Community", color: "#1877F2" },

  { href: "https://wa.link/cnj2nn", icon: FaWhatsapp, label: "WhatsApp", color: "#25D366" },
  { href: "https://github.com/masudur", icon: FaGithub, label: "GitHub", color: "#8B5CF6" },
  { href: "mailto:masudurrahman0e@gmail.com", icon: FaEnvelope, label: "Email", color: "#14B8A6" },
];

export function Contact() {
  return (
    <Section id="contact" className="bg-bg-card/30 section-glow">
      <div className="mx-auto max-w-4xl">
        <SectionHeading>Let&apos;s Build Something Together</SectionHeading>
        <p className="mb-12 max-w-2xl text-lg text-text-muted">
          Got a business process that needs automating? An AI idea you want to
          bring to life? Let&apos;s talk.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        {/* Contact form */}
        <form
          action="https://formspree.io/f/PLACEHOLDER"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="project" className="mb-1 block text-sm font-medium">
              Tell me about your project
            </label>
            <textarea
              id="project"
              name="message"
              rows={4}
              required
              className="w-full resize-none rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              placeholder="What do you want to automate?"
            />
          </div>
          <div>
            <label htmlFor="budget" className="mb-1 block text-sm font-medium">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            >
              <option value="">Select a range</option>
              <option value="<1k">Under $1,000</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k+">$10,000+</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-amber py-3 font-medium text-bg transition-colors hover:bg-amber-dark"
          >
            Send Message
          </button>
        </form>

        {/* Right side info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Prefer a call?</h3>
            <p className="mb-4 text-text-muted">
              Book a free 15-minute discovery call to discuss your project.
            </p>
            <a
              href="https://calendar.app.google/u8anzw3Wr3MC3WTX6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-teal px-6 py-3 font-medium text-teal transition-colors hover:bg-teal hover:text-bg"
            >
              Book a Call
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Find me online</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-card text-text-muted transition-all hover:border-teal hover:text-teal"
                >
                  <social.icon size={20} style={{ color: social.color }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
