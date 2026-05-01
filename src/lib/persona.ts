// Single source of truth for everything Masudur-related on the site.
// UI components, the chatbot system prompt, and the Retell voice agent's
// general_prompt all derive from this object. Update here, not in components.

export interface PersonaService {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface PersonaProject {
  slug: string;
  title: string;
  client: string;
  industry: string;
  image: string;
  metric: string;
  metricValue: string;
  problem: string;
  solution: string;
  results: string[];
  tags: string[];
  featured?: boolean;
}

export interface PersonaFAQ {
  q: string;
  a: string;
}

export interface PersonaSocial {
  label: string;
  href: string;
  /** react-icons identifier from `react-icons/fa6` */
  icon:
    | "FaYoutube"
    | "FaLinkedinIn"
    | "FaGithub"
    | "FaEnvelope"
    | "FaFacebookF"
    | "FaWhatsapp"
    | "FaPeopleGroup";
}

export interface Persona {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  bio: {
    short: string;
    long: string;
  };
  location: string;
  remote: string;
  experienceYears: number;
  languages: string[];
  highlights: string[];
  stats: { value: string; label: string }[];
  currentlyAt: { name: string; location: string };

  services: PersonaService[];
  projects: PersonaProject[];

  pricing: {
    posture: string;
    discoveryCall: string;
    engagementModels: { id: string; title: string; summary: string }[];
    timeline: { normal: string; complex: string; bigger: string };
  };

  faqs: PersonaFAQ[];

  contact: {
    email: string;
    leadEmail: string;
    calendar: string;
    whatsapp: string;
  };

