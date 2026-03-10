import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Dna, GraduationCap, BookOpen, Code2, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/abstract_dna_helix_merging_with_tree_roots.png";

const offerings = [
  {
    id: "dna",
    title: "DNA & Genealogy",
    subtitle: "100% Free",
    description: "Upload your raw DNA and discover your deepest heritage. We aggregate data from Ancestry, 23andMe, FamilyTreeDNA, and more — all in one place.",
    icon: Dna,
    href: "/dna",
    cta: "Explore DNA Tools",
    gradient: "from-emerald-500 to-teal-600",
    bgAccent: "bg-emerald-500/10",
    textAccent: "text-emerald-600",
    borderAccent: "border-emerald-500/20",
  },
  {
    id: "academy",
    title: "PromptPro Academy",
    subtitle: "Learn AI Prompting",
    description: "Master the art of prompt engineering with hands-on courses, an AI tutor, and a community forum. Level up your skills with real-world projects.",
    icon: GraduationCap,
    href: "/learn",
    cta: "Start Learning",
    gradient: "from-violet-500 to-purple-600",
    bgAccent: "bg-violet-500/10",
    textAccent: "text-violet-600",
    borderAccent: "border-violet-500/20",
  },
  {
    id: "latin",
    title: "Sacred Latin Course",
    subtitle: "Classical Language",
    description: "Explore the roots of Western civilization through Latin. Interactive lessons covering medical, legal, and ecclesiastical Latin with guided practice.",
    icon: BookOpen,
    href: "/latin",
    cta: "Begin Latin",
    gradient: "from-amber-500 to-orange-600",
    bgAccent: "bg-amber-500/10",
    textAccent: "text-amber-600",
    borderAccent: "border-amber-500/20",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="WhoamI Platform"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-background" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center gap-6 max-w-4xl">
          <div className="inline-block rounded-full bg-primary/20 px-4 py-1.5 backdrop-blur-sm border border-primary/30">
            <span className="text-sm font-medium text-primary uppercase tracking-wide" data-testid="text-tagline">
              Knowledge · Heritage · Discovery
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white drop-shadow-sm" data-testid="text-hero-title">
            Who am I?
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light" data-testid="text-hero-subtitle">
            Your platform for DNA discovery, AI mastery, and classical education — all in one place.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background" data-testid="section-offerings">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-offerings-heading">
              Explore Our Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three powerful tools designed to help you learn, discover, and grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offerings.map((offering) => (
              <OfferingCard key={offering.id} offering={offering} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30" data-testid="section-vibe-coding">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4" data-testid="text-vibe-coding-title">
              Vibe Coding
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A new way to build software through natural conversation. Describe what you want, and watch it come to life. Powered by AI, guided by your creativity.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Code2 className="h-8 w-8 text-primary/60" />
              <span className="text-muted-foreground text-sm">Stay tuned for updates</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OfferingCard({ offering }: { offering: typeof offerings[0] }) {
  const Icon = offering.icon;

  return (
    <div
      className={`group relative bg-card rounded-2xl shadow-sm border ${offering.borderAccent} hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col`}
      data-testid={`card-offering-${offering.id}`}
    >
      <div className={`h-2 bg-gradient-to-r ${offering.gradient}`} />
      <div className="p-8 flex flex-col flex-1">
        <div className={`h-14 w-14 rounded-xl ${offering.bgAccent} flex items-center justify-center mb-6`}>
          <Icon className={`h-7 w-7 ${offering.textAccent}`} />
        </div>
        <div className="mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${offering.textAccent}`} data-testid={`text-subtitle-${offering.id}`}>
            {offering.subtitle}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3" data-testid={`text-title-${offering.id}`}>
          {offering.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
          {offering.description}
        </p>
        <Link href={offering.href}>
          <Button
            className={`w-full bg-gradient-to-r ${offering.gradient} text-white hover:opacity-90 transition-opacity`}
            size="lg"
            data-testid={`button-cta-${offering.id}`}
          >
            {offering.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
