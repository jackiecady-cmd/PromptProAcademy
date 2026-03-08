import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Dna, Globe, ShieldCheck, Database, Users, Gift } from "lucide-react";
import heroImage from "@assets/generated_images/abstract_dna_helix_merging_with_tree_roots.png";
import mapImage from "@assets/generated_images/stylized_world_migration_map.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="DNA Helix and Tree Roots" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-start gap-6 max-w-5xl">
          <div className="inline-block rounded-full bg-accent/20 px-4 py-1.5 backdrop-blur-sm border border-accent/30">
            <span className="text-sm font-medium text-accent-foreground uppercase tracking-wide">
              The Ultimate DNA Aggregator
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground max-w-3xl drop-shadow-sm">
            Who am I? <br/>
            <span className="text-primary">Find Your Answer.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
            We combine data from Ancestry, 23andMe, FamilyTreeDNA, and more to give you the deepest possible analysis of your heritage—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/pricing">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-8 h-14">
                Start Analysis - $20
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" data-testid="button-first-20-free" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 text-lg px-8 h-14 shadow-lg shadow-emerald-500/30 animate-pulse hover:animate-none">
                <Gift className="mr-2 h-5 w-5" />
                First 20 Users Free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm hover:bg-background/80 text-lg h-14">
                View Sample Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Complete Genetic Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't settle for one perspective. We aggregate data from the world's leading DNA databases to build your complete family story.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Database}
              title="Multi-Source Analysis"
              description="We process your raw DNA data through calculators on DNAgenics, GEDmatch, and more to compare results across platforms."
            />
            <FeatureCard 
              icon={Globe}
              title="Migration Mapping"
              description="Visualize your ancestors' journey with high-fidelity migration maps, connecting surnames to DNA time periods."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Deep Heritage Trace"
              description="Find connections to Holocaust survivors, Middle Eastern tribes, European royalty, and Native American clans."
            />
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img 
                src={mapImage} 
                alt="Migration Map Interface" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md p-4 rounded-lg border shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Active Filter</p>
                    <p className="font-serif font-medium text-primary">Migration Period: 1700-1850</p>
                  </div>
                  <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[70%]" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                See Where You Come From. <br/>
                <span className="text-primary italic">Literally.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our advanced mapping engine combines surname history with genetic markers to show you exactly where your ancestors lived and moved.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Interactive Migration Timelines</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Haplogroup Distribution Maps</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Tribe & Clan Territory Overlays</span>
                </li>
              </ul>
              <Link href="/dashboard">
                <Button className="mt-4" size="lg" variant="outline">Explore The Map</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Callout */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <Users className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join The Conversation</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Connect with others, share discoveries, and get tips on interpreting your results in our active community forum.
          </p>
          <Link href="/forum">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 border-none font-bold">
              Visit The Forum
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-card p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
