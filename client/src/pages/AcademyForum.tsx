import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  ThumbsUp, 
  ArrowLeft, 
  Plus, 
  Search,
  Clock,
  User,
  Lightbulb,
  HelpCircle,
  Briefcase
} from "lucide-react";
import { Link } from "wouter";

const forumPosts = [
  {
    id: 1,
    title: "How do I ask AI to explain something simpler?",
    author: "Margaret T.",
    avatar: "MT",
    category: "tips",
    replies: 12,
    likes: 8,
    time: "2 hours ago",
    preview: "I keep getting answers that are too technical. What's the best way to ask for a simpler explanation?"
  },
  {
    id: 2,
    title: "Just landed my first freelance gig!",
    author: "Robert K.",
    avatar: "RK",
    category: "success",
    replies: 24,
    likes: 45,
    time: "5 hours ago",
    preview: "After completing the Foundation course, I started offering prompt writing services on Upwork..."
  },
  {
    id: 3,
    title: "Confused about chain-of-thought prompting",
    author: "Susan M.",
    avatar: "SM",
    category: "help",
    replies: 6,
    likes: 3,
    time: "1 day ago",
    preview: "The lesson mentioned breaking down complex tasks, but I'm not sure how to apply it..."
  },
  {
    id: 4,
    title: "Best prompts for researching Irish ancestors?",
    author: "Patrick O.",
    avatar: "PO",
    category: "tips",
    replies: 15,
    likes: 22,
    time: "2 days ago",
    preview: "I've been experimenting with different ways to ask about Irish immigration records..."
  },
  {
    id: 5,
    title: "How to explain prompt engineering to my kids",
    author: "Linda W.",
    avatar: "LW",
    category: "discussion",
    replies: 8,
    likes: 12,
    time: "3 days ago",
    preview: "My grandkids think I can't use computers. Want to show them what I've learned!"
  },
];

const categoryColors: Record<string, string> = {
  tips: "bg-green-100 text-green-800",
  success: "bg-yellow-100 text-yellow-800",
  help: "bg-blue-100 text-blue-800",
  discussion: "bg-purple-100 text-purple-800",
};

const categoryIcons: Record<string, any> = {
  tips: Lightbulb,
  success: Briefcase,
  help: HelpCircle,
  discussion: MessageSquare,
};

export default function AcademyForum() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredPosts = forumPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8">
        <div className="container px-4">
          <Link href="/learn">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Academy
            </Button>
          </Link>
          <h1 className="text-3xl font-bold"><span className="text-blue-300">Prompt</span>Pro Community</h1>
          <p className="text-blue-200 mt-2">Learn together, grow together</p>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and New Post */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setShowNewPost(!showNewPost)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" /> New Discussion
              </Button>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-lg">Start a New Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Discussion title..." />
                  <Textarea placeholder="Share your question, tip, or story..." rows={4} />
                  <div className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">Post Discussion</Button>
                    <Button variant="outline" onClick={() => setShowNewPost(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts */}
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
                <TabsTrigger value="success">Success Stories</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredPosts.map(post => {
                  const CategoryIcon = categoryIcons[post.category] || MessageSquare;
                  return (
                    <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="py-4">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-700">{post.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium hover:text-blue-600">{post.title}</h3>
                              <Badge className={categoryColors[post.category]}>{post.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.preview}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" /> {post.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {post.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" /> {post.replies} replies
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" /> {post.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="tips" className="space-y-4 mt-4">
                {filteredPosts.filter(p => p.category === "tips").map(post => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="py-4">
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{post.preview}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="help" className="space-y-4 mt-4">
                {filteredPosts.filter(p => p.category === "help").map(post => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="py-4">
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{post.preview}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="success" className="space-y-4 mt-4">
                {filteredPosts.filter(p => p.category === "success").map(post => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="py-4">
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{post.preview}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>1. Be kind and encouraging</p>
                <p>2. Share what works for you</p>
                <p>3. Ask questions freely - no judgment</p>
                <p>4. Celebrate each other's wins</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need 1-on-1 Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a personal tutoring session for complex questions.
                </p>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full">Book Session - $99/hr</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ask the AI Tutor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant help with your prompt engineering questions.
                </p>
                <Link href="/academy/tutor">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Open AI Tutor</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
