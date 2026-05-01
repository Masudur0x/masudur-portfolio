# Visual Direction Research — Masudur Rahman Portfolio

**Phase:** G1 (research only — no code yet)
**Goal:** Lock a single distinct aesthetic direction that does NOT read as "generic dark + teal AI startup template," is credible for a CTO selling voice AI + workflow automation to SMB and enterprise buyers, and looks intentional rather than AI-generated.
**Constraints carried in from earlier phases:**
- Must support both light and dark themes (next-themes is wired).
- Must accommodate Bangla (Hind Siliguri) alongside the chosen Latin face.
- Must work for: a typing-effect Hero, 4 service cards, project case studies, an embedded chat widget, a voice "Live" button, a Contact Hub.
- Must not collapse under copy density — Masudur's persona is "expert / build-with-you," not "playful agency."

---

## Survey input (2025 references the directions below pull from)

Sites and studios reviewed for visual cues. Linked where the URL is stable; otherwise named so the user can search.

- **Linear** (linear.app) — restrained, motion-precise, monochrome with one accent.
- **Vercel** (vercel.com) — engineering-grade type, dense grids, sharp.
- **Anthropic** (anthropic.com) — warm cream, editorial serif, calm.
- **Stripe Press** (press.stripe.com) — Bauhaus-revival, generous space, warm palette.
- **Read.cv / Cosmos.so** — soft studio aesthetic, rounded panels, warm neutrals.
- **Replicate, Cursor, Phantom** — operator/terminal feel, mono type, hairline rules.
- **Olivier Larose, Robin Noguier, Studio Freight, Locomotive** — editorial portfolios with massive display type and slow, deliberate motion.
- **Awwwards SOTD 2025 archive, godly.website, siteInspire** — used as a sweep for what is *not* yet over-used. Rejected: glassy bento grids, neon teal/violet gradients, glowing "orb" hero canvases, generic 3D blob heroes — all read as 2023-era AI cliché.

---

## Direction 1 — "Editorial Engineering"

**One-line:** Swiss editorial portfolio. Massive serif display type, narrow text columns, mono captions, restrained motion. Reads like *Bloomberg Businessweek* meets a senior engineer's notebook.

**Mood:** Considered. Calm. Expensive. Not loud — confident.

**Palette (proposed seeds, will be tuned in G3):**
- Light: `#F4F1EA` paper / `#111111` ink / single accent: deep oxblood `#7A1F2B` or ink-blue `#1F2A6E`.
- Dark: `#0F0E0C` near-black / `#EDE7DA` warm bone / same accent slightly desaturated.
- No teal. No violet. No gradient fills.

**Typography:**
- Display: a contemporary serif with character — **PP Editorial New**, **GT Sectra**, or open-source fallback **Fraunces** (variable, free).
- Body: **Inter** or **PP Neue Montreal** at a generous size (18–19px base).
- Caption / metadata: **JetBrains Mono** or **TX02 Mono** at 12–13px in muted ink.
- Bangla: Hind Siliguri (already loaded) — pairs cleanly with Fraunces and Inter.

**Layout:**
- 12-col grid but text columns deliberately narrow (max 56ch). Generous left/right whitespace on desktop.
- Section dividers: hairline 1px rules in muted ink, never glow.
- Service cards: no cards. Use numbered editorial entries (`01 — Voice AI Agents`) with a thin top rule and a 2-line abstract, like a magazine table of contents.

**Motion:**
- Slow, frame-perfect easing (cubic-bezier(0.65, 0, 0.35, 1), ~600ms).
- Text reveals: one line at a time, no stagger-shimmer.
- Hero typing effect stays, but the cursor is a thin vertical bar in the accent color.
- Zero parallax, zero scroll-jacking.

**Why it fits Masudur:**
- Signals seniority and editorial taste — distances him from the wave of "AI agency" sites that all look the same.
- The narrow columns force concise copy, which suits the "expert / no fluff" persona.
- Accent color used sparingly = every CTA earns attention.

**Risks:**
- Heaviest copywriting bar — every headline has to actually be good or the whitespace exposes it.
- Less obvious "tech / AI" signaling — relies on copy and case studies to do that work.

**Best-in-class references:** Mathieu Garnier portfolio, Robin Mastromarino, Pentagram studio site, Anthropic homepage (warm-serif corner of it).

---

## Direction 2 — "Operator Terminal"

**One-line:** Brutalist developer aesthetic. Mono everywhere, hairline borders, off-black canvas with a single phosphor accent. The portfolio of someone who lives in a terminal and ships agents.

**Mood:** Technical. Honest. Slightly defiant. Reads as "I actually build this stuff" — not "I market it."

**Palette:**
- Dark (primary): `#0A0A0A` true near-black / `#E6E6E6` off-white / accent: signal green `#9EFF8F` *or* hot magenta `#FF3D81` (pick one, not both). Optional dim warning amber for tool-call states.
- Light: `#F5F5F2` near-paper / `#0A0A0A` ink / same accent slightly muted.
- All borders are 1px `rgba(255,255,255,0.08)` in dark, `rgba(0,0,0,0.08)` in light.

**Typography:**
- Display + body: a single mono family — **Berkeley Mono** (paid), **JetBrains Mono** (free), or **Söhne Mono** (paid). Sized variably: 56–72px display, 16px body, 12px metadata.
- Optional grotesque sans for a single accent slot (e.g., the wordmark only): **Söhne** or **PP Neue Montreal**.
- Bangla: Hind Siliguri — sized one notch larger to compensate for the visual weight of mono Latin nearby.

