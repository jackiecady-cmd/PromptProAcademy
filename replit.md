# WhoamI - Multi-Business Learning & Ancestry Platform

## Overview
A multi-business platform with four distinct offerings:
1. **WhoamI DNA & Genealogy** - AI-guided DIY ancestry research with Heritage Books
2. **PromptPro Academy** - Teaches prompt engineering to adults 40+ seeking remote work
3. **Sacred Latin Course** - Latin pronunciation for ritual/spiritual practitioners ($19/month)
4. **Vibe Code Academy** - Teaches product engineering using AI (vibe coding) - build software without writing code

## Recent Changes (Dec 22, 2025)
- **Vibe Code Academy** - NEW! Complete school for learning vibe coding
  - Semester-based structure (Semester 1: $299)
  - 8-week curriculum teaching product engineering with AI
  - AI Tutor for personalized help
  - Focus on building real portfolio projects
  - Taught by industry expert (Oracle product division manager)
- Updated navigation with dropdown menus for each business
- Four distinct color schemes: Burgundy (DNA), Blue (PromptPro), Purple (Latin), Pink (Vibe Code)

## Live URL
https://ancestry-canvas--jackiecady.replit.app/

## Four Businesses, One Platform

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

## Navigation Structure
Navbar has dropdown menus for each business:
- DNA & Genealogy → Home, DNA Journey, My Research, Heritage Book, Pricing
- PromptPro Academy → Academy Home, Lessons, AI Tutor, Prompt Library, Community
- Sacred Latin → Latin Course
- Vibe Code → Academy Home, Curriculum, AI Tutor, Enroll Now

## User Preferences
- Burgundy/orange for DNA, Blue for PromptPro, Purple for Latin, Pink for Vibe Code
- Teaching-focused mission for career changers
- Simple, encouraging language for tech newcomers
