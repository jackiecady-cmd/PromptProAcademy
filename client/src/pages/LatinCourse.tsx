import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Volume2, 
  BookOpen, 
  Star,
  Check,
  ArrowRight,
  Sparkles,
  Loader2,
  Languages,
  Heart
} from "lucide-react";
import { Link } from "wouter";

interface Syllable {
  text: string;
  stress: "high" | "medium" | "low";
}

interface LatinPhrase {
  latin: string;
  meaning: string;
  syllables: Syllable[];
  phonetic: string;
  notes?: string;
}

const samplePhrases: LatinPhrase[] = [
  {
    latin: "Ave Maria",
    meaning: "Hail Mary",
    syllables: [
      { text: "A", stress: "high" },
      { text: "ve", stress: "medium" },
      { text: " ", stress: "low" },
      { text: "Ma", stress: "high" },
      { text: "rí", stress: "medium" },
      { text: "a", stress: "low" }
    ],
    phonetic: "AH-veh mah-REE-ah"
  },
  {
    latin: "In nomine Patris",
    meaning: "In the name of the Father",
    syllables: [
      { text: "In", stress: "medium" },
      { text: " ", stress: "low" },
      { text: "NÓ", stress: "high" },
      { text: "mi", stress: "medium" },
      { text: "ne", stress: "low" },
      { text: " ", stress: "low" },
      { text: "PA", stress: "high" },
      { text: "tris", stress: "medium" }
    ],
    phonetic: "een NOH-mee-neh PAH-trees"
  },
  {
    latin: "Domine Deus Meus",
    meaning: "Lord my God",
    syllables: [
      { text: "DO", stress: "high" },
      { text: "mi", stress: "medium" },
      { text: "ne", stress: "low" },
      { text: " ", stress: "low" },
      { text: "DE", stress: "high" },
      { text: "us", stress: "medium" },
      { text: " ", stress: "low" },
      { text: "ME", stress: "high" },
      { text: "us", stress: "low" }
    ],
    phonetic: "DOH-mee-neh DEH-oos MEH-oos"
  },
  {
    latin: "Veni, veni, venias",
    meaning: "Come, come, may you come",
    syllables: [
      { text: "VE", stress: "high" },
      { text: "ni", stress: "medium" },
      { text: ", ", stress: "low" },
      { text: "VE", stress: "high" },
      { text: "ni", stress: "medium" },
      { text: ", ", stress: "low" },
      { text: "VE", stress: "high" },
      { text: "ni", stress: "medium" },
      { text: "as", stress: "low" }
    ],
    phonetic: "VEH-nee, VEH-nee, VEH-nee-ahs"
  },
];

function SyllableDisplay({ syllables }: { syllables: Syllable[] }) {
  const getSizeClass = (stress: string) => {
    switch (stress) {
      case "high": return "text-3xl font-bold text-amber-300";
      case "medium": return "text-xl text-amber-200";
      case "low": return "text-base text-amber-200/70";
      default: return "text-xl";
    }
  };

  return (
    <div className="font-serif tracking-wide inline-flex flex-wrap items-baseline">
      {syllables.map((syl, idx) => (
        <span key={idx} className={getSizeClass(syl.stress)}>
          {syl.text}
        </span>
      ))}
    </div>
  );
}

function speakLatin(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'la';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const latinVoice = voices.find(v => v.lang.startsWith('it') || v.lang.startsWith('la')) || voices[0];
    if (latinVoice) utterance.voice = latinVoice;
    
    window.speechSynthesis.speak(utterance);
  }
}

