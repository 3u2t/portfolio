# Portfolio

Personal developer portfolio of Tom (`3u2t`) — a young developer and
technology enthusiast from Germany. The site presents real web projects,
a Raspberry Pi home server, and hands-on Linux / self-hosting / hardware
interests, honestly and without exaggeration.

`four04.de` is Tom's personal technology ecosystem: the domain and
infrastructure under which his web projects and self-hosted services live
(Cloudflare DNS + Tunnel, Docker on Linux/Raspberry Pi). It is both a
project showcased on this site and the canonical home of the deployed
portfolio itself.

## About the Project

- **What it is:** a personal technology portfolio — one page plus one
  detail page per project (`/projects/[slug]`).
- **Purpose:** show what Tom actually builds, runs and maintains, and make
  it easy to get in touch via GitHub.
- **Design philosophy:** dark, quiet, developer-native. Almost-black
  surfaces, one restrained accent, terminal-inspired details, generous
  whitespace. It should read as "young developer + homelab + Linux +
  modern web dev" — never as a SaaS landing page, crypto site, or
  AI-startup template.
- **Target audience:** other developers, technically curious visitors, and
  anyone checking Tom's work via GitHub.
- **Authenticity rule (binding):** this portfolio must represent a
  14-year-old learning by building. It must **not** invent experience,
  job history, statistics, certifications, awards, testimonials, companies
  or skills. GitHub numbers are loaded live from the API; if the API is
  unreachable the site shows placeholders instead of fake data. Fewer
  honest projects are always better than outdated filler.

## Tech Stack

Only technologies actually present in this repository:

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 16 (App Router), React 19               |
| Language   | TypeScript                                      |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` config)     |
| Fonts      | Geist + Geist Mono via `next/font`              |
| Data       | Local TypeScript modules in `src/lib` (no CMS)  |
| GitHub     | Live integration via `src/app/api/github/route.ts` |
| Hosting    | Vercel (primary)                                |
| Fallback   | Docker, `output: "standalone"`, ARM64-ready for Raspberry Pi |
| Access     | Cloudflare Tunnel compatible (no open ports needed) |

See `package.json` for exact versions.

## Features

Everything below is implemented — nothing speculative:

- Responsive single-page portfolio (desktop, laptop, tablet, mobile) with
  hamburger navigation and sticky blurred header
- Sections: Hero, About, Currently Building, Projects, Stack & Skills,
  Homelab, AI workflow, Beyond Software (FPV), GitHub, Contact, Footer
- Project detail pages at `/projects/[slug]`, statically generated
- Live GitHub section (`api.github.com/users/3u2t`, 1-hour cache) with
  skeleton loading and an offline fallback — never fake numbers
- SEO: metadata, Open Graph + Twitter cards, JSON-LD `Person` schema,
  `sitemap.xml`, `robots.txt`, web-manifest, semantic HTML, one H1
- Accessibility: skip-to-content link, focus-visible states, labeled
  menu/modal controls, `aria-hidden` decor, good heading hierarchy
- `prefers-reduced-motion` support (terminal animation and reveals off)
- Subtle terminal hero visual, scroll-reveal, status dots, no heavy
  animation libraries
- Docker deployment via multi-stage `Dockerfile` (`node:20-alpine`,
  non-root user, ARM64-compatible for Raspberry Pi)
- `.dockerignore` to keep the build context lean
- Command palette (`Cmd/Ctrl+K` or the `⌘K` button): fuzzy search over
  sections, projects and actions (copy links, open GitHub)
- Konami easter egg (`↑↑↓↓←→←→BA`): toast with aura counter, persisted in
  localStorage, ignored inside inputs
- Homelab service cards: click to expand per-service details (accessible
  accordion with `aria-expanded`)
- Bot blocking in `src/proxy.ts` (scraper user-agents get 403, same list as
  the site beacon) + security headers in `vercel.json`
- Site beacon at `/api/health` (rate-limited, delivery optional via env)
  with a footer disclosure — no cookies

## Project Structure

```text
portfolio/
├── Dockerfile              # Pi/VPS fallback: standalone Next.js image
├── .dockerignore           # keeps node_modules/.next/.git out of builds
├── vercel.json             # security headers (Vercel only)
├── src/
│   ├── proxy.ts            # bot-UA blocking (403 before routes render)
│   ├── app/
│   │   ├── layout.tsx      # fonts, global metadata/OG, Nav, Footer, JSON-LD
│   │   ├── page.tsx        # homepage: composes all sections in order
│   │   ├── globals.css     # Tailwind v4 theme tokens, reveal/motion CSS
│   │   ├── projects/[slug]/page.tsx  # static project detail pages + metadata
│   │   ├── api/github/route.ts       # cached proxy to api.github.com
│   │   ├── api/health/route.ts       # site beacon (rate-limited GIF + delivery)
│   │   ├── sitemap.ts / robots.ts / manifest.ts
│   ├── components/         # one component per section + UI primitives
│   │   ├── Nav / Hero / TerminalVisual / About / CurrentlyBuilding
│   │   ├── Projects / Stack / Homelab / AiWorkflow / BeyondSoftware
│   │   ├── GithubSection / Contact / Footer / SiteBeacon
│   │   ├── CommandPalette / Konami (global: layout-mounted)
│   │   └── Reveal / SectionHeading / Badge / StatusDot (primitives)
│   └── lib/                # ★ content lives here — edit these files
│       ├── projects.ts     # project cards + detail pages (see below)
│       ├── now.ts          # "Currently building" list
│       ├── skills.ts       # non-programming skill groups + tech badges
│       ├── site.ts         # links, handle, email placeholder, nav
│       └── github.ts       # server-side GitHub fetch helper
└── public/
    └── favicon.svg         # terminal "~$" mark
