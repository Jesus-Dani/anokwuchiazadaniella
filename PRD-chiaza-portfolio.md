# Chiaza Anokwu — Personal Portfolio
### Product Requirements Document
July 2026

---

## 1. Purpose

A personal portfolio for Anokwu Chiaza Daniella — who she is, her ventures, her work, her awards. The site's primary strategic purpose is proof-of-work for The Brand Atelier's "Portfolio That Books You" offer, but the site is about her, not a Brand Atelier sales page.

Identity framing: dual founder-builder. Not "founder who also codes," not "developer who also has a business." Both are equally load-bearing, and the design establishes this from the first line the visitor sees.

During design discussion, this was sharpened further: her relationship with tech is not just building solutions for businesses — it's engineering solutions to whatever problem is in front of her, business or otherwise. RUN Marketplace and Shop With Mercy are business builds; The Dorothy Vaughan Effect solves a career-anxiety problem that isn't a business problem at all. The founder/engineer split reflects this: "founder" covers ventures and community, "engineer" covers applied problem-solving broadly.

## 2. Design reference

`design-demo.html` (delivered alongside this document) is the canonical visual and interaction reference. It's a single-file, working HTML/CSS/JS prototype covering every page's layout, the locked color and type system, and the signature interaction (the cursor-driven founder/engineer split hero). Where this PRD and the demo differ, the demo wins on visual/interaction detail; this document wins on content and scope.

Design system at a glance:

| Element | Spec |
|---|---|
| Base colors | Off-white `#FAFAF7`, near-black `#0A0A0A`, border `#E4E2DC` |
| Accent — founder domain | Electric blue `#2F5FFF` |
| Accent — engineer domain | Acid green `#C6FF3D` (on dark) |
| Typography | Fraunces (serif, headlines/names), Inter (sans, body/UI), JetBrains Mono (engineer-side accents and tags) |
| Signature interaction | Cursor-tracked split hero — founder (light, serif) vs `<engineer/>` (dark, mono), clamped 28–72% |
| Motion level | Moderate — one-time scroll reveals, a single stat count-up, no hover effects on cards |

## 3. Audience

- Potential Brand Atelier portfolio-site clients evaluating her work quality firsthand.
- People encountering her through ventures, the book, speaking, or Tech x Your Department who want the fuller picture.
- Prospective clarity-with-chi session bookers — people with a business idea, a life decision, or a skill they're building who want a structured, honest sounding board.
- Employers, collaborators, or press assessing credibility (awards, radio feature, published book).

## 4. Information architecture

Six dedicated pages off a shared header nav, not one long scrolling page. Home is a teaser layer only — it pulls 2–3 highlights each from Ventures and Built, and links out; it does not contain their full content.

- **About** — bio, part founder/part engineer, personality/curiosities (light, explicitly open-ended), awards & credentials
- **Ventures** — full detail on community and founder-side work
- **Built** — full detail on technical projects, more technical specificity than the hackathon-deck version since a reader who scrolls this far has opted into wanting proof
- **Author** — Mind Your Business plus companion resources, with the Nestuge purchase link
- **Sessions** (branded on-page as "clarity with chi") — the SCULPT framework and a request-to-book form
- **Contact** — socials plus a direct message form

Awards & Credentials and Personality/Curiosities were folded into About rather than given their own pages — both read as part of her story rather than standalone destinations, and a 5–6 item nav was judged the ceiling for "still simple."

## 5. Page-by-page content requirements

### 5.1 Home

- Split hero: name, headline ("I build businesses — and I engineer the solutions around me" or approved variant), one hard number sub-line (₦600M+ vendor sales via RUN Marketplace).
- Ventures teaser: 2–3 cards (title + category tag + one line), "see all" to `/ventures`.
- Built teaser: 2–3 cards, same pattern, "see all" to `/built`.

### 5.2 About

- Bio: born 2007, 400-level Computer Engineering student at Redeemer's University, entrepreneurial journey started ~5 years ago. Voice pulls from *Mind Your Business* — direct, reflective, unafraid of naming failure/uncertainty.
- Part founder / part engineer: short, punchy fact lists (not a numbered skill-percentage gimmick — that read as filler, not credibility, in the reference site we drew from).
- Personality/curiosities: industrial dynasties (Rockefellers, Vanderbilts), Roman Empire and Ethiopian history, colonialism and the transatlantic slave trade, podcasts (Diary of a CEO, Philosophize This), AI's societal impact. Structured so new entries can be added later without restructuring the page. Framed explicitly as ongoing, not a finished list.
- Awards & credentials: Entrepreneur of the Year 2024 (Skilled Student Awards), Diploma in Marketing Management (Alison), Certified Business Coach, Radio One 103.5FM guest feature (Sept 28 2024, hosted by Idara Udoh — topic/context needs confirming before copy is finalized).

