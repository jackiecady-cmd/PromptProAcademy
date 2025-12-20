import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary">Ancestral Link</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unifying your DNA journey. We integrate data from top providers to give you the most comprehensive family history analysis available.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/pricing">Base Analysis ($20)</Link></li>
              <li><Link href="/pricing">Royal Lineage Check</Link></li>
              <li><Link href="/pricing">Tribe & Clan Trace</Link></li>
              <li><Link href="/pricing">Holocaust Survivor Search</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/forum">Community Forum</Link></li>
              <li><a href="#" className="hover:text-primary">DNA Calculators Guide</a></li>
              <li><a href="#" className="hover:text-primary">Understanding Haplogroups</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Partners & Sources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>FamilyTreeDNA</li>
              <li>Ancestry.com</li>
              <li>23andMe</li>
              <li>MyTrueAncestry</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Ancestral Link. All rights reserved. Not affiliated directly with referenced DNA providers.</p>
        </div>
      </div>
    </footer>
  );
}
