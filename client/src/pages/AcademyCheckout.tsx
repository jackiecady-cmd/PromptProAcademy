import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Loader2, Briefcase, ArrowLeft, Gift, Sparkles, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createCheckoutSession } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function AcademyCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [freeSpots, setFreeSpots] = useState<number | null>(null);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/promo/academy-pro-free")
      .then(r => r.json())
      .then(data => setFreeSpots(data.remaining))
      .catch(() => setFreeSpots(0));
  }, []);

  const handleFreeClaim = async () => {
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
      const res = await fetch("/api/checkout/academy-pro-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Could not claim",
          description: data.error || "Something went wrong.",
          variant: "destructive",
        });
        return;
      }

      setClaimSuccess(true);
      setFreeSpots(prev => prev !== null ? Math.max(0, prev - 1) : 0);
      toast({
        title: "You're in!",
        description: "Professional course access claimed for free!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStripeCheckout = async () => {
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
        productType: "academy_professional",
        amount: 24900,
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

  if (claimSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">You're In!</h2>
            <p className="text-muted-foreground mb-6">
              Your free Professional course access has been activated. Check your email ({email}) for details.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/academy">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="btn-go-to-academy">
                  Go to Academy Dashboard
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" className="w-full">
                  Back to PromptPro Academy
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container px-4 md:px-6 max-w-5xl">
        <Link href="/learn">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to PromptPro Academy
          </Button>
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">
                <span className="text-blue-600">Prompt</span>Pro Academy — Professional
              </h1>
              <p className="text-muted-foreground">Career-ready certification with coaching and job placement</p>
            </div>

            {freeSpots !== null && freeSpots > 0 && (
              <Card className="border-2 border-green-500 bg-green-50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-800">First 5 Get It FREE</span>
                        <Badge className="bg-green-600 text-white">{freeSpots} spot{freeSpots !== 1 ? "s" : ""} left</Badge>
                      </div>
                      <p className="text-sm text-green-700">Claim your free Professional access below — no credit card needed.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {freeSpots === 0 && (
              <Card className="border border-amber-300 bg-amber-50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-sm text-amber-800">All 5 free spots have been claimed. You can still enroll at the regular price of $249 via Stripe.</p>
                  </div>
                </CardContent>
              </Card>
            )}

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
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      data-testid="input-last-name"
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
                    data-testid="input-email"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                {freeSpots !== null && freeSpots > 0 ? (
                  <>
                    <Button
                      className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
                      onClick={handleFreeClaim}
                      disabled={isLoading}
                      data-testid="btn-claim-free"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Claiming...
                        </>
                      ) : (
                        <>
                          <Gift className="mr-2 h-5 w-5" />
                          Claim Free Access — {freeSpots} Spot{freeSpots !== 1 ? "s" : ""} Left
                        </>
                      )}
                    </Button>
                    <div className="w-full flex items-center gap-3 text-muted-foreground text-sm">
                      <Separator className="flex-1" />
                      <span>or pay with Stripe</span>
                      <Separator className="flex-1" />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full h-12"
                      onClick={handleStripeCheckout}
                      disabled={isLoading}
                      data-testid="btn-stripe-checkout"
                    >
                      Enroll Now — $249.00
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
                    onClick={handleStripeCheckout}
                    disabled={isLoading}
                    data-testid="btn-stripe-checkout"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Enroll Now — $249.00"
                    )}
                  </Button>
                )}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>256-bit SSL encryption • Powered by Stripe</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-blue-50/50 border-blue-200">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Professional Course</p>
                    <p className="text-sm text-muted-foreground">Career-Ready Certification</p>
                  </div>
                  {freeSpots !== null && freeSpots > 0 ? (
                    <div className="text-right">
                      <span className="text-sm line-through text-muted-foreground">$249.00</span>
                      <span className="block font-bold text-green-600">FREE</span>
                    </div>
                  ) : (
                    <span className="font-bold">$249.00</span>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  {freeSpots !== null && freeSpots > 0 ? (
                    <span className="text-green-600">$0.00</span>
                  ) : (
                    <span>$249.00</span>
                  )}
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
                <h4 className="font-semibold text-blue-800 mb-2">What You'll Get:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Everything in Starter & Foundation</li>
                  <li>✓ Advanced prompt techniques</li>
                  <li>✓ Real-world project portfolio</li>
                  <li>✓ 1-on-1 coaching session</li>
                  <li>✓ Job search assistance</li>
                  <li>✓ Professional Certificate</li>
                  <li>✓ LinkedIn recommendation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
