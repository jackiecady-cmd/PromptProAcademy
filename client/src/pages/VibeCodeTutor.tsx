import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Loader2, 
  ArrowLeft, 
  Code,
  Lightbulb,
  Rocket,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What is vibe coding and how is it different from regular coding?",
  "How do I describe what I want to build to an AI?",
  "What should my first project be?",
  "How do I fix something when AI gives me an error?",
  "What tools do I need to get started?",
];

export default function VibeCodeTutor() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Welcome to Vibe Code Academy! I'm your AI tutor, here to help you learn how to build software products using AI. Whether you're just starting out or working on a project, I can help you understand vibe coding concepts, troubleshoot issues, or plan your next build. What would you like to learn about today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: textToSend }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/vibe-code/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response || "Sorry, I couldn't process that. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment." }]);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-6">
        <div className="container px-4">
          <Link href="/vibe-code">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-2" data-testid="button-back-to-academy">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Academy
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Code className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Vibe Code Tutor</h1>
              <p className="text-purple-200 text-sm">Your personal AI guide to building with AI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col bg-slate-800/50 border-slate-700">
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-slate-700 border border-slate-600 text-gray-100"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about vibe coding, projects, or troubleshooting..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                    data-testid="input-tutor-message"
                  />
                  <Button 
                    onClick={() => sendMessage()}
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    data-testid="button-send-message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  Suggested Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(question)}
                    disabled={isLoading}
                    className="w-full text-left text-sm p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
                    data-testid={`button-suggested-${idx}`}
                  >
                    {question}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50">
              <CardContent className="pt-6">
                <Rocket className="h-8 w-8 text-purple-400 mb-2" />
                <h3 className="font-medium text-white mb-1">Ready to Build?</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Jump into the curriculum and start your first project.
                </p>
                <Link href="/vibe-code/curriculum">
                  <Button size="sm" variant="outline" className="w-full border-purple-400 text-purple-300 hover:bg-purple-900/50" data-testid="button-view-curriculum">
                    View Curriculum
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 text-center">
                <Badge className="mb-2 bg-green-500/20 text-green-300 border-green-500/30">
                  <Sparkles className="h-3 w-3 mr-1" /> AI Powered
                </Badge>
                <p className="text-xs text-gray-500">
                  This tutor uses AI to answer your questions about vibe coding, product engineering, and building with AI tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
