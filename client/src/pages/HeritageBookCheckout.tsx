import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Lock, Loader2, BookOpen, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const bookOptions = [
  {
    id: "heritage_book_standard",
    name: "Standard Edition",
    price: 99,
    priceInCents: 9900,
    description: "Softcover, 50+ pages, full color",
    pages: "50+",
  },
  {
    id: "heritage_book_deluxe",
    name: "Deluxe Edition",
    price: 149,
    priceInCents: 14900,
    description: "Hardcover, 100+ pages, premium paper",
    pages: "100+",
    popular: true,
  },
  {
    id: "heritage_book_legacy",
    name: "Legacy Edition",
    price: 249,
    priceInCents: 24900,
    description: "Leather-bound, 150+ pages, archival quality",
    pages: "150+",
  },
];

export default function HeritageBookCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState("heritage_book_deluxe");
  const [familyDetails, setFamilyDetails] = useState("");
  const { toast } = useToast();

  const book = bookOptions.find(b => b.id === selectedBook)!;

  const handleCheckout = async () => {
    if (!firstName || !lastName || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
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
        productType: selectedBook,
        amount: book.priceInCents,
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
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container px-4 md:px-6 max-w-5xl">
        <Link href="/pricing">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Pricing
          </Button>
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-serif font-bold text-foreground">Order Your Heritage Book</h1>
              <p className="text-muted-foreground">A beautiful printed keepsake of your family story</p>
            </div>

            {/* Book Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Edition</CardTitle>
                <CardDescription>Select the book style that fits your family story</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedBook} onValueChange={setSelectedBook} className="space-y-4">
                  {bookOptions.map((b) => (
                    <div
                      key={b.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedBook === b.id 
                          ? 'border-accent bg-accent/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedBook(b.id)}
                    >
                      <RadioGroupItem value={b.id} id={b.id} />
                      <div className="w-12 h-16 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center text-white">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={b.id} className="font-bold cursor-pointer">{b.name}</Label>
                          {b.popular && (
                            <span className="text-xs bg-accent text-white px-2 py-0.5 rounded">Recommended</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{b.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold">${b.price}</span>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>We'll contact you to gather your family details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name *</Label>
                    <Input 
                      id="first-name" 
                      placeholder="Jane" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name *</Label>
                    <Input 
                      id="last-name" 
                      placeholder="Doe" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="jane@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Tell us about your family (optional)</Label>
                  <Textarea 
                    id="details"
                    placeholder="Share any details you'd like included - family names, locations, special stories, photos you want to feature..."
                    value={familyDetails}
                    onChange={(e) => setFamilyDetails(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button 
                  className="w-full h-14 text-lg bg-accent hover:bg-accent/90"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Order Now - $${book.price}.00`
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
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Heritage Book</p>
                    <p className="text-sm text-muted-foreground">{book.name}</p>
                  </div>
                  <span className="font-bold">${book.price}.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${book.price}.00</span>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border bg-background p-4 space-y-3">
              <div className="flex items-center gap-2 text-primary font-medium">
                <ShieldCheck className="h-5 w-5" />
                <span>Quality Guaranteed</span>
              </div>
              <p className="text-sm text-muted-foreground">
                If you're not happy with your book, we'll work with you to make it right or provide a full refund.
              </p>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="py-4">
                <h4 className="font-semibold text-primary mb-2">What's Included:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>✓ Your complete DNA analysis</li>
                  <li>✓ Ancestral migration maps</li>
                  <li>✓ Family tree visualization</li>
                  <li>✓ Historical context & stories</li>
                  <li>✓ Your photos (if provided)</li>
                  <li>✓ Professional design & layout</li>
                  <li>✓ Free shipping in the US</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="py-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>How it works:</strong>
                </p>
                <ol className="text-sm text-muted-foreground text-left space-y-1">
                  <li>1. Complete your order</li>
                  <li>2. We gather your family details</li>
                  <li>3. Our team designs your book</li>
                  <li>4. You approve the final design</li>
                  <li>5. Book ships to your door!</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
