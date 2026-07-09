# Chiaza Anokwu — Personal Portfolio
### Technical Requirements Document
July 2026

---

## 1. Reference implementation

`design-demo.html`, delivered alongside this document, is a working single-file HTML/CSS/JS prototype of the full locked design: every page's layout and copy, the design tokens, and the hero's cursor-driven interaction, with the scroll-reveal, stat-counter, and reduced-motion logic already implemented and functional. It is the canonical implementation reference for everything in this document — when in doubt, read the code rather than re-deriving behavior from prose.

The demo is a single scrollable file with anchor-linked sections (`#about`, `#ventures`, etc.) for easy review in one tab. The production build should **not** ship this way — see Section 3.

## 2. Recommended stack

- Static site — no server-rendered backend needed. Content is fixed and edited directly in source, not pulled from a CMS (no content cadence high enough to justify one per the PRD's out-of-scope note).
- Plain HTML/CSS/JS (as in the demo) is sufficient and keeps the build simple and fast — no build step, no framework overhead, easy to hand-edit. Recommended given the site's scope (6 pages).
- If a component-based workflow is preferred instead (shared nav/footer without copy-pasting across 6 files), Astro is a reasonable lightweight alternative — static output, island-style JS only where needed (the hero interaction), minimal runtime cost. Either path is compatible with everything else in this document.
- Hosting: Netlify, consistent with existing Brand Atelier practice. Use a dedicated Netlify account for this site (not shared with client projects) to avoid credit-pool contention.

## 3. Site structure

Six real pages/routes, not one long scroll — this was an explicit design correction during the design pass. Each page shares the same header nav and footer.

```
/           → home (hero + ventures/built teasers)
/about      → bio, part founder/part engineer, personality, awards
/ventures   → full ventures & community detail
/built      → full technical project detail
/author     → book + companion resources
/sessions   → "clarity with chi," SCULPT framework, request form
/contact    → socials + message form
```

If using plain HTML, this means `/about.html`, `/ventures.html`, etc., each including the same `<nav>` and `<footer>` markup (or assembled via a simple include step at build time — even a basic script that stitches a shared `header.html`/`footer.html` into each page avoids hand-syncing six copies of the nav).

## 4. Design tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FAFAF7` | Page background |
| `--ink` | `#0A0A0A` | Primary text, dark panel backgrounds |
| `--muted` | `#5A594F` | Secondary/body copy |
| `--muted-2` | `#9A988C` | Tertiary text, hints, captions |
| `--border` | `#E4E2DC` | Hairline borders, card outlines |
| `--blue` | `#2F5FFF` | Founder-domain accent |
| `--green` | `#C6FF3D` | Engineer-domain accent (on dark backgrounds only) |
| Serif | Fraunces, 500/600 | Headlines, names, section titles |
| Sans | Inter, 400/500 | Body copy, nav, UI labels |
| Mono | JetBrains Mono, 400/500 | Engineer-side accents, tags, code-styled labels |

Fonts load via Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) as in the demo's `<link>` tags. Self-hosting the font files is a reasonable follow-up optimization but not required for launch.

## 5. Component inventory

- **Nav** — sticky header, six text links, smooth-scroll or route to page.
- **Split hero** — see Section 6 for interaction spec.
- **Teaser card** — title, category tag, one-line description. Flat, no hover state (explicitly removed during design review).
- **Project row** — used on `/ventures` and `/built`: title, category tag, full paragraph. Founder-domain rows use blue tags on light background; engineer-domain rows use mono green tags on dark background.
- **SCULPT row** — six repeated rows, letter + name + one line, used once on `/sessions`.
- **Form** — two instances (request-a-session on `/sessions`, message on `/contact`). Same visual component, different fields/labels/submit copy.
- **Footer** — copyright line + repeated nav + social links, present on every page.

## 6. Interaction specifications

### 6.1 Split hero (signature interaction)

- On mousemove over the hero container, compute cursor X as a percentage of container width.
- Clamp that percentage to 28–72% (neither side should ever fully swallow the other).
- Apply the clamped value as a CSS `clip-path: inset(0 0 0 X%)` on the dark/engineer panel, which sits absolutely positioned over the light/founder panel.
- A center "orb" (initials avatar) tracks the same X value via its `left` position.
- Transition both properties (~180ms ease-out) so the movement feels smooth rather than stepped.
- On mouseleave, animate back to a 50/50 split (`clip-path: inset(0 0 0 50%)`).
- **Touch/mobile**: no cursor exists, so default to a static 50/50 split. Do not force a tap-and-drag gesture as a replacement — it's not discoverable and isn't worth the engineering cost for a decorative interaction. A slow, subtle auto-drift is an acceptable optional enhancement, not a requirement.
- **prefers-reduced-motion**: disable the mousemove listener entirely; render a static 50/50 split with no transition.
- Reference implementation: see `#engineerPanel`, `#orb`, and the mousemove listener in `design-demo.html`.

