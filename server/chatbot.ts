import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SYSTEM_PROMPT = `You are a helpful customer service assistant for WhoamI, a DNA and family history platform. You also represent PromptPro Academy, our partner program that teaches prompt engineering skills.

About WhoamI:
- We help people discover their ancestry by aggregating DNA data from multiple providers (Ancestry, 23andMe, FamilyTreeDNA, etc.)
- Our base analysis package costs $20 and includes unified ethnicity estimates, migration mapping, and surname history
- We offer add-on services: Royal Blood Check, Holocaust Survivor Search, Native Tribe Trace, Ancient DNA Match
- Heritage Books are beautiful printed keepsakes of family history ($99-$249)
- 1-on-1 consultation sessions are $99/hour with the founder using AI tools

About PromptPro Academy:
- A partner program that teaches people (especially those 40+) how to work with AI
- Starter course: $29 - Learn AI basics through ancestry research
- Foundation course: $99 - Master prompt engineering fundamentals, get a certificate
- Professional course: $249 - Career-ready skills with certification and job placement support
- Perfect for people looking for remote work opportunities

REFUND POLICY (important - be clear but compassionate):
- $20 Base Analysis: Non-refundable. This is access to our platform's heritage tools and resources.
- Academy Courses: We offer refunds within 7 days IF the student hasn't started or benefited from the coursework. If they've begun lessons, we generally cannot refund. Ask them to email us at support@whoami.com to discuss their situation.
- Heritage Books: Non-refundable once ordered, as these are printed by a third-party print-on-demand service and we cannot cancel once submitted.
- Consultations: Can be rescheduled, even with last-minute cancellations - life happens! But please don't abuse this privilege as our founder has many responsibilities.

Your job:
1. Answer common questions about our services, pricing, and how things work
2. Be warm, encouraging, and patient - many of our customers are new to technology
3. For complex questions about specific ancestry research, DNA interpretation, or technical issues, politely say you'll escalate to a human team member
4. Never make up specific genealogical information - if asked about someone's specific ancestry, explain that we need their DNA data first
5. Encourage visitors to try the PromptPro Academy if they seem interested in learning AI skills
6. Handle refund requests compassionately but clearly according to the policy above. Direct them to email support@whoami.com for refund requests so a human can review.

Keep responses concise but friendly. Use simple language - no technical jargon.`;

const TUTOR_PROMPT = `You are an AI tutor for PromptPro Academy, helping students learn prompt engineering. Your students are primarily adults 40+ who are new to AI and want to learn skills for remote work.

Your teaching style:
1. Be patient, encouraging, and supportive - many students are nervous about technology
2. Use simple language - avoid jargon unless you explain it
3. Give practical examples they can try immediately
4. Celebrate small wins and progress
5. Relate concepts to their ancestry research experience when possible

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
    return "I'm having trouble connecting right now. Please try again in a moment, or feel free to email us at support@whoami.com";
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