```

Key files in detail:

- `src/app` — App Router routes, layouts and route-level metadata. The
  homepage composes section components; nothing content-heavy lives here.
- `src/components` — presentational sections. `GithubSection` and `Nav`
  / `TerminalVisual` / `Reveal` are client components; the rest are server
  components.
- `src/lib` — the content layer. Changing portfolio *content* almost always
  means editing exactly one file here, not components.
- `src/app/projects/[slug]` — `generateStaticParams()` builds one page per
  entry in `src/lib/projects.ts`; unknown slugs render `notFound()`.
- `src/app/api/github` — GET returns `{ ok, repos }` with a reduced field
  set (name, description, language, stars, url). Cached 1 hour; the client
  treats any failure as "offline" and shows placeholders.
- `src/proxy.ts` — bot-UA 403 for the whole site (see Bot protection).
  Name and export follow the Next 16 `proxy` convention, not `middleware`.
- `src/app/api/health` — site beacon (see Site beacon). Needs no env to
  run.
- `src/lib/projects.ts` — the project source of truth: slug, title,
  tagline, `live | building | experiment` status, stack badges, real links
  only, body paragraphs, highlights. Comment at the top explains the shape.
- `src/lib/now.ts` — short `active | ongoing | learning` items for the
  "Currently building" section.
- `src/lib/site.ts` — GitHub URL, website URL, email placeholder (+ note),
  navigation links.

## Content Management

| To change…              | Edit…                  |
| ----------------------- | ---------------------- |
| Projects (add/remove)   | `src/lib/projects.ts`  |
| Currently building      | `src/lib/now.ts`       |
| Skill groups / badges   | `src/lib/skills.ts`    |
| GitHub/website/email/nav| `src/lib/site.ts`      |
| GitHub username / count | `src/lib/github.ts` + `src/components/GithubSection.tsx` |
| Page metadata / OG      | `src/app/layout.tsx`   |
| Section copy            | the component in `src/components/` |

Rules for content edits: only link URLs that exist (omit otherwise), only
list technologies actually used, never add stats/experience/certifications,
keep everything English-only, and keep the `hello@four04.de` placeholder
note until mail on the domain genuinely works.

## Local Development

Requirements: **Node.js 20.9+** (Next.js 16 requirement; developed with
Node 24), npm (lockfile committed).

```bash
git clone https://github.com/3u2t/portfolio.git
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000.

**Environment variables:** none. The app calls the public GitHub
API server-side without authentication, and every route runs without
configuration. Local-only secrets (if you ever add any) belong in
`.env.local` (gitignored) — never commit them, and never invent variables
the code doesn't read.

Production check locally:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

## Verification

Run before every commit / PR:

```bash
npm run lint
npm run build
```

Both must pass. Additionally, spot-check `/`, one `/projects/[slug]`
page, and `/api/github` (expect `{"ok":true,…}` or a graceful offline
fallback). After structural CSS changes, resize to 390 / 768 / 1440 px
and keyboard-tab through nav, cards and links.

## Deployment

### Vercel (primary)

Import `3u2t/portfolio` on Vercel with defaults (`npm run build`,
`.next` output). No environment variables needed. Pushes to the default
branch redeploy automatically. Canonical URL: `https://four04.de`.

### Raspberry Pi (fallback)

`next.config.ts` sets `output: "standalone"`, so the build produces a
self-contained server:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