export default function LatinCourse() {
  const [activePhrase, setActivePhrase] = useState<number | null>(null);
  const [translatorInput, setTranslatorInput] = useState("");
  const [translatorResult, setTranslatorResult] = useState<LatinPhrase | null>(null);
  const [translating, setTranslating] = useState(false);
  
  const [prayerIntention, setPrayerIntention] = useState("");
  const [prayerTone, setPrayerTone] = useState("reverent");
  const [generatedPrayer, setGeneratedPrayer] = useState<LatinPhrase[]>([]);
  const [generatingPrayer, setGeneratingPrayer] = useState(false);

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/subscribe/latin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseType: "latin" }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  const handleTranslate = async () => {
    if (!translatorInput.trim()) return;
    setTranslating(true);
    try {
      const response = await fetch("/api/latin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translatorInput }),
      });
      const data = await response.json();
      setTranslatorResult(data);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setTranslating(false);
    }
  };

  const handleGeneratePrayer = async () => {
    if (!prayerIntention.trim()) return;
    setGeneratingPrayer(true);
    try {
      const response = await fetch("/api/latin/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intention: prayerIntention, tone: prayerTone }),
      });
      const data = await response.json();
      setGeneratedPrayer(data.phrases || []);
    } catch (error) {
      console.error("Prayer generation error:", error);
    } finally {
      setGeneratingPrayer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero */}
      <div className="container px-4 py-12">
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
            Visual emphasis guides + AI pronunciation + custom prayer builder
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              onClick={handleSubscribe}
            >
              Subscribe - $19/month
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> Cancel anytime</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> AI pronunciation</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> Custom prayers</span>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container px-4 pb-16">
        <Tabs defaultValue="lessons" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 mb-8">
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Lessons
            </TabsTrigger>
            <TabsTrigger value="translator" className="flex items-center gap-2">
              <Languages className="h-4 w-4" /> Translator
            </TabsTrigger>
            <TabsTrigger value="prayer" className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Prayer Builder
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400">How It Works</CardTitle>
                <CardDescription className="text-slate-400">
                  Larger letters = stronger emphasis. Click any phrase, then press the speaker to hear it.
                </CardDescription>
              </CardHeader>
            </Card>

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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-amber-400 hover:bg-amber-500/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakLatin(phrase.latin);
                      }}
                    >
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  </div>
                  {activePhrase === idx && (
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Pronunciation Guide</p>
                        <div className="bg-black/50 rounded-lg p-6 text-center">
                          <SyllableDisplay syllables={phrase.syllables} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Phonetic: <span className="text-amber-300">{phrase.phonetic}</span></span>
                        <Button 
                          size="sm" 
                          className="bg-amber-500 hover:bg-amber-600 text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakLatin(phrase.latin);
                          }}
                        >
                          <Play className="h-4 w-4 mr-1" /> Listen & Repeat
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Translator Tab */}
          <TabsContent value="translator" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  English to Latin Translator
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Type any phrase in English and get the Latin translation with pronunciation guide
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter phrase in English... (e.g., 'Protect this house')"
                    value={translatorInput}
                    onChange={(e) => setTranslatorInput(e.target.value)}
                    className="bg-slate-900 border-slate-600"
                    onKeyPress={(e) => e.key === "Enter" && handleTranslate()}
                  />
                  <Button 
                    onClick={handleTranslate}
                    disabled={translating || !translatorInput.trim()}
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    {translating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Translate"}
                  </Button>
                </div>

                {translatorResult && (
                  <Card className="bg-slate-900 border-amber-500/30">
                    <CardContent className="py-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-serif text-amber-300">{translatorResult.latin}</p>
                          <p className="text-sm text-slate-400">{translatorResult.meaning}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-amber-400"
                          onClick={() => speakLatin(translatorResult.latin)}
                        >
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="bg-black/50 rounded-lg p-6 text-center">
                        <SyllableDisplay syllables={translatorResult.syllables} />
                      </div>
                      
                      <div className="text-sm text-slate-400">
                        <span>Phonetic: </span>
                        <span className="text-amber-300">{translatorResult.phonetic}</span>
                      </div>
                      
                      {translatorResult.notes && (
                        <p className="text-xs text-slate-500 italic">{translatorResult.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prayer Builder Tab */}
          <TabsContent value="prayer" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Custom Prayer Builder
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Create personalized Latin prayers for your intentions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Your Intention</label>
                  <Textarea
                    placeholder="What is your prayer for? (e.g., 'Protection for my family', 'Guidance in a difficult decision', 'Gratitude for blessings received')"
                    value={prayerIntention}
                    onChange={(e) => setPrayerIntention(e.target.value)}
                    className="bg-slate-900 border-slate-600"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Tone</label>
                  <div className="flex gap-2 flex-wrap">
                    {["reverent", "protective", "grateful", "invocational", "meditative"].map(tone => (
                      <Button
                        key={tone}
                        variant={prayerTone === tone ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPrayerTone(tone)}
                        className={prayerTone === tone ? "bg-amber-500 text-black" : "border-slate-600 text-slate-300"}
                      >
                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleGeneratePrayer}
                  disabled={generatingPrayer || !prayerIntention.trim()}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                >
                  {generatingPrayer ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Crafting your prayer...</>
                  ) : (
                    <><Sparkles className="h-4 w-4 mr-2" /> Generate Latin Prayer</>
                  )}
                </Button>

                {generatedPrayer.length > 0 && (
                  <Card className="bg-slate-900 border-amber-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-amber-300">Your Prayer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {generatedPrayer.map((phrase, idx) => (
                        <div key={idx} className="border-b border-slate-700 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-serif text-lg text-white">{phrase.latin}</p>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-amber-400"
                              onClick={() => speakLatin(phrase.latin)}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-slate-400 mb-2">{phrase.meaning}</p>
                          <div className="bg-black/50 rounded p-3 text-center">
                            <SyllableDisplay syllables={phrase.syllables} />
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        className="w-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                        onClick={() => {
                          generatedPrayer.forEach((phrase, idx) => {
                            setTimeout(() => speakLatin(phrase.latin), idx * 3000);
                          });
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" /> Listen to Full Prayer
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA */}
      <div className="bg-slate-800/50 py-12">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Master Sacred Latin?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Join practitioners deepening their ritual work. Cancel anytime.
          </p>
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
            onClick={handleSubscribe}
          >
            Subscribe Now - $19/month <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
