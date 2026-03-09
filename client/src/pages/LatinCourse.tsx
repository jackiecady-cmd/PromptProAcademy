import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Volume2, 
  BookOpen, 
  Star,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  Languages,
  Heart,
  Gift,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  XCircle,
  Trophy,
  GraduationCap,
  Stethoscope,
  HeartPulse
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "wouter";
import { lessons, categoryLabels, categoryColors, type Lesson, type Syllable } from "@/data/latinLessons";
import { medicalRoots, medicalLessonLinks, medicalQuizQuestions, healthcareOverrides } from "@/data/medicalRoots";

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

function MedLinkBox({ lessonId }: { lessonId: number }) {
  const lessonLinks = medicalLessonLinks.find(m => m.lessonId === lessonId);
  if (!lessonLinks || lessonLinks.links.length === 0) return null;

  return (
    <div className="space-y-3 mt-6">
      {lessonLinks.links.map((link, idx) => (
        <Card key={idx} className="bg-teal-500/10 border-teal-500/30" data-testid={`med-link-${lessonId}-${idx}`}>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Stethoscope className="h-4 w-4 text-teal-400" />
              </div>
              <div>
                <p className="font-medium text-teal-300 text-sm">Med Link</p>
                <p className="text-white font-medium mt-1">{link.title}</p>
                <p className="text-slate-400 text-sm mt-1">{link.description}</p>
                {link.rootRefs.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {link.rootRefs.map(ref => {
                      const root = medicalRoots.find(r => r.root === ref);
                      return root ? (
                        <Badge key={ref} className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
                          {root.root} ({root.meaning})
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function applyHealthcareOverride(lesson: Lesson, medMode: boolean): Lesson {
  if (!medMode) return lesson;
  const override = healthcareOverrides.find(o => o.lessonId === lesson.id);
  if (!override) return lesson;
  const result = { ...lesson };
  if (override.title) result.title = override.title;
  if (override.subtitle) result.subtitle = override.subtitle;
  if (override.content) result.content = override.content;
  if (override.phrases) result.phrases = override.phrases;
  if (override.vocabReplacements) {
    result.vocabulary = [...lesson.vocabulary];
    for (const rep of override.vocabReplacements) {
      if (rep.index < result.vocabulary.length) {
        result.vocabulary[rep.index] = { latin: rep.latin, english: rep.english, type: rep.type, phonetic: rep.phonetic, ...(rep.gender ? { gender: rep.gender } : {}), ...(rep.declension ? { declension: rep.declension } : {}), ...(rep.conjugation ? { conjugation: rep.conjugation } : {}) };
      }
    }
  }
  if (override.quizReplacements) {
    result.quiz = [...lesson.quiz];
    for (const rep of override.quizReplacements) {
      if (rep.index < result.quiz.length) {
        result.quiz[rep.index] = { question: rep.question, options: rep.options, correctIndex: rep.correctIndex, explanation: rep.explanation };
      }
    }
  }
  return result;
}

function LessonView({ lesson: rawLesson, onBack, medMode }: { lesson: Lesson; onBack: () => void; medMode: boolean }) {
  const lesson = applyHealthcareOverride(rawLesson, medMode);
  const [expandedPhrase, setExpandedPhrase] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const medQuestions = medMode
    ? medicalQuizQuestions
        .filter(q => q.lessonId === lesson.id)
        .map(q => ({ question: q.question, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation }))
    : [];
  const allQuizQuestions = [...lesson.quiz, ...medQuestions];

  const handleAnswer = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
    setShowExplanation(true);
    if (optionIdx === allQuizQuestions[currentQuestion].correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < allQuizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setQuizComplete(false);
    setQuizStarted(false);
  };

  const catColor = categoryColors[lesson.category] || "bg-slate-500/20 text-slate-300 border-slate-500/30";

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-slate-400 hover:text-white"
        data-testid="button-back-to-lessons"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Lessons
      </Button>

      <div className="flex items-center gap-3 mb-2">
        <Badge className={catColor}>
          {categoryLabels[lesson.category]}
        </Badge>
        <span className="text-slate-500 text-sm">Lesson {lesson.id} of {lessons.length}</span>
      </div>

      <h2 className="text-3xl font-serif font-bold text-white" data-testid={`text-lesson-title-${lesson.id}`}>{lesson.title}</h2>
      <p className="text-lg text-amber-300">{lesson.subtitle}</p>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="py-5">
          <p className="text-slate-300 leading-relaxed">{lesson.content}</p>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2 mt-8">
        <Volume2 className="h-5 w-5" /> Phrases & Pronunciation
      </h3>
      {lesson.phrases.map((phrase, idx) => (
        <Card 
          key={idx} 
          className={`bg-slate-800 border-slate-700 cursor-pointer transition-all hover:border-amber-500/50 ${expandedPhrase === idx ? 'border-amber-500 ring-1 ring-amber-500/30' : ''}`}
          onClick={() => setExpandedPhrase(expandedPhrase === idx ? null : idx)}
        >
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-white font-serif">{phrase.latin}</p>
                <p className="text-sm text-slate-400">{phrase.meaning}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-amber-400 hover:bg-amber-500/20"
                onClick={(e) => { e.stopPropagation(); speakLatin(phrase.latin); }}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
            {expandedPhrase === idx && (
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
                    onClick={(e) => { e.stopPropagation(); speakLatin(phrase.latin); }}
                  >
                    <Play className="h-4 w-4 mr-1" /> Listen & Repeat
                  </Button>
                </div>
                {phrase.notes && (
                  <p className="text-xs text-slate-500 italic">{phrase.notes}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2 mt-8">
        <BookOpen className="h-5 w-5" /> Vocabulary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {lesson.vocabulary.map((word, idx) => (
          <Card key={idx} className="bg-slate-800 border-slate-700">
            <CardContent className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg text-white">{word.latin}</span>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                    {word.type}{word.gender ? ` (${word.gender.charAt(0)})` : ""}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400">{word.english}</p>
                <p className="text-xs text-amber-300/70">{word.phonetic}</p>
                {word.declension && <p className="text-xs text-slate-500">{word.declension} declension</p>}
                {word.conjugation && <p className="text-xs text-slate-500">{word.conjugation} conjugation</p>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-400 hover:bg-amber-500/20"
                onClick={() => speakLatin(word.latin)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {medMode && <MedLinkBox lessonId={lesson.id} />}

      <div className="mt-10 pt-6 border-t border-slate-700">
        {!quizStarted ? (
          <Card className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-amber-500/30">
            <CardContent className="py-8 text-center">
              <GraduationCap className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Lesson {lesson.id} Quiz</h3>
              <p className="text-slate-400 mb-6">
                {allQuizQuestions.length} questions to test your knowledge
                {medMode && medQuestions.length > 0 && (
                  <span className="block text-teal-400 text-xs mt-1">
                    <Stethoscope className="h-3 w-3 inline mr-1" />
                    Includes {medQuestions.length} medical question{medQuestions.length !== 1 ? "s" : ""}
                  </span>
                )}
              </p>
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                onClick={() => setQuizStarted(true)}
                data-testid={`button-start-quiz-${lesson.id}`}
              >
                <Star className="h-5 w-5 mr-2" /> Start Quiz
              </Button>
            </CardContent>
          </Card>
        ) : quizComplete ? (
          <Card className="bg-gradient-to-r from-amber-500/10 to-green-500/10 border-amber-500/30">
            <CardContent className="py-8 text-center">
              <Trophy className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
              <p className="text-4xl font-bold text-amber-400 mb-2" data-testid={`text-quiz-score-${lesson.id}`}>
                {correctCount} / {allQuizQuestions.length}
              </p>
              <p className="text-slate-400 mb-6">
                {correctCount === allQuizQuestions.length ? "Perfect score! Excellent work!" :
                 correctCount >= allQuizQuestions.length * 0.75 ? "Great job! You're learning well." :
                 correctCount >= allQuizQuestions.length * 0.5 ? "Good effort. Review the lesson and try again." :
                 "Keep studying! Review the vocabulary and phrases above."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={resetQuiz} className="border-slate-600 text-slate-300">
                  Retake Quiz
                </Button>
                <Button onClick={onBack} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Next Lesson <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-800 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  Question {currentQuestion + 1} of {allQuizQuestions.length}
                  {medMode && currentQuestion >= lesson.quiz.length && (
                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
                      <Stethoscope className="h-3 w-3 mr-1" /> Med
                    </Badge>
                  )}
                </CardTitle>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  {correctCount} correct
                </Badge>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / allQuizQuestions.length) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-white font-medium" data-testid={`text-quiz-question-${lesson.id}`}>
                {allQuizQuestions[currentQuestion].question}
              </p>
              <div className="space-y-2">
                {allQuizQuestions[currentQuestion].options.map((option, optIdx) => {
                  const isSelected = selectedAnswer === optIdx;
                  const isCorrect = optIdx === allQuizQuestions[currentQuestion].correctIndex;
                  let btnClass = "w-full text-left justify-start py-3 px-4 border ";
                  if (selectedAnswer !== null) {
                    if (isCorrect) btnClass += "border-green-500 bg-green-500/10 text-green-300";
                    else if (isSelected && !isCorrect) btnClass += "border-red-500 bg-red-500/10 text-red-300";
                    else btnClass += "border-slate-700 text-slate-500";
                  } else {
                    btnClass += "border-slate-700 hover:border-amber-500/50 hover:bg-slate-700/50 text-slate-200";
                  }

                  return (
                    <Button
                      key={optIdx}
                      variant="outline"
                      className={btnClass}
                      onClick={() => handleAnswer(optIdx)}
                      disabled={selectedAnswer !== null}
                      data-testid={`button-quiz-option-${optIdx}`}
                    >
                      <span className="mr-3 font-bold text-slate-500">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {option}
                      {selectedAnswer !== null && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 ml-auto text-green-400" />
                      )}
                      {selectedAnswer !== null && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 ml-auto text-red-400" />
                      )}
                    </Button>
                  );
                })}
              </div>
              {showExplanation && (
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mt-4">
                  <p className="text-sm text-slate-300">
                    {allQuizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}
              {selectedAnswer !== null && (
                <Button
                  onClick={handleNextQuestion}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold mt-4"
                  data-testid="button-next-question"
                >
                  {currentQuestion < allQuizQuestions.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function LatinCourse() {
  const [translatorInput, setTranslatorInput] = useState("");
  const [translatorResult, setTranslatorResult] = useState<any>(null);
  const [translating, setTranslating] = useState(false);
  
  const [prayerIntention, setPrayerIntention] = useState("");
  const [prayerDeity, setPrayerDeity] = useState("");
  const [prayerTone, setPrayerTone] = useState("reverent");
  const [generatedPrayer, setGeneratedPrayer] = useState<any[]>([]);
  const [generatingPrayer, setGeneratingPrayer] = useState(false);

  const [freeSpots, setFreeSpots] = useState<number | null>(null);
  const [freeDialogOpen, setFreeDialogOpen] = useState(false);
  const [freeEmail, setFreeEmail] = useState("");
  const [freeFirstName, setFreeFirstName] = useState("");
  const [freeLastName, setFreeLastName] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [medMode, setMedMode] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/promo/latin-free-spots")
      .then(r => r.json())
      .then(data => setFreeSpots(data.remaining))
      .catch(() => {});
  }, []);

  const handleClaimFree = async () => {
    if (!freeEmail || !freeFirstName || !freeLastName) return;
    setClaiming(true);
    try {
      const res = await fetch("/api/checkout/latin-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: freeEmail, firstName: freeFirstName, lastName: freeLastName }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setClaimed(true);
        setFreeSpots(prev => prev !== null ? Math.max(0, prev - 1) : null);
        toast({ title: "You're in! Lifetime access granted!", description: `${medMode ? "Medical" : "Sacred"} Latin Course is yours — $0.00 forever. No credit card needed.` });
      } else {
        toast({ title: "Could not claim", description: data.error || "Please try again.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
    setClaiming(false);
  };

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
        body: JSON.stringify({ 
          intention: prayerIntention, 
          tone: prayerTone,
          deity: prayerDeity || undefined
        }),
      });
      const data = await response.json();
      setGeneratedPrayer(data.phrases || []);
    } catch (error) {
      console.error("Prayer generation error:", error);
    } finally {
      setGeneratingPrayer(false);
    }
  };

  const baseLessons = medMode
    ? lessons.filter(l => l.category !== "prayers").map(l => applyHealthcareOverride(l, true))
    : lessons;

  const filteredLessons = filterCategory 
    ? baseLessons.filter(l => l.category === filterCategory) 
    : baseLessons;

  const categories = Object.keys(categoryLabels).filter(
    cat => !medMode || cat !== "prayers"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
            {medMode ? "19" : "21"} Lessons + Quizzes
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {medMode ? "Medical Latin Pronunciation" : "Sacred Latin Pronunciation"}
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            {medMode
              ? "Master the ancient tongue for clinical terminology and anatomy"
              : "Master the ancient tongue for invocations, prayers, and ritual work"}
          </p>
          <p className="text-slate-400 mb-8">
            {medMode
              ? "Nouns, verbs, declensions, conjugations + AI translator + medical roots"
              : "Nouns, verbs, declensions, conjugations + AI translator + custom prayer builder"}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            {freeSpots !== null && freeSpots > 0 && !claimed && (
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold animate-pulse"
                onClick={() => setFreeDialogOpen(true)}
                data-testid="button-latin-free"
              >
                <Gift className="h-5 w-5 mr-2" /> First 20 Get It FREE — Lifetime Access
              </Button>
            )}
            {claimed && (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-6 py-2" data-testid="badge-claimed">
                <Check className="h-5 w-5 mr-2" /> You have lifetime access!
              </Badge>
            )}
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              onClick={handleSubscribe}
              data-testid="button-subscribe"
            >
              Subscribe - $19/month
            </Button>
          </div>
          {freeSpots !== null && freeSpots > 0 && !claimed && (
            <p className="text-green-400 font-bold mb-4 text-lg" data-testid="text-free-spots">
              Only {freeSpots} free lifetime spot{freeSpots !== 1 ? 's' : ''} remaining!
            </p>
          )}
          {freeSpots !== null && freeSpots === 0 && !claimed && (
            <p className="text-red-400 font-medium mb-4">
              All 20 free spots have been claimed
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> {medMode ? "19" : "21"} structured lessons</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> Quizzes after each lesson</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> AI pronunciation</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> {medMode ? "Medical roots & terminology" : "Custom prayers"}</span>
          </div>
        </div>
      </div>

      <div className="container px-4 pb-16">
        <Tabs defaultValue="lessons" className="max-w-4xl mx-auto">
          <TabsList className={`grid w-full bg-slate-800 mb-8 ${medMode ? "grid-cols-2" : "grid-cols-3"}`}>
            <TabsTrigger value="lessons" className="flex items-center gap-2" data-testid="tab-lessons">
              <BookOpen className="h-4 w-4" /> Lessons
            </TabsTrigger>
            <TabsTrigger value="translator" className="flex items-center gap-2" data-testid="tab-translator">
              <Languages className="h-4 w-4" /> Translator
            </TabsTrigger>
            {!medMode && (
              <TabsTrigger value="prayer" className="flex items-center gap-2" data-testid="tab-prayer">
                <Heart className="h-4 w-4" /> Prayer Builder
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            {selectedLesson ? (
              <LessonView 
                lesson={selectedLesson} 
                onBack={() => setSelectedLesson(null)}
                medMode={medMode}
              />
            ) : (
              <>
                <Card className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border-amber-500/30 mb-2">
                  <CardContent className="py-6">
                    <p className="text-2xl font-serif text-amber-300 italic text-center mb-4" data-testid="text-welcome">
                      Salve, student! Ready to speak like Caesar?
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <label
                        htmlFor="med-toggle"
                        className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full border transition-all ${
                          medMode
                            ? "bg-teal-500/20 border-teal-500/50 text-teal-300"
                            : "bg-slate-800/50 border-slate-600 text-slate-400"
                        }`}
                        data-testid="label-med-toggle"
                      >
                        <Stethoscope className={`h-5 w-5 ${medMode ? "text-teal-400" : "text-slate-500"}`} />
                        <span className="text-sm font-medium">Medical / Healthcare Mode</span>
                        <Switch
                          id="med-toggle"
                          checked={medMode}
                          onCheckedChange={(val) => { setMedMode(val); if (val && filterCategory === "prayers") setFilterCategory(null); }}
                          data-testid="switch-med-mode"
                        />
                      </label>
                    </div>
                    {medMode && (
                      <p className="text-center text-xs text-teal-400 mt-2" data-testid="text-med-active">
                        Medical context ON — Med Link boxes and extra quiz questions added to each lesson
                      </p>
                    )}
                  </CardContent>
                </Card>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={filterCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory(null)}
                    className={filterCategory === null ? "bg-amber-500 text-black" : "border-slate-600 text-slate-300"}
                    data-testid="filter-all"
                  >
                    All ({baseLessons.length})
                  </Button>
                  {categories.map(cat => {
                    const count = lessons.filter(l => l.category === cat).length;
                    return (
                      <Button
                        key={cat}
                        variant={filterCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterCategory(filterCategory === cat ? null : cat)}
                        className={filterCategory === cat ? "bg-amber-500 text-black" : "border-slate-600 text-slate-300"}
                        data-testid={`filter-${cat}`}
                      >
                        {categoryLabels[cat]} ({count})
                      </Button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {filteredLessons.map((lesson) => {
                    const catColor = categoryColors[lesson.category] || "bg-slate-500/20 text-slate-300";
                    return (
                      <Card 
                        key={lesson.id}
                        className="bg-slate-800 border-slate-700 hover:border-amber-500/50 cursor-pointer transition-all"
                        onClick={() => setSelectedLesson(lesson)}
                        data-testid={`card-lesson-${lesson.id}`}
                      >
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                                {lesson.id}
                              </div>
                              <div>
                                <h3 className="font-medium text-white">{lesson.title}</h3>
                                <p className="text-sm text-slate-400">{lesson.subtitle}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`text-xs ${catColor}`}>
                                    {categoryLabels[lesson.category]}
                                  </Badge>
                                  <span className="text-xs text-slate-500">
                                    {lesson.phrases.length} phrase{lesson.phrases.length !== 1 ? "s" : ""} · {lesson.vocabulary.length} vocab · {lesson.quiz.length + (medMode ? medicalQuizQuestions.filter(q => q.lessonId === lesson.id).length : 0)} quiz questions
                                  </span>
                                  {medMode && medicalLessonLinks.find(m => m.lessonId === lesson.id) && (
                                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
                                      <Stethoscope className="h-3 w-3 mr-1" /> Med
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-500" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </TabsContent>

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
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                    onKeyPress={(e) => e.key === "Enter" && handleTranslate()}
                    data-testid="input-translator"
                  />
                  <Button 
                    onClick={handleTranslate}
                    disabled={translating || !translatorInput.trim()}
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                    data-testid="button-translate"
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
                      
                      {translatorResult.syllables && (
                        <div className="bg-black/50 rounded-lg p-6 text-center">
                          <SyllableDisplay syllables={translatorResult.syllables} />
                        </div>
                      )}
                      
                      {translatorResult.phonetic && (
                        <div className="text-sm text-slate-400">
                          <span>Phonetic: </span>
                          <span className="text-amber-300">{translatorResult.phonetic}</span>
                        </div>
                      )}
                      
                      {translatorResult.notes && (
                        <p className="text-xs text-slate-500 italic">{translatorResult.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {!medMode && <TabsContent value="prayer" className="space-y-6">
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
                  <label className="text-sm text-slate-300 mb-2 block">Addressed To (Optional)</label>
                  <Input
                    placeholder="e.g., Hecate, Mars, Isis, Odin, the Ancestors, the Universe..."
                    value={prayerDeity}
                    onChange={(e) => setPrayerDeity(e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                    data-testid="input-prayer-deity"
                  />
                  <p className="text-xs text-slate-500 mt-1">Leave blank for a general prayer</p>
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Your Intention</label>
                  <Textarea
                    placeholder="What is your prayer for? (e.g., 'Protection for my family', 'Guidance in a difficult decision')"
                    value={prayerIntention}
                    onChange={(e) => setPrayerIntention(e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                    rows={3}
                    data-testid="input-prayer-intention"
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
                  data-testid="button-generate-prayer"
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
                      {generatedPrayer.map((phrase: any, idx: number) => (
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
                          {phrase.syllables && (
                            <div className="bg-black/50 rounded p-3 text-center">
                              <SyllableDisplay syllables={phrase.syllables} />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <Button 
                        className="w-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                        onClick={() => {
                          generatedPrayer.forEach((phrase: any, idx: number) => {
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
          </TabsContent>}
        </Tabs>
      </div>

      <div className="bg-slate-800/50 py-12">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{medMode ? "Ready to Master Medical Latin?" : "Ready to Master Sacred Latin?"}</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            {medMode
              ? "Join healthcare professionals mastering clinical terminology. Cancel anytime."
              : "Join practitioners deepening their ritual work. Cancel anytime."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {freeSpots !== null && freeSpots > 0 && !claimed && (
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold"
                onClick={() => setFreeDialogOpen(true)}
                data-testid="button-latin-free-bottom"
              >
                <Gift className="h-5 w-5 mr-2" /> Claim FREE Lifetime Access
              </Button>
            )}
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

      <Dialog open={freeDialogOpen} onOpenChange={setFreeDialogOpen}>
        <DialogContent className="bg-slate-900 border-green-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-xl flex items-center gap-2">
              <Gift className="h-6 w-6" /> Claim Your FREE Lifetime Access
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              The first 20 people get the {medMode ? "Medical" : "Sacred"} Latin Course completely free — $0.00, forever. No credit card required.
            </DialogDescription>
          </DialogHeader>
          {claimed ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <Check className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">You're In!</h3>
              <p className="text-slate-300">{medMode ? "Medical" : "Sacred"} Latin Course is yours for life. No charges, ever.</p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-green-400 font-bold text-lg">$0.00 — Free for Life</p>
                <p className="text-slate-400 text-sm">{freeSpots} spot{freeSpots !== 1 ? 's' : ''} remaining out of 20</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-300">First Name</Label>
                  <Input
                    value={freeFirstName}
                    onChange={(e) => setFreeFirstName(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="First name"
                    data-testid="input-free-firstname"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Last Name</Label>
                  <Input
                    value={freeLastName}
                    onChange={(e) => setFreeLastName(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="Last name"
                    data-testid="input-free-lastname"
                  />
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Email</Label>
                <Input
                  type="email"
                  value={freeEmail}
                  onChange={(e) => setFreeEmail(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="your@email.com"
                  data-testid="input-free-email"
                />
              </div>
              <Button
                onClick={handleClaimFree}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-6"
                disabled={claiming || !freeEmail.includes("@") || !freeFirstName || !freeLastName}
                data-testid="button-claim-free"
              >
                {claiming ? (
                  <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Claiming...</>
                ) : (
                  <><Gift className="h-5 w-5 mr-2" /> Claim Free Lifetime Access — $0.00</>
                )}
              </Button>
              <p className="text-xs text-center text-slate-500">
                No credit card required. No Stripe charge. This is 100% free.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
