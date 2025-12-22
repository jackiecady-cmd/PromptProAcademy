import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Code, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight,
  Users,
  Award,
  Zap,
  Brain,
  Target,
  Rocket
} from "lucide-react";

export default function VibeCodeAcademy() {
  const features = [
    {
      icon: Brain,
      title: "Think Like a Product Engineer",
      description: "Learn to see the big picture - what the product needs, what users want, and how AI can build it."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Development",
      description: "Master the art of describing exactly what you want to build, and let AI write the code for you."
    },
    {
      icon: Target,
      title: "Real-World Projects",
      description: "Build actual working applications throughout the course - add them to your portfolio."
    },
    {
      icon: Briefcase,
      title: "Career-Ready Skills",
      description: "Graduate with the skills companies are desperately seeking. This is the future of software development."
    }
  ];

  const semesters = [
    {
      number: 1,
      title: "Foundations of Vibe Coding",
      status: "Available Now",
      price: "$299",
      topics: [
        "Understanding what vibe coding really means",
        "Thinking like a product engineer",
        "Setting up your AI-powered workspace",
        "Your first complete application",
        "Describing features clearly to AI",
        "Testing and refining your builds"
      ]
    },
    {
      number: 2,
      title: "Advanced Product Building",
      status: "Coming Soon",
      price: "$399",
      topics: [
        "Complex multi-feature applications",
        "Database design and management",
        "User authentication and security",
        "API integrations",
        "Payment systems",
        "Deployment and hosting"
      ]
    },
    {
      number: 3,
      title: "Enterprise & Team Skills",
      status: "Coming Soon",
      price: "$499",
      topics: [
        "Working with existing codebases",
        "Collaborating with AI on large projects",
        "Code review and quality assurance",
        "Documentation best practices",
        "Managing product requirements",
        "Interview preparation"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Coming Soon",
      role: "Future Graduate",
      quote: "Be among the first to transform your career with vibe coding skills."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-purple-600/50 text-purple-100 border-purple-400">
            <Zap className="h-3 w-3 mr-1" /> The Future of Software Development
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Vibe Code Academy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-4 max-w-3xl mx-auto">
            Build software products without writing code yourself.
          </p>
          
          <p className="text-lg text-purple-300 mb-8 max-w-2xl mx-auto">
            Learn to think like a product engineer and use AI to bring your ideas to life. 
            The most valuable skill in tech right now - and we'll teach you everything.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/vibe-code/enroll">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8" data-testid="button-enroll-now">
                <Rocket className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link href="/vibe-code/curriculum">
              <Button size="lg" variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-800/50" data-testid="button-view-curriculum">
                View Full Curriculum
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-purple-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>No coding experience needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Real projects for your portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Certificate upon completion</span>
            </div>
          </div>
        </div>
      </section>

      {/* What is Vibe Coding Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What is <span className="text-purple-400">Vibe Coding</span>?
            </h2>
            <p className="text-lg text-gray-300">
              Vibe coding is the future of software development. Instead of writing code line-by-line, 
              you describe what you want to build in plain English, and AI tools create it for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <span className="text-2xl">❌</span> Traditional Coding
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <p>• Years of learning syntax and languages</p>
                <p>• Memorizing functions and frameworks</p>
                <p>• Debugging cryptic error messages</p>
                <p>• Slow, frustrating development</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-600">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Vibe Coding
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2">
                <p>• Describe what you want in plain words</p>
                <p>• AI writes the code for you</p>
                <p>• Focus on product vision, not syntax</p>
                <p>• Build complete apps in hours, not months</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What You'll Learn
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-colors" data-testid={`card-feature-${idx}`}>
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-purple-400 mb-2" />
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Semesters */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Course Semesters</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Progress through our structured curriculum. Each semester builds on the last, 
              taking you from beginner to job-ready product engineer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {semesters.map((semester, idx) => (
              <Card 
                key={idx} 
                className={`relative overflow-hidden ${
                  semester.status === "Available Now" 
                    ? "bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-purple-500" 
                    : "bg-slate-800/50 border-slate-700"
                }`}
                data-testid={`card-semester-${semester.number}`}
              >
                {semester.status === "Available Now" && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                    Start Now
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                      {semester.number}
                    </div>
                    <Badge variant={semester.status === "Available Now" ? "default" : "secondary"}>
                      {semester.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{semester.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-purple-300">
                    {semester.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {semester.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {semester.status === "Available Now" && (
                    <Link href="/vibe-code/enroll">
                      <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700" data-testid="button-enroll-semester-1">
                        Enroll Now <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Who Is This For?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Career Changers</h3>
                <p className="text-gray-400">
                  Want to break into tech without years of coding bootcamps? 
                  Vibe coding is your fast track.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-6">
                <Briefcase className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Entrepreneurs</h3>
                <p className="text-gray-400">
                  Have a great product idea? Build it yourself instead of 
                  paying expensive developers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-6">
                <GraduationCap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Product Managers</h3>
                <p className="text-gray-400">
                  Understand what's possible and communicate better with 
                  technical teams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Taught by Experts */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="container mx-auto text-center">
          <Award className="h-16 w-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Taught by Industry Experts
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Learn from professionals who manage real products used by millions. 
            Our lead instructor oversees an entire product division at a Fortune 500 company.
          </p>
          <p className="text-purple-300">
            Real-world experience. Real-world skills. Real job opportunities.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join Vibe Code Academy and learn the most in-demand skill in tech today.
          </p>
          <Link href="/vibe-code/enroll">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg" data-testid="button-cta-enroll">
              <Code className="h-6 w-6 mr-2" />
              Start Semester 1 - $299
            </Button>
          </Link>
          <p className="text-gray-500 mt-4 text-sm">
            30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
