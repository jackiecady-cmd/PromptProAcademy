import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Dna, Globe, ShieldCheck, Database, Users, Gift, HelpCircle, ChevronDown, MessageSquare, Calculator, Search, Upload } from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/generated_images/abstract_dna_helix_merging_with_tree_roots.png";
import mapImage from "@assets/generated_images/stylized_world_migration_map.png";

const faqItems = [
  {
    question: "I can't find all my missing relatives. Where else can I look?",
    answer: `If you've tested with one company but haven't found everyone, try uploading your raw DNA to multiple free sites — each one has different people in their database:

• **GEDmatch.com** (free) — People from ALL DNA companies upload here. This is the #1 place to find missing matches across Ancestry, 23andMe, and MyHeritage.
• **FamilyTreeDNA.com** (free transfer) — Upload your raw DNA file to access their database of millions.
• **MyHeritage.com** (free upload) — Another large database, especially strong for European ancestry.
• **FamilySearch.org** (free) — Not DNA-based, but has billions of genealogy records that can help you find relatives by name and documents.
• **LivingDNA.com** — Good for British and African ancestry in particular.

**Pro tip:** Use the AI Help Chat on your DNA Journey page! Just ask something like: "I tested with Ancestry but can't find my grandmother's side of the family. What should I try?" — the AI can suggest specific strategies based on your situation.`,
    icon: Search,
  },
  {
    question: "How do I use the DNA admixture calculators in the app?",
    answer: `Our DNA Journey (Step 4: Analyze & Discover) walks you through using powerful admixture calculators that reveal your deep ancestry. Here's how:

1. **Go to your DNA Journey** — Click "DNA & Genealogy" in the menu, then "DNA Journey"
2. **Navigate to Step 4** — Click the "Analyze & Discover" step
3. **Follow the instructions** to upload your raw DNA .zip file to **DNAGenics.com** and **GEDmatch.com** — both have free admixture calculators
4. **Ask the AI Chat** which calculators to try — type something like: "I think I might have Jewish/African/Native American ancestry. Which admixture calculators should I run?"

The calculators analyze every segment of your chromosomes and can reveal heritage that the big companies miss — like specific Middle Eastern, African, or indigenous connections.`,
    icon: Calculator,
  },
  {
    question: "What is 'raw DNA' and how do I download it?",
    answer: `"Raw DNA" is the actual data file from your DNA test. It's a file (usually a .zip) that contains your genetic information in a format that other websites can read.

**To download from Ancestry.com:**
1. Log in → Click "DNA" → Click "Settings"
2. Scroll to "Download your DNA" → Click the button
3. Save the .zip file — don't open it!

**To download from 23andMe:**
1. Log in → Click your name → "Settings"
2. Scroll to "Download your raw data"
3. Save the .zip file

Once you have this file, go to the **Upload DNA** page on our platform and upload it directly — it's the easiest way to get started. You can also use it on sites like GEDmatch and DNAGenics for deeper analysis.`,
    icon: Upload,
  },
  {
    question: "Can the AI chatbot help me interpret my DNA results?",
    answer: `Yes! Our AI research guide is specifically trained to help you understand DNA results and genealogy research. You can find it on the DNA Journey page.

**Great questions to ask the AI:**
• "I got my ethnicity results and it shows 15% Ashkenazi Jewish — what does that mean for my family?"
• "I found a DNA match with the surname Cohen. How are we likely related?"
• "My admixture calculator shows 8% West African but my family is white-passing. What could this mean?"
• "Help me understand what haplogroups are and what mine tells me"
• "I think my grandmother hid part of our heritage. How can I use DNA to find out?"

The AI remembers your conversation, so share details and it can connect dots you might miss. The better your prompts, the better the discoveries!`,
    icon: MessageSquare,
  },
  {
    question: "What if my DNA doesn't show heritage I expected?",
    answer: `This is more common than you'd think! DNA results don't always show everything. Here's why:

• **DNA is random** — You only inherit about 50% from each parent. Some heritage can "skip" in the DNA you received.
• **Female-line ancestry** may not show the same way in ethnicity estimates.
• **Small percentages** (under 5%) can disappear in a few generations.
• **Documentary evidence is just as powerful** — If your family records show a connection, that's real even if DNA doesn't reflect it.

**What to do:** Look at your DNA matches instead of just the ethnicity pie chart. If a relative with the same surname shows the heritage, that confirms YOUR connection too. Also, try the admixture calculators on DNAGenics — they often catch things the big companies miss.`,
    icon: HelpCircle,
  },
];

export default function DNALanding() {
  return (
    <div className="flex flex-col min-h-screen">
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
            <Link href="/upload-dna">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-8 h-14" data-testid="button-hero-upload-dna">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your Raw DNA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" data-testid="button-free-analysis" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 text-lg px-8 h-14 shadow-lg shadow-emerald-500/30">
                <Gift className="mr-2 h-5 w-5" />
                Free DNA Analysis
              </Button>
            </Link>
            <Link href="/dna-hub">
              <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm hover:bg-background/80 text-lg h-14" data-testid="button-hero-hub">
                <Globe className="mr-2 h-5 w-5" />
                DNA Tools Hub
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

      <section className="py-24 bg-background" data-testid="section-faq">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <HelpCircle className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Common questions about DNA research, our tools, and getting the most from your results.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <FAQItem key={index} item={item} index={index} />
            ))}
          </div>

          <div className="text-center mt-10 p-6 bg-muted/30 rounded-xl border">
            <p className="text-muted-foreground mb-4">
              Still have questions? Our AI research guide can help with your specific situation.
            </p>
            <Link href="/journey">
              <Button className="bg-primary hover:bg-primary/90" data-testid="button-faq-ask-ai">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask the AI Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

function FAQItem({ item, index }: { item: typeof faqItems[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div
      className="border rounded-xl overflow-hidden bg-card hover:shadow-sm transition-shadow"
      data-testid={`faq-item-${index}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 text-left"
        data-testid={`faq-toggle-${index}`}
      >
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="flex-1 font-medium text-foreground text-lg">{item.question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5" data-testid={`faq-answer-${index}`}>
          <div className="pl-14 border-t pt-4">
            <div
              className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm"
              dangerouslySetInnerHTML={{
                __html: item.answer
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                  .replace(/\n/g, '<br/>')
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
