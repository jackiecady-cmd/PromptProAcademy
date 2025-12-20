import { Link, useLocation } from "wouter";
import { Dna, Map, Users, CreditCard, Menu, X, Sparkles, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Dna },
    { href: "/dashboard", label: "My Report", icon: Map },
    { href: "/prompts", label: "AI Guides", icon: Sparkles, isNew: true },
    { href: "/forum", label: "Community", icon: Users },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <a className="flex items-center gap-2 font-serif text-xl font-bold text-primary hover:opacity-90 transition-opacity">
            <Dna className="h-6 w-6 text-accent" />
            <span>WhoamI</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  location === item.href
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
                {(item as any).isNew && <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 bg-accent text-white">New</Badge>}
              </a>
            </Link>
          ))}
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-white shadow-md">
            Get Started
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`flex items-center gap-2 text-lg font-medium ${
                        location === item.href ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </a>
                  </Link>
                ))}
                <Button className="w-full bg-accent hover:bg-accent/90">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
