import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Lock, Loader2, Gift, PartyPopper } from "lucide-react";
import { useState } from "react";
import { claimFreeAnalysis } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

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
      const result = await claimFreeAnalysis({ email, firstName, lastName });
      if (result.success) {
        setClaimed(true);
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
            Your free Base Analysis has been activated. Welcome!
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
          
          <div className="md:col-span-2 space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold text-foreground" data-testid="text-checkout-title">Get Your Free Analysis</h1>
              <p className="text-muted-foreground">Enter your info to start your DNA journey — completely free.</p>
            </div>

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

            <Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 flex-shrink-0">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 text-lg" data-testid="text-free-analysis">
                      DNA Analysis is Free!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      No credit card needed — just enter your info above to get started.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardFooter className="flex-col gap-4 pt-6">
                <Button 
                  className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  onClick={handleCheckout}
                  disabled={isLoading}
                  data-testid="button-pay"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Gift className="mr-2 h-5 w-5" />
                      Claim Your Free Analysis — $0.00
                    </>
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Your information is secure</span>
                </div>
              </CardFooter>
            </Card>
          </div>

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
                  <span className="font-bold text-emerald-600" data-testid="text-order-price">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold" data-testid="text-order-total">
                  <span>Total</span>
                  <span className="text-emerald-600">$0.00</span>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2 text-primary font-medium">
                <ShieldCheck className="h-5 w-5" />
                <span>100% Free — No Catches</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your DNA analysis is completely free. No credit card, no hidden fees.
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
