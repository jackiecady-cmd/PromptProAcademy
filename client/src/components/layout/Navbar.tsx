import { Link, useLocation } from "wouter";
import { Dna, GraduationCap, BookOpen, Menu, ChevronDown, LogIn, LogOut, User, Code, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(() => {
    return sessionStorage.getItem("vibe-coding-banner-dismissed") !== "true";
  });
  const { user, isLoading, isAuthenticated } = useAuth();

  const businesses = [
    {
      name: "DNA",
      fullName: "DNA & Genealogy",
      icon: Dna,
      color: "text-[#8B1538]",
      bgColor: "bg-[#8B1538]",
      links: [
        { href: "/dna", label: "DNA Home" },
        { href: "/dna-hub", label: "DNA Tools Hub" },
        { href: "/upload-dna", label: "Upload DNA" },
        { href: "/journey", label: "DNA Journey" },
        { href: "/my-research", label: "My Research" },
        { href: "/my-book", label: "Heritage Book" },
        { href: "/pricing", label: "Pricing" },
      ],
    },
    {
      name: "PromptPro",
      fullName: "PromptPro Academy",
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
      name: "Latin",
      fullName: "Sacred Latin",
      icon: BookOpen,
      color: "text-purple-700",
      bgColor: "bg-purple-700",
      links: [
        { href: "/latin", label: "Latin Course" },
      ],
    },
  ];

  const handleNavClick = (href: string) => {
    setLocation(href);
  };

  return (
    <>
    {showBanner && (
      <div className="relative z-50 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 text-white" data-testid="banner-vibe-coding">
        <div className="container flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium">
          <Sparkles className="h-4 w-4 animate-pulse shrink-0" />
          <span className="flex items-center gap-2 flex-wrap justify-center">
            <Code className="h-4 w-4 shrink-0" />
            <span className="font-bold">Vibe Coding</span> — Coming Soon!
            <span className="hidden sm:inline text-white/80">Learn to build apps with AI, no coding experience needed.</span>
          </span>
          <Sparkles className="h-4 w-4 animate-pulse shrink-0" />
          <button
            onClick={() => { sessionStorage.setItem("vibe-coding-banner-dismissed", "true"); setShowBanner(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss announcement"
            data-testid="btn-dismiss-banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )}
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top bar with business tabs */}
      <div className="border-b bg-gray-50">
        <div className="container flex items-center justify-center gap-1 px-4 py-2 overflow-x-auto">
          {businesses.map((business) => {
            const IconComponent = business.icon;
            const isActive = business.links.some(link => location === link.href);
            return (
              <DropdownMenu key={business.name}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all ${
                      isActive 
                        ? `${business.bgColor} text-white hover:opacity-90` 
                        : `${business.color} hover:bg-gray-200`
                    }`}
                    data-testid={`tab-${business.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs font-semibold whitespace-nowrap">{business.name}</span>
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
        </div>
      </div>
      
      {/* Main nav bar */}
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link 
          href="/"
          className="flex items-center gap-2 font-serif text-xl font-bold text-[#8B1538] hover:opacity-90 transition-opacity"
          data-testid="link-home-logo"
        >
          <Dna className="h-6 w-6 text-orange-500" />
          <span>WhoamI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact">
            <Button 
              variant="outline" 
              size="sm"
              data-testid="link-contact"
            >
              Contact
            </Button>
          </Link>
          
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2" data-testid="button-user-menu">
                  {user.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-sm">{user.firstName || 'Account'}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-muted-foreground text-sm">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => window.location.href = '/api/logout'}
                  className="cursor-pointer text-red-600"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => window.location.href = '/api/login'}
              size="sm"
              className="bg-[#8B1538] hover:bg-[#6d102c]"
              data-testid="button-login"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Button>
          )}
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
                        {business.fullName}
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
                
                {isAuthenticated && user ? (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-3 mb-3">
                      {user.profileImageUrl ? (
                        <img src={user.profileImageUrl} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => window.location.href = '/api/logout'}
                      className="w-full" 
                      variant="outline"
                      data-testid="mobile-button-logout"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => window.location.href = '/api/login'}
                    className="w-full bg-[#8B1538] hover:bg-[#6d102c]"
                    data-testid="mobile-button-login"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Log In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
    </>
  );
}