**Layout:**
- Dense, terminal-inspired chrome: `[A]` keyboard hints, `>` prompts, hex labels next to colors, `~` tildes as section markers.
- Hero: an actual mock terminal pane streaming Masudur's intro line by line, then settling into a quiet status bar at the bottom of the viewport (`STATUS: AVAILABLE · BD/UTC+6 · LISTENING`).
- Service cards: ASCII-bordered blocks (using real CSS, not characters) with `RUN` / `OPEN` action labels.
- Voice button: a literal `[ MIC LIVE ]` pill that pulses on hover.

**Motion:**
- Snappy (150–250ms), cursor-style underscore blink, character-by-character reveals only on Hero and chat output.
- Subtle CRT scanline overlay (very faint, ~3% opacity) only on the Hero canvas — not the whole page.

**Why it fits Masudur:**
- Voice AI + custom-coded automation IS terminal-shaped work. The aesthetic *is* the proof of work.
- Strongly differentiated from generic "AI consultant" sites.
- Mono-everywhere makes typing-effect Hero and chat widget feel native, not bolted-on.

**Risks:**
- Can read as "developer hobby site" if executed without care — needs editorial discipline in copy.
- Bangla in mono pairings is harder to balance visually; Hind Siliguri may feel too "soft" beside hard Latin mono. Solvable with sizing + weight, but a real consideration.
- Less inviting to non-technical SMB buyers who can't read the visual language.

**Best-in-class references:** Replicate.com, Linear's changelog, Phantom wallet, Cursor.com, Lambda Labs marketing pages.

---

## Direction 3 — "Soft Studio"

**One-line:** Warm Bauhaus-revival minimalism. Cream/sand canvas, deep-ink type, one warm accent, generous rounded panels. Premium-but-friendly — the studio of an expert who is also approachable.

**Mood:** Warm. Premium. Confident without being austere. Sits between Stripe Press, Anthropic.com, and Read.cv.

**Palette:**
- Light (primary): `#F2EDE4` warm sand / `#1A1612` deep ink / accent: terracotta `#D2602F` *or* mustard `#C8932B` *or* tomato `#E2543C`. Pick one, hold it tight.
- Dark: `#16110D` warm near-black / `#F2EDE4` cream / same accent.
- Soft secondary tint: `#E8DECB` for card surfaces in light, `#1F1813` in dark.

**Typography:**
- Display: a humanist grotesque with personality — **PP Neue Montreal**, **Söhne**, or open-source **Geist** / **Inter Display**.
- Body: same family, lighter weight, 17–18px.
- Optional accent serif for pull-quotes only — **Fraunces** italic.
- Bangla: Hind Siliguri pairs naturally here — both feel humanist.

**Layout:**
- Big rounded panels (24–32px radius). Soft 1px borders + subtle inner highlights instead of hard rules.
- Section spacing is generous, with one "hero asset" per section (a screenshot, a diagram, a single quote).
- Service cards: rounded panels, icon top-left, headline, 2-line abstract, soft hover lift.
- Hero: full-bleed warm canvas, large headline left, headshot duotoned in palette colors right.

**Motion:**
- Subtle Y-translate fade-ins (16–24px, 500ms, ease-out).
- Hover states: warm glow shadow, 2–3px lift.
- Typing effect kept but with a soft accent-color underline cursor.

**Why it fits Masudur:**
- Warm palette is a deliberate counter-signal to the "cold blue AI startup" wave — visually says "human collaborator," matches the "build-with-you" service.
- Light mode is the strong default here, which inverts the current site's dark-by-default and feels distinctly different.
- Bangla rendering is most natural in this direction.

**Risks:**
- Closest of the three to current "tasteful 2025 SaaS" trend — best-in-class but less radically distinctive than #1 or #2.
- The accent color choice is load-bearing — get it wrong and it slides into "agency template."

**Best-in-class references:** press.stripe.com, anthropic.com, read.cv, cosmos.so, linear.app/blog, framer.com.

---

## Side-by-side at a glance

| Axis              | 1. Editorial Engineering     | 2. Operator Terminal         | 3. Soft Studio                |
| ----------------- | ---------------------------- | ---------------------------- | ----------------------------- |
| Default theme     | Light (paper)                | Dark (near-black)            | Light (sand)                  |
| Type DNA          | Serif display + sans body    | Mono everywhere              | Humanist grotesque            |
| Accent strategy   | One sparing dark accent      | One vivid signal accent      | One warm earth accent         |
| Motion            | Slow, magazine-like          | Snappy, terminal-like        | Soft, easing-out              |
| Risk              | Demands great copy           | Can feel "dev hobby"         | Closest to current SaaS trend |
| Differentiation   | Very high (rare in tech)     | Very high (genre-defining)   | High (well-executed-trend)    |
| Bangla pairing    | Excellent                    | Workable, needs tuning       | Excellent                     |
| SMB approachability| Medium                      | Lower                        | Highest                       |
| "I built this"    | Implied via taste            | Loud and explicit            | Implied via polish            |

---

## Recommendation (for user to consider, not decide)

If I had to pick one without the user's input, I'd narrow to **#1 Editorial Engineering** or **#2 Operator Terminal**, and lean #2 — because it makes voice AI / automation feel *native* to the surface rather than decorated. But this is a taste call the user must make.

---

## DECISION (2026-04-26)

**User reviewed all three proposed directions and chose to KEEP THE CURRENT visual direction** (the existing dark canvas + teal/amber palette already in `src/styles/tokens.css` as of Phase F.0). None of the three proposed directions above were adopted.

- G2: closed — user picked "stay with current."
- G3: no token rewrite needed. The current palette in `src/styles/tokens.css` is the locked direction. Both dark and light variants remain as defined in F.0.
- This file is kept as a record of the directions that were considered and rejected, in case a future revisit is wanted.
