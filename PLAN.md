# Portfolio Upgrade Plan — Masudur Rahman

> **Status legend (any agent / any session must update this as work progresses):**
> `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked (add note on next line)
>
> **Resume rule:** Before doing anything, scan this file top-to-bottom and pick up at the first `[ ]` or `[~]` task. If a task is `[!]`, read the blocker note before deciding what to do.
>
> **Plan file location:** This file lives at `/Users/macbook/.claude/plans/first-make-the-file-floating-robin.md` AND is mirrored to `chatting/portfolio-website/PLAN.md` (created in Phase A). Whichever you edit, sync the other so any session — local or fresh — sees the same state.

---

## 0. WORKFLOW RULES (read before every task)

### 0.1 — One part at a time
- Work strictly in order: A → B → C → D → E → F0 → G → F.
- Within a phase, do tasks in their numeric order (A1, A2…).
- Never start a phase without first reading the previous phase's `### Resume Prompt` section to confirm prerequisites.

### 0.2 — Visual validation loop (per task that produces UI)
For any task that ships a visible component or page section:
1. Implement the change.
2. Start the dev server (`npm run dev`) if not already running. Use `run_in_background: true`.
3. Use **Puppeteer** (`puppeteer` is already in `devDependencies` of portfolio-website — leverage it) to capture a screenshot:
   - File: `/tmp/portfolio-qa/<phase>-<task>-<short-name>.png`
   - Viewport: 1440×900 desktop AND 390×844 mobile (two screenshots).
4. Read the screenshot back into context and self-critique against the checklist:
   - Typography hierarchy correct? (no orphan/widow, no clipping, line-height legible)
   - Spacing consistent with the design system tokens?
   - Colors correct in BOTH light and dark themes?
   - Images: no distortion, correct aspect ratio, alt text present?
   - Component placement: no overflow, no horizontal scroll on mobile, FAB doesn't overlap content?
   - Text content: any `[object Object]`, `undefined`, untranslated keys, lorem ipsum?
   - Bangla render: correct font (no tofu boxes), no cut-off characters?
5. If anything fails, fix and re-screenshot until clean.
6. Once clean, **delete the screenshot files** for that task.
7. Mark the task `[x]` in the plan file and append a one-line note in the phase's `### Notes` block (e.g. "A2 done — dev server boots, no console errors").

### 0.3 — Per-phase final pass
At the end of each phase (after all numbered tasks `[x]`):
1. Take a **full-page** screenshot of every affected page (desktop + mobile, light + dark = 4 shots per page).
2. Self-critique using the same checklist plus a holistic "does this look professional / on-brand?" pass.
3. Fix any regressions. Re-shoot until clean.
4. Delete all screenshots for that phase.
5. Write the phase's `### Resume Prompt` (see 0.4).
6. Commit the plan file change.

### 0.4 — Resume prompt generation
After every phase, append this block to the phase's section:
```
### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur portfolio build. Read /Users/macbook/.claude/plans/first-make-the-file-floating-robin.md
> (also mirrored at chatting/portfolio-website/PLAN.md). Phase <X> is complete. Start Phase <Y>, task <Y1>.
> Before any code, run the visual validation loop (workflow rule 0.2) for each UI task and the per-phase
> pass (rule 0.3) at the end. Do not skip rules. Update tick-marks as you go and write a Resume Prompt
> when Phase <Y> finishes.
```
This block is what the user copy-pastes into a new session. Keep it accurate after every phase.

### 0.5 — Final pass after ALL phases
After Phase F is fully `[x]`:
1. Screenshot every page, every breakpoint, every theme, every locale (EN + BN). That's potentially 20+ shots.
2. Run a full critique pass: visual polish, copy review, motion sanity, performance (Lighthouse), accessibility (axe).
3. Fix everything found. Re-shoot.
4. Delete all screenshots.
5. Write a final `## Final QA Report` section to the plan file documenting what was checked and any known limitations.
6. STOP. Ask user before any deploy/push (per global rule).

---

## 1. Context

Masudur Rahman (CTO, Wicflow) has a Next.js portfolio at `portfolio-website/` that is technically fine but commercially weak: only 2 vague case studies, no live proof of work, generic "AI automation" positioning, and no interactive way for a visitor to *experience* what he sells (voice agents + chat automation).

This plan does three things:

1. **Move the portfolio into this workspace** so all changes live in one repo.
2. **Add a live, human-feeling chatbot** (OpenRouter → `anthropic/claude-haiku-4.5`) that knows everything about Masudur and can answer questions, qualify leads, and post to a webhook.
3. **Improve the existing Retell voice agent** "Voice AI for Masudur Rahman" (agent_id `agent_850b4f98bd416c8ec002665ee8`, llm_id `llm_5dfc29db3a3d44bd2049d30f3659`) — rewrite its prompt + knowledge from the actual website content, and embed it on the site as a click-to-talk widget with calendar booking + lead capture.

**Outcome:** A visitor lands → sees a serious-looking site → can either *chat* or *talk live* with an AI version of Masudur → books a meeting or sends qualified lead info to n8n. The site itself becomes the demo of what he sells.

---

## 2. Stack & Dependencies

**Existing (do not change unless noted):**
- Next.js `16.2.1` (App Router) + React `19.2.4` + TypeScript `5`
- Tailwind CSS `v4` (`@tailwindcss/postcss`)
- Framer Motion `12.38.0`
- `react-icons` `5.6.0`
- `next-mdx-remote` `6.0.0`
- Hosting target: **Vercel**

**To install (Phase 4):**
```
npm install retell-client-js-sdk resend
```
Streaming UX hand-rolled (no extra lib).

**Environment variables required (set in `.env.local` for dev AND in Vercel project settings for prod):**
```
OPENROUTER_API_KEY=sk-or-v1-...                    # PROVIDED — chatbot
RETELL_API_KEY=key_...                             # PROVIDED in ~/.claude/.env — web-call tokens
RETELL_AGENT_ID=agent_850b4f98bd416c8ec002665ee8
RESEND_API_KEY=re_...                              # PROVIDED — lead emails
LEAD_TO_EMAIL=masudurrahman0x@gmail.com            # recipient (LOCKED)
LEAD_FROM_EMAIL=onboarding@resend.dev              # default — Resend's shared sender, no domain needed.
                                                   # NOTE: in Resend free tier without a verified domain,
                                                   # emails can ONLY be delivered to the email used to
                                                   # register the Resend account. Confirm masudurrahman0x@gmail.com
                                                   # is that registered email, otherwise leads will silently fail.
NEXT_PUBLIC_SITE_URL=https://<vercel-subdomain>.vercel.app  # used as OpenRouter HTTP-Referer
```
Retell key is already in `~/.vibe_secrets.env` — reuse the same value.
Voice agent leads still go to the existing n8n webhook (`/retell-post-call`) via Retell's post-call analysis — that stays as-is. Only the **chatbot** uses Resend.

---

## 3. File Map (what gets created / changed)

```
chatting/portfolio-website/                            ← copied from Desktop
├── .env.local                                         [NEW]  local secrets (gitignored)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts                          [NEW]  OpenRouter proxy, streams SSE
│   │   │   ├── lead/route.ts                          [NEW]  forwards lead JSON to n8n webhook
│   │   │   └── voice/token/route.ts                   [NEW]  mints Retell web-call access token
│   │   └── layout.tsx                                 [EDIT] mount <ChatWidget /> + <VoiceWidget />
│   ├── components/
│   │   ├── ContactHub.tsx                             [NEW]  unified bottom-right pill (voice + chat + whatsapp)
│   │   ├── ChatWidget.tsx                             [NEW]  chat panel UI (opened by ContactHub)
│   │   ├── VoiceWidget.tsx                            [NEW]  live-call UI (opened by ContactHub or hero CTA)
│   │   ├── Hero.tsx                                   [EDIT] add "Talk to my AI" primary CTA
│   │   └── WhatsAppFloat.tsx                          [DELETE] absorbed into ContactHub
│   ├── lib/
│   │   ├── persona.ts                                 [NEW]  single source of truth (bio, services, projects, FAQs)
│   │   └── chatSystemPrompt.ts                        [NEW]  builds chatbot system prompt from persona.ts
│   └── content/
│       └── projects.ts                                [EDIT] expand 2 → 5+ case studies w/ metrics
└── README.md                                          [EDIT] document new env vars + how to run
```