### 6.2 Scroll reveals

- Each major section fades up (~14px translateY, opacity 0→1) the first time it crosses roughly 15–20% into the viewport, implemented via `IntersectionObserver` with threshold ~0.15.
- One-time trigger only — unobserve after firing. Do not re-animate on scroll back up.
- **prefers-reduced-motion**: apply the "revealed" state immediately on load, skip the observer and transition entirely.

### 6.3 Stat counter

- The ₦600M+ figure in the hero counts up from 0 over ~800ms using `requestAnimationFrame`, triggered once via `IntersectionObserver` when the hero enters view.
- **prefers-reduced-motion**: render the final value immediately, no animation.

### 6.4 Explicitly excluded

- No hover effects on ventures/built cards — removed during design review in favor of a flatter, quieter surface.
- No shrink/blur-on-scroll nav behavior — judged as competing with the hero for attention.

## 7. Forms and backend

Both forms (sessions request, contact message) need a submission backend. Since there's no custom server in this stack, use a static-friendly form handler:

- Netlify Forms is the simplest option given Netlify hosting — add a `netlify` hidden input / `data-netlify="true"` attribute and Netlify handles submission storage and email notification with no additional backend code.
- Alternative: Formspree or a similar form-as-a-service if Netlify Forms' spam-filtering or submission limits become a problem.
- Notification email should go to anokwudaniella@gmail.com for both forms.
- Sessions form fields: name, email, "what are you working through" (long text). Contact form fields: name, email, message.
- Add basic spam protection (honeypot field or Netlify's built-in spam filtering) — no need for a full CAPTCHA given expected volume.
- Client-side validation (required fields, email format) plus a visible confirmation state after submit ("thanks, I'll reply within a few days" per the sessions page copy).

## 8. Performance requirements

- No JS framework runtime is needed for a 6-page content site with one interactive component — keep total JS minimal (the demo's inline script is under 100 lines).
- Images (book cover, any project screenshots added later) should be served as optimized WebP with explicit width/height to avoid layout shift.
- Fonts: use `font-display: swap` (already implied by the Google Fonts default) so text isn't blocked on font load.
- Target: Lighthouse performance score 90+ on the home page; this is realistic given the site's simplicity as long as images stay optimized.

## 9. Accessibility requirements

- Respect `prefers-reduced-motion` everywhere motion is used (hero split, scroll reveals, stat counter) — already specced above.
- Color contrast: verify blue (`#2F5FFF`) on off-white and green (`#C6FF3D`) on near-black both meet WCAG AA for the text sizes used; adjust shade if a specific pairing fails (e.g., the JetBrains Mono body copy at 12–13px on dark is the tightest case to check).
- Semantic HTML: real `<nav>`, `<section>`, `<form>`, `<label>` elements (as in the demo) rather than div soup, so the site is usable with a screen reader without extra ARIA scaffolding.
- Visible focus states on all interactive elements (nav links, buttons, form fields) — not just mouse hover states.
- The split hero is decorative/interactive flavor, not the only way to reach its two links ("view my work" / "see ventures") — those remain standard, keyboard-reachable links regardless of cursor position.

## 10. Responsive behavior

- Breakpoint around 720px: hero splits stack or reduce padding, multi-column sections (about's two lists, forms' two-field rows, project rows) collapse to a single column.
- Nav: six links should still fit at mobile widths without wrapping awkwardly — reduce font size and gap before considering a hamburger menu; a hamburger is a reasonable fallback if six links genuinely don't fit at the smallest supported width.
- See the demo's existing `@media (max-width: 720px)` block as a starting point — it already collapses the grid-based sections.

## 11. Browser support

Evergreen browsers (current Chrome, Safari, Firefox, Edge) — the newest CSS feature in use is `clip-path` with a percentage inset value, which has broad modern support. No IE11 or legacy-browser support is required.

## 12. Open technical questions

- Confirm Netlify vs. an alternative static host — Netlify assumed based on prior Brand Atelier practice, not yet explicitly confirmed for this specific site.
- Domain: confirm whether this site gets its own custom domain and what it is.
- Analytics: not yet discussed — confirm whether basic privacy-respecting analytics (e.g., Plausible or Netlify Analytics) should be added, given clarity-with-chi is meant to function as a funnel and conversion visibility would be useful.
- Whether to build as plain multi-page HTML (fastest to ship, matches the demo directly) or migrate to Astro for shared-component convenience — recommend plain HTML for launch given the site's small page count, revisit only if maintenance friction shows up.
