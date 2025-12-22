import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Heart, Shield, Users, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function MySideSubscribe() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    toast({
      title: "Subscription Coming Soon",
      description: "We're setting up our subscription system. Check back soon!"
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="bg-gradient-to-br from-amber-900 to-orange-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-subscribe-heading">
            Subscribe to My Side of the Story
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Unlimited access to powerful, honest stories. Your subscription directly supports the writers.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-6">What You Get</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Unlimited Story Access</p>
                    <p className="text-sm text-amber-700">Read every published story, as many times as you want</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Support Writers Directly</p>
                    <p className="text-sm text-amber-700">A portion of your subscription goes to the writers whose stories you read</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">New Stories Weekly</p>
                    <p className="text-sm text-amber-700">Fresh content from anonymous writers sharing their truth</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Comment-Free Experience</p>
                    <p className="text-sm text-amber-700">Read in peace without trolls or toxic comments</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Cancel Anytime</p>
                    <p className="text-sm text-amber-700">No long-term commitment required</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-amber-300 shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl">Reader Subscription</CardTitle>
                    <CardDescription className="text-amber-100">
                      Full access to all stories
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">TBD</span>
                      <span className="text-amber-100">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-amber-800">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="mt-1"
                          data-testid="input-subscribe-email"
                        />
                      </div>

                      <Button 
                        onClick={handleSubscribe} 
                        className="w-full bg-amber-600 hover:bg-amber-700" 
                        disabled={isLoading}
                        data-testid="button-subscribe-now"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        {isLoading ? "Processing..." : "Subscribe Now"}
                      </Button>

                      <p className="text-xs text-center text-amber-600">
                        Secure payment processing. Cancel anytime.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-amber-900 mb-8">Why Subscribe?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <BookOpen className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-amber-900 mb-2">Real Stories</h3>
              <p className="text-amber-700 text-sm">
                Not fiction. Real experiences from real people who've lived through challenges and want to share their truth.
              </p>
            </div>
            <div className="text-center p-6">
              <Heart className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-amber-900 mb-2">Feel Less Alone</h3>
              <p className="text-amber-700 text-sm">
                Reading others' experiences helps us understand our own. Connection through shared human experience.
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-amber-900 mb-2">Support Healing</h3>
              <p className="text-amber-700 text-sm">
                Your subscription helps writers earn from their stories. Healing through recognition and compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Shield className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Safe Space Promise</h2>
          <p className="text-amber-700">
            This is not a place for gossip or entertainment at others' expense. 
            These are real stories from people processing real experiences. 
            By subscribing, you agree to honor the courage it takes to share these truths.
          </p>
        </div>
      </section>
    </div>
  );
}
