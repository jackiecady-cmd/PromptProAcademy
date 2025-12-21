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
  Sparkles
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
  { id: 1, title: "Start Your Tree", description: "Begin with FamilySearch (free)", icon: TreeDeciduous },
  { id: 2, title: "DNA Testing", description: "Choose and order a DNA test", icon: Dna },
  { id: 3, title: "Upload Results", description: "Share DNA across platforms", icon: Globe },
  { id: 4, title: "Analyze & Discover", description: "Use calculators and tools", icon: Sparkles },
  { id: 5, title: "Document Findings", description: "Save your discoveries", icon: FileText },
  { id: 6, title: "Create Your Book", description: "Turn it into a keepsake", icon: BookOpen },
];

export default function DNAJourney() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: `Welcome to your DNA & Family History Journey! I'm here to guide you step-by-step through discovering your ancestry.

**Let's start with a few questions:**

1. Have you already taken a DNA test? (Ancestry, 23andMe, etc.)
2. Have you started a family tree anywhere?
3. How far back are you hoping to trace your lineage?

Just type your answers, and I'll create a personalized roadmap for you!`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [savedFindings, setSavedFindings] = useState<SavedFinding[]>([]);
  const [findingToSave, setFindingToSave] = useState("");
  const [findingTitle, setFindingTitle] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          history: messages.slice(-6) // Last 6 messages for context
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      
      // Check if we should advance the step based on keywords
      if (data.response.toLowerCase().includes("next step") || 
          data.response.toLowerCase().includes("move on to")) {
        setCurrentStep(prev => Math.min(prev + 1, 6));
      }
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
          <p className="text-amber-200">AI-guided step-by-step ancestry research</p>
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
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b bg-gradient-to-r from-[#7D0A24]/5 to-[#FA4616]/5">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-[#FA4616]" />
                  AI Research Guide
                </CardTitle>
                <CardDescription>
                  I'll walk you through each step of discovering your heritage
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-[#7D0A24] text-white"
                          : "bg-white border shadow-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm" 
                        dangerouslySetInnerHTML={{ 
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br/>')
                        }} 
                      />
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
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question or share what you've found..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-[#7D0A24] hover:bg-[#9B1B30]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Step Info */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {(() => {
                    const Icon = journeySteps[currentStep - 1]?.icon || Dna;
                    return <Icon className="h-5 w-5 text-[#FA4616]" />;
                  })()}
                  {journeySteps[currentStep - 1]?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {journeySteps[currentStep - 1]?.description}
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-[#7D0A24] hover:bg-[#9B1B30]"
                    onClick={() => setCurrentStep(prev => Math.min(prev + 1, 6))}
                    disabled={currentStep === 6}
                  >
                    Next Step <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Findings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Save a Finding
                </CardTitle>
                <CardDescription>
                  Record discoveries for your Heritage Book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Title (e.g., 'Great-grandmother's birthplace')"
                  value={findingTitle}
                  onChange={(e) => setFindingTitle(e.target.value)}
                />
                <Textarea
                  placeholder="What did you discover?"
                  value={findingToSave}
                  onChange={(e) => setFindingToSave(e.target.value)}
                  rows={3}
                />
                <Button 
                  onClick={saveFinding}
                  disabled={!findingToSave.trim() || !findingTitle.trim()}
                  className="w-full bg-[#FA4616] hover:bg-[#FA4616]/90"
                >
                  <Save className="h-4 w-4 mr-2" /> Save Finding
                </Button>
              </CardContent>
            </Card>

            {/* Saved Findings */}
            {savedFindings.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Your Findings ({savedFindings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                  {savedFindings.map((finding) => (
                    <div key={finding.id} className="p-2 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{finding.title}</span>
                        <Badge variant="secondary" className="text-xs">{finding.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{finding.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Heritage Book CTA */}
            <Card className="bg-gradient-to-br from-[#7D0A24] to-[#9B1B30] text-white">
              <CardContent className="py-6 text-center">
                <BookOpen className="h-10 w-10 mx-auto mb-3 text-amber-300" />
                <h3 className="font-bold mb-2">Ready for Your Book?</h3>
                <p className="text-sm text-amber-100 mb-4">
                  Turn your discoveries into a beautiful printed keepsake
                </p>
                <Link href="/checkout/heritage-book">
                  <Button className="bg-white text-[#7D0A24] hover:bg-amber-100">
                    Order Heritage Book
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