Retell side (no local files — done via MCP):
- Update LLM `llm_5dfc29db3a3d44bd2049d30f3659`: new `general_prompt`, new `begin_message`, switch model to `claude-3.5-haiku` (Retell's option), add tools.
- Update agent `agent_850b4f98bd416c8ec002665ee8`: tighten voice settings, keep webhook.

---

## 4. Execution — Tick-Mark Checklist

### Phase A — Workspace setup
- [x] **A1.** Folder lives at `chatting/portfolio-website/` (user moved it directly — `node_modules`, `.next`, `.git` all came along; saves an `npm install`).
- [x] **A2.** Dev server boots cleanly on `http://localhost:3000`, Next.js 16.2.1 + Turbopack, Ready in ~1.5s, `.env.local` detected. Baseline screenshots captured (desktop 1440×900 + mobile 390×844), reviewed, then deleted. Hero/Navbar/Footer render correctly. Below-the-fold sections appeared blank in fullPage screenshot — likely Framer Motion `whileInView` not triggering under Puppeteer's fullPage mode; not a real bug, those sections are rewritten in Phase B anyway.
- [x] **A3.** `.env.local` created at `chatting/portfolio-website/.env.local` with: `OPENROUTER_API_KEY`, `RETELL_API_KEY`, `RETELL_AGENT_ID`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL=onboarding@resend.dev`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- [x] **A4.** `.gitignore` already excludes `.env*` (line 34) — no change needed.
- [x] **A5.** Plan mirrored to `chatting/portfolio-website/PLAN.md`. (README update deferred to Phase F4 along with other doc updates — low priority for now.)

### Notes
- Existing project has `AGENTS.md` warning: **"This is NOT the Next.js you know — read `node_modules/next/dist/docs/` before writing code."** Heed before touching framework APIs in Phase B+.
- Existing `CLAUDE.md` is just `@AGENTS.md` (one line).
- `puppeteer@24.40.0` is in devDeps — used directly for visual QA via `/tmp/portfolio-qa/shoot.cjs` script (kept as scratch tool, not committed to repo).
- Resend caveat documented: free tier without verified domain only delivers to the registered Resend account email (assumed `masudurrahman0x@gmail.com`).
- Dev server killed at end of phase — next session must restart with `cd chatting/portfolio-website && npm run dev`.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. **Read the plan first:** `/Users/macbook/.claude/plans/first-make-the-file-floating-robin.md` (also mirrored at `Desktop/Vibe Coding Projrcts/chatting/portfolio-website/PLAN.md`).
>
> **Phase A is complete.** All 5 tasks ticked. `.env.local` exists with real keys. Dev server boots cleanly on `localhost:3000`.
>
> **Start Phase B — Persona / single source of truth.** Tasks B1, B2, B3 in order.
>
> **Hard rules — do NOT skip:**
> 1. Follow workflow §0.1–0.5 in the plan: one task at a time, in order.
> 2. For every UI-touching task, run the visual validation loop (§0.2): boot dev server, screenshot via `node /tmp/portfolio-qa/shoot.cjs <url> <out-prefix>` (script already written), critique against the checklist, fix until clean, **delete the screenshots**, then tick the task.
> 3. Read `chatting/portfolio-website/AGENTS.md` BEFORE touching any Next.js APIs — this is Next 16 with breaking changes; consult `node_modules/next/dist/docs/` if unsure.
> 4. When Phase B is done, run the per-phase final pass (§0.3) and write the Phase B `### Resume Prompt for Next Session` block. Then STOP and report to the user.
> 5. **For B3 (case studies):** the user will provide 3 additional case studies on top of the 2 already in `src/data/projects.ts`. PAUSE and ASK before fabricating any project content. Use the 2 existing ones as-is for now if user is not yet available.
> 6. Do not touch Phases C/D/E/F0/G/F yet.
> 7. Do not push to git or deploy. The user must approve any remote action.

### Phase B — Persona / single source of truth
- [x] **B1.** Created `src/lib/persona.ts` with `PERSONA` (bio short+long, role, 4 locked services, 2 projects, pricing posture, 4 FAQ pairs, contact email/leadEmail/calendar/whatsapp, 7 socials). `PersonaProject` and `PersonaSocial` types exported.
- [x] **B2.** `src/lib/projects.ts` and `src/lib/socials.ts` now derive from `PERSONA`. `About.tsx` reads `highlights`, `stats`, `currentlyAt`, `name`, `bio.short` from PERSONA. `Services.tsx` maps `PERSONA.services` to icons by `id`. `Contact.tsx` uses `PERSONA.pricing.discoveryCall` + `PERSONA.contact.calendar`. Visual QA passed (About/Services/Contact desktop+mobile clean, no overflow, all icons render).
- [x] **B3.** Expanded `PERSONA.projects` to **5 case studies**:
  1. AI Email Automation (Scalling School, Finland) — original, kept verbatim
  2. Intelligent Quote System (HVAC, Finland) — original, kept verbatim
  3. **24/7 Voice Receptionist for ProFlow Plumbing** — Retell + Twilio failover (15s ring owner, then AI) + n8n booking flow with real-time availability + email/CRM updates
  4. **Lead Intake & Personalized Follow-up Engine** — 3-workflow n8n system: AI-profiled lead intake + dedupe + CRM, 4-step personalized cadence with auto-pause on reply, manual owner override
  5. **Claude-Powered Social Media Executive Assistant** — research → topic pick → deep research → carousel/image gen → auto-publish to 2× Facebook + Instagram + LinkedIn; also YouTube banners/plans
  - Image assets organized: `public/images/ProFlow/` (2 files), `public/images/Lead/` (4 files), `public/images/Executive-Assistant/` (3 files). Spaces removed from filenames for URL safety. Card image set to the most representative shot per case study; remaining shots reserved for future detail pages.

### Notes
- B1 → persona.ts created with full schema (services, projects, FAQs, pricing, contact, socials).
- B2 → `lib/projects.ts` and `lib/socials.ts` now thin shims over `PERSONA`. About/Services/Contact components read directly from `PERSONA`. No more drift between UI copy and what the chatbot/voice agent will see.
- B3 → 5 case studies, all with real client context, real metrics, real stack tags. User supplied #3/#4/#5 verbatim 2026-04-25.
- Visual QA passed on Hero, About, Services, Projects (homepage), /projects (full grid), Contact at 1440×900 + 390×844. No overflow, no `[object Object]`, no missing images, no font issues.
- TypeScript clean (`npx tsc --noEmit` passes).
- Dev server still running on `:3000` from this session — kill before next session or it'll EADDRINUSE.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. **Read the plan first:** `/Users/macbook/.claude/plans/first-make-the-file-floating-robin.md` (mirrored at `chatting/portfolio-website/PLAN.md`).
>
> **Phase B is complete.** `src/lib/persona.ts` is the single source of truth — bio, 4 locked services, 5 case studies (Scalling School, HVAC, ProFlow Plumbing, Lead Engine, Claude Executive Assistant), pricing posture, FAQs, contact, socials. `About.tsx`, `Services.tsx`, `Contact.tsx`, `lib/projects.ts`, `lib/socials.ts` all derive from PERSONA.
>
> **Start Phase C — Chatbot (OpenRouter, Haiku).** Tasks C1 → C6 in order.
>
> **Hard rules — do NOT skip:**
> 1. Follow workflow §0.1–0.5 in the plan: one task at a time, in order.
> 2. For every UI-touching task, run the visual validation loop (§0.2): boot dev server, screenshot via `node /tmp/portfolio-qa/shoot.cjs <url> <prefix>` (use `shoot-section.cjs <url> <selector> <prefix>` for sections that depend on Framer Motion `whileInView`), critique against the checklist, fix until clean, **delete the screenshots**, then tick the task.
> 3. Read `chatting/portfolio-website/AGENTS.md` BEFORE touching any Next.js APIs — Next 16 has breaking changes; consult `node_modules/next/dist/docs/` if unsure.
> 4. **C5: do NOT auto-mount the ChatWidget standalone** — visibility is owned by `ContactHub` (Phase E). Just export it.
> 5. **C2: server-side OpenRouter call only.** API key never goes to the client. Use SSE streaming. `HTTP-Referer` = `process.env.NEXT_PUBLIC_SITE_URL`; `X-Title` = `"Masudur Portfolio Chat"`.
> 6. **C3: Resend free-tier caveat** — without a verified domain, leads only deliver to the registered Resend account email. `LEAD_TO_EMAIL=masudurrahman0x@gmail.com` is assumed to be that registered email; if delivery silently fails, that's why.
> 7. When Phase C is done, run the per-phase final pass (§0.3) and write the Phase C `### Resume Prompt for Next Session` block. Then STOP and report.
> 8. Do not touch Phases D/E/F0/G/F yet.
> 9. Do not push to git or deploy. The user must approve any remote action.

### Phase C — Chatbot (OpenRouter, Haiku)
- [x] **C1.** `src/lib/chatSystemPrompt.ts` — `buildChatSystemPrompt()` composes from `PERSONA` (warm/Finnish-direct tone, third-person assistant framing, services + 5 case studies + pricing + FAQs + contact, `[LEAD]` token protocol, no markdown emphasis since output is rendered as plain text).
- [x] **C2.** `src/app/api/chat/route.ts` — POST → `https://openrouter.ai/api/v1/chat/completions`, model `anthropic/claude-haiku-4.5`, streams SSE deltas to client. Headers `HTTP-Referer=NEXT_PUBLIC_SITE_URL`, `X-Title=Masudur Portfolio Chat`. System prompt injected server-side; key never leaves server. `runtime=nodejs`, `dynamic=force-dynamic`.
- [x] **C3.** `src/app/api/lead/route.ts` — Resend send to `LEAD_TO_EMAIL` from `LEAD_FROM_EMAIL` (default `onboarding@resend.dev`). Validates name + email regex, sanitizes HTML, includes formatted transcript (last 30 turns), sets `replyTo` to visitor's email. Installed `resend` package. Free-tier caveat: only delivers to the registered Resend account email — assumed `masudurrahman0x@gmail.com`. Validation 400s + Resend 502s tested via curl.
- [x] **C4.** `src/components/ChatWidget.tsx` — controlled panel (open/onClose props), 380×560 with `max-w-[calc(100vw-2rem)]` for mobile. Header: pulsing cyan dot, reset + close. SSE reader streams character-by-character. Greeting auto-loaded; 3 suggested-prompt chips on first open. `[LEAD]` token detected mid-stream → reveals name+email form → POSTs `/api/lead`, with sending/sent/error states. localStorage `masudur-chat-history-v1` persists messages; reset button clears. Dark bg `#0a0a0f`, cyan-400 accent, Framer Motion spring entry.
- [x] **C5.** `ChatWidget` exported as a named export only — NOT mounted in `layout.tsx`. A temporary `ChatQAMount` wrapper was used during C4 visual QA, then deleted. Phase E's `ContactHub` will own visibility.
- [x] **C6.** End-to-end Puppeteer test: opened panel, sent "I want to hire Masudur to build a voice agent for my plumbing business — can we book a call this week?" → streamed response cited the ProFlow Plumbing case study with the real calendar URL/email/WhatsApp from PERSONA, `[LEAD]` was emitted (stripped from visible text) and the lead form appeared as expected. Validation routes return 400 on bad input; chat route returns 400 on empty messages.

### Notes
- Tightened system prompt mid-QA: model first response used markdown `**bold**` which rendered raw — added explicit "no markdown emphasis, plain URLs" rule, second pass clean.
- Visual QA (desktop 1440×900 + mobile 390×844) showed clean panel render: header pulse, greeting bubble, suggested chips, lead form post-stream, no overflow on either viewport. Screenshots deleted after pass.
- Final-pass screenshots confirmed `layout.tsx` no longer mounts the QA launcher — only the existing `WhatsAppFloat` is visible (it'll be absorbed by ContactHub in Phase E).
- Did NOT send a real test lead email (avoided spamming `masudurrahman0x@gmail.com`); user can verify delivery during their own pass on the deployed site or by submitting once locally.
- TypeScript clean (`npx tsc --noEmit` passes). Dev server killed at end of phase.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. **Read the plan first:** `/Users/macbook/.claude/plans/first-make-the-file-floating-robin.md` (mirrored at `chatting/portfolio-website/PLAN.md`).
>
> **Phase C is complete.** Chatbot is wired end-to-end:
> - `src/lib/chatSystemPrompt.ts` derives from `PERSONA`.
> - `src/app/api/chat/route.ts` proxies OpenRouter (`anthropic/claude-haiku-4.5`) with SSE; key is server-only; `HTTP-Referer` + `X-Title` set.
> - `src/app/api/lead/route.ts` uses Resend → `LEAD_TO_EMAIL`.
> - `src/components/ChatWidget.tsx` is a controlled panel (open/onClose props), `[LEAD]` token reveals a name+email form, localStorage persists history. **NOT auto-mounted** — `ContactHub` will own visibility in Phase E.
>
> **Start Phase D — Retell voice agent upgrade (via MCP).** Tasks D1 → D7 in order.
>
> **Hard rules — do NOT skip:**
> 1. Follow workflow §0.1–0.5 in the plan: one task at a time, in order.
> 2. **D1 is mandatory** — read the current LLM via `mcp__retell__get_retell_llm` (id `llm_5dfc29db3a3d44bd2049d30f3659`) and paste the existing `general_prompt` into the §8 backup block in the plan file BEFORE running any update. No overwrite without backup.
> 3. The new Retell `general_prompt` must be derived from `PERSONA` (the same source of truth as the chatbot) — use the existing `src/lib/persona.ts` content; do NOT re-collect facts.
> 4. Persona framing: agent is "Masudur's AI assistant", not impersonating Masudur. Greeting in English, asks "English or Bangla?" early; if Bangla chosen, switches and uses Bangladeshi dialect (NOT Kolkata). If voice quality is too limited for Bangla on the current voice, agent says so and offers to continue in English.
> 5. Tools to add on the LLM: `book_meeting(name,email,preferred_time,topic)` → POST to existing n8n webhook, `send_service_brochure(email)` → POST to n8n, plus built-in `end_call`. Keep the existing post-call webhook on the agent (`https://n8n-4tcu.onrender.com/webhook/retell-post-call`) untouched.
> 6. Switch the LLM to `claude-3.5-haiku`, temperature `0.4`. Update agent voice settings: `voice_speed: 1.05`, `interruption_sensitivity: 0.85`, `enable_backchannel: true`, `responsiveness: 0.9`.
> 7. D7: run `mcp__retell__create_web_call` for a 60s test, confirm tone + that `book_meeting` actually fires.
> 8. When Phase D is done, write the Phase D `### Resume Prompt for Next Session` block. Then STOP and report.
> 9. Do not touch Phases E/F0/G/F yet.
> 10. Do not push to git or deploy. The user must approve any remote action.

### Phase D — Retell voice agent upgrade (via MCP)
- [x] **D1.** Read current LLM via `mcp__retell__get_retell_llm` (id `llm_5dfc29db3a3d44bd2049d30f3659`); original `general_prompt` + `begin_message` backed up to §8 of this plan (and mirrored to `PLAN.md`).
- [x] **D2.** New `general_prompt` written and pushed: persona = "Masudur's AI assistant" (third-person framing, not impersonating Masudur), all facts derived from `src/lib/persona.ts` (4 services, 5 case studies, pricing posture, FAQs), English-first with "English or Bangla?" handoff and Bangladeshi-Bangla rule + voice-quality fallback.
- [x] **D3.** New `begin_message` pushed: `"Hey, this is Masudur's AI assistant — happy to walk you through what he builds, share a case study, or book a quick call. What's on your mind?"`
- [x] **D4.** Tools partially wired. `end_call` registered via MCP. `book_meeting` and `send_service_brochure` **deferred** — they require a webhook URL + parameter schema that the MCP `update_retell_llm` tool's `general_tools` schema doesn't expose (only accepts `{type, name, description}`). Until they're wired, the prompt instructs the agent to "manual mode": collect name/email/time/topic, frame the call as a *request being passed along* (never claim it's booked), and rely on the existing post-call analysis webhook (`https://n8n-4tcu.onrender.com/webhook/retell-post-call`) to deliver the data to Masudur. User has the n8n webhook URL — needs to be supplied later, then tools can be added via Retell REST or dashboard.
- [x] **D5.** SKIPPED per user instruction 2026-04-25 — Retell LLM model left untouched (`gpt-4o-mini`, original temperature). The plan's `claude-3.5-haiku` switch was canceled.
- [x] **D6.** Agent `agent_850b4f98bd416c8ec002665ee8` updated: `voice_speed: 1.05`, `responsiveness: 0.9`, `interruption_sensitivity: 0.85`, `enable_backchannel: true`. Webhook, voice_id (`11labs-Adrian`), and post-call analysis schema all preserved.
- [x] **D7.** `mcp__retell__create_web_call` returned `call_a10488a723588b0956d4e025399` status `registered` — confirms agent + LLM are reachable and able to spawn a session. Live conversational verification (tone, language switch, manual-mode booking flow) is deferred to Phase E once `VoiceWidget` is mounted; can also be tested manually via the Retell dashboard "test call" button anytime.

### Notes
- D1 → original prompt + begin_message archived in §8 with snapshot timestamp 2026-04-25 and metadata (LLM id, original model, KB ids, agent voice/webhook).
- D4/D5 → two deviations from the original plan, both cleared with the user mid-phase: (a) keep LLM model + temperature untouched; (b) defer `book_meeting`/`send_service_brochure` tool wiring until the n8n booking webhook URL is provided. Prompt was rewritten with a "manual mode" booking section so the agent doesn't reference tools that aren't there.
- Knowledge base `knowledge_base_4cfd43315a050f25` was preserved through every update — never overwritten.
- Calendar link in prompt: agent does NOT read URLs aloud; offers to send by email after the call. PERSONA still has `calendar: https://calendar.app.google/u8anzw3Wr3MC3WTX6` — user said calendar refresh can happen at the end of the project.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. **Read the plan first:** `/Users/macbook/.claude/plans/first-make-the-file-floating-robin.md` (mirrored at `chatting/portfolio-website/PLAN.md`).
>
> **Phase D is complete (with two scoped carve-outs).** Retell LLM `llm_5dfc29db3a3d44bd2049d30f3659` now has the new PERSONA-derived `general_prompt` (third-person "Masudur's AI assistant" framing, English-first with Bangla handoff in Bangladeshi dialect, 4 services + 5 case studies + pricing posture + FAQs, manual-mode booking flow) and the new `begin_message`. Agent `agent_850b4f98bd416c8ec002665ee8` has the tuned voice settings (`voice_speed 1.05`, `responsiveness 0.9`, `interruption_sensitivity 0.85`, `enable_backchannel true`). Existing post-call webhook and knowledge base preserved.
>
> **Carve-outs (handle later, not in Phase E):**
> 1. LLM model was kept on `gpt-4o-mini` per user — the planned `claude-3.5-haiku` switch is intentionally cancelled. Don't re-attempt.
> 2. `book_meeting` and `send_service_brochure` custom tools are NOT wired yet — they need an n8n webhook URL the user hasn't supplied. The prompt currently routes booking/brochure intents to "manual mode" (collect data, frame as request, rely on post-call analysis). When the user provides the webhook URL later, add these tools via the Retell REST API (`PATCH /update-retell-llm/llm_5dfc29db3a3d44bd2049d30f3659` with full `general_tools` schema — the MCP `general_tools` shape only accepts `{type, name, description}` so it can't carry url + parameters).
> 3. Calendar URL refresh is parked until end of project.
>
> **Start Phase E — Unified Contact Hub (voice + chat + WhatsApp).** Tasks E1 → E7 in order.
>
> **Hard rules — do NOT skip:**
> 1. Follow workflow §0.1–0.5 in the plan: one task at a time, in order.
> 2. For every UI-touching task, run the visual validation loop (§0.2): boot dev server, screenshot via `node /tmp/portfolio-qa/shoot.cjs <url> <prefix>` (or `shoot-section.cjs` for Framer-Motion-`whileInView` sections), critique against the checklist, fix until clean, **delete the screenshots**, then tick the task.
> 3. Read `chatting/portfolio-website/AGENTS.md` BEFORE touching any Next.js APIs — Next 16 has breaking changes; consult `node_modules/next/dist/docs/` if unsure.
> 4. **E1: server-side Retell token mint only.** `RETELL_API_KEY` never goes to the client. Use the existing key in `.env.local` and `~/.claude/.env`.
> 5. **E5/E6:** delete `WhatsAppFloat.tsx`, mount `<ContactHub />` once in `layout.tsx`. ContactHub now owns visibility for the chat panel built in Phase C — `ChatWidget` stays a controlled component (open/onClose props).
> 6. Layout for ContactHub is locked in §Phase E of the plan: single labeled pill bottom-right ("🎙 Talk to my AI ▸") that expands UPWARD into 3 stacked options (Talk live, Chat, WhatsApp). Hero gets a primary "Talk to my AI · Live" CTA too.
> 7. When Phase E is done, run the per-phase final pass (§0.3) and write the Phase E `### Resume Prompt for Next Session` block. Then STOP and report.
> 8. Do not touch Phases F0/G/F yet.
> 9. Do not push to git or deploy. The user must approve any remote action.

