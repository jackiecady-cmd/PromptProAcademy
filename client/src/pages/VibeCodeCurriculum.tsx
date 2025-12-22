import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Video,
  FileText,
  Award,
  Lock
} from "lucide-react";

export default function VibeCodeCurriculum() {
  const semester1Lessons = [
    {
      week: 1,
      title: "Understanding Vibe Coding",
      description: "What vibe coding really means and why it's transforming the tech industry",
      topics: [
        "The shift from traditional coding to AI-assisted development",
        "Why product thinking matters more than syntax",
        "Setting up your vibe coding workspace (Replit, Cursor, etc.)",
        "Your first conversation with an AI coding assistant"
      ],
      duration: "2-3 hours",
      hasVideo: true,
      hasQuiz: true
    },
    {
      week: 2,
      title: "Thinking Like a Product Engineer",
      description: "Learn to see software from the user's perspective, not just the code",
      topics: [
        "What do users actually need? (User stories & requirements)",
        "Breaking big ideas into small, buildable pieces",
        "The product engineering mindset",
        "Writing clear specifications that AI can understand"
      ],
      duration: "3-4 hours",
      hasVideo: true,
      hasQuiz: true
    },
    {
      week: 3,
      title: "Your First Complete Application",
      description: "Build a real, working web application from scratch using AI",
      topics: [
        "Choosing your first project (we'll help you pick)",
        "Describing your app in plain English",
        "Working with AI to build the frontend",
        "Adding interactivity and making it look professional"
      ],
      duration: "4-5 hours",
      hasVideo: true,
      hasQuiz: false,
      hasProject: true
    },
    {
      week: 4,
      title: "Mastering AI Communication",
      description: "The art of getting exactly what you want from AI tools",
      topics: [
        "Why your prompts matter more than you think",
        "The anatomy of an effective coding request",
        "Iterating and refining: when the first try isn't perfect",
        "Debugging with AI (it's easier than you think)"
      ],
      duration: "3-4 hours",
      hasVideo: true,
      hasQuiz: true
    },
    {
      week: 5,
      title: "Adding Real Features",
      description: "Forms, buttons, data storage, and making your app actually work",
      topics: [
        "User input: forms and validation",
        "Storing data (the basics of databases)",
        "Making things happen: buttons, actions, feedback",
        "Connecting the pieces together"
      ],
      duration: "4-5 hours",
      hasVideo: true,
      hasQuiz: true,
      hasProject: true
    },
    {
      week: 6,
      title: "Polish & Professional Quality",
      description: "Taking your app from 'it works' to 'it's impressive'",
      topics: [
        "Design principles that make apps look professional",
        "Mobile responsiveness (works on phones too!)",
        "Performance and loading speed",
        "Common mistakes and how to avoid them"
      ],
      duration: "3-4 hours",
      hasVideo: true,
      hasQuiz: true
    },
    {
      week: 7,
      title: "Your Portfolio Project",
      description: "Build something impressive that shows off your new skills",
      topics: [
        "Choosing a portfolio-worthy project",
        "Planning and executing from start to finish",
        "Getting feedback and iterating",
        "Preparing to show employers"
      ],
      duration: "6-8 hours",
      hasVideo: true,
      hasQuiz: false,
      hasProject: true
    },
    {
      week: 8,
      title: "Certification & Next Steps",
      description: "Complete your certificate and plan your career path",
      topics: [
        "Final assessment review",
        "Building your portfolio presentation",
        "Job market overview: where vibe coders are needed",
        "Preparing for Semester 2 (optional)"
      ],
      duration: "2-3 hours",
      hasVideo: true,
      hasQuiz: true,
      hasCertificate: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/50 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-8">
        <div className="container mx-auto px-4">
          <Link href="/vibe-code">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4" data-testid="button-back-to-academy">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Academy
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Semester 1 Curriculum
          </h1>
          <p className="text-purple-200 text-lg">
            Foundations of Vibe Coding - 8 Weeks to Your First Portfolio Project
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">8 Weeks</div>
              <div className="text-gray-400 text-sm">Course Duration</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Video className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">25+ Hours</div>
              <div className="text-gray-400 text-sm">Video Content</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">3 Projects</div>
              <div className="text-gray-400 text-sm">Hands-On Builds</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Certificate</div>
              <div className="text-gray-400 text-sm">Upon Completion</div>
            </CardContent>
          </Card>
        </div>

        {/* Week by Week */}
        <h2 className="text-2xl font-bold text-white mb-6">Week-by-Week Breakdown</h2>
        
        <div className="space-y-4">
          {semester1Lessons.map((lesson, idx) => (
            <Card 
              key={idx} 
              className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors"
              data-testid={`card-week-${lesson.week}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                      {lesson.week}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{lesson.title}</CardTitle>
                      <CardDescription className="text-gray-400">{lesson.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-purple-300 border-purple-500">
                      <Clock className="h-3 w-3 mr-1" /> {lesson.duration}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">What You'll Learn:</h4>
                    <ul className="space-y-1">
                      {lesson.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-gray-400 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end md:items-start">
                    {lesson.hasVideo && (
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                        <Video className="h-3 w-3 mr-1" /> Video Lessons
                      </Badge>
                    )}
                    {lesson.hasQuiz && (
                      <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                        <FileText className="h-3 w-3 mr-1" /> Quiz
                      </Badge>
                    )}
                    {lesson.hasProject && (
                      <Badge className="bg-orange-600/20 text-orange-300 border-orange-500/30">
                        <BookOpen className="h-3 w-3 mr-1" /> Hands-On Project
                      </Badge>
                    )}
                    {lesson.hasCertificate && (
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                        <Award className="h-3 w-3 mr-1" /> Certificate
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Future Semesters Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Continue Your Journey</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700 opacity-75">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-500" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="text-gray-400">Semester 2: Advanced Product Building</CardTitle>
                <CardDescription className="text-gray-500">
                  Databases, APIs, authentication, payment systems, and more complex applications.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-800/30 border-slate-700 opacity-75">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-500" />
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="text-gray-400">Semester 3: Enterprise & Team Skills</CardTitle>
                <CardDescription className="text-gray-500">
                  Working with existing codebases, collaboration, code review, and interview prep.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500">
            <CardContent className="py-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-purple-200 mb-6 max-w-xl mx-auto">
                Join Semester 1 today and build your first portfolio project in just 8 weeks.
              </p>
              <Link href="/vibe-code/enroll">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" data-testid="button-enroll-now">
                  Enroll Now - $299 <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <p className="text-gray-500 mt-4 text-sm">30-day money-back guarantee</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
