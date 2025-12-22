# WhoamI - Multi-Business Learning & Storytelling Platform

## Overview
A multi-business platform with five distinct offerings:
1. **WhoamI DNA & Genealogy** - AI-guided DIY ancestry research with Heritage Books
2. **PromptPro Academy** - Teaches prompt engineering to adults 40+ seeking remote work
3. **Sacred Latin Course** - Latin pronunciation for ritual/spiritual practitioners ($19/month)
4. **Vibe Code Academy** - Teaches product engineering using AI (vibe coding) - build software without writing code
5. **My Side of the Story** - Anonymous graphic novel storytelling platform for sharing personal experiences

## Recent Changes (Dec 22, 2025)
- **My Side of the Story** - NEW! Anonymous storytelling platform
  - Writers share personal experiences using archetype characters (Hero, Shadow, Mentor, etc.)
  - Complete anonymity - pen names only, real identity never revealed
  - No comment section to prevent cyberbullying
  - Writers earn from subscriber reads
  - Multi-step story creation tool with panel builder
  - 8 powerful archetypes for storytelling
- **Vibe Code Academy** - Complete school for learning vibe coding
  - Semester-based structure (Semester 1: $299)
  - 8-week curriculum teaching product engineering with AI
  - AI Tutor for personalized help
- Updated navigation with dropdown menus for each business
- Five distinct color schemes: Burgundy (DNA), Blue (PromptPro), Purple (Latin), Pink (Vibe Code), Amber (My Side)

## Live URL
https://ancestry-canvas--jackiecady.replit.app/

## Five Businesses, One Platform

### WhoamI DNA & Genealogy (Burgundy theme)
- DIY research with AI guidance
- Heritage Books: $99-$249 (print-on-demand via Blurb/Lulu)
- Routes: /, /journey, /my-research, /my-book, /pricing

### PromptPro Academy (Blue theme)
- Starter: $29 - Learn AI through ancestry research
- Foundation: $99 - Prompt engineering basics + certificate
- Professional: $249 - Career-ready certification
- Routes: /academy, /learn, /academy/tutor, /prompts, /academy/forum

### Sacred Latin Course (Purple theme)
- $19/month subscription
- Latin pronunciation for rituals and prayers
- Routes: /latin

### Vibe Code Academy (Pink theme)
- Semester 1: $299 - Foundations of Vibe Coding (8 weeks)
- Semester 2: $399 - Advanced Product Building (coming soon)
- Semester 3: $499 - Enterprise & Team Skills (coming soon)
- Routes: /vibe-code, /vibe-code/curriculum, /vibe-code/tutor, /vibe-code/enroll

### My Side of the Story (Amber theme)
- Anonymous graphic novel storytelling
- 8 archetypes: Hero, Shadow, Mentor, Innocent, Warrior, Healer, Trickster, Ghost
- Writers earn from subscriber reads
- No comments - safe space for vulnerable stories
- Subscription pricing: TBD
- Routes: /my-side, /my-side/archetypes, /my-side/stories, /my-side/write, /my-side/subscribe

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
- DNA & Genealogy → Home, DNA Journey, My Research, Heritage Book, Pricing
- PromptPro Academy → Academy Home, Lessons, AI Tutor, Prompt Library, Community
- Sacred Latin → Latin Course
- Vibe Code → Academy Home, Curriculum, AI Tutor, Enroll Now
- My Side → Home, Archetypes, Read Stories, Write Your Story, Subscribe

## User Preferences
- Burgundy/orange for DNA, Blue for PromptPro, Purple for Latin, Pink for Vibe Code, Amber for My Side
- Teaching-focused mission for career changers
- Simple, encouraging language for tech newcomers
- Strong emphasis on safety/anonymity for storytelling platform
