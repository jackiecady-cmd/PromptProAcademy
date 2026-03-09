import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShieldCheck, Lock, Loader2, GraduationCap, Star, Briefcase, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const courses = [
  {
    id: "academy_professional",
    name: "Professional",
    subtitle: "Career-Ready Certification",
    price: 249,
    priceInCents: 24900,
    description: "Complete training with certification and job placement support",
    icon: Briefcase,
  },
];

export default function AcademyCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("academy_professional");
  const { toast } = useToast();

  const course = courses.find(c => c.id === selectedCourse)!;

  const handleCheckout = async () => {
    if (!firstName || !lastName || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await createCheckoutSession({
        email,
        firstName,
        lastName,
        productType: selectedCourse,
        amount: course.priceInCents,
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      toast({
        title: "Checkout Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container px-4 md:px-6 max-w-5xl">
        <Link href="/learn">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to PromptPro Academy
          </Button>
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">
                <span className="text-blue-600">Prompt</span>Pro Academy Enrollment
              </h1>
              <p className="text-muted-foreground">Start your journey to working with AI</p>
            </div>

            {/* Course Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Course</CardTitle>
                <CardDescription>Select the learning path that's right for you</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedCourse} onValueChange={setSelectedCourse} className="space-y-4">
                  {courses.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.id}
                        className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedCourse === c.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCourse(c.id)}
                      >
                        <RadioGroupItem value={c.id} id={c.id} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedCourse === c.id ? 'bg-blue-600 text-white' : 'bg-gray-100'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={c.id} className="font-bold cursor-pointer">{c.name}</Label>
                            {c.popular && (
                              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">Popular</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{c.subtitle}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold">${c.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>We'll send your course access to this email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input 
                      id="first-name" 
                      placeholder="Jane" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input 
                      id="last-name" 
                      placeholder="Doe" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="jane@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button 
                  className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Enroll Now - $${course.price}.00`
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>256-bit SSL encryption • Powered by Stripe</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="bg-blue-50/50 border-blue-200">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{course.name} Course</p>
                    <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                  </div>
                  <span className="font-bold">${course.price}.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${course.price}.00</span>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <ShieldCheck className="h-5 w-5" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <p className="text-sm text-muted-foreground">
                If you're not satisfied within the first 30 days, we'll refund your purchase. No questions asked.
              </p>
            </div>

            <Card className="border-blue-200 bg-blue-50/30">
              <CardContent className="py-4">
                <h4 className="font-semibold text-blue-800 mb-2">What You'll Learn:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  {selectedCourse === "academy_starter" && (
                    <>
                      <li>✓ AI fundamentals through ancestry research</li>
                      <li>✓ 5 guided AI conversations</li>
                      <li>✓ Basic prompt templates</li>
                      <li>✓ Email support</li>
                    </>
                  )}
                  {selectedCourse === "academy_foundation" && (
                    <>
                      <li>✓ Everything in Starter</li>
                      <li>✓ 10+ skill-building exercises</li>
                      <li>✓ Video tutorials</li>
                      <li>✓ Practice assessments</li>
                      <li>✓ Certificate of Completion</li>
                    </>
                  )}
                  {selectedCourse === "academy_professional" && (
                    <>
                      <li>✓ Everything in Foundation</li>
                      <li>✓ Advanced prompt techniques</li>
                      <li>✓ Real-world project portfolio</li>
                      <li>✓ 1-on-1 coaching session</li>
                      <li>✓ Job search assistance</li>
                      <li>✓ Professional Certificate</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
