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
  MessageSquare,
  Upload,
  FileArchive,
  Trash2,
  CheckCircle
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

**Not sure about names or dates?** Use the AI chat box on this page! Just type: "Help me understand what information I need to start a family tree" or "What should I know about my parents/grandparents before adding them?"`,
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

**Don't understand DNA terms?** Ask in the chat box: "Explain DNA testing to someone who's never done it before" or "What's the difference between Ancestry DNA and 23andMe?"`,
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
    guidance: `Great! Your DNA results are in. Now here's the secret - you can take that data and use it on OTHER free websites to find MORE matches and more information!

**Step 1: Find your DNA download (this is your "raw DNA")**

If you tested with **Ancestry.com:**
1. Log in to Ancestry.com
2. Click "DNA" at the top
3. Click "Settings" 
4. Scroll down to "Download your DNA"
5. Click the button and wait a few seconds
6. You'll get a file called something like "AncestryDNA_results.zip" - SAVE THIS FILE to your computer
7. DON'T OPEN THE ZIP FILE - leave it as is!

If you tested with **23andMe:**
1. Log in to 23andMe
2. Click your name (top right)
3. Go to "Settings"
4. Scroll down to "Download your raw data"
5. You may need to click through a warning (that's normal)
6. Save the .zip file to your computer
7. DON'T OPEN IT!

**Step 2: Upload to GEDmatch (this is where the magic happens)**

GEDmatch.com is a FREE website where people from ALL companies (Ancestry, 23andMe, MyHeritage) upload their DNA so they can find matches across all platforms.

1. Go to **GEDmatch.com**
2. Sign up for a free account (top left "register")
3. Click "Upload DNA"
4. Choose your file (the .zip file you just downloaded)
5. Follow the steps - it will process your DNA
6. Once done, you can see your matches!

**Why do this?** 
- Some people only tested on one company but your relative tested on another
- GEDmatch has calculators that show you more details about your ethnicity
- You find cousins you wouldn't find on just one site

**Step 3: Optional - Upload to more sites (if you want more matches)**
- **FamilyTreeDNA** - Good for finding very distant cousins. Go to familytreedna.com, upload your zip file (free)
- **MyHeritage** - Another option if you want. Upload at myheritage.com

**Need help?** Ask in the chat box: "I have a .zip file from Ancestry/23andMe - what do I do with it?" or "What does 'raw DNA' mean?"`,
    links: [
      { label: "GEDmatch.com - Upload here!", url: "https://www.gedmatch.com" },
      { label: "Ancestry.com - Get your DNA download", url: "https://www.ancestry.com" },
      { label: "23andMe - Get your DNA download", url: "https://www.23andme.com" },
      { label: "FamilyTreeDNA - Upload option #2", url: "https://www.familytreedna.com" },
      { label: "MyHeritage - Upload option #3", url: "https://www.myheritage.com" }
    ]
  },
  { 
    id: 4, 
    title: "Analyze & Discover", 
    description: "Find connections & understand your results",
    icon: Sparkles,
    guidance: `Now your DNA is uploaded. Let's find your cousins and learn about your ancestry!

**THE SECRET WEAPON: ADMIXTURE CALCULATORS**

This is where it gets exciting! Admixture calculators look at EVERY LINE of your chromosome and tell you exactly what's there - every piece of you from around the world.

**Step 1: Upload to DNAGenics.com**
DNAGenics has powerful admixture calculators that can reveal hidden heritage.
1. Go to **DNAGenics.com**
2. Create a free account
3. Upload your .zip file (same one from Ancestry/23andMe)
4. Run the admixture calculators

**Step 2: Ask AI which calculators to try**

Here's where prompt engineering helps! Ask in the chat box:

"I uploaded my DNA to DNAGenics and GEDmatch. My family has surnames like [your surnames]. I think I might have [mixed heritage/Jewish/African/Native American/etc.] ancestry. Some clues I have:
- [Any family stories, nicknames, or hints]
- [Places your family is from]
- [Anything that seems odd or secretive]

Which admixture calculators should I run to find out more?"

**Real example:** One researcher had a grandfather who called her grandmother "Chaka" - meaning chocolate. Her white-passing grandmother had hidden Black ancestry. The admixture calculators revealed the truth, and Black cousins started appearing in DNA matches!

**Step 3: Look for patterns**
The calculators might show:
- "15% Ashkenazi Jewish" - you have Jewish ancestors
- "8% West African" - you have African heritage
- "3% Native American" - indigenous ancestry
- Specific regions like "Jerusalem/Palestine" in historical records

**IMPORTANT: DNA isn't everything!**
Jewish ancestry may NOT show in your DNA even if you have it:
- Female line ancestry doesn't always appear the same way
- If a relative (like a half-sibling) with the same surname shows Ashkenazi, that confirms YOUR connection too
- Look for surnames like Israel, Cohen, Levy, Gold-, Silver-, -berg, -stein

**Step 4: Search Holocaust Records (even without DNA proof)**
Documentary evidence is just as powerful as DNA:
- **Yad Vashem** - Holocaust victims database (yadvashem.org)
- **JewishGen** - Jewish genealogy records (jewishgen.org)
- **Arolsen Archives** - Nazi persecution records (arolsen-archives.org)
- **FamilySearch** - Look for records showing "Jerusalem, Palestine" or European processing

Example: If you find a family member processed in the US, then processed again in Jerusalem/Palestine in the 1940s - that's evidence of Jewish heritage regardless of what your DNA shows.

**Step 5: Connect the clues**
Look at your family tree AND your DNA results together:
- An ancestor from "Jerusalem, Palestine" in the 1940s? That's evidence even WITHOUT Jewish DNA showing
- A relative with a Jewish surname whose DNA shows Ashkenazi? That confirms your family line
- Black cousins appearing in your DNA matches? Your family may have hidden that heritage

**Step 6: Message your matches**
- Find someone with a similar surname
- Click "Contact" or "Message"  
- Say: "Hi! I see we share DNA. Are you related to [Your Last Name]? I'm researching my family history."

**Step 7: Document EVERYTHING**
- Every calculator result
- Every interesting match
- Every clue or story
- This becomes your Heritage Book!

**PRO TIP: Treat AI like a teammate**
Don't just tell AI what to do - work WITH it. Share details, ask follow-up questions, let it connect the dots. AI remembers little details and can give you big ideas. The better your prompts, the better your discoveries!

**Need help with prompts?** Check out PromptPro Academy to learn how to talk to AI effectively!`,
    links: [
      { label: "DNAGenics.com - Admixture Calculators", url: "https://www.dnagenics.com" },
      { label: "GEDmatch.com - More calculators", url: "https://www.gedmatch.com" },
      { label: "Yad Vashem - Holocaust Database", url: "https://www.yadvashem.org/collections/database-of-names.html" },
      { label: "JewishGen - Jewish Genealogy", url: "https://www.jewishgen.org" },
      { label: "Arolsen Archives - Nazi Records", url: "https://arolsen-archives.org" },
      { label: "PromptPro Academy - Learn to work with AI", url: "/academy" }
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

**Questions?** Ask in the chat box: "How do I organize my family history research?" or "What should I include in a family history book?"`,
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
  const [uploadEmail, setUploadEmail] = useState("");
  const [uploadSource, setUploadSource] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploads, setUploads] = useState<any[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const loadUploads = async (email: string) => {
    try {
      const res = await fetch(`/api/dna-uploads/${encodeURIComponent(email)}`);
      if (res.ok) {
        setUploads(await res.json());
      }
    } catch {}
  };

  const handleDnaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!uploadEmail) {
      toast({ title: "Email Required", description: "Please enter your email before uploading.", variant: "destructive" });
      return;
    }
    if (!uploadSource) {
      toast({ title: "Source Required", description: "Please select where your DNA data came from.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("dnaFile", file);
    formData.append("email", uploadEmail);
    formData.append("source", uploadSource);

    try {
      const res = await fetch("/api/dna-upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadSuccess(true);
      toast({ title: "Upload Successful!", description: `${file.name} has been uploaded and stored securely.` });
      loadUploads(uploadEmail);
    } catch (err: any) {
      toast({ title: "Upload Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteUpload = async (id: string) => {
    try {
      await fetch(`/api/dna-uploads/${id}`, { method: "DELETE" });
      setUploads((prev) => prev.filter((u) => u.id !== id));
      toast({ title: "Deleted", description: "Upload removed." });
    } catch {}
  };

  useEffect(() => {
    if (uploadEmail) loadUploads(uploadEmail);
  }, [uploadEmail]);

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
          <p className="text-amber-200 mb-3">Step-by-step guidance to discover your own family story</p>
          <Link href="/dna-hub">
            <Button variant="outline" size="sm" className="border-white/50 text-white hover:bg-white/20" data-testid="link-journey-hub">
              <ArrowRight className="mr-1 h-3 w-3 rotate-180" />
              Back to DNA Tools Hub
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-red-50 border-b border-red-400">
        <div className="container px-4 py-3 flex items-start gap-2">
          <span className="text-lg flex-shrink-0">⚠️</span>
          <p className="text-xs">
            <strong className="text-red-600">WhoamI does not charge you for using external tools.</strong>{" "}
            <span className="text-red-700">Some sites linked here are free; others may charge their own fees. We have no control over third-party pricing.</span>
          </p>
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

                {currentStep === 3 && (
                  <div className="mb-6 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200" data-testid="section-dna-upload">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-2">
                        <Upload className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-emerald-800 text-lg">Upload Your Raw DNA Here</h3>
                        <p className="text-sm text-emerald-600">Upload the .zip file from Ancestry, 23andMe, or other providers</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-emerald-800 mb-1 block">Your Email</label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={uploadEmail}
                            onChange={(e) => setUploadEmail(e.target.value)}
                            data-testid="input-upload-email"
                            className="border-emerald-300 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-emerald-800 mb-1 block">DNA Source</label>
                          <Select value={uploadSource} onValueChange={setUploadSource}>
                            <SelectTrigger className="border-emerald-300" data-testid="select-dna-source">
                              <SelectValue placeholder="Where is this from?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ancestry">Ancestry.com</SelectItem>
                              <SelectItem value="23andme">23andMe</SelectItem>
                              <SelectItem value="myheritage">MyHeritage</SelectItem>
                              <SelectItem value="familytreedna">FamilyTreeDNA</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".zip"
                          onChange={handleDnaUpload}
                          className="hidden"
                          data-testid="input-dna-file"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading || !uploadEmail || !uploadSource}
                          className="w-full h-24 bg-white hover:bg-emerald-50 border-2 border-dashed border-emerald-400 text-emerald-700 hover:border-emerald-500 flex flex-col items-center justify-center gap-2"
                          variant="outline"
                          data-testid="button-upload-dna"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="h-8 w-8 animate-spin" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <FileArchive className="h-8 w-8" />
                              <span>Click to select your .zip DNA file (max 50MB)</span>
                            </>
                          )}
                        </Button>
                      </div>

                      {uploadSuccess && (
                        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100 p-3 rounded-lg" data-testid="text-upload-success">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Upload complete! Your raw DNA data is stored securely.</span>
                        </div>
                      )}

                      {uploads.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-emerald-800">Your Uploaded Files:</p>
                          {uploads.map((u) => (
                            <div key={u.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-emerald-200" data-testid={`upload-item-${u.id}`}>
                              <div className="flex items-center gap-3">
                                <FileArchive className="h-5 w-5 text-emerald-600" />
                                <div>
                                  <p className="text-sm font-medium">{u.originalFilename}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {u.source} • {(u.fileSize / 1024 / 1024).toFixed(1)}MB • {new Date(u.uploadedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteUpload(u.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                data-testid={`button-delete-upload-${u.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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

            {/* My Research CTA */}
            <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-amber-300">
              <CardContent className="py-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-[#7D0A24]" />
                <h3 className="font-bold mb-1 text-[#7D0A24]">Save Permanently</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Save family tree & DNA findings to your account
                </p>
                <Link href="/my-research">
                  <Button variant="outline" className="w-full border-[#7D0A24] text-[#7D0A24]">
                    Go to My Research
                  </Button>
                </Link>
              </CardContent>
            </Card>

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
