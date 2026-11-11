# PromptPro Academy

GitHub source of truth for **PromptPro Academy**, Sacred Latin, and Vibe Coding.

This repo is **not** Open Archive & Research Center. That is a separate project (`jackiecady-cmd/OpenArchive`) with different collaborators. Do not add Archive-only people here.

Live Replit URL (until cutover): https://ancestry-canvas--jackiecady.replit.app/

## Why this is on GitHub

The app was built on Replit. Jackie is moving development here so **Copilot, Grok, and other bots** can work from the same files.

- Copilot Coding Agent already uses this repository.
- **Grok does not see a private GitHub repo by itself.** Connect Grok (or Cursor / a local clone) to GitHub, or make the repo public only if you are sure no secrets are in git.
- GitHub access is per-repo. Invite Academy collaborators here. Invite Archive collaborators only to OpenArchive.

Secrets (`DATABASE_URL`, Stripe, OpenAI, `SESSION_SECRET`) stay in host env vars or a local `.env` file. Never commit them.

## Run locally (Grok / Copilot / humans)

```bash
cp .env.example .env
# edit .env — at least DATABASE_URL and SESSION_SECRET
npm install
npm run db:push
npm run dev
```

Open http://localhost:5000

Academy pages, lessons, tutor, and Latin work without Replit Login. Stripe and AI need keys in `.env`.

## Off Replit (host the running site)

1. Keep this GitHub repo as the deploy source.
2. Create a Postgres database and set `DATABASE_URL`.
3. Set `APP_URL` to the public https URL (Railway, Render, Fly, etc.).
4. Set `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `SESSION_SECRET` as host secrets.
5. Build: `npm run build` then `npm start`.
6. Point the custom domain at the new host when ready.

Replit Auth (`REPL_ID`) is optional. Without it, `/api/login` returns 501 and the rest of the site still runs. Replace login with another provider later if you need accounts off Replit.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (API + Vite) |
| `npm run build` | Production build |
| `npm start` | Serve `dist` |
| `npm run check` | Typecheck |
| `npm run db:push` | Push Drizzle schema |

## Open Archive

Separate GitHub repo and separate database. Bots that should work on Archive need that repo, not this one. After Archive is live, set `OPEN_ARCHIVE_URL` in `client/src/lib/open-archive.ts`.
