import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Volume2, 
  BookOpen, 
  Star,
  Check,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";

interface PronunciationWord {
  latin: string;
  emphasized: React.ReactNode;
  meaning: string;
  audio?: string;
}

const samplePhrases: PronunciationWord[] = [
  {
    latin: "Ave Maria",
    emphasized: <><span className="text-4xl font-bold">A</span><span className="text-2xl">ve</span> <span className="text-4xl font-bold">Ma</span><span className="text-2xl">rí</span><span className="text-xl">a</span></>,
    meaning: "Hail Mary"
  },
  {
    latin: "In nomine Patris",
    emphasized: <><span className="text-xl">In</span> <span className="text-3xl font-bold">NÓ</span><span className="text-xl">mi</span><span className="text-lg">ne</span> <span className="text-3xl font-bold">PA</span><span className="text-xl">tris</span></>,
    meaning: "In the name of the Father"
  },
  {
    latin: "Et Filii et Spiritus Sancti",
    emphasized: <><span className="text-xl">Et</span> <span className="text-3xl font-bold">FÍ</span><span className="text-xl">li</span><span className="text-lg">i</span> <span className="text-xl">et</span> <span className="text-3xl font-bold">SPÍ</span><span className="text-xl">ri</span><span className="text-lg">tus</span> <span className="text-3xl font-bold">SANC</span><span className="text-xl">ti</span></>,
    meaning: "And of the Son and of the Holy Spirit"
  },
  {
    latin: "Amen",
    emphasized: <><span className="text-3xl font-bold">A</span><span className="text-2xl">men</span></>,
    meaning: "So be it"
  },
];

const invocationPhrases: PronunciationWord[] = [
  {
    latin: "Veni, veni, venias",
    emphasized: <><span className="text-3xl font-bold">VE</span><span className="text-xl">ni</span>, <span className="text-3xl font-bold">VE</span><span className="text-xl">ni</span>, <span className="text-3xl font-bold">VE</span><span className="text-2xl">ni</span><span className="text-xl">as</span></>,
    meaning: "Come, come, may you come"
  },
  {
    latin: "Ne me mori facias",
    emphasized: <><span className="text-xl">Ne</span> <span className="text-xl">me</span> <span className="text-3xl font-bold">MO</span><span className="text-xl">ri</span> <span className="text-3xl font-bold">FÁ</span><span className="text-2xl">ci</span><span className="text-xl">as</span></>,
    meaning: "Do not let me die"
  },
  {
    latin: "Pulchra es et decora",
    emphasized: <><span className="text-3xl font-bold">PUL</span><span className="text-xl">chra</span> <span className="text-xl">es</span> <span className="text-xl">et</span> <span className="text-3xl font-bold">DE</span><span className="text-2xl">co</span><span className="text-xl">ra</span></>,
    meaning: "You are beautiful and graceful"
  },
];

