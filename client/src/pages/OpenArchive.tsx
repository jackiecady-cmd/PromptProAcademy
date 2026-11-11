import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useMemo, useState } from "react";
import {
  Archive,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Globe,
  Landmark,
  Library,
  ScrollText,
  Search,
  Shield,
} from "lucide-react";

const collections = [
  {
    name: "FamilySearch",
    url: "https://www.familysearch.org",
    description: "The world's largest free genealogy archive — family trees, census, birth, marriage, and death records.",
    category: "Genealogy",
    icon: BookOpen,
  },
  {
    name: "Internet Archive",
    url: "https://archive.org",
    description: "Public-domain books, newspapers, maps, and historical media you can read and download.",
    category: "Libraries",
    icon: Archive,
  },
  {
    name: "Library of Congress",
    url: "https://www.loc.gov",
    description: "U.S. manuscripts, photographs, newspapers, and chronicles of American life.",
    category: "Libraries",
    icon: Library,
  },
  {
    name: "National Archives (NARA)",
    url: "https://www.archives.gov",
    description: "Federal records, military files, passenger lists, and naturalization documents.",
    category: "Records",
    icon: Landmark,
  },
  {
    name: "Chronicling America",
    url: "https://chroniclingamerica.loc.gov",
    description: "Search historic U.S. newspapers by name, place, and date.",
    category: "Records",
    icon: ScrollText,
  },
  {
    name: "Yad Vashem",
    url: "https://www.yadvashem.org/collections/database-of-names.html",
    description: "Holocaust victims database — search by surname to find family connections.",
    category: "Heritage",
    icon: ScrollText,
  },
  {
    name: "JewishGen",
    url: "https://www.jewishgen.org",
    description: "Jewish genealogy records, family finder, and community archives.",
    category: "Heritage",
    icon: Search,
  },
  {
    name: "Arolsen Archives",
    url: "https://arolsen-archives.org",
    description: "Nazi persecution records — trace displaced family members and survivors.",
    category: "Heritage",
    icon: Shield,
  },
  {
    name: "Find a Grave",
    url: "https://www.findagrave.com",
    description: "Cemetery records, memorials, and family links contributed by volunteers worldwide.",
    category: "Genealogy",
    icon: Landmark,
  },
  {
    name: "Digital Public Library of America",
    url: "https://dp.la",
    description: "Photographs, documents, and local-history collections from libraries across the U.S.",
    category: "Libraries",
    icon: Library,
  },
  {
    name: "Europeana",
    url: "https://www.europeana.eu",
    description: "Art, manuscripts, and cultural heritage from museums and archives across Europe.",
    category: "Libraries",
    icon: Globe,
  },
  {
    name: "U.S. Holocaust Memorial Museum",
    url: "https://www.ushmm.org/remember/resources-holocaust-survivors-victims",
    description: "Survivor, victim, and displaced-persons resources for family research.",
    category: "Heritage",
    icon: Shield,
  },
];

const categories = ["All", "Genealogy", "Records", "Heritage", "Libraries"] as const;

export default function OpenArchive() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return collections.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 to-white">
      <section className="bg-gradient-to-r from-[#7D0A24] to-[#9B1B30] text-white py-16">
        <div className="container px-4 max-w-5xl">
          <p className="text-amber-200 text-sm font-semibold uppercase tracking-wider mb-3">
            A separate project from PromptPro Academy
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <Archive className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold" data-testid="text-archive-title">
              Open Archive
            </h1>
          </div>
          <p className="text-lg md:text-xl text-amber-100 max-w-3xl">
            Free historical records, newspapers, and heritage collections in one place. Browse public archives, then save what you find in the Research Center.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/research">
              <Button className="bg-white text-[#7D0A24] hover:bg-amber-50" size="lg" data-testid="button-archive-to-research">
                Open Research Center
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/my-research">
              <Button variant="outline" className="border-white/60 text-white hover:bg-white/15" size="lg" data-testid="button-archive-to-workspace">
                My Research Workspace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container px-4 max-w-5xl py-10 space-y-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search archives by name or topic"
              className="pl-9 bg-white"
              data-testid="input-archive-search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                className={category === item ? "bg-[#7D0A24] hover:bg-[#6d082f]" : ""}
                onClick={() => setCategory(item)}
                data-testid={`button-archive-filter-${item.toLowerCase()}`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground" data-testid="text-archive-count">
          {filtered.length} collection{filtered.length === 1 ? "" : "s"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                data-testid={`card-archive-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <Card className="h-full hover:shadow-md transition-shadow border-amber-100">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#7D0A24]/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-[#7D0A24]" />
                    </div>
                    <div>
                      <h2 className="font-bold flex items-center gap-2">
                        {item.name}
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </h2>
                      <p className="text-xs font-medium text-[#9B1B30] mt-0.5">{item.category}</p>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No collections match that search.</p>
        )}
      </div>
    </div>
  );
}
