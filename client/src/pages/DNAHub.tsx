import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Upload,
  ExternalLink,
  Dna,
  TreeDeciduous,
  Globe,
  Search,
  BookOpen,
  FileText,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Users,
  Database,
  Shield,
  ScrollText,
} from "lucide-react";

const externalTools = [
  {
    name: "GEDmatch",
    url: "https://www.gedmatch.com",
    description: "Upload your raw DNA to find matches across ALL testing companies. Free admixture calculators show detailed ethnicity.",
    what: "Find cross-platform matches & run admixture calculators",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    icon: Globe,
    tag: "Free",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "DNAGenics",
    url: "https://www.dnagenics.com",
    description: "Powerful admixture calculators that reveal hidden heritage the big companies miss.",
    what: "Deep admixture analysis & hidden heritage detection",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    icon: Sparkles,
    tag: "Free",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    name: "FamilySearch",
    url: "https://www.familysearch.org",
    description: "The world's largest free genealogy site. Build your family tree and search billions of records.",
    what: "Build your family tree & search records (completely free)",
    color: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-600",
    icon: TreeDeciduous,
    tag: "Free",
    tagColor: "bg-sky-100 text-sky-700",
  },
  {
    name: "Ancestry.com",
    url: "https://www.ancestry.com/dna",
    description: "Largest DNA database with 30M+ people. Order a DNA kit or download your raw DNA if you've already tested.",
    what: "DNA testing & largest match database",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-700",
    icon: Dna,
    tag: "Paid",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "23andMe",
    url: "https://www.23andme.com",
    description: "DNA testing with health reports. Download your raw DNA data from Settings to use on other sites.",
    what: "DNA testing + health reports",
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    icon: Dna,
    tag: "Paid",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    name: "MyHeritage",
    url: "https://www.myheritage.com/dna",
    description: "Strong for European ancestry. Upload raw DNA for free to access their match database.",
    what: "European ancestry & free DNA upload",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    icon: Users,
    tag: "Free Upload",
    tagColor: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "FamilyTreeDNA",
    url: "https://www.familytreedna.com",
    description: "Upload your raw DNA for free. Great for finding distant cousins and Y-DNA/mtDNA analysis.",
    what: "Distant cousin matching & specialized DNA tests",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
    icon: Database,
    tag: "Free Upload",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    name: "LivingDNA",
    url: "https://www.livingdna.com",
    description: "Especially strong for British and African ancestry. Upload your data for another perspective.",
    what: "British & African ancestry specialization",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    icon: Globe,
    tag: "Free Upload",
    tagColor: "bg-orange-100 text-orange-700",
  },
];

const recordsSites = [
  {
    name: "Yad Vashem",
    url: "https://www.yadvashem.org/collections/database-of-names.html",
    description: "Holocaust victims database — search by surname to find connections",
    icon: ScrollText,
  },
  {
    name: "JewishGen",
    url: "https://www.jewishgen.org",
    description: "Jewish genealogy records, family finder, and community",
    icon: Search,
  },
  {
    name: "Arolsen Archives",
    url: "https://arolsen-archives.org",
    description: "Nazi persecution records — trace displaced family members",
    icon: Shield,
  },
];

const internalTools = [
  {
    name: "Upload Your Raw DNA",
    href: "/upload-dna",
    description: "Upload your .zip DNA file from any provider to our platform",
    icon: Upload,
    color: "bg-[#7D0A24]",
    primary: true,
  },
  {
    name: "DNA Journey Guide",
    href: "/journey",
    description: "Step-by-step walkthrough with AI chat assistant",
    icon: Dna,
    color: "bg-[#9B1B30]",
  },
  {
    name: "My Research",
    href: "/my-research",
    description: "Save family members, findings, and build your tree",
    icon: FileText,
    color: "bg-amber-700",
  },
  {
    name: "Heritage Book",
    href: "/my-book",
    description: "Preview and order your printed family heritage book",
    icon: BookOpen,
    color: "bg-orange-700",
  },
];

