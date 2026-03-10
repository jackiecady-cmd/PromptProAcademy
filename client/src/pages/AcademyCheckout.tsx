import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, Loader2, Briefcase, GraduationCap, ArrowLeft, Gift, Sparkles, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createCheckoutSession } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearch } from "wouter";

const tierConfig: Record<string, {
  name: string;
  subtitle: string;
  price: number;
  priceInCents: number;
  productType: string;
  freeProductType: string;
  freeApiCheck: string;
  freeApiClaim: string;
  icon: typeof Briefcase;
  includes: string[];
}> = {
  foundation: {
    name: "Foundation",
    subtitle: "Prompt Engineering Basics",
    price: 35,
    priceInCents: 3500,
    productType: "academy_foundation",
    freeProductType: "academy_foundation_free",
    freeApiCheck: "/api/promo/academy-foundation-free",
    freeApiClaim: "/api/checkout/academy-foundation-free",
    icon: GraduationCap,
    includes: [
      "10 guided AI lessons with quizzes",
      "Role assignment & chain prompting",
      "Fact-checking & verification skills",
      "AI writing partnership techniques",
      "Job-ready portfolio skills",
      "Certificate of Completion",
    ],
  },
  professional: {
    name: "Professional",
    subtitle: "Career-Ready Certification",
    price: 75,
    priceInCents: 7500,
    productType: "academy_professional",
    freeProductType: "academy_professional_free",
    freeApiCheck: "/api/promo/academy-pro-free",
    freeApiClaim: "/api/checkout/academy-pro-free",
    icon: Briefcase,
    includes: [
      "Everything in Foundation",
      "Advanced prompt techniques",
      "Real-world project portfolio",
      "1-on-1 coaching session",
      "Job search assistance",
      "Professional Certificate",
      "LinkedIn recommendation",
    ],
  },
  bundle: {
    name: "Bundle Deal",
    subtitle: "Foundation + Professional",
    price: 60,
    priceInCents: 6000,
    productType: "academy_bundle",
    freeProductType: "",
    freeApiCheck: "",
    freeApiClaim: "",
    icon: GraduationCap,
    includes: [
      "Everything in Foundation",
      "Everything in Professional",
      "Save $50 vs buying separately",
      "Full career-ready certification path",
      "1-on-1 coaching session",
      "Job search assistance",
      "LinkedIn recommendation",
    ],
  },
};

export default function AcademyCheckout() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const tierParam = params.get("tier") || "foundation";
  const tier = tierConfig[tierParam] || tierConfig.foundation;

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [freeSpots, setFreeSpots] = useState<number | null>(null);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (tier.freeApiCheck) {
      fetch(tier.freeApiCheck)
        .then(r => r.json())
        .then(data => setFreeSpots(data.remaining))
        .catch(() => setFreeSpots(0));
    } else {
      setFreeSpots(0);
    }
  }, [tier.freeApiCheck]);

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
      const res = await fetch(tier.freeApiClaim, {
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
        description: `${tier.name} course access claimed for free!`,
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
        productType: tier.productType,
        amount: tier.priceInCents,
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
            <h2 className="text-2xl font-bold mb-2" data-testid="text-claim-success">You're In!</h2>
            <p className="text-muted-foreground mb-6">
              Your free {tier.name} course access has been activated. Check your email ({email}) for details.
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

  const Icon = tier.icon;

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
                <span className="text-blue-600">Prompt</span>Pro Academy — {tier.name}
              </h1>
              <p className="text-muted-foreground">{tier.subtitle}</p>
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
                        <span className="font-bold text-green-800" data-testid="text-free-banner">First 5 Get It FREE</span>
                        <Badge className="bg-green-600 text-white" data-testid="badge-free-spots">{freeSpots} spot{freeSpots !== 1 ? "s" : ""} left</Badge>
                      </div>
                      <p className="text-sm text-green-700">Claim your free {tier.name} access below — no credit card needed.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {freeSpots === 0 && tier.freeApiCheck && (
              <Card className="border border-amber-300 bg-amber-50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-sm text-amber-800">All 5 free spots have been claimed. You can still enroll at ${tier.price} via Stripe.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {tierParam === 'bundle' && (
              <Card className="border-2 border-purple-300 bg-purple-50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-purple-600 shrink-0" />
                    <p className="text-sm text-purple-800 font-medium">Bundle & Save — Get both Foundation + Professional for just $60 (save $50 vs buying separately).</p>
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
                      Enroll Now — ${tier.price}.00
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
                      `Enroll Now — $${tier.price}.00`
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
                    <p className="font-medium">{tier.name} Course</p>
                    <p className="text-sm text-muted-foreground">{tier.subtitle}</p>
                  </div>
                  {freeSpots !== null && freeSpots > 0 ? (
                    <div className="text-right">
                      <span className="text-sm line-through text-muted-foreground">${tier.price}.00</span>
                      <span className="block font-bold text-green-600" data-testid="text-price-free">FREE</span>
                    </div>
                  ) : (
                    <span className="font-bold" data-testid="text-price">${tier.price}.00</span>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  {freeSpots !== null && freeSpots > 0 ? (
                    <span className="text-green-600" data-testid="text-total-free">$0.00</span>
                  ) : (
                    <span data-testid="text-total">${tier.price}.00</span>
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
                  {tier.includes.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
