import { Link, useLocation } from "wouter";
import { Dna, GraduationCap, BookOpen, Menu, ChevronDown, Code, PenTool } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const businesses = [
    {
      name: "DNA & Genealogy",
      icon: Dna,
      color: "text-[#8B1538]",
      bgColor: "bg-[#8B1538]",
      links: [
        { href: "/", label: "Home" },
        { href: "/journey", label: "DNA Journey" },
        { href: "/my-research", label: "My Research" },
        { href: "/my-book", label: "Heritage Book" },
        { href: "/pricing", label: "Pricing" },
      ],
    },
    {
      name: "PromptPro Academy",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-600",
      links: [
        { href: "/academy", label: "Academy Home" },
        { href: "/learn", label: "Lessons" },
        { href: "/academy/tutor", label: "AI Tutor" },
        { href: "/prompts", label: "Prompt Library" },
        { href: "/academy/forum", label: "Community" },
      ],
    },
    {
      name: "Sacred Latin",
      icon: BookOpen,
      color: "text-purple-700",
      bgColor: "bg-purple-700",
      links: [
        { href: "/latin", label: "Latin Course" },
      ],
    },
    {
      name: "Vibe Code",
      icon: Code,
      color: "text-pink-600",
      bgColor: "bg-pink-600",
      links: [
        { href: "/vibe-code", label: "Academy Home" },
        { href: "/vibe-code/curriculum", label: "Curriculum" },
        { href: "/vibe-code/tutor", label: "AI Tutor" },
        { href: "/vibe-code/enroll", label: "Enroll Now" },
      ],
    },
    {
      name: "My Side",
      icon: PenTool,
      color: "text-amber-600",
      bgColor: "bg-amber-600",
      links: [
        { href: "/my-side", label: "Home" },
        { href: "/my-side/archetypes", label: "Archetypes" },
        { href: "/my-side/stories", label: "Read Stories" },
        { href: "/my-side/write", label: "Write Your Story" },
        { href: "/my-side/subscribe", label: "Subscribe" },
      ],
    },
  ];

  const handleNavClick = (href: string) => {
    setLocation(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link 
          href="/"
          className="flex items-center gap-2 font-serif text-xl font-bold text-[#8B1538] hover:opacity-90 transition-opacity"
          data-testid="link-home-logo"
        >
          <Dna className="h-6 w-6 text-orange-500" />
          <span>WhoamI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {businesses.map((business) => {
            const IconComponent = business.icon;
            return (
              <DropdownMenu key={business.name}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center gap-1 ${business.color} hover:bg-gray-100`}
                    data-testid={`dropdown-${business.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm font-medium">{business.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {business.links.map((link) => (
                    <DropdownMenuItem 
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`cursor-pointer ${location === link.href ? 'font-bold' : ''}`}
                      data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
          <Link href="/contact">
            <Button 
              variant="outline" 
              size="sm"
              data-testid="link-contact"
            >
              Contact
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                {businesses.map((business) => {
                  const IconComponent = business.icon;
                  return (
                    <div key={business.name} className="space-y-2">
                      <div className={`flex items-center gap-2 ${business.color} font-semibold text-lg border-b pb-2`}>
                        <IconComponent className="h-5 w-5" />
                        {business.name}
                      </div>
                      <div className="pl-4 space-y-2">
                        {business.links.map((link) => (
                          <Link 
                            key={link.href} 
                            href={link.href}
                            className={`block text-base ${
                              location === link.href ? business.color + " font-medium" : "text-muted-foreground"
                            }`}
                            onClick={() => setIsOpen(false)}
                            data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" variant="outline" data-testid="mobile-link-contact">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
