import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Home
} from "lucide-react";
import { Link } from "wouter";

const courseTiers = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "DIY Ancestry Research",
    price: 29,
    description: "Learn to use AI for your own family history research. Perfect introduction to working with AI.",
    duration: "Self-paced",
    includes: [
      "5 guided AI conversations",
      "Basic prompt templates",
      "Ancestry research prompts",
      "Email support",
    ],
    outcomes: [
      "Confidently use ChatGPT, Claude, or Grok",
      "Research your family history with AI",
      "Understand what makes a good prompt",
    ],
    color: "bg-blue-500",
  },
  {
    id: "foundation",
    name: "Foundation",
    subtitle: "Prompt Engineering Basics",
    price: 99,
    description: "Master the fundamentals of prompt engineering. Build skills employers are looking for.",
    duration: "2 weeks",
    includes: [
      "Everything in Starter",
      "10+ skill-building exercises",
      "Video tutorials",
      "Practice assessments",
      "Certificate of Completion",
    ],
    outcomes: [
      "Write effective prompts for any AI",
      "Understand AI capabilities and limits",
      "Troubleshoot when AI gives poor results",
      "Add to your resume/LinkedIn",
    ],
    popular: true,
    color: "bg-primary",
  },
  {
    id: "professional",
    name: "Professional",
    subtitle: "Career-Ready Skills",
    price: 249,
    description: "Comprehensive training to work professionally with AI. Includes job placement support.",
    duration: "4 weeks",
    includes: [
      "Everything in Foundation",
      "Advanced prompt techniques",
      "Real-world project portfolio",
      "1-on-1 coaching session",
      "Job search assistance",
      "Professional Certificate",
      "LinkedIn recommendation",
    ],
    outcomes: [
      "Apply for AI-related remote jobs",
      "Freelance as a prompt engineer",
      "Train others in your organization",
      "Portfolio of completed projects",
    ],
    color: "bg-accent",
  },
];

const testimonials = [
  {
    name: "Margaret T., 62",
    quote: "I came here to learn about my ancestors and left with a new career skill. Now I help local businesses use AI!",
    location: "Ohio"
  },
  {
    name: "Robert K., 58",
    quote: "After 30 years in retail, I thought my options were limited. This course opened doors I didn't know existed.",
    location: "Florida"
  },
  {
    name: "Patricia L., 67",
    quote: "Working from home with AI lets me spend time with my grandkids while earning good money.",
    location: "Texas"
  },
];

export default function LearnPromptEngineering() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              A WhoamI Partner Program
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              <span className="text-blue-300">Prompt</span>Pro Academy
            </h1>
            <p className="text-lg text-blue-200 mb-4">Remote Work Training for the AI Era</p>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              You've already started using AI to discover your ancestry. 
              Now turn that skill into something bigger—a new career, side income, or work-from-home flexibility.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">$50-100</div>
              <div className="text-sm text-blue-200">Per hour potential</div>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-blue-200">Remote work</div>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-white">No Degree</div>
              <div className="text-sm text-blue-200">Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">Why Learn Prompt Engineering?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Home className="h-10 w-10 mx-auto text-primary mb-4" />
                <h3 className="font-bold mb-2">Work From Home</h3>
                <p className="text-sm text-muted-foreground">
                  No commute, no physical demands. Perfect for anyone who needs flexibility.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-10 w-10 mx-auto text-primary mb-4" />
                <h3 className="font-bold mb-2">Growing Demand</h3>
                <p className="text-sm text-muted-foreground">
                  Companies everywhere need people who can work effectively with AI.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-10 w-10 mx-auto text-primary mb-4" />
                <h3 className="font-bold mb-2">Any Age Welcome</h3>
                <p className="text-sm text-muted-foreground">
                  Life experience is an asset. Your wisdom makes you better at communicating with AI.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Tiers */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-serif font-bold text-center mb-4">Choose Your Learning Path</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start with what's comfortable. You can always upgrade as you grow more confident.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courseTiers.map((tier) => (
              <Card 
                key={tier.id} 
                className={`relative ${tier.popular ? 'border-2 border-primary shadow-lg scale-105 z-10' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${tier.color} flex items-center justify-center text-white mb-4`}>
                    {tier.id === 'starter' && <Star className="h-6 w-6" />}
                    {tier.id === 'foundation' && <GraduationCap className="h-6 w-6" />}
                    {tier.id === 'professional' && <Briefcase className="h-6 w-6" />}
                  </div>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.subtitle}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${tier.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{tier.duration}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Includes:</p>
                    {tier.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/academy/checkout">
                    <Button className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`} variant={tier.popular ? 'default' : 'outline'}>
                      Enroll Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <p className="text-sm italic mb-4">"{t.quote}"</p>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-16">
        <div className="container px-4 md:px-6 max-w-3xl">
          <Card className="border-2 border-accent/30">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Earn Your Certification</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete our assessments and receive a professional certificate you can add to your 
                    resume and LinkedIn. We'll even help you write your job applications using AI.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Resume Ready</Badge>
                    <Badge variant="outline">LinkedIn Badge</Badge>
                    <Badge variant="outline">Verified Skills</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-indigo-800 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
            Whether you're 45 or 75, it's never too late to learn a valuable new skill.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-white/90">
                ← Back to WhoamI
              </Button>
            </Link>
            <Link href="/prompts">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse AI Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
