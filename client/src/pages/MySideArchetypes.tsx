import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Crown, Sword, Heart, Moon, Sun, Shield, Flame, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const archetypes = [
  {
    id: "hero",
    name: "The Hero",
    icon: Sword,
    color: "bg-blue-500",
    description: "The brave soul who faces challenges head-on. Use this archetype when you want to show your strength, your fight, your refusal to give up.",
    traits: ["Courageous", "Determined", "Self-sacrificing", "Moral"],
    useFor: "Stories about overcoming obstacles, standing up for yourself, or surviving difficult situations"
  },
  {
    id: "villain",
    name: "The Shadow",
    icon: Moon,
    color: "bg-slate-700",
    description: "The antagonist of your story. The person or force that caused harm. Using an archetype keeps you safe while telling truth.",
    traits: ["Manipulative", "Controlling", "Harmful", "Deceptive"],
    useFor: "Representing those who hurt you without naming them directly"
  },
  {
    id: "mentor",
    name: "The Mentor",
    icon: Crown,
    color: "bg-amber-500",
    description: "The wise guide who helped you see clearly. Perhaps a therapist, a friend, a stranger who said the right thing at the right time.",
    traits: ["Wise", "Supportive", "Patient", "Insightful"],
    useFor: "Honoring those who helped you heal or escape"
  },
  {
    id: "innocent",
    name: "The Innocent",
    icon: Sun,
    color: "bg-yellow-400",
    description: "Your younger self, or a version of you before you knew what was coming. Pure, trusting, deserving of protection.",
    traits: ["Trusting", "Hopeful", "Vulnerable", "Pure"],
    useFor: "Representing who you were before trauma, or children affected by situations"
  },
  {
    id: "warrior",
    name: "The Warrior",
    icon: Shield,
    color: "bg-red-600",
    description: "The part of you that fought back, set boundaries, or finally said 'no more.' Fierce and protective.",
    traits: ["Fierce", "Protective", "Boundary-setting", "Strong"],
    useFor: "Stories about finding your voice, leaving, or fighting back"
  },
  {
    id: "healer",
    name: "The Healer",
    icon: Heart,
    color: "bg-pink-500",
    description: "The nurturing presence—you caring for yourself, or someone who showed you compassion when you needed it most.",
    traits: ["Compassionate", "Nurturing", "Patient", "Gentle"],
    useFor: "Recovery stories, self-care journeys, or acts of kindness that changed everything"
  },
  {
    id: "trickster",
    name: "The Trickster",
    icon: Flame,
    color: "bg-orange-500",
    description: "The one who played games, twisted words, made you question reality. Gaslighters and manipulators wear this mask.",
    traits: ["Cunning", "Chaotic", "Deceptive", "Unpredictable"],
    useFor: "Representing gaslighting, manipulation, or those who made you doubt yourself"
  },
  {
    id: "ghost",
    name: "The Ghost",
    icon: Ghost,
    color: "bg-purple-400",
    description: "The absent one. The parent who wasn't there, the support that never came, the void where love should have been.",
    traits: ["Absent", "Neglectful", "Invisible", "Missing"],
    useFor: "Stories about abandonment, neglect, or the pain of absence"
  }
];

export default function MySideArchetypes() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="bg-gradient-to-br from-amber-900 to-orange-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-archetypes-heading">
            Story Archetypes
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Powerful characters that speak your truth while keeping you safe. 
            Choose the archetypes that represent the people in your story.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">Why Use Archetypes?</h2>
            <p className="text-amber-700">
              Archetypes are universal character patterns that everyone recognizes. By telling your story through 
              these characters, you can share deeply personal experiences without revealing identifying details. 
              Readers instantly understand the dynamics—the controlling Shadow, the absent Ghost, the brave Hero 
              who finally escaped. Your truth remains protected while your story speaks volumes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {archetypes.map((archetype, index) => (
              <motion.div
                key={archetype.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-amber-200 hover:shadow-lg transition-shadow" data-testid={`card-archetype-${archetype.id}`}>
                  <CardHeader>
                    <div className={`w-14 h-14 ${archetype.color} rounded-full flex items-center justify-center mb-3`}>
                      <archetype.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-amber-900">{archetype.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-amber-700 mb-4">
                      {archetype.description}
                    </CardDescription>
                    <div className="mb-4">
                      <p className="text-xs font-medium text-amber-600 mb-2">TRAITS</p>
                      <div className="flex flex-wrap gap-1">
                        {archetype.traits.map((trait) => (
                          <span key={trait} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-amber-100">
                      <p className="text-xs text-amber-600">
                        <strong>Use for:</strong> {archetype.useFor}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Ready to Tell Your Story?</h2>
          <p className="text-amber-700 mb-8 max-w-xl mx-auto">
            Choose your archetypes, build your panels, and share your truth. 
            Your story could help someone else feel less alone.
          </p>
          <Link href="/my-side/write">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700" data-testid="button-start-story">
              Start Your Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
