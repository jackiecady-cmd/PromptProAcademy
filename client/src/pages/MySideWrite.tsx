import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { PenTool, Shield, Save, Eye, Send, Plus, Trash2, ArrowLeft, ArrowRight, Crown, Sword, Heart, Moon, Sun, Flame, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const archetypeOptions = [
  { id: "hero", name: "The Hero", icon: Sword, color: "bg-blue-500" },
  { id: "shadow", name: "The Shadow", icon: Moon, color: "bg-slate-700" },
  { id: "mentor", name: "The Mentor", icon: Crown, color: "bg-amber-500" },
  { id: "innocent", name: "The Innocent", icon: Sun, color: "bg-yellow-400" },
  { id: "warrior", name: "The Warrior", icon: Shield, color: "bg-red-600" },
  { id: "healer", name: "The Healer", icon: Heart, color: "bg-pink-500" },
  { id: "trickster", name: "The Trickster", icon: Flame, color: "bg-orange-500" },
  { id: "ghost", name: "The Ghost", icon: Ghost, color: "bg-purple-400" }
];

interface StoryPanel {
  id: number;
  archetypeId: string;
  narration: string;
  dialogue: string;
  action: string;
}

export default function MySideWrite() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [penName, setPenName] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [selectedArchetypes, setSelectedArchetypes] = useState<string[]>([]);
  const [contentWarnings, setContentWarnings] = useState("");
  const [panels, setPanels] = useState<StoryPanel[]>([
    { id: 1, archetypeId: "", narration: "", dialogue: "", action: "" }
  ]);

  const toggleArchetype = (id: string) => {
    setSelectedArchetypes(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const addPanel = () => {
    setPanels(prev => [...prev, { id: prev.length + 1, archetypeId: "", narration: "", dialogue: "", action: "" }]);
  };

  const removePanel = (id: number) => {
    if (panels.length > 1) {
      setPanels(prev => prev.filter(p => p.id !== id));
    }
  };

  const updatePanel = (id: number, field: keyof StoryPanel, value: string) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const saveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your story has been saved. You can continue later."
    });
  };

  const submitForReview = () => {
    toast({
      title: "Story Submitted",
      description: "Your story is now under review. We'll notify you when it's published."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="bg-gradient-to-br from-amber-900 to-orange-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <PenTool className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-write-heading">
              Write Your Story
            </h1>
          </div>
          <p className="text-amber-100 max-w-2xl">
            Tell your truth through the safety of archetypes. Your identity stays protected.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-600'
                  }`}>
                    {s}
                  </div>
                  {s < 4 && <div className={`w-8 h-0.5 ${step > s ? 'bg-amber-600' : 'bg-amber-200'}`} />}
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={saveDraft} className="border-amber-300" data-testid="button-save-draft">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Step 1: Your Identity</CardTitle>
                  <CardDescription>Choose how you want to appear to readers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="penName" className="text-amber-800">Pen Name</Label>
                    <Input
                      id="penName"
                      value={penName}
                      onChange={(e) => setPenName(e.target.value)}
                      placeholder="Anonymous Storyteller"
                      className="mt-1"
                      data-testid="input-pen-name"
                    />
                    <p className="text-sm text-amber-600 mt-1">
                      This is how readers will know you. Your real identity stays hidden.
                    </p>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3">
                    <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-900">Your Privacy is Protected</p>
                      <p className="text-sm text-amber-700">
                        Your email and identity are never shown to readers. Only your pen name appears on your stories.
                      </p>
                    </div>
                  </div>

                  <Button onClick={() => setStep(2)} className="bg-amber-600 hover:bg-amber-700" data-testid="button-next-step">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Step 2: Choose Your Archetypes</CardTitle>
                  <CardDescription>Select the characters that will tell your story</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {archetypeOptions.map((archetype) => (
                      <button
                        key={archetype.id}
                        onClick={() => toggleArchetype(archetype.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedArchetypes.includes(archetype.id)
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-amber-200 hover:border-amber-400'
                        }`}
                        data-testid={`button-archetype-${archetype.id}`}
                      >
                        <div className={`w-10 h-10 ${archetype.color} rounded-full flex items-center justify-center mb-2`}>
                          <archetype.icon className="h-5 w-5 text-white" />
                        </div>
                        <p className="font-medium text-amber-900 text-sm">{archetype.name}</p>
                      </button>
                    ))}
                  </div>

                  {selectedArchetypes.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-amber-600 mb-2">Selected:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedArchetypes.map(id => {
                          const arch = archetypeOptions.find(a => a.id === id);
                          return arch ? (
                            <Badge key={id} className="bg-amber-100 text-amber-700">
                              {arch.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="border-amber-300" data-testid="button-prev-step">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="bg-amber-600 hover:bg-amber-700" disabled={selectedArchetypes.length === 0} data-testid="button-next-step-2">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Step 3: Story Details</CardTitle>
                  <CardDescription>Give your story a title and description</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-amber-800">Story Title</Label>
                    <Input
                      id="title"
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      placeholder="The Day Everything Changed"
                      className="mt-1"
                      data-testid="input-story-title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="synopsis" className="text-amber-800">Synopsis</Label>
                    <Textarea
                      id="synopsis"
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                      placeholder="A brief description of your story that helps readers know what to expect..."
                      rows={3}
                      className="mt-1"
                      data-testid="input-synopsis"
                    />
                  </div>

                  <div>
                    <Label htmlFor="warnings" className="text-amber-800">Content Warnings (optional)</Label>
                    <Input
                      id="warnings"
                      value={contentWarnings}
                      onChange={(e) => setContentWarnings(e.target.value)}
                      placeholder="e.g., Emotional abuse, Childhood trauma"
                      className="mt-1"
                      data-testid="input-warnings"
                    />
                    <p className="text-sm text-amber-600 mt-1">
                      Help readers know what they're about to read. Separate with commas.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="border-amber-300">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={() => setStep(4)} className="bg-amber-600 hover:bg-amber-700" data-testid="button-next-step-3">
                      Continue to Writing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-amber-200 mb-6">
                <CardHeader>
                  <CardTitle className="text-amber-900">Step 4: Write Your Panels</CardTitle>
                  <CardDescription>Build your graphic novel story panel by panel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {panels.map((panel, index) => (
                      <div key={panel.id} className="p-4 border border-amber-200 rounded-lg bg-amber-50/50">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-amber-900">Panel {index + 1}</h4>
                          {panels.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => removePanel(panel.id)} className="text-red-500 hover:text-red-700" data-testid={`button-remove-panel-${panel.id}`}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-amber-800 text-sm">Featured Character</Label>
                            <select
                              value={panel.archetypeId}
                              onChange={(e) => updatePanel(panel.id, 'archetypeId', e.target.value)}
                              className="w-full mt-1 p-2 border border-amber-200 rounded-md"
                              data-testid={`select-character-${panel.id}`}
                            >
                              <option value="">Select archetype...</option>
                              {selectedArchetypes.map(id => {
                                const arch = archetypeOptions.find(a => a.id === id);
                                return arch ? <option key={id} value={id}>{arch.name}</option> : null;
                              })}
                            </select>
                          </div>

                          <div>
                            <Label className="text-amber-800 text-sm">Narration</Label>
                            <Textarea
                              value={panel.narration}
                              onChange={(e) => updatePanel(panel.id, 'narration', e.target.value)}
                              placeholder="Describe what's happening in this scene..."
                              rows={2}
                              className="mt-1"
                              data-testid={`input-narration-${panel.id}`}
                            />
                          </div>

                          <div>
                            <Label className="text-amber-800 text-sm">Dialogue (optional)</Label>
                            <Input
                              value={panel.dialogue}
                              onChange={(e) => updatePanel(panel.id, 'dialogue', e.target.value)}
                              placeholder="What is being said?"
                              className="mt-1"
                              data-testid={`input-dialogue-${panel.id}`}
                            />
                          </div>

                          <div>
                            <Label className="text-amber-800 text-sm">Action/Emotion (optional)</Label>
                            <Input
                              value={panel.action}
                              onChange={(e) => updatePanel(panel.id, 'action', e.target.value)}
                              placeholder="Body language, facial expression, or movement"
                              className="mt-1"
                              data-testid={`input-action-${panel.id}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" onClick={addPanel} className="w-full border-dashed border-amber-300" data-testid="button-add-panel">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Panel
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-amber-200">
                    <Button variant="outline" onClick={() => setStep(3)} className="border-amber-300">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button variant="outline" onClick={saveDraft} className="border-amber-300">
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button variant="outline" className="border-amber-300" data-testid="button-preview">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button onClick={submitForReview} className="bg-amber-600 hover:bg-amber-700" data-testid="button-submit">
                      <Send className="mr-2 h-4 w-4" />
                      Submit for Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
