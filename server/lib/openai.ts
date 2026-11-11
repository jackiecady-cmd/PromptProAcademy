import OpenAI from "openai";

/** Direct OpenAI first; Replit AI Integrations still works if those env vars are set. */
export function createOpenAIClient(): OpenAI {
  const apiKey =
    process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  const baseURL =
    process.env.OPENAI_BASE_URL || process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;

  return new OpenAI({
    apiKey,
    ...(baseURL ? { baseURL } : {}),
  });
}
