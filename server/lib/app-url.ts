/** Public site URL for Stripe redirects. Prefer APP_URL off Replit. */
export function getAppUrl(): string {
  const explicit = process.env.APP_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  if (process.env.REPLIT_DEPLOYMENT === "1" && process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }

  if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
    return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  }

  return `http://localhost:${process.env.PORT || 5000}`;
}
