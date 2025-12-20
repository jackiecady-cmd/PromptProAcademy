import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Sparkles, Copy, ExternalLink, Crown, Users, Globe, Dna } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const promptPacks = [
  {
    id: "royal",
    title: "Royal Lineage Deep Dive",
    description: "Discover potential connections to nobility and royal bloodlines across Europe.",
    icon: Crown,
    price: 10,
    prompts: [
      {
        title: "Finding Royal Ancestors",
        preview: "I have DNA results showing [X]% connection to [region]. Help me trace potential royal lineages...",
        fullPrompt: "I have DNA results showing [X]% connection to [region]. My surname is [surname] and my earliest known ancestor is [name] from [location] around [year]. Help me trace potential royal lineages by:\n\n1. Identifying noble families from that region and time period\n2. Looking for surname connections to landed gentry\n3. Suggesting historical records to search\n4. Explaining what DNA markers might indicate noble ancestry\n\nProvide specific family names to research and explain the historical context.",
        targetAI: "Claude or ChatGPT"
      },
      {
        title: "Haplogroup Royal Connections",
        preview: "My maternal haplogroup is [X]. Which royal figures share this haplogroup...",
        fullPrompt: "My maternal haplogroup is [X] and my paternal haplogroup is [Y]. Research which historical royal figures, nobility, and famous historical figures share these haplogroups. For each connection:\n\n1. Name the historical figure\n2. Their title and time period\n3. The specific haplogroup match\n4. What this might mean for my ancestry\n\nBe thorough and cite sources where possible.",
        targetAI: "Claude or Grok"
      },
      {
        title: "Surname Nobility Check",
        preview: "Research whether the surname [X] has noble origins...",
        fullPrompt: "Research whether the surname [surname] has noble origins. I believe my family came from [country/region]. Please:\n\n1. Trace the etymology of this surname\n2. Identify any noble families with this name or variants\n3. List coat of arms associated with this name\n4. Suggest records in [country] archives that might prove noble lineage\n5. Explain how surnames were granted or adopted by nobility vs commoners\n\nProvide actionable next steps for my research.",
        targetAI: "Any AI"
      }
    ]
  },
  {
    id: "holocaust",
    title: "Holocaust & Jewish Heritage",
    description: "Sensitive guidance for tracing survivors, victims, and Jewish ancestry.",
    icon: Users,
    price: 15,
    prompts: [
      {
        title: "Holocaust Survivor Database Search",
        preview: "Help me search for relatives who may have survived the Holocaust...",
        fullPrompt: "Help me search for relatives who may have survived the Holocaust. Here's what I know:\n- Family surname: [surname]\n- Variations: [list any spelling variations]\n- Last known location: [city/country]\n- Approximate time period: [dates]\n- Any known first names: [names]\n\nGuide me through:\n1. Yad Vashem Central Database of Shoah Victims\n2. JewishGen Holocaust Database\n3. Arolsen Archives\n4. USHMM resources\n5. ITS Digital Archive\n\nExplain what information each database contains and how to search effectively.",
        targetAI: "Claude or ChatGPT"
      },
      {
        title: "Ashkenazi DNA Interpretation",
        preview: "My DNA shows [X]% Ashkenazi Jewish. Help me understand what this means...",
        fullPrompt: "My DNA results show [X]% Ashkenazi Jewish ancestry. Help me understand:\n\n1. What does this percentage likely mean about my family tree?\n2. How many generations back might my Jewish ancestors be?\n3. What are common Ashkenazi haplogroups and do any appear in my results?\n4. Why might Jewish ancestry not appear in family records (hidden, converted, etc.)?\n5. How can I trace which branch of my family tree carries this ancestry?\n\nProvide specific strategies for researching hidden Jewish heritage.",
        targetAI: "Claude"
      }
    ]
  },
  {
    id: "native",
    title: "Native American Tribal Connections",
    description: "Respectful research into Indigenous ancestry and tribal affiliations.",
    icon: Globe,
    price: 15,
    prompts: [
      {
        title: "DNA to Tribal Connection",
        preview: "My DNA shows Native American ancestry. How do I research tribal affiliation...",
        fullPrompt: "My DNA results show [X]% Indigenous American/Native American ancestry. Help me research tribal connections:\n\n1. Based on my known family locations [list locations], which tribes historically lived there?\n2. What records exist for tribal enrollment and blood quantum?\n3. How can I respectfully reach out to tribal nations?\n4. What's the difference between DNA results and tribal citizenship?\n5. What historical events (Trail of Tears, relocations) might explain why records are missing?\n\nI want to approach this respectfully and understand the difference between genetic ancestry and cultural belonging.",
        targetAI: "Claude or ChatGPT"
      },
      {
        title: "Dawes Rolls Research",
        preview: "How do I search the Dawes Rolls to find Native American ancestors...",
        fullPrompt: "I believe I may have Cherokee, Chickasaw, Choctaw, Creek, or Seminole ancestry. Guide me through researching the Dawes Rolls:\n\n1. What are the Dawes Rolls and why are they important?\n2. How do I search them at the National Archives?\n3. What information is included in enrollment records?\n4. What if my ancestor chose not to enroll or was denied?\n5. What other records (census, allotment, applications) might help?\n\nMy family surname is [surname] and they lived in [location] around [time period].",
        targetAI: "Any AI"
      }
    ]
  },
  {
    id: "haplogroups",
    title: "Understanding Your Haplogroups",
    description: "Deep explanations of what your maternal and paternal haplogroups reveal.",
    icon: Dna,
    price: 5,
    prompts: [
      {
        title: "Haplogroup Migration Story",
        preview: "Explain my haplogroup [X] - where did my ancestors come from...",
        fullPrompt: "My [maternal/paternal] haplogroup is [haplogroup]. Please provide a comprehensive explanation:\n\n1. When and where did this haplogroup originate?\n2. What migration routes did people with this haplogroup take?\n3. What percentage of modern populations carry this haplogroup and where?\n4. What historical events or population movements are associated with it?\n5. Are there any famous historical or modern figures with this haplogroup?\n6. What does this tell me about my deep ancestry?\n\nProvide a timeline and geographic journey of my maternal/paternal line.",
        targetAI: "Claude or ChatGPT"
      },
      {
        title: "Compare Two Haplogroups",
        preview: "Compare my maternal [X] and paternal [Y] haplogroups...",
        fullPrompt: "My maternal haplogroup is [X] and my paternal haplogroup is [Y]. Compare these two lineages:\n\n1. Where did each originate and when?\n2. Do they suggest my parents came from different populations?\n3. Where might these two lines have intersected geographically?\n4. What does the combination tell me about my overall ancestry?\n5. Are there any interesting historical implications?\n\nCreate a visual timeline comparing both lineages if possible.",
        targetAI: "Claude"
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
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-accent/20 text-accent-foreground">
            <Sparkles className="h-3 w-3 mr-1" /> Prompt Engineering for Genealogy
          </Badge>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            AI Research Guides
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert prompts to help you dig deeper with Claude, ChatGPT, Grok, and more. 
            We're teaching you how to ask the right questions—skills you'll use forever.
          </p>
        </div>

        {/* Full Access Banner */}
        <Card className="max-w-2xl mx-auto mb-12 bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">Full Library Access</h3>
                <p className="text-sm text-muted-foreground">All current packs + future additions</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground text-sm"> one-time</span>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Get Full Access</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompt Packs Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {promptPacks.map((pack) => {
            const isUnlocked = unlockedPacks.includes(pack.id);
            const Icon = pack.icon;
            
            return (
              <Card key={pack.id} className={`overflow-hidden ${isUnlocked ? 'border-green-500/50' : ''}`}>
                <CardHeader className="bg-muted/30">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pack.title}</CardTitle>
                        <CardDescription>{pack.prompts.length} prompts</CardDescription>
                      </div>
                    </div>
                    {isUnlocked ? (
                      <Badge className="bg-green-600">Unlocked</Badge>
                    ) : (
                      <Badge variant="outline">${pack.price}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{pack.description}</p>
                  
                  <div className="space-y-2">
                    {pack.prompts.map((prompt, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-lg border ${isUnlocked ? 'bg-background cursor-pointer hover:bg-muted/50' : 'bg-muted/20'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm flex items-center gap-2">
                              {!isUnlocked && <Lock className="h-3 w-3 text-muted-foreground" />}
                              {prompt.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {isUnlocked ? prompt.fullPrompt.substring(0, 80) + "..." : prompt.preview}
                            </p>
                          </div>
                          {isUnlocked && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="shrink-0"
                              onClick={() => copyPrompt(prompt.fullPrompt)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {isUnlocked && (
                          <p className="text-xs text-primary mt-2">Best with: {prompt.targetAI}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {isUnlocked ? (
                    <p className="text-sm text-green-600 font-medium">✓ You have access to all prompts</p>
                  ) : (
                    <Button className="w-full" variant="outline">
                      Unlock for ${pack.price}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary font-bold">1</div>
              <h3 className="font-bold">Purchase a Pack</h3>
              <p className="text-sm text-muted-foreground">Choose the research area you want to explore</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary font-bold">2</div>
              <h3 className="font-bold">Copy the Prompt</h3>
              <p className="text-sm text-muted-foreground">Fill in your details and copy to clipboard</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary font-bold">3</div>
              <h3 className="font-bold">Ask Any AI</h3>
              <p className="text-sm text-muted-foreground">Paste into Claude, ChatGPT, Grok, or Kimi</p>
            </div>
          </div>
        </div>

        {/* Consultation CTA */}
        <Card className="max-w-2xl mx-auto mt-16 border-2 border-primary/30">
          <CardContent className="py-8 text-center">
            <h3 className="text-xl font-serif font-bold mb-2">Need Personal Guidance?</h3>
            <p className="text-muted-foreground mb-4">
              Book a 1-on-1 session where I'll help you navigate your research using AI together.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Book Consultation - $99/hour
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
