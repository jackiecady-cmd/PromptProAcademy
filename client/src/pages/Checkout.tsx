import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Lock, Loader2, Gift, PartyPopper } from "lucide-react";
import { useState, useEffect } from "react";
import { createCheckoutSession, claimFreeAnalysis, getFreeSpots } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [freeSpots, setFreeSpots] = useState<number | null>(null);
  const [claimed, setClaimed] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  useEffect(() => {
    getFreeSpots()
      .then((data) => setFreeSpots(data.remaining))
      .catch(() => setFreeSpots(0));
  }, []);

  const isFreePromo = freeSpots !== null && freeSpots > 0;

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
      if (isFreePromo) {
        const result = await claimFreeAnalysis({ email, firstName, lastName });
        if (result.success) {
          setClaimed(true);
        }
      } else {
        const result = await createCheckoutSession({
          email,
          firstName,
          lastName,
          productType: "base_analysis",
          amount: 2000,
        });
        if (result.url) {
          window.location.href = result.url;
        }
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

  if (claimed) {
    return (
      <div className="min-h-screen bg-muted/10 py-20 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4" data-testid="text-claim-success">You're In!</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Your free Base Analysis has been activated. Welcome to the first 20!
          </p>
          <p className="text-muted-foreground mb-8">
            We've sent a confirmation to <span className="font-medium text-foreground">{email}</span>. You now have lifetime access to your Base Analysis.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/dashboard")}
            data-testid="button-go-dashboard"
          >
            Go to Your Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold text-foreground" data-testid="text-checkout-title">Secure Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase to start your DNA journey.</p>
            </div>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>We'll send your report to this email address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input 
                      id="first-name" 
                      data-testid="input-first-name"
                      placeholder="Jane" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input 
                      id="last-name" 
                      data-testid="input-last-name"
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
                    data-testid="input-email"
                    placeholder="jane@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {isFreePromo && (
              <Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20">
                <CardContent className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 flex-shrink-0">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 text-lg" data-testid="text-free-promo-active">
                        First 20 Users Free — You qualify!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {freeSpots} spot{freeSpots !== 1 ? "s" : ""} remaining. No credit card needed — just enter your info above.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isFreePromo && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                  <CardDescription>You'll be securely redirected to Stripe to complete your payment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                    <div className="flex gap-2">
                      <div className="h-8 w-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                      <div className="h-8 w-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                        <div className="flex">
                          <div className="w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1 opacity-80"></div>
                        </div>
                      </div>
                      <div className="h-8 w-12 bg-black rounded flex items-center justify-center text-white text-xs font-bold">AMEX</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      We accept all major credit cards, Apple Pay, and Google Pay.
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardFooter className="flex-col gap-4 pt-6">
                <Button 
                  className={`w-full h-14 text-lg ${isFreePromo ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600" : "bg-primary hover:bg-primary/90"}`}
                  onClick={handleCheckout}
                  disabled={isLoading}
                  data-testid="button-pay"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : isFreePromo ? (
                    <>
                      <Gift className="mr-2 h-5 w-5" />
                      Claim Your Free Analysis — $0.00
                    </>
                  ) : (
                    "Continue to Payment - $20.00"
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>{isFreePromo ? "Your information is secure" : "256-bit SSL encryption • Powered by Stripe"}</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Base Analysis Package</p>
                    <p className="text-sm text-muted-foreground">Unified DNA Report + Migration Map</p>
                  </div>
                  <span className="font-bold" data-testid="text-order-price">{isFreePromo ? "$0.00" : "$20.00"}</span>
                </div>
                {isFreePromo && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 font-medium">First 20 Users Discount</span>
                    <span className="text-emerald-600 font-medium">-$20.00</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{isFreePromo ? "$0.00" : "$20.00"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold" data-testid="text-order-total">
                  <span>Total</span>
                  <span className={isFreePromo ? "text-emerald-600" : ""}>{isFreePromo ? "$0.00" : "$20.00"}</span>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2 text-primary font-medium">
                <ShieldCheck className="h-5 w-5" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <p className="text-sm text-muted-foreground">
                If you're not satisfied with your report, we offer a full refund within 30 days. No questions asked.
              </p>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-4">
                <h4 className="font-semibold text-primary mb-2">What's Included:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Data aggregation from 5+ DNA sites</li>
                  <li>✓ Unified ethnicity estimate</li>
                  <li>✓ Basic migration mapping</li>
                  <li>✓ Surname history check</li>
                  <li>✓ Expert guidance & tips</li>
                  <li>✓ Lifetime forum access</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
