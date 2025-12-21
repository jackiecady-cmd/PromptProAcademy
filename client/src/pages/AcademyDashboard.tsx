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
- Data concern: Partners with Palantir (surveillance/data company) - be mindful of what you share
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
      }
    ]
  },
  {
    id: "beyond-ancestry",
    track: "foundation",
    title: "Using AI for Everything Else",
    description: "Apply your new skills to work, hobbies, and daily life",
    duration: "20 min",
    hasQuiz: false,
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
    `
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
