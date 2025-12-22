import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Shield, Heart, Users, PenTool, Eye, Lock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MySideHome() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 py-20 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 text-5xl font-bold md:text-6xl" data-testid="text-main-heading">
              My Side of the Story
            </h1>
            <p className="mb-8 text-xl text-amber-100 md:text-2xl">
              Tell your truth. Stay safe. Heal through storytelling.
            </p>
            <p className="mb-10 text-lg text-amber-200 max-w-2xl mx-auto">
              A safe space to share your experiences through graphic novel storytelling. 
              Use powerful archetypes to express what happened, process trauma, and connect 
              with readers who understand—all while staying completely anonymous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/my-side/write">
                <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-100" data-testid="button-start-writing">
                  <PenTool className="mr-2 h-5 w-5" />
                  Start Writing Your Story
                </Button>
              </Link>
              <Link href="/my-side/stories">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-read-stories">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Stories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Why Tell Your Story Here?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-amber-200">
              <CardHeader>
                <Shield className="h-10 w-10 text-amber-600 mb-2" />
                <CardTitle className="text-amber-900">Complete Anonymity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-700">
                  Write under a pen name. Your real identity is never revealed. You control your story.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <Lock className="h-10 w-10 text-amber-600 mb-2" />
                <CardTitle className="text-amber-900">No Comment Section</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-700">
                  No cyberbullying. No trolls. No cruel comments. Your story exists in a protected space.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <Heart className="h-10 w-10 text-amber-600 mb-2" />
                <CardTitle className="text-amber-900">Healing Through Art</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-700">
                  Use archetypal characters to process experiences. Distance creates safety while honoring truth.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-amber-600 mb-2" />
                <CardTitle className="text-amber-900">Earn From Your Story</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-700">
                  Subscribers pay to read. When they read your story, you earn. Your pain has value.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-amber-900">How It Works</h2>
          <p className="text-center text-amber-700 mb-12 max-w-2xl mx-auto">
            Transform your experiences into powerful graphic novel stories using archetypal characters
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-amber-900">Choose Your Archetypes</h3>
              <p className="text-amber-700">
                Select from our gallery of powerful character archetypes—the Hero, the Shadow, 
                the Mentor, the Villain. They become your voice.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-amber-900">Tell Your Truth</h3>
              <p className="text-amber-700">
                Write your story panel by panel. Describe what happened, how it felt, 
                what you wish people understood. The graphic format makes hard truths easier to share.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-amber-900">Publish & Earn</h3>
              <p className="text-amber-700">
                Choose to publish anonymously. Subscribers read your story, 
                and you earn from every read. Your story helps others feel less alone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-red-900 to-amber-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stories Matter. Yours Matters.</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Behind every "difficult person" is a story no one asked to hear. 
            Behind every struggle is context that changes everything. 
            This is where those stories live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/my-side/archetypes">
              <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-100" data-testid="button-explore-archetypes">
                <Users className="mr-2 h-5 w-5" />
                Explore Archetypes
              </Button>
            </Link>
            <Link href="/my-side/subscribe">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-subscribe">
                <Eye className="mr-2 h-5 w-5" />
                Subscribe to Read
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">Our Promise</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-amber-200">
            <ul className="space-y-4 text-amber-800">
              <li className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Your identity is sacred.</strong> We never reveal writer identities. Ever.</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>No comments, no trolls.</strong> Stories exist in protected spaces without public feedback.</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Healing is the goal.</strong> This platform exists to help people process, not to sensationalize pain.</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Writers earn.</strong> When your story is read, you receive a share of subscription revenue.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
