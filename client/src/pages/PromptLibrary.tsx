import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Sparkles, Copy, ExternalLink, Briefcase, Users, Lightbulb, PenTool } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const promptPacks = [
  {
    id: "writing",
    title: "AI Writing Partnership",
    description: "Master prompts for writing emails, reports, blog posts, and creative content with AI.",
    icon: PenTool,
    price: 5,
    prompts: [
      {
        title: "Professional Email Writer",
        preview: "Help me write a professional email about [topic]...",
        fullPrompt: "I need to write a professional email about [topic]. The tone should be [formal/friendly/persuasive]. Context: [explain the situation]. The recipient is [role/relationship]. Key points I need to cover:\n\n1. [Point 1]\n2. [Point 2]\n3. [Point 3]\n\nPlease write the email and suggest a strong subject line. Keep it concise but thorough.",
        targetAI: "Any AI"
      },
      {
        title: "Blog Post Generator",
        preview: "Create a blog post outline and draft about [topic]...",
        fullPrompt: "Create a comprehensive blog post about [topic]. Target audience: [describe audience]. Goal: [inform/persuade/entertain]. Include:\n\n1. An engaging headline with SEO keywords\n2. A hook opening paragraph\n3. 3-5 main sections with subheadings\n4. Practical examples and actionable tips\n5. A compelling conclusion with a call to action\n\nWrite in a [casual/professional/conversational] tone. Approximate length: [word count].",
        targetAI: "Claude or ChatGPT"
      }
    ]
  },
  {
    id: "career",
    title: "Career & Job Search",
    description: "Prompts to write resumes, cover letters, and prepare for interviews using AI.",
    icon: Briefcase,
    price: 10,
    prompts: [
      {
        title: "Resume Optimizer",
        preview: "Optimize my resume for the position of [job title]...",
        fullPrompt: "I'm applying for the position of [job title] at [company type]. Here's my current experience:\n\n[Paste current resume or key experience]\n\nThe job description mentions these key requirements:\n[Paste key requirements]\n\nPlease:\n1. Rewrite my bullet points using strong action verbs and quantified achievements\n2. Suggest keywords from the job description to incorporate\n3. Identify gaps I should address in my cover letter\n4. Rate how well my experience matches (1-10) and explain why",
        targetAI: "Claude or ChatGPT"
      },
      {
        title: "Interview Preparation",
        preview: "Help me prepare for an interview for [position]...",
        fullPrompt: "I have an interview for [position] at [company/industry]. Help me prepare:\n\n1. Generate 10 likely interview questions for this role\n2. For each question, provide a strong answer framework using the STAR method\n3. Suggest 5 thoughtful questions I should ask the interviewer\n4. Identify potential red flags or tricky questions to watch for\n5. Give me a 30-second elevator pitch about my background\n\nMy relevant experience: [brief summary]",
        targetAI: "Any AI"
      }
    ]
  },
  {
    id: "learning",
    title: "Learning & Study Companion",
    description: "Use AI as your personal tutor for any subject or skill.",
    icon: Lightbulb,
    price: 5,
    prompts: [
      {
        title: "Explain Like I'm a Beginner",
        preview: "Explain [complex topic] in simple terms...",
        fullPrompt: "I want to understand [topic/concept]. I'm a complete beginner with no background in this area. Please:\n\n1. Explain it using a simple analogy from everyday life\n2. Break it into 3-5 key concepts I need to understand first\n3. Give me a practical example I can relate to\n4. Tell me the most common misconceptions about this topic\n5. Suggest a learning path: what should I study next?\n\nUse plain language — avoid jargon unless you define it clearly.",
        targetAI: "Claude or ChatGPT"
      },
      {
        title: "Quiz Me on This Topic",
        preview: "Create a quiz to test my understanding of [subject]...",
        fullPrompt: "Create a comprehensive quiz to test my understanding of [subject/topic]. My current level: [beginner/intermediate/advanced].\n\nInclude:\n1. 5 multiple choice questions (with explanations for correct answers)\n2. 3 true/false questions\n3. 2 short answer questions that require deeper thinking\n4. 1 scenario-based question that tests practical application\n\nAfter I answer, grade me and explain what I got wrong and why. Suggest specific areas to review.",
        targetAI: "Any AI"
      }
    ]
  },
  {
    id: "productivity",
    title: "Productivity & Organization",
    description: "AI prompts to plan projects, organize tasks, and boost your efficiency.",
    icon: Users,
    price: 10,
    prompts: [
      {
        title: "Project Planner",
        preview: "Help me plan and organize my project about [topic]...",
        fullPrompt: "I need to plan a project: [describe project]. Timeline: [deadline]. Resources available: [team size, budget, tools].\n\nPlease create:\n1. A project breakdown with major milestones\n2. A week-by-week timeline with specific deliverables\n3. A task list organized by priority (high/medium/low)\n4. Potential risks and how to mitigate them\n5. A simple status tracking template I can use\n\nKeep it practical and actionable — I'm [working solo / managing a small team].",
        targetAI: "Claude or ChatGPT"
      },
      {
        title: "Decision Matrix",
        preview: "Help me make a tough decision between [options]...",
        fullPrompt: "I need help deciding between these options:\n\nOption A: [describe]\nOption B: [describe]\nOption C: [describe] (if applicable)\n\nMy priorities are: [list what matters most, e.g., cost, time, quality, risk]\n\nPlease:\n1. Create a weighted decision matrix comparing all options\n2. List pros and cons for each\n3. Identify hidden risks or factors I might not have considered\n4. Give me your recommendation with reasoning\n5. Suggest what additional information would help me decide",
        targetAI: "Any AI"
      }
    ]
  }
];

