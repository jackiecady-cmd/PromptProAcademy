# PromptPro Academy & Sacred Latin Platform

## Overview
A learning platform with two live offerings and one coming soon:
1. **PromptPro Academy** - Teaches prompt engineering to adults 40+ seeking remote work
2. **Sacred Latin Course** - Latin pronunciation for ritual/spiritual practitioners ($15 lifetime, $12 early-bird for first 10)
3. **Vibe Coding** - Coming soon: learn to build apps with AI
4. **Open Archive & Research Center** - Separate project (not part of PromptPro Academy): public records archive plus a family-history research workspace

**Note:** Open Archive and Research Center is a separate project from PromptPro Academy, hosted on the same site. DNA/WhoamI tooling lives under Research Center rather than Academy.

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

### Open Archive & Research Center (separate project)
- Not part of PromptPro Academy — hosted on the same site as its own offering
- Open Archive (`/archive`): searchable public records and heritage collections
- Research Center (`/research`): workspace hub for family research and DNA tools
- Routes: /archive, /research, /my-research, /journey, /dna-hub, /upload-dna, /research/forum, /my-book
- API: /api/family, /api/findings, /api/dna-upload, /api/dna-uploads

## Project Architecture
- **Frontend:** React with Wouter routing, Tailwind CSS v4
- **Backend:** Express server with PostgreSQL database
- **AI:** OpenAI via Replit AI Integrations
- **Payment:** Stripe
- **Auth:** Replit Login integration

## Database Schema
- users, orders
- learnerProgress, earnedBadges (PromptPro Academy)
- subscriptions (Latin Course)
- conversations, messages (chatbot)
- familyMembers, dnaFindings, dnaUploads (Research Center)

## Navigation Structure
Navbar has dropdown menus for each offering:
- PromptPro Academy → Academy Home, Lessons, AI Tutor, Prompt Library, Community
- Sacred Latin → Latin Course
- Open Archive & Research Center → Open Archive, Research Center, My Research, Research Guide, DNA Tools Hub, Upload DNA, Community

## User Preferences
- Blue for PromptPro, Purple/amber for Latin
- Teaching-focused mission for career changers
- Simple, encouraging language for tech newcomers
