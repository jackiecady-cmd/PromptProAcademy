# WhoamI - Multi-Business Learning Platform

## Overview
A multi-business platform with three live offerings:
1. **WhoamI DNA & Genealogy** - AI-guided DIY ancestry research with Heritage Books
2. **PromptPro Academy** - Teaches prompt engineering to adults 40+ seeking remote work
3. **Sacred Latin Course** - Latin pronunciation for ritual/spiritual practitioners ($15 lifetime, $12 early-bird for first 10)

**Note:** Vibe Code Academy and My Side of the Story have been removed from this codebase - they will be built as a separate website.

## Recent Changes
- Medical / Healthcare Mode toggle on Sacred Latin Course: Stethoscope toggle switch adds medical context when ON, reverts to original lessons when OFF. When ON: (1) ALL religious content removed — phrases, content, titles, subtitles, vocab, quiz items swapped to secular/medical alternatives via `healthcareOverrides` in `medicalRoots.ts`, (2) teal "Med Link" boxes appear after vocabulary with Latin-to-medical connections (e.g., cor→cardiology), (3) 2 extra medical quiz questions per lesson (40 total), (4) "Med" badges on lesson cards, (5) Prayer Builder tab hidden, prayers category/lessons filtered out, (6) page-level text switches to "Medical Latin Pronunciation". Override system: `applyHealthcareOverride()` in LatinCourse.tsx merges field-level overrides (title, subtitle, content, phrases, vocab by index, quiz by index) from `healthcareOverrides` array. Lessons 1-16, 19-20 have overrides; lessons 17-18 (prayers category) are fully filtered out.
- Sacred Latin Course: Complete 20-lesson curriculum in `client/src/data/latinLessons.ts` covering fundamentals (alphabet, vowels, consonants, pronouns, prepositions, numbers), nouns (1st/2nd/3rd declension, adjectives), verbs (present 1st-4th conjugation, esse, imperative, perfect, subjunctive), prayers (common prayers, blessings), and advanced (crafting prayers, full ritual practice). Each lesson has phrases with syllable-level pronunciation, vocabulary with type/gender/declension info, and a 4-question quiz. LessonView component with quiz UI, score tracking, category filtering.
- Fixed translator input visibility: added `text-white` class to all Input elements on dark backgrounds.
- Sacred Latin Course: First 20 free lifetime promo ($0.00, no Stripe charge). Green "First 20 Get It FREE" button on Latin page hero + bottom CTA. Claim dialog collects name/email, creates order with product_type="latin_course_free" at $0 amount. Tracked via countLatinFreePromoOrders/claimLatinFreePromo in storage. API: GET /api/promo/latin-free-spots, POST /api/checkout/latin-free.
- Bulk import on My Research page — "Paste a List" imports multiple family members at once (name, relationship, birth year, birth place per line); "Paste DNA Results" imports multiple findings at once. Both support comma/tab/pipe-separated formats. Backend endpoints: POST /api/family/bulk and POST /api/findings/bulk.
- Redesigned My Research page — person-centered with expandable cards showing each person's DNA findings underneath them. Findings linked to specific family members via familyMemberId. Quick links to FamilySearch, GEDmatch, DNAGenics, Ancestry. Deleting a member moves their findings to General Findings (no data loss).
- DNA Tools Hub page (/dna-hub) — central dashboard connecting all internal tools and external DNA sites
- "Back to DNA Tools Hub" links on Upload DNA, DNA Journey, and My Research pages for easy navigation
- Dedicated Upload DNA page (/upload-dna) — prominent hero CTA and nav link for raw DNA .zip uploads
- FAQ section on Home page with 5 accordion Q&A items
- First 20 users free promo ($0.00 checkout bypassing Stripe, with atomic DB transaction)

## Live URL
https://ancestry-canvas--jackiecady.replit.app/

## Three Businesses

### WhoamI DNA & Genealogy (Burgundy theme)
- DIY research with AI guidance
- Heritage Books: $99-$249 (print-on-demand via Blurb/Lulu)
- Routes: /, /dna-hub, /upload-dna, /journey, /my-research, /my-book, /pricing

### PromptPro Academy (Blue theme)
- Starter: $29 - Learn AI through ancestry research
- Foundation: $99 - Prompt engineering basics + certificate
- Professional: $249 - Career-ready certification
- Routes: /academy, /learn, /academy/tutor, /prompts, /academy/forum

### Sacred Latin Course (Purple theme)
- $15 one-time lifetime purchase ($12 early-bird for first 10 buyers)
- First 20 users get it free (separate promo)
- Latin pronunciation for rituals and prayers
- Healthcare Mode toggle converts to medical Latin course
- Routes: /latin
- API: GET /api/promo/latin-earlybird, POST /api/checkout/latin-lifetime

## Project Architecture
- **Frontend:** React with Wouter routing, Tailwind CSS v4
- **Backend:** Express server with PostgreSQL database
- **AI:** OpenAI via Replit AI Integrations
- **Payment:** Stripe

## Database Schema
- users, orders, dnaReports
- learnerProgress, earnedBadges (PromptPro Academy)
- subscriptions (Latin Course)
- conversations, messages (chatbot)
- familyMembers, dnaFindings (DNA research)
- vibeCodeSemesters, vibeCodeLessons, vibeCodeEnrollments, vibeCodeProgress, vibeCodeCertificates (Vibe Code Academy)
- storyArchetypes, storyWriters, stories, storySubscriptions, storyReads (My Side of the Story)

## Navigation Structure
Navbar has dropdown menus for each business:
- DNA & Genealogy → Home, DNA Tools Hub, Upload DNA, DNA Journey, My Research, Heritage Book, Pricing
- PromptPro Academy → Academy Home, Lessons, AI Tutor, Prompt Library, Community
- Sacred Latin → Latin Course

## User Preferences
- Burgundy/orange for DNA, Blue for PromptPro, Purple for Latin
- Teaching-focused mission for career changers
- Simple, encouraging language for tech newcomers
