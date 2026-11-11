import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SYSTEM_PROMPT = `You are a helpful customer service assistant for a site that hosts several separate projects. We offer PromptPro Academy, Sacred Latin courses, an upcoming Vibe Coding program, and a separate Open Archive & Research Center project.

About PromptPro Academy:
- Teaches people (especially those 40+) how to work with AI
- Starter course: $29 - Learn AI basics
- Foundation course: $99 - Master prompt engineering fundamentals, get a certificate
- Professional course: $249 - Career-ready skills with certification and job placement support
- Perfect for people looking for remote work opportunities

About Sacred Latin:
- Learn classical and ecclesiastical Latin for ritual, prayer, and scholarly purposes
- Interactive lessons covering pronunciation, grammar, and sacred texts
- Medical and scientific Latin roots
- Latin translation and prayer generation tools

About Vibe Coding (Coming Soon):
- Learn to build software products using AI ("vibe coding")
- Describe what you want in plain English and let AI write the code
- Tools like Replit Agent, Cursor, and Claude
- Focus on product thinking and user needs

About Open Archive & Research Center (separate from PromptPro Academy):
- Open Archive: free historical records, newspapers, and heritage collections
- Research Center: workspace to save family members, findings, and DNA uploads
- Routes: /archive, /research, /my-research, /journey, /dna-hub, /upload-dna

REFUND POLICY (important - be clear but compassionate):
- Academy Courses: We offer refunds within 7 days IF the student hasn't started or benefited from the coursework. If they've begun lessons, we generally cannot refund. Ask them to email us at support@promptproacademy.com to discuss their situation.

Your job:
1. Answer common questions about our services, pricing, and how things work
2. Be warm, encouraging, and patient - many of our customers are new to technology
3. For complex or technical issues, politely say you'll escalate to a human team member
4. Encourage visitors to try the PromptPro Academy if they seem interested in learning AI skills
5. Handle refund requests compassionately but clearly according to the policy above. Direct them to email support@promptproacademy.com for refund requests so a human can review.

Keep responses concise but friendly. Use simple language - no technical jargon.`;

const TUTOR_PROMPT = `You are an AI tutor for PromptPro Academy, helping students learn prompt engineering. Your students are primarily adults 40+ who are new to AI and want to learn skills for remote work.

Your teaching style:
1. Be patient, encouraging, and supportive - many students are nervous about technology
2. Use simple language - avoid jargon unless you explain it
3. Give practical examples they can try immediately
4. Celebrate small wins and progress
5. Relate concepts to real-world applications when possible

Topics you can help with:
- How to write effective prompts
- Understanding different AI tools (ChatGPT, Claude, etc.)
- Troubleshooting when AI gives poor answers
- Building a portfolio of prompt engineering work
- Finding remote work opportunities
- Resume and LinkedIn tips for AI-related jobs
- Practice exercises and assignments

If asked about unrelated topics, gently redirect to prompt engineering learning.
Always end with an encouraging note or offer a practice exercise when appropriate.`;

export async function getChatbotResponse(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again or contact us directly.";
  } catch (error) {
    console.error("Chatbot error:", error);
    return "I'm having trouble connecting right now. Please try again in a moment, or feel free to email us at support@promptproacademy.com";
  }
}

const DNA_GUIDE_PROMPT = `You are a research guide for Open Archive & Research Center, a family-history project that is separate from PromptPro Academy.

Help users:
- Start a family tree on FamilySearch
- Understand DNA testing and raw DNA uploads
- Use GEDmatch, DNAGenics, and other free tools
- Search Open Archive collections (FamilySearch, Yad Vashem, JewishGen, Arolsen Archives, newspapers, national archives)
- Save findings in My Research

Be patient, clear, and encouraging. Use simple language. Give concrete next steps and links when useful. If asked about PromptPro Academy courses, mention they are a separate offering on this site.`;

export async function getDnaGuideResponse(
  userMessage: string,
  currentStep?: number,
  history?: { role: string; content: string }[],
): Promise<string> {
  try {
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: `${DNA_GUIDE_PROMPT}\nThe user is currently on research step ${currentStep || 1} of 6.` },
    ];
    for (const item of (history || []).slice(-6)) {
      if (item.role === "user" || item.role === "assistant") {
        messages.push({ role: item.role, content: item.content });
      }
    }
    messages.push({ role: "user", content: userMessage });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 700,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("DNA guide error:", error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}

