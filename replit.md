# WhoamI - DNA & Family History Platform

## Overview
A comprehensive platform that aggregates DNA data from multiple providers (Ancestry, 23andMe, FamilyTreeDNA) to provide unified family history analysis, migration mapping, and heritage discovery services.

## Recent Changes (Dec 20, 2025)
- Implemented full payment system with Stripe integration
- Created database schema for users, orders, and DNA reports
- Built checkout flow with multiple payment options (Card, PayPal, Apple Pay, Shop Pay)
- Admin settings page for payment gateway configuration

## Payment Integration Notes
Stripe is now connected with API keys stored as secrets.

### Active Secrets:
- `STRIPE_SECRET_KEY` - Connected ✓
- `STRIPE_WEBHOOK_SECRET` - Connected ✓

The checkout flow redirects users to Stripe's hosted checkout page for maximum security and trust.

## Project Architecture
- **Frontend:** React with Wouter routing, Tailwind CSS v4
- **Backend:** Express server with PostgreSQL database
- **Payment:** Stripe for payment processing
- **Database:** PostgreSQL with Drizzle ORM

### Key Features
1. **Base Analysis Package ($20)** - Unified DNA report from multiple sources
2. **Add-on Services** - Royal lineage, tribe tracing, Holocaust survivor search
3. **Migration Mapping** - Visual representation of ancestral movements
4. **Community Forum** - User discussion and tips
5. **Secure Payments** - Stripe integration with multiple payment methods

## User Preferences
- Clean, heritage-focused design with burgundy/orange color scheme
- Playfair Display for headings (classic authority), Inter for UI (readability)
- Professional, scientific aesthetic with warm historical tones
- Easy admin configuration for payment settings

## Database Schema
- **users:** Customer accounts with email and name
- **orders:** Purchase records with Stripe integration
- **dnaReports:** Generated analysis reports linked to orders

## Next Steps
After adding Stripe API keys, the platform will be able to:
- Process real payments from customers
- Track orders and payment status
- Generate DNA reports upon successful payment
- Send funds to the admin's configured payout destination (PayPal or bank account)
