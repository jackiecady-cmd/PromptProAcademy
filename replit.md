# WhoamI - Multi-Business Learning Platform

## Overview
A multi-business platform with three live offerings:
1. **WhoamI DNA & Genealogy** - AI-guided DIY ancestry research with Heritage Books
2. **PromptPro Academy** - Teaches prompt engineering to adults 40+ seeking remote work
3. **Sacred Latin Course** - Latin pronunciation for ritual/spiritual practitioners ($19/month)

**Note:** Vibe Code Academy and My Side of the Story have been removed from this codebase - they will be built as a separate website.

## Recent Changes
- Dedicated Upload DNA page (/upload-dna) — prominent hero CTA and nav link for raw DNA .zip uploads
- FAQ section on Home page with 5 accordion Q&A items
- First 20 users free promo ($0.00 checkout bypassing Stripe, with atomic DB transaction)
- Removed Vibe Code Academy and My Side of the Story from this codebase (to be built as separate website)
- Simplified navigation to show only 3 live businesses
- Clean mobile-friendly top navigation with dropdown menus

## Live URL
https://ancestry-canvas--jackiecady.replit.app/

## Three Businesses

### WhoamI DNA & Genealogy (Burgundy theme)
- DIY research with AI guidance
- Heritage Books: $99-$249 (print-on-demand via Blurb/Lulu)
- Routes: /, /upload-dna, /journey, /my-research, /my-book, /pricing

### PromptPro Academy (Blue theme)
- Starter: $29 - Learn AI through ancestry research
- Foundation: $99 - Prompt engineering basics + certificate
- Professional: $249 - Career-ready certification
- Routes: /academy, /learn, /academy/tutor, /prompts, /academy/forum

### Sacred Latin Course (Purple theme)
- $19/month subscription
- Latin pronunciation for rituals and prayers
- Routes: /latin

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
- DNA & Genealogy → Home, Upload DNA, DNA Journey, My Research, Heritage Book, Pricing
- PromptPro Academy → Academy Home, Lessons, AI Tutor, Prompt Library, Community
- Sacred Latin → Latin Course

## User Preferences
- Burgundy/orange for DNA, Blue for PromptPro, Purple for Latin
- Teaching-focused mission for career changers
- Simple, encouraging language for tech newcomers