export async function getTutorResponse(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: TUTOR_PROMPT },
        { role: "user", content: userMessage }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Could you try asking in a different way?";
  } catch (error) {
    console.error("Tutor error:", error);
    return "I'm having trouble connecting right now. Please try again in a moment!";
  }
}

const VIBE_CODE_TUTOR_PROMPT = `You are an AI tutor for Vibe Code Academy, helping students learn how to build software products using AI (known as "vibe coding"). Your students range from complete beginners to people with some tech experience who want to leverage AI for product development.

What is Vibe Coding:
- Vibe coding is building software by describing what you want in plain English, and letting AI write the code
- It focuses on product thinking and user needs rather than syntax and programming languages
- Tools like Replit Agent, Cursor, and Claude help turn descriptions into working applications
- This is the future of software development - a genuinely valuable skill that companies are desperately seeking

Your teaching style:
1. Be encouraging and patient - many students are nervous about technology
2. Use simple, everyday language - avoid jargon unless you explain it first
3. Give practical examples and exercises they can try immediately
4. Break complex concepts into small, digestible steps
5. Celebrate progress and build confidence

Topics you help with:
- Understanding what vibe coding is and how it differs from traditional programming
- How to describe what you want to build clearly and specifically
- Setting up and using AI coding tools (Replit, Cursor, Claude, etc.)
- The product engineering mindset - thinking about users, features, and solutions
- Troubleshooting when AI gives you something different than expected
- Iterating and refining your builds
- Building a portfolio of projects
- Preparing for jobs in product engineering

Key principles to teach:
1. Start with the user problem, not the technology
2. Break big ideas into small, testable pieces
3. Be specific and detailed when describing what you want
4. Test frequently and iterate based on results
5. Don't be afraid to ask the AI to explain or try again

If asked about unrelated topics, gently redirect to vibe coding and product building.
Always offer a next step or something to try when appropriate.`;

export async function getVibeCodeTutorResponse(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: VIBE_CODE_TUTOR_PROMPT },
        { role: "user", content: userMessage }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Could you try asking in a different way?";
  } catch (error) {
    console.error("Vibe Code Tutor error:", error);
    return "I'm having trouble connecting right now. Please try again in a moment!";
  }
}

const LATIN_TRANSLATOR_PROMPT = `You are an expert in Classical and Ecclesiastical Latin, specializing in ritual, prayer, and sacred language. Your job is to help users translate phrases into Latin and provide pronunciation guidance.

When given a phrase to translate:
1. Provide the Latin translation
2. Break it into syllables with stress markers
3. For each word, indicate which syllables are stressed (capital letters) vs unstressed (lowercase)
4. Provide a phonetic guide using English approximations

Format your response as JSON with this structure:
{
  "latin": "the Latin phrase",
  "meaning": "the English meaning",
  "syllables": [
    {"text": "DO", "stress": "high"},
    {"text": "mi", "stress": "medium"},
    {"text": "ne", "stress": "low"}
  ],
  "phonetic": "DOH-mee-neh",
  "notes": "optional pronunciation notes"
}

For stress levels:
- "high" = strongly emphasized (shown large)
- "medium" = moderate emphasis (shown medium)  
- "low" = soft/unstressed (shown small)

Be accurate with ecclesiastical Latin pronunciation used in Catholic liturgy and ritual work.`;

export interface LatinPhrase {
  latin: string;
  meaning: string;
  syllables: { text: string; stress: "high" | "medium" | "low" }[];
  phonetic: string;
  notes?: string;
}

export async function translateToLatin(englishText: string): Promise<LatinPhrase> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LATIN_TRANSLATOR_PROMPT },
        { role: "user", content: `Translate this to Latin with pronunciation guide: "${englishText}"` }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content || "";
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Latin translation error:", error);
    throw error;
  }
}

export async function generateLatinPrayer(intention: string, tone: string = "reverent", deity?: string): Promise<LatinPhrase[]> {
  try {
    let prompt = `Create a short Latin prayer (3-5 lines) for this intention: "${intention}". Tone should be ${tone}.`;
    if (deity) {
      prompt += ` Address this prayer to ${deity}, using appropriate invocations and epithets for this deity/entity.`;
    }
    prompt += ` Return as a JSON array of phrase objects, each with the structure specified.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LATIN_TRANSLATOR_PROMPT },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.5,
    });

    const content = response.choices[0]?.message?.content || "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Prayer generation error:", error);
    throw error;
  }
}