### 5.3 Ventures

- The Wealth Intentionalists (founded), the 10-Year Plan (pioneer/advocate), Kingdom Wealth Forum (hosted), pop-up markets (hosted), 3-day business masterclass (50+ businesses), Tech x Your Department (Instagram series).
- Every proper noun gets a one-line "what this is" clause — never assume the visitor already knows.

### 5.4 Built

- Order: RUN Marketplace, Shop With Mercy, The Dorothy Vaughan Effect, beadrev — paying-client and scale credibility first.
- **RUN Marketplace**: founded 2022, 4,000+ members, 500+ active sellers, ₦600M+ vendor sales, built and scaled entirely through WhatsApp — owned confidently as a detail, not downplayed.
- **Shop With Mercy** (shopwithmercywears.com): paying-client build, product categories, wishlist, search, Paystack checkout.
- **The Dorothy Vaughan Effect** (dorathy-vaughan-effect.vercel.app): AI career-direction tool; hackathon origin stays a footnote, not the headline.
- **beadrev** (beadrev.netlify.app): storefront demo, framed plainly as "a project I built," no Brand Atelier sales language.

### 5.5 Author

- *Mind Your Business: The Student Entrepreneur's Guide to Growth, Discipline, and Identity*. Link to Nestuge (nestuge.com/mindyourbusiness), ₦2,000.
- Companion resources, same author: *Money to Wealth* (reflection journal), *Business Audit Workbook*, *Goals & Growth Tracker*, *Revenue Reflection Journal*. All on Nestuge.

### 5.6 Sessions — "clarity with chi"

Positioning: Chiaza is a critical-thinking advocate. She helps people go over their ideas and options truthfully and land on the most logical, beneficial decision toward actualizing their goals. This is a distinct personal offer, not a Brand Atelier service — the brief's "no service pitching" rule is about Brand Atelier specifically, so a clarity-with-chi CTA here is in scope.

- The SCULPT framework (Self, Clarify, Unpack, Locate, Pinpoint, Trajectory) is shown as a named, six-row credibility section — one line per letter. The full three-lens question banks behind each letter are a private session tool and are not published on the site.
- Booking flow: request form, not instant-book. Fields: name, email, "what are you working through." She reviews and replies to confirm a time — this keeps her in control of who gets time.
- Open question carried over from the design conversation: whether the three lenses (business/income idea, personal goal/life decision, skill-building) should be hinted at publicly, or stay entirely inside the session. Not yet resolved — confirm before copy is final.

### 5.7 Contact

- Socials: Instagram @chiaza.anokwu (personal only), LinkedIn (Chiaza Anokwu), email (anokwudaniella@gmail.com).
- Direct message form: name, email, message.
- No Brand Atelier handle here — this section is personal-only.

## 6. Standing content rules

- Nothing gets named without a one-line explanation. Every proper noun (project, platform, certification, publication) gets a "what this is" clause.
- This is a personal site, not a Brand Atelier sales page. No pricing tables or direct service pitching for Brand Atelier; it can be referenced lightly (e.g., in passing on `/contact`) but shouldn't frame the site.
- The WhatsApp/RUN Marketplace mechanism is a detail owned confidently, not downplayed.
- Personality/curiosities sections are explicitly open-ended — copy should never imply these lists are complete.
- Clarity-with-chi pricing, if any, is not addressed by this PRD and should be decided separately — the request-form flow doesn't require a public price.

## 7. Open items (need input before content is final)

- Book list for the personality section — not yet provided.
- Historical figures beyond Rockefellers/Vanderbilts — open-ended, more can be added.
- Podcast list beyond Diary of a CEO / Philosophize This — open-ended.
- Radio One 103.5FM feature: confirm topic/context (work, book, or RUN Marketplace) before finalizing that credential's copy.
- Whether the three SCULPT lenses are named publicly on the sessions page (see 5.6).
- Final hero headline wording — brief's original draft ("I build businesses — and I build the software that runs them") vs. the broadened engineer framing used in the demo ("I engineer the solutions around me"). Confirm which ships.

## 8. Out of scope

- Brand Atelier service pages, pricing, or booking — that lives on a separate Brand Atelier site/funnel, not here.
- Blog/CMS — not part of the locked sitemap; revisit only if a real content cadence emerges.
- E-commerce functionality on this site itself — Shop With Mercy and RUN Marketplace are referenced, not rebuilt here.
