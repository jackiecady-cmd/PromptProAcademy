import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, 
  Loader2, 
  Dna,
  TreeDeciduous,
  Globe,
  FileText,
  Download,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Save,
  Sparkles,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { Link } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SavedFinding {
  id: string;
  title: string;
  content: string;
  category: string;
  savedAt: string;
}

const journeySteps = [
  { 
    id: 1, 
    title: "Start Your Tree", 
    description: "Begin with FamilySearch (free)",
    icon: TreeDeciduous,
    guidance: `Go to FamilySearch.org - it's completely free and has billions of records.

**What to do:**
1. Click "Sign In" (top right)
2. Create a free account
3. Click "Family Tree" 
4. Start adding what you know:
   - Your name and birth date
   - Your parents' names
   - Your grandparents' names
   - Any siblings

**As you add people**, FamilySearch will suggest records and show you hints.

**Not sure about names or dates?** Ask ChatGPT! Just type: "Help me understand what information I need to start a family tree" or "What should I know about my parents/grandparents before adding them?"`,
    links: [
      { label: "Go to FamilySearch.org", url: "https://www.familysearch.org" },
      { label: "FamilySearch Getting Started", url: "https://www.familysearch.org/en/help/helpcenter" }
    ]
  },
  { 
    id: 2, 
    title: "DNA Testing", 
    description: "Choose and order a DNA test",
    icon: Dna,
    guidance: `Now that you have a basic tree, it's time to test YOUR DNA.

**Popular options:**
- **Ancestry.com** - $99-$199 (includes database of 30M+ people)
- **23andMe** - $99-$199 (includes health info)
- **MyHeritage DNA** - $59-$99 (good for European ancestry)

**What "DNA testing" means:** You spit in a tube, mail it, and they analyze your actual DNA.

**Why do this?** 
- Confirms your tree is correct
- Finds distant cousins in the database
- Shows your ethnicity/where your ancestors came from

**Don't understand DNA terms?** Ask ChatGPT: "Explain DNA testing to someone who's never done it before" or "What's the difference between Ancestry DNA and 23andMe?"`,
    links: [
      { label: "Ancestry.com DNA", url: "https://www.ancestry.com/dna" },
      { label: "23andMe DNA Test", url: "https://www.23andme.com" },
      { label: "MyHeritage DNA", url: "https://www.myheritage.com/dna" }
    ]
  },
  { 
    id: 3, 
    title: "Upload Your Results", 
    description: "Share DNA across multiple sites",
    icon: Globe,
    guidance: `Once you get your DNA results back (4-6 weeks), you can upload them to other sites for FREE to get more matches!

**What to do:**
1. Go to your DNA results on the site where you tested
2. Look for "Download raw DNA" or "Download results" 
3. Save the file to your computer (it's usually a .zip file - don't open it!)
4. Go to **GEDmatch.com** (FREE site that compares DNA from all companies)
5. Click "Upload your DNA"
6. Select your downloaded file and follow steps

**Then repeat for:**
- **MyHeritage** (if you didn't test there) 
- **FamilyTreeDNA** - good for finding very distant cousins
- **DNAPainter** - helps you visualize your chromosome matches

**Confused about "raw DNA data"?** Ask ChatGPT: "What is raw DNA data and how do I download it?" or "How do I upload DNA results from Ancestry to GEDmatch?"`,
    links: [
      { label: "GEDmatch.com", url: "https://www.gedmatch.com" },
      { label: "FamilyTreeDNA", url: "https://www.familytreedna.com" },
      { label: "DNAPainter", url: "https://www.dnapainter.com" },
      { label: "MyHeritage", url: "https://www.myheritage.com/dna" }
    ]
  },
  { 
    id: 4, 
    title: "Analyze & Discover", 
    description: "Use tools to find connections",
    icon: Sparkles,
    guidance: `Now you have your DNA on multiple sites. Here's where the magic happens.

**What to explore:**
1. **DNA Matches** - Look for "DNA Matches" on each site. These are real people who share your DNA
2. **Message them** - Say "Hi, I think we're related to the [Your Last Name] family, are you?" 
3. **Use Calculators:**
   - GEDmatch has "One-to-One Compare" (free!) - see exactly how you match someone
   - "Ethnic Calculators" show what percentage of your DNA comes from different regions
4. **Read the Hints** - GEDmatch and Ancestry suggest matches to your tree

**Stuck understanding a match?** Ask ChatGPT: "I found a DNA match - how do I figure out if they're my cousin?" or "What does cM (centimorgans) mean?"

**Finding your story:** Start messaging matches. Someone's great-grandmother might be YOUR great-grandmother. That's where the real discoveries happen!`,
    links: [
      { label: "GEDmatch Tools Guide", url: "https://www.gedmatch.com/guide.php" },
      { label: "Understanding DNA Matches", url: "https://help.ancestry.com/s/article/DNA-Match-Help" }
    ]
  },
  { 
    id: 5, 
    title: "Document Findings", 
    description: "Save your discoveries",
    icon: FileText,
    guidance: `As you discover things, WRITE THEM DOWN. This becomes your Heritage Book.

**What to save:**
- Names, dates, places you discover
- Stories family members tell you
- Photos of documents you find
- DNA matches and how you're related
- Surprising facts ("Great-great-grandfather was a blacksmith!")
- Connections between different family branches

**Use the "Save a Finding" box on the right** - it will all go into your Heritage Book.

**Questions?** Ask ChatGPT: "How do I organize my family history research?" or "What should I include in a family history book?"`,
    links: []
  },
  { 
    id: 6, 
    title: "Create Your Book", 
    description: "Turn it into a keepsake",
    icon: BookOpen,
    guidance: `You've done the work. You've discovered YOUR story. Now make it beautiful.

Take all those findings you saved and we'll turn them into a printed Heritage Book - a beautiful keepsake your family will treasure.

Your book can include:
- Your family tree (with photos!)
- DNA discoveries and connections
- Stories and dates you found
- Maps showing where your ancestors lived
- Photos of documents

This is something generations will keep. It's your legacy.`,
    links: []
  },
];

