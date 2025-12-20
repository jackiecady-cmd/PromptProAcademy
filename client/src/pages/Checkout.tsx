import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold text-foreground">Secure Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase to start your DNA journey.</p>
            </div>

            {/* Express Checkout */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Express Checkout</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="h-12 bg-[#FFC439] hover:bg-[#FFC439]/90 border-none text-black font-bold">
                  PayPal
                </Button>
                <Button variant="outline" className="h-12 bg-black hover:bg-black/90 text-white font-medium">
                   Pay
                </Button>
                <Button variant="outline" className="h-12 bg-[#5A31F4] hover:bg-[#5A31F4]/90 text-white font-medium">
                  Shop Pay
                </Button>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-muted/10 px-2 text-muted-foreground">Or pay with card</span>
              </div>
            </div>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} className="grid gap-4">
                  <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>Credit / Debit Card</span>
                      </div>
                      <div className="flex gap-1">
                        {/* Visa/Mastercard placeholders */}
                        <div className="h-5 w-8 bg-muted rounded"></div>
                        <div className="h-5 w-8 bg-muted rounded"></div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                    <RadioGroupItem value="paypal-standard" id="paypal-standard" />
                    <Label htmlFor="paypal-standard" className="cursor-pointer">PayPal Standard</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card number</Label>
                      <Input id="card-number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                  Pay $20.00
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Payments processed securely by Stripe</span>
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
                  <span className="font-bold">$20.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$20.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>$20.00</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
