# Masudur Rahman — Portfolio

Next.js 16 portfolio for Masudur Rahman (CTO, Wicflow). Bilingual (English / Bangla) with a live AI chat widget (OpenRouter), a live voice agent (Retell), a WhatsApp shortcut, and a contact form that emails leads via Resend.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript, Tailwind CSS v4
- next-intl (i18n: `/en`, `/bn`)
- next-themes (light / dark / system)
- framer-motion (animations)
- OpenRouter (chat — `gpt-4o-mini`)
- Retell (voice agent + post-call webhook to n8n)
- Resend (lead-form email delivery)

## Run locally

```bash
npm install
cp .env.example .env.local        # fill in the values below
npm run dev                       # http://localhost:3000  → redirects to /en
```

Other scripts:

```bash
npm run lint    # ESLint
npm run build   # production build
npm run start   # serve the production build
```

## Environment variables

Create `.env.local` (and mirror these in your Vercel project under **Settings → Environment Variables**). All are required for full functionality; the site will boot without them but the corresponding feature will be disabled.

| Name                  | Used by                         | What it is                                                                                          |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| `OPENROUTER_API_KEY`  | `/api/chat`                     | OpenRouter API key. The chat widget streams responses through OpenRouter using `gpt-4o-mini`.       |
| `RETELL_API_KEY`      | `/api/voice/token`              | Retell server-side API key used to mint per-call web tokens for the in-browser voice widget.        |
| `RETELL_AGENT_ID`     | `/api/voice/token`              | The Retell agent ID for Masudur's voice receptionist. The current LLM ID is `llm_5dfc29db3a3d44bd2049d30f3659`. |
| `RESEND_API_KEY`      | `/api/lead`                     | Resend API key for delivering contact-form leads by email.                                          |
| `LEAD_FROM_EMAIL`     | `/api/lead`                     | Verified sender address registered with Resend (e.g. `leads@yourdomain.com`).                       |
| `LEAD_TO_EMAIL`       | `/api/lead`                     | Inbox that receives lead notifications. Currently `masudurrahman0x@gmail.com`.                      |
| `NEXT_PUBLIC_SITE_URL`| Metadata, OG tags               | Canonical site URL (e.g. `https://masudur.dev`). Used for absolute URLs in metadata.                |

### Example `.env.local`

```bash
OPENROUTER_API_KEY=sk-or-v1-...
RETELL_API_KEY=key_...
RETELL_AGENT_ID=agent_...
RESEND_API_KEY=re_...
LEAD_FROM_EMAIL=leads@yourdomain.com
LEAD_TO_EMAIL=masudurrahman0x@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project layout

```
src/
├── app/
│   ├── [locale]/         # locale-scoped routes (/en, /bn)
│   ├── api/              # /api/chat, /api/lead, /api/voice/token
│   └── globals.css
├── components/           # Hero, About, Services, Projects, ContactHub, ChatWidget, VoiceWidget, …
├── i18n/                 # next-intl routing + request config
├── lib/persona.ts        # SINGLE source of truth for site copy + AI system prompts
├── locales/{en,bn}.json  # all UI strings (Bangla copy needs native review)
├── styles/tokens.css     # design tokens (light + dark palette)
└── proxy.ts              # Next 16 middleware (locale routing)
```

`PERSONA` in `src/lib/persona.ts` is the canonical source for the chat system prompt, the Retell `general_prompt`, and any rendered copy that isn't translated. Update it there, not in components.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the repo in Vercel.
3. Set all seven env vars above under **Project → Settings → Environment Variables** for **Production**, **Preview**, and **Development** as needed.
4. Vercel auto-detects Next.js 16 — no build settings needed.
5. After first deploy, set `NEXT_PUBLIC_SITE_URL` to the production domain and redeploy so OG/metadata picks it up.

## Outstanding items (not bugs — deferred work)

- Bangla copy in `src/locales/bn.json` is machine-translated. A native Bangladeshi-Bangla pass is pending — see `_meta._TODO_BN_REVIEW` in the file.
- Retell agent's `book_meeting` and `send_service_brochure` tools are intentionally **not wired**. Add them via Retell REST `PATCH /update-retell-llm/llm_5dfc29db3a3d44bd2049d30f3659` once the n8n booking webhook URL is available.
- Calendar (Calendly/Cal.com) link refresh is pending end-of-project.

## Plan / status

The full upgrade plan and tick-mark checklist is in `PLAN.md` (mirrored at `~/.claude/plans/first-make-the-file-floating-robin.md`). Read the relevant phase's `### Resume Prompt for Next Session` block before continuing work in a new agent session.