export default function PromptLibrary() {
  const [unlockedPacks, setUnlockedPacks] = useState<string[]>([]);
  const { toast } = useToast();

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard. Paste it into your AI of choice.",
    });
  };

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-accent/20 text-accent-foreground">
            <Sparkles className="h-3 w-3 mr-1" /> Prompt Engineering Templates
          </Badge>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-prompt-library-title">
            AI Prompt Library
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert prompts to help you get the most out of Claude, ChatGPT, Grok, and more. 
            Copy, customize, and use — skills you'll use forever.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mb-12 bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">Full Library Access</h3>
                <p className="text-sm text-muted-foreground">All current packs + future additions</p>
              </div>
              <Link href="/learn">
                <Button className="bg-blue-600 hover:bg-blue-700" data-testid="btn-enroll-academy">
                  Enroll in PromptPro Academy
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {promptPacks.map((pack) => {
            const Icon = pack.icon;
            const isUnlocked = unlockedPacks.includes(pack.id);

            return (
              <Card key={pack.id} className="flex flex-col" data-testid={`card-pack-${pack.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pack.title}</CardTitle>
                        <CardDescription>{pack.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3">
                    {pack.prompts.map((prompt, idx) => (
                      <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{prompt.title}</span>
                          <Badge variant="outline" className="text-xs">{prompt.targetAI}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{prompt.preview}</p>
                        {isUnlocked ? (
                          <div className="space-y-2">
                            <pre className="text-xs bg-background p-3 rounded border whitespace-pre-wrap font-sans">
                              {prompt.fullPrompt}
                            </pre>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyPrompt(prompt.fullPrompt)}
                              data-testid={`btn-copy-${pack.id}-${idx}`}
                            >
                              <Copy className="h-3 w-3 mr-1" /> Copy Prompt
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Lock className="h-3 w-3" />
                            <span>Unlock to see full prompt</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {isUnlocked ? (
                    <Badge className="bg-green-600">Unlocked</Badge>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => {
                        setUnlockedPacks([...unlockedPacks, pack.id]);
                        toast({
                          title: "Pack Unlocked!",
                          description: `${pack.title} prompts are now available.`,
                        });
                      }}
                      data-testid={`btn-unlock-${pack.id}`}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Unlock Pack — ${pack.price}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