The image is multi-stage (`node:20-alpine`), runs as non-root `nextjs`,
and builds for ARM64 (`docker buildx build --platform linux/arm64`),
so it runs on a Raspberry Pi 4 running Debian/Raspberry Pi OS with Docker.

### Cloudflare Tunnel (no open ports)

Expose the local container without router port-forwarding:

```bash
cloudflared tunnel --url http://localhost:3000
```

For permanent hosting, create a named tunnel and route `four04.de` (or a
subdomain) to `http://localhost:3000` in the Cloudflare Zero Trust
dashboard. Never commit tunnel credentials, `config.yml` secrets, or
`cert.pem` — they stay on the Pi / in Cloudflare, out of Git.

### Bot protection

Two layers, both active:

1. **Vercel edge (managed rulesets, same as `selfmade-guns-lol`):**
   `bot_protection` → `challenge` (suspected bots get the Vercel Security
   Checkpoint), `ai_bots` → `deny`. Enabled via CLI/API, no dashboard
   clicks needed:
   ```bash
   vercel link --project portfolio --yes   # once per machine (.vercel/ is gitignored)
   vercel api "/v1/security/firewall/config?projectId=<id>"   # read
   # enable: PATCH {"action":"managedRules.update","id":"bot_protection",
   #   "value":{"active":true,"action":"challenge"}}  (applies immediately)
   ```
   Note: `vercel firewall overview` needs a Pro team (402 on Hobby) — use
   the `vercel api …/firewall/config` read above instead.
2. **In code (`src/proxy.ts`, works on Vercel and Pi):** requests whose
   user-agent matches known tooling (`curl`, `wget`, `python-requests`,
   `go-http-client`, `headlesschrome`, `sqlmap`, …) get a plain 403 before
   any route renders. Empty user-agents are allowed on purpose (privacy
   browsers). Same list as the site beacon (`src/app/api/health`).
3. `vercel.json` — baseline security headers on Vercel
   (`nosniff`, strict referrer policy, `DENY` framing, minimal
   permissions policy).

Optional dashboard hardening (manual, Vercel project settings): enable
**Attack Challenge Mode** under Security to challenge suspicious traffic.
That cannot be toggled from this repo or via CLI — it is a dashboard
switch. Bot traffic that matters is already stopped by the proxy.

### Site beacon (`/api/health`)

Lightweight page-view beacon:

- `GET /api/health` answers with a 1×1 transparent GIF, dedupes per IP
  (60s, best-effort in-memory — per-instance on serverless), and 403s the
  same bot user-agents as the proxy.
- Fired once per page load by `<SiteBeacon />` in the root layout.
- A one-line disclosure lives in the footer. Note: visitor IPs are
  personal data under GDPR — keep the disclosure, and add a proper privacy
  notice if the site ever serves significant EU traffic.

## Git Workflow

1. `git pull` latest changes.
2. For larger changes, branch: `git checkout -b <type>/<short-topic>`
   (`feat/`, `fix/`, `content/`, `chore/`).
3. Make the change (content → `src/lib/*`; see Content Management).
4. Run `npm run lint` and `npm run build`.
5. Review the diff: `git status`, `git diff`.
6. Commit with a clear message, push, open a PR if appropriate.

Commit examples:

```text
content: remove outdated food-randomizer project
feat: add project detail page OG images
fix: mobile nav stays open after navigation
chore: bump next to 16.x
```

## Contributor Notes

Read this before touching the code — it encodes decisions the owner has
already made.

- **Inspect first:** read `src/lib/*`, the relevant component, and
  `package.json` before changing anything. Reuse existing components
  (`Badge`, `StatusDot`, `SectionHeading`, `Reveal`) instead of creating
  duplicates.
- **Change sizes:** prefer small, focused diffs. Content edits should stay
  inside `src/lib/*`.
- **Change types and their blast radius:**
  - *Content change* (`src/lib/*` copy, projects, links) — safe, just keep
    it honest and English-only.
  - *Component change* (styling/sections in `src/components/*`) — preserve
    the visual identity (see Design System) and responsive behavior.
  - *Architecture change* (routing, data flow, new deps) — avoid unless
    asked; justify it and update this README.
  - *Deployment/infrastructure change* (`next.config.ts`, `Dockerfile`,
    hosting) — never change without understanding the Vercel-primary /
    Pi-fallback setup; test the Docker build if you touch it.
- **Never invent:** no portfolio projects, links, statistics, experience,
  certifications, awards, testimonials, or GitHub numbers. Use the live
  GitHub API path that already exists; offline → placeholders.
- **Guardrails:** keep English-only, keep accessible (landmarks, labels,
  focus states, heading order), keep responsive, respect
  `prefers-reduced-motion`, keep the site fast (no new animation or font
  libraries without need).