export default function DNAJourney() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: `Welcome! I'm here to help you discover your family history step by step.

You're going to do the work yourself - that way the discoveries will be YOURS and you'll understand your own story. I'll show you exactly where to go and what to do at each step.

Ready? Let's start! 👇`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [savedFindings, setSavedFindings] = useState<SavedFinding[]>([]);
  const [findingToSave, setFindingToSave] = useState("");
  const [findingTitle, setFindingTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentStepData = journeySteps[currentStep - 1];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/dna-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          currentStep,
          history: messages.slice(-6)
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble connecting. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const saveFinding = () => {
    if (!findingToSave.trim() || !findingTitle.trim()) return;
    
    const newFinding: SavedFinding = {
      id: Date.now().toString(),
      title: findingTitle,
      content: findingToSave,
      category: journeySteps[currentStep - 1]?.title || "Discovery",
      savedAt: new Date().toLocaleString()
    };
    
    setSavedFindings(prev => [...prev, newFinding]);
    setFindingToSave("");
    setFindingTitle("");
  };

  const progressPercent = ((currentStep - 1) / (journeySteps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white py-8">
        <div className="container px-4">
          <div className="flex items-center gap-3 mb-4">
            <Dna className="h-8 w-8" />
            <h1 className="text-3xl font-serif font-bold">Your DNA Discovery Journey</h1>
          </div>
          <p className="text-amber-200">Step-by-step guidance to discover your own family story</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b shadow-sm py-4">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">Step {currentStep} of {journeySteps.length}</span>
          </div>
          <Progress value={progressPercent} className="h-2 mb-4" />
          <div className="flex justify-between overflow-x-auto pb-2 gap-2">
            {journeySteps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isComplete = step.id < currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex flex-col items-center min-w-[80px] p-2 rounded-lg transition-all ${
                    isActive ? 'bg-primary/10 text-primary' : 
                    isComplete ? 'text-green-600' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    isActive ? 'bg-primary text-white' :
                    isComplete ? 'bg-green-100 text-green-600' : 'bg-gray-100'
                  }`}>
                    {isComplete ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className="text-xs text-center font-medium">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Guidance */}
            <Card className="bg-white">
              <CardHeader className="border-b bg-gradient-to-r from-[#7D0A24]/5 to-[#FA4616]/5">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {currentStepData && <currentStepData.icon className="h-6 w-6 text-[#FA4616]" />}
                  {currentStepData?.title}
                </CardTitle>
                <CardDescription>{currentStepData?.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none mb-6">
                  <div 
                    className="whitespace-pre-wrap text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: currentStepData?.guidance
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#7D0A24]">$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }} 
                  />
                </div>

                {/* Links for this step */}
                {currentStepData?.links && currentStepData.links.length > 0 && (
                  <div className="space-y-2 mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm font-semibold text-[#7D0A24]">Useful Links:</p>
                    {currentStepData.links.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#7D0A24] hover:text-[#9B1B30] font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                    disabled={currentStep === 1}
                  >
                    ← Previous
                  </Button>
                  <Button 
                    className="flex-1 bg-[#7D0A24] hover:bg-[#9B1B30]"
                    onClick={() => setCurrentStep(prev => Math.min(prev + 1, 6))}
                    disabled={currentStep === 6}
                  >
                    Next Step <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chat for Questions */}
            <Card>
              <CardHeader className="border-b bg-gradient-to-r from-[#7D0A24]/5 to-[#FA4616]/5">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#FA4616]" />
                  Questions? I'm Here to Help
                </CardTitle>
                <CardDescription>
                  Ask me anything about this step, or ask me to help explain DNA concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-64">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-[#7D0A24] text-white"
                          : "bg-white border shadow-sm"
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ 
                        __html: msg.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n/g, '<br/>')
                      }} />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border shadow-sm rounded-lg px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-[#7D0A24]" />
                    </div>
                  </div>
                )}
              </CardContent>
              <div className="border-t p-4 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#7D0A24] hover:bg-[#9B1B30]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Save Findings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Save a Finding
                </CardTitle>
                <CardDescription className="text-xs">
                  For your Heritage Book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Title (e.g., 'Great-grandmother born in Ireland')"
                  value={findingTitle}
                  onChange={(e) => setFindingTitle(e.target.value)}
                  className="text-sm"
                />
                <Textarea
                  placeholder="What did you discover?"
                  value={findingToSave}
                  onChange={(e) => setFindingToSave(e.target.value)}
                  rows={3}
                  className="text-sm"
                />
                <Button 
                  onClick={saveFinding}
                  disabled={!findingToSave.trim() || !findingTitle.trim()}
                  className="w-full bg-[#FA4616] hover:bg-[#FA4616]/90"
                  size="sm"
                >
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </CardContent>
            </Card>

            {/* Saved Findings */}
            {savedFindings.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Findings ({savedFindings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                  {savedFindings.map((finding) => (
                    <div key={finding.id} className="p-3 bg-muted rounded-lg border-l-4 border-[#FA4616]">
                      <div className="font-medium text-sm text-[#7D0A24]">{finding.title}</div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{finding.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className="text-[10px]">{finding.category}</Badge>
                        <span className="text-[10px] text-muted-foreground">{finding.savedAt}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Heritage Book CTA */}
            {currentStep === 6 && (
              <Card className="bg-gradient-to-br from-[#7D0A24] to-[#9B1B30] text-white">
                <CardContent className="py-6 text-center">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 text-amber-300" />
                  <h3 className="font-bold mb-2">Ready for Your Book?</h3>
                  <p className="text-sm text-amber-100 mb-4">
                    Turn your discoveries into a beautiful printed keepsake
                  </p>
                  <Link href="/checkout/heritage-book">
                    <Button className="w-full bg-white text-[#7D0A24] hover:bg-amber-100 font-bold">
                      Order Heritage Book
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
