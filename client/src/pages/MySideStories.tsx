import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Lock, Heart, AlertTriangle, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sampleStories = [
  {
    id: "1",
    title: "The Invisible Wall",
    synopsis: "A story about growing up with a parent who was physically present but emotionally absent. The Ghost archetype helped me finally understand it wasn't my fault.",
    archetypes: ["The Innocent", "The Ghost", "The Healer"],
    readTime: "8 min",
    warnings: ["Emotional neglect", "Childhood trauma"],
    viewCount: 1247
  },
  {
    id: "2", 
    title: "When the Mask Slipped",
    synopsis: "For years, everyone thought he was perfect. This is the story of what happened behind closed doors, and how I finally found the courage to leave.",
    archetypes: ["The Hero", "The Shadow", "The Trickster"],
    readTime: "12 min",
    warnings: ["Domestic abuse", "Gaslighting"],
    viewCount: 2834
  },
  {
    id: "3",
    title: "The Words That Saved Me",
    synopsis: "A stranger on a bus said seven words that changed everything. Sometimes the Mentor appears when you least expect it.",
    archetypes: ["The Warrior", "The Mentor"],
    readTime: "5 min",
    warnings: ["Suicidal ideation (resolved)", "Hope"],
    viewCount: 4521
  },
  {
    id: "4",
    title: "Silent Dinners",
    synopsis: "Growing up in a home where love was conditional and approval had to be earned. The cost of perfectionism no one talks about.",
    archetypes: ["The Innocent", "The Shadow", "The Hero"],
    readTime: "10 min",
    warnings: ["Emotional abuse", "Perfectionism"],
    viewCount: 1892
  }
];

export default function MySideStories() {
  const [isSubscribed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="bg-gradient-to-br from-amber-900 to-orange-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-stories-heading">
            Stories
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Real stories from real people. Anonymous. Honest. Powerful.
            No comment section. No trolls. Just truth.
          </p>
        </div>
      </section>

      {!isSubscribed && (
        <section className="py-8 bg-amber-100 border-b border-amber-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-900">Subscribe to read full stories</p>
                  <p className="text-sm text-amber-700">Your subscription supports writers directly</p>
                </div>
              </div>
              <Link href="/my-side/subscribe">
                <Button className="bg-amber-600 hover:bg-amber-700" data-testid="button-subscribe-cta">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {sampleStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-amber-200 hover:shadow-lg transition-all group" data-testid={`card-story-${story.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-amber-900 text-xl group-hover:text-amber-700 transition-colors">
                        {story.title}
                      </CardTitle>
                      {!isSubscribed && <Lock className="h-5 w-5 text-amber-400" />}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-amber-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {story.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {story.viewCount.toLocaleString()} reads
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-amber-700 mb-4 line-clamp-3">
                      {story.synopsis}
                    </CardDescription>
                    
                    <div className="mb-4">
                      <p className="text-xs font-medium text-amber-600 mb-2">ARCHETYPES</p>
                      <div className="flex flex-wrap gap-1">
                        {story.archetypes.map((archetype) => (
                          <Badge key={archetype} variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                            {archetype}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-amber-100">
                      <p className="text-xs font-medium text-amber-600 mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        CONTENT WARNINGS
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {story.warnings.map((warning) => (
                          <span key={warning} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded">
                            {warning}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      {isSubscribed ? (
                        <Button className="w-full bg-amber-600 hover:bg-amber-700" data-testid={`button-read-${story.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Read Story
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full border-amber-300 text-amber-700" disabled>
                          <Lock className="mr-2 h-4 w-4" />
                          Subscribe to Read
                        </Button>
                      )}
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
          <Heart className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Your Story Could Be Here</h2>
          <p className="text-amber-700 mb-8 max-w-xl mx-auto">
            Every story you share helps someone else feel less alone. 
            Your experience has value. Your truth matters.
          </p>
          <Link href="/my-side/write">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700" data-testid="button-share-story">
              Share Your Story
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
