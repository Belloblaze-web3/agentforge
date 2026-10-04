# AgentForge implementation plan

## Product direction

AgentForge is a conversion-focused marketplace for renting specialist AI operators for ads, social media automation, virtual assistance, content creation, video creation, and crypto/meme intelligence. The initial experience is a responsive single-page website with a local, front-end-only inquiry flow so visitors can discover and shortlist agents without waiting on backend setup.

## Design direction

- **Design movement:** Dark editorial operations desk — part high-end agency roster, part real-time control room.
- **Core principles:** Make capability legible in seconds; keep pricing visible; use sharp contrast and rhythm; make every surface feel actionable.
- **Color philosophy:** Near-black ink (#0b0d0f) creates focus and premium density. Acid lime (#d8ff3e) is the ownable signature color and signals motion, readiness, and high-leverage work. Warm white and muted slate keep long-form copy readable, while small coral/violet notes distinguish specialties.
- **Layout paradigm:** Asymmetric split sections and staggered cards rather than a centered SaaS grid. The hero uses an editorial left rail and a compact live-ops panel; the catalog alternates full-width headings with dense cards.
- **Signature elements:** Lime status pips, outlined “signal” labels, and offset stat blocks that echo an operator’s dashboard.
- **Interaction philosophy:** Filters feel like routing a job to the right operator; cards expose enough proof and price to support a decision without extra clicks. Inquiry is a short, low-friction handoff.
- **Animation:** Use restrained lift/fade reveals, a soft scanline shimmer on live status surfaces, and fast 160–220ms transitions on filters, buttons, and modal states. Avoid distracting looping effects.
- **Typography system:** Space Grotesk for headlines and labels, Inter/system sans for body copy. Headings are large, tight, and sentence-case; labels use compact uppercase tracking.
- **Brand essence:** Rent the right AI operator for the next move — direct, practical, and built for momentum. Personality: **decisive, sharp, credible**.
- **Brand voice:** Say what the operator does, what it costs, and what happens next. Example lines: “Put your next growth loop on autopilot.” / “Choose a specialist. Ship the work.”
- **Wordmark & logo:** AG monogram built from two offset brackets, paired with a compact wordmark. It appears as a lime outlined mark in the nav and footer.
- **Signature brand color:** AgentForge Acid — `#d8ff3e`.

## Project structure

- `server.js` — zero-dependency static server honoring the managed `PORT`.
- `index.html` — page structure, marketing copy, catalog shell, inquiry modal.
- `src/main.js` — agent data, category/search filtering, modal flow, mobile navigation, reveal interactions.
- `src/styles.css` — responsive dark editorial visual system and components.
- `public/manus-routes.json` — declared page routes for preview and publication.
- `app.config.ts` — platform project logo metadata.

## Behavioral scope

The first version uses curated agent data in the browser. Booking/inquiry submission is a demo flow that confirms the visitor’s selected operator and project brief locally; it is intentionally not wired to a persistent database or payment processor until those services are requested.
