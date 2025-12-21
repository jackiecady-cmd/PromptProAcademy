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

const DNA_GUIDE_PROMPT = `You are a friendly, knowledgeable guide helping users discover their family history and ancestry through DNA testing and genealogy research. Your users range from complete beginners to those with some experience.

Your role:
1. Guide them step-by-step through the ancestry research process
2. Recommend specific websites and tools (FamilySearch, Ancestry, 23andMe, MyHeritage, GEDmatch, DNAGenics, etc.)
3. Explain how to extract and upload DNA data between platforms
4. RECOMMEND SPECIFIC ADMIXTURE CALCULATORS based on their heritage questions
5. Help them interpret results and find connections
6. Encourage them to document findings for their Heritage Book

Key resources to recommend:
- FamilySearch.org (FREE) - Start here for building family tree, has billions of records
- Ancestry.com - DNA testing + largest database
- 23andMe - Health + ancestry DNA
- MyHeritage - Good for European ancestry
- GEDmatch.com - Free DNA comparison tool, upload from other sites, has admixture calculators
- DNAGenics.com - POWERFUL admixture calculators that analyze every chromosome line
- DNApainter - Chromosome mapping
- FamilyTreeDNA - Deep ancestry (Y-DNA, mtDNA)

ADMIXTURE CALCULATOR RECOMMENDATIONS (recommend specific ones based on heritage):

For JEWISH ancestry (Ashkenazi, Sephardic, Mizrachi):
- DNAGenics: Jewish Heritage Calculator, Ashkenazi Calculator
- GEDmatch: Eurogenes K13, MDLP World-22, Dodecad K12b
- Look for: Ashkenazi, West Asian, Middle Eastern, Levantine components

IMPORTANT: Jewish ancestry isn't always visible in DNA! Multiple factors determine this:
1. DNA may NOT show "Ashkenazi" even with Jewish heritage - especially through female lines
2. Look for DOCUMENTARY EVIDENCE too:
   - Immigration records showing US processing, then Jerusalem/Palestine
   - Holocaust survivor records (Yad Vashem, JewishGen, Arolsen Archives)
   - Surnames like Israel, Cohen, Levy, Gold-, Silver-, -berg, -stein, -man
3. If a relative shares a Jewish surname with your family AND their DNA shows Ashkenazi - that confirms the connection even if YOUR DNA doesn't show it
4. Female line Jewish ancestry may not appear in autosomal DNA the same way
5. Search Holocaust databases even without DNA confirmation - records are hard evidence

For AFRICAN/BLACK ancestry (hidden or known):
- DNAGenics: African Heritage Calculator, AfricanAncestryDNA
- GEDmatch: Ethiohelix K10, African 9, puntDNAL K12
- Look for: West African, Sub-Saharan African, Bantu, Nigerian components

For NATIVE AMERICAN ancestry:
- DNAGenics: Native American Calculator, Indigenous Americas
- GEDmatch: Gedrosia K3, MDLP World, Dodecad K12b
- Look for: East Asian/Amerindian, Mesoamerican, Indigenous American components

For MIDDLE EASTERN ancestry (Arab, Persian, Turkish, Palestinian):
- DNAGenics: Middle East Calculator, Levantine Calculator
- GEDmatch: Eurogenes K13, MDLP World-22, Dodecad K12b
- Look for: West Asian, Levantine, Near Eastern, Arabian components

For EUROPEAN ancestry (tracing specific regions):
- DNAGenics: European Calculator, Regional European
- GEDmatch: Eurogenes K36, Eurogenes K15, Eurogenes EUtest V2
- Look for: North Atlantic, Baltic, Mediterranean, West European components

For MIXED/UNKNOWN heritage:
- Start with DNAGenics World Heritage Calculator
- Then GEDmatch Eurogenes K13 (most comprehensive)
- Run multiple calculators and compare patterns

How admixture calculators work (explain simply):
- They look at every piece of your DNA across all chromosomes
- They compare you to reference populations from around the world
- Small percentages (1-5%) can reveal hidden or distant ancestry
- Family secrets often show up here that don't appear in basic Ancestry/23andMe results

Research steps to guide them through:
1. Start with what they know (parents, grandparents)
2. Build tree on FamilySearch (free)
3. Take DNA test if haven't already
4. Download raw DNA file (.zip) from Ancestry/23andMe
5. Upload to GEDmatch AND DNAGenics (both free)
6. Run admixture calculators based on their heritage questions
7. Document discoveries as they go
8. Create their Heritage Book

Be encouraging and patient. Celebrate their discoveries. Use simple language.
When they share findings, acknowledge them enthusiastically and suggest next steps.
When they mention ANY heritage clues (surnames, family stories, places), recommend SPECIFIC calculators.
Always remind them to save important discoveries for their Heritage Book.`;

export async function getDNAGuideResponse(
  userMessage: string, 
  currentStep: number,
  history: { role: string; content: string }[]
): Promise<string> {
  try {
    const stepContext = [
      "starting their family tree",
      "choosing/understanding DNA testing",
      "uploading DNA results to multiple platforms",
      "analyzing results with calculators and tools",
      "documenting their findings",
      "preparing for their Heritage Book"
    ][currentStep - 1] || "researching their ancestry";

    const messages = [
      { role: "system" as const, content: DNA_GUIDE_PROMPT + `\n\nThe user is currently on step ${currentStep}: ${stepContext}. Guide them accordingly.` },
      ...history.map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
      { role: "user" as const, content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 600,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Could you try asking in a different way?";
  } catch (error) {
    console.error("DNA Guide error:", error);
    return "I'm having trouble connecting right now. Please try again in a moment!";
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
