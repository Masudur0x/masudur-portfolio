"use client";

import { useState, FormEvent } from "react";
import { Section, SectionHeading } from "./Section";
import { socialLinks } from "@/lib/socials";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xwpkjpyn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" className="bg-bg-card/30 section-glow">
      <div className="mx-auto max-w-4xl">
        <SectionHeading>Let&apos;s Build Something Together</SectionHeading>
        <p className="mb-8 sm:mb-12 max-w-[55ch] text-base sm:text-lg text-text-muted leading-relaxed">
          Got a business process that needs automating? An AI idea you want to
          bring to life? Let&apos;s talk.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 sm:gap-12 md:grid-cols-2">
        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={status === "sending"}
              className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
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
              disabled={status === "sending"}
              className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="project"
              className="mb-1 block text-sm font-medium"
            >
              Tell me about your project
            </label>
            <textarea
              id="project"
              name="message"
              rows={4}
              required
              disabled={status === "sending"}
              className="w-full resize-none rounded-lg border border-border-card bg-bg px-4 py-3 text-text placeholder:text-text-muted/50 transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
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
              disabled={status === "sending"}
              className="w-full rounded-lg border border-border-card bg-bg px-4 py-3 text-text transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal disabled:opacity-50"
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
            disabled={status === "sending"}
            className="w-full rounded-lg bg-amber py-3 font-medium text-bg transition-all hover:bg-amber-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-teal">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Try again or reach out directly via
              WhatsApp.
            </p>
          )}
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
              className="inline-flex items-center justify-center rounded-lg border border-amber/40 bg-amber/10 px-6 py-3 font-medium text-amber transition-all hover:bg-amber/20 active:scale-[0.98]"
            >
              Book a Call
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Find me online</h3>
            <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-card text-text-muted transition-all hover:border-teal/40 hover:text-text active:scale-95"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
