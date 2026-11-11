# PromptPro Academy & Sacred Latin Platform

## Overview
A learning platform with two live offerings and one coming soon:
1. **PromptPro Academy** - Teaches prompt engineering to adults 40+ seeking remote work
2. **Sacred Latin Course** - Latin pronunciation for ritual/spiritual practitioners ($15 lifetime, $12 early-bird for first 10)
3. **Vibe Coding** - Coming soon: learn to build apps with AI

**GitHub is the source of truth** (`jackiecady-cmd/PromptProAcademy`) so Copilot, Grok, and other bots can work from the same files. Grok cannot see a **private** repo unless you connect it to GitHub or clone locally. Keep Stripe/OpenAI/database secrets in `.env` or host env vars, never in git.

**Note:** Open Archive & Research Center is a **separate GitHub repo** (`jackiecady-cmd/archive-research-center`) with different collaborators. It is not in this codebase. Academy collaborators should not be given access to that repo; Archive collaborators should not be given access here.

### Split remaining steps (owner: jackiecady-cmd)
1. Finish `jackiecady-cmd/archive-research-center` (Jackie is creating this repo).
2. Copy Archive/Research pages, DNA/family APIs, and schema into that repo (from git history on this branch if needed: `494bd5f` / `6bf6d16`).
3. Invite Archive collaborators only to archive-research-center. Keep PromptProAcademy limited to Academy collaborators.
4. Deploy Open Archive as its own app with its own `DATABASE_URL` so student data and DNA/research data stay separate.
5. After the Archive site is live, update `client/src/lib/open-archive.ts` (`OPEN_ARCHIVE_URL`) from the GitHub URL to the live app URL.

### Off Replit (this Academy app)
- Local/GitHub: copy `.env.example` to `.env`, set `DATABASE_URL`, `SESSION_SECRET`, `APP_URL`, `OPENAI_API_KEY`.
- Host the running site from this GitHub repo (Railway, Render, Fly, etc.). Set the same secrets on the host. `APP_URL` must be the public https URL.
- Replit Auth stays available if `REPL_ID` is set. Without it, login is disabled and the rest of the site still runs.
- See `README.md` for bot access and run commands.

## Recent Changes
- DNA/WhoamI content fully removed — homepage is now a 2-offering hub with Vibe Coding teaser
- Prompt Library rewritten with AI/career/productivity prompts (no DNA/genealogy)
- Medical / Healthcare Mode toggle on Sacred Latin Course
- Headline: "Latin for Witches & Med Pros" with subtitle "Toggle Modes — No Crossover."
- Pricing: $15 one-time lifetime purchase, $12 early-bird for first 10 buyers
- Sacred Latin Course: First 20 free lifetime promo ($0.00, no Stripe charge)
- Vibe Coding Coming Soon announcement banner (dismissible, sessionStorage)

## Live URL
https://ancestry-canvas--jackiecady.replit.app/

## Offerings

### PromptPro Academy (Blue theme)
- Foundation: $35 - 10 prompt engineering courses + certificate (first 5 free, no Stripe)
- Professional: $75 - Career-ready certification (first 5 free, no Stripe)
- Bundle Deal: $60 - Foundation + Professional together (save $50 vs $110 separately)
- Free promo: First 5 claimants per tier pay $0.00, tracked via academy_foundation_free / academy_professional_free productTypes
- API: GET /api/promo/academy-foundation-free, POST /api/checkout/academy-foundation-free
- API: GET /api/promo/academy-pro-free, POST /api/checkout/academy-pro-free
- Advisory locks (pg_advisory_xact_lock 200/201) prevent race conditions on free claims
- Routes: /academy, /learn, /academy/checkout?tier=foundation|professional|bundle, /academy/tutor, /prompts, /academy/forum
- Course content defined in AcademyDashboard.tsx lessons array (10 Foundation lessons only)

### Sacred Latin Course (Purple theme)
- $15 one-time lifetime purchase ($12 early-bird for first 10 buyers)
- First 20 users get it free (separate promo)
- Latin pronunciation for rituals and prayers
- Healthcare Mode toggle converts to medical Latin course
- Routes: /latin
- API: GET /api/promo/latin-earlybird, POST /api/checkout/latin-lifetime

### Vibe Coding (Coming Soon)
- Announcement banner at top of site (gradient, dismissible)
- Teaser section on homepage
- No routes yet

## Project Architecture
- **Frontend:** React with Wouter routing, Tailwind CSS v4
- **Backend:** Express server with PostgreSQL database
- **AI:** OpenAI (`OPENAI_API_KEY`, with fallback to Replit `AI_INTEGRATIONS_*`)
- **Payment:** Stripe
- **Auth:** Replit Login when `REPL_ID` is set; optional off Replit

## Database Schema
- users, orders
- learnerProgress, earnedBadges (PromptPro Academy)
- subscriptions (Latin Course)
- conversations, messages (chatbot)

## Navigation Structure
Navbar has dropdown menus for each offering:
- PromptPro Academy → Academy Home, Lessons, AI Tutor, Prompt Library, Community
- Sacred Latin → Latin Course
- Open Archive is linked as an external project (`OPEN_ARCHIVE_URL`), not in-app routes

## User Preferences
- Blue for PromptPro, Purple/amber for Latin
- Teaching-focused mission for career changers
- Simple, encouraging language for tech newcomers
