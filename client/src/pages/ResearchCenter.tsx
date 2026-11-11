import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Archive,
  ArrowRight,
  Dna,
  FileText,
  MessageSquare,
  Search,
  Upload,
} from "lucide-react";

const tools = [
  {
    name: "Open Archive",
    href: "/archive",
    description: "Browse free historical records, newspapers, and heritage collections.",
    icon: Archive,
    color: "bg-[#7D0A24]",
    cta: "Enter Archive",
  },
  {
    name: "My Research",
    href: "/my-research",
    description: "Save family members, findings, and sources in your private workspace.",
    icon: FileText,
    color: "bg-amber-700",
    cta: "Open Workspace",
  },
  {
    name: "Research Guide",
    href: "/journey",
    description: "Step-by-step walkthrough with an AI assistant for records and DNA research.",
    icon: Search,
    color: "bg-[#9B1B30]",
    cta: "Start Guide",
  },
  {
    name: "DNA Tools Hub",
    href: "/dna-hub",
    description: "Jump between testing sites, calculators, and internal research tools.",
    icon: Dna,
    color: "bg-orange-700",
    cta: "Open Tools",
  },
  {
    name: "Upload DNA",
    href: "/upload-dna",
    description: "Store a raw DNA .zip from Ancestry, 23andMe, or another provider.",
    icon: Upload,
    color: "bg-teal-700",
    cta: "Upload File",
  },
  {
    name: "Community Forum",
    href: "/research/forum",
    description: "Ask questions and share discoveries with other researchers.",
    icon: MessageSquare,
    color: "bg-stone-700",
    cta: "Join Forum",
  },
];

export default function ResearchCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 to-white">
      <section className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white py-16">
        <div className="container px-4 max-w-5xl">
          <p className="text-amber-200 text-sm font-semibold uppercase tracking-wider mb-3">
            A separate project from PromptPro Academy
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <Search className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold" data-testid="text-research-center-title">
              Research Center
            </h1>
          </div>
          <p className="text-lg md:text-xl text-amber-100 max-w-3xl">
            Your workspace for family history, records, and DNA discoveries. Open Archive holds the collections; Research Center is where you save, organize, and follow the trail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/my-research">
              <Button className="bg-white text-[#7D0A24] hover:bg-amber-50" size="lg" data-testid="button-research-workspace">
                Open My Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/archive">
              <Button variant="outline" className="border-white/60 text-white hover:bg-white/15" size="lg" data-testid="button-research-to-archive">
                Browse Open Archive
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container px-4 max-w-5xl py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Card
                  className="h-full cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border-amber-100"
                  data-testid={`card-research-${tool.href.replace(/^\//, "").replace(/\//g, "-")}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`${tool.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="font-bold text-lg mb-2">{tool.name}</h2>
                    <p className="text-sm text-muted-foreground flex-1">{tool.description}</p>
                    <span className="mt-4 text-sm font-semibold text-[#7D0A24] inline-flex items-center gap-1">
                      {tool.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