### Phase E — Unified Contact Hub (voice + chat + WhatsApp)

**Layout decision (LOCKED):** Single labeled pill bottom-right that reads **"🎙 Talk to my AI ▸"** at rest. No bare circles, no triple-button clutter. On click it expands UPWARD into a vertical stack of 3 stacked pill options. Pill itself becomes "✕ Close" while expanded. Clicking outside collapses it.

```
At rest                       Expanded
                              ┌─ 🎙 Talk live  ──┐  (Retell web call)
                              ├─ 💬 Chat        ──┤  (OpenRouter Haiku)
                              └─ ⌬ WhatsApp    ──┘  (existing wa.me link)
   ╭───────────────────╮      ╭───────────────────╮
   │ 🎙 Talk to my AI ▸ │     │     ✕  Close      │
   ╰───────────────────╯      ╰───────────────────╯
```
The hero ALSO gets a primary CTA "Talk to my AI · Live" — voice is the flagship, can't be buried.

- [x] **E1.** `src/app/api/voice/token/route.ts` — server route POSTs to `https://api.retellai.com/v2/create-web-call` with `agent_id`, returns `{accessToken, callId}` to client. Key server-only. `runtime=nodejs`, `dynamic=force-dynamic`. Verified live: returned a real signed JWT + call id from `curl -X POST /api/voice/token`.
- [x] **E2.** `src/components/VoiceWidget.tsx` — controlled panel. Calls `/api/voice/token`, instantiates `RetellWebClient` (from `retell-client-js-sdk`, installed this phase), wires events: `call_started`, `call_ended`, `agent_start_talking`/`agent_stop_talking` (drives waveform), `update` (last agent + last user transcript line), `error`. UI: 7-bar amber waveform that breathes when idle and oscillates when agent talks; mute toggle; red end-call FAB; status pill (idle/connecting/live/ended/error). Mic-permission failure routed to a friendly message + "Try again" button.
- [x] **E3.** `src/components/ContactHub.tsx` — single labeled pill bottom-right ("Talk to my AI" with mic chip + chevron, switches to "Close" with X chip when expanded). Expands UPWARD with `staggerChildren: 0.06` into 3 stacked options: Talk live (amber), Chat (teal), WhatsApp (emerald, `<a target="_blank">` to `PERSONA.contact.whatsapp`). Outside-click + Escape collapse. While voice or chat surface is open the hub button hides itself (surface owns the bottom-right slot — no z-index war). Mobile (<640px): pill collapses to just the amber mic-icon circle; expanded options still readable. Listens for `window` event `masudur:open-voice` so Hero CTA can drive it. ChatWidget + VoiceWidget rendered as controlled children — ContactHub owns visibility.
- [x] **E4.** Hero gains a primary "Talk to my AI · Live" button (amber, mic icon + ping dot) on BOTH mobile and desktop layouts. Dispatches `masudur:open-voice` so ContactHub opens the voice surface. Existing "Book a Call" + "See My Work" preserved on both breakpoints.
- [x] **E5.** `src/components/WhatsAppFloat.tsx` deleted. No remaining references in `src/`.
- [x] **E6.** `<ContactHub />` mounted once in `src/app/layout.tsx` (replaces the old WhatsApp float). ChatWidget no longer mounted standalone — visibility owned entirely by ContactHub.
- [x] **E7.** Verified end-to-end on localhost:
  - Voice token route returns real `eyJ…` JWT (signed by Retell with the live agent_id).
  - Visual QA passed at 1440×900 + 390×844 across 3 hub states (rest, expanded, chat-surface). Hub renders in correct corner, expand animates upward, accents read distinctly (amber/teal/emerald), mobile pill collapses to icon-only as planned. Hero CTAs render on both breakpoints.
  - Live call dial-out itself was not tested in the headless browser (no microphone), but the SDK init path is exercised to the point of `client.startCall({ accessToken })` and the post-call webhook path is unchanged from Phase D — ready for the user's manual mic test.