  socials: PersonaSocial[];
}

export const PERSONA: Persona = {
  name: "Masudur Rahman",
  shortName: "Masudur",
  role: "AI Automation Expert",
  tagline:
    "I help small/medium businesses and enterprises save time and money with voice AI, AI workflow automation, and custom-coded systems.",

  bio: {
    short:
      "AI Automation Expert building voice agents, n8n workflows, and Claude-Code engineered systems that replace repetitive work — for clients in Finland, Sweden, and beyond.",
    long: "I'm Masudur Rahman, CTO & Partner at Wicflow (Finland), working remotely from Bangladesh. For the last ~2 years I've shipped production AI systems that quietly handle thousands of tasks a day — voice agents that answer phones at 3am, n8n workflows that read and reply to email like a human, and bespoke automations written as real codebases (not duct-taped no-code). If it can be automated with AI, I've probably built a version of it.",
  },

  location: "Bangladesh",
  remote: "Remote — building for Wicflow (Finland)",
  experienceYears: 2,
  languages: ["English (fluent)", "Bangla (native, Bangladeshi dialect)"],

  highlights: [
    "CTO & Partner at Wicflow (Finland)",
    "Production AI systems processing thousands of tasks daily",
    "Clients across Finland, Sweden, and globally",
  ],

  stats: [
    { value: "50+", label: "Automations Built" },
    { value: "3+", label: "Countries Served" },
    { value: "1000+", label: "Hours Saved for Clients" },
  ],

  currentlyAt: { name: "Wicflow", location: "Finland" },

  services: [
    {
      id: "voice-ai",
      title: "Voice AI Agents (24/7 receptionist & sales)",
      description:
        "Retell and Vapi agents that book calls, qualify leads, and answer FAQs in your customers' language. Replaces a phone team — never sleeps, never has a bad day.",
      tags: ["Retell", "Vapi", "24/7 Agents"],
    },
    {
      id: "custom-automation",
      title: "Custom AI Automation (Claude-Code engineered)",
      description:
        "Bespoke automations written as real codebases — not just no-code. Fully owned by you, deployable to your own infrastructure, easy to extend as your business grows.",
      tags: ["Claude Code", "TypeScript", "Custom Build"],
    },
    {
      id: "n8n-make",
      title: "n8n / Make Workflow Systems",
      description:
        "Production-grade workflows that connect 100+ tools — CRM, email, billing, AI — and run unattended. From inbox triage to multi-step data pipelines.",
      tags: ["n8n", "Make.com", "API Integration"],
    },
    {
      id: "strategy",
      title: "AI Strategy & Build-with-You",
      description:
        "One sprint together: audit your ops, identify the 3 highest-ROI automations, build them, hand over docs. Walk out owning your stack — not renting it.",
      tags: ["Strategy", "ROI Analysis", "Hand-off"],
    },
  ],

  projects: [
    {
      slug: "scalling-school-email",
      title: "AI Email Automation",
      client: "Scalling School, Finland",
      industry: "Education / Online Business",
      image: "/images/project-gmail.png",
      metric: "Hours saved daily",
      metricValue: "3+",
      problem:
        "Spending hours manually reading, categorizing, and replying to emails. Important messages were getting buried.",
      solution:
        "Built an n8n workflow with AI email classification, knowledge base integration, conversation history tracking, and automated draft generation that sounds human.",
      results: [
        "Inbox fully organized automatically",
        "Human-sounding drafts ready to review and send",
        "Hours of daily email work eliminated",
      ],
      tags: ["n8n", "AI Classification", "Email Automation"],
      featured: true,
    },
    {
      slug: "hvac-quote-system",
      title: "Intelligent Quote System",
      client: "HVAC Company, Finland",
      industry: "HVAC / Manufacturing",
      image: "/images/project-outlook.png",
      metric: "Employee workload replaced",
      metricValue: "1",
      problem:
        "Complex email handling with attachments (images, PDFs, Excel, Word), pricing calculations, and parts catalog lookups taking up one full employee's time.",
      solution:
        "Designed a production n8n workflow handling multi-format attachments, custom pricing rules, parts catalog integration, calculation tools, and full conversation history.",
      results: [
        "Effectively replaced one employee's workload",
        "Handles complex attachments automatically",
        "Running in production, processing daily",
      ],
      tags: ["n8n", "Document Processing", "Production System"],
      featured: true,
    },
    {
      slug: "proflow-plumbing-voice-ai",
      title: "24/7 Voice Receptionist for a Plumbing Company",
      client: "ProFlow Plumbing",
      industry: "Home Services / Plumbing",
      image: "/images/ProFlow/project-proflow-n8n.png",
      metric: "Missed calls recovered",
      metricValue: "100%",
      problem:
        "Like most small plumbing businesses, ProFlow was losing real revenue every time the owner couldn't pick up — on a job, on another call, after hours. Every missed call was a customer calling the next plumber on Google.",
      solution:
        "Built a Retell voice AI receptionist with a Twilio failover: the company number rings the owner's phone for 15 seconds first; if he doesn't pick up, the call routes to the AI. The agent answers business questions from a knowledge base (pricing, service area, hours), and for bookings it calls an n8n workflow that checks the calendar in real time. If the requested slot is free it books and confirms; if not, it offers the 3 closest available times. On confirmation, n8n creates the calendar event, emails the owner, and updates the CRM.",
      results: [
        "Owner never loses a lead to an unanswered phone again",
        "Real-time availability check + booking in a single call",
        "Auto email-to-owner + CRM update on every booking",
      ],
      tags: ["Retell", "Twilio", "n8n", "Voice AI", "Booking"],
      featured: true,
    },
    {
      slug: "lead-intake-followup-engine",
      title: "Lead Intake & Personalized Follow-up Engine",
      client: "Service Business Owner",
      industry: "Sales / Lead Generation",
      image: "/images/Lead/lead-followup-engine.png",
      metric: "Hands-off follow-up touches per lead",
      metricValue: "4",
      problem:
        "Leads were coming in from websites and forms but slipping through the cracks. The owner didn't have time to write personal follow-ups, duplicates were polluting the CRM, and prospects were going cold while waiting for a response.",
      solution:
        "Built a 3-workflow n8n system. Workflow 1 (Intake): captures leads from any site or form, dedupes against the CRM, then an AI agent writes a 2-sentence personalized profile (name, company, interest, notes), pushes the row into a Google Sheet CRM, emails the owner, and confirms back to the prospect. Workflow 2 (Follow-up Engine): runs a 4-step cadence per lead — greeting on day 0, then day 1, day 3, and day 8 — each message AI-written so it reads like the owner typed it. If the lead replies at any step, follow-ups auto-pause until the owner re-enables them. After 4 unanswered touches, the sequence stops cleanly. Workflow 3 (Owner Actions): lets the owner manually trigger or reschedule a workflow on demand for any lead — full control without waiting for the next cron.",
      results: [
        "Zero leads lost to duplicates or slow response time",
        "4 personalized touches per lead, fully unattended",
        "Auto-pause on reply + manual override give the owner a real CRM, not a spreadsheet",
      ],
      tags: ["n8n", "AI Agent", "CRM", "Lead Nurture", "Sales Ops"],
      featured: true,
    },
    {
      slug: "claude-executive-assistant",
      title: "Claude-Powered Social Media Executive Assistant",
      client: "Solo Founder / Personal Brand",
      industry: "Content / Personal Branding",
      image: "/images/Executive-Assistant/exec-assistant-1.png",
      metric: "Platforms managed end-to-end",
      metricValue: "4",
      problem:
        "A busy founder needed to stay active on two Facebook pages, Instagram, and LinkedIn — but content research, post design, and scheduling were eating hours every week. Most AI tools spit out generic copy; nothing handled the full loop from idea to published post.",
      solution:
        "Built a Claude project that runs as a real executive assistant. The owner gives it a topic — or asks it to research what's currently trending in a niche (AI, video editing, anything) — and Claude returns a curated short-list to choose from. Once a topic is picked, it does a second deep-research pass, presents the angle, and asks how to format it: carousel or text + image. It generates the full post (visuals included), and on approval auto-publishes to both Facebook pages, Instagram, and LinkedIn. Same project also drafts YouTube video plans and generates banners.",
      results: [
        "Two-step research loop produces post-ready ideas without generic AI fluff",
        "Carousels, image posts, and YouTube banners generated in-flow",
        "One approval → auto-publishes to 4 social channels at once",
      ],
      tags: ["Claude", "Content Automation", "Social Media", "Multi-platform"],
      featured: true,
    },
  ],

  pricing: {
    posture:
      "Project-based. Final price depends on the project and is set on a free 30-minute discovery call. Standard payment is 50/50 — 50% to start, 50% on delivery. For fully managed engagements there's a one-time setup fee plus a small monthly amount.",
    discoveryCall:
      "Free 30-minute call — we figure out if automation will help, what the highest-ROI first build looks like, and a real price (no pitch deck, no pressure).",
    engagementModels: [
      {
        id: "fully-managed",
        title: "Fully managed",
        summary:
          "Masudur hosts everything, monitors it, and fixes anything that breaks. Client pays a setup fee plus a small monthly amount. Best for owners who don't want to think about the tech.",
      },
      {
        id: "build-and-handover",
        title: "Build and hand over",
        summary:
          "Masudur builds the system, delivers it, and the client owns hosting and maintenance from there on. Best for clients with their own IT team or who want full control.",
      },
      {
        id: "build-integrate-14day",
        title: "Build, integrate, and 14-day care",
        summary:
          "Masudur builds it, integrates it on the client's side, and watches it for 14 days after delivery. Anything that breaks in those 14 days he fixes free. After that, the client owns it. Best for businesses that want a clean handoff with a safety net.",
      },
    ],
    timeline: {
      normal: "around 3 days for a normal automation",
      complex: "7–10 days for a complex one (multi-step workflows, multiple integrations, voice agent with custom logic)",
      bigger:
        "Bigger projects get a real estimate on the discovery call instead of a guess up front. Most builds are done in under two weeks.",
    },
  },

  faqs: [
    {
      q: "What kind of automations do you actually build?",
      a: "Voice AI receptionists (especially for service businesses like plumbing, HVAC, dental, salons — so you never miss a call again). CRM automation including Go High Level and similar systems. Lead follow-up sequences, table and meeting booking automation, social media posting, Gmail and Outlook automation, WhatsApp bots, website chatbots, and end-to-end workflows that connect all your tools together. If you do something repetitive every day, it can probably be automated.",
    },
    {
      q: "How much does it cost — and how do payments work?",
      a: "Price depends on the project; you'll get a clear number on a free 30-minute call. Payment is split 50/50: you pay 50% when we start, the remaining 50% when the system is delivered and working. No surprise invoices, no hidden fees. For ongoing managed systems there's a one-time setup fee plus a small monthly amount.",
    },
    {
      q: "Which engagement model fits me?",
      a: "Three options. (1) Fully managed — Masudur hosts everything, monitors it, fixes anything that breaks; you pay setup + monthly and just use the benefit. (2) Build and hand over — he builds, delivers, you handle hosting and maintenance going forward. (3) Build, integrate, and 14-day care — he builds it, integrates it on your side, and watches it for 14 days after delivery; anything that breaks in those 14 days he fixes free, then you own it.",
    },
    {
      q: "How long does a project take?",
      a: "Depends on the project — a real estimate needs a quick call. As a guide: a normal automation is usually live in around 3 days. A complex one (multi-step workflow, multiple integrations, voice agent with custom logic) is typically 7–10 days. Most things are done in under two weeks. Bigger projects get a straight answer on the discovery call instead of a guess up front.",
    },
    {
      q: "Is my data and my customers' data safe?",
      a: "Privacy is the most important part. Your data stays in your accounts and your tools — Masudur doesn't keep copies. For voice and chat, providers are configured so call recordings and transcripts can be deleted on a schedule you choose. Sensitive details (customer info, payment data, internal docs) never go into a public AI without your explicit decision. Anything that touches a specific customer workflow is discussed directly on a call so the setup matches your privacy needs exactly.",
    },
    {
      q: "Do you build with no-code tools or real code?",
      a: "Both, depending on what fits. Simple to medium automations are built fast and cleanly with n8n, Make, Cal.com, Retell, or Vapi — same tools used by big production teams, easy to extend later. Complex or business-critical systems are built as real code (Claude-Code engineered TypeScript/Node), so they're fast, reliable, and not locked to any platform. You get the right tool for the job.",
    },
    {
      q: "I run a service business and miss calls — can a voice AI really replace that?",
      a: "Yes — this is one of Masudur's core builds. The voice agent answers 24/7, sounds natural, captures the customer's name, address, and what they need, and either books the job into your calendar or texts you the lead immediately. For plumbing, HVAC, electrical, dental, and similar businesses, every missed call is lost revenue — this is usually the highest-ROI automation he ships.",
    },
    {
      q: "How do we start?",
      a: "Book a free 30-minute discovery call. We talk through what's slowing your business down, Masudur tells you honestly whether automation will help and what it will cost, and you decide. No pitch deck, no pressure.",
    },
  ],

  contact: {
    email: "masudurrahman0e@gmail.com",
    leadEmail: "masudurrahman0x@gmail.com",
    calendar: "https://calendar.app.google/u8anzw3Wr3MC3WTX6",
    whatsapp: "https://wa.link/cnj2nn",
  },

  socials: [
    {
      label: "YouTube",
      href: "https://www.youtube.com/@IamMasudurRahman",
      icon: "FaYoutube",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/masudur-rahman0a",
      icon: "FaLinkedinIn",
    },
    {
      label: "Facebook",
      href: "https://web.facebook.com/masudurrahmanai",
      icon: "FaFacebookF",
    },
    {
      label: "Community",
      href: "https://web.facebook.com/share/g/1HLfiAUTxF/",
      icon: "FaPeopleGroup",
    },
    {
      label: "WhatsApp",
      href: "https://wa.link/cnj2nn",
      icon: "FaWhatsapp",
    },
    {
      label: "GitHub",
      href: "https://github.com/masudur",
      icon: "FaGithub",
    },
    {
      label: "Email",
      href: "mailto:masudurrahman0e@gmail.com",
      icon: "FaEnvelope",
    },
  ],

};
