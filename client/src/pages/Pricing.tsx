import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Choose Your Depth of Discovery</h1>
          <p className="text-xl text-muted-foreground">
            We offer a comprehensive base analysis with optional deep-dives into specific areas of your heritage.
            Pay only for what you want to know.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Base Plan */}
          <Card className="border-2 border-primary shadow-xl scale-105 z-10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Base Analysis</CardTitle>
              <CardDescription>The essential starting point for everyone.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-muted-foreground"> / one-time</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <CheckItem text="Data Aggregation from 5+ Sites" />
                <CheckItem text="Unified Ethnicity Estimate" />
                <CheckItem text="Basic Migration Mapping" />
                <CheckItem text="Surname History Check" />
                <CheckItem text="Expert Guidance & Tips" />
                <CheckItem text="Forum Access" />
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/checkout" className="w-full">
                <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Add-ons */}
          <Card className="bg-muted/10 border-dashed">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Deep Heritage</CardTitle>
              <CardDescription>Specialized reports for specific interests.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$5-15</span>
                <span className="text-muted-foreground"> / per report</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm font-medium mb-2">Available Plugins:</p>
                <div className="p-3 bg-background rounded-lg border flex justify-between items-center">
                  <span>Royal Blood Check</span>
                  <span className="font-bold">$10</span>
                </div>
                <div className="p-3 bg-background rounded-lg border flex justify-between items-center">
                  <span>Holocaust Survivor Search</span>
                  <span className="font-bold">$15</span>
                </div>
                <div className="p-3 bg-background rounded-lg border flex justify-between items-center">
                  <span>Native Tribe Trace</span>
                  <span className="font-bold">$15</span>
                </div>
                <div className="p-3 bg-background rounded-lg border flex justify-between items-center">
                  <span>Ancient DNA Match</span>
                  <span className="font-bold">$5</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full h-12">Select in Dashboard</Button>
            </CardFooter>
          </Card>

          {/* Consultation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Expert Consultation</CardTitle>
              <CardDescription>1-on-1 guidance with me using AI tools.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-muted-foreground"> / hour</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <CheckItem text="Personal Video Call" />
                <CheckItem text="AI-Assisted Research" />
                <CheckItem text="Complex Tree Breaking" />
                <CheckItem text="Custom Research Plan" />
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full h-12">Book a Session</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Heritage Book Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardContent className="py-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-40 bg-gradient-to-br from-primary to-accent rounded-lg shadow-xl flex items-center justify-center text-white">
                    <div className="text-center p-4">
                      <div className="text-2xl font-serif font-bold">Your</div>
                      <div className="text-sm">Family</div>
                      <div className="text-2xl font-serif font-bold">Story</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-serif font-bold mb-2">Heritage Book</h3>
                  <p className="text-muted-foreground mb-4">
                    Transform your DNA journey into a beautiful printed keepsake. Perfect as a gift for family members 
                    who crave connection to their roots. Includes your complete analysis, migration maps, family tree, 
                    and historical context—all professionally bound.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div>
                      <span className="text-3xl font-bold">$99</span>
                      <span className="text-muted-foreground"> starting</span>
                    </div>
                    <Button className="bg-accent hover:bg-accent/90 text-white">
                      Learn More About Heritage Books
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
        <Check className="h-3 w-3" />
      </div>
      <span className="text-muted-foreground">{text}</span>
    </li>
  );
}