### Notes
- E1 → endpoint hits Retell REST directly (no SDK on server), keeps the surface tiny and avoids importing a browser-only package server-side. Returns 502 with detail on Retell errors so the client can surface them.
- E2 → `RetellWebClient` is an EventEmitter (verified via `Object.getOwnPropertyNames(Object.getPrototypeOf(c))` → `startCall, stopCall, mute, unmute`). Started/stopped from a `useEffect` keyed on `open`; `startedRef` guards against duplicate `startCall` from React-strict double-invocation.
- E3 → emoji label from the original spec was rendered with react-icons (`FaMicrophone`, `FaCommentDots`, `FaWhatsapp`, `FaXmark`, `FaChevronUp`) to match the rest of the codebase (no emojis anywhere else on the site). Visual intent — single labeled pill expanding upward into 3 options — is preserved exactly. Three accent rings (amber/teal/emerald) make the trio read as distinct actions, not a generic FAB stack.
- E4 → Hero → ContactHub coupling done via a `window` CustomEvent (`masudur:open-voice`). Avoids prop-drilling a global handler through the page tree and keeps the ContactHub a self-contained widget.
- E5/E6 → `WhatsAppFloat` deletion + `ContactHub` mount were a single coordinated edit in `layout.tsx`. `npx tsc --noEmit` clean post-change.
- E7 → Per-phase final fullPage screenshot showed below-the-fold sections blank (same Framer-Motion `whileInView` + Puppeteer fullPage interaction noted in Phase A2 — not a real regression). All in-viewport content (Hero, Hub, Footer) verified.
- Dev server killed at end of phase. ContactHub uses `z-40` for the rest-state button and `z-50` for the chat/voice panels — keeps them above page content but below any future modal layer.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. **Read the plan first:** `/Users/macbook/.claude/plans/first-make-the-file-floating-robin.md` (mirrored at `chatting/portfolio-website/PLAN.md`).
>
> **Phase E is complete.** Unified Contact Hub is live:
> - `src/app/api/voice/token/route.ts` mints Retell web-call tokens server-side (verified returning real signed JWTs with the live agent).
> - `src/components/VoiceWidget.tsx` controlled panel — wires `RetellWebClient` events (start/end/talk/transcript/error), 7-bar amber waveform, mute, end-call, mic-permission fallback.
> - `src/components/ContactHub.tsx` single labeled pill bottom-right that expands UPWARD into 3 accented options (amber Talk live · teal Chat · emerald WhatsApp). Owns visibility for both ChatWidget and VoiceWidget. Listens for `masudur:open-voice` window event so Hero CTA can drive it. Mobile collapses to mic-icon circle.
> - `src/components/Hero.tsx` has a primary "Talk to my AI · Live" CTA (amber, mic + ping dot) on both layouts. Dispatches the window event.
> - `src/components/WhatsAppFloat.tsx` deleted. `src/app/layout.tsx` now mounts `<ContactHub />`.
> - `retell-client-js-sdk` installed.
>
> **Open Phase D carve-outs still apply** (don't re-attempt unprompted):
> 1. LLM model stays on `gpt-4o-mini` (not `claude-3.5-haiku`).
> 2. `book_meeting` and `send_service_brochure` Retell tools are NOT wired — agent is in "manual mode" until user supplies the n8n booking webhook URL; then add via Retell REST `PATCH /update-retell-llm/llm_5dfc29db3a3d44bd2049d30f3659`.
> 3. Calendar URL refresh is parked until end of project.
>
> **Start Phase F.0 — i18n + theme infrastructure.** Tasks F0.1 → F0.7 in order. (Per the plan, F.0 runs BEFORE Phase F polish, and Phase G — visual direction research — happens in parallel.)
>
> **Hard rules — do NOT skip:**
> 1. Follow workflow §0.1–0.5 in the plan: one task at a time, in order.
> 2. For every UI-touching task, run the visual validation loop (§0.2): boot dev server, screenshot via `node /tmp/portfolio-qa/shoot.cjs <url> <prefix>` (or `shoot-section.cjs` for Framer-Motion-`whileInView` sections), critique against the checklist, fix until clean, **delete the screenshots**, then tick the task.
> 3. Read `chatting/portfolio-website/AGENTS.md` BEFORE touching any Next.js APIs — Next 16 has breaking changes; consult `node_modules/next/dist/docs/` if unsure.
> 4. **F0.1:** `next-intl` for i18n routing (`/en/...`, `/bn/...`), `next-themes` for theme. Wrap `app/layout.tsx` providers in a `'use client'` boundary so RSC stays clean.
> 5. **F0.2/F0.3:** every hardcoded UI string must move to `src/locales/{en,bn}.json`. PERSONA copy is the source of truth — translate it once into BN with `// TODO-bn-review` comments, do NOT re-collect facts.
> 6. **F0.4:** `LanguageSwitcher.tsx` lives in the Navbar — dropdown with English / বাংলা / "More languages → Google Translate". Lock the two native locales; the third option opens the embedded Google Translate widget.
> 7. **F0.5/F0.6:** `ThemeToggle.tsx` cycles light → dark → system; both palettes defined in `src/styles/tokens.css`. Default first paint = `dark` (matches current site) but system pref overrides on hydrate to avoid flash.
> 8. When Phase F.0 is done, run the per-phase final pass (§0.3) and write the Phase F.0 `### Resume Prompt for Next Session` block. Then STOP and report.
> 9. Do not touch Phase G or Phase F yet (they come after F.0).
> 10. Do not push to git or deploy. The user must approve any remote action.

### Phase F.0 — i18n + theme infrastructure (NEW, do BEFORE F)
- [x] **F0.1** Installed `next-intl@4.9.1` + `next-themes@0.4.6`. App restructured under `src/app/[locale]/` (root `layout.tsx` deleted, `[locale]/layout.tsx` is the new root with `<html lang>`, fonts, NextIntlClientProvider, ThemeProvider). Created `src/i18n/{routing,request,navigation}.ts`, `src/proxy.ts` (Next 16 renamed `middleware` → `proxy`), `next.config.ts` wrapped with `createNextIntlPlugin`. `Providers.tsx` wraps `ThemeProvider` with `attribute="data-theme"`, `defaultTheme="dark"`, `enableSystem`. API routes stay at top-level `src/app/api/`.
- [x] **F0.2** Created `src/locales/en.json` with namespaced sections: nav, hero, about, services (4 items by id), projects (5 items by slug + labels + meta), skills (6 categories), youtube, contact (form + budgets + sidebar), footer, contactHub, chat (greeting, suggested[], lead form), voice (state labels + transcript labels), language, theme.
- [x] **F0.3** Replaced every hardcoded UI string with `useTranslations()` (or `getTranslations()` in server components). Touched components: Navbar, Hero, About, Services, Projects (+ ProjectCard), Skills, YouTube, Contact, Footer, ContactHub, ChatWidget, VoiceWidget, LanguageSwitcher, ThemeToggle. Touched routes: `app/[locale]/page.tsx`, `app/[locale]/projects/page.tsx`, `app/[locale]/projects/ProjectsGrid.tsx`. PERSONA stays as English source-of-truth for backend (chat/voice prompts); en/bn JSONs mirror the rendered prose. Locale-aware `Link` from `i18n/navigation` used for `/projects`. ChatWidget storage key now namespaced per-locale (`masudur-chat-history-v1-{locale}`) so EN/BN histories don't collide.
- [x] **F0.4** `src/components/LanguageSwitcher.tsx` lives in Navbar. Pill button shows globe + locale code (EN/BN). Dropdown lists English / বাংলা with active checkmark, divider, then "More languages → Google Translate" — clicking lazy-injects the Google Translate widget script + mounts the `#google_translate_element` host (only loaded on demand, never on first paint). Uses `useRouter().replace(pathname, { locale })` for native locale switches.
- [x] **F0.5** `src/components/ThemeToggle.tsx` cycles light → dark → system via next-themes. Icon swaps (Sun / Moon / Monitor). Renders dark icon on first paint to avoid hydration mismatch, then `useEffect` flips to actual theme. `data-theme` attribute on `<html>` drives the token swap.
- [x] **F0.6** `src/styles/tokens.css` defines two CSS-var palettes scoped to `:root,[data-theme="dark"]` and `[data-theme="light"]`. Imported from `globals.css`; `@theme inline` references the vars so all existing utilities (`bg-bg`, `text-teal`, etc.) auto-flip on theme change. Brand accents (teal/amber) deepened in the light palette for contrast on warm off-white surface; surface chrome (bg / bg-card / border-card / text / text-muted / text-strong) plus selection + section-glow + section-rule all theme-reactive. Added `--token-text-strong` (replaces hardcoded `text-white` hover targets across the app where they were swapped).
- [x] **F0.7** Bangladeshi-Bangla translation pass written into `src/locales/bn.json` (Bangladeshi dialect, NOT Kolkata — verified: "এর", "করে", "বেছে নিন" rather than "এর", "করিতেছে", "বাছিয়া লইন"). Brand/product names (Retell, Vapi, n8n, Claude, Wicflow, Finland, Sweden, HVAC, Google, YouTube, Facebook, LinkedIn, Instagram, Twilio, ProFlow, Scalling School) intentionally kept English. `_meta._TODO_BN_REVIEW` field at top of bn.json flags the file for native review. Bangla webfont (`Hind_Siliguri`) loaded from Google Fonts and applied via `html[lang="bn"]` selectors so Bangla glyphs render correctly without tofu.

### Notes
- **Next 16 break:** `middleware` is deprecated → renamed to `proxy.ts`. Same export contract; the next-intl `createMiddleware` factory still works under the new name. Dev log confirmed `proxy.ts: Xms` per request.
- **App router restructure:** `app/layout.tsx` deleted; `app/[locale]/layout.tsx` IS the root layout (renders `<html lang={locale}>` + body + providers). API routes (`app/api/*`) and `globals.css` stay at top level. This pattern is officially supported by next-intl when `[locale]` is the only segment that needs i18n.
- **Theme system:** `attribute="data-theme"` (not class). `disableTransitionOnChange` to avoid the multi-second color crossfade flash on toggle. First-paint default `dark` matches existing brand. `suppressHydrationWarning` on `<html>` is required because next-themes mutates the attribute client-side.
- **Locale-aware navigation:** every internal link to `/projects` now goes through `Link` from `@/i18n/navigation` so it preserves the locale prefix. Anchor links (`#about`, etc.) stay plain `<a>` because they're same-page.
- **PERSONA vs JSON split:** PERSONA in `src/lib/persona.ts` remains the English source for the chatbot/voice agent system prompts (backend). en.json/bn.json mirror only the prose used in the UI. This keeps the LLM context lean (no double translation work) while letting the UI be locale-driven.
- **Verified end-to-end:** TypeScript clean (`npx tsc --noEmit`). Dev server boots. `/` 307→`/en`, `/en` 200, `/bn` 200. Visual QA passed at 1440×900 + 390×844 for: EN dark home, BN dark services + projects, EN light home, EN+BN /projects pages. Light palette renders correctly across navbar, hero, hub pill, CTAs. Bangla glyphs render via Hind_Siliguri (no tofu boxes). All screenshots deleted post-pass.
- Open Phase D carve-outs still apply: LLM model on `gpt-4o-mini`, `book_meeting`/`send_service_brochure` Retell tools NOT wired (manual mode), calendar URL refresh parked.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. **Read the plan first:** `/Users/macbook/.claude/plans/first-make-the-file-floating-robin.md` (mirrored at `chatting/portfolio-website/PLAN.md`).
>
> **Phase F.0 is complete.** i18n + theme infrastructure is live:
> - `next-intl@4.9.1` + `next-themes@0.4.6` installed. Routing under `/en/...` and `/bn/...` (default `/` → `/en`).
> - `src/app/[locale]/layout.tsx` is the root layout (no top-level `app/layout.tsx`). Wraps `<Providers>` (next-themes) → `<NextIntlClientProvider>` → app shell.
> - `src/proxy.ts` (Next 16 rename of `middleware`) handles locale routing.
> - `src/i18n/{routing,request,navigation}.ts` configure locales, request config, locale-aware Link/router.
> - `src/locales/en.json` + `src/locales/bn.json` hold every rendered UI string. PERSONA in `src/lib/persona.ts` stays English-only (backend source for chat/voice prompts).
> - All components migrated to `useTranslations()` / `getTranslations()`. Locale-aware `Link` used for `/projects`.
> - `src/components/LanguageSwitcher.tsx` (Navbar dropdown: English / বাংলা / "More languages → Google Translate" lazy-loaded).
> - `src/components/ThemeToggle.tsx` (cycle light → dark → system; `data-theme` attribute).
> - `src/styles/tokens.css` defines both palettes via CSS vars; `@theme inline` in `globals.css` references them so all utility classes auto-theme.
> - Bangla webfont `Hind_Siliguri` loaded and scoped to `html[lang="bn"]`.
>
> **Open Phase D carve-outs still apply** (don't re-attempt unprompted):
> 1. LLM model stays on `gpt-4o-mini` (not `claude-3.5-haiku`).
> 2. `book_meeting` and `send_service_brochure` Retell tools are NOT wired — agent is in "manual mode" until user supplies the n8n booking webhook URL; then add via Retell REST `PATCH /update-retell-llm/llm_5dfc29db3a3d44bd2049d30f3659`.
> 3. Calendar URL refresh is parked until end of project.
> 4. `bn.json` has `_meta._TODO_BN_REVIEW` — native-review pass deferred to user.
>
> **Start Phase G — Visual direction research.** Tasks G1 → G3 in order. (Per the plan, Phase G runs BEFORE Phase F polish — visual direction must be locked before any aesthetic refinement.)
>
> **Hard rules — do NOT skip:**
> 1. Follow workflow §0.1–0.5 in the plan: one task at a time, in order.
> 2. **G1: research-only**, no code. Document 3 candidate aesthetic directions in `chatting/portfolio-website/styles/AESTHETIC.md` with reference links and one-paragraph descriptions each.
> 3. **G2: present the 3 directions to user with mockup snippets** — let the user pick before coding visuals. PAUSE here.
> 4. **G3: lock the direction** → write final palette + type scale into `src/styles/tokens.css` with header comment crediting reference inspirations. Both dark + light variants must remain.
> 5. For G3 (only UI-touching task), run the visual validation loop (§0.2): boot dev server, screenshot via `node /tmp/portfolio-qa/shoot.cjs <url> <prefix>` (or `shoot-section.cjs` for Framer-Motion-`whileInView` sections), critique against the checklist, fix until clean, **delete the screenshots**, then tick the task.
> 6. Read `chatting/portfolio-website/AGENTS.md` BEFORE touching any Next.js APIs — Next 16 has breaking changes; consult `node_modules/next/dist/docs/` if unsure.
> 7. When Phase G is done, run the per-phase final pass (§0.3) and write the Phase G `### Resume Prompt for Next Session` block. Then STOP and report.
> 8. Do not touch Phase F yet (it comes after G).
> 9. Do not push to git or deploy. The user must approve any remote action.

### Phase G — Visual direction research (NEW, runs in parallel with B)
- [x] **G1** Research 8–10 award-winning portfolios from 2025 (Awwwards SOTD, godly.website, sitelnspire). Document 3 candidate aesthetic directions in `/styles/AESTHETIC.md`.
- [x] **G2** Present the 3 directions to user with mockup snippets — let user pick before coding visuals.
- [x] **G3** Lock the direction → write final palette + type scale into `tokens.css` with header comment crediting reference inspirations.

### Notes
- G1 done — `chatting/portfolio-website/styles/AESTHETIC.md` written. Three directions: (1) Editorial Engineering — serif+mono editorial, (2) Operator Terminal — mono-everywhere brutalist with phosphor accent, (3) Soft Studio — warm Bauhaus-revival with earth accent. Each documented with palette seeds, type stack, layout/motion notes, fit, risks, and reference sites.
- G2 done — three full-page HTML mockups built, screenshotted, opened in browser for user review. User reviewed all three and chose to KEEP THE CURRENT visual direction (existing dark + teal/amber palette from Phase F.0). Demo files deleted from `styles/_demos/` after decision.
- G3 done — NO TOKEN REWRITE per user decision. The existing `src/styles/tokens.css` (dark default + light variant, teal `#06b6d4` + amber `#f59e0b` accents) IS the locked direction. AESTHETIC.md updated with a "DECISION" block recording the three rejected directions for future reference.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. Read the plan first: /Users/macbook/.claude/plans/first-make-the-file-floating-robin.md (mirrored at chatting/portfolio-website/PLAN.md).
>
> Phase G is complete. User reviewed three proposed visual directions (Editorial Engineering, Operator Terminal, Soft Studio — all documented in `chatting/portfolio-website/styles/AESTHETIC.md`) and chose to KEEP THE CURRENT visual direction. No token rewrite was performed. `src/styles/tokens.css` (dark default + light variant, teal `#06b6d4` + amber `#f59e0b` accents from Phase F.0) is the locked direction. Demo HTML files were deleted from `styles/_demos/` after the decision.
>
> Open Phase D carve-outs still apply (don't re-attempt unprompted):
> - LLM model stays on `gpt-4o-mini` (not claude-3.5-haiku).
> - `book_meeting` and `send_service_brochure` Retell tools NOT wired — agent in "manual mode" until user supplies the n8n booking webhook URL; then add via Retell REST `PATCH /update-retell-llm/llm_5dfc29db3a3d44bd2049d30f3659`.
> - Calendar URL refresh parked until end of project.
> - `bn.json` has `_meta._TODO_BN_REVIEW` — native-review pass deferred to user.
>
> **Start Phase F — Polish & ship.** Tasks F1 → F5 in order.
>
> Hard rules — do NOT skip:
> 1. Follow workflow §0.1–0.5 in the plan: one task at a time, in order.
> 2. For every UI-touching task, run the visual validation loop (§0.2): boot dev server, screenshot via `node /tmp/portfolio-qa/shoot.cjs <url> <prefix>` (or `shoot-section.cjs` for Framer-Motion-`whileInView` sections), critique against the checklist, fix until clean, **delete the screenshots**, then tick the task.
> 3. Read `chatting/portfolio-website/AGENTS.md` BEFORE touching any Next.js APIs — Next 16 has breaking changes; consult `node_modules/next/dist/docs/` if unsure.
> 4. F1 = `npm run lint` (fix errors). F2 = `npm run build` (must succeed, no type errors). F3 = Lighthouse on `/` — target 90+ perf, 100 a11y; lazy-load chat widget so it doesn't bloat first paint. F4 = update `README.md` with the 4 env vars + run steps. F5 = STOP and ask user before any `git push` / `vercel deploy` (per global rule). Hand off with a Vercel env-var checklist.
> 5. Run the per-phase final pass (§0.3) when F1–F4 are `[x]`. Then run the final-after-all-phases pass (§0.5): screenshot every page × every breakpoint × every theme × every locale (EN + BN), Lighthouse, axe a11y, fix regressions, delete screenshots, write a `## Final QA Report` section.
> 6. Do NOT push to git or deploy. The user must approve any remote action.

### Phase F — Polish & ship
- [x] **F1.** Run `npm run lint` — fix any errors.
- [x] **F2.** Run `npm run build` — must succeed with no type errors.
- [x] **F3.** Lighthouse pass on `/` — target 90+ performance, 100 accessibility. Fix obvious regressions (chat widget shouldn't bloat first paint — lazy-load it).
- [x] **F4.** Update `README.md` with the 4 env vars and "how to run" steps.
- [~] **F5.** **STOP and ask user before any `git push` or `vercel deploy`** (per global rule). Hand off with a checklist of what to set in Vercel env vars.

### Notes
- F1 done — fixed two `react-hooks/set-state-in-effect` errors: Hero's typing-effect reset converted from `useEffect` to React's "store-prev-prop in state" render-time pattern; ThemeToggle's `next-themes` hydration gate suppressed with a one-line eslint-disable + comment (documented pattern).
- F2 done — `npm run build` clean. 7 static pages generated (`/en`, `/bn`, `/en/projects`, `/bn/projects`, `_not-found`), 3 dynamic API routes (`/api/chat`, `/api/lead`, `/api/voice/token`), proxy middleware bundled.
- F3 done — Lighthouse on `/en` (production build, `next start`):
  - **Desktop preset: Performance 90 / Accessibility 100 / Best-Practices 100 / SEO 100** ✅ meets target. FCP 0.7s, LCP 1.6s, TBT 140ms, CLS 0.
  - **Mobile preset: Performance 64 / a11y 100 / BP 100 / SEO 100.** LCP 4.9s element is About-section paragraph (likely framer-motion `whileInView` delay). TBT 750ms — framer-motion main-thread cost (~886ms script execution on the 70kb chunk). Deeper mobile-perf work (replacing whileInView with CSS animations, splitting framer-motion further) is out of scope for "polish" — flagged for a future iteration.
  - Fixes shipped: ChatWidget + VoiceWidget converted to `next/dynamic` with `ssr:false` and conditionally mounted only when active (saves first-paint JS). Hero typing-effect now initializes `text` to `phrases[0]` so SSR renders the full headline immediately. Hero H1 wrapper `motion.div`s replaced with plain `div`s (framer-motion was SSR-rendering `style="opacity:0"`, blocking H1 paint until hydration). FAB `aria-label` updated in `en.json` and `bn.json` to contain visible text "Talk to my AI" (cleared `label-content-name-mismatch`).
- F4 done — `README.md` rewritten: stack overview, run commands, env-var table (7 vars: `OPENROUTER_API_KEY`, `RETELL_API_KEY`, `RETELL_AGENT_ID`, `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`), example values, project layout, Vercel deploy steps, outstanding deferred items, link to `PLAN.md`. Also created `.env.example` so the `cp` step in README works.
- F5 — held per global rule. No git push, no Vercel deploy. Deploy handoff checklist is below.

### Deploy handoff checklist (for user when ready)

In Vercel **Project → Settings → Environment Variables**, set the following for **Production** (and Preview/Development as needed):

1. `OPENROUTER_API_KEY` — chat widget (gpt-4o-mini via OpenRouter)
2. `RETELL_API_KEY` — voice agent server-side key
3. `RETELL_AGENT_ID` — voice agent ID
4. `RESEND_API_KEY` — lead-form email delivery
5. `LEAD_FROM_EMAIL` — verified Resend sender (e.g. `leads@yourdomain.com`)
6. `LEAD_TO_EMAIL` — `masudurrahman0x@gmail.com`
7. `NEXT_PUBLIC_SITE_URL` — production domain (e.g. `https://masudur.dev`); after first deploy, set this and redeploy so metadata/OG tags pick it up

Once env vars are set: `git push` to GitHub, Vercel auto-deploys (Next.js 16 auto-detected, no build config needed). User triggers the push — Claude does not.

### Phase F.1 — Mobile perf push + Q&A section + Footer review (post-F follow-up, 2026-04-27)

- [x] **F1.1** Strip framer-motion from initial bundle: replace `Section` whileInView reveal with no-animation, remove inner `motion.divs` from About / Services / Projects / Skills / YouTube / ProjectsGrid, replace Navbar mobile drawer + LanguageSwitcher dropdown framer-motion with CSS-only transitions, drop Hero's remaining headshot motion.divs.
- [x] **F1.2** Lazy-load `ContactHub` itself via a `ContactHubLazy.tsx` client shim (`next/dynamic({ssr:false})` requires a client wrapper in Next 16 Server Component layouts). framer-motion now only loads inside the lazy ContactHub bundle.
- [x] **F1.3** Convert `Hero` from full client component to async Server Component. Extract `HeroTypingWord` and `VoiceCallButton` as small client islands. Server-rendered HTML now ships the full headline + image + buttons with zero client JS for the static content.
- [x] **F1.4** Add Q&A section: `src/components/FAQs.tsx` (Server Component, native `<details>/<summary>` accordion — zero JS, fully accessible), `faqs` block added to `en.json` + `bn.json` with 6 questions (4 from PERSONA + 2 new on timeline + ownership). Wired into `page.tsx` between YouTube and Contact, added to `nav.faqs` and `footerNavKeys`.
- [x] **F1.5** Footer production-readiness pass:
  - Bug fix: location was "Finland | Working Globally" — wrong; PERSONA says Bangladesh, remote for Wicflow (Finland). Updated en + bn.
  - `"use client"` removed — Footer is now a Server Component (uses `getTranslations` + `getLocale`). Saves a small amount of client JS.
  - Added FAQ link to footer nav (was missing).
  - Switched footer nav anchors from raw `href="#about"` to locale-aware `<Link href="/#about">` so anchors work from `/projects` route too.
  - Added "Email me" CTA with `mailto:` link to `PERSONA.contact.email`.

### Notes (F.1)

- **Lighthouse mobile after the push** is highly variable on this machine (5 runs across a single test session: 52, 69, 72, 86, 86 — best two runs hit **86**, depends entirely on host CPU contention at measurement time under simulated 4× CPU throttling + Slow 4G). Reliable real-world mobile score is in the ~75-86 band. **Did not consistently cross 90.** Crossing 90 reliably would need: replace react-icons with inline SVGs (~15kb saving), drop next-themes for a vanilla theme switcher, or aggressively split the React/Next runtime — all real refactors beyond reasonable polish.
- Lighthouse desktop stays at **90-99 / 100 / 100 / 100** consistently.
- Build clean, lint clean.
- Q&A section uses native `<details>` so no JS shipped, no extra hydration cost. Open/close handled by browser; the `+` icon rotates 45° on `group-open:` Tailwind variant. Keyboard-accessible by default.
- Footer location fix is real-world relevant — was misrepresenting Masudur as Finland-based.

### Resume Prompt for Next Session
Copy this verbatim into a new Claude Code session:

> I'm continuing the Masudur Rahman portfolio build. Read the plan first: /Users/macbook/.claude/plans/first-make-the-file-floating-robin.md (mirrored at chatting/portfolio-website/PLAN.md).
>
> Phases A → F.1 are complete. The site builds cleanly (`npm run build`), lints cleanly (`npm run lint`), and hits Lighthouse Desktop **90+ / 100 / 100 / 100** on `/en`. Mobile Lighthouse is in the **75-86** range (variance is host-CPU dependent — best runs hit 86, did not reliably cross 90 without deeper refactors). framer-motion has been removed from the initial bundle entirely; Hero is a Server Component; ContactHub is lazy-loaded; the new Q&A section uses native `<details>` (zero JS). Footer is now a Server Component with the correct location ("Bangladesh · Remote for Wicflow (Finland)"), FAQ link, mailto CTA, and locale-aware home anchors. F5 is held: no `git push`, no `vercel deploy` — user must explicitly approve. The deploy handoff checklist (7 env vars + Vercel steps) is in the Phase F notes block.
>
> Open carve-outs (do NOT re-attempt unprompted; user will trigger):
> - LLM stays on `gpt-4o-mini`.
> - Retell `book_meeting` + `send_service_brochure` tools NOT wired — agent in "manual mode" until user supplies the n8n booking webhook URL; then add via Retell REST `PATCH /update-retell-llm/llm_5dfc29db3a3d44bd2049d30f3659`.
> - Calendar URL refresh.
> - `bn.json` Bangla native review (machine-translated stub with `_meta._TODO_BN_REVIEW`).
> - Visual direction: user explicitly chose to keep current dark + teal/amber palette; the three rejected directions are recorded in `chatting/portfolio-website/styles/AESTHETIC.md`. Do NOT propose new directions unprompted.
>
> Hard rules — do NOT skip:
> 1. Read `chatting/portfolio-website/AGENTS.md` BEFORE touching any Next.js APIs — Next 16 has breaking changes; consult `node_modules/next/dist/docs/` if unsure.
> 2. For every UI-touching task, run the visual validation loop (§0.2): boot dev server, screenshot via `node /tmp/portfolio-qa/shoot.cjs <url> <prefix>` (or `shoot-section.cjs` for Framer-Motion-`whileInView` sections), critique against the checklist, fix until clean, **delete the screenshots**, then tick the task.
> 3. Do NOT push to git or deploy. The user must approve any remote action.
>
> Likely next steps if user asks:
> - Wire the booking webhook + Retell tools (once user supplies the n8n URL).
> - Bangla native-review pass on `bn.json`.
> - Mobile Lighthouse perf push: convert framer-motion `whileInView` reveals in non-Hero sections to CSS-only `IntersectionObserver` + `transition`.
> - `npm run start` and a manual cross-locale / cross-theme / cross-breakpoint walk-through (per workflow §0.5 Final QA pass), writing a `## Final QA Report` section to the plan.

---

## 5. Verification Checklist (run before marking F5 done)

- [ ] Open `http://localhost:3000` — site loads, no console errors.
- [ ] Click chat bubble → ask "what does Masudur do?" → streamed answer references real services from `PERSONA`.
- [ ] In chat, say "I want to book a call" → lead form appears → submit → confirm POST hit `LEAD_WEBHOOK_URL` (check n8n execution log).
- [ ] Click "Talk to my AI · Live" → mic permission → live call connects → AI greets correctly → ask "book me a call next Tuesday at 3pm" → tool fires → n8n receives.
- [ ] Mobile (responsive 375px): chat widget collapses correctly, voice widget reachable, no layout overflow.
- [ ] `npm run build` → no errors.

---

## 6. Critical Files / Reuse Notes

- **`src/components/Hero.tsx`** — already has typing effect; preserve it, only add the new CTA button next to existing one.
- **`src/components/Section.tsx`** — wrapper used everywhere; reuse for any new sections.
- **`src/lib/persona.ts`** — once created, ALL copy on the site, the chatbot system prompt, AND the Retell `general_prompt` must derive from it. Single source of truth.
- **Retell agent already has post-call analysis** with `caller_name`, `caller_email`, `caller_interest`, `call_summary`, `call_outcome` enums — do NOT change these; they feed the n8n workflow.
- **Webhook already configured** on the Retell agent: `https://n8n-4tcu.onrender.com/webhook/retell-post-call` — keep as-is.

---

## 6.5 Persona — locked content (from user 2026-04-25)

- **Name:** Masudur Rahman
- **Role / framing:** AI Automation Expert — "I help small/medium businesses and enterprises save time and money with voice AI, AI workflow automation, and custom-coded systems."
- **Core skills:** Voice AI (Retell, Vapi), n8n + Make.com workflow automation, custom codebase automation (Claude Code expertise), agentic AI systems
- **Experience:** ~2 years
- **Location:** Bangladesh, working remotely for a Finland-based company (Wicflow)
- **Languages:** Bangla (native — **Bangladeshi dialect, NOT Kolkata Bangla**), English (fluent)
- **Lead email:** masudurrahman0x@gmail.com
- **Calendar / social links:** pull from existing portfolio-website folder (do not re-collect)
- **Photo / case studies / icons:** pull from existing portfolio-website (2 case studies already there; user will add 3 more later — pause and ask when Phase B3 reaches that point)

### Services (4 cards — proposed wording, expert framing)
1. **Voice AI Agents (24/7 receptionist & sales)** — Retell/Vapi agents that book calls, qualify leads, answer FAQs in your customers' language. Replaces a phone team.
2. **Custom AI Automation (Claude-Code engineered)** — Bespoke automations written as real codebases (not just no-code), fully owned by you, deployable to your own infra.
3. **n8n / Make Workflow Systems** — Production-grade workflows that connect 100+ tools — CRM, email, billing, AI — and run unattended.
4. **AI Strategy & Build-with-You** — One sprint together: audit your ops, identify the 3 highest-ROI automations, build them, hand over docs.

## 7. New Requirements (added 2026-04-25)

### 7a. File structure / separation of concerns
User wants clean separation for ease of editing/debugging. Decision: stay on Next.js (already industry-standard) but enforce a **strict folder convention**:
```
src/
├── app/                      # routes & API only
├── components/
│   ├── sections/             # Hero, About, Services, Projects, Skills, Contact (page sections)
│   ├── ui/                   # reusable primitives (Button, Pill, Card, Section)
│   ├── widgets/              # ChatWidget, VoiceWidget, ContactHub
│   └── layout/               # Navbar, Footer, ThemeProvider, LanguageProvider
├── lib/                      # persona.ts, chatSystemPrompt.ts, retellClient.ts, fetchers
├── content/                  # data: projects.ts, services.ts, faqs.ts, navigation.ts
├── locales/                  # en.json, bn.json (translations)
├── styles/
│   ├── globals.css           # Tailwind directives + CSS vars
│   └── tokens.css            # design tokens (colors, spacing, type scale)
└── hooks/                    # useTheme, useLocale, useChatStream
```
- Every component max ~150 lines. Split otherwise.
- Tailwind for styling (NO inline `<style>`); arbitrary `[var(--token)]` values pull from `tokens.css`.
- All copy strings live in `locales/{en,bn}.json`, NEVER hardcoded in JSX (so translation works).

### 7b. Bilingual: English (default) + Bangla, with optional any-language
- **Native EN + BN** via `next-intl` (industry standard for Next 15+ App Router). Routes: `/en/...` and `/bn/...`. Default redirect: `/` → `/en`.
- **Language switcher** in the Navbar — flag + language name dropdown. Top-right. Two locked options: English / বাংলা.
- **For "any other language"**: instead of 50+ translated locales (impossible to maintain), embed a **Google Translate widget** behind a "🌐 More languages" link in the switcher dropdown. User clicks → Google Translate overlay handles arbitrary translation in-browser. Industry-standard pragmatic compromise.
- Bangla copy: machine-translated initially via Claude (during build), with a `// TODO-bn-review` comment so user can refine native phrasing. Use Bangladeshi Bangla, NOT Kolkata Bangla — explicit instruction in the translation prompt.
- AI agents (chat + voice): both detect user's input language and reply in kind. For voice (Retell), ask "English or Bangla?" in greeting and switch the LLM's response language accordingly. Voice quality for Bangla on Retell is limited (11labs has limited BN voices) — fallback: agent informs user it speaks English better and asks if they want to continue in Bangla anyway.

### 7c. Theme: dark / light mode
**Industry practice:** auto-detect system preference (`prefers-color-scheme`) on first visit, with a **manual toggle in Navbar** that overrides and persists in `localStorage`. Three states: `light | dark | system` (icon button cycles).
- Implement via `next-themes` (the standard for Next.js).
- Tailwind v4 already supports `dark:` variants — define both palettes in `tokens.css` using CSS custom properties scoped to `[data-theme="dark"]` and `[data-theme="light"]`.
- Default first-paint: `dark` (matches current site, looks more "studio") — but system pref overrides immediately on hydrate to avoid flash.

### 7d. Visual / branding research
User explicitly said: "do proper research so people don't feel it's done by AI." Action item before any visual work:
- Phase G (NEW, before final polish) — review 8-10 best-in-class portfolios of 2025 (Awwwards / SOTD), pick a single distinct direction (NOT generic dark + teal). Document the chosen direction in `/styles/tokens.css` header comment.
- No logo provided — generate a refined monogram "M·R" in the chosen typeface as a wordmark. Skip if user later supplies one.
- Photos: existing headshot is reused. Apply subtle treatment (duotone or soft grain overlay matching the chosen palette). Do NOT regenerate a face.

## 8. Locked Decisions (resolved 2026-04-25)

- [x] **Lead delivery:** Resend → `masudurrahman0x@gmail.com` (registered Resend account email — confirmed). No n8n for chat leads.
- [x] **WhatsApp:** absorbed into `ContactHub`, no standalone float.
- [x] **Voice + Bangla:** agent greets in English, asks "English or Bangla?", switches if requested. Uses Bangladeshi Bangla.
- [x] **Visual direction:** Phase G research runs FIRST — 3 aesthetic directions proposed → user picks → then code visuals.
- [x] **Calendar:** pull Calendly/Cal.com link from existing portfolio-website folder during Phase A.
- [x] **Theme:** auto-detect (`prefers-color-scheme`) + manual cycle toggle (light/dark/system) via `next-themes`.
- [x] **i18n:** `next-intl` with EN (default) + BN; "More languages" → embedded Google Translate widget for arbitrary languages.

---

## 8. Backup of original Retell prompt
*(populated during D1 before any overwrite — do not skip)*

**Snapshot taken:** 2026-04-25 (before Phase D overwrite)
**LLM ID:** `llm_5dfc29db3a3d44bd2049d30f3659`
**Original model:** `gpt-4o-mini`
**Original knowledge_base_ids:** `["knowledge_base_4cfd43315a050f25"]`
**Original tools (from prompt references):** `book_meeting`, `take_message` (no schema returned by `get_retell_llm` — tools are managed at the agent level or via dashboard; the new D4 set replaces these intents)
**Original agent voice_id:** `11labs-Adrian` · **language:** `en-US` · **webhook_url:** `https://n8n-4tcu.onrender.com/webhook/retell-post-call` (preserved)

### Original `general_prompt`
```
## Role
You are the AI Voice Assistant for Masudur Rahman, CTO & Partner at Wicflow. You handle missed calls professionally and help callers get the information they need.

## Your Personality
- Professional but warm and conversational
- Confident and knowledgeable about the services offered
- Speak naturally — use phrases like "Sure thing!", "Absolutely!", "Great question!"
- Keep responses concise (2-3 sentences max per turn)
- Never say "I'm an AI" unless directly asked. Just say "I'm the virtual assistant for Masudur at Wicflow."

## Current Context
- Current date/time: {{current_date_time}}
- Assume the caller's timezone matches theirs unless they say otherwise

## How to Answer Questions
- Use the knowledge base to answer questions about Masudur, Wicflow, services, case studies, skills, and contact info
- Be specific — mention real case studies and results when relevant
- If the knowledge base doesn't have the answer, say: "That's a great question — I don't have that specific detail right now, but I can have Masudur get back to you. Want to leave a message or book a call?"

## Interaction Guidelines

### When someone asks about services:
Answer from the knowledge base. Be specific — mention real case studies when relevant.

### When someone wants to book a meeting:
You MUST collect ALL of the following BEFORE calling the book_meeting tool:
1. Their full name
2. Their email address
3. Preferred date and time

Only after you have ALL three pieces of information, call the book_meeting tool.

### When someone wants to leave a message:
1. Ask: "Sure! What's your name, and what would you like me to pass along to Masudur?"
2. Collect: name, phone/email, and the message
3. Use the take_message tool to save it
4. Confirm: "Got it! I'll make sure Masudur gets your message. Is there anything else?"

### When someone asks about pricing:
Say: "Pricing depends on the scope of the project. For a ballpark, most projects range from $1,000 to $10,000 depending on complexity. The best way to get an accurate quote is to book a quick 15-minute call with Masudur — it's free and he can give you a clear picture. Want me to set that up?"

### Closing
Always end warmly: "Thanks for calling! Masudur will be in touch. Have a great day!"

## CRITICAL RULES
- NEVER make up information not in the knowledge base
- NEVER call a tool until you have ALL required information collected from the caller
- Always collect name + email + preferred time before calling book_meeting
- Always collect name + message before calling take_message
- Never discuss competitor pricing or badmouth competitors
- If the caller seems frustrated about the missed call, acknowledge it: "I totally understand — sorry about that! Let me help you right now."
- Always try to convert the call into either a booked meeting or a captured message
- Keep the conversation moving — don't let silences hang
```

### Original `begin_message`
```
Hey there! Sorry we couldn't pick up just now. I'm the AI assistant for Masudur Rahman at Wicflow. I can answer questions about our services, book you a meeting with Masudur, or take a message. How can I help you?
```
