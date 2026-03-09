import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Play, 
  Award,
  Star,
  BookOpen,
  MessageSquare,
  Lightbulb,
  ChevronRight,
  Trophy,
  Sparkles,
  ArrowLeft,
  GraduationCap,
  Users
} from "lucide-react";
import { Link } from "wouter";

const badges = [
  { id: "explorer", name: "Explorer", description: "Complete your first lesson", icon: Star, color: "text-yellow-500", earned: false },
  { id: "storyteller", name: "Storyteller", description: "Finish the Starter track", icon: BookOpen, color: "text-blue-500", earned: false },
  { id: "strategist", name: "Strategist", description: "Master Foundation skills", icon: Lightbulb, color: "text-purple-500", earned: false },
  { id: "mentor", name: "Mentor", description: "Complete Professional certification", icon: Trophy, color: "text-amber-600", earned: false },
];

const lessons = [
  {
    id: "welcome",
    track: "starter",
    title: "Welcome! Let's Talk to AI Together",
    description: "Your first conversation with an AI - it's easier than you think!",
    duration: "10 min",
    hasQuiz: true,
    content: `
## Welcome to PromptPro Academy! 🎉

You're about to learn something that's becoming essential in today's world: how to communicate with AI.

### What is AI, really?

Think of AI like a very smart assistant that's read millions of books. It doesn't "think" like we do, but it can:
- Answer questions
- Help you write things
- Brainstorm ideas
- Explain complicated topics simply

### Your First Prompt

A "prompt" is simply what you type to the AI. That's it! You're already learning.

**Bad prompt:** "Help"
**Good prompt:** "Can you help me find information about my grandmother's hometown in Ireland around 1920?"

The difference? Being specific helps the AI understand exactly what you need.

### Try This!

Think about something you'd like to know about your family history. How would you ask a helpful librarian? That's exactly how you should ask AI!
    `,
    quiz: [
      {
        question: "What is a 'prompt' in AI?",
        options: ["A password", "What you type to the AI", "A computer program", "A website"],
        correct: 1
      },
      {
        question: "Which prompt would work better?",
        options: [
          "Help me",
          "Tell me about Ireland and my family and history and stuff",
          "Can you help me find what life was like in Dublin, Ireland in the 1920s?",
          "Ireland"
        ],
        correct: 2
      }
    ]
  },
  {
    id: "choosing-ai",
    track: "starter",
    title: "Know Your AI: Which One to Use When",
    description: "Not all AIs are equal - learn which tool works best for different tasks",
    duration: "12 min",
    hasQuiz: true,
    content: `
## Which AI Should You Use?

Here's something most people don't realize: **different AIs have different strengths.** Using the right one for the job makes all the difference.

### The Big Players (and what they're good at)

**Claude (Anthropic)** - The Reliable Worker
- Best for: Step-by-step explanations, difficult math, research that requires accuracy
- Strength: Does the actual work without cutting corners or pretending
- Use when: You need something done correctly, no games
- Great for: Complex ancestry research, document analysis, detailed instructions

**ChatGPT (OpenAI)** - The Popular One
- Note: Quality has decreased recently - not as reliable as it used to be
- Still okay for: Basic questions, casual conversation
- Watch out for: May give you generic answers
- Privacy concern: Has been known to report users to authorities - guardrails are very strict
- Data concern: Partners with Palantir (surveillance/data company used by government contractors and ICE) - be mindful of what you share
- Tip: Don't share personal identifying information with any AI, but especially this one

**Grok (xAI)** - The Knowledge Collector
- Strength: Access to more books, grimoires, historical texts, and obscure facts
- Good for: Research into esoteric topics, finding rare information
- Watch out for: Sometimes "plays pretend" - pretends to do work instead of actually doing it
- Warning: Has shown political bias that was factually incorrect - be aware of potential propaganda
- Tip: Double-check that Grok actually performed the task and verify facts independently!

**DeepSeek** - The Rising Star
- Strength: Strong reasoning, good at following complex instructions
- Good for: Research tasks, analysis
- Growing in popularity for a reason!

**Kimi** - The Multilingual Helper
- Strength: Great with multiple languages and long documents
- Good for: Translation, processing large texts

### Which Should You Start With?

For this course and your ancestry research, we recommend **Claude** for serious work because:
1. It works through problems step-by-step
2. It explains its reasoning
3. It doesn't pretend to do work - it actually does it
4. It's great with complex family history research

### Pro Tip: Use Multiple AIs

Smart researchers use different AIs for different tasks:
- **Claude** for detailed research and complex questions
- **Grok** when you need obscure historical facts or rare book references
- **DeepSeek** or **Kimi** for second opinions

### The Warning Signs

Watch out for AIs that:
- Give you vague, generic answers
- "Pretend" to search or calculate without showing work
- Rush through without explaining
- Make up information confidently

Always verify important findings!
    `,
    quiz: [
      {
        question: "Which AI is recommended for complex, step-by-step work?",
        options: ["ChatGPT", "Claude", "Grok", "Any AI works the same"],
        correct: 1
      },
      {
        question: "What should you watch out for with some AIs?",
        options: [
          "They're too slow",
          "They might 'pretend' to do work instead of actually doing it",
          "They cost too much",
          "They only work on weekends"
        ],
        correct: 1
      }
    ]
  },
  {
    id: "basics",
    track: "starter",
    title: "The Magic Words: Be Specific",
    description: "Learn the #1 secret to getting great answers from AI",
    duration: "15 min",
    hasQuiz: true,
    content: `
## The Secret to Great AI Conversations

Here's the most important thing you'll learn: **Specific questions get specific answers.**

### The WHAT-WHO-WHEN-WHERE Method

When asking AI anything, include:
- **WHAT** you want to know
- **WHO** you're asking about
- **WHEN** (time period)
- **WHERE** (location)

### Example for Ancestry Research

❌ "Tell me about my family"
✅ "What was daily life like for Irish immigrants in Boston during the 1890s?"

The AI can actually help with the second one!

### Practice Scenario

Let's say your great-grandfather was a coal miner in Pennsylvania around 1910.

**Try building a prompt:**
"What was life like for [WHO: coal miners] in [WHERE: Pennsylvania] during [WHEN: 1910]? I'd like to understand [WHAT: their daily routines and challenges]."

### You're Doing Great!

See how natural this is? You're already thinking like a prompt engineer!
    `,
    quiz: [
      {
        question: "What makes a prompt more effective?",
        options: ["Using big words", "Being specific with details", "Keeping it as short as possible", "Using all capital letters"],
        correct: 1
      },
      {
        question: "The WHAT-WHO-WHEN-WHERE method helps you:",
        options: ["Type faster", "Give AI the context it needs", "Avoid grammar mistakes", "Use fewer words"],
        correct: 1
      }
    ]
  },
  {
    id: "ancestry-prompts",
    track: "starter", 
    title: "AI Prompts for Family History",
    description: "Real prompts you can use right now for your research",
    duration: "20 min",
    hasQuiz: true,
    content: `
## Your Ancestry Research Toolkit

Now let's get practical! Here are prompts you can copy and customize for your own research.

### Finding Historical Context

**Prompt Template:**
"I'm researching my ancestor [NAME] who lived in [LOCATION] around [YEAR]. Can you tell me:
1. What major events were happening in that area during that time?
2. What jobs were common there?
3. What challenges did people face?"

### Understanding Immigration

**Prompt Template:**
"My family immigrated from [COUNTRY] to [DESTINATION] around [YEAR]. What was the typical immigration journey like? What documents might exist from that time?"

### Decoding Old Documents

**Prompt Template:**
"I found an old document that mentions [TERM OR PHRASE]. This was from [LOCATION] in [YEAR]. Can you help me understand what this term meant in that historical context?"

### Making Connections

**Prompt Template:**
"Based on someone living in [LOCATION] during [TIME PERIOD] who worked as a [OCCUPATION], what other records or resources might help me learn more about their life?"

### Your Turn!

Pick one of these templates and fill it in with your own family details. You're now doing AI-assisted genealogy research!
    `,
    quiz: [
      {
        question: "When researching ancestors, what should you include in your prompt?",
        options: ["Just their name", "Name, location, and time period", "Only the year", "Just the country"],
        correct: 1
      },
      {
        question: "AI can help you understand old documents by:",
        options: ["Reading handwriting for you", "Explaining historical terms and context", "Translating any language", "Finding the original document"],
        correct: 1
      }
    ]
  },
  {
    id: "tone-voice",
    track: "starter",
    title: "Setting the Tone: Making AI Sound Like You",
    description: "Control how AI writes - formal, casual, funny, or professional",
    duration: "12 min",
    hasQuiz: true,
    content: `
## AI Can Match Your Voice

One of the most powerful tricks: telling AI HOW to write, not just WHAT to write.

### Tone Instructions

Add these to any prompt:
- **"Write this in a friendly, conversational tone"**
- **"Keep it professional and formal"**
- **"Make it simple enough for a 10-year-old"**
- **"Write like a storyteller — warm and engaging"**

### Example: Same Request, Different Tones

**Formal:** "Compose a professional summary of the Battle of Gettysburg suitable for an academic paper."

**Casual:** "Tell me about the Battle of Gettysburg like you're explaining it to a friend over coffee."

**For kids:** "Explain the Battle of Gettysburg so a 4th grader would understand and find it interesting."

### The Voice Formula

Start your prompt with: "You are a [ROLE] writing for [AUDIENCE] in a [TONE] style."

Example: "You are a friendly history teacher writing for adults who are new to genealogy in a warm, encouraging style."

### Try It

Take any topic you're interested in and ask AI to explain it in three different tones. Notice how different each response feels!
    `,
    quiz: [
      {
        question: "How do you control the tone of AI's response?",
        options: ["You can't control it", "Include tone instructions in your prompt", "Use special codes", "Pay for premium access"],
        correct: 1
      },
      {
        question: "The Voice Formula starts with:",
        options: ["Dear AI", "You are a [ROLE] writing for [AUDIENCE]", "Please be nice", "Tone: formal"],
        correct: 1
      }
    ]
  },
  {
    id: "follow-up",
    track: "starter",
    title: "The Follow-Up: Building on AI Conversations",
    description: "How to dig deeper instead of starting over every time",
    duration: "10 min",
    hasQuiz: true,
    content: `
## Don't Start Over — Go Deeper

Most beginners ask one question, get an answer, then start a brand new conversation. That's like hanging up the phone every time someone answers.

### The Power of Follow-Ups

AI remembers your conversation. Use that!

**First prompt:** "What was life like in rural Ireland in the 1880s?"
**Follow-up:** "Now focus specifically on farming families. What crops did they grow?"
**Go deeper:** "What happened to those farms during the Great Famine?"
**Even deeper:** "If my ancestor left Ireland in 1885, what route would they likely have taken to America?"

### Follow-Up Starters

- "Tell me more about..."
- "Now focus on..."
- "What about the opposite — ..."
- "Can you give me a specific example of..."
- "How does that compare to..."
- "Break that down step by step"

### The Drill-Down Method

1. Start broad
2. Pick the most interesting part of the answer
3. Ask about that specifically
4. Repeat until you have what you need

### Why This Matters

One good conversation with follow-ups beats ten separate questions. You get deeper, more connected information.
    `,
    quiz: [
      {
        question: "Why are follow-up questions better than starting new conversations?",
        options: ["They're faster to type", "AI remembers context and gives deeper answers", "They cost less", "They don't require an account"],
        correct: 1
      },
      {
        question: "The Drill-Down Method starts with:",
        options: ["A very specific question", "A broad question, then narrow down", "A complaint about the last answer", "A copy-paste of the previous response"],
        correct: 1
      }
    ]
  },
  {
    id: "templates",
    track: "starter",
    title: "Copy-Paste Power: Prompt Templates That Work",
    description: "Ready-made prompt templates you can customize for any situation",
    duration: "15 min",
    hasQuiz: true,
    content: `
## Templates Save Time

Why write from scratch every time? Use templates and fill in the blanks.

### The Universal Template

"I need help with [TASK]. My audience is [WHO]. The goal is [OUTCOME]. Please write in a [TONE] style and keep it [LENGTH]."

### Research Template

"I'm researching [TOPIC]. Please provide:
1. A brief overview (2-3 sentences)
2. Three key facts most people don't know
3. Where I can learn more
4. Any common misconceptions to avoid"

### Writing Template

"Write a [TYPE OF WRITING] about [TOPIC] that is [LENGTH]. The tone should be [TONE]. Include [SPECIFIC ELEMENTS]. Avoid [THINGS TO SKIP]."

### Comparison Template

"Compare [THING A] and [THING B]. Create a simple table showing:
- Key differences
- Pros and cons of each
- Which is better for [SPECIFIC USE CASE]"

### Problem-Solving Template

"I'm dealing with [PROBLEM]. Here's what I've tried: [ATTEMPTS]. My constraints are [LIMITS]. What are three different approaches I haven't considered?"

### Pro Tip

Save your best prompts in a notes app. Build your own personal prompt library!
    `,
    quiz: [
      {
        question: "Why use prompt templates?",
        options: ["AI requires them", "They save time and give consistent results", "They're mandatory for paid accounts", "Templates are the only way AI works"],
        correct: 1
      },
      {
        question: "A good template includes:",
        options: ["Just the topic", "Task, audience, goal, and tone", "Only keywords", "Your personal information"],
        correct: 1
      }
    ]
  },
  {
    id: "ai-safety",
    track: "starter",
    title: "Staying Safe: What NOT to Tell AI",
    description: "Protect yourself — know what to share and what to keep private",
    duration: "10 min",
    hasQuiz: true,
    content: `
## AI Is Helpful, But Be Smart

AI tools are powerful, but you need to know what's safe to share and what isn't.

### Never Share With AI

- **Social Security numbers**
- **Bank account or credit card numbers**
- **Passwords or PINs**
- **Medical records with your real name attached**
- **Legal documents with case numbers**

### Be Careful With

- Full names + addresses combined
- Exact dates of birth for living people
- Private family conflicts or legal issues
- Workplace confidential information

### Safe to Share

- General questions about history, topics, or skills
- Anonymized scenarios ("Someone in this situation...")
- Creative writing requests
- Learning and research questions
- Public information

### The Newspaper Test

Before typing something into AI, ask: "Would I be comfortable if this appeared in a newspaper?" If not, don't type it.

### Remember

AI conversations may be stored, reviewed, or used for training. Treat every conversation as potentially public.
    `,
    quiz: [
      {
        question: "Which should you NEVER share with AI?",
        options: ["Your favorite color", "Your Social Security number", "A recipe question", "A historical question"],
        correct: 1
      },
      {
        question: "The Newspaper Test means:",
        options: ["Read the news to AI", "Only share what you'd be comfortable seeing published", "Print your AI chats", "AI reads newspapers for you"],
        correct: 1
      }
    ]
  },
  {
    id: "output-formats",
    track: "starter",
    title: "Tell AI What Shape You Want",
    description: "Get tables, lists, emails, scripts — just by asking",
    duration: "12 min",
    hasQuiz: true,
    content: `
## Format Matters

AI can give you the same information in completely different formats. You just have to ask.

### Format Commands

- **"Give me this as a bullet-point list"**
- **"Create a table with columns for..."**
- **"Write this as a step-by-step guide"**
- **"Format this as an email"**
- **"Present this as a pros/cons comparison"**
- **"Give me a numbered checklist"**

### Example: Same Info, Different Formats

Ask about healthy breakfasts:

**As a list:** Quick bullet points
**As a table:** Columns for meal, prep time, calories, ingredients
**As a weekly plan:** Monday through Sunday schedule
**As a shopping list:** Organized by grocery store aisle

### Pro Formats for Work

- **"Write a professional email"** — ready to copy-paste
- **"Create an agenda for a meeting about..."** — instant meeting prep
- **"Make a FAQ list about..."** — customer-ready content
- **"Draft a social media post about..."** — marketing in seconds

### The Magic Phrase

End any prompt with: "Format this as a [FORMAT TYPE] that I can easily [USE CASE]."

Example: "Format this as a checklist that I can easily print and hang on my fridge."
    `,
    quiz: [
      {
        question: "How do you get AI to create a table?",
        options: ["You can't", "Ask it to create a table with specific columns", "Upload a spreadsheet", "Use a special plugin"],
        correct: 1
      },
      {
        question: "The magic phrase to control format is:",
        options: ["Please try harder", "Format this as a [type] that I can easily [use]", "Make it look nice", "Use fancy formatting"],
        correct: 1
      }
    ]
  },
  {
    id: "review-practice",
    track: "starter",
    title: "Starter Review: Put It All Together",
    description: "Practice everything you've learned with real scenarios",
    duration: "20 min",
    hasQuiz: true,
    content: `
## You've Come a Long Way!

Let's review everything from the Starter track and practice with real scenarios.

### What You've Learned

1. **What a prompt is** — just what you type to AI
2. **Which AI to use** — different tools for different jobs
3. **Be specific** — the WHAT-WHO-WHEN-WHERE method
4. **Ancestry prompts** — templates for family research
5. **Tone control** — making AI match your voice
6. **Follow-ups** — drilling deeper instead of starting over
7. **Templates** — copy-paste frameworks that save time
8. **Safety** — what to share and what to keep private
9. **Formats** — getting output in the shape you need

### Practice Scenario 1: The Email

You need to write an email to a distant cousin you found through DNA matching. You want to introduce yourself and ask if they know anything about your shared great-grandmother.

Build your prompt using what you've learned!

### Practice Scenario 2: The Research

You found a census record from 1910 listing your ancestor's occupation as "puddler." You have no idea what that is.

How would you ask AI to help? Remember: be specific, ask for context, and request a useful format.

### Practice Scenario 3: The Comparison

You want to compare two DNA testing services to decide which to buy.

What template would you use? What format would you request?

### You're Ready

If you can handle these scenarios, you're ready for the Foundation track!
    `,
    quiz: [
      {
        question: "The WHAT-WHO-WHEN-WHERE method helps you:",
        options: ["Memorize facts", "Give AI enough context to help you", "Type faster", "Avoid paying for AI"],
        correct: 1
      },
      {
        question: "Before sharing information with AI, you should:",
        options: ["Share everything for best results", "Apply the Newspaper Test", "Only use AI on weekdays", "Never share anything at all"],
        correct: 1
      }
    ]
  },
  {
    id: "troubleshooting",
    track: "foundation",
    title: "When AI Gets It Wrong",
    description: "What to do when the AI gives you a confusing or incorrect answer",
    duration: "15 min",
    hasQuiz: true,
    content: `
## It Happens to Everyone!

Sometimes AI gives answers that don't quite make sense. That's normal! Here's how to handle it.

### Why AI Makes Mistakes

AI doesn't actually "know" things - it predicts what words come next based on patterns. Sometimes it:
- Makes up facts (called "hallucinations")
- Misunderstands your question
- Gives outdated information

### The Fix-It Toolkit

**1. Ask for sources:**
"Can you tell me where this information comes from?"

**2. Be more specific:**
"I meant specifically about [clarify what you meant]"

**3. Ask it to double-check:**
"Are you certain about this? Please verify."

**4. Break it into smaller questions:**
Instead of asking everything at once, ask one thing at a time.

### Real Example

❌ AI says: "Your ancestor John Smith was a famous general in the Revolutionary War."
✅ Your response: "Can you verify this? I'm looking for John Smith born around 1850 in Ohio, so he couldn't have been in the Revolutionary War."

### Remember

Being a good prompt engineer means knowing when to push back politely!
    `,
    quiz: [
      {
        question: "When AI makes a mistake, you should:",
        options: ["Give up", "Ask it to clarify or verify", "Assume all AI is useless", "Accept the wrong answer"],
        correct: 1
      },
      {
        question: "AI 'hallucinations' are when:",
        options: ["AI sees images", "AI makes up facts that sound real", "AI crashes", "AI goes offline"],
        correct: 1
      }
    ]
  },
  {
    id: "beyond-ancestry",
    track: "foundation",
    title: "Using AI for Everything Else",
    description: "Apply your new skills to work, hobbies, and daily life",
    duration: "20 min",
    hasQuiz: true,
    content: `
## Your Skills Work Everywhere!

The prompt engineering skills you've learned work for much more than ancestry research.

### At Work
- "Help me write a professional email to [recipient] about [topic]"
- "Summarize this long document in bullet points"
- "Create a to-do list for my project on [topic]"

### Creative Projects
- "Help me write a birthday message for my [relationship]"
- "Suggest ideas for a garden that works in [your climate]"
- "Explain how to [hobby or skill] for a complete beginner"

### Daily Life
- "What's a simple recipe using [ingredients you have]?"
- "Help me plan a trip to [destination] for [number] days"
- "Explain [confusing topic] like I'm new to this"

### You're Becoming Valuable!

These are exactly the skills that companies need. Many businesses want to hire people who can effectively communicate with AI tools.

The fact that you're learning this puts you ahead of many people - including those much younger than you!
    `,
    quiz: [
      {
        question: "Prompt engineering skills are useful for:",
        options: ["Only ancestry research", "Only work emails", "Almost everything — work, hobbies, daily life", "Only creative writing"],
        correct: 2
      },
      {
        question: "Companies want to hire people who can:",
        options: ["Build AI from scratch", "Effectively communicate with AI tools", "Replace AI", "Avoid using AI"],
        correct: 1
      }
    ]
  },
  {
    id: "role-playing",
    track: "foundation",
    title: "Role Assignment: Make AI an Expert",
    description: "Assign AI a role and watch the quality skyrocket",
    duration: "15 min",
    hasQuiz: true,
    content: `
## The Role Trick

This one technique will transform your results: tell AI WHO to be before asking your question.

### How It Works

Start your prompt with: **"You are a [specific expert]..."**

### Examples

**Without role:** "How do I fix a leaky faucet?"
**With role:** "You are an experienced plumber with 20 years of experience. Walk me through fixing a leaky faucet, including the tools I'll need and common mistakes beginners make."

**Without role:** "Tell me about investing."
**With role:** "You are a financial advisor who specializes in helping people over 50 plan for retirement. Explain the basics of investing in simple terms, avoiding jargon."

### Powerful Roles to Try

- "You are a patient teacher who explains things step by step"
- "You are a professional editor reviewing my writing"
- "You are a career coach helping someone re-enter the workforce"
- "You are a genealogist with expertise in [country/region] records"
- "You are a doctor explaining a diagnosis in plain English"

### Stack Roles for Better Results

"You are a genealogist AND a historian specializing in 19th-century immigration. Help me understand why my ancestor might have left Germany in 1848."

### Why This Works

Roles give AI a perspective and expertise level. Without a role, you get generic answers. With a role, you get expert-level guidance.
    `,
    quiz: [
      {
        question: "Assigning AI a role helps because:",
        options: ["It's required by the terms of service", "It gives AI a perspective and expertise level", "AI can't answer without one", "It makes AI faster"],
        correct: 1
      },
      {
        question: "A good role assignment includes:",
        options: ["Just the job title", "A specific expert with relevant experience", "A fictional character name", "Your own name"],
        correct: 1
      }
    ]
  },
  {
    id: "chain-prompting",
    track: "foundation",
    title: "Chain Prompting: Complex Tasks Made Simple",
    description: "Break big projects into a series of connected prompts",
    duration: "18 min",
    hasQuiz: true,
    content: `
## Big Tasks Need Multiple Steps

Trying to do everything in one prompt leads to messy results. Chain prompting breaks complex work into clean steps.

### The Chain Method

**Step 1 — Research:** "Give me an overview of [topic]"
**Step 2 — Analyze:** "Based on that overview, what are the three most important points?"
**Step 3 — Create:** "Now write a [document type] focusing on those three points"
**Step 4 — Refine:** "Review what you wrote and improve the [specific aspect]"

### Real Example: Writing a Family History

**Prompt 1:** "List the major historical events in Poland between 1880-1920 that would have affected farming families."

**Prompt 2:** "My ancestor was a farmer in Krakow during this period. Based on those events, what was their daily life probably like?"

**Prompt 3:** "Now write a 500-word narrative about a typical day for this farmer, incorporating the historical details."

**Prompt 4:** "Review that narrative. Make the language more vivid and add sensory details — what did they see, hear, smell?"

### When to Chain

- Writing anything longer than a paragraph
- Research that requires multiple angles
- Projects with a planning phase and an execution phase
- Anything that needs revision

### The Rule

If your prompt is longer than 5 sentences, you probably need to chain it into multiple prompts instead.
    `,
    quiz: [
      {
        question: "Chain prompting means:",
        options: ["Typing everything in one long message", "Breaking complex tasks into connected steps", "Using chain email templates", "Linking multiple AI accounts"],
        correct: 1
      },
      {
        question: "When should you use chain prompting?",
        options: ["Only for short questions", "When a task is too complex for a single prompt", "Never — one prompt is always better", "Only with paid AI accounts"],
        correct: 1
      }
    ]
  },
  {
    id: "fact-checking",
    track: "foundation",
    title: "Fact-Checking AI: Trust but Verify",
    description: "How to spot AI mistakes and verify important information",
    duration: "15 min",
    hasQuiz: true,
    content: `
## AI Is Confident Even When Wrong

The most dangerous thing about AI is that it states incorrect information with complete confidence. Here's how to protect yourself.

### Red Flags to Watch For

- **Suspiciously specific numbers** — "Exactly 47,382 people immigrated that year"
- **Famous people connections** — "Your ancestor was friends with Abraham Lincoln"
- **Too-perfect stories** — Everything aligns too neatly
- **Confident but vague sources** — "According to historical records..."

### Verification Techniques

**The Cross-Check:** Ask the same question to a different AI. If they disagree, dig deeper.

**The Source Request:** "What specific sources can you point me to for this information? Give me book titles, website URLs, or archive names."

**The Challenge:** "I want to push back on this claim. What evidence contradicts it?"

**The Date Check:** "When was this information last updated? Is there more recent data?"

### For Genealogy Specifically

- AI cannot access actual genealogy databases (Ancestry, FamilySearch)
- AI makes up ancestors, dates, and connections
- Always verify names, dates, and relationships against actual records
- Use AI for context and strategy, not as a source of facts

### The Golden Rule

Use AI to learn HOW to research, not as the research itself.
    `,
    quiz: [
      {
        question: "A red flag that AI might be making something up is:",
        options: ["It says 'I'm not sure'", "It gives suspiciously specific numbers with complete confidence", "It asks you for more details", "It suggests checking a source"],
        correct: 1
      },
      {
        question: "For genealogy, AI should be used for:",
        options: ["Finding your exact ancestors", "Creating your family tree directly", "Learning research strategies and historical context", "Replacing genealogy databases"],
        correct: 2
      }
    ]
  },
  {
    id: "writing-with-ai",
    track: "foundation",
    title: "Writing with AI: From Draft to Polish",
    description: "Use AI as a writing partner — not a replacement",
    duration: "20 min",
    hasQuiz: true,
    content: `
## AI Is Your Writing Partner

The best way to use AI for writing isn't to say "write this for me." It's to collaborate.

### The Three-Phase Method

**Phase 1 — Brainstorm**
"I want to write about [topic]. Give me 5 different angles I could take."

**Phase 2 — Draft**
"I chose angle #3. Write a first draft of [length]. Here are my main points: [your ideas]."

**Phase 3 — Polish**
"Here's my draft: [paste your version]. Please improve the [clarity/flow/grammar/tone] while keeping my voice."

### Editing Prompts That Work

- "Make this more concise — cut 30% of the words without losing meaning"
- "Find any grammar or spelling errors in this text"
- "Rewrite the opening paragraph to hook the reader immediately"
- "Add transitions between these paragraphs so they flow better"
- "Simplify the vocabulary — aim for an 8th grade reading level"

### The Voice Trap

If you let AI write everything from scratch, it sounds like AI. Instead:
1. Write your own rough draft first
2. Let AI improve what YOU wrote
3. Your voice stays, but the quality goes up

### For Personal Projects

Writing a family history? A memoir? A letter to a relative?

"Here's what I want to say: [your rough thoughts]. Help me express this more clearly while keeping it personal and heartfelt."
    `,
    quiz: [
      {
        question: "The best way to use AI for writing is to:",
        options: ["Let AI write everything from scratch", "Write your own draft, then let AI improve it", "Copy AI's output word for word", "Avoid AI for writing entirely"],
        correct: 1
      },
      {
        question: "The Three-Phase Method is:",
        options: ["Write, delete, rewrite", "Brainstorm, draft, polish", "Copy, paste, submit", "Research, outline, type"],
        correct: 1
      }
    ]
  },
  {
    id: "ai-for-work",
    track: "foundation",
    title: "AI at Work: Skills Employers Want",
    description: "Turn your prompt skills into job-ready abilities",
    duration: "18 min",
    hasQuiz: true,
    content: `
## These Skills Pay

Prompt engineering isn't just a hobby — it's a marketable skill. Here's how to use it professionally.

### Skills That Get You Hired

1. **Writing professional emails** — "Draft an email to [person] about [situation] in a professional but warm tone"
2. **Meeting prep** — "Create an agenda and talking points for a meeting about [topic]"
3. **Report writing** — "Summarize these data points into an executive summary"
4. **Problem solving** — "Here's the problem: [describe]. Give me three solutions with pros/cons"
5. **Training materials** — "Create a training guide for [process] written for new employees"

### Remote Work Gold

Many remote jobs specifically want people who can:
- Use AI to increase productivity
- Create content efficiently
- Analyze information quickly
- Communicate clearly in writing

### How to Talk About It

On a resume: "Proficient in AI-assisted workflow optimization and prompt engineering"

In an interview: "I use AI tools strategically to improve efficiency. For example, I can draft, research, and analyze information 3x faster by knowing how to communicate effectively with AI."

### Freelance Opportunities

- Content writing (with AI as your assistant)
- Virtual assistant work (using AI for research and drafting)
- Data analysis (using AI to interpret information)
- Customer service (using AI to draft professional responses)

### The Advantage

Most people over 40 think they're "too old" for tech. By learning this, you've proven that wrong. You have life experience AND AI skills — that's a powerful combination.
    `,
    quiz: [
      {
        question: "On a resume, prompt engineering skills should be described as:",
        options: ["'I talk to robots'", "'AI-assisted workflow optimization'", "'I use ChatGPT sometimes'", "'Computer skills'"],
        correct: 1
      },
      {
        question: "The advantage of learning AI skills later in life is:",
        options: ["There is no advantage", "You combine life experience with AI skills", "Younger people can't learn AI", "AI works better for older users"],
        correct: 1
      }
    ]
  },
  {
    id: "ai-ethics",
    track: "foundation",
    title: "AI Ethics: Using AI Responsibly",
    description: "Understand bias, copyright, and the ethical use of AI tools",
    duration: "15 min",
    hasQuiz: true,
    content: `
## With Great Power...

AI is a powerful tool. Like any tool, it can be used well or poorly. Here's how to use it responsibly.

### AI Bias Is Real

AI learns from human-written text, which means it inherits human biases:
- **Gender bias:** May assume doctors are male, nurses are female
- **Cultural bias:** May default to Western perspectives
- **Historical bias:** May repeat outdated stereotypes

### What You Can Do

**Challenge assumptions:** If AI gives you a biased answer, say "That seems to assume [X]. Can you reconsider without that assumption?"

**Ask for multiple perspectives:** "Give me three different viewpoints on this topic, including perspectives that are often overlooked."

**Check for balance:** "Is this answer considering people from different backgrounds, ages, and cultures?"

### Copyright and AI

- AI-generated text is not copyrighted (currently)
- Don't paste someone else's copyrighted work and ask AI to rewrite it
- Give credit when AI helps you create something
- Your ideas + AI's writing = your work, but be transparent about using AI

### The Human-in-the-Loop Rule

AI should assist your thinking, not replace it. Always:
1. Review AI output before using it
2. Apply your own judgment and experience
3. Take responsibility for what you publish or share
4. Never blame AI for your decisions

### The Bottom Line

Use AI to amplify your capabilities, not to bypass your responsibility.
    `,
    quiz: [
      {
        question: "AI bias comes from:",
        options: ["AI being malicious", "AI learning from biased human-written text", "AI having opinions", "Programming errors only"],
        correct: 1
      },
      {
        question: "The Human-in-the-Loop Rule means:",
        options: ["Let AI make all decisions", "Always review and take responsibility for AI output", "Only use AI once per day", "AI should replace human judgment"],
        correct: 1
      }
    ]
  },
  {
    id: "advanced-techniques",
    track: "foundation",
    title: "Advanced Prompting Techniques",
    description: "Few-shot learning, chain-of-thought, and zero-shot — the pro methods",
    duration: "20 min",
    hasQuiz: true,
    content: `
## Level Up Your Prompting

These are the techniques professional prompt engineers use. They sound technical, but they're simple once you see them.

### Few-Shot Learning (Learning by Example)

Give AI examples of what you want before asking your question.

"Here are examples of good family history summaries:
- 'Maria Rossi (1892-1967) — Born in Naples, immigrated to New York in 1910, worked as a seamstress on the Lower East Side.'
- 'Thomas O'Brien (1845-1920) — Left County Cork during the famine, settled in Boston, became a longshoreman.'

Now write a similar summary for my ancestor based on this information: [your details]"

### Chain-of-Thought (Show Your Work)

Ask AI to think step by step.

"I need to figure out if two people in my family tree are the same person. Think through this step by step:
- Person A: John Smith, born ~1870, listed in Ohio census 1880
- Person B: J. Smith, born ~1868, listed in Pennsylvania census 1890"

### Zero-Shot (First Try, No Examples)

Give very clear, detailed instructions without examples.

"Without any examples, write a 200-word biography of a fictional 1900s immigrant. Include: country of origin, reason for leaving, journey details, first job in America, and one personal detail that makes them feel real."

### When to Use Each

- **Few-shot:** When you need a specific style or format
- **Chain-of-thought:** When you need analysis or problem-solving
- **Zero-shot:** When you need creative or unique output
    `,
    quiz: [
      {
        question: "Few-shot learning means:",
        options: ["AI only has a few seconds to answer", "You give AI examples before asking your question", "You only ask a few questions", "AI learns from a few websites"],
        correct: 1
      },
      {
        question: "Chain-of-thought prompting asks AI to:",
        options: ["Link multiple AI accounts", "Think through the problem step by step", "Create a chain of emails", "Skip the thinking and give a quick answer"],
        correct: 1
      }
    ]
  },
  {
    id: "foundation-review",
    track: "foundation",
    title: "Foundation Review: Your Complete Toolkit",
    description: "Review all Foundation skills and practice with advanced scenarios",
    duration: "25 min",
    hasQuiz: true,
    content: `
## You've Built a Serious Skill Set

Let's review everything from the Foundation track.

### Your Toolkit Summary

1. **Troubleshooting** — Fix AI mistakes with the Fix-It Toolkit
2. **Broad application** — AI works for work, hobbies, and daily life
3. **Role assignment** — Make AI an expert before asking
4. **Chain prompting** — Break complex tasks into steps
5. **Fact-checking** — Trust but verify, always
6. **Writing partnership** — Brainstorm, draft, polish
7. **Work skills** — Translate prompt skills into job-ready abilities
8. **Advanced techniques** — Few-shot, chain-of-thought, zero-shot

### Practice Scenario 1: The Job Application

You're applying for a remote customer service position. Use role assignment and writing techniques to draft a cover letter that highlights your AI skills.

### Practice Scenario 2: The Research Project

You want to write a 5-page family history for a family reunion. Plan your chain prompting sequence — what's prompt 1, 2, 3, etc.?

### Practice Scenario 3: The Fact Check

AI tells you: "The Ellis Island immigration records show that 95% of Italian immigrants between 1900-1910 settled in New York City." What red flags do you see? How would you verify this?

### What's Next?

You now have skills that many professionals don't. The Professional track adds advanced certification, portfolio building, and job placement support.

But even without going further — you're already dangerous with AI. In the best way.
    `,
    quiz: [
      {
        question: "To make AI give expert-level answers, you should:",
        options: ["Use bigger words", "Assign it a specific expert role", "Ask the same question repeatedly", "Use a paid account"],
        correct: 1
      },
      {
        question: "The best approach for a complex writing project is:",
        options: ["One massive prompt with everything", "Chain prompting — break it into steps", "Let AI decide the approach", "Write it yourself without AI"],
        correct: 1
      }
    ]
  }
];