export default function DNAHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <div className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white py-10">
        <div className="container px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 rounded-full p-3">
              <Dna className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-hub-title">DNA Tools Hub</h1>
              <p className="text-amber-200 text-lg mt-1">All your DNA tools and sites in one place — jump between them easily</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 max-w-6xl py-8 space-y-10">
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-5 flex items-start gap-3" data-testid="disclaimer-external-sites">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <p className="text-sm">
            <strong className="text-red-600 text-base">WhoamI does not charge you for using any of these external tools.</strong>{" "}
            <span className="text-red-700">Some outside sites listed below are completely free (like GEDmatch and FamilySearch). Others may charge their own fees for DNA testing kits or premium features. WhoamI has no control over third-party pricing. We simply connect you to the best resources available.</span>
          </p>
        </div>

        <section data-testid="section-your-tools">
          <h2 className="text-2xl font-serif font-bold text-[#7D0A24] mb-2">Your WhoamI Tools</h2>
          <p className="text-muted-foreground mb-5">Everything on our platform — upload DNA, research, and create your book</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {internalTools.map((tool) => {
              const IconComp = tool.icon;
              return (
                <Link key={tool.name} href={tool.href}>
                  <Card className={`h-full cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${tool.primary ? 'ring-2 ring-[#7D0A24] shadow-md' : ''}`} data-testid={`card-internal-${tool.href.slice(1)}`}>
                    <CardContent className="p-5">
                      <div className={`${tool.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                        <IconComp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-base mb-1">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      {tool.primary && (
                        <div className="mt-3">
                          <span className="text-xs font-bold text-[#7D0A24] flex items-center gap-1">
                            Start Here <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section data-testid="section-dna-sites">
          <h2 className="text-2xl font-serif font-bold text-[#7D0A24] mb-2">DNA Testing & Analysis Sites</h2>
          <p className="text-muted-foreground mb-5">
            These are the external sites you'll use for DNA testing, uploading, and deep analysis. Click any card to open the site — then come back here when you're ready for the next step.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalTools.map((tool) => {
              const IconComp = tool.icon;
              return (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid={`card-external-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <Card className={`h-full cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border ${tool.color}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.color}`}>
                            <IconComp className={`h-5 w-5 ${tool.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-base flex items-center gap-2">
                              {tool.name}
                              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                            </h3>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tool.tagColor}`}>{tool.tag}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-1">{tool.what}</p>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        <section data-testid="section-records">
          <h2 className="text-2xl font-serif font-bold text-[#7D0A24] mb-2">Historical Records & Archives</h2>
          <p className="text-muted-foreground mb-5">Search these databases for documentary evidence — sometimes records reveal connections DNA can't show</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recordsSites.map((site) => {
              const IconComp = site.icon;
              return (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid={`card-records-${site.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <Card className="h-full cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 border border-gray-200">
                    <CardContent className="p-4 flex items-start gap-3">
                      <IconComp className="h-5 w-5 text-[#7D0A24] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-sm flex items-center gap-1.5">
                          {site.name}
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{site.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 text-center" data-testid="section-hub-help">
          <MessageSquare className="h-10 w-10 text-[#7D0A24] mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-[#7D0A24] mb-2">Not Sure Where to Start?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Our AI guide can walk you through every step. Just tell it what you've done so far and what you're trying to find — it'll tell you exactly where to go next.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/journey">
              <Button className="bg-[#7D0A24] hover:bg-[#6d082f] text-white px-8" data-testid="button-hub-journey">
                <Dna className="mr-2 h-4 w-4" />
                Open DNA Journey with AI Guide
              </Button>
            </Link>
            <Link href="/upload-dna">
              <Button variant="outline" className="border-[#7D0A24] text-[#7D0A24]" data-testid="button-hub-upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Raw DNA
              </Button>
            </Link>
          </div>
        </section>

        <section className="bg-white rounded-2xl border p-6" data-testid="section-quick-workflow">
          <h2 className="text-xl font-serif font-bold text-[#7D0A24] mb-4">Suggested Workflow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Upload DNA", desc: "Upload your raw .zip file from any provider", link: "/upload-dna", linkText: "Go to Upload" },
              { step: "2", title: "Run Calculators", desc: "Use GEDmatch & DNAGenics for deep analysis", link: "https://www.gedmatch.com", linkText: "Open GEDmatch", external: true },
              { step: "3", title: "Save Findings", desc: "Record what you discover in My Research", link: "/my-research", linkText: "My Research" },
              { step: "4", title: "Create Book", desc: "Turn your discoveries into a Heritage Book", link: "/my-book", linkText: "Heritage Book" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-4 rounded-xl bg-amber-50/50" data-testid={`workflow-step-${item.step}`}>
                <div className="w-10 h-10 rounded-full bg-[#7D0A24] text-white flex items-center justify-center font-bold text-lg mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                {item.external ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="text-xs">
                      {item.linkText} <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </a>
                ) : (
                  <Link href={item.link}>
                    <Button variant="outline" size="sm" className="text-xs">
                      {item.linkText} <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