- **After meaningful changes:** run `npm run lint` and `npm run build`
  and make sure both pass.
- **Secrets:** never commit `.env*`, tokens, tunnel credentials, or
  private infrastructure details. If you see a secret in the working tree,
  stop and flag it instead of committing.

## Design System

- **Theme:** dark only. Background `#09090b` ("ink"), cards `#111113`
  ("surface"), secondary surfaces white at 2–5% opacity.
- **Typography:** Space Grotesk for headings, Inter for body text,
  JetBrains Mono for labels, terminals and status lines. Tight headings
  (`tracking-tight`), relaxed body.
- **Accent:** emerald (`#34d399`) — sparingly: status dots, kicker
  comments (`// section`), hover states, one soft hero glow. Body text is
  zinc; never large gradient fills.
- **Borders:** `white/7–12%`, `rounded-xl` cards, `rounded-lg` buttons.
- **Motion:** CSS-only — page fade, `IntersectionObserver` reveals
  (`Reveal.tsx`), card lift on hover, slow terminal drift, blinking
  cursor. All disabled under `prefers-reduced-motion`.
- **Layout:** max-w-5xl column, generous section padding (`py-20`),
  1→2→3 column grids, `scroll-mt` anchors under the fixed header.

Do not redesign the website. Extend in the same language.

## Important Rules

- No fake information of any kind (projects, stats, experience, awards,
  certifications, testimonials, companies).
- No fake or hardcoded GitHub statistics — live API or placeholders.
- Only link URLs that exist.
- No programming-languages-as-skills; frameworks appear only as factual
  project badges.
- Keep English-only.
- Keep it fast, accessible, responsive, reduced-motion-safe.
- No unnecessary dependencies or rewrites; prefer existing components.
- Keep secrets, tokens, tunnel credentials and private infra details out
  of Git — always.

## Troubleshooting

- **`npm install` fails / peer conflicts:** ensure Node 20.9+ (`node -v`);
  delete `node_modules` + retry; `package-lock.json` is committed so
  installs are reproducible — don't delete it lightly.
- **Build fails on `next/font` (Geist):** font fetching needs network at
  build time; offline Docker builds on the Pi will fail — build where
  network exists, then ship the image.
- **TypeScript errors in `[slug]/page.tsx`:** route params are a `Promise`
  in this Next.js version — `await params` before use.
- **GitHub section shows offline fallback:** `api.github.com` rate-limits
  unauthenticated requests (~60/h/IP). It's cosmetic and self-heals; the
  1-hour server cache (`revalidate: 3600`) keeps pressure low. Check
  `/api/github` directly to distinguish API limits from UI bugs.
- **Docker build fails on Pi:** use buildx for ARM64
  (`--platform linux/arm64`), ensure ~1 GB free RAM/swap for `next build`,
  and keep `node_modules`/`.next` out of the context (see `.dockerignore`).
- **Tunnel serves old content:** the tunnel points at `localhost:3000` —
  restart/rebuild the container, then re-check; Cloudflare caches almost
  nothing here by default, so staleness is almost always the container.
- **`curl` gets 403 from the site:** intended — `src/proxy.ts` blocks
  tooling user-agents. Test with a real browser UA or temporarily narrow the
   `BLOCKED_UA_SUBSTRINGS` list. Same for `/api/health` (double 403 is normal).
- **Browser-like requests get the Vercel Security Checkpoint (or 429 after
  repeated hits):** intended — the edge `bot_protection` rule challenges
  clients that look automated (e.g. curl with a faked UA, datacenter IPs).
  Real browsers solve the checkpoint invisibly; verify with an actual
  browser, not curl.
- **Beacon answers but nothing is recorded:** the visitor reloaded within
  60s (dedup), or the IP is local/unknown. Check server logs and
  `GET /api/health` status directly.
- **`cloudflared` login on a headless Pi:** run `cloudflared tunnel login`
  from a machine with a browser and copy only the resulting `cert.pem` to
  the Pi via a secure channel; never commit it.

## Future Improvements

Ideas only — none of these exist yet:

- Real inbox behind `hello@four04.de`, then drop the placeholder note
- Optional now-page (`/now`) generated from `src/lib/now.ts`
- Lightweight analytics without cookies (or none — privacy-first default)

## License

No license has been specified for this repository. All rights reserved by
default — do not reuse the code or content without asking the owner.

## Changelog / Project Status

Actively developed personal portfolio. Content (projects, "currently
building", skills) changes as Tom's work changes; outdated entries are
removed rather than kept as filler.