export default function LatinCourse() {
  const [activePhrase, setActivePhrase] = useState<number | null>(null);

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/subscribe/latin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: "", // Will be collected by Stripe
          courseType: "latin"
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero */}
      <div className="container px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
            New Course
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Sacred Latin Pronunciation
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Master the ancient tongue for invocations, prayers, and ritual work
          </p>
          <p className="text-slate-400 mb-8">
            Visual emphasis guides show you exactly where to stress each syllable
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              onClick={handleSubscribe}
            >
              Start Learning - $19/month
            </Button>
            <Button size="lg" variant="outline" className="border-slate-500 text-white hover:bg-slate-700">
              Preview Free Lesson
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> Cancel anytime</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> New content monthly</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> No contracts</span>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-slate-800/50 py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-8">How Our Visual System Works</h2>
          
          <Card className="max-w-2xl mx-auto bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-amber-400">Emphasis Through Size</CardTitle>
              <CardDescription className="text-slate-400">
                Larger letters = stronger emphasis. Smaller letters = softer pronunciation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black/50 rounded-lg p-8 text-center mb-6">
                <div className="text-white font-serif tracking-wide">
                  <span className="text-4xl font-bold text-amber-400">DO</span>
                  <span className="text-2xl">mi</span>
                  <span className="text-xl text-slate-400">ne</span>
                  <span className="mx-2"></span>
                  <span className="text-3xl font-bold text-amber-400">DE</span>
                  <span className="text-xl">us</span>
                  <span className="mx-2"></span>
                  <span className="text-3xl font-bold text-amber-400">ME</span>
                  <span className="text-xl text-slate-400">us</span>
                </div>
              </div>
              <p className="text-center text-slate-300 text-sm">
                "Domine Deus Meus" - Lord my God<br/>
                <span className="text-slate-500">See how the stressed syllables stand out visually</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sample Lessons */}
      <div className="py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Sample Pronunciation Guides</h2>
          <p className="text-center text-slate-400 mb-8">Click any phrase to see the emphasis pattern</p>

          <Tabs defaultValue="prayers" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger value="prayers">Traditional Prayers</TabsTrigger>
              <TabsTrigger value="invocations">Invocations</TabsTrigger>
            </TabsList>

            <TabsContent value="prayers" className="mt-6 space-y-4">
              {samplePhrases.map((phrase, idx) => (
                <Card 
                  key={idx} 
                  className={`bg-slate-800 border-slate-700 cursor-pointer transition-all hover:border-amber-500/50 ${activePhrase === idx ? 'border-amber-500 ring-1 ring-amber-500/30' : ''}`}
                  onClick={() => setActivePhrase(activePhrase === idx ? null : idx)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium text-white">{phrase.latin}</p>
                        <p className="text-sm text-slate-400">{phrase.meaning}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-400">
                        <Volume2 className="h-5 w-5" />
                      </Button>
                    </div>
                    {activePhrase === idx && (
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Pronunciation Guide</p>
                        <div className="bg-black/50 rounded-lg p-6 text-center font-serif text-amber-200">
                          {phrase.emphasized}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="invocations" className="mt-6 space-y-4">
              {invocationPhrases.map((phrase, idx) => (
                <Card 
                  key={idx} 
                  className={`bg-slate-800 border-slate-700 cursor-pointer transition-all hover:border-amber-500/50 ${activePhrase === idx + 100 ? 'border-amber-500 ring-1 ring-amber-500/30' : ''}`}
                  onClick={() => setActivePhrase(activePhrase === idx + 100 ? null : idx + 100)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium text-white">{phrase.latin}</p>
                        <p className="text-sm text-slate-400">{phrase.meaning}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-400">
                        <Volume2 className="h-5 w-5" />
                      </Button>
                    </div>
                    {activePhrase === idx + 100 && (
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Pronunciation Guide</p>
                        <div className="bg-black/50 rounded-lg p-6 text-center font-serif text-amber-200">
                          {phrase.emphasized}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-slate-800/50 py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-8">What's Included</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-10 w-10 mx-auto text-amber-400 mb-4" />
                <h3 className="font-bold mb-2">Monthly Lessons</h3>
                <p className="text-sm text-slate-400">New prayers, invocations, and ritual phrases added every month</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-10 w-10 mx-auto text-amber-400 mb-4" />
                <h3 className="font-bold mb-2">Visual Emphasis</h3>
                <p className="text-sm text-slate-400">Our unique system shows exactly where to stress each syllable</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="pt-6 text-center">
                <Star className="h-10 w-10 mx-auto text-amber-400 mb-4" />
                <h3 className="font-bold mb-2">Grimoire Excerpts</h3>
                <p className="text-sm text-slate-400">Selections from historical texts with proper pronunciation guides</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Sacred Latin?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join practitioners who are deepening their ritual work through proper pronunciation.
            Cancel anytime - no contracts, no commitments.
          </p>
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
            onClick={handleSubscribe}
          >
            Subscribe Now - $19/month <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-slate-500 text-sm mt-4">
            Questions? <Link href="/contact" className="text-amber-400 hover:underline">Contact Jackie</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