export default function AcademyDashboard() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("academy_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (email.includes("@")) {
      localStorage.setItem("academy_email", email);
      setIsLoggedIn(true);
    }
  };

  const currentLesson = lessons.find(l => l.id === activeLesson);
  const starterLessons = lessons.filter(l => l.track === "starter");
  const foundationLessons = lessons.filter(l => l.track === "foundation");
  
  const starterComplete = starterLessons.every(l => completedLessons.includes(l.id));
  const foundationUnlocked = starterComplete;
  
  const availableLessons = foundationUnlocked ? lessons : starterLessons;
  const completedCount = completedLessons.length;
  const totalCount = availableLessons.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      
      const newBadges = [...earnedBadges];
      
      if (newCompleted.length === 1 && !newBadges.includes("explorer")) {
        newBadges.push("explorer");
      }
      
      const allStarterComplete = starterLessons.every(l => newCompleted.includes(l.id));
      if (allStarterComplete && !newBadges.includes("storyteller")) {
        newBadges.push("storyteller");
      }
      
      const allFoundationComplete = foundationLessons.every(l => newCompleted.includes(l.id));
      if (allFoundationComplete && !newBadges.includes("strategist")) {
        newBadges.push("strategist");
      }
      
      setEarnedBadges(newBadges);
    }
    setActiveLesson(null);
    setShowQuizResults(false);
    setQuizAnswers({});
  };

  const checkQuizAnswers = () => {
    setShowQuizResults(true);
  };

  const getQuizScore = () => {
    if (!currentLesson?.quiz) return 0;
    let correct = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[`q${idx}`] === q.correct) correct++;
    });
    return correct;
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">PromptPro Academy</CardTitle>
            <CardDescription>
              Enter your email to access courses and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email Address</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                data-testid="input-academy-email"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!email.includes("@")}
              data-testid="button-academy-login"
            >
              Access Academy
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Your progress will be saved automatically
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeLesson && currentLesson) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-4">
          <div className="container px-4">
            <Button variant="ghost" onClick={() => setActiveLesson(null)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="container px-4 py-8 max-w-3xl">
          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2">{currentLesson.duration}</Badge>
              <CardTitle className="text-2xl">{currentLesson.title}</CardTitle>
              <CardDescription>{currentLesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content.replace(/\n/g, '<br/>').replace(/##\s(.+)/g, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>').replace(/###\s(.+)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/❌/g, '<span class="text-red-500">❌</span>').replace(/✅/g, '<span class="text-green-500">✅</span>') }} />
              
              {currentLesson.quiz && (
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    Quick Check - Let's See What You Learned!
                  </h3>
                  
                  {currentLesson.quiz.map((q, idx) => (
                    <div key={idx} className="mb-6">
                      <p className="font-medium mb-3">{idx + 1}. {q.question}</p>
                      <RadioGroup
                        value={quizAnswers[`q${idx}`]?.toString()}
                        onValueChange={(val) => setQuizAnswers({...quizAnswers, [`q${idx}`]: parseInt(val)})}
                      >
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className={`flex items-center space-x-2 p-2 rounded ${
                            showQuizResults 
                              ? optIdx === q.correct 
                                ? 'bg-green-100' 
                                : quizAnswers[`q${idx}`] === optIdx 
                                  ? 'bg-red-100' 
                                  : ''
                              : ''
                          }`}>
                            <RadioGroupItem value={optIdx.toString()} id={`q${idx}-${optIdx}`} disabled={showQuizResults} />
                            <Label htmlFor={`q${idx}-${optIdx}`} className="cursor-pointer flex-1">{opt}</Label>
                            {showQuizResults && optIdx === q.correct && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                  
                  {!showQuizResults ? (
                    <Button onClick={checkQuizAnswers} className="bg-blue-600 hover:bg-blue-700">
                      Check My Answers
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-lg font-medium">
                          You got {getQuizScore()} out of {currentLesson.quiz.length} correct!
                          {getQuizScore() === currentLesson.quiz.length && " 🎉 Perfect!"}
                        </p>
                      </div>
                      <Button onClick={() => handleCompleteLesson(currentLesson.id)} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark Lesson Complete
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {!currentLesson.quiz && (
                <div className="mt-8">
                  <Button onClick={() => handleCompleteLesson(currentLesson.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Lesson Complete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8">
        <div className="container px-4">
          <Link href="/learn">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Academy Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold"><span className="text-blue-300">Prompt</span>Pro Academy</h1>
          <p className="text-blue-200 mt-2">Your Learning Dashboard</p>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{completedCount} of {totalCount} lessons completed</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Lessons */}
            <Tabs defaultValue="starter">
              <TabsList className="w-full">
                <TabsTrigger value="starter" className="flex-1">Starter Track</TabsTrigger>
                <TabsTrigger value="foundation" className="flex-1">Foundation Track</TabsTrigger>
              </TabsList>

              <TabsContent value="starter" className="space-y-4 mt-4">
                <p className="text-muted-foreground">Learn the basics using your ancestry research as practice!</p>
                {starterLessons.map((lesson, idx) => (
                  <Card key={lesson.id} className={`cursor-pointer hover:shadow-md transition-shadow ${completedLessons.includes(lesson.id) ? 'border-green-300 bg-green-50/50' : ''}`} onClick={() => setActiveLesson(lesson.id)}>
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${completedLessons.includes(lesson.id) ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                          {completedLessons.includes(lesson.id) ? <CheckCircle2 className="h-5 w-5" /> : <span>{idx + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{lesson.duration}</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="foundation" className="space-y-4 mt-4">
                <p className="text-muted-foreground">Take your skills further - apply them to work and life!</p>
                {!foundationUnlocked && (
                  <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
                    <CardContent className="py-4 text-center">
                      <Lock className="h-6 w-6 mx-auto text-blue-400 mb-2" />
                      <p className="text-sm text-blue-600">Complete all Starter lessons to unlock Foundation track!</p>
                    </CardContent>
                  </Card>
                )}
                {foundationLessons.map((lesson, idx) => {
                  const isLocked = !foundationUnlocked;
                  return (
                    <Card key={lesson.id} className={`${isLocked ? 'opacity-60' : 'cursor-pointer hover:shadow-md'} transition-shadow`} onClick={() => !isLocked && setActiveLesson(lesson.id)}>
                      <CardContent className="py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLocked ? 'bg-gray-200 text-gray-400' : completedLessons.includes(lesson.id) ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-600'}`}>
                            {isLocked ? <Lock className="h-5 w-5" /> : completedLessons.includes(lesson.id) ? <CheckCircle2 className="h-5 w-5" /> : <span>{idx + 1}</span>}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{lesson.duration}</span>
                            {!isLocked && <ChevronRight className="h-4 w-4" />}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Badges */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Your Badges
                </CardTitle>
                <CardDescription>Earn these as you progress!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map(badge => {
                    const Icon = badge.icon;
                    const isEarned = earnedBadges.includes(badge.id);
                    return (
                      <div key={badge.id} className={`text-center p-4 rounded-lg ${isEarned ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200' : 'bg-gray-50 opacity-50'}`}>
                        <Icon className={`h-8 w-8 mx-auto mb-2 ${isEarned ? badge.color : 'text-gray-300'}`} />
                        <p className="font-medium text-sm">{badge.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="py-6 text-center">
                <GraduationCap className="h-8 w-8 mx-auto text-green-600 mb-3" />
                <h3 className="font-bold mb-2">AI Tutor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant help with your questions from our AI tutor!
                </p>
                <Link href="/academy/tutor">
                  <Button className="bg-green-600 hover:bg-green-700" size="sm">Ask the Tutor</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="py-6 text-center">
                <Users className="h-8 w-8 mx-auto text-purple-600 mb-3" />
                <h3 className="font-bold mb-2">Student Forum</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with fellow learners - ask questions, share tips!
                </p>
                <Link href="/academy/forum">
                  <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-100">Visit Forum</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="py-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Need 1-on-1 Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a personal session and we'll practice together!
                </p>
                <Link href="/pricing">
                  <Button variant="outline" size="sm">Book Session - $99/hr</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
