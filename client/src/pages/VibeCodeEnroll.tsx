import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowLeft,
  CheckCircle,
  Shield,
  Clock,
  Award,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VibeCodeEnroll() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEnroll = async () => {
    if (!email || !firstName || !lastName) {
      toast({
        title: "Please fill in all fields",
        description: "We need your name and email to create your account.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/vibe-code/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          semesterId: "semester-1"
        })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({
          title: "Enrollment started!",
          description: "Redirecting to payment...",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/50 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-8">
        <div className="container mx-auto px-4">
          <Link href="/vibe-code">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4" data-testid="button-back-to-academy">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Academy
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Enroll in Vibe Code Academy
          </h1>
          <p className="text-purple-200 text-lg">
            Start your journey to becoming a product engineer
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Enrollment Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Your Information</CardTitle>
              <CardDescription className="text-gray-400">
                Create your student account to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                  <Input 
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-first-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                  <Input 
                    id="lastName"
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    data-testid="input-last-name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  data-testid="input-email"
                />
                <p className="text-xs text-gray-500">
                  You'll use this email to access your course materials
                </p>
              </div>

              <Button 
                onClick={handleEnroll}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
                data-testid="button-proceed-to-payment"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment - $299"
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 text-gray-400 text-sm pt-4">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Instant access
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-green-500/20 text-green-300 border-green-500/30">
                  Most Popular
                </Badge>
                <CardTitle className="text-white text-xl">Semester 1: Foundations</CardTitle>
                <CardDescription className="text-purple-200">
                  Everything you need to start building with AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-white">
                  $299 <span className="text-lg font-normal text-gray-400">one-time</span>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-purple-500/30">
                  <h4 className="font-medium text-white">What's included:</h4>
                  <ul className="space-y-2">
                    {[
                      "8 weeks of structured learning",
                      "25+ hours of video content",
                      "3 hands-on portfolio projects",
                      "AI tutor support",
                      "Certificate upon completion",
                      "Lifetime access to materials",
                      "Community access"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-8 w-8 text-purple-400" />
                  <div>
                    <h4 className="font-medium text-white">30-Day Money-Back Guarantee</h4>
                    <p className="text-sm text-gray-400">
                      Not satisfied? Get a full refund within 30 days, no questions asked.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-gray-500 text-sm">
              <p>Questions? <Link href="/contact" className="text-purple-400 hover:underline">Contact us</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
